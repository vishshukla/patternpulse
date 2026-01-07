/**
 * Unit tests for Pattern matching and normalization logic
 */

// Pattern aliases used in the extension
const PATTERN_ALIASES = {
  'Heap/Priority Queue': 'Heap',
  'Tree Traversal': 'DFS',
  'Queue': 'BFS',
  'Sorting': 'Two Pointers',
  'Prefix Sum': 'Hash Map',
  'Prefix/Suffix': 'Hash Map',
  'Design': 'Hash Map'
};

// Core patterns used in the quiz
const CORE_PATTERNS = [
  'Hash Map',
  'Two Pointers',
  'Sliding Window',
  'Binary Search',
  'Dynamic Programming',
  'Greedy',
  'Backtracking',
  'DFS',
  'BFS',
  'Stack',
  'Linked List',
  'Heap',
  'Trie',
  'Union Find',
  'Topological Sort',
  'Math',
  'Bit Manipulation',
  'Graph'
];

/**
 * Normalize pattern name using aliases
 */
function normalizePattern(pattern) {
  return PATTERN_ALIASES[pattern] || pattern;
}

/**
 * Check if a selected pattern is correct
 */
function isPatternCorrect(selectedPattern, problem) {
  const primaryPattern = normalizePattern(problem.primaryPattern);
  const acceptablePatterns = (problem.acceptablePatterns || []).map(normalizePattern);

  return selectedPattern === primaryPattern ||
         acceptablePatterns.includes(selectedPattern);
}

describe('Pattern Matching', () => {
  describe('normalizePattern', () => {
    it('should return same pattern for core patterns', () => {
      CORE_PATTERNS.forEach(pattern => {
        expect(normalizePattern(pattern)).toBe(pattern);
      });
    });

    it('should normalize Heap/Priority Queue to Heap', () => {
      expect(normalizePattern('Heap/Priority Queue')).toBe('Heap');
    });

    it('should normalize Tree Traversal to DFS', () => {
      expect(normalizePattern('Tree Traversal')).toBe('DFS');
    });

    it('should normalize Queue to BFS', () => {
      expect(normalizePattern('Queue')).toBe('BFS');
    });

    it('should normalize Prefix Sum to Hash Map', () => {
      expect(normalizePattern('Prefix Sum')).toBe('Hash Map');
    });

    it('should handle unknown patterns by returning as-is', () => {
      expect(normalizePattern('Unknown Pattern')).toBe('Unknown Pattern');
    });
  });

  describe('isPatternCorrect', () => {
    it('should return true for exact primary pattern match', () => {
      const problem = {
        primaryPattern: 'Hash Map',
        acceptablePatterns: []
      };

      expect(isPatternCorrect('Hash Map', problem)).toBe(true);
    });

    it('should return true for acceptable pattern match', () => {
      const problem = {
        primaryPattern: 'Hash Map',
        acceptablePatterns: ['Two Pointers', 'Binary Search']
      };

      expect(isPatternCorrect('Two Pointers', problem)).toBe(true);
      expect(isPatternCorrect('Binary Search', problem)).toBe(true);
    });

    it('should return false for incorrect pattern', () => {
      const problem = {
        primaryPattern: 'Hash Map',
        acceptablePatterns: ['Two Pointers']
      };

      expect(isPatternCorrect('DFS', problem)).toBe(false);
      expect(isPatternCorrect('Stack', problem)).toBe(false);
    });

    it('should handle aliased primary patterns', () => {
      const problem = {
        primaryPattern: 'Heap/Priority Queue',
        acceptablePatterns: []
      };

      // User selects 'Heap' which should match 'Heap/Priority Queue'
      expect(isPatternCorrect('Heap', problem)).toBe(true);
    });

    it('should handle aliased acceptable patterns', () => {
      const problem = {
        primaryPattern: 'DFS',
        acceptablePatterns: ['Heap/Priority Queue']
      };

      expect(isPatternCorrect('Heap', problem)).toBe(true);
    });

    it('should handle missing acceptablePatterns', () => {
      const problem = {
        primaryPattern: 'Stack'
        // No acceptablePatterns field
      };

      expect(isPatternCorrect('Stack', problem)).toBe(true);
      expect(isPatternCorrect('Heap', problem)).toBe(false);
    });

    it('should handle empty acceptablePatterns', () => {
      const problem = {
        primaryPattern: 'Greedy',
        acceptablePatterns: []
      };

      expect(isPatternCorrect('Greedy', problem)).toBe(true);
      expect(isPatternCorrect('Dynamic Programming', problem)).toBe(false);
    });
  });

  describe('CORE_PATTERNS list', () => {
    it('should have 18 patterns', () => {
      expect(CORE_PATTERNS).toHaveLength(18);
    });

    it('should have all unique patterns', () => {
      const uniquePatterns = new Set(CORE_PATTERNS);
      expect(uniquePatterns.size).toBe(CORE_PATTERNS.length);
    });

    it('should include fundamental patterns', () => {
      expect(CORE_PATTERNS).toContain('Hash Map');
      expect(CORE_PATTERNS).toContain('Two Pointers');
      expect(CORE_PATTERNS).toContain('Dynamic Programming');
      expect(CORE_PATTERNS).toContain('DFS');
      expect(CORE_PATTERNS).toContain('BFS');
    });
  });

  describe('Two Sum problem pattern matching', () => {
    const twoSumProblem = {
      primaryPattern: 'Hash Map',
      acceptablePatterns: ['Two Pointers']
    };

    it('should accept Hash Map as correct', () => {
      expect(isPatternCorrect('Hash Map', twoSumProblem)).toBe(true);
    });

    it('should accept Two Pointers as correct', () => {
      expect(isPatternCorrect('Two Pointers', twoSumProblem)).toBe(true);
    });

    it('should reject incorrect patterns', () => {
      expect(isPatternCorrect('DFS', twoSumProblem)).toBe(false);
      expect(isPatternCorrect('Stack', twoSumProblem)).toBe(false);
      expect(isPatternCorrect('Binary Search', twoSumProblem)).toBe(false);
    });
  });
});
