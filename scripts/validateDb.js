/**
 * Validate database integrity
 */

const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../extension/data/problemDatabase.js');
const content = fs.readFileSync(dbPath, 'utf8');
const fn = new Function('module', content + '\nreturn PROBLEM_DATABASE;');
const db = fn({ exports: {} });

let issues = [];
let validAcceptable = 0;
let noAcceptable = 0;

for (const [id, p] of Object.entries(db)) {
  if (!p.patternExplanations || !p.patternExplanations[p.primaryPattern]) {
    issues.push(`#${id}: Missing explanation for primary pattern '${p.primaryPattern}'`);
  }
  if (p.acceptablePatterns && p.acceptablePatterns.length > 0) {
    validAcceptable++;
    for (const alt of p.acceptablePatterns) {
      if (!p.patternExplanations[alt]) {
        issues.push(`#${id}: Missing explanation for acceptable pattern '${alt}'`);
      }
    }
  } else {
    noAcceptable++;
  }
}

console.log('=== DATABASE VALIDATION ===');
console.log('Total problems:', Object.keys(db).length);
console.log('With acceptable patterns:', validAcceptable);
console.log('Without acceptable patterns:', noAcceptable);
console.log('\nIssues found:', issues.length);
if (issues.length > 0) {
  issues.slice(0, 10).forEach(i => console.log('  -', i));
  if (issues.length > 10) {
    console.log(`  ... and ${issues.length - 10} more`);
  }
}
if (issues.length === 0) {
  console.log('\n✓ Database is valid');
}
