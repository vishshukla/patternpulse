/**
 * Identify problems that likely need acceptable patterns added
 * Focus on well-known pattern equivalences
 */

const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../extension/data/problemDatabase.js');
const dbContent = fs.readFileSync(dbPath, 'utf8');

let PROBLEM_DATABASE;
try {
  const fn = new Function('module', dbContent + '\nreturn PROBLEM_DATABASE;');
  PROBLEM_DATABASE = fn({ exports: {} });
} catch (e) {
  console.error('Failed to parse database:', e.message);
  process.exit(1);
}

const db = PROBLEM_DATABASE;

// Common pattern equivalences (same complexity)
const EQUIVALENCES = {
  // DFS and BFS are often interchangeable for graph/tree traversal
  'DFS': ['BFS'],
  'BFS': ['DFS'],

  // For tree problems, recursive DFS is often equivalent to iterative stack
  'Tree Traversal': ['DFS', 'Stack'],

  // Union Find and DFS/BFS for connected components
  'Union Find': ['DFS', 'BFS'],

  // Greedy and DP sometimes have same complexity
  'Greedy': ['Dynamic Programming'],

  // Bit Manipulation and Math/Hash Map for certain problems
  'Bit Manipulation': ['Math', 'Hash Map'],
};

// Problems to review
const toReview = [];

for (const [id, p] of Object.entries(db)) {
  const primary = p.primaryPattern;
  const acceptable = p.acceptablePatterns || [];
  const complexity = p.solution?.timeComplexity || '';

  // Check if this pattern type commonly has alternatives
  const possibleAlternatives = EQUIVALENCES[primary] || [];

  // Check if any likely alternative is missing
  const missingAlternatives = possibleAlternatives.filter(alt => !acceptable.includes(alt));

  if (missingAlternatives.length > 0 && acceptable.length === 0) {
    toReview.push({
      id,
      title: p.title,
      primary,
      complexity,
      acceptable,
      suggestions: missingAlternatives
    });
  }
}

// Group by primary pattern for easier review
const byPattern = {};
for (const item of toReview) {
  if (!byPattern[item.primary]) byPattern[item.primary] = [];
  byPattern[item.primary].push(item);
}

console.log('='.repeat(70));
console.log('PROBLEMS LIKELY NEEDING ACCEPTABLE PATTERNS');
console.log('='.repeat(70));

for (const [pattern, items] of Object.entries(byPattern)) {
  console.log(`\n=== ${pattern} (${items.length} to review) ===`);
  items.forEach(item => {
    console.log(`\n#${item.id}: ${item.title}`);
    console.log(`  Complexity: ${item.complexity}`);
    console.log(`  Suggested alternatives: ${item.suggestions.join(', ')}`);
  });
}

console.log('\n' + '='.repeat(70));
console.log(`TOTAL TO REVIEW: ${toReview.length} problems`);
console.log('='.repeat(70));
