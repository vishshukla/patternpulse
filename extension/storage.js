/**
 * PatternPulse Storage Module
 * Wrapper for Chrome Storage API with fallback for testing
 */

const storage = {
  /**
   * Get user progress for a specific problem
   * @param {string} slug - Problem slug
   * @returns {Promise<Object|null>} Progress object or null
   */
  async getProgress(slug) {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        return new Promise((resolve) => {
          chrome.storage.local.get([`progress_${slug}`], (result) => {
            resolve(result[`progress_${slug}`] || null);
          });
        });
      } else {
        // Fallback to localStorage for testing
        const data = localStorage.getItem(`progress_${slug}`);
        return data ? JSON.parse(data) : null;
      }
    } catch (error) {
      console.error('[Storage] Error getting progress:', error);
      return null;
    }
  },

  /**
   * Save user progress for a specific problem
   * @param {string} slug - Problem slug
   * @param {Object} progress - Progress data
   * @returns {Promise<boolean>} Success status
   */
  async saveProgress(slug, progress) {
    try {
      const data = {
        ...progress,
        slug,
        updatedAt: Date.now()
      };

      if (typeof chrome !== 'undefined' && chrome.storage) {
        return new Promise((resolve) => {
          chrome.storage.local.set({ [`progress_${slug}`]: data }, () => {
            resolve(true);
          });
        });
      } else {
        // Fallback to localStorage for testing
        localStorage.setItem(`progress_${slug}`, JSON.stringify(data));
        return true;
      }
    } catch (error) {
      console.error('[Storage] Error saving progress:', error);
      return false;
    }
  },

  /**
   * Get all user progress
   * @returns {Promise<Object>} All progress data
   */
  async getAllProgress() {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        return new Promise((resolve) => {
          chrome.storage.local.get(null, (result) => {
            const progress = {};
            Object.keys(result).forEach(key => {
              if (key.startsWith('progress_')) {
                const slug = key.replace('progress_', '');
                progress[slug] = result[key];
              }
            });
            resolve(progress);
          });
        });
      } else {
        // Fallback to localStorage for testing
        const progress = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith('progress_')) {
            const slug = key.replace('progress_', '');
            progress[slug] = JSON.parse(localStorage.getItem(key));
          }
        }
        return progress;
      }
    } catch (error) {
      console.error('[Storage] Error getting all progress:', error);
      return {};
    }
  },

  /**
   * Get user statistics
   * @returns {Promise<Object>} Statistics object
   */
  async getStats() {
    try {
      const allProgress = await this.getAllProgress();
      const problems = Object.values(allProgress);

      const stats = {
        total: problems.length,
        completed: problems.filter(p => p.completed).length,
        skipped: problems.filter(p => p.skipped).length,
        hintsUsed: problems.reduce((sum, p) => sum + (p.hintsUsed || 0), 0),
        patterns: {},
        patternStrength: {},
        streak: 0
      };

      // Count by pattern and track strength
      // "Mastered" = solved without hints AND without wrong attempts (first try, no help)
      problems.forEach(p => {
        if (p.pattern && p.completed) {
          stats.patterns[p.pattern] = (stats.patterns[p.pattern] || 0) + 1;

          // Track total completions and perfect completions per pattern
          if (!stats.patternStrength[p.pattern]) {
            stats.patternStrength[p.pattern] = { total: 0, perfect: 0 };
          }
          stats.patternStrength[p.pattern].total++;

          // Perfect = no hints AND no wrong attempts
          const noHints = (p.hintsUsed || 0) === 0;
          const noWrongAttempts = (p.wrongAttempts || 0) === 0;
          if (noHints && noWrongAttempts) {
            stats.patternStrength[p.pattern].perfect++;
          }
        }
      });

      // Calculate streak (consecutive problems with perfect first guess - no hints AND no wrong attempts)
      const completedProblems = problems
        .filter(p => p.completed && p.timestamp)
        .sort((a, b) => b.timestamp - a.timestamp);

      for (const p of completedProblems) {
        const noHints = (p.hintsUsed || 0) === 0;
        const noWrongAttempts = (p.wrongAttempts || 0) === 0;
        if (noHints && noWrongAttempts) {
          stats.streak++;
        } else {
          break; // Streak broken
        }
      }

      return stats;
    } catch (error) {
      console.error('[Storage] Error getting stats:', error);
      return {
        total: 0,
        completed: 0,
        skipped: 0,
        hintsUsed: 0,
        patterns: {},
        patternStrength: {},
        streak: 0
      };
    }
  },

  /**
   * Get pattern strength analysis (strongest vs weakest)
   * @returns {Promise<Object>} Strength analysis
   */
  async getPatternStrength() {
    const stats = await this.getStats();
    const strength = stats.patternStrength;

    // Only count problems solved perfectly (no hints, no wrong attempts)
    const patternRates = Object.entries(strength)
      .filter(([_, data]) => data.perfect >= 1) // Only patterns with at least 1 perfect solve
      .map(([pattern, data]) => ({
        pattern,
        total: data.total,
        perfect: data.perfect,
        rate: data.perfect // Show count of perfect solves
      }))
      .sort((a, b) => b.perfect - a.perfect); // Sort by number of perfect solves

    // Top patterns (most perfect solves)
    const strongest = patternRates.slice(0, 3);

    // No "weakest" section
    const weakest = [];

    return {
      strongest,
      weakest,
      all: patternRates
    };
  },

  /**
   * Clear all progress (for testing)
   * @returns {Promise<boolean>} Success status
   */
  async clearAll() {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        return new Promise((resolve) => {
          chrome.storage.local.clear(() => {
            resolve(true);
          });
        });
      } else {
        // Fallback to localStorage for testing
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith('progress_')) {
            keys.push(key);
          }
        }
        keys.forEach(key => localStorage.removeItem(key));
        return true;
      }
    } catch (error) {
      console.error('[Storage] Error clearing data:', error);
      return false;
    }
  },

  /**
   * Export all data (for backup)
   * @returns {Promise<string>} JSON string of all data
   */
  async exportData() {
    try {
      const allProgress = await this.getAllProgress();
      return JSON.stringify(allProgress, null, 2);
    } catch (error) {
      console.error('[Storage] Error exporting data:', error);
      return '{}';
    }
  },

  /**
   * Import data (from backup)
   * @param {string} jsonData - JSON string to import
   * @returns {Promise<boolean>} Success status
   */
  async importData(jsonData) {
    try {
      const data = JSON.parse(jsonData);

      for (const [slug, progress] of Object.entries(data)) {
        await this.saveProgress(slug, progress);
      }

      return true;
    } catch (error) {
      console.error('[Storage] Error importing data:', error);
      return false;
    }
  }
};

// Make available globally for content script
if (typeof window !== 'undefined') {
  window.storage = storage;
}

// Export for Node.js (testing)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = storage;
}
