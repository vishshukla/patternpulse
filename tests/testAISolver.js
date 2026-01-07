#!/usr/bin/env node

/**
 * Test the AI Solver with a single problem
 * Use this to verify your Groq API key works
 */

const { solveProblem } = require('../scripts/groqSolver.js');

// Test problem: Two Sum (easy, well-known)
const testProblem = {
  number: 1,
  slug: 'two-sum',
  title: 'Two Sum',
  difficulty: 'Easy',
  tags: ['Array', 'Hash Table']
};

async function test() {
  console.log('🧪 Testing AI Solver\n');
  console.log('═══════════════════════════════════\n');

  // Check API key
  if (!process.env.GROQ_API_KEY) {
    console.error('❌ GROQ_API_KEY not set!\n');
    console.log('Get your free key from: https://console.groq.com/\n');
    console.log('Then run:');
    console.log('  export GROQ_API_KEY="your-key-here"');
    console.log('  node testAISolver.js\n');
    process.exit(1);
  }

  console.log('✅ API Key: Set');
  console.log(`📝 Test Problem: ${testProblem.title}\n`);

  try {
    const result = await solveProblem(testProblem);

    if (result) {
      console.log('\n═══════════════════════════════════');
      console.log('📊 RESULT');
      console.log('═══════════════════════════════════\n');
      console.log('Primary Pattern:', result.primaryPattern);
      console.log('Alternative Patterns:', result.alternativePatterns.join(', ') || 'None');
      console.log('Confidence:', result.confidence);
      console.log('\nApproach:', result.aiSolution.approach);
      console.log('Time Complexity:', result.aiSolution.timeComplexity);
      console.log('Space Complexity:', result.aiSolution.spaceComplexity);
      console.log('Key Insight:', result.aiSolution.keyInsight);
      console.log('\nProgressive Hints:');
      result.hints.forEach((hint, i) => {
        console.log(`  ${i + 1}. ${hint}`);
      });
      console.log('\n✅ Test PASSED! AI solver is working correctly.\n');
      console.log('Next steps:');
      console.log('  1. Review the output above');
      console.log('  2. Run: node aiSolverCron.js');
      console.log('  3. Set up daily cron job (see AI_SOLVER_SETUP.md)\n');
    } else {
      console.error('\n❌ Test FAILED: AI solver returned null\n');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Test FAILED:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

test();
