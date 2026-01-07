const fs = require('fs');

// Read the database file
const content = fs.readFileSync('/Users/veesh/projs/extension/extension/data/problemDatabase.js', 'utf8');

// Extract just the object part (between first { and last })
const startIndex = content.indexOf('{');
const endIndex = content.lastIndexOf('}');
const objectStr = content.substring(startIndex, endIndex + 1);

// Parse using Function constructor
const db = new Function('return ' + objectStr)();

// Filter to keep only problems with hints
const filtered = {};
let kept = 0;
let removed = 0;

for (const [id, problem] of Object.entries(db)) {
  if (problem.hints && Array.isArray(problem.hints) && problem.hints.length > 0) {
    filtered[id] = problem;
    kept++;
  } else {
    removed++;
  }
}

console.log('Kept:', kept, 'problems with hints');
console.log('Removed:', removed, 'problems without hints');

// Generate new database file
const output = `// PatternPulse Problem Database
// Single source of truth for all problem data
// Format: leetcodeId -> problem data
// Filtered to only include problems with hints (${kept} problems)

const PROBLEM_DATABASE = ${JSON.stringify(filtered, null, 2)};

// Export for use in content script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROBLEM_DATABASE };
}
`;

fs.writeFileSync('/Users/veesh/projs/extension/extension/data/problemDatabase.js', output);
console.log('Database filtered and saved!');
