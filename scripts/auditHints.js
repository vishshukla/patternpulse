/**
 * PatternPulse Hint Quality Audit Script
 *
 * Scans problemDatabase.js and identifies hints that reveal pattern names.
 * Run with: node scripts/auditHints.js
 */

const fs = require('fs');
const path = require('path');

// Pattern names that should NEVER appear in hints
const FORBIDDEN_TERMS = [
  // Core patterns
  'hash map', 'hashmap', 'hash set', 'hashset', 'hash table',
  'binary search', 'two pointer', 'two-pointer', 'sliding window',
  'dynamic programming', ' dp ', 'dp[', 'memoization', 'memoize',
  'greedy', 'backtracking', 'backtrack',
  'dfs', 'bfs', 'depth-first', 'breadth-first', 'depth first', 'breadth first',
  'stack', 'queue', 'heap', 'priority queue', 'trie',
  'linked list', 'union find', 'union-find', 'topological sort', 'topological order',
  'divide and conquer', 'divide-and-conquer',
  // Algorithm names
  'dijkstra', 'bellman-ford', 'floyd-warshall', 'kadane',
  'kruskal', 'prim', 'tarjan', 'kosaraju',
  // Too explicit
  'recursion', 'recursive', // when it IS the pattern
  'bit manipulation', 'bitwise',
];

// Load the database
const dbPath = path.join(__dirname, '../extension/data/problemDatabase.js');
const dbContent = fs.readFileSync(dbPath, 'utf8');

// Parse by executing the file content
let PROBLEM_DATABASE;
try {
  // Create a sandboxed eval context
  const sandbox = { module: { exports: {} } };
  const fn = new Function('module', dbContent + '\nreturn PROBLEM_DATABASE;');
  PROBLEM_DATABASE = fn(sandbox.module);
} catch (e) {
  console.error('Failed to parse database:', e.message);
  process.exit(1);
}

const db = PROBLEM_DATABASE;

// Audit results
const issues = [];
let totalProblems = 0;
let problemsWithIssues = 0;

for (const [id, problem] of Object.entries(db)) {
  totalProblems++;
  const problemIssues = [];

  if (!problem.hints || problem.hints.length === 0) {
    problemIssues.push('Missing hints');
  } else {
    // Check each hint for forbidden terms
    problem.hints.forEach((hint, idx) => {
      const hintLower = hint.toLowerCase();

      for (const term of FORBIDDEN_TERMS) {
        if (hintLower.includes(term)) {
          problemIssues.push(`Hint ${idx + 1} contains "${term}": "${hint.substring(0, 60)}..."`);
        }
      }

      // Check if hint is too short (likely not helpful)
      if (hint.length < 20) {
        problemIssues.push(`Hint ${idx + 1} is too short (${hint.length} chars)`);
      }
    });

    // Check if hints are properly progressive (first hint shouldn't be too specific)
    if (problem.hints[0] && problem.hints[0].includes('=')) {
      problemIssues.push('Hint 1 may be too specific (contains "=")');
    }
  }

  // Check pattern assignment
  if (!problem.primaryPattern) {
    problemIssues.push('Missing primary pattern');
  }

  if (problemIssues.length > 0) {
    problemsWithIssues++;
    issues.push({
      id,
      title: problem.title,
      pattern: problem.primaryPattern,
      issues: problemIssues,
      hints: problem.hints
    });
  }
}

// Output report
console.log('='.repeat(60));
console.log('PATTERNPULSE HINT QUALITY AUDIT REPORT');
console.log('='.repeat(60));
console.log(`Total problems: ${totalProblems}`);
console.log(`Problems with issues: ${problemsWithIssues}`);
console.log(`Pass rate: ${((totalProblems - problemsWithIssues) / totalProblems * 100).toFixed(1)}%`);
console.log('='.repeat(60));
console.log('');

// Group by issue type
const byIssueType = {};
for (const item of issues) {
  for (const issue of item.issues) {
    const type = issue.split(':')[0].split('"')[0].trim();
    if (!byIssueType[type]) byIssueType[type] = [];
    byIssueType[type].push({ id: item.id, title: item.title, issue });
  }
}

console.log('ISSUES BY TYPE:');
console.log('-'.repeat(40));
for (const [type, items] of Object.entries(byIssueType)) {
  console.log(`\n${type}: ${items.length} occurrences`);
  items.slice(0, 5).forEach(item => {
    console.log(`  - #${item.id}: ${item.title}`);
    console.log(`    ${item.issue}`);
  });
  if (items.length > 5) {
    console.log(`  ... and ${items.length - 5} more`);
  }
}

// Output full list for fixing
console.log('\n' + '='.repeat(60));
console.log('FULL LIST OF PROBLEMS NEEDING FIXES:');
console.log('='.repeat(60));

issues.forEach(item => {
  console.log(`\n#${item.id}: ${item.title} [${item.pattern}]`);
  item.issues.forEach(issue => console.log(`  ⚠ ${issue}`));
  if (item.hints) {
    console.log('  Current hints:');
    item.hints.forEach((h, i) => console.log(`    ${i + 1}. ${h}`));
  }
});

// Save to JSON for LLM processing
const outputPath = path.join(__dirname, 'audit-results.json');
fs.writeFileSync(outputPath, JSON.stringify(issues, null, 2));
console.log(`\nResults saved to: ${outputPath}`);
