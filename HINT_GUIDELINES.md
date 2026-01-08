# PatternPulse Hint & Pattern Quality Guidelines

## Purpose
This document provides instructions for creating high-quality hints and validating patterns for LeetCode problems. These guidelines should be used when:
1. Adding new problems to the database
2. Reviewing existing problems for quality
3. Batch processing problems with an LLM

---

## Part 1: Hint Quality Standards

### Golden Rule
**NEVER mention the pattern name or any algorithmic technique name in hints.**

### Bad Examples (DO NOT DO THIS)
```
❌ "Standard binary search."
❌ "Use a hash map to store values."
❌ "This is a classic sliding window problem."
❌ "Apply dynamic programming with dp[i] = ..."
❌ "Use two pointers from both ends."
❌ "BFS from the starting node."
❌ "Greedy approach: always pick the largest."
```

### Good Examples (DO THIS)
```
✓ "What if you could eliminate half the search space with each guess?"
✓ "For each element, what would you need to find quickly? How can you remember what you've seen?"
✓ "As you scan left to right, what defines a valid 'window' of elements?"
✓ "Can you express the answer for position i using answers for smaller positions?"
✓ "What if you started from both ends and moved inward based on a condition?"
✓ "What if you explored all neighbors at the current distance before moving further?"
✓ "At each step, what's the locally optimal choice that doesn't hurt future options?"
```

### Hint Structure (3 Progressive Hints)

**Hint 1: Problem Reframing**
- Restate the problem in a way that highlights the key insight
- Ask a question about the problem's structure
- NO technique names, NO data structure names

**Hint 2: Approach Direction**
- Guide toward the approach without naming it
- Mention what to track or observe
- Can mention data structure TYPES (array, set, map) but not as "the answer"

**Hint 3: Key Insight**
- The "aha moment" without giving the full solution
- Can be more specific about the mechanism
- Still avoid pattern names

### Hint Writing Checklist
- [ ] No pattern name mentioned (Hash Map, Binary Search, DP, etc.)
- [ ] No explicit algorithm name (Dijkstra, BFS, DFS, etc.)
- [ ] Progressive difficulty (Hint 1 vaguer than Hint 3)
- [ ] Uses questions to guide thinking
- [ ] Focuses on problem characteristics, not solution techniques
- [ ] Doesn't give away time/space complexity
- [ ] Helps without solving

---

## Part 2: Pattern Validation Standards

### Primary Pattern Selection Criteria
The primary pattern should be:
1. **The most commonly used approach** in real interviews
2. **The most elegant/clean solution** (not necessarily the most optimal)
3. **The pattern that best teaches the underlying concept**

### Acceptable Patterns
Include a pattern as "acceptable" if:
1. It solves the problem correctly with reasonable complexity
2. It's a valid alternative approach interviewers would accept
3. It teaches a different useful concept

### Pattern Red Flags to Check
- Is "Two Pointers" being used when it's really just iteration?
- Is "Hash Map" the answer when the real insight is something else?
- Is "Math" too vague when a specific technique applies?
- Is "Greedy" correct, or is proof of greedy choice missing?
- Is "DP" needed, or is there a greedy/math solution?

### Common Misclassifications to Watch For

| Often Marked As | Should Consider |
|-----------------|-----------------|
| Two Pointers | Sliding Window (if window has dynamic size) |
| Hash Map | Two Pointers (if sorted array) |
| DFS | Backtracking (if exploring choices with undo) |
| BFS | Dijkstra/Bellman-Ford (if weighted graph) |
| Greedy | DP (if greedy choice isn't provably optimal) |
| Math | Bit Manipulation (if binary operations) |

---

## Part 3: LLM Processing Instructions

### Batch Processing Prompt Template

When processing problems, use this prompt structure:

```
You are a LeetCode problem analyst for PatternPulse, an app that quizzes users on algorithmic patterns before they see solutions.

TASK: Review and improve the hints and pattern classification for these problems.

RULES:
1. Hints must NEVER mention pattern names (Binary Search, Hash Map, DP, etc.)
2. Hints must NEVER mention algorithm names (BFS, DFS, Dijkstra, etc.)
3. Hints should guide thinking through questions, not give answers
4. Hints should be progressive: Hint 1 (vague) → Hint 2 (directional) → Hint 3 (key insight)
5. Primary pattern should be the most elegant/common interview solution
6. Acceptable patterns should include valid alternatives

For each problem, output:
{
  "problemId": <id>,
  "title": "<title>",
  "currentPrimaryPattern": "<current>",
  "recommendedPrimaryPattern": "<recommended or KEEP>",
  "patternChangeReason": "<reason if changed>",
  "currentHints": [<current hints>],
  "improvedHints": [
    "<hint 1: problem reframing>",
    "<hint 2: approach direction>",
    "<hint 3: key insight>"
  ],
  "hintsChangeReason": "<what was wrong with original hints>",
  "qualityScore": <1-5>,
  "issues": ["<list of issues found>"]
}

PROBLEM DATA:
<insert problem JSON here>
```

### Quality Score Rubric
- **5**: Perfect - hints guide without revealing, pattern is optimal
- **4**: Good - minor wording improvements possible
- **3**: Acceptable - hints are okay but could be more guiding
- **2**: Needs Work - hints reveal too much or pattern questionable
- **1**: Critical - hints give away answer or pattern is wrong

### Processing Workflow

1. **Extract**: Get problems in batches of 10-20
2. **Analyze**: Run LLM analysis with prompt above
3. **Review**: Human reviews changes for scores < 4
4. **Update**: Apply approved changes to database
5. **Validate**: Spot-check random problems post-update

---

## Part 4: Pattern-Specific Hint Templates

### Binary Search
- "What if you could eliminate half the remaining possibilities with each step?"
- "The answer lies somewhere in a range. How do you narrow it down efficiently?"
- "If you had to guess, and someone told you 'higher' or 'lower'..."

### Hash Map
- "For each element, you need to find something quickly. What would help?"
- "As you iterate, what information would be useful to remember?"
- "What if checking 'have I seen this before?' was instant?"

### Two Pointers
- "What if you had two markers that could move through the data?"
- "Consider starting from opposite ends. When would each side move?"
- "Instead of checking all pairs, can two moving positions find the answer?"

### Sliding Window
- "Imagine a window of elements sliding through the array."
- "What defines a valid window? When does it grow? When does it shrink?"
- "Track a contiguous subarray. What conditions make it valid or invalid?"

### Dynamic Programming
- "Can you express the answer for position i using answers from earlier positions?"
- "What smaller subproblems make up this problem?"
- "If you knew the answer for all smaller inputs, how would that help here?"

### DFS/BFS
- "How would you explore all possibilities systematically?"
- "Think about visiting connected elements. What order makes sense?"
- "If you're at one position, what are your next options?"

### Greedy
- "At each step, what choice seems locally best?"
- "Can you make an irrevocable decision at each step without hurting future options?"
- "What would you do if you were being greedy?"

### Backtracking
- "Try a choice, see if it works, undo if it doesn't."
- "How would you explore all valid combinations systematically?"
- "Build the answer piece by piece. What are your choices at each step?"

### Stack
- "What if you needed to remember things in 'last-in, first-out' order?"
- "As you scan, when do you need to go back to something you saw earlier?"
- "Think about matching or nesting. What needs to pair up?"

### Heap
- "You repeatedly need the maximum or minimum of a changing collection."
- "What if getting the 'best' element was fast, even as things change?"
- "Among all current options, you always want the extreme one."

---

## Part 5: Review Checklist

Before finalizing any problem:

### Hints
- [ ] Hint 1 makes you think about the problem differently
- [ ] Hint 2 points toward an approach without naming it
- [ ] Hint 3 reveals the key insight
- [ ] No pattern/algorithm names anywhere in hints
- [ ] Hints are helpful for someone stuck, not just confirming

### Pattern
- [ ] Primary pattern is the most common interview approach
- [ ] Pattern matches what top solutions actually use
- [ ] Acceptable patterns are genuinely valid alternatives
- [ ] Pattern isn't too generic (e.g., "Arrays" is too vague)
- [ ] Pattern isn't too specific (e.g., "Kadane's Algorithm" - use "DP")

### Pattern Explanation
- [ ] Explains WHY this pattern applies
- [ ] Gives the core insight, not full solution
- [ ] Would help someone understand the pattern choice

---

## Appendix: Pattern Name Reference

These terms should NEVER appear in hints:

**Data Structures**: Hash Map, Hash Set, Hashmap, HashMap, Dictionary, Trie, Heap, Priority Queue, Stack, Queue, Linked List, Tree, Graph

**Algorithms**: Binary Search, BFS, DFS, Breadth-First, Depth-First, Dijkstra, Bellman-Ford, Floyd-Warshall, Topological Sort, Union Find, Kadane

**Techniques**: Dynamic Programming, DP, Memoization, Two Pointers, Sliding Window, Greedy, Backtracking, Divide and Conquer, Recursion (when it's the pattern)

**Acceptable in Hints**: array, list, pointer, index, counter, variable, loop, iterate, scan, track, store, remember, check
