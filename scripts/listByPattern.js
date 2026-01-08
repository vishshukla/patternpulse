/**
 * List problems by a specific pattern
 * Usage: node listByPattern.js "Two Pointers"
 */

const fs = require('fs');
const path = require('path');

const pattern = process.argv[2] || 'Two Pointers';

const dbPath = path.join(__dirname, '../extension/data/problemDatabase.js');
const dbContent = fs.readFileSync(dbPath, 'utf8');
const fn = new Function('module', dbContent + '\nreturn PROBLEM_DATABASE;');
const db = fn({ exports: {} });

const problems = [];
for (const [id, p] of Object.entries(db)) {
  if (p.primaryPattern === pattern) {
    problems.push({
      id,
      title: p.title,
      complexity: p.solution?.timeComplexity || 'unknown',
      acceptable: p.acceptablePatterns || [],
      explanations: p.patternExplanations || {}
    });
  }
}

console.log(`\n=== ${pattern} (${problems.length} problems) ===\n`);

problems.forEach(p => {
  const acc = p.acceptable.length > 0 ? p.acceptable.join(', ') : 'NONE';
  console.log(`#${p.id}: ${p.title}`);
  console.log(`  Complexity: ${p.complexity}`);
  console.log(`  Acceptable: ${acc}`);

  // Show all explanations
  for (const [pat, exp] of Object.entries(p.explanations)) {
    console.log(`  [${pat}]: ${exp}`);
  }
  console.log('');
});
