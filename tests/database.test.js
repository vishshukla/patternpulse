/**
 * Unit tests for PatternPulse Problem Database
 */

// Import database module
const { PROBLEM_DATABASE } = require('../extension/data/problemDatabase.js');

describe('Problem Database', () => {
  describe('PROBLEM_DATABASE structure', () => {
    it('should be an object with numeric keys', () => {
      expect(typeof PROBLEM_DATABASE).toBe('object');
      expect(PROBLEM_DATABASE).not.toBeNull();

      const keys = Object.keys(PROBLEM_DATABASE);
      expect(keys.length).toBeGreaterThan(0);

      // All keys should be numeric strings
      keys.forEach(key => {
        expect(Number.isInteger(parseInt(key))).toBe(true);
      });
    });

    it('should have required fields for each problem', () => {
      const requiredFields = ['title', 'slug', 'difficulty', 'primaryPattern'];

      // Check first 10 problems
      const problemIds = Object.keys(PROBLEM_DATABASE).slice(0, 10);

      problemIds.forEach(id => {
        const problem = PROBLEM_DATABASE[id];
        requiredFields.forEach(field => {
          expect(problem[field]).toBeDefined();
          expect(typeof problem[field]).toBe('string');
        });
      });
    });

    it('should have valid difficulty values', () => {
      const validDifficulties = ['easy', 'medium', 'hard'];

      Object.values(PROBLEM_DATABASE).forEach(problem => {
        expect(validDifficulties).toContain(problem.difficulty);
      });
    });

    it('should have acceptablePatterns as array', () => {
      Object.values(PROBLEM_DATABASE).forEach(problem => {
        if (problem.acceptablePatterns) {
          expect(Array.isArray(problem.acceptablePatterns)).toBe(true);
        }
      });
    });
  });

  describe('Curated problems (NeetCode 150 + LeetCode 75)', () => {
    // Get all problems that have hints (these are curated)
    const curatedProblems = Object.entries(PROBLEM_DATABASE)
      .filter(([_, p]) => p.hints && p.hints.length > 0);

    it('should have at least 100 curated problems', () => {
      expect(curatedProblems.length).toBeGreaterThanOrEqual(100);
    });

    it('should have 3 hints for curated problems', () => {
      curatedProblems.forEach(([id, problem]) => {
        expect(problem.hints).toHaveLength(3);
        problem.hints.forEach(hint => {
          expect(typeof hint).toBe('string');
          expect(hint.length).toBeGreaterThan(10); // Hints should be meaningful
        });
      });
    });

    it('should have patternExplanations for curated problems', () => {
      curatedProblems.forEach(([id, problem]) => {
        expect(problem.patternExplanations).toBeDefined();
        expect(typeof problem.patternExplanations).toBe('object');

        // Should have at least the primary pattern explained
        expect(problem.patternExplanations[problem.primaryPattern]).toBeDefined();
      });
    });

    it('should have solution object for curated problems', () => {
      curatedProblems.forEach(([id, problem]) => {
        expect(problem.solution).toBeDefined();
        expect(problem.solution.approach).toBeDefined();
        expect(problem.solution.timeComplexity).toBeDefined();
        expect(problem.solution.spaceComplexity).toBeDefined();
        expect(problem.solution.keyInsight).toBeDefined();
      });
    });

  });

  describe('Specific well-known problems', () => {
    it('should have Two Sum (ID 1) with correct data', () => {
      const problem = PROBLEM_DATABASE[1];

      expect(problem.title).toBe('Two Sum');
      expect(problem.slug).toBe('two-sum');
      expect(problem.difficulty).toBe('easy');
      expect(problem.primaryPattern).toBe('Hash Map');
      expect(problem.acceptablePatterns).toContain('Two Pointers');
    });

    it('should have Contains Duplicate (ID 217) with correct data', () => {
      const problem = PROBLEM_DATABASE[217];

      expect(problem.title).toBe('Contains Duplicate');
      expect(problem.difficulty).toBe('easy');
    });

    it('should have Valid Anagram (ID 242) with correct data', () => {
      const problem = PROBLEM_DATABASE[242];

      expect(problem.title).toBe('Valid Anagram');
      expect(problem.difficulty).toBe('easy');
    });
  });

  describe('Data integrity', () => {
    it('should have unique slugs', () => {
      const slugs = Object.values(PROBLEM_DATABASE).map(p => p.slug);
      const uniqueSlugs = new Set(slugs);

      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it('should have non-empty titles', () => {
      Object.values(PROBLEM_DATABASE).forEach(problem => {
        expect(problem.title.trim()).not.toBe('');
      });
    });

    it('should have valid patterns (from known list)', () => {
      const validPatterns = [
        'Hash Map', 'Two Pointers', 'Sliding Window', 'Binary Search',
        'Dynamic Programming', 'Greedy', 'Backtracking', 'DFS', 'BFS',
        'Stack', 'Linked List', 'Heap', 'Trie', 'Union Find',
        'Topological Sort', 'Math', 'Bit Manipulation', 'Graph',
        'Heap/Priority Queue', 'Tree Traversal', 'Queue', 'Sorting',
        'Prefix Sum', 'Prefix/Suffix', 'Design', 'Matrix', 'Simulation',
        'Array', 'String', 'Recursion', 'Divide and Conquer', 'Monotonic Stack',
        'Intervals', 'Tree', 'Binary Tree'
      ];

      Object.values(PROBLEM_DATABASE).forEach(problem => {
        expect(validPatterns).toContain(problem.primaryPattern);
      });
    });
  });
});
