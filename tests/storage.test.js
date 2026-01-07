/**
 * Unit tests for PatternPulse Storage Module
 */

// Mock localStorage for testing
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    removeItem: jest.fn(key => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; }),
    key: jest.fn(index => Object.keys(store)[index]),
    get length() { return Object.keys(store).length; }
  };
})();

// Setup global mocks
global.localStorage = localStorageMock;
global.chrome = undefined; // Force localStorage fallback

// Import storage module
const storage = require('../extension/storage.js');

describe('Storage Module', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  describe('saveProgress', () => {
    it('should save progress for a problem', async () => {
      const slug = 'two-sum';
      const progress = {
        pattern: 'Hash Map',
        completed: true,
        hintsUsed: 0
      };

      const result = await storage.saveProgress(slug, progress);

      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it('should add updatedAt timestamp', async () => {
      const slug = 'two-sum';
      const progress = { pattern: 'Hash Map', completed: true };

      await storage.saveProgress(slug, progress);

      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(savedData.updatedAt).toBeDefined();
      expect(typeof savedData.updatedAt).toBe('number');
    });

    it('should include slug in saved data', async () => {
      const slug = 'two-sum';
      const progress = { pattern: 'Hash Map', completed: true };

      await storage.saveProgress(slug, progress);

      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(savedData.slug).toBe(slug);
    });
  });

  describe('getProgress', () => {
    it('should return null for non-existent problem', async () => {
      const result = await storage.getProgress('non-existent');
      expect(result).toBeNull();
    });

    it('should return saved progress', async () => {
      const slug = 'two-sum';
      const progress = { pattern: 'Hash Map', completed: true };

      // Manually set localStorage
      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(progress));

      const result = await storage.getProgress(slug);
      expect(result).toEqual(progress);
    });
  });

  describe('getAllProgress', () => {
    it('should return empty object when no progress', async () => {
      const result = await storage.getAllProgress();
      expect(result).toEqual({});
    });

    it('should return all progress entries', async () => {
      // Setup mock to return progress keys
      const mockStore = {
        'progress_two-sum': JSON.stringify({ pattern: 'Hash Map', completed: true }),
        'progress_three-sum': JSON.stringify({ pattern: 'Two Pointers', completed: true }),
        'other-key': 'ignored'
      };

      Object.defineProperty(localStorageMock, 'length', { value: 3, writable: true });
      localStorageMock.key.mockImplementation(i => Object.keys(mockStore)[i]);
      localStorageMock.getItem.mockImplementation(key => mockStore[key]);

      const result = await storage.getAllProgress();

      expect(Object.keys(result)).toHaveLength(2);
      expect(result['two-sum']).toBeDefined();
      expect(result['three-sum']).toBeDefined();
    });
  });

  describe('getStats', () => {
    it('should return zero stats when no progress', async () => {
      // Ensure localStorage returns empty for getAllProgress
      Object.defineProperty(localStorageMock, 'length', { value: 0, writable: true });

      const stats = await storage.getStats();

      expect(stats.total).toBe(0);
      expect(stats.completed).toBe(0);
      expect(stats.skipped).toBe(0);
      expect(stats.hintsUsed).toBe(0);
      expect(stats.streak).toBe(0);
    });

    it('should calculate correct stats', async () => {
      const mockStore = {
        'progress_two-sum': JSON.stringify({
          pattern: 'Hash Map',
          completed: true,
          hintsUsed: 0,
          wrongAttempts: 0,
          timestamp: Date.now()
        }),
        'progress_three-sum': JSON.stringify({
          pattern: 'Two Pointers',
          completed: true,
          hintsUsed: 1,
          wrongAttempts: 0,
          timestamp: Date.now() - 1000
        }),
        'progress_four-sum': JSON.stringify({
          skipped: true,
          timestamp: Date.now() - 2000
        })
      };

      Object.defineProperty(localStorageMock, 'length', { value: 3, writable: true });
      localStorageMock.key.mockImplementation(i => Object.keys(mockStore)[i]);
      localStorageMock.getItem.mockImplementation(key => mockStore[key]);

      const stats = await storage.getStats();

      expect(stats.total).toBe(3);
      expect(stats.completed).toBe(2);
      expect(stats.skipped).toBe(1);
      expect(stats.hintsUsed).toBe(1);
      expect(stats.patterns['Hash Map']).toBe(1);
      expect(stats.patterns['Two Pointers']).toBe(1);
    });

    it('should calculate streak correctly', async () => {
      const now = Date.now();
      const mockStore = {
        'progress_p1': JSON.stringify({ completed: true, hintsUsed: 0, timestamp: now }),
        'progress_p2': JSON.stringify({ completed: true, hintsUsed: 0, timestamp: now - 1000 }),
        'progress_p3': JSON.stringify({ completed: true, hintsUsed: 1, timestamp: now - 2000 }), // breaks streak
        'progress_p4': JSON.stringify({ completed: true, hintsUsed: 0, timestamp: now - 3000 })
      };

      Object.defineProperty(localStorageMock, 'length', { value: 4, writable: true });
      localStorageMock.key.mockImplementation(i => Object.keys(mockStore)[i]);
      localStorageMock.getItem.mockImplementation(key => mockStore[key]);

      const stats = await storage.getStats();

      // Streak should be 2 (most recent two without hints)
      expect(stats.streak).toBe(2);
    });

    it('should track pattern strength correctly', async () => {
      const mockStore = {
        'progress_p1': JSON.stringify({
          pattern: 'Hash Map',
          completed: true,
          hintsUsed: 0,
          wrongAttempts: 0
        }),
        'progress_p2': JSON.stringify({
          pattern: 'Hash Map',
          completed: true,
          hintsUsed: 1, // not perfect
          wrongAttempts: 0
        }),
        'progress_p3': JSON.stringify({
          pattern: 'Hash Map',
          completed: true,
          hintsUsed: 0,
          wrongAttempts: 1 // not perfect
        })
      };

      Object.defineProperty(localStorageMock, 'length', { value: 3, writable: true });
      localStorageMock.key.mockImplementation(i => Object.keys(mockStore)[i]);
      localStorageMock.getItem.mockImplementation(key => mockStore[key]);

      const stats = await storage.getStats();

      expect(stats.patternStrength['Hash Map'].total).toBe(3);
      expect(stats.patternStrength['Hash Map'].perfect).toBe(1); // Only first is perfect
    });
  });

  describe('clearAll', () => {
    it('should clear all progress data', async () => {
      // First save some progress
      await storage.saveProgress('test', { pattern: 'Test', completed: true });

      const result = await storage.clearAll();

      expect(result).toBe(true);
    });
  });

  describe('exportData', () => {
    it('should return JSON string of all progress', async () => {
      const mockStore = {
        'progress_two-sum': JSON.stringify({ pattern: 'Hash Map' })
      };

      Object.defineProperty(localStorageMock, 'length', { value: 1, writable: true });
      localStorageMock.key.mockImplementation(i => Object.keys(mockStore)[i]);
      localStorageMock.getItem.mockImplementation(key => mockStore[key]);

      const result = await storage.exportData();

      expect(typeof result).toBe('string');
      const parsed = JSON.parse(result);
      expect(parsed['two-sum']).toBeDefined();
    });
  });

  describe('importData', () => {
    it('should import valid JSON data', async () => {
      const data = {
        'two-sum': { pattern: 'Hash Map', completed: true },
        'three-sum': { pattern: 'Two Pointers', completed: true }
      };

      const result = await storage.importData(JSON.stringify(data));

      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
    });

    it('should return false for invalid JSON', async () => {
      const result = await storage.importData('invalid json');
      expect(result).toBe(false);
    });
  });
});
