#!/usr/bin/env node

/**
 * Unit Tests for PatternPulse
 *
 * Run with: node tests/unit.test.js
 */

const fs = require('fs');
const path = require('path');

// Test utilities
const assert = (condition, message) => {
  if (!condition) {
    throw new Error(`❌ FAILED: ${message}`);
  }
  console.log(`✅ PASSED: ${message}`);
};

const assertEqual = (actual, expected, message) => {
  if (actual !== expected) {
    throw new Error(`❌ FAILED: ${message}\n  Expected: ${expected}\n  Actual: ${actual}`);
  }
  console.log(`✅ PASSED: ${message}`);
};

const assertArrayLength = (arr, expectedLength, message) => {
  if (arr.length !== expectedLength) {
    throw new Error(`❌ FAILED: ${message}\n  Expected length: ${expectedLength}\n  Actual length: ${arr.length}`);
  }
  console.log(`✅ PASSED: ${message}`);
};

// Test runner
async function runTests() {
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║      PatternPulse Unit Tests              ║');
  console.log('╚════════════════════════════════════════════╝\n');

  let passedTests = 0;
  let failedTests = 0;
  const totalTests = 10;

  try {
    // Test 1: Problem Database exists and is valid
    console.log('\n📦 Testing Problem Database...');
    const problemDbPath = path.join(__dirname, '../extension/data/problemDatabase.js');
    assert(fs.existsSync(problemDbPath), 'problemDatabase.js exists');

    const { PROBLEM_DATABASE } = require(problemDbPath);
    assert(Array.isArray(PROBLEM_DATABASE), 'PROBLEM_DATABASE is an array');
    assert(PROBLEM_DATABASE.length > 0, 'PROBLEM_DATABASE has problems');
    console.log(`  Found ${PROBLEM_DATABASE.length} problems in database`);
    passedTests += 3;

    // Test 2: AI Database exists and has correct structure
    console.log('\n🤖 Testing AI Database...');
    const aiDbPath = path.join(__dirname, '../extension/data/aiProblemDatabase.js');
    assert(fs.existsSync(aiDbPath), 'aiProblemDatabase.js exists');

    const { AI_PROBLEM_DATABASE } = require(aiDbPath);
    assert(Array.isArray(AI_PROBLEM_DATABASE), 'AI_PROBLEM_DATABASE is an array');

    if (AI_PROBLEM_DATABASE.length > 0) {
      const sample = AI_PROBLEM_DATABASE[0];
      assert(sample.hasOwnProperty('slug'), 'AI problems have slug field');
      assert(sample.hasOwnProperty('primaryPattern'), 'AI problems have primaryPattern field');
      assert(sample.hasOwnProperty('hints'), 'AI problems have hints field');
      assert(Array.isArray(sample.hints), 'hints is an array');
      console.log(`  Found ${AI_PROBLEM_DATABASE.length} AI-solved problems`);
    }
    passedTests += 4;

    // Test 3: Manifest.json is valid
    console.log('\n📋 Testing Extension Manifest...');
    const manifestPath = path.join(__dirname, '../extension/manifest.json');
    assert(fs.existsSync(manifestPath), 'manifest.json exists');

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    assertEqual(manifest.manifest_version, 3, 'Manifest version is 3');
    assertEqual(manifest.name, 'PatternPulse', 'Extension name is correct');
    assert(manifest.permissions.includes('storage'), 'Has storage permission');
    passedTests += 3;

    // Test 4: Content script files exist
    console.log('\n📜 Testing Extension Files...');
    const extensionDir = path.join(__dirname, '../extension');
    assert(fs.existsSync(path.join(extensionDir, 'contentScript.js')), 'contentScript.js exists');
    assert(fs.existsSync(path.join(extensionDir, 'storage.js')), 'storage.js exists');
    assert(fs.existsSync(path.join(extensionDir, 'popup.js')), 'popup.js exists');
    assert(fs.existsSync(path.join(extensionDir, 'popup.html')), 'popup.html exists');
    assert(fs.existsSync(path.join(extensionDir, 'shield.css')), 'shield.css exists');
    passedTests += 5;

    // Test 5: Script files exist
    console.log('\n⚙️  Testing Script Files...');
    const scriptsDir = path.join(__dirname, '../scripts');
    assert(fs.existsSync(path.join(scriptsDir, 'aiSolverCron.js')), 'aiSolverCron.js exists');
    assert(fs.existsSync(path.join(scriptsDir, 'groqSolver.js')), 'groqSolver.js exists');
    assert(fs.existsSync(path.join(scriptsDir, 'fetchFromLeetCode.js')), 'fetchFromLeetCode.js exists');
    passedTests += 3;

    // Test 6: GitHub Actions workflow exists
    console.log('\n🔄 Testing GitHub Actions...');
    const workflowPath = path.join(__dirname, '../.github/workflows/ai-solver.yml');
    assert(fs.existsSync(workflowPath), 'ai-solver.yml workflow exists');

    const workflow = fs.readFileSync(workflowPath, 'utf-8');
    assert(workflow.includes('GROQ_API_KEY'), 'Workflow uses GROQ_API_KEY');
    assert(workflow.includes('scripts/aiSolverCron.js'), 'Workflow runs aiSolverCron.js');
    passedTests += 3;

    // Test 7: Package.json is valid
    console.log('\n📦 Testing Package Configuration...');
    const packagePath = path.join(__dirname, '../package.json');
    assert(fs.existsSync(packagePath), 'package.json exists');

    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    assert(pkg.dependencies.hasOwnProperty('groq-sdk'), 'Has groq-sdk dependency');
    assert(pkg.scripts.hasOwnProperty('solve'), 'Has solve script');
    assert(pkg.scripts.hasOwnProperty('test'), 'Has test script');
    passedTests += 4;

    // Test 8: Documentation exists
    console.log('\n📚 Testing Documentation...');
    const docsDir = path.join(__dirname, '../docs');
    assert(fs.existsSync(path.join(docsDir, 'DEPLOYMENT.md')), 'DEPLOYMENT.md exists');
    assert(fs.existsSync(path.join(docsDir, 'AI_SOLVER.md')), 'AI_SOLVER.md exists');
    passedTests += 2;

    // Test 9: .gitignore exists
    console.log('\n🙈 Testing Git Configuration...');
    const gitignorePath = path.join(__dirname, '../.gitignore');
    assert(fs.existsSync(gitignorePath), '.gitignore exists');

    const gitignore = fs.readFileSync(gitignorePath, 'utf-8');
    assert(gitignore.includes('node_modules'), '.gitignore includes node_modules');
    assert(gitignore.includes('.env'), '.gitignore includes .env');
    passedTests += 3;

    // Test 10: Pattern validation
    console.log('\n🎯 Testing Pattern Configuration...');
    const contentScript = fs.readFileSync(path.join(extensionDir, 'contentScript.js'), 'utf-8');
    assert(contentScript.includes('Hash Map'), 'ContentScript has Hash Map pattern');
    assert(contentScript.includes('Two Pointers'), 'ContentScript has Two Pointers pattern');
    assert(contentScript.includes('Dynamic Programming'), 'ContentScript has DP pattern');
    passedTests += 3;

    // Summary
    console.log('\n═══════════════════════════════════════════════');
    console.log(`  Test Results: ${passedTests}/${passedTests + failedTests} passed`);
    console.log('═══════════════════════════════════════════════\n');
    console.log('✅ All tests passed!\n');

    return true;

  } catch (error) {
    failedTests++;
    console.error(`\n${error.message}\n`);
    console.log('═══════════════════════════════════════════════');
    console.log(`  Test Results: ${passedTests}/${passedTests + failedTests} passed`);
    console.log('═══════════════════════════════════════════════\n');
    console.log('❌ Some tests failed!\n');
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  runTests().catch(error => {
    console.error('Test runner error:', error);
    process.exit(1);
  });
}

module.exports = { runTests };
