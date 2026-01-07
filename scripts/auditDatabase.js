/**
 * Database Audit Script
 * Checks that all curated problems have proper AI hints and unique content
 */

const fs = require('fs');
const path = require('path');

// Read the problem database
const dbPath = path.join(__dirname, '../extension/data/problemDatabase.js');
const dbContent = fs.readFileSync(dbPath, 'utf-8');

// Extract the PROBLEM_DATABASE object
const match = dbContent.match(/const PROBLEM_DATABASE = ({[\s\S]*?});/);
if (!match) {
  console.error('Could not parse PROBLEM_DATABASE');
  process.exit(1);
}

// Parse it (using eval since it's a JS object literal)
let PROBLEM_DATABASE;
try {
  eval('PROBLEM_DATABASE = ' + match[1]);
} catch (e) {
  console.error('Failed to parse database:', e.message);
  process.exit(1);
}

// Read curated lists
const listsPath = path.join(__dirname, '../extension/data/curatedLists.js');
const listsContent = fs.readFileSync(listsPath, 'utf-8');

// Extract NeetCode 150 IDs
const neetcodeIds = new Set();
const neetcodeMatch = listsContent.matchAll(/leetcodeId:\s*(\d+)/g);
for (const m of neetcodeMatch) {
  neetcodeIds.add(parseInt(m[1]));
}

// Get all required problem IDs: 1-100 + curated lists
const requiredIds = new Set();

// Add problems 1-100
for (let i = 1; i <= 100; i++) {
  requiredIds.add(i);
}

// Add all from curated lists
neetcodeIds.forEach(id => requiredIds.add(id));

console.log('='.repeat(60));
console.log('PATTERNPULSE DATABASE AUDIT');
console.log('='.repeat(60));
console.log(`\nTotal required problems: ${requiredIds.size}`);
console.log(`  - Problems 1-100: 100`);
console.log(`  - Curated lists: ${neetcodeIds.size} unique IDs`);
console.log(`  - (Overlap included in total)`);

// Track issues
const issues = {
  missingProblems: [],
  missingHints: [],
  emptyHints: [],
  missingPatternExplanations: [],
  missingSolution: [],
  duplicateHints: [],
  duplicateExplanations: []
};

// Track all hints and explanations for uniqueness check
const allHints = new Map(); // hint text -> [problem ids]
const allExplanations = new Map(); // explanation text -> [problem ids]

// Audit each required problem
for (const id of Array.from(requiredIds).sort((a, b) => a - b)) {
  const problem = PROBLEM_DATABASE[id];

  if (!problem) {
    issues.missingProblems.push(id);
    continue;
  }

  // Check hints
  if (!problem.hints) {
    issues.missingHints.push({ id, title: problem.title });
  } else if (problem.hints.length === 0) {
    issues.emptyHints.push({ id, title: problem.title });
  } else {
    // Track hints for uniqueness
    problem.hints.forEach((hint, idx) => {
      const key = hint.trim().toLowerCase();
      if (!allHints.has(key)) {
        allHints.set(key, []);
      }
      allHints.get(key).push({ id, title: problem.title, hintIndex: idx + 1 });
    });
  }

  // Check pattern explanations
  if (!problem.patternExplanations) {
    issues.missingPatternExplanations.push({ id, title: problem.title });
  } else {
    // Track explanations for uniqueness
    Object.entries(problem.patternExplanations).forEach(([pattern, explanation]) => {
      const key = explanation.trim().toLowerCase();
      if (!allExplanations.has(key)) {
        allExplanations.set(key, []);
      }
      allExplanations.get(key).push({ id, title: problem.title, pattern });
    });
  }

  // Check solution
  if (!problem.solution) {
    issues.missingSolution.push({ id, title: problem.title });
  }
}

// Find duplicate hints
allHints.forEach((problems, hint) => {
  if (problems.length > 1) {
    issues.duplicateHints.push({
      hint: hint.substring(0, 80) + (hint.length > 80 ? '...' : ''),
      problems: problems
    });
  }
});

// Find duplicate explanations
allExplanations.forEach((problems, explanation) => {
  if (problems.length > 1) {
    issues.duplicateExplanations.push({
      explanation: explanation.substring(0, 80) + (explanation.length > 80 ? '...' : ''),
      problems: problems
    });
  }
});

// Print results
console.log('\n' + '='.repeat(60));
console.log('AUDIT RESULTS');
console.log('='.repeat(60));

// Missing problems
console.log(`\n❌ MISSING PROBLEMS: ${issues.missingProblems.length}`);
if (issues.missingProblems.length > 0) {
  console.log('   IDs:', issues.missingProblems.join(', '));
}

// Missing hints
console.log(`\n❌ MISSING HINTS: ${issues.missingHints.length}`);
if (issues.missingHints.length > 0) {
  issues.missingHints.slice(0, 10).forEach(p => {
    console.log(`   - #${p.id}: ${p.title}`);
  });
  if (issues.missingHints.length > 10) {
    console.log(`   ... and ${issues.missingHints.length - 10} more`);
  }
}

// Empty hints
console.log(`\n❌ EMPTY HINTS ARRAY: ${issues.emptyHints.length}`);
if (issues.emptyHints.length > 0) {
  issues.emptyHints.slice(0, 10).forEach(p => {
    console.log(`   - #${p.id}: ${p.title}`);
  });
  if (issues.emptyHints.length > 10) {
    console.log(`   ... and ${issues.emptyHints.length - 10} more`);
  }
}

// Missing pattern explanations
console.log(`\n❌ MISSING PATTERN EXPLANATIONS: ${issues.missingPatternExplanations.length}`);
if (issues.missingPatternExplanations.length > 0) {
  issues.missingPatternExplanations.slice(0, 10).forEach(p => {
    console.log(`   - #${p.id}: ${p.title}`);
  });
  if (issues.missingPatternExplanations.length > 10) {
    console.log(`   ... and ${issues.missingPatternExplanations.length - 10} more`);
  }
}

// Missing solutions
console.log(`\n❌ MISSING SOLUTION: ${issues.missingSolution.length}`);
if (issues.missingSolution.length > 0) {
  issues.missingSolution.slice(0, 10).forEach(p => {
    console.log(`   - #${p.id}: ${p.title}`);
  });
  if (issues.missingSolution.length > 10) {
    console.log(`   ... and ${issues.missingSolution.length - 10} more`);
  }
}

// Duplicate hints
console.log(`\n⚠️  DUPLICATE HINTS: ${issues.duplicateHints.length}`);
if (issues.duplicateHints.length > 0) {
  issues.duplicateHints.slice(0, 5).forEach(dup => {
    console.log(`\n   Hint: "${dup.hint}"`);
    console.log(`   Found in:`);
    dup.problems.forEach(p => {
      console.log(`     - #${p.id}: ${p.title} (hint ${p.hintIndex})`);
    });
  });
  if (issues.duplicateHints.length > 5) {
    console.log(`\n   ... and ${issues.duplicateHints.length - 5} more duplicate hints`);
  }
}

// Duplicate explanations
console.log(`\n⚠️  DUPLICATE EXPLANATIONS: ${issues.duplicateExplanations.length}`);
if (issues.duplicateExplanations.length > 0) {
  issues.duplicateExplanations.slice(0, 5).forEach(dup => {
    console.log(`\n   Explanation: "${dup.explanation}"`);
    console.log(`   Found in:`);
    dup.problems.forEach(p => {
      console.log(`     - #${p.id}: ${p.title} (${p.pattern})`);
    });
  });
  if (issues.duplicateExplanations.length > 5) {
    console.log(`\n   ... and ${issues.duplicateExplanations.length - 5} more duplicate explanations`);
  }
}

// Summary
const totalIssues =
  issues.missingProblems.length +
  issues.missingHints.length +
  issues.emptyHints.length +
  issues.missingPatternExplanations.length +
  issues.missingSolution.length;

const totalDuplicates = issues.duplicateHints.length + issues.duplicateExplanations.length;

console.log('\n' + '='.repeat(60));
console.log('SUMMARY');
console.log('='.repeat(60));
console.log(`\nTotal critical issues: ${totalIssues}`);
console.log(`Total duplicate content: ${totalDuplicates}`);

if (totalIssues === 0 && totalDuplicates === 0) {
  console.log('\n✅ ALL CHECKS PASSED!');
} else {
  console.log('\n⚠️  Issues found - please review and fix.');
}

// Export detailed data for further analysis
const outputPath = path.join(__dirname, 'audit-results.json');
fs.writeFileSync(outputPath, JSON.stringify({
  summary: {
    totalRequired: requiredIds.size,
    missingProblems: issues.missingProblems.length,
    missingHints: issues.missingHints.length,
    emptyHints: issues.emptyHints.length,
    missingPatternExplanations: issues.missingPatternExplanations.length,
    missingSolution: issues.missingSolution.length,
    duplicateHints: issues.duplicateHints.length,
    duplicateExplanations: issues.duplicateExplanations.length
  },
  issues
}, null, 2));

console.log(`\nDetailed results saved to: ${outputPath}`);
