/**
 * Audit script to analyze all problems and their acceptable patterns
 */

const fs = require('fs');
const path = require('path');

// Load the database
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

// Group by pattern
const byPattern = {};
for (const [id, p] of Object.entries(db)) {
  const pattern = p.primaryPattern;
  const complexity = p.solution?.timeComplexity || 'unknown';
  if (!byPattern[pattern]) byPattern[pattern] = [];
  byPattern[pattern].push({
    id,
    title: p.title,
    complexity,
    acceptable: p.acceptablePatterns || [],
    explanation: p.patternExplanations?.[pattern] || ''
  });
}

// Print summary grouped by pattern
console.log('='.repeat(70));
console.log('PATTERN AUDIT REPORT');
console.log('='.repeat(70));

let totalProblems = 0;
let problemsWithAcceptable = 0;

for (const [pattern, problems] of Object.entries(byPattern).sort((a,b) => b[1].length - a[1].length)) {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`${pattern} (${problems.length} problems)`);
  console.log('='.repeat(50));

  problems.forEach(p => {
    totalProblems++;
    const acc = p.acceptable.length > 0 ? ` [+${p.acceptable.join(', ')}]` : '';
    if (p.acceptable.length > 0) problemsWithAcceptable++;
    console.log(`  #${p.id}: ${p.title}`);
    console.log(`    Complexity: ${p.complexity}${acc}`);

    // Flag if explanation seems generic (too short or doesn't mention problem specifics)
    if (p.explanation.length < 50) {
      console.log(`    ⚠ SHORT EXPLANATION: "${p.explanation}"`);
    }
  });
}

console.log('\n' + '='.repeat(70));
console.log('SUMMARY');
console.log('='.repeat(70));
console.log(`Total problems: ${totalProblems}`);
console.log(`Problems with acceptable patterns: ${problemsWithAcceptable}`);
console.log(`Problems without acceptable patterns: ${totalProblems - problemsWithAcceptable}`);
