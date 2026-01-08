// PatternPulse Problem Database
// Single source of truth for all problem data
// Format: leetcodeId -> problem data
// Filtered to only include problems with hints (256 problems)

const PROBLEM_DATABASE = {
  "1": {
    "title": "Two Sum",
    "slug": "two-sum",
    "difficulty": "easy",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "Arrays & Hashing",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [
      "Two Pointers"
    ],
    "patternExplanations": {
      "Hash Map": "Store each number's index as you iterate. For each number, check if (target - num) exists in the map. This gives O(1) lookup for complements.",
      "Two Pointers": "If you sort first, use left/right pointers moving inward. However, you'd need to track original indices, making Hash Map cleaner for this problem."
    },
    "hints": [
      "For each number, what other number would you need to reach the target?",
      "Instead of checking every pair (O(n^2)), can you remember what you've seen before?",
      "What data structure lets you check 'have I seen this value?' in O(1) time?"
    ],
    "solution": {
      "approach": "Single-pass hash map: for each num, check if (target - num) is in the map, then add num to the map.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "The complement of each number is known instantly, so we just need fast lookup."
    }
  },
  "2": {
    "title": "Add Two Numbers",
    "slug": "add-two-numbers",
    "difficulty": "medium",
    "primaryPattern": "Linked List",
    "acceptablePatterns": [],
    "explanation": "Pointer manipulation for reversing, merging, detecting cycles, or finding intersections in linked structures.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Linked List",
    "patternExplanations": {
      "Linked List": "Traverse both lists simultaneously, summing digits plus carry. Create new nodes for each digit of the result."
    },
    "hints": [
      "Think about how you add numbers by hand - digit by digit from right to left.",
      "The lists are already reversed, so you can traverse left to right. What do you need to track between digits?",
      "Keep track of the carry. When sum >= 10, carry = 1 for the next digit."
    ],
    "solution": {
      "approach": "Iterate both lists, sum corresponding digits plus carry. Create new node with sum % 10, carry = sum / 10.",
      "timeComplexity": "O(max(n, m))",
      "spaceComplexity": "O(max(n, m))",
      "keyInsight": "Since lists are reversed, we process from least significant digit - perfect for addition with carry."
    }
  },
  "3": {
    "title": "Longest Substring Without Repeating Characters",
    "slug": "longest-substring-without-repeating-characters",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Sliding Window",
    "primaryPattern": "Sliding Window",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "patternExplanations": {
      "Sliding Window": "Expand right pointer. When duplicate found, shrink left until no duplicates. Track characters in window with a set.",
      "Hash Map": "Store last seen index of each character. Jump left pointer past duplicate's previous position. Slightly optimized."
    },
    "hints": [
      "Use a window [left, right] representing current substring. When is it valid?",
      "Window is valid when all characters in it are unique. How do you check uniqueness?",
      "When you find a duplicate, slide left pointer until the duplicate is removed."
    ],
    "solution": {
      "approach": "Sliding window with HashSet. Expand right, add char. If duplicate, remove chars from left until valid.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(min(n, alphabet size))",
      "keyInsight": "Maintain a window of unique characters. Shrink from left when uniqueness is violated."
    }
  },
  "4": {
    "title": "Median of Two Sorted Arrays",
    "slug": "median-of-two-sorted-arrays",
    "difficulty": "hard",
    "primaryPattern": "Binary Search",
    "acceptablePatterns": [],
    "explanation": "Divide and conquer on sorted data. Repeatedly halve the search space by comparing with middle element.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Binary Search",
    "patternExplanations": {
      "Binary Search": "Binary search on the smaller array to find the correct partition. The partition divides both arrays such that left half <= right half."
    },
    "hints": [
      "The median splits elements into two equal halves. How can you partition two sorted arrays?",
      "If you know how many elements should be on the left, can you efficiently find the right partition point by eliminating half the possibilities each time?",
      "Focus on the smaller array. For each partition guess, check if maxLeft <= minRight for both arrays to validate it."
    ],
    "solution": {
      "approach": "Binary search on smaller array for partition point. Verify partition is valid when maxLeftA <= minRightB and maxLeftB <= minRightA.",
      "timeComplexity": "O(log(min(n, m)))",
      "spaceComplexity": "O(1)",
      "keyInsight": "Finding median = finding correct partition. Binary search finds it in log time."
    }
  },
  "5": {
    "title": "Longest Palindromic Substring",
    "slug": "longest-palindromic-substring",
    "difficulty": "medium",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Dynamic Programming"
    ],
    "explanation": "Two pointers technique - use multiple indices to traverse the data structure efficiently, often from opposite ends or at different speeds.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Dynamic Programming",
    "patternExplanations": {
      "Two Pointers": "Expand around each center (both odd and even length palindromes). Track the longest found.",
      "Dynamic Programming": "dp[i][j] = true if s[i..j] is palindrome. Build from smaller substrings to larger."
    },
    "hints": [
      "A palindrome reads the same forwards and backwards. What's at the center?",
      "Try expanding outward from each possible center position.",
      "Don't forget: centers can be between characters (even-length palindromes) or on characters (odd-length)."
    ],
    "solution": {
      "approach": "For each index, expand around center for both odd and even length palindromes. Track longest.",
      "timeComplexity": "O(n^2)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Every palindrome has a center. Expand from center to find all palindromes."
    }
  },
  "6": {
    "title": "Zigzag Conversion",
    "slug": "zigzag-conversion",
    "difficulty": "medium",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "patternExplanations": {
      "Two Pointers": "Use a direction pointer that bounces between moving down and up through the rows. Track current row as you iterate through the string.",
      "Hash Map": "Map each row index to its characters. Iterate through string, changing row direction at boundaries."
    },
    "hints": [
      "Visualize writing characters in a zigzag: down to numRows, then diagonally up to row 0, repeat.",
      "What determines when you change direction? Think about the row boundaries.",
      "Use an array of strings (one per row) and a direction variable that flips at row 0 and numRows-1."
    ],
    "solution": {
      "approach": "Create numRows strings. Iterate through input, appending each char to current row. Flip direction at top/bottom rows. Concatenate all rows.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Simulate the zigzag pattern by tracking current row and direction. Boundary rows trigger direction change."
    }
  },
  "7": {
    "title": "Reverse Integer",
    "slug": "reverse-integer",
    "difficulty": "medium",
    "primaryPattern": "Math",
    "acceptablePatterns": [],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Math",
    "patternExplanations": {
      "Math": "Extract digits using modulo, build reversed number. Check for overflow before each operation."
    },
    "hints": [
      "How do you get the last digit of a number? How do you remove it?",
      "Build the reversed number digit by digit: result = result * 10 + digit.",
      "Watch out for 32-bit integer overflow! Check before multiplying by 10."
    ],
    "solution": {
      "approach": "Pop digits with x % 10, push to result with result * 10 + digit. Check overflow bounds.",
      "timeComplexity": "O(log x)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Use modulo and division to extract and remove digits. Handle overflow carefully."
    }
  },
  "8": {
    "title": "String to Integer (atoi)",
    "slug": "string-to-integer-atoi",
    "difficulty": "medium",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Two Pointers": "Use a pointer to track position while parsing: skip whitespace, handle sign, then extract digits until non-digit or overflow."
    },
    "hints": [
      "Break it into steps: 1) skip whitespace, 2) check for +/- sign, 3) read digits.",
      "When building the number, how do you detect overflow before it happens?",
      "Check if result > INT_MAX/10 or (result == INT_MAX/10 and digit > 7) before adding each digit."
    ],
    "solution": {
      "approach": "Skip whitespace, parse optional sign, then build number digit by digit. Check overflow before each multiply/add.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Handle edge cases systematically: whitespace, sign, overflow. Check overflow BEFORE the operation that would cause it."
    }
  },
  "9": {
    "title": "Palindrome Number",
    "slug": "palindrome-number",
    "difficulty": "easy",
    "primaryPattern": "Math",
    "acceptablePatterns": [
      "Two Pointers"
    ],
    "patternExplanations": {
      "Math": "Reverse half the number and compare with the other half. No string conversion needed.",
      "Two Pointers": "Convert to string and use two pointers from both ends, comparing characters."
    },
    "hints": [
      "Negative numbers are never palindromes. What about numbers ending in 0?",
      "Can you solve this without converting to a string? Think about reversing digits.",
      "You only need to reverse HALF the number. How do you know when you've reached the middle?"
    ],
    "solution": {
      "approach": "Reverse the second half of the number. Compare with first half. Stop when reversed >= remaining.",
      "timeComplexity": "O(log n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Reverse only half the digits to avoid overflow. When reversed >= original/10, you've passed the middle."
    }
  },
  "10": {
    "title": "Regular Expression Matching",
    "slug": "regular-expression-matching",
    "difficulty": "hard",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Dynamic Programming",
    "patternExplanations": {
      "Dynamic Programming": "dp[i][j] = does s[0..i] match p[0..j]? Handle '.', '*' cases carefully."
    },
    "hints": [
      "'.' matches any single character. '*' matches zero or more of the preceding element.",
      "Think about what happens with 'a*' - it can match '', 'a', 'aa', 'aaa', etc.",
      "For '*', either use it zero times (skip pattern by 2) or use it once and stay on same pattern position."
    ],
    "solution": {
      "approach": "2D DP where dp[i][j] means s[0..i-1] matches p[0..j-1]. Handle '*' by checking zero or more matches.",
      "timeComplexity": "O(n * m)",
      "spaceComplexity": "O(n * m)",
      "keyInsight": "For '*', check both possibilities: skip the pattern (zero matches) or match and stay."
    }
  },
  "11": {
    "title": "Container With Most Water",
    "slug": "container-with-most-water",
    "difficulty": "medium",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "Two Pointers",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Greedy"
    ],
    "patternExplanations": {
      "Two Pointers": "Start with widest container (left=0, right=n-1). Move the shorter side inward - moving the taller side can only decrease area.",
      "Greedy": "The greedy choice is always moving the shorter line. You can't improve by moving the taller line since width decreases."
    },
    "hints": [
      "Area = min(height[left], height[right]) × (right - left). Start with max width.",
      "When you move a pointer, width decreases. When is it worth it?",
      "Moving the taller line can never help - the shorter line still limits height. Move the shorter one."
    ],
    "solution": {
      "approach": "Two pointers at ends. Calculate area. Move the pointer with shorter height. Track max area.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "The shorter line is the bottleneck. Moving it might find a taller line; moving the taller line can't help."
    }
  },
  "12": {
    "title": "Integer to Roman",
    "slug": "integer-to-roman",
    "difficulty": "medium",
    "primaryPattern": "Greedy",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "patternExplanations": {
      "Greedy": "Greedily subtract the largest possible Roman value at each step. Include special cases like 4, 9, 40, 90, etc.",
      "Hash Map": "Map values to symbols (including subtractive cases). Iterate from largest to smallest."
    },
    "hints": [
      "Roman numerals use subtractive notation: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900.",
      "What if you had a list of all values (including subtractive ones) in descending order?",
      "Greedily pick the largest value that fits, subtract it, and append the symbol. Repeat until num = 0."
    ],
    "solution": {
      "approach": "Create value-symbol pairs including subtractive cases. Iterate from largest to smallest, appending symbols while value fits.",
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Include subtractive pairs (4, 9, 40, 90, 400, 900) in your mapping to handle them naturally."
    }
  },
  "13": {
    "title": "Roman to Integer",
    "slug": "roman-to-integer",
    "difficulty": "easy",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Hash Map": "Map each Roman symbol to its value. If current value < next value, subtract it; otherwise add it."
    },
    "hints": [
      "I=1, V=5, X=10, L=50, C=100, D=500, M=1000. How do IV and IX work?",
      "In IV, I comes before V. When does a smaller value come before a larger one?",
      "If s[i] < s[i+1], subtract s[i]; otherwise add s[i]. This handles all subtractive cases."
    ],
    "solution": {
      "approach": "Map symbols to values. Scan left to right: if current < next, subtract current; else add current.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Subtractive notation means smaller-before-larger = subtract. This single rule handles all cases."
    }
  },
  "14": {
    "title": "Longest Common Prefix",
    "slug": "longest-common-prefix",
    "difficulty": "easy",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Trie",
      "Binary Search"
    ],
    "patternExplanations": {
      "Two Pointers": "Use vertical scanning: compare characters at the same position across all strings. Stop when characters differ or a string ends. Build prefix character by character.",
      "Trie": "Insert all strings into a Trie. Traverse from root while each node has exactly one child and isn't a word end. Overkill for single query but efficient for repeated prefix queries.",
      "Binary Search": "Binary search on prefix length. For a given length, check if all strings share that prefix. Use min string length as upper bound."
    },
    "hints": [
      "What happens if you compare the first character of every string? When can you safely add it to the result?",
      "Instead of comparing strings pairwise, what if you compared all strings at the same character position simultaneously?",
      "Use vertical scanning: at each position i, check if strs[0][i] equals strs[j][i] for all j. Stop when you find a mismatch or reach the end of any string."
    ],
    "solution": {
      "approach": "Vertical scanning: iterate through character positions. At each position, compare the character in the first string against the same position in all other strings. Stop when characters differ or any string ends. Return the prefix built so far.",
      "timeComplexity": "O(S) where S is sum of all characters in all strings",
      "spaceComplexity": "O(1) extra space (output not counted)",
      "keyInsight": "The common prefix can only be as long as the shortest string, and any mismatch at position i means the prefix ends at i-1."
    }
  },
  "15": {
    "title": "3Sum",
    "slug": "3sum",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Two Pointers",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "patternExplanations": {
      "Two Pointers": "Sort array. Fix one number, then use two pointers on remaining array to find pairs that sum to -fixed. Skip duplicates to avoid repeats.",
      "Hash Map": "For each pair, check if -(a+b) exists. Harder to handle duplicates efficiently. Two pointers cleaner."
    },
    "hints": [
      "If you fix one number, what problem does finding the other two become?",
      "After fixing nums[i], you need two numbers that sum to -nums[i]. Sound familiar?",
      "Sort first. Then for each i, scan from both ends of the remaining portion. Skip duplicate values."
    ],
    "solution": {
      "approach": "Sort. For each i, use two pointers (i+1, n-1) to find pairs summing to -nums[i]. Skip duplicates.",
      "timeComplexity": "O(n^2)",
      "spaceComplexity": "O(1) excluding output",
      "keyInsight": "Reduce 3Sum to multiple 2Sum problems. Sorting enables two-pointer approach."
    }
  },
  "16": {
    "title": "3Sum Closest",
    "slug": "3sum-closest",
    "difficulty": "medium",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "patternExplanations": {
      "Two Pointers": "Sort array. Fix one element, use two pointers on remaining elements. Track closest sum found. Adjust pointers based on whether current sum is too small or too large.",
      "Hash Map": "For each pair, compute needed third value and track closest. Less efficient than two pointers for this variation since we need the closest match, not exact."
    },
    "hints": [
      "This is similar to 3Sum, but instead of finding exact target, you need to track how close you get. What do you need to keep track of?",
      "If your current sum is less than target, which end should you move to increase the sum? If greater than target?",
      "Sort the array. For each i, scan from both ends (i+1 and n-1). Update closest when |sum-target| improves. Move left if sum<target, right if sum>target."
    ],
    "solution": {
      "approach": "Sort array. For each element at i, use two pointers on remaining array. Track the sum closest to target. Move pointers based on comparison with target.",
      "timeComplexity": "O(n^2)",
      "spaceComplexity": "O(1) or O(n) depending on sort implementation",
      "keyInsight": "Sorting enables two-pointer technique. Track closest sum by comparing absolute differences from target."
    }
  },
  "17": {
    "title": "Letter Combinations of a Phone Number",
    "slug": "letter-combinations-of-a-phone-number",
    "difficulty": "medium",
    "primaryPattern": "Backtracking",
    "acceptablePatterns": [],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "Backtracking",
    "patternExplanations": {
      "Backtracking": "Map each digit to letters. Recursively build combinations by choosing one letter per digit."
    },
    "hints": [
      "Each digit maps to 3-4 letters (like a phone keypad). Store this mapping.",
      "For each digit, you need to try each of its possible letters.",
      "Process one digit at a time. For each possible letter, build the combination and move to the next digit."
    ],
    "solution": {
      "approach": "Create digit-to-letters map. Backtrack through digits, for each trying all possible letters.",
      "timeComplexity": "O(4^n) where n is digits length",
      "spaceComplexity": "O(n) for recursion depth",
      "keyInsight": "Classic backtracking: at each step, try all choices (letters), recurse, then backtrack."
    }
  },
  "18": {
    "title": "4Sum",
    "slug": "4sum",
    "difficulty": "medium",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "patternExplanations": {
      "Two Pointers": "Sort array. Use two nested loops to fix first two elements. Then use two pointers on remaining array to find pairs that complete the target sum. Skip duplicates at each level.",
      "Hash Map": "Store pairs and their sums. For each new pair, check if target minus their sum exists. Handling duplicates requires careful bookkeeping."
    },
    "hints": [
      "This extends the 3Sum pattern. If you fix one more element, what does the remaining problem become?",
      "With two elements fixed (outer loops i, j), you need two more elements summing to target - nums[i] - nums[j]. What technique solves 2Sum efficiently on sorted data?",
      "Sort array. Two outer loops fix first two elements. Scan from both ends to find the remaining two. Skip duplicates at each of the four positions."
    ],
    "solution": {
      "approach": "Sort array. Outer loop i from 0 to n-4. Inner loop j from i+1 to n-3. Two pointers left=j+1, right=n-1 find pairs. Skip duplicates at all four positions.",
      "timeComplexity": "O(n^3)",
      "spaceComplexity": "O(1) or O(n) depending on sort",
      "keyInsight": "Generalize kSum pattern: reduce to (k-1)Sum by fixing one element, recursively until 2Sum which uses two pointers."
    }
  },
  "19": {
    "title": "Remove Nth Node From End of List",
    "slug": "remove-nth-node-from-end-of-list",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Linked List",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Linked List"
    ],
    "patternExplanations": {
      "Two Pointers": "Advance first pointer n steps ahead. Then move both until first hits end. Second is at the node before target.",
      "Linked List": "The fast/slow pointer technique lets you find position from end without knowing list length."
    },
    "hints": [
      "Nth from end means: when one marker reaches the end, another marker should be at the target.",
      "How far apart should two markers be so when one reaches the end, the other is at the nth from end?",
      "A gap of n between markers. Use a dummy node to handle the edge case of removing the head."
    ],
    "solution": {
      "approach": "Dummy node -> head. Fast moves n+1 ahead, then both move until fast is null. Remove slow.next.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Two pointers with fixed gap translate 'from end' into 'from start'."
    }
  },
  "20": {
    "title": "Valid Parentheses",
    "slug": "valid-parentheses",
    "difficulty": "easy",
    "lists": [
      "neetcode-150"
    ],
    "category": "Stack",
    "primaryPattern": "Stack",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Stack": "Push opening brackets. For closing brackets, pop and check if it matches. Stack should be empty at end."
    },
    "hints": [
      "Every closing bracket must match the most recent unmatched opening bracket.",
      "What data structure gives you the 'most recent' item?",
      "Push opening brackets. When you see a closing bracket, pop and verify they match."
    ],
    "solution": {
      "approach": "Stack of opening brackets. Pop on closing bracket and verify match. Valid if stack empty at end.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "LIFO order of stack matches the nesting structure of balanced brackets."
    }
  },
  "21": {
    "title": "Merge Two Sorted Lists",
    "slug": "merge-two-sorted-lists",
    "difficulty": "easy",
    "lists": [
      "neetcode-150"
    ],
    "category": "Linked List",
    "primaryPattern": "Linked List",
    "acceptablePatterns": [
      "Two Pointers"
    ],
    "patternExplanations": {
      "Linked List": "Use a dummy head. Compare current nodes of both lists, append smaller one. Move that list's pointer forward.",
      "Two Pointers": "Two pointers, one for each list. Compare values, advance the pointer with smaller value."
    },
    "hints": [
      "Similar to merge step in merge sort. Compare heads, take smaller.",
      "Use a dummy node to simplify handling the head of result list.",
      "After one list is exhausted, append the rest of the other list."
    ],
    "solution": {
      "approach": "Dummy head, current pointer. Compare l1.val and l2.val, link smaller, advance that pointer. Attach remaining.",
      "timeComplexity": "O(n + m)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Classic merge: always take the smaller element from the two sorted sources."
    }
  },
  "22": {
    "title": "Generate Parentheses",
    "slug": "generate-parentheses",
    "difficulty": "medium",
    "primaryPattern": "Backtracking",
    "acceptablePatterns": [],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Backtracking",
    "patternExplanations": {
      "Backtracking": "Track open and close count. Add '(' if open < n, add ')' if close < open. Backtrack when invalid."
    },
    "hints": [
      "A valid sequence has n '(' and n ')'. When can you add each?",
      "You can add '(' anytime you haven't used all n. When can you add ')'?",
      "Add ')' only if you have more '(' than ')' so far. This ensures validity."
    ],
    "solution": {
      "approach": "Backtrack with open/close counts. Add '(' if open < n, add ')' if close < open.",
      "timeComplexity": "O(4^n / sqrt(n)) - Catalan number",
      "spaceComplexity": "O(n)",
      "keyInsight": "The key constraint: at any point, close count <= open count."
    }
  },
  "23": {
    "title": "Merge k Sorted Lists",
    "slug": "merge-k-sorted-lists",
    "difficulty": "hard",
    "primaryPattern": "Heap",
    "acceptablePatterns": [
      "Linked List"
    ],
    "explanation": "Pointer manipulation for reversing, merging, detecting cycles, or finding intersections in linked structures.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Linked List",
    "patternExplanations": {
      "Heap": "Use min-heap to always get smallest among all list heads. Pop min, add its next to heap.",
      "Linked List": "Divide and conquer: merge pairs of lists recursively until one remains."
    },
    "hints": [
      "You need to repeatedly find the minimum among k current elements. What data structure helps?",
      "What if you could always get the smallest element in O(log k) time, even as elements change?",
      "Keep all current list heads organized. Pop the smallest, add it to result, then add its next node back."
    ],
    "solution": {
      "approach": "Min-heap of size k. Pop smallest, add to result, push popped node's next to heap.",
      "timeComplexity": "O(n log k) where n is total nodes",
      "spaceComplexity": "O(k) for heap",
      "keyInsight": "Heap maintains k candidates efficiently. Each node enters/exits heap once."
    }
  },
  "24": {
    "title": "Swap Nodes in Pairs",
    "slug": "swap-nodes-in-pairs",
    "difficulty": "medium",
    "primaryPattern": "Linked List",
    "acceptablePatterns": [
      "Recursion"
    ],
    "patternExplanations": {
      "Linked List": "Use iterative approach with dummy node. For each pair, rewire: prev->second, second->first, first->next pair. Move prev forward by two.",
      "Recursion": "Base case: less than 2 nodes. Recursive case: swap first two, connect first (now second) to result of recursion on rest."
    },
    "hints": [
      "For each pair of nodes, what pointers need to change? Draw it out with boxes and arrows.",
      "Consider using a dummy node before head. This simplifies handling the head swap. What should prev.next point to after swapping?",
      "For nodes A->B->C: need B->A->C. So prev.next=B, A.next=B.next, B.next=A. Then prev=A."
    ],
    "solution": {
      "approach": "Use dummy node. While two nodes exist: save references, rewire prev->second->first->rest, advance prev by two positions.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1) iterative, O(n) recursive",
      "keyInsight": "Dummy node simplifies edge cases. Process pairs, update three pointers per swap, advance by two."
    }
  },
  "25": {
    "title": "Reverse Nodes in k-Group",
    "slug": "reverse-nodes-in-k-group",
    "difficulty": "hard",
    "primaryPattern": "Linked List",
    "acceptablePatterns": [],
    "explanation": "Pointer manipulation for reversing, merging, detecting cycles, or finding intersections in linked structures.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Linked List",
    "patternExplanations": {
      "Linked List": "Count k nodes, reverse them, connect to next group. Use recursion or iteration with careful pointer management."
    },
    "hints": [
      "First check if there are k nodes remaining. If not, don't reverse.",
      "Reverse k nodes in-place. What connections need updating?",
      "After reversing a group, the old head becomes the tail. Connect it to the result of recursing on rest."
    ],
    "solution": {
      "approach": "Check k nodes exist. Reverse k nodes. Recursively process rest. Connect reversed tail to recursive result.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n/k) for recursion or O(1) iterative",
      "keyInsight": "Break into subproblems: reverse k, recurse on rest, connect. The tricky part is pointer management."
    }
  },
  "26": {
    "title": "Remove Duplicates from Sorted Array",
    "slug": "remove-duplicates-from-sorted-array",
    "difficulty": "easy",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Two Pointers": "Slow pointer marks position for next unique element. Fast pointer scans for unique elements. When fast finds a new value, copy it to slow+1 position."
    },
    "hints": [
      "The array is already sorted. What does that tell you about where duplicates will be located?",
      "Use one pointer to track where to place the next unique element, another to scan through the array.",
      "Keep a 'write' pointer at position of last unique. For each element, if different from last unique, increment write pointer and copy."
    ],
    "solution": {
      "approach": "Two pointers: 'write' starts at 0, 'read' scans from 1. When nums[read] != nums[write], increment write and copy nums[read] to nums[write]. Return write+1.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Sorted array means duplicates are adjacent. Write pointer maintains the 'good' portion of array."
    }
  },
  "27": {
    "title": "Remove Element",
    "slug": "remove-element",
    "difficulty": "easy",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Two Pointers": "Keep a write pointer for where to place next non-target element. Scan with read pointer, copying elements that don't match target."
    },
    "hints": [
      "You need to modify the array in-place and return the new length. What elements should be in the first k positions?",
      "Use a pointer to track where to write the next valid element. Only write elements that aren't equal to val.",
      "Write pointer at 0. For each element, if != val, copy to write position and increment write. Return write at end."
    ],
    "solution": {
      "approach": "Single pass with write pointer. Scan array, copy non-target elements to write position. Write pointer at end equals new length.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Similar to remove duplicates. Only keep elements not matching target value."
    }
  },
  "28": {
    "title": "Find the Index of the First Occurrence in a String",
    "slug": "find-the-index-of-the-first-occurrence-in-a-string",
    "difficulty": "easy",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Sliding Window"
    ],
    "patternExplanations": {
      "Two Pointers": "For each starting position in haystack, try to match needle character by character. If all match, return start index.",
      "Sliding Window": "Slide a window of needle's length across haystack. At each position, compare window content with needle. Can optimize with hashing (Rabin-Karp)."
    },
    "hints": [
      "At how many positions in haystack could needle potentially start? What's the last valid starting position?",
      "For each potential start position, you need to verify if the substring matches needle. How do you check this efficiently?",
      "Iterate i from 0 to len(haystack)-len(needle). At each i, compare characters needle[j] with haystack[i+j] for all j."
    ],
    "solution": {
      "approach": "For each valid start index i (0 to m-n), compare substring haystack[i:i+n] with needle. Return i on first match, -1 if none found.",
      "timeComplexity": "O(n*m) naive, O(n+m) with KMP",
      "spaceComplexity": "O(1) naive, O(m) for KMP",
      "keyInsight": "Simple brute force works for most cases. Advanced: KMP or Rabin-Karp avoid redundant comparisons."
    }
  },
  "29": {
    "title": "Divide Two Integers",
    "slug": "divide-two-integers",
    "difficulty": "medium",
    "primaryPattern": "Bit Manipulation",
    "acceptablePatterns": [
      "Math"
    ],
    "patternExplanations": {
      "Bit Manipulation": "Use bit shifting to find largest 2^k such that divisor*2^k <= dividend. Subtract and repeat. This is essentially long division in binary.",
      "Math": "Repeated subtraction is too slow. Instead, double the divisor repeatedly to subtract larger chunks at once."
    },
    "hints": [
      "You can't use multiplication or division. But what operation is equivalent to multiplying by 2? What about dividing by 2?",
      "Think of division as repeated subtraction. But subtracting one at a time is O(n). How can you subtract larger chunks?",
      "Double the divisor (shift left) until it exceeds dividend. Then subtract the largest fitting multiple and repeat on remainder."
    ],
    "solution": {
      "approach": "Handle signs and overflow. Repeatedly find largest k where divisor<<k <= dividend. Add 1<<k to quotient, subtract divisor<<k from dividend. Repeat until dividend < divisor.",
      "timeComplexity": "O(log^2 n) or O(log n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Left shift = multiply by 2, right shift = divide by 2. Use doubling to efficiently find how many times divisor fits."
    }
  },
  "30": {
    "title": "Substring with Concatenation of All Words",
    "slug": "substring-with-concatenation-of-all-words",
    "difficulty": "hard",
    "primaryPattern": "Sliding Window",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "patternExplanations": {
      "Sliding Window": "All words have same length. Slide window of total length (word_len * num_words). Use hash map to track word frequencies in current window.",
      "Hash Map": "Store required word frequencies. For each start position, extract words and compare frequencies. Check at each valid starting offset (0 to word_len-1)."
    },
    "hints": [
      "All words have the same length. What is the total length of a valid concatenation? How many starting positions could work?",
      "Store word frequencies. For a given window, extract each word-length chunk and compare against required frequencies.",
      "Optimize: instead of checking every position, try starting offsets 0 to word_len-1. Slide window by word_len each time, adding/removing one word."
    ],
    "solution": {
      "approach": "For each start offset (0 to word_len-1), use sliding window of size word_len*num_words. Track word counts with hash map. When counts match target, record index.",
      "timeComplexity": "O(n * word_len)",
      "spaceComplexity": "O(num_words * word_len)",
      "keyInsight": "Fixed word length allows treating string as sequence of word-sized chunks. Sliding window avoids recomputing entire substring."
    }
  },
  "31": {
    "title": "Next Permutation",
    "slug": "next-permutation",
    "difficulty": "medium",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Math"
    ],
    "patternExplanations": {
      "Two Pointers": "Find rightmost ascending pair (nums[i] < nums[i+1]). Find rightmost element larger than nums[i], swap them. Reverse suffix after i.",
      "Math": "Think of permutations as counting in a special number system. To get next number, find the rightmost digit that can be incremented."
    },
    "hints": [
      "If the array is in descending order, there's no next permutation (it's the largest). What makes a permutation 'smaller' than another?",
      "From the right, find the first element that's smaller than its right neighbor. This is where we can make a larger permutation.",
      "Find rightmost i where nums[i] < nums[i+1]. Find smallest element in suffix larger than nums[i], swap them. Reverse the suffix to get smallest next permutation."
    ],
    "solution": {
      "approach": "1) Find largest i with nums[i] < nums[i+1]. 2) Find largest j > i with nums[j] > nums[i]. 3) Swap nums[i] and nums[j]. 4) Reverse suffix after i.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "The suffix after the swap point is in descending order. Reversing it gives the smallest arrangement of those digits."
    }
  },
  "32": {
    "title": "Longest Valid Parentheses",
    "slug": "longest-valid-parentheses",
    "difficulty": "hard",
    "primaryPattern": "Stack",
    "acceptablePatterns": [
      "Dynamic Programming",
      "Two Pointers"
    ],
    "patternExplanations": {
      "Stack": "Push indices to stack. On '(' push index. On ')' pop; if stack empty push current index as new base, else length = current_index - stack.top().",
      "Dynamic Programming": "dp[i] = length of longest valid ending at i. If s[i]=')', check s[i-1] and s[i-dp[i-1]-1] to extend valid substring.",
      "Two Pointers": "Two passes: left-to-right counting open/close, reset when close > open. Right-to-left similarly. Track max when counts equal."
    },
    "hints": [
      "How do you know when a parentheses substring becomes invalid? When can you update the maximum valid length?",
      "Track indices of '(' that haven't been matched yet. What should you do when you see a ')'?",
      "Push -1 initially as base. On '(' push index. On ')' pop; if empty push current as new base, else max length = i - top."
    ],
    "solution": {
      "approach": "Stack of indices starting with -1. '(' pushes its index. ')' pops; if stack empty push i as new base, else compute length as i - stack.top() and update max.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n) for stack",
      "keyInsight": "Stack tracks unmatched '(' positions. The -1 (or last unmatched ')' index) serves as length calculation base."
    }
  },
  "33": {
    "title": "Search in Rotated Sorted Array",
    "slug": "search-in-rotated-sorted-array",
    "difficulty": "medium",
    "primaryPattern": "Binary Search",
    "acceptablePatterns": [],
    "explanation": "Divide and conquer on sorted data. Repeatedly halve the search space by comparing with middle element.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Binary Search",
    "patternExplanations": {
      "Binary Search": "Find which half is sorted. If target is in sorted half, search there; otherwise search other half."
    },
    "hints": [
      "The array is sorted but rotated. At least one half is always sorted.",
      "Compare mid with left to determine which half is sorted.",
      "If target is in the sorted half's range, search there. Otherwise search the other half."
    ],
    "solution": {
      "approach": "Binary search. Determine sorted half by comparing nums[mid] with nums[left]. Check if target in sorted range.",
      "timeComplexity": "O(log n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "One half is always sorted. Use that to decide which half to search."
    }
  },
  "34": {
    "title": "Find First and Last Position of Element in Sorted Array",
    "slug": "find-first-and-last-position-of-element-in-sorted-array",
    "difficulty": "medium",
    "primaryPattern": "Binary Search",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Binary Search": "Run two binary searches: one to find leftmost occurrence (keep going left when equal), one to find rightmost (keep going right when equal)."
    },
    "hints": [
      "Searching finds any occurrence. How do you find the first occurrence specifically? The last?",
      "When you find target, don't stop. To find first, continue searching left half. To find last, continue searching right half.",
      "For leftmost: when nums[mid] >= target, go left (right = mid-1), but record mid if equal. For rightmost: when nums[mid] <= target, go right."
    ],
    "solution": {
      "approach": "Two binary searches. findFirst: if nums[mid] >= target, right = mid-1 (record if equal). findLast: if nums[mid] <= target, left = mid+1 (record if equal).",
      "timeComplexity": "O(log n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Modified binary search doesn't stop at first match. Instead, it narrows to the boundary of the target range."
    }
  },
  "35": {
    "title": "Search Insert Position",
    "slug": "search-insert-position",
    "difficulty": "easy",
    "primaryPattern": "Binary Search",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Binary Search": "Standard binary search. If found, return index. If not found, left pointer ends up at the correct insertion position."
    },
    "hints": [
      "Where would you insert a number in a sorted array to keep it sorted? It's the position of the first element >= target.",
      "Searching naturally converges to the insertion point when the target isn't found. What does the left index point to when the loop ends?",
      "Halve the search space repeatedly. When the loop ends without finding target, the left index is at the insertion position (first element >= target)."
    ],
    "solution": {
      "approach": "Binary search: while left <= right, check mid. If found return mid. If target < nums[mid], right = mid-1. Else left = mid+1. Return left.",
      "timeComplexity": "O(log n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Binary search's left pointer naturally lands on the insertion point - the first index where nums[i] >= target."
    }
  },
  "36": {
    "title": "Valid Sudoku",
    "slug": "valid-sudoku",
    "difficulty": "medium",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Arrays & Hashing",
    "patternExplanations": {
      "Hash Map": "Use sets to track seen numbers in each row, column, and 3x3 box. Check for duplicates."
    },
    "hints": [
      "Each row, column, and 3x3 box must contain unique digits 1-9.",
      "How do you identify which 3x3 box a cell belongs to?",
      "Box index = (row / 3) * 3 + (col / 3). Use sets to track seen numbers in each row, col, and box."
    ],
    "solution": {
      "approach": "Use 9 sets for rows, 9 for columns, 9 for boxes. For each cell, check if number already in its row/col/box set.",
      "timeComplexity": "O(81) = O(1)",
      "spaceComplexity": "O(81) = O(1)",
      "keyInsight": "Box index formula: (row/3)*3 + (col/3) maps each cell to its 3x3 box."
    }
  },
  "37": {
    "title": "Sudoku Solver",
    "slug": "sudoku-solver",
    "difficulty": "hard",
    "primaryPattern": "Backtracking",
    "acceptablePatterns": [
      "DFS"
    ],
    "patternExplanations": {
      "Backtracking": "Find empty cell. Try digits 1-9. For each valid digit (no conflict in row/col/box), place it and recurse. If recursion fails, backtrack by removing digit.",
      "DFS": "Treat as constraint satisfaction. DFS through empty cells, pruning invalid branches early using sudoku rules."
    },
    "hints": [
      "For each empty cell, what digits are valid (not already in same row, column, or 3x3 box)?",
      "Try placing a valid digit, then continue solving. If you reach a dead end, what should you do?",
      "Find next empty cell. Try 1-9. If valid (check row/col/box), place and continue. If that path fails, remove digit and try next. If all fail, return false."
    ],
    "solution": {
      "approach": "Backtracking: find empty cell, try digits 1-9. For each valid digit, place and recurse. On failure, backtrack. Use sets/arrays for O(1) validity checking.",
      "timeComplexity": "O(9^(empty cells)) worst case",
      "spaceComplexity": "O(81) for board, O(81) for recursion",
      "keyInsight": "Backtracking explores solution space systematically. Constraint propagation (tracking valid digits per cell) speeds it up significantly."
    }
  },
  "38": {
    "title": "Count and Say",
    "slug": "count-and-say",
    "difficulty": "medium",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Recursion"
    ],
    "patternExplanations": {
      "Two Pointers": "Use two pointers to group consecutive identical digits. For each group, append count + digit to result. Iterate n-1 times.",
      "Recursion": "Base case: n=1 returns '1'. Recursive case: get (n-1)th term, then describe it by counting consecutive digits."
    },
    "hints": [
      "Start with '1'. Each term describes the previous by counting consecutive groups. '111221' has one 1, one 1, two 2s, one 1.",
      "To generate next term, scan current term grouping consecutive identical digits. For each group, output 'count' + 'digit'.",
      "Use two indices: i starts at 0, j finds end of run of same digit. Append (j-i) + str[i] to result. Set i = j and repeat."
    ],
    "solution": {
      "approach": "Start with '1'. Iterate n-1 times. For each iteration, scan string grouping consecutive digits, outputting count + digit for each group.",
      "timeComplexity": "O(2^n) for length of string growth",
      "spaceComplexity": "O(2^n) for string storage",
      "keyInsight": "Run-length encoding: describe consecutive groups. Two pointers efficiently find where each run of digits ends."
    }
  },
  "39": {
    "title": "Combination Sum",
    "slug": "combination-sum",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Backtracking",
    "primaryPattern": "Backtracking",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Backtracking": "Try adding each candidate (can reuse). If sum = target, record. If sum > target, backtrack. Recurse."
    },
    "hints": [
      "Can use same number multiple times. When should you stop adding?",
      "Build combination by adding candidates. If you overshoot target, undo and try other options.",
      "To avoid duplicates like [2,3] and [3,2], only consider candidates from current index onward."
    ],
    "solution": {
      "approach": "Backtrack with index, current combination, current sum. For each candidate from index onward, try including it (recurse with same index).",
      "timeComplexity": "O(n^(target/min))",
      "spaceComplexity": "O(target/min)",
      "keyInsight": "Allowing repeats means recursing with same index. Starting from index i avoids duplicates."
    }
  },
  "40": {
    "title": "Combination Sum II",
    "slug": "combination-sum-ii",
    "difficulty": "medium",
    "primaryPattern": "Backtracking",
    "acceptablePatterns": [],
    "explanation": "Explore all possible solutions recursively. Build candidates incrementally and abandon paths that cannot lead to solution.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Backtracking",
    "patternExplanations": {
      "Backtracking": "Sort array first. Skip duplicates at same recursion level to avoid duplicate combinations."
    },
    "hints": [
      "Similar to Combination Sum, but each number can only be used once.",
      "How do you avoid duplicate combinations like [1,2,2] appearing twice?",
      "Sort the array. At each level, skip duplicate numbers after the first one."
    ],
    "solution": {
      "approach": "Sort input. Backtrack, but skip duplicates: if candidates[i] == candidates[i-1] and we didn't use i-1, skip i.",
      "timeComplexity": "O(2^n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Sorting + skipping consecutive duplicates at same level prevents duplicate combinations."
    }
  },
  "41": {
    "title": "First Missing Positive",
    "slug": "first-missing-positive",
    "difficulty": "hard",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [
      "Array"
    ],
    "patternExplanations": {
      "Hash Map": "The answer must be in range [1, n+1]. Use the array itself as a hash map: place each value v in position v-1. Then scan for first mismatch.",
      "Array": "Cyclic sort: swap nums[i] to its correct position nums[i]-1 until all valid numbers are placed. First index i where nums[i] != i+1 gives answer."
    },
    "hints": [
      "The answer must be between 1 and n+1 (where n is array length). Why? What if array has all of 1 to n?",
      "Can you use the array itself as storage? What if position i stores value i+1?",
      "Cyclic sort: while nums[i] is in valid range and not in correct position, swap it to its correct place. Then scan for first position where nums[i] != i+1."
    ],
    "solution": {
      "approach": "Cyclic sort: for each index, swap nums[i] to position nums[i]-1 until it's correct or invalid. Then find first i where nums[i] != i+1. Return i+1.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Use array as hash map: index i should hold value i+1. Each number moves at most once, so linear time."
    }
  },
  "42": {
    "title": "Trapping Rain Water",
    "slug": "trapping-rain-water",
    "difficulty": "hard",
    "lists": [
      "neetcode-150"
    ],
    "category": "Two Pointers",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Dynamic Programming",
      "Stack"
    ],
    "patternExplanations": {
      "Two Pointers": "Water at position i = min(maxLeft, maxRight) - height[i]. Use two pointers tracking running max from each side. Process the smaller side.",
      "Dynamic Programming": "Precompute maxLeft[i] and maxRight[i] arrays. Water at i = min(maxLeft[i], maxRight[i]) - height[i]. O(n) space.",
      "Stack": "Use monotonic decreasing stack. When you find a taller bar, pop and calculate water trapped in the 'valley'. More complex."
    },
    "hints": [
      "Water at any position depends on the tallest bars to its left and right. Why?",
      "Water level = min(tallest left, tallest right). Water trapped = water level - ground height.",
      "Can you track left max and right max as you go, without precomputing?"
    ],
    "solution": {
      "approach": "Two pointers with leftMax and rightMax. Process from the side with smaller max (that side determines water level).",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Water level at any point is determined by the minimum of the maximum heights on either side."
    }
  },
  "43": {
    "title": "Multiply Strings",
    "slug": "multiply-strings",
    "difficulty": "medium",
    "primaryPattern": "Math",
    "acceptablePatterns": [],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Math",
    "patternExplanations": {
      "Math": "Multiply digit by digit like grade school multiplication. Handle positions: digit at i and j contributes to position i+j."
    },
    "hints": [
      "Think about how you multiply numbers by hand - digit by digit.",
      "When you multiply digit at position i with digit at position j, where does the result go?",
      "Result of num1[i] * num2[j] goes to positions [i+j, i+j+1]. Use an array to accumulate."
    ],
    "solution": {
      "approach": "Create result array of length m+n. For each pair of digits, add product to appropriate positions with carry.",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(m + n)",
      "keyInsight": "Position math: product of digits at i,j affects positions i+j and i+j+1."
    }
  },
  "44": {
    "title": "Wildcard Matching",
    "slug": "wildcard-matching",
    "difficulty": "hard",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [
      "Greedy",
      "Two Pointers"
    ],
    "patternExplanations": {
      "Dynamic Programming": "dp[i][j] = true if s[0:i] matches p[0:j]. '?' matches any single char. '*' matches any sequence (0 or more). Build table bottom-up.",
      "Greedy": "Track last '*' position. If mismatch and we have a saved '*', backtrack and try matching one more character with the '*'.",
      "Two Pointers": "Linear scan with backtracking. When hitting '*', save position and try matching zero chars first. On mismatch, return to saved '*' and match one more."
    },
    "hints": [
      "'?' matches exactly one character. '*' matches zero or more of any characters. How do these differ in your state transitions?",
      "If pattern[j-1] is '*', the match is valid if star matches empty (check i,j-1) OR star matches one more char (check i-1,j).",
      "If p[j-1]='*', check (i,j-1) for matching nothing OR (i-1,j) for matching current char in s. If p[j-1]='?' or matches s[i-1], check (i-1,j-1)."
    ],
    "solution": {
      "approach": "DP table dp[i][j] for s[0:i] matches p[0:j]. For '*', check dp[i][j-1] || dp[i-1][j]. For '?' or char match, check dp[i-1][j-1].",
      "timeComplexity": "O(m*n)",
      "spaceComplexity": "O(m*n) or O(n) optimized",
      "keyInsight": "* can match empty (look at dp[i][j-1]) or extend match by one char (look at dp[i-1][j])."
    }
  },
  "45": {
    "title": "Jump Game II",
    "slug": "jump-game-ii",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Greedy",
    "primaryPattern": "Greedy",
    "acceptablePatterns": [
      "Dynamic Programming",
      "BFS"
    ],
    "patternExplanations": {
      "Greedy": "Track current range boundary and farthest reachable. When you hit boundary, increment jumps and extend boundary.",
      "BFS": "BFS where level = number of jumps. From each index, you can reach indices up to i + nums[i].",
      "Dynamic Programming": "dp[i] = min jumps to reach i. O(n^2). Greedy is O(n)."
    },
    "hints": [
      "Find minimum jumps to reach the end.",
      "From the current range, find the farthest you can reach. That becomes your next range boundary.",
      "When you must take a jump (reached end of current range), increment jump count."
    ],
    "solution": {
      "approach": "Track jumps, current end, farthest. When i reaches current end, jumps++, current end = farthest.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Each jump expands to the farthest reachable from the current range."
    }
  },
  "46": {
    "title": "Permutations",
    "slug": "permutations",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Backtracking",
    "primaryPattern": "Backtracking",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Backtracking": "Build permutation by choosing unused elements. Use visited set or swap-based approach."
    },
    "hints": [
      "Permutation = arrangement using all elements exactly once.",
      "At each position, try every unused number. Mark as used, recurse, unmark.",
      "Or use swapping: swap element at current position with each element from current to end."
    ],
    "solution": {
      "approach": "Backtrack: track used elements. At each step, try adding each unused element, recurse, then remove.",
      "timeComplexity": "O(n! * n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Permutations are about ordering all elements - explore all orderings via backtracking."
    }
  },
  "47": {
    "title": "Permutations II",
    "slug": "permutations-ii",
    "difficulty": "medium",
    "primaryPattern": "Backtracking",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "patternExplanations": {
      "Backtracking": "Sort array first. Use frequency count or visited array. Skip duplicates by checking if same value was just used at this level (if nums[i] == nums[i-1] and !used[i-1], skip).",
      "Hash Map": "Use counter map for available numbers. At each position, iterate through remaining unique values, decrement count, recurse, then restore count."
    },
    "hints": [
      "Unlike Permutations I, input has duplicates. [1,1,2] shouldn't give [1,1,2] twice. How do you avoid duplicate permutations?",
      "Sort the array. Then when building permutations, skip a number if it equals the previous AND the previous wasn't used in this branch.",
      "With sorted array, for each position, skip nums[i] if nums[i] == nums[i-1] and !used[i-1]. This prevents picking the same value twice at the same level."
    ],
    "solution": {
      "approach": "Sort. Backtrack with used[] array. Skip nums[i] if it equals nums[i-1] and nums[i-1] isn't used (meaning we already tried this value at this level).",
      "timeComplexity": "O(n! * n)",
      "spaceComplexity": "O(n) for recursion",
      "keyInsight": "Sorting groups duplicates. Skip condition ensures we only use each duplicate value once per position in the recursion tree level."
    }
  },
  "48": {
    "title": "Rotate Image",
    "slug": "rotate-image",
    "difficulty": "medium",
    "primaryPattern": "Math",
    "acceptablePatterns": [],
    "explanation": "Depth-first search - explore as deep as possible before backtracking. Use recursion or stack for implementation.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Math & Geometry",
    "patternExplanations": {
      "Math": "Rotate 90° clockwise = transpose + reverse each row. Or do it in-place by rotating 4 cells at a time."
    },
    "hints": [
      "90° clockwise rotation: element at (i,j) goes to (j, n-1-i).",
      "Can you do it in-place? Think of rotating 4 elements at a time.",
      "Easier approach: transpose the matrix (swap rows and columns), then reverse each row."
    ],
    "solution": {
      "approach": "Transpose matrix (swap matrix[i][j] with matrix[j][i]), then reverse each row.",
      "timeComplexity": "O(n^2)",
      "spaceComplexity": "O(1)",
      "keyInsight": "90° rotation = transpose + reverse rows. 270° = transpose + reverse columns."
    }
  },
  "49": {
    "title": "Group Anagrams",
    "slug": "group-anagrams",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Arrays & Hashing",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Hash Map": "Use sorted string (or character count) as the key. All anagrams map to the same key, grouping them automatically."
    },
    "hints": [
      "How can you create a 'signature' that's the same for all anagrams?",
      "If you sort 'eat' and 'tea', what do you get?",
      "Use this signature as a key to group words together."
    ],
    "solution": {
      "approach": "For each word, create a key (sorted string or char frequency tuple). Map key -> list of words.",
      "timeComplexity": "O(n * k log k) where k is max word length",
      "spaceComplexity": "O(n * k)",
      "keyInsight": "A canonical form (sorted string) makes all anagrams hash to the same bucket."
    }
  },
  "50": {
    "title": "Pow(x, n)",
    "slug": "powx-n",
    "difficulty": "medium",
    "primaryPattern": "Binary Search",
    "acceptablePatterns": [
      "Math"
    ],
    "explanation": "Depth-first search - explore as deep as possible before backtracking. Use recursion or stack for implementation.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Math",
    "patternExplanations": {
      "Binary Search": "Use binary exponentiation: x^n = (x^(n/2))^2. Halve the exponent each step.",
      "Math": "Fast power algorithm: if n is even, x^n = (x^2)^(n/2). If odd, x^n = x * x^(n-1)."
    },
    "hints": [
      "Computing x^n by multiplying x n times is O(n). Can you do better?",
      "x^10 = x^5 * x^5. x^5 = x * x^4 = x * (x^2)^2. See the pattern?",
      "Handle negative exponents: x^(-n) = 1 / x^n. Be careful with integer overflow."
    ],
    "solution": {
      "approach": "Binary exponentiation: if n even, return pow(x*x, n/2). If odd, return x * pow(x, n-1).",
      "timeComplexity": "O(log n)",
      "spaceComplexity": "O(log n) or O(1) iterative",
      "keyInsight": "Halving the exponent each time gives logarithmic complexity."
    }
  },
  "51": {
    "title": "N-Queens",
    "slug": "n-queens",
    "difficulty": "hard",
    "primaryPattern": "Backtracking",
    "acceptablePatterns": [],
    "explanation": "Explore all possible solutions recursively. Build candidates incrementally and abandon paths that cannot lead to solution.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Backtracking",
    "patternExplanations": {
      "Backtracking": "Place queens row by row. Track attacked columns and diagonals. Backtrack when no valid position."
    },
    "hints": [
      "Place one queen per row. For each row, try each column.",
      "Queens attack along columns and diagonals. How do you track which are occupied?",
      "For diagonals: cells on same diagonal have same (row-col) or (row+col). Use sets to track."
    ],
    "solution": {
      "approach": "Backtrack row by row. Use sets for columns, positive diagonals (r-c), negative diagonals (r+c).",
      "timeComplexity": "O(n!)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Diagonal tracking: same r-c = same \\ diagonal, same r+c = same / diagonal."
    }
  },
  "52": {
    "title": "N-Queens II",
    "slug": "n-queens-ii",
    "difficulty": "hard",
    "primaryPattern": "Backtracking",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Backtracking": "Same as N-Queens I but only count solutions instead of building board strings. Track column, diagonal, and anti-diagonal occupancy. Increment count when row n reached."
    },
    "hints": [
      "This is the same as N-Queens I, but you only need to count valid arrangements, not construct them.",
      "Row by row, try each column. Track which columns and diagonals are under attack using sets or arrays.",
      "Use sets: cols, diag (r-c), antiDiag (r+c). For row r, try col c if c not in cols, (r-c) not in diag, (r+c) not in antiDiag. Recurse, then remove."
    ],
    "solution": {
      "approach": "Backtrack row by row. Use sets for columns, diagonals (r-c), anti-diagonals (r+c). At row n, increment count. No need to store board positions.",
      "timeComplexity": "O(n!)",
      "spaceComplexity": "O(n) for recursion and sets",
      "keyInsight": "Same algorithm as N-Queens I. Skip board construction since we only need the count. Diagonal tracking: r-c for \\, r+c for /."
    }
  },
  "53": {
    "title": "Maximum Subarray",
    "slug": "maximum-subarray",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Greedy",
    "primaryPattern": "Greedy",
    "acceptablePatterns": [
      "Dynamic Programming",
      "Divide and Conquer"
    ],
    "patternExplanations": {
      "Greedy": "Kadane's algorithm: track current sum. If it goes negative, reset to 0 (start new subarray). Track max seen.",
      "Dynamic Programming": "dp[i] = max subarray ending at i = max(nums[i], dp[i-1] + nums[i]). Same as Kadane's.",
      "Divide and Conquer": "Max subarray is in left half, right half, or crosses middle. O(n log n)."
    },
    "hints": [
      "At each position, should you extend the previous subarray or start fresh?",
      "If the sum so far is negative, it can only hurt the next elements. Better to start over.",
      "Track max sum ending at current position. Answer is max over all positions."
    ],
    "solution": {
      "approach": "Kadane's: currentSum = max(nums[i], currentSum + nums[i]). maxSum = max(maxSum, currentSum).",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "A negative prefix sum never helps - reset and start fresh."
    }
  },
  "54": {
    "title": "Spiral Matrix",
    "slug": "spiral-matrix",
    "difficulty": "medium",
    "primaryPattern": "Math",
    "acceptablePatterns": [],
    "explanation": "Depth-first search - explore as deep as possible before backtracking. Use recursion or stack for implementation.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Math & Geometry",
    "patternExplanations": {
      "Math": "Track boundaries (top, bottom, left, right). Traverse in spiral order, shrinking boundaries after each edge."
    },
    "hints": [
      "Traverse right, then down, then left, then up. Repeat.",
      "Track four boundaries. After traversing an edge, shrink that boundary.",
      "Be careful with edge cases: single row, single column, or when boundaries cross."
    ],
    "solution": {
      "approach": "Maintain top/bottom/left/right bounds. Traverse in order: right, down, left, up. Shrink bounds after each.",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(1) excluding output",
      "keyInsight": "Four boundaries define the current layer. Shrink inward after completing each direction."
    }
  },
  "55": {
    "title": "Jump Game",
    "slug": "jump-game",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Greedy",
    "primaryPattern": "Greedy",
    "acceptablePatterns": [
      "Dynamic Programming"
    ],
    "patternExplanations": {
      "Greedy": "Track farthest reachable index. If current index > farthest, can't reach it. If farthest >= last index, success.",
      "Dynamic Programming": "dp[i] = can reach index i? Check if any j < i can reach i. O(n^2), greedy is better."
    },
    "hints": [
      "Can you reach the last index starting from index 0?",
      "At each step, update the farthest index you can reach.",
      "If at any point your current index exceeds farthest reachable, you're stuck."
    ],
    "solution": {
      "approach": "Track maxReach. For each i from 0: if i > maxReach, return false. Update maxReach = max(maxReach, i + nums[i]).",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Greedily track the frontier of reachable indices."
    }
  },
  "56": {
    "title": "Merge Intervals",
    "slug": "merge-intervals",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Intervals",
    "primaryPattern": "Sorting",
    "acceptablePatterns": [
      "Greedy"
    ],
    "patternExplanations": {
      "Sorting": "Sort by start time. Iterate and merge overlapping intervals. Overlap: current start <= previous end.",
      "Greedy": "After sorting, greedily extend intervals when they overlap."
    },
    "hints": [
      "How do you know if two intervals overlap?",
      "Sort by start time. Then consecutive intervals that overlap can be merged.",
      "If current interval starts before/at previous end, merge. Else start new interval."
    ],
    "solution": {
      "approach": "Sort by start. For each interval: if overlaps with last in result, extend end. Else add new interval.",
      "timeComplexity": "O(n log n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Sorting by start lets you merge overlapping intervals in a single pass."
    }
  },
  "57": {
    "title": "Insert Interval",
    "slug": "insert-interval",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Intervals",
    "primaryPattern": "Sorting",
    "acceptablePatterns": [
      "Greedy"
    ],
    "patternExplanations": {
      "Sorting": "Intervals already sorted. Add intervals that end before new one starts. Merge overlapping. Add remaining.",
      "Greedy": "Three phases: add all intervals before new one, merge all overlapping with new one, add all after."
    },
    "hints": [
      "Intervals are already sorted. Where does the new interval fit?",
      "First, add intervals that end before new one starts. Then merge overlaps. Finally, add intervals that start after.",
      "During merge phase, keep extending the interval's end while there's overlap."
    ],
    "solution": {
      "approach": "Add intervals with end < newStart. Merge all overlapping. Add intervals with start > newEnd.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Sorted intervals let you handle insert with a single pass."
    }
  },
  "58": {
    "title": "Length of Last Word",
    "slug": "length-of-last-word",
    "difficulty": "easy",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Two Pointers": "Start from end, skip trailing spaces. Then count characters until hitting a space or start of string."
    },
    "hints": [
      "Trailing spaces shouldn't count. Where should you start counting from?",
      "Start from the end. Skip spaces until you hit a letter. Then count letters until you hit a space.",
      "Pointer at end. While s[i]==' ', decrement i. Then count while i>=0 and s[i]!=' '. Return count."
    ],
    "solution": {
      "approach": "Start from end, skip trailing spaces to find end of last word. Count backwards until space or start. Return count.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Scan from right: skip trailing spaces, then count until next space. No need to split into array."
    }
  },
  "59": {
    "title": "Spiral Matrix II",
    "slug": "spiral-matrix-ii",
    "difficulty": "medium",
    "primaryPattern": "Matrix",
    "acceptablePatterns": [
      "Simulation"
    ],
    "patternExplanations": {
      "Matrix": "Track boundaries (top, bottom, left, right). Fill right, then down, then left, then up. Shrink boundaries after each direction. Repeat until all filled.",
      "Simulation": "Simulate spiral movement with direction changes. When hitting boundary or filled cell, turn right (direction = (direction + 1) % 4)."
    },
    "hints": [
      "This is the reverse of Spiral Matrix I - instead of reading, you're writing values 1 to n^2.",
      "Maintain four boundaries: top, bottom, left, right. After filling one direction, shrink the corresponding boundary.",
      "Fill right (left to right), down (top to bottom), left (right to left), up (bottom to top). After each, shrink boundary and check if done."
    ],
    "solution": {
      "approach": "Initialize n×n matrix. Use four boundaries. Fill in spiral order: right, down, left, up. After each direction, adjust boundary. Continue until filled.",
      "timeComplexity": "O(n^2)",
      "spaceComplexity": "O(1) extra (output not counted)",
      "keyInsight": "Layer-by-layer filling. Each complete spiral cycle processes one outer layer. Same pattern as Spiral Matrix I but generating instead of reading."
    }
  },
  "60": {
    "title": "Permutation Sequence",
    "slug": "permutation-sequence",
    "difficulty": "hard",
    "primaryPattern": "Math",
    "acceptablePatterns": [
      "Backtracking"
    ],
    "patternExplanations": {
      "Math": "Use factorial number system. k-1 tells us which block of (n-1)! permutations we're in. Divide by factorials to determine each digit position.",
      "Backtracking": "Generate all permutations in order until reaching the k-th. Inefficient but straightforward."
    },
    "hints": [
      "There are n! permutations total. For each first digit choice, there are (n-1)! permutations. Which digit is first in the k-th permutation?",
      "Use k-1 (0-indexed). Divide by (n-1)! to find which digit is first. The remainder tells you which permutation within that group.",
      "index = (k-1) / (n-1)! gives first digit's index in available digits. Update k = k % (n-1)!. Remove used digit. Repeat for remaining positions."
    ],
    "solution": {
      "approach": "Keep list of available digits [1..n]. For each position, index = k / factorial gives which digit to use. Remove it. Update k = k % factorial. Reduce factorial by next n.",
      "timeComplexity": "O(n^2) due to list removal",
      "spaceComplexity": "O(n)",
      "keyInsight": "Factoradic/factorial number system. Position i has (n-1-i)! permutations per digit choice. Use division to directly compute each digit."
    }
  },
  "61": {
    "title": "Rotate List",
    "slug": "rotate-list",
    "difficulty": "medium",
    "primaryPattern": "Linked List",
    "acceptablePatterns": [
      "Two Pointers"
    ],
    "patternExplanations": {
      "Linked List": "Connect tail to head (make circular). Find new tail at position (length - k % length - 1). New head is next node. Break the circle.",
      "Two Pointers": "Advance one pointer k steps ahead. Move both until first reaches end. Second pointer is new tail."
    },
    "hints": [
      "Rotating by k is equivalent to moving the last k nodes to the front. What if k > list length?",
      "k could be very large. What's the effective rotation? How does k % length help?",
      "Find length, reduce k = k % length. Connect tail to head (circular). Move (length - k) steps from head. That's new tail; next is new head. Break circle."
    ],
    "solution": {
      "approach": "Find length and tail. k = k % length. Make circular by connecting tail to head. New tail is at position (length - k). Its next is new head. Break cycle.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Rotation wraps around. Make circular list, find new break point at (length - k % length), and reconnect."
    }
  },
  "62": {
    "title": "Unique Paths",
    "slug": "unique-paths",
    "difficulty": "medium",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "2-D Dynamic Programming",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Dynamic Programming": "dp[i][j] = paths to reach (i,j). Can only come from top or left: dp[i][j] = dp[i-1][j] + dp[i][j-1]."
    },
    "hints": [
      "Can only move right or down. How many ways to reach cell (i,j)?",
      "To reach (i,j), you came from (i-1,j) or (i,j-1). Sum the ways to reach those.",
      "First row and column have only 1 way each (all right or all down)."
    ],
    "solution": {
      "approach": "dp[i][j] = dp[i-1][j] + dp[i][j-1]. Initialize first row and column to 1. Can optimize to O(n) space.",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Path counting on grid: each cell's paths = sum of paths to cells you can come from."
    }
  },
  "63": {
    "title": "Unique Paths II",
    "slug": "unique-paths-ii",
    "difficulty": "medium",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Dynamic Programming": "Same as Unique Paths but obstacles have 0 paths. dp[i][j] = 0 if obstacle, else dp[i-1][j] + dp[i][j-1]. Handle first row/column specially."
    },
    "hints": [
      "This is Unique Paths with blocked cells. What's the path count for a cell with an obstacle?",
      "If there's an obstacle, that cell has 0 paths. Otherwise, same formula: paths to cell = paths from above + paths from left.",
      "First row/column: if obstacle encountered, all cells after it have 0 paths (can't go around obstacles on edge)."
    ],
    "solution": {
      "approach": "DP with obstacle handling. If obstacle at (i,j), dp[i][j]=0. First row/col: propagate 1s until obstacle, then 0s. Otherwise dp[i][j] = dp[i-1][j] + dp[i][j-1].",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(n) with 1D optimization",
      "keyInsight": "Obstacles set dp value to 0. Once you hit an obstacle in first row/column, all subsequent cells in that row/column become unreachable."
    }
  },
  "64": {
    "title": "Minimum Path Sum",
    "slug": "minimum-path-sum",
    "difficulty": "medium",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Dynamic Programming": "dp[i][j] = min cost to reach (i,j). Can only come from top or left: dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])."
    },
    "hints": [
      "You can only move right or down. To reach cell (i,j) with minimum cost, you must come from either (i-1,j) or (i,j-1).",
      "Min cost at (i,j) = cost at (i,j) + min(cost to reach cell above, cost to reach cell to left).",
      "First row: can only come from left. First column: can only come from top. Initialize these first, then fill rest of grid."
    ],
    "solution": {
      "approach": "dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]). Initialize first row (cumulative left) and first col (cumulative top). Return dp[m-1][n-1].",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(1) if modifying input, O(n) otherwise",
      "keyInsight": "Classic grid DP. Each cell's minimum path is its value plus the smaller of the two possible predecessors."
    }
  },
  "65": {
    "title": "Valid Number",
    "slug": "valid-number",
    "difficulty": "hard",
    "primaryPattern": "String",
    "acceptablePatterns": [
      "DFA"
    ],
    "patternExplanations": {
      "String": "Parse character by character tracking state: seen digit, seen dot, seen e/E. Validate rules: digit required, e needs digit before and after, dot not after e, etc.",
      "DFA": "Define states and transitions. States: start, sign, integer, dot, decimal, exp_sign, exponent. Each character triggers state transition or invalid."
    },
    "hints": [
      "A valid number has optional sign, integer or decimal part, optional exponent. What makes each part valid?",
      "Track boolean flags: hasDigit, hasDot, hasE. A dot is invalid after e. Sign is only valid at start or right after e.",
      "Rules: +/- only at start or after e. Dot invalid after e. Must have digit before e. Must have digit after e. Scan and validate."
    ],
    "solution": {
      "approach": "Scan string tracking seenDigit, seenDot, seenE. Handle +/- at valid positions only. Dot invalid after e. Require digit before e. Require digit after e. Return seenDigit at end.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Many edge cases but solvable with careful state tracking. Key: e splits into two parts (coefficient and exponent), each has its own rules."
    }
  },
  "66": {
    "title": "Plus One",
    "slug": "plus-one",
    "difficulty": "easy",
    "primaryPattern": "Math",
    "acceptablePatterns": [],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Math",
    "patternExplanations": {
      "Math": "Add 1 to last digit. Handle carry by propagating left. If carry remains, prepend 1."
    },
    "hints": [
      "Start from the last digit. Add 1. What if it becomes 10?",
      "Carry propagates left. What if all digits are 9?",
      "If you finish the loop with carry, you need to prepend a 1 (e.g., 999 + 1 = 1000)."
    ],
    "solution": {
      "approach": "Iterate from right. Add 1, if < 10 done. If 10, set to 0 and continue. If loop ends, prepend 1.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1) or O(n) if new array needed",
      "keyInsight": "Most cases: just increment last digit. Carry only propagates for trailing 9s."
    }
  },
  "67": {
    "title": "Add Binary",
    "slug": "add-binary",
    "difficulty": "easy",
    "primaryPattern": "Math",
    "acceptablePatterns": [
      "Bit Manipulation"
    ],
    "patternExplanations": {
      "Math": "Add digit by digit from right to left with carry. For binary: sum = a + b + carry, result digit = sum % 2, new carry = sum / 2.",
      "Bit Manipulation": "XOR gives sum without carry, AND gives carry bits. Shift carry left, repeat until no carry."
    },
    "hints": [
      "Binary addition is like decimal but base 2. 1+1=10 in binary (sum=0, carry=1). How do you handle carry?",
      "Start from rightmost digits. Add them plus carry. Result digit = sum % 2, new carry = sum / 2.",
      "Use two indices from end of each string. While either string has digits or carry exists, compute sum % 2 and sum / 2. Build result in reverse."
    ],
    "solution": {
      "approach": "Two pointers from end of strings. While i>=0 or j>=0 or carry: sum = a[i] + b[j] + carry, append sum%2, carry = sum/2. Reverse result.",
      "timeComplexity": "O(max(m, n))",
      "spaceComplexity": "O(max(m, n))",
      "keyInsight": "Same as adding decimal numbers: process right to left, handle carry. In binary, sum can only be 0, 1, 2, or 3."
    }
  },
  "68": {
    "title": "Text Justification",
    "slug": "text-justification",
    "difficulty": "hard",
    "primaryPattern": "String",
    "acceptablePatterns": [
      "Greedy"
    ],
    "patternExplanations": {
      "String": "Greedily pack words into lines. For each line, distribute extra spaces evenly. Handle last line specially (left-justified).",
      "Greedy": "Pack as many words as possible per line. Then justify: total spaces = maxWidth - word lengths, distribute among gaps, extra spaces go left to right."
    },
    "hints": [
      "First determine which words go on each line by greedily fitting as many as possible. Then format each line separately.",
      "For justification, calculate total spaces needed and distribute among gaps. If spaces don't divide evenly, where do extra spaces go?",
      "Total spaces = maxWidth - sum(word lengths). gaps = words - 1. Each gap gets spaces/gaps, first (spaces % gaps) gaps get one extra. Last line: left-justify."
    ],
    "solution": {
      "approach": "Greedy pack words into lines. For each non-last line: compute spaces per gap and extra spaces, distribute left-to-right. Last line: single space between words, pad right.",
      "timeComplexity": "O(n) where n is total characters",
      "spaceComplexity": "O(n)",
      "keyInsight": "Two phases: (1) determine line breaks greedily, (2) distribute spaces with extra going to left gaps. Last line is special case."
    }
  },
  "69": {
    "title": "Sqrt(x)",
    "slug": "sqrtx",
    "difficulty": "easy",
    "primaryPattern": "Binary Search",
    "acceptablePatterns": [
      "Math"
    ],
    "patternExplanations": {
      "Binary Search": "Search for largest integer k where k*k <= x. Binary search in range [0, x]. If mid*mid <= x, answer is at least mid, search right. Else search left.",
      "Math": "Newton's method: start with guess, iterate guess = (guess + x/guess) / 2 until converged."
    },
    "hints": [
      "You need the largest integer k where k^2 <= x. How can you find this boundary by eliminating half the search space each time?",
      "Search on the answer: if mid^2 <= x, mid could be the answer (search right for larger). If mid^2 > x, search left.",
      "Search range [0, x]. While left <= right: if mid*mid <= x, record mid and search right (left = mid+1). Else search left (right = mid-1)."
    ],
    "solution": {
      "approach": "Binary search in [0, x]. If mid*mid <= x, this mid is valid, try larger (left = mid+1). Else try smaller. Return the last valid mid.",
      "timeComplexity": "O(log x)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Binary search on the answer. We're looking for the boundary between k where k^2 <= x and k where k^2 > x."
    }
  },
  "70": {
    "title": "Climbing Stairs",
    "slug": "climbing-stairs",
    "difficulty": "easy",
    "lists": [
      "neetcode-150"
    ],
    "category": "1-D Dynamic Programming",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Dynamic Programming": "ways(n) = ways(n-1) + ways(n-2). Either take 1 step from n-1, or 2 steps from n-2. Base: ways(1)=1, ways(2)=2."
    },
    "hints": [
      "To reach step n, what's the last move you could make?",
      "You either came from step n-1 (took 1 step) or from step n-2 (took 2 steps).",
      "This is exactly the Fibonacci sequence! ways[n] = ways[n-1] + ways[n-2]."
    ],
    "solution": {
      "approach": "DP: dp[i] = dp[i-1] + dp[i-2]. Can optimize to O(1) space with two variables.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "The number of ways to reach step n is the sum of ways to reach n-1 and n-2."
    }
  },
  "71": {
    "title": "Simplify Path",
    "slug": "simplify-path",
    "difficulty": "medium",
    "primaryPattern": "Stack",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Stack": "Split path by '/'. For each component: '.' or empty = skip, '..' = pop stack (go up), else push to stack. Join stack with '/' for result."
    },
    "hints": [
      "'.' means current directory (stay). '..' means parent directory (go up). How do you handle going up? What data structure helps with 'last in, first out' order?",
      "Split by '/', process each part. '.' and '' do nothing. '..' removes the last directory (if any). Anything else gets added.",
      "Keep a list of directory names. Split on '/'. For each part: skip '.' and empty, remove last for '..', add otherwise. Result: '/' + join('/')."
    ],
    "solution": {
      "approach": "Split path by '/'. Use stack: skip '.' and empty, pop for '..', push directories. Join with '/' and prepend '/'.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Stack perfectly models directory navigation. '..' is a pop operation. Multiple slashes create empty strings when split, which we ignore."
    }
  },
  "72": {
    "title": "Edit Distance",
    "slug": "edit-distance",
    "difficulty": "medium",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "2-D Dynamic Programming",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Dynamic Programming": "dp[i][j] = min ops to convert word1[0:i] to word2[0:j]. If match: dp[i-1][j-1]. Else: 1 + min of insert, delete, replace."
    },
    "hints": [
      "Three operations: insert, delete, replace. What's the minimum to transform word1 to word2?",
      "If last characters match, no operation needed there. If not, try all three operations.",
      "Insert uses result from (i, j-1), Delete uses (i-1, j), Replace uses (i-1, j-1). Take min and add 1."
    ],
    "solution": {
      "approach": "dp[i][j] = dp[i-1][j-1] if match, else 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]).",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(m * n)",
      "keyInsight": "Each cell considers all three operations and takes the best one."
    }
  },
  "73": {
    "title": "Set Matrix Zeroes",
    "slug": "set-matrix-zeroes",
    "difficulty": "medium",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Arrays & Hashing",
    "patternExplanations": {
      "Hash Map": "Use first row and column as markers. Track which rows/cols need zeroing, then apply."
    },
    "hints": [
      "If you use O(m+n) space, track which rows and columns contain zeros.",
      "Can you use the matrix itself to store this information?",
      "Use first row and first column as markers. Handle the first row/col separately."
    ],
    "solution": {
      "approach": "Use first row/col as flags. First pass: mark. Second pass: zero out based on marks. Handle first row/col last.",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "The matrix's first row and column can serve as the marker arrays."
    }
  },
  "74": {
    "title": "Search a 2D Matrix",
    "slug": "search-a-2d-matrix",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Binary Search",
    "primaryPattern": "Binary Search",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Binary Search": "Treat the 2D matrix as a sorted 1D array. Index i maps to matrix[i/cols][i%cols]. Standard binary search."
    },
    "hints": [
      "Each row is sorted, and first element of each row > last element of previous row.",
      "If you 'flattened' the matrix into one array, it would be fully sorted.",
      "Search on virtual 1D array. Convert 1D index to 2D: row = idx/cols, col = idx%cols."
    ],
    "solution": {
      "approach": "Binary search treating matrix as 1D array. Convert indices: matrix[mid/cols][mid%cols].",
      "timeComplexity": "O(log(m*n))",
      "spaceComplexity": "O(1)",
      "keyInsight": "The matrix is essentially a sorted 1D array stored in 2D format."
    }
  },
  "75": {
    "title": "Sort Colors",
    "slug": "sort-colors",
    "difficulty": "medium",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Array"
    ],
    "patternExplanations": {
      "Two Pointers": "Dutch National Flag algorithm: three pointers (low, mid, high). 0s go before low, 2s go after high, 1s stay in middle. Scan with mid.",
      "Array": "Two-pass counting sort: count 0s, 1s, 2s, then overwrite array. Simple but not one-pass."
    },
    "hints": [
      "Only three values: 0, 1, 2. Could you sort with a single pass? Where should each value go?",
      "Three regions: [0, low) has 0s, [low, mid) has 1s, [high+1, n) has 2s. What about [mid, high]?",
      "Dutch flag: low=0, mid=0, high=n-1. If nums[mid]=0, swap with low, increment both. If 1, just mid++. If 2, swap with high, decrement high."
    ],
    "solution": {
      "approach": "Three pointers: low, mid, high. While mid <= high: if 0, swap with low and increment both. If 1, mid++. If 2, swap with high and decrement high.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Dutch National Flag: partition array into three regions in one pass. Don't increment mid after swapping with high (might swap another 2)."
    }
  },
  "76": {
    "title": "Minimum Window Substring",
    "slug": "minimum-window-substring",
    "difficulty": "hard",
    "primaryPattern": "Sliding Window",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Sliding Window",
    "patternExplanations": {
      "Sliding Window": "Expand right to include chars, shrink left when all t chars are covered. Track minimum window.",
      "Hash Map": "Use hashmap to count required chars. Window is valid when all counts are satisfied."
    },
    "hints": [
      "Use a window that expands and contracts. When is the window valid?",
      "Track character counts needed from t. Window is valid when all counts are met.",
      "Expand right until valid, then shrink left while maintaining validity to find minimum."
    ],
    "solution": {
      "approach": "Hashmap for required counts. Expand right, add to window. When valid, shrink left, update min.",
      "timeComplexity": "O(m + n)",
      "spaceComplexity": "O(m + n)",
      "keyInsight": "Two-phase window: expand to satisfy, shrink to minimize."
    }
  },
  "77": {
    "title": "Combinations",
    "slug": "combinations",
    "difficulty": "medium",
    "primaryPattern": "Backtracking",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Backtracking": "Generate all k-sized subsets of [1..n]. At each step, choose to include current number or skip it. Maintain start index to avoid duplicates."
    },
    "hints": [
      "Combinations differ from permutations - order doesn't matter. [1,2] and [2,1] are the same combination.",
      "To avoid duplicates, only pick elements with index >= current start. After picking nums[i], next call starts at i+1.",
      "At each position, try adding each remaining number (from start to n). When path length = k, record it and return."
    ],
    "solution": {
      "approach": "Backtrack with start index. For i from start to n: add i to path, recurse with start=i+1, remove i. When path.length = k, add copy to result.",
      "timeComplexity": "O(k * C(n,k))",
      "spaceComplexity": "O(k) for recursion",
      "keyInsight": "Maintain start index to ensure we only pick larger numbers, avoiding duplicate combinations."
    }
  },
  "78": {
    "title": "Subsets",
    "slug": "subsets",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Backtracking",
    "primaryPattern": "Backtracking",
    "acceptablePatterns": [
      "Bit Manipulation"
    ],
    "patternExplanations": {
      "Backtracking": "For each element, choose to include or exclude it. Recurse. At end, add current subset to result.",
      "Bit Manipulation": "Each subset maps to binary number 0 to 2^n-1. Bit i set = include element i."
    },
    "hints": [
      "Each element is either in the subset or not. That's a binary choice.",
      "Start empty. For each element, you can add it or skip it. Explore both paths.",
      "Add element, explore further, then remove element to try the 'skip' path."
    ],
    "solution": {
      "approach": "Backtrack: for index i, add nums[i] to current, recurse, then remove it and recurse again (or iterate from i).",
      "timeComplexity": "O(n * 2^n)",
      "spaceComplexity": "O(n) recursion depth",
      "keyInsight": "Subsets = all combinations of include/exclude decisions for each element."
    }
  },
  "79": {
    "title": "Word Search",
    "slug": "word-search",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Backtracking",
    "primaryPattern": "Backtracking",
    "acceptablePatterns": [
      "DFS"
    ],
    "patternExplanations": {
      "Backtracking": "DFS from each cell. Try all 4 directions. Mark cell visited during path, unmark when backtracking.",
      "DFS": "Explore paths in the grid matching the word. Backtrack when path doesn't match."
    },
    "hints": [
      "Start from any cell matching word[0]. Explore adjacent cells for word[1], etc.",
      "Need to avoid revisiting cells in current path. How to track this?",
      "Mark cell as visited (e.g., change to '#'), explore neighbors, then restore original value."
    ],
    "solution": {
      "approach": "For each cell, if matches word[0], DFS trying to match rest. Mark visited, explore 4 directions, backtrack.",
      "timeComplexity": "O(m * n * 4^L)",
      "spaceComplexity": "O(L) recursion",
      "keyInsight": "Grid search with path constraint = DFS with backtracking to unmark visited cells."
    }
  },
  "80": {
    "title": "Remove Duplicates from Sorted Array II",
    "slug": "remove-duplicates-from-sorted-array-ii",
    "difficulty": "medium",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Two Pointers": "Generalize Remove Duplicates I. Write pointer tracks valid portion. Allow at most 2 of each value: compare with nums[write-2] instead of nums[write-1]."
    },
    "hints": [
      "At most 2 duplicates allowed. How does this change the condition from 'Remove Duplicates I'?",
      "Instead of comparing with the last element, compare with two elements back. If different, it's safe to include.",
      "Write pointer at index 2. For i from 2, if nums[i] != nums[write-2], copy and increment write. First 2 elements always kept."
    ],
    "solution": {
      "approach": "Keep first 2 elements. For each subsequent, if nums[i] != nums[write-2], copy to write position. This ensures at most 2 of any value.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Generalized pattern: to allow k duplicates, compare nums[i] with nums[write-k]."
    }
  },
  "81": {
    "title": "Search in Rotated Sorted Array II",
    "slug": "search-in-rotated-sorted-array-ii",
    "difficulty": "medium",
    "primaryPattern": "Binary Search",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Binary Search": "Like Search in Rotated Sorted Array I, but duplicates complicate finding sorted half. When nums[left] == nums[mid], increment left (can't determine which half is sorted)."
    },
    "hints": [
      "With duplicates, nums[left] might equal nums[mid]. When this happens, can you determine which half is sorted?",
      "If nums[left] == nums[mid], you can't tell which half is sorted. Shrink search space by incrementing left.",
      "Handle equals case: if nums[left]==nums[mid], left++. Otherwise, same logic as Rotated Sorted Array I to determine which half is sorted."
    ],
    "solution": {
      "approach": "Binary search with special case: if nums[left]==nums[mid], increment left. Otherwise determine sorted half and narrow search accordingly.",
      "timeComplexity": "O(n) worst case, O(log n) average",
      "spaceComplexity": "O(1)",
      "keyInsight": "Duplicates break the 'one half is always sorted' guarantee. When unsure, shrink linearly from left."
    }
  },
  "82": {
    "title": "Remove Duplicates from Sorted List II",
    "slug": "remove-duplicates-from-sorted-list-ii",
    "difficulty": "medium",
    "primaryPattern": "Linked List",
    "acceptablePatterns": [
      "Two Pointers"
    ],
    "patternExplanations": {
      "Linked List": "Use dummy head. Track predecessor. When duplicates found, skip all nodes with that value by advancing until different value. Link predecessor to next distinct node.",
      "Two Pointers": "Prev pointer stays at last non-duplicate. Current scans ahead. When duplicates detected, prev.next skips all duplicates."
    },
    "hints": [
      "Unlike Remove Duplicates I, here you must delete ALL nodes that have duplicates, not keep one copy.",
      "Use a dummy head since the actual head might be removed. Track the last node you're sure is not a duplicate.",
      "prev tracks last safe node. If curr.val == curr.next.val, skip all nodes with that value. If no duplicates, advance prev."
    ],
    "solution": {
      "approach": "Dummy head. Prev points to last unique. If curr.val == curr.next.val, advance curr past all duplicates, then prev.next = curr.next. Else prev = curr.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Two phases per segment: detect if duplicated, then skip all copies. Dummy handles head removal."
    }
  },
  "83": {
    "title": "Remove Duplicates from Sorted List",
    "slug": "remove-duplicates-from-sorted-list",
    "difficulty": "easy",
    "primaryPattern": "Linked List",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Linked List": "Sorted list means duplicates are adjacent. For each node, if curr.val == curr.next.val, skip next by setting curr.next = curr.next.next."
    },
    "hints": [
      "List is sorted, so duplicates are consecutive. How do you skip over a node?",
      "To remove the next node, set curr.next = curr.next.next. Only advance curr if no duplicate was found.",
      "While curr and curr.next exist: if equal values, skip next node. Otherwise, advance curr."
    ],
    "solution": {
      "approach": "Iterate with curr. If curr.val == curr.next.val, skip by curr.next = curr.next.next. Else curr = curr.next. Continue until end.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Keep one copy by skipping duplicates. Only advance when current and next are different."
    }
  },
  "84": {
    "title": "Largest Rectangle in Histogram",
    "slug": "largest-rectangle-in-histogram",
    "difficulty": "hard",
    "primaryPattern": "Stack",
    "acceptablePatterns": [],
    "explanation": "LIFO structure for nested patterns, matching pairs, or maintaining monotonic sequences.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Stack",
    "patternExplanations": {
      "Stack": "Monotonic increasing stack. When bar is shorter, pop and calculate area with popped bar as height."
    },
    "hints": [
      "For each bar, you need to know how far left and right it can extend.",
      "A bar can extend until it hits a shorter bar. How can you track previous shorter bars efficiently?",
      "Maintain increasing sequence of indices. When current < the last value, process and calculate area."
    ],
    "solution": {
      "approach": "Monotonic increasing stack of indices. On smaller bar, pop and compute area using width from indices.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Stack gives us left boundary (previous smaller). Current position gives right boundary."
    }
  },
  "85": {
    "title": "Maximal Rectangle",
    "slug": "maximal-rectangle",
    "difficulty": "hard",
    "primaryPattern": "Stack",
    "acceptablePatterns": [
      "Dynamic Programming"
    ],
    "patternExplanations": {
      "Stack": "Build on 'Largest Rectangle in Histogram'. For each row, compute heights (consecutive 1s above including current). Apply histogram algorithm to each row.",
      "Dynamic Programming": "For each cell, track height (consecutive 1s above), left boundary, right boundary. Area = height * (right - left)."
    },
    "hints": [
      "If you know the largest rectangle in a histogram, can you extend that to a 2D matrix?",
      "For each row, treat the 1s above (including current) as histogram bars. The height at each column is the count of consecutive 1s above.",
      "For each row, update heights: if matrix[r][c]=='1', height[c]++, else height[c]=0. Then run largest rectangle in histogram on heights."
    ],
    "solution": {
      "approach": "For each row, maintain heights array. If cell is 1, increment height; else reset to 0. Apply Largest Rectangle in Histogram to current heights. Track max.",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Reduce 2D problem to multiple 1D histogram problems. Each row adds another layer to the histogram."
    }
  },
  "86": {
    "title": "Partition List",
    "slug": "partition-list",
    "difficulty": "medium",
    "primaryPattern": "Linked List",
    "acceptablePatterns": [
      "Two Pointers"
    ],
    "patternExplanations": {
      "Linked List": "Create two separate lists: one for nodes < x, one for nodes >= x. Traverse original, append each node to appropriate list. Finally, connect the two lists.",
      "Two Pointers": "Use dummy nodes for both lists. Two tail pointers track where to append next. Join the lists and terminate properly."
    },
    "hints": [
      "You need to preserve relative order within each partition. Building two separate lists ensures this.",
      "Create two dummy heads: one for 'less than x' list, one for 'greater or equal' list. Route each node appropriately.",
      "Traverse original list. If node.val < x, append to before list. Else append to after list. Finally, before.tail.next = after.head, after.tail.next = null."
    ],
    "solution": {
      "approach": "Two dummy-headed lists: before and after. Scan original, append to appropriate list. Connect before tail to after head. Set after tail.next to null.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Building two separate lists then joining them is simpler than in-place manipulation. Preserves relative ordering automatically."
    }
  },
  "87": {
    "title": "Scramble String",
    "slug": "scramble-string",
    "difficulty": "hard",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [
      "Recursion"
    ],
    "patternExplanations": {
      "Dynamic Programming": "dp[i][j][len] = true if s1[i..i+len] and s2[j..j+len] are scrambles. Try all split points k: either parts match directly or swapped.",
      "Recursion": "Recursive with memoization. For each split point, check if (left1, left2) and (right1, right2) match, OR (left1, right2) and (right1, left2) match (swapped case)."
    },
    "hints": [
      "Two strings are scrambles if: same chars AND exists a split where substrings are scrambles (possibly swapped).",
      "For split at position k: either s1[0:k] scrambles to s2[0:k] AND s1[k:n] to s2[k:n], OR s1[0:k] to s2[n-k:n] AND s1[k:n] to s2[0:n-k].",
      "Early termination: if sorted chars don't match, return false. Try all k from 1 to n-1. Cache (s1, s2) pairs to avoid redundant work."
    ],
    "solution": {
      "approach": "Recursion with memo. Check char counts match first. For each split k, check non-swapped and swapped configurations recursively.",
      "timeComplexity": "O(n^4)",
      "spaceComplexity": "O(n^3)",
      "keyInsight": "The swap operation means we need to check both aligned and flipped substring pairs at each split."
    }
  },
  "88": {
    "title": "Merge Sorted Array",
    "slug": "merge-sorted-array",
    "difficulty": "easy",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Two Pointers": "Merge from the end to avoid overwriting. Three pointers: p1 at end of nums1 elements, p2 at end of nums2, p at end of nums1 buffer. Compare and place larger at p."
    },
    "hints": [
      "nums1 has extra space at the end. If you merge from the start, you'll overwrite elements. What if you merge from the end?",
      "Compare nums1[p1] and nums2[p2]. Place the larger at position p (starting at m+n-1). Decrement the corresponding pointer.",
      "Three pointers: p1 = m-1, p2 = n-1, p = m+n-1. While p2 >= 0: if p1 >= 0 and nums1[p1] > nums2[p2], place nums1[p1--], else place nums2[p2--]. Decrement p."
    ],
    "solution": {
      "approach": "Merge from end. Compare nums1[p1] and nums2[p2], place larger at p. Continue until nums2 is exhausted. No need to move remaining nums1 elements (already in place).",
      "timeComplexity": "O(m + n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Merging from end prevents overwriting since we're filling the 'empty' buffer space first."
    }
  },
  "89": {
    "title": "Gray Code",
    "slug": "gray-code",
    "difficulty": "medium",
    "primaryPattern": "Bit Manipulation",
    "acceptablePatterns": [
      "Math"
    ],
    "patternExplanations": {
      "Bit Manipulation": "Gray code formula: i XOR (i >> 1). For n bits, generate 0 to 2^n - 1 and apply formula. OR: build iteratively by prepending 1 to reversed previous list.",
      "Math": "Iterative construction: start with [0]. For each bit, reflect current list and prepend 1-bit. E.g., [0,1] becomes [0,1,3,2]."
    },
    "hints": [
      "Gray code property: adjacent codes differ by exactly one bit. The formula i XOR (i >> 1) generates this sequence.",
      "Alternative: start with [0]. For n=1, add 1. For n=2, mirror [0,1] and add 2 to get [0,1,3,2]. Pattern continues.",
      "Formula approach: for i from 0 to 2^n - 1, result[i] = i ^ (i >> 1). This directly gives the n-bit Gray code sequence."
    ],
    "solution": {
      "approach": "For i from 0 to 2^n - 1, compute i XOR (i >> 1). This elegant formula produces the Gray code sequence directly.",
      "timeComplexity": "O(2^n)",
      "spaceComplexity": "O(1) extra (output not counted)",
      "keyInsight": "Gray code = i XOR (i >> 1). The XOR clears pairs of 1s except at transitions, ensuring single-bit changes."
    }
  },
  "90": {
    "title": "Subsets II",
    "slug": "subsets-ii",
    "difficulty": "medium",
    "primaryPattern": "Backtracking",
    "acceptablePatterns": [],
    "explanation": "Explore all possible solutions recursively. Build candidates incrementally and abandon paths that cannot lead to solution.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Backtracking",
    "patternExplanations": {
      "Backtracking": "Sort first. Skip duplicate elements at same recursion level to avoid duplicate subsets."
    },
    "hints": [
      "Similar to Subsets I, but with duplicates. How to avoid duplicate subsets?",
      "If you have [1,2,2], choosing first 2 vs second 2 gives same subset.",
      "Sort the array. At each position, skip elements equal to previous if previous wasn't included."
    ],
    "solution": {
      "approach": "Sort input. Backtrack with choice to include/exclude. Skip duplicate choices at same level.",
      "timeComplexity": "O(n * 2^n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Sorting + skipping consecutive duplicates prevents duplicate subsets."
    }
  },
  "91": {
    "title": "Decode Ways",
    "slug": "decode-ways",
    "difficulty": "medium",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Dynamic Programming",
    "patternExplanations": {
      "Dynamic Programming": "dp[i] = ways to decode s[0..i]. Can use one digit (1-9) or two digits (10-26)."
    },
    "hints": [
      "At each position, you can decode 1 digit or 2 digits (if valid).",
      "Valid single digit: 1-9. Valid two digits: 10-26.",
      "Ways to decode up to position i = ways from (i-1) if single digit valid, plus ways from (i-2) if two digits valid."
    ],
    "solution": {
      "approach": "DP where dp[i] = ways to decode first i chars. Add dp[i-1] if s[i-1] is 1-9, add dp[i-2] if s[i-2..i-1] is 10-26.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n) or O(1)",
      "keyInsight": "Each position depends on previous 1 or 2 positions, like Fibonacci."
    }
  },
  "92": {
    "title": "Reverse Linked List II",
    "slug": "reverse-linked-list-ii",
    "difficulty": "medium",
    "primaryPattern": "Linked List",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Linked List": "Navigate to position left-1 (node before reversal). Reverse nodes from left to right. Connect: pre-reverse node to new head, old head (now tail) to post-reverse node."
    },
    "hints": [
      "Find the node before position 'left'. This is your anchor for reconnection. Then reverse the sublist from left to right.",
      "During reversal, track the first node of the sublist (becomes tail after reversal) and the node after position 'right'.",
      "Use dummy head. Navigate to position left-1. Reverse next (right-left+1) nodes. Connect prev to new head, reversed tail to remaining list."
    ],
    "solution": {
      "approach": "Dummy head. Find node before position left. Reverse the sublist. Reconnect: prev.next = reversed head, original head of sublist (now tail).next = node after right.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Reverse in-place like standard list reversal, but only for the specified range. Careful with reconnection at boundaries."
    }
  },
  "93": {
    "title": "Restore IP Addresses",
    "slug": "restore-ip-addresses",
    "difficulty": "medium",
    "primaryPattern": "Backtracking",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Backtracking": "An IP has 4 parts, each 0-255, no leading zeros (except '0' itself). Try 1-3 characters for each part. Backtrack if invalid or not enough chars remaining."
    },
    "hints": [
      "Valid IP: 4 segments, each 0-255, no leading zeros. Total length must be 4-12 characters.",
      "At each position, try taking 1, 2, or 3 characters for the current segment. Validate each segment (0-255, no leading zero).",
      "If we have 4 segments and used all characters, record result. For each segment length (1-3), if valid, continue building. Prune early if remaining chars can't fit remaining segments."
    ],
    "solution": {
      "approach": "Backtrack trying segment lengths 1-3. Validate: no leading zeros (unless '0'), value <= 255. When 4 segments built and string exhausted, add to results.",
      "timeComplexity": "O(1) - bounded by 3^4 = 81 combinations",
      "spaceComplexity": "O(1)",
      "keyInsight": "Heavily constrained: exactly 4 segments, each 1-3 digits, value 0-255. Early pruning based on remaining length makes this efficient."
    }
  },
  "94": {
    "title": "Binary Tree Inorder Traversal",
    "slug": "binary-tree-inorder-traversal",
    "difficulty": "easy",
    "primaryPattern": "Tree Traversal",
    "acceptablePatterns": [
      "Stack",
      "DFS"
    ],
    "patternExplanations": {
      "Tree Traversal": "Inorder: left, root, right. Recursively visit left subtree, process current node, then right subtree. For BST, this gives sorted order.",
      "Stack": "Iterative: push all left children. Pop, add to result, move to right child. Repeat. Stack simulates recursion call stack.",
      "DFS": "Depth-first traversal with specific ordering. Process node between exploring left and right children."
    },
    "hints": [
      "Inorder means: visit left subtree, then current node, then right subtree. This gives sorted order for BSTs.",
      "The straightforward solution uses function calls. For iterative, what data structure can simulate the call order?",
      "Iterative: go left as far as possible, saving nodes. Remove last saved, add to result, then move right. Repeat until nothing saved and no current node."
    ],
    "solution": {
      "approach": "Recursive: inorder(left), add root.val, inorder(right). Iterative: push all lefts, pop and record, go right, repeat.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(h) where h is tree height",
      "keyInsight": "Left-Root-Right ordering. Iterative version uses stack to track 'pending' right subtrees."
    }
  },
  "95": {
    "title": "Unique Binary Search Trees II",
    "slug": "unique-binary-search-trees-ii",
    "difficulty": "medium",
    "primaryPattern": "Recursion",
    "acceptablePatterns": [
      "Dynamic Programming"
    ],
    "patternExplanations": {
      "Recursion": "For values [start, end], try each as root. Recursively generate all left subtrees [start, i-1] and all right subtrees [i+1, end]. Combine all pairs.",
      "Dynamic Programming": "Build trees bottom-up by length. For length L, for each start position, generate trees using pre-computed shorter lengths."
    },
    "hints": [
      "For each possible root value i in [1,n], all values < i go in left subtree, all values > i go in right subtree.",
      "generateTrees(start, end) returns all possible BSTs for values [start, end]. Try each value as root.",
      "For root = i, left trees = generateTrees(start, i-1), right trees = generateTrees(i+1, end). For each (left, right) pair, create tree with root i."
    ],
    "solution": {
      "approach": "Recursive: for range [start, end], try each i as root. Get all left trees from [start, i-1], all right from [i+1, end]. Combine each pair with root i.",
      "timeComplexity": "O(n * Catalan(n))",
      "spaceComplexity": "O(n * Catalan(n))",
      "keyInsight": "Generate all combinations by trying each root. BST property determines which values go left vs right."
    }
  },
  "96": {
    "title": "Unique Binary Search Trees",
    "slug": "unique-binary-search-trees",
    "difficulty": "medium",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [
      "Math"
    ],
    "patternExplanations": {
      "Dynamic Programming": "dp[n] = number of unique BSTs with n nodes. For root at position i: dp[i-1] left trees * dp[n-i] right trees. Sum over all i.",
      "Math": "This is the nth Catalan number: C(n) = (2n)! / ((n+1)! * n!) or C(n) = C(n-1) * 2(2n-1) / (n+1)."
    },
    "hints": [
      "If root is at position i (1-indexed), left subtree has i-1 nodes, right subtree has n-i nodes. How do you combine these?",
      "Total BSTs with root at i = (BSTs with i-1 nodes) * (BSTs with n-i nodes). Sum over all positions i from 1 to n.",
      "Base: 0 or 1 nodes gives 1 tree. For n nodes: sum of (trees with i-1 nodes) * (trees with n-i nodes) for i from 1 to n."
    ],
    "solution": {
      "approach": "DP: dp[i] = unique BSTs with i nodes. dp[n] = sum(dp[j-1] * dp[n-j]) for j in [1,n]. Base: dp[0] = dp[1] = 1.",
      "timeComplexity": "O(n^2)",
      "spaceComplexity": "O(n)",
      "keyInsight": "This is Catalan numbers. Each root choice splits remaining nodes into left/right, multiply the counts."
    }
  },
  "97": {
    "title": "Interleaving String",
    "slug": "interleaving-string",
    "difficulty": "medium",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Dynamic Programming",
    "patternExplanations": {
      "Dynamic Programming": "dp[i][j] = can s1[0..i] and s2[0..j] interleave to form s3[0..i+j]? Check if next char matches."
    },
    "hints": [
      "s3[k] must come from either s1 or s2. Track positions in both.",
      "Can first i chars of s1 and first j chars of s2 interleave to form first i+j chars of s3?",
      "Check: if s1[i-1] matches s3[i+j-1] and previous state (i-1,j) was valid, OR if s2[j-1] matches and (i,j-1) was valid."
    ],
    "solution": {
      "approach": "2D DP. dp[i][j] true if s1[0..i-1] and s2[0..j-1] interleave to s3[0..i+j-1]. Check both transitions.",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(m * n) or O(n)",
      "keyInsight": "At each step, the next char in s3 must match either the next from s1 or s2."
    }
  },
  "98": {
    "title": "Validate Binary Search Tree",
    "slug": "validate-binary-search-tree",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Trees",
    "primaryPattern": "DFS",
    "acceptablePatterns": [],
    "patternExplanations": {
      "DFS": "Each node has valid range (min, max). Root: (-inf, inf). Left child: (min, parent). Right child: (parent, max)."
    },
    "hints": [
      "BST property: left < root < right. But it's not just immediate children - ALL left descendants < root.",
      "Each node must be within a valid range. What determines that range?",
      "Pass min and max bounds down. Left child's max = parent. Right child's min = parent."
    ],
    "solution": {
      "approach": "DFS with min/max bounds. validate(node, min, max): check node in range, recurse with updated bounds.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(h)",
      "keyInsight": "BST validity is about ranges, not just parent-child relationships."
    }
  },
  "99": {
    "title": "Recover Binary Search Tree",
    "slug": "recover-binary-search-tree",
    "difficulty": "medium",
    "primaryPattern": "Tree Traversal",
    "acceptablePatterns": [
      "DFS"
    ],
    "patternExplanations": {
      "Tree Traversal": "Inorder traversal of BST should be sorted. Two swapped nodes create inversions. First inversion's first node and last inversion's second node are the swapped pair.",
      "DFS": "Morris traversal achieves O(1) space by temporarily modifying tree structure. Threaded binary tree approach."
    },
    "hints": [
      "Inorder traversal of a valid BST gives sorted order. Two swapped nodes break this - you'll find one or two 'inversions' where prev > current.",
      "If nodes are adjacent in inorder, one inversion. If not adjacent, two inversions. Track the first node of first inversion and second node of last inversion.",
      "During inorder, track prev. If prev.val > curr.val: if first time, mark prev as first bad node. Always mark curr as second bad node. Finally swap values."
    ],
    "solution": {
      "approach": "Inorder traversal tracking prev. When prev > curr (inversion): first time set first=prev, always set second=curr. After traversal, swap first and second values.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(h) or O(1) with Morris traversal",
      "keyInsight": "Two swapped elements create at most two inversions in inorder sequence. First inversion's first element and last inversion's second element are the culprits."
    }
  },
  "100": {
    "title": "Same Tree",
    "slug": "same-tree",
    "difficulty": "easy",
    "lists": [
      "neetcode-150"
    ],
    "category": "Trees",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "BFS"
    ],
    "patternExplanations": {
      "DFS": "Recursively compare: both null = true, one null = false, values differ = false, else check both subtrees.",
      "BFS": "Compare level by level. Same logic but iterative with queue."
    },
    "hints": [
      "Two trees are same if: same structure AND same values at each position.",
      "Compare root values. If equal, both left subtrees must be same AND both right subtrees must be same.",
      "Base cases: both null = same, exactly one null = different."
    ],
    "solution": {
      "approach": "DFS: if both null return true, if one null return false, if vals differ return false, else recurse on both children.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(h)",
      "keyInsight": "Structural equality check is naturally recursive."
    }
  },
  "102": {
    "title": "Binary Tree Level Order Traversal",
    "slug": "binary-tree-level-order-traversal",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Trees",
    "primaryPattern": "BFS",
    "acceptablePatterns": [
      "DFS"
    ],
    "patternExplanations": {
      "BFS": "Process level by level using queue. For each level, process all nodes in queue, add their children.",
      "DFS": "Track depth parameter, add node value to result[depth]. Pre-order traversal maintains left-to-right order."
    },
    "hints": [
      "Level order = all nodes at depth 1, then depth 2, etc. Process layer by layer.",
      "Use a structure that lets you process nodes in the order they were added, while adding their children.",
      "Track level size before processing to know when one level ends and next begins."
    ],
    "solution": {
      "approach": "BFS with queue. For each level: record queue size, process that many nodes, add children to queue.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n) for queue",
      "keyInsight": "BFS naturally visits nodes level by level. Track level boundaries by queue size."
    }
  },
  "104": {
    "title": "Maximum Depth of Binary Tree",
    "slug": "maximum-depth-of-binary-tree",
    "difficulty": "easy",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "Trees",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "BFS"
    ],
    "patternExplanations": {
      "DFS": "Depth of node = 1 + max(depth of left subtree, depth of right subtree). Base case: null node has depth 0.",
      "BFS": "Level order traversal, count the number of levels. Each level = one depth unit."
    },
    "hints": [
      "Depth = number of nodes on longest path from root to leaf.",
      "For any node, its depth contribution is 1 + the deeper of its two subtrees.",
      "For each node: return 1 + max(maxDepth(left), maxDepth(right)). Base: null returns 0."
    ],
    "solution": {
      "approach": "DFS: if null return 0, else return 1 + max(maxDepth(left), maxDepth(right)).",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(h) recursion stack",
      "keyInsight": "Tree depth problems decompose into subproblems on subtrees."
    }
  },
  "105": {
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "slug": "construct-binary-tree-from-preorder-and-inorder-traversal",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Trees",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "patternExplanations": {
      "DFS": "Preorder first element = root. Find root in inorder to split left/right subtrees. Recurse.",
      "Hash Map": "Map inorder values to indices for O(1) lookup of root position. Avoids O(n) search each time."
    },
    "hints": [
      "Preorder: root first, then left subtree, then right subtree. Inorder: left, root, right.",
      "First element of preorder is always the root. Where is this root in inorder?",
      "Root's position in inorder tells you size of left subtree. Use this to split both arrays."
    ],
    "solution": {
      "approach": "Root = preorder[0]. Find root index in inorder. Left subtree = inorder[0:idx], right = inorder[idx+1:]. Recurse.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Preorder gives roots in order. Inorder splits left/right subtrees."
    }
  },
  "110": {
    "title": "Balanced Binary Tree",
    "slug": "balanced-binary-tree",
    "difficulty": "easy",
    "primaryPattern": "DFS",
    "acceptablePatterns": [],
    "explanation": "Depth-first search - explore as deep as possible before backtracking. Use recursion or stack for implementation.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Trees",
    "patternExplanations": {
      "DFS": "For each node, check if left and right subtrees are balanced and their height difference <= 1."
    },
    "hints": [
      "A balanced tree has left and right subtrees with height difference at most 1.",
      "You need height of each subtree. Can you compute height and check balance in one pass?",
      "Return -1 if subtree is unbalanced, otherwise return its height. Check both children."
    ],
    "solution": {
      "approach": "DFS returns height if balanced, -1 if not. For each node, check both children balanced and heights differ by <= 1.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(h)",
      "keyInsight": "Encode both height and balance status in return value: -1 means unbalanced."
    }
  },
  "115": {
    "title": "Distinct Subsequences",
    "slug": "distinct-subsequences",
    "difficulty": "hard",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Dynamic Programming",
    "patternExplanations": {
      "Dynamic Programming": "dp[i][j] = distinct subsequences of s[0..i] that equal t[0..j]. If chars match, can include or skip."
    },
    "hints": [
      "For each character in s, you can either use it to match t or skip it.",
      "If s[i] == t[j], you can match them (use result from i-1,j-1) or skip s[i] (use i-1,j).",
      "If s[i] != t[j], you must skip s[i], so result at (i,j) = result at (i-1,j)."
    ],
    "solution": {
      "approach": "2D DP. If chars match: dp[i][j] = dp[i-1][j-1] + dp[i-1][j]. Else: dp[i][j] = dp[i-1][j].",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(m * n) or O(n)",
      "keyInsight": "Two choices when chars match: use this match or skip it for a potentially later match."
    }
  },
  "121": {
    "title": "Best Time to Buy and Sell Stock",
    "slug": "best-time-to-buy-and-sell-stock",
    "difficulty": "easy",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "Sliding Window",
    "primaryPattern": "Greedy",
    "acceptablePatterns": [
      "Sliding Window",
      "Dynamic Programming"
    ],
    "patternExplanations": {
      "Greedy": "Track minimum price seen so far. For each price, profit = price - minSoFar. Update max profit and min price.",
      "Sliding Window": "Think of it as finding max difference where right > left. Expand right, move left to new min.",
      "Dynamic Programming": "maxProfit[i] = max(maxProfit[i-1], price[i] - minPrice). But greedy is simpler."
    },
    "hints": [
      "You want to buy low and sell high. What information do you need to track?",
      "If you're at day i, the best buy day is the day with minimum price before i.",
      "Track minimum price seen so far. Current profit = current price - min price so far."
    ],
    "solution": {
      "approach": "One pass: track minPrice and maxProfit. For each price: maxProfit = max(maxProfit, price - minPrice).",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "For any selling day, the optimal buying day is the minimum price before it."
    }
  },
  "124": {
    "title": "Binary Tree Maximum Path Sum",
    "slug": "binary-tree-maximum-path-sum",
    "difficulty": "hard",
    "primaryPattern": "DFS",
    "acceptablePatterns": [],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Trees",
    "patternExplanations": {
      "DFS": "For each node, calculate max path through it. Update global max. Return max one-sided path to parent."
    },
    "hints": [
      "A path can go through any node. At each node, the path could include left child, right child, or both.",
      "Maximum path through a node = node.val + maxLeft + maxRight (if positive).",
      "But when returning to parent, you can only take one side. Return max(leftPath, rightPath) + node.val."
    ],
    "solution": {
      "approach": "DFS returns max one-sided path. At each node, update global max with node + left + right. Return max single path.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(h)",
      "keyInsight": "Path through node uses both sides; path to parent uses only one side."
    }
  },
  "125": {
    "title": "Valid Palindrome",
    "slug": "valid-palindrome",
    "difficulty": "easy",
    "lists": [
      "neetcode-150"
    ],
    "category": "Two Pointers",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Two Pointers": "Use left and right pointers. Skip non-alphanumeric chars. Compare characters moving inward. O(n) time, O(1) space."
    },
    "hints": [
      "A palindrome reads the same forward and backward. How would you check this?",
      "Can you compare first and last character, then second and second-to-last, etc.?",
      "Skip any characters that aren't letters or numbers."
    ],
    "solution": {
      "approach": "Two pointers from ends, skip non-alphanumeric, compare lowercase chars.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Palindrome check is naturally suited to comparing from both ends simultaneously."
    }
  },
  "128": {
    "title": "Longest Consecutive Sequence",
    "slug": "longest-consecutive-sequence",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Arrays & Hashing",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [
      "Union Find"
    ],
    "patternExplanations": {
      "Hash Map": "Put all numbers in a set. For each number, check if it's a sequence start (n-1 not in set). If so, count consecutive numbers from there.",
      "Union Find": "Union consecutive numbers together, then find the largest connected component. More complex but also valid."
    },
    "hints": [
      "How can you quickly check if a number exists in the array?",
      "A sequence like [100,4,200,1,3,2] contains 1,2,3,4. How do you find where a sequence starts?",
      "A number starts a sequence if (number - 1) is NOT in the set. Then count upward."
    ],
    "solution": {
      "approach": "Add all to HashSet. For each num where (num-1) not in set, count consecutive nums going up.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Only start counting from sequence beginnings to avoid redundant work."
    }
  },
  "130": {
    "title": "Surrounded Regions",
    "slug": "surrounded-regions",
    "difficulty": "medium",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "BFS",
      "Union Find"
    ],
    "explanation": "Depth-first search - explore as deep as possible before backtracking. Use recursion or stack for implementation.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Graphs",
    "patternExplanations": {
      "DFS": "DFS from border O's to mark them. Then flip remaining O's to X. Unmark border-connected O's.",
      "BFS": "BFS from all border O's. Mark connected regions. Flip unmarked O's.",
      "Union Find": "Connect all border O's to a sentinel. Flip O's not connected to sentinel."
    },
    "hints": [
      "O's connected to border cannot be captured. Only interior O's get flipped.",
      "Instead of finding captured regions, find regions that are NOT captured.",
      "Explore from all border O's. Mark them as safe. Everything else that's O gets captured."
    ],
    "solution": {
      "approach": "Mark border-connected O's as safe (e.g., change to 'S'). Flip remaining O's to X. Change S back to O.",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(m * n)",
      "keyInsight": "Invert the problem: find what's NOT captured (border-connected) instead of what is."
    }
  },
  "131": {
    "title": "Palindrome Partitioning",
    "slug": "palindrome-partitioning",
    "difficulty": "medium",
    "primaryPattern": "Backtracking",
    "acceptablePatterns": [
      "Dynamic Programming"
    ],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Backtracking",
    "patternExplanations": {
      "Backtracking": "Try each prefix. If palindrome, recurse on rest. Build all valid partitions.",
      "Dynamic Programming": "Precompute palindrome table with DP, then backtrack to find partitions."
    },
    "hints": [
      "At each position, try all possible first palindromes, then continue with the rest.",
      "How do you check if a substring is a palindrome efficiently?",
      "You can precompute palindrome status for all substrings. Or check on the fly by comparing from both ends."
    ],
    "solution": {
      "approach": "Backtrack: try each prefix as first palindrome, recurse on suffix. Add partition when string exhausted.",
      "timeComplexity": "O(n * 2^n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Classic partition backtracking: try all valid first parts, recurse on rest."
    }
  },
  "133": {
    "title": "Clone Graph",
    "slug": "clone-graph",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Graphs",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "BFS",
      "Hash Map"
    ],
    "patternExplanations": {
      "DFS": "Recursively clone nodes. Use map from original to clone to handle cycles and avoid duplicates.",
      "BFS": "Iteratively clone using queue. Same map to track cloned nodes.",
      "Hash Map": "Essential to both approaches - maps original node to its clone."
    },
    "hints": [
      "Need to create new nodes and connect them the same way. How to handle cycles?",
      "If you revisit a node, you've already cloned it. Need to remember clones.",
      "Map: original node -> cloned node. If in map, return existing clone. Else create and recurse."
    ],
    "solution": {
      "approach": "DFS with HashMap<Node, Node>. If node in map, return clone. Else create clone, add to map, clone neighbors recursively.",
      "timeComplexity": "O(V + E)",
      "spaceComplexity": "O(V)",
      "keyInsight": "Hash map prevents infinite loops and ensures each node is cloned exactly once."
    }
  },
  "134": {
    "title": "Gas Station",
    "slug": "gas-station",
    "difficulty": "medium",
    "primaryPattern": "Greedy",
    "acceptablePatterns": [],
    "explanation": "Make locally optimal choice at each step. Works when local optimum leads to global optimum.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Greedy",
    "patternExplanations": {
      "Greedy": "If total gas >= total cost, solution exists. Start where cumulative sum from start is never negative."
    },
    "hints": [
      "If total gas < total cost, impossible. Otherwise a solution exists.",
      "If you can't reach station i+1 starting from j, can any station between j and i be the answer?",
      "No! If j can't reach i+1, neither can any station between them. Start fresh from i+1."
    ],
    "solution": {
      "approach": "Track total and current tank. If current < 0, reset start to next station. If total >= 0, start is answer.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "If we fail at station i starting from j, start fresh at i+1. All stations in between also fail."
    }
  },
  "136": {
    "title": "Single Number",
    "slug": "single-number",
    "difficulty": "easy",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "Bit Manipulation",
    "primaryPattern": "Bit Manipulation",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "patternExplanations": {
      "Bit Manipulation": "XOR all numbers. Pairs cancel out (a ^ a = 0). Result is the single number.",
      "Hash Map": "Count occurrences, find the one with count 1. Works but uses O(n) space."
    },
    "hints": [
      "Every element appears twice except one. How to find the unique one in O(1) space?",
      "XOR has properties: a ^ a = 0, a ^ 0 = a, XOR is commutative and associative.",
      "XOR all numbers: pairs cancel out, leaving only the single number."
    ],
    "solution": {
      "approach": "result = 0. For each num: result ^= num. Return result.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "XOR is self-inverse - duplicates cancel, unique remains."
    }
  },
  "138": {
    "title": "Copy List with Random Pointer",
    "slug": "copy-list-with-random-pointer",
    "difficulty": "medium",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [
      "Linked List"
    ],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Linked List",
    "patternExplanations": {
      "Hash Map": "First pass: create all nodes, map old to new. Second pass: set next and random pointers.",
      "Linked List": "Interleave copies: A->A'->B->B'. Set random pointers. Separate lists."
    },
    "hints": [
      "The tricky part is the random pointer - it points to arbitrary nodes.",
      "If you had a mapping from old nodes to new nodes, setting pointers would be easy.",
      "First pass: create all new nodes, map old->new. Second pass: set next and random using the map."
    ],
    "solution": {
      "approach": "HashMap from original to copy. First pass creates copies. Second pass sets next and random pointers.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "The map lets you find the copy of any node in O(1) when setting random pointers."
    }
  },
  "139": {
    "title": "Word Break",
    "slug": "word-break",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "1-D Dynamic Programming",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [
      "BFS"
    ],
    "patternExplanations": {
      "Dynamic Programming": "dp[i] = can string[0:i] be segmented? Check all j < i: if dp[j] is true and string[j:i] is in dictionary, dp[i] = true.",
      "BFS": "BFS where each state is an index. From index i, try to match each word, jump to i + word.length."
    },
    "hints": [
      "Can the string be broken into dictionary words?",
      "If s[0:i] can be segmented AND s[i:j] is a word, then s[0:j] can be segmented.",
      "Can we segment s[0:i]? Yes if there exists j where s[0:j] can be segmented and s[j:i] is in dictionary."
    ],
    "solution": {
      "approach": "dp[0] = true. For i from 1 to n: for each j from 0 to i: if dp[j] and s[j:i] in wordDict, dp[i] = true.",
      "timeComplexity": "O(n^2 * m) or O(n * m * k) with optimization",
      "spaceComplexity": "O(n)",
      "keyInsight": "Build up segmentation validity from start of string."
    }
  },
  "141": {
    "title": "Linked List Cycle",
    "slug": "linked-list-cycle",
    "difficulty": "easy",
    "lists": [
      "neetcode-150"
    ],
    "category": "Linked List",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "patternExplanations": {
      "Two Pointers": "Floyd's cycle detection: slow moves 1 step, fast moves 2 steps. If they meet, there's a cycle. If fast hits null, no cycle.",
      "Hash Map": "Store visited nodes in a set. If you revisit a node, there's a cycle. Uses O(n) space though."
    },
    "hints": [
      "How can you detect if you're going in circles?",
      "Imagine two runners on a track. If there's a loop, a faster runner will lap the slower one.",
      "Slow pointer: 1 step. Fast pointer: 2 steps. If they meet, cycle exists."
    ],
    "solution": {
      "approach": "Floyd's algorithm: slow (1 step) and fast (2 steps) pointers. Cycle exists iff they meet.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "In a cycle, the fast pointer gains one step per iteration, so they must eventually meet."
    }
  },
  "143": {
    "title": "Reorder List",
    "slug": "reorder-list",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Linked List",
    "primaryPattern": "Linked List",
    "acceptablePatterns": [
      "Two Pointers"
    ],
    "patternExplanations": {
      "Linked List": "Three steps: 1) Find middle with slow/fast pointers, 2) Reverse second half, 3) Merge alternating from both halves.",
      "Two Pointers": "Slow/fast to find middle, then interleave nodes from start and reversed end."
    },
    "hints": [
      "The pattern is: first, last, second, second-to-last, third, third-to-last...",
      "You're interleaving from front and back. But lists only go forward...",
      "Find middle, reverse the second half, then merge the two halves alternately."
    ],
    "solution": {
      "approach": "1) Find middle (slow/fast). 2) Reverse second half. 3) Merge first half and reversed second half alternately.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Reversing the second half lets you access it from the 'back' while traversing forward."
    }
  },
  "146": {
    "title": "LRU Cache",
    "slug": "lru-cache",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Linked List",
    "primaryPattern": "Linked List",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "patternExplanations": {
      "Linked List": "Doubly linked list maintains usage order. Most recent at head, least recent at tail. O(1) to move/remove nodes.",
      "Hash Map": "Map key -> node for O(1) lookup. Combined with doubly linked list for O(1) get and put."
    },
    "hints": [
      "LRU = Least Recently Used. Need to track usage order and evict oldest when full.",
      "Need O(1) lookup by key AND O(1) update of 'most recently used'. What combination works?",
      "Use a map for key lookup and a doubly-linked structure for ordering. Move accessed items to front."
    ],
    "solution": {
      "approach": "HashMap<key, node> + doubly linked list. On access: move to front. On insert when full: remove tail.",
      "timeComplexity": "O(1) for get and put",
      "spaceComplexity": "O(capacity)",
      "keyInsight": "Combining hash map (O(1) access) with doubly linked list (O(1) reorder) achieves both requirements."
    }
  },
  "150": {
    "title": "Evaluate Reverse Polish Notation",
    "slug": "evaluate-reverse-polish-notation",
    "difficulty": "medium",
    "primaryPattern": "Stack",
    "acceptablePatterns": [],
    "explanation": "LIFO structure for nested patterns, matching pairs, or maintaining monotonic sequences.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Stack",
    "patternExplanations": {
      "Stack": "Push numbers to stack. On operator, pop two operands, apply operator, push result."
    },
    "hints": [
      "In RPN, operators come after their operands: '3 4 +' means 3 + 4.",
      "Use a LIFO structure. When you see a number, add it.",
      "When you see an operator, remove two numbers, apply the operator, add the result back."
    ],
    "solution": {
      "approach": "Stack of numbers. On number: push. On operator: pop b, pop a, push (a op b).",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Second popped value is left operand, first popped is right. Order matters for - and /."
    }
  },
  "151": {
    "title": "Reverse Words in a String",
    "slug": "reverse-words-in-a-string",
    "difficulty": "medium",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [],
    "explanation": "Two pointers technique - use multiple indices to traverse the data structure efficiently, often from opposite ends or at different speeds.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Two Pointers",
    "patternExplanations": {
      "Two Pointers": "Reverse entire string, then reverse each word. Use two pointers to find word boundaries."
    },
    "hints": [
      "The words need to be in reverse order. What if you reversed the whole string first?",
      "After reversing whole string, each word is backwards. Reverse each word individually.",
      "Handle multiple spaces: skip spaces between words, don't include leading/trailing spaces."
    ],
    "solution": {
      "approach": "Reverse entire string. Then reverse each word. Handle extra spaces by rebuilding with single spaces.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n) or O(1) if in-place",
      "keyInsight": "Two reverses: whole string reverses word order, per-word reverse fixes each word."
    }
  },
  "152": {
    "title": "Maximum Product Subarray",
    "slug": "maximum-product-subarray",
    "difficulty": "medium",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Dynamic Programming",
    "patternExplanations": {
      "Dynamic Programming": "Track both max and min product ending at each position. Negative can flip min to max."
    },
    "hints": [
      "Unlike sum, product with negative numbers can flip sign.",
      "A large negative * negative = large positive. You need to track minimum too.",
      "At each position, track both max and min product ending there. Update both considering current element."
    ],
    "solution": {
      "approach": "Track maxProd and minProd ending at current position. For each num, update both (they can swap on negative).",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Minimum product can become maximum when multiplied by negative number."
    }
  },
  "153": {
    "title": "Find Minimum in Rotated Sorted Array",
    "slug": "find-minimum-in-rotated-sorted-array",
    "difficulty": "medium",
    "primaryPattern": "Binary Search",
    "acceptablePatterns": [],
    "explanation": "Divide and conquer on sorted data. Repeatedly halve the search space by comparing with middle element.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Binary Search",
    "patternExplanations": {
      "Binary Search": "Minimum is at rotation point. Binary search: if mid > right, min is in right half."
    },
    "hints": [
      "The array is sorted but rotated. The minimum is at the rotation point.",
      "Compare mid with right. If mid > right, rotation point (min) is in right half.",
      "If mid < right, mid could be min or min is in left half. Include mid in search."
    ],
    "solution": {
      "approach": "Binary search. If nums[mid] > nums[right], min in right half. Else in left half (including mid).",
      "timeComplexity": "O(log n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Compare with right boundary to determine which half contains the rotation point."
    }
  },
  "155": {
    "title": "Min Stack",
    "slug": "min-stack",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Stack",
    "primaryPattern": "Stack",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Stack": "Use two stacks or store pairs (value, currentMin). Track minimum at each level so pop doesn't lose min info."
    },
    "hints": [
      "A regular LIFO structure gives O(1) push/pop. How do you also get O(1) min?",
      "When you add, the min might change. When you remove, you need to know the previous min.",
      "Store the current minimum alongside each element, or use a separate structure tracking mins."
    ],
    "solution": {
      "approach": "Each stack entry stores (value, minSoFar). Min is always top entry's minSoFar.",
      "timeComplexity": "O(1) for all operations",
      "spaceComplexity": "O(n)",
      "keyInsight": "Store enough state with each element to reconstruct min after any number of pops."
    }
  },
  "162": {
    "title": "Find Peak Element",
    "slug": "find-peak-element",
    "difficulty": "medium",
    "primaryPattern": "Binary Search",
    "acceptablePatterns": [],
    "explanation": "Divide and conquer on sorted data. Repeatedly halve the search space by comparing with middle element.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Binary Search",
    "patternExplanations": {
      "Binary Search": "If mid < mid+1, peak is on right. If mid > mid+1, peak is on left (or mid is peak)."
    },
    "hints": [
      "A peak is greater than its neighbors. nums[-1] = nums[n] = -∞.",
      "Think about which direction leads uphill. The peak must be in that direction.",
      "If nums[mid] < nums[mid+1], we're on ascending slope, go right. Else go left."
    ],
    "solution": {
      "approach": "Binary search. Compare mid with mid+1. Go toward the higher neighbor. Peak is where it's higher than both.",
      "timeComplexity": "O(log n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Always move toward higher ground. Eventually you reach a peak."
    }
  },
  "167": {
    "title": "Two Sum II - Input Array Is Sorted",
    "slug": "two-sum-ii-input-array-is-sorted",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Two Pointers",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Binary Search",
      "Hash Map"
    ],
    "patternExplanations": {
      "Two Pointers": "Start with left=0, right=n-1. If sum too small, move left up. If sum too big, move right down. Sorted order makes this work.",
      "Binary Search": "For each number, binary search for its complement. O(n log n) but two pointers is simpler.",
      "Hash Map": "Works but doesn't leverage sorted property. Two pointers is optimal here."
    },
    "hints": [
      "The array is sorted - how can you use this property?",
      "If you pick the smallest and largest, their sum gives you information about which to adjust.",
      "Sum too big? You need smaller numbers. Sum too small? You need larger numbers."
    ],
    "solution": {
      "approach": "Two pointers at ends. Move left pointer right if sum < target, right pointer left if sum > target.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Sorted order lets you deterministically decide which pointer to move."
    }
  },
  "190": {
    "title": "Reverse Bits",
    "slug": "reverse-bits",
    "difficulty": "easy",
    "primaryPattern": "Bit Manipulation",
    "acceptablePatterns": [],
    "explanation": "Divide and conquer on sorted data. Repeatedly halve the search space by comparing with middle element.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Bit Manipulation",
    "patternExplanations": {
      "Bit Manipulation": "Extract each bit from right, add to result from left. Or swap bit pairs recursively."
    },
    "hints": [
      "Extract the rightmost bit, place it in the leftmost position of result.",
      "Use bit operations: n & 1 gets last bit, result << 1 shifts result left.",
      "Loop 32 times: result = (result << 1) | (n & 1); n >>= 1;"
    ],
    "solution": {
      "approach": "For each of 32 bits: shift result left, add last bit of n, shift n right.",
      "timeComplexity": "O(1) - always 32 iterations",
      "spaceComplexity": "O(1)",
      "keyInsight": "Build result bit by bit, taking from right of input and adding to left of result."
    }
  },
  "191": {
    "title": "Number of 1 Bits",
    "slug": "number-of-1-bits",
    "difficulty": "easy",
    "lists": [
      "neetcode-150"
    ],
    "category": "Bit Manipulation",
    "primaryPattern": "Bit Manipulation",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Bit Manipulation": "n & (n-1) clears the lowest set bit. Count how many times until n becomes 0. Or check each bit."
    },
    "hints": [
      "Count the number of 1s in binary representation.",
      "Simple way: check each of 32 bits with (n >> i) & 1.",
      "Clever way: n & (n-1) removes lowest 1 bit. Count iterations until n = 0."
    ],
    "solution": {
      "approach": "count = 0. While n: n = n & (n-1); count++. Or loop through 32 bits checking each.",
      "timeComplexity": "O(1) - at most 32 bits",
      "spaceComplexity": "O(1)",
      "keyInsight": "n & (n-1) efficiently removes one 1-bit per iteration."
    }
  },
  "198": {
    "title": "House Robber",
    "slug": "house-robber",
    "difficulty": "medium",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "1-D Dynamic Programming",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Dynamic Programming": "dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Either skip house i (take dp[i-1]) or rob it (dp[i-2] + nums[i])."
    },
    "hints": [
      "Can't rob adjacent houses. For each house, decide: rob it or skip it.",
      "If you rob house i, you couldn't have robbed house i-1. Your last rob was house i-2 or earlier.",
      "At house i: max money = max(skip this house, rob this house). Express both in terms of previous answers."
    ],
    "solution": {
      "approach": "dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Use two variables instead of array.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Classic DP: each state depends on previous non-adjacent state."
    }
  },
  "199": {
    "title": "Binary Tree Right Side View",
    "slug": "binary-tree-right-side-view",
    "difficulty": "medium",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "Trees",
    "primaryPattern": "BFS",
    "acceptablePatterns": [
      "DFS"
    ],
    "patternExplanations": {
      "BFS": "Level order traversal. For each level, the last node is visible from the right side.",
      "DFS": "Visit right subtree first. First node at each depth is rightmost. Track depth to avoid duplicates."
    },
    "hints": [
      "Right side view = rightmost node at each level.",
      "Process level by level - what's the last node at each level?",
      "Or explore right-to-left, going deep before wide: first node you see at each new depth is the answer for that level."
    ],
    "solution": {
      "approach": "BFS: for each level, add the last node's value to result. Or DFS right-first, track depth.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Right side view = one node per level, specifically the rightmost."
    }
  },
  "200": {
    "title": "Number of Islands",
    "slug": "number-of-islands",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Graphs",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "BFS",
      "Union Find"
    ],
    "patternExplanations": {
      "DFS": "When you find '1', DFS to mark entire island as visited. Count how many times you start a new DFS.",
      "BFS": "Same idea but explore island using BFS queue. Either traversal works.",
      "Union Find": "Union adjacent '1' cells. Count unique roots at end."
    },
    "hints": [
      "An island is a connected group of '1's. How do you count separate groups?",
      "When you find a '1', you've found a new island. Mark all connected '1's as visited.",
      "Increment count each time you start exploring from an unvisited '1'."
    ],
    "solution": {
      "approach": "Iterate grid. When finding unvisited '1', increment count and DFS/BFS to mark entire island visited.",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(m * n) worst case",
      "keyInsight": "Connected component counting: each DFS/BFS explores one component."
    }
  },
  "202": {
    "title": "Happy Number",
    "slug": "happy-number",
    "difficulty": "easy",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [
      "Two Pointers"
    ],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Math",
    "patternExplanations": {
      "Hash Map": "Compute sum of squared digits repeatedly. Track seen sums to detect cycle.",
      "Two Pointers": "Floyd's cycle detection: slow and fast pointers on the sequence of sums."
    },
    "hints": [
      "Keep computing sum of squared digits. It either reaches 1 or cycles.",
      "How do you detect if you're in a cycle?",
      "Use a set to track seen numbers, or use Floyd's cycle detection (fast/slow pointers)."
    ],
    "solution": {
      "approach": "Compute next number (sum of squared digits). Use set to detect cycle. Stop at 1 or cycle.",
      "timeComplexity": "O(log n) per step, limited steps",
      "spaceComplexity": "O(1) with Floyd's, O(log n) with set",
      "keyInsight": "The sequence either reaches 1 or enters a cycle. Detect cycle to avoid infinite loop."
    }
  },
  "206": {
    "title": "Reverse Linked List",
    "slug": "reverse-linked-list",
    "difficulty": "easy",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "Linked List",
    "primaryPattern": "Linked List",
    "acceptablePatterns": [
      "Two Pointers"
    ],
    "patternExplanations": {
      "Linked List": "Iteratively reverse pointers: for each node, save next, point current to prev, advance prev and current.",
      "Two Pointers": "prev and current pointers moving through the list, reversing each link as you go."
    },
    "hints": [
      "You need to reverse all the arrows. 1->2->3 becomes 1<-2<-3.",
      "To reverse a link, you need access to the previous node. Track it.",
      "For each node: save next, reverse link, move prev and current forward."
    ],
    "solution": {
      "approach": "Track prev (initially null) and curr. For each node: tmp = curr.next, curr.next = prev, prev = curr, curr = tmp.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Reverse one link at a time while tracking just prev and current."
    }
  },
  "207": {
    "title": "Course Schedule",
    "slug": "course-schedule",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Graphs",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "BFS",
      "Topological Sort"
    ],
    "patternExplanations": {
      "DFS": "Detect cycle in directed graph. Use states: unvisited, visiting (in current path), visited. Cycle if we revisit 'visiting' node.",
      "BFS": "Kahn's algorithm for topological sort. If all nodes processed, no cycle. If queue empties early, cycle exists.",
      "Topological Sort": "Can complete all courses iff the dependency graph has no cycles (is a DAG)."
    },
    "hints": [
      "Courses with prerequisites form a directed graph. What makes it impossible to complete all?",
      "Impossible if there's a cycle: A requires B, B requires C, C requires A.",
      "Detect if there's a cycle by exploring the graph and tracking nodes in the current path."
    ],
    "solution": {
      "approach": "DFS cycle detection: 3 states per node. Or BFS: count incoming edges, process nodes with 0 incoming, check if all processed.",
      "timeComplexity": "O(V + E)",
      "spaceComplexity": "O(V + E)",
      "keyInsight": "Course scheduling is a DAG validity check - can only complete if no cycles."
    }
  },
  "208": {
    "title": "Implement Trie (Prefix Tree)",
    "slug": "implement-trie-prefix-tree",
    "difficulty": "medium",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "Tries",
    "primaryPattern": "Trie",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Trie": "Tree where each node has up to 26 children (for lowercase letters). Path from root to node represents a prefix."
    },
    "hints": [
      "Each node stores children (a-z) and a flag for 'is this a complete word?'",
      "Insert: traverse/create nodes for each character, mark last node as word end.",
      "Search: traverse for each character, return false if missing. StartsWith is similar but doesn't check word end."
    ],
    "solution": {
      "approach": "Node has children[26] and isEnd boolean. Insert creates path. Search/StartsWith traverse path.",
      "timeComplexity": "O(m) per operation, m = word length",
      "spaceComplexity": "O(total characters inserted)",
      "keyInsight": "Trie shares prefixes - common prefixes stored once, enabling efficient prefix queries."
    }
  },
  "210": {
    "title": "Course Schedule II",
    "slug": "course-schedule-ii",
    "difficulty": "medium",
    "primaryPattern": "Topological Sort",
    "acceptablePatterns": [
      "DFS",
      "BFS"
    ],
    "explanation": "Depth-first search - explore as deep as possible before backtracking. Use recursion or stack for implementation.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Graphs",
    "patternExplanations": {
      "Topological Sort": "Kahn's algorithm: process nodes with no prerequisites first. Remove edges, repeat.",
      "DFS": "DFS with states (unvisited, visiting, visited). Detect cycles. Build order in post-order.",
      "BFS": "BFS from nodes with 0 in-degree. Add to order. Decrement neighbors' in-degree."
    },
    "hints": [
      "You need to order courses so all prerequisites come before dependents.",
      "Start with courses that have no prerequisites (in-degree 0).",
      "Process them, remove their edges, find new courses with in-degree 0. Repeat."
    ],
    "solution": {
      "approach": "Kahn's algorithm: queue nodes with 0 in-degree, process, decrement neighbors' in-degree, add new 0s.",
      "timeComplexity": "O(V + E)",
      "spaceComplexity": "O(V + E)",
      "keyInsight": "Same as Course Schedule I, but collect the order instead of just checking feasibility."
    }
  },
  "211": {
    "title": "Design Add and Search Words Data Structure",
    "slug": "design-add-and-search-words-data-structure",
    "difficulty": "medium",
    "primaryPattern": "Trie",
    "acceptablePatterns": [
      "DFS"
    ],
    "explanation": "Depth-first search - explore as deep as possible before backtracking. Use recursion or stack for implementation.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Tries",
    "patternExplanations": {
      "Trie": "Build trie for words. For search with '.', try all children at that position with DFS.",
      "DFS": "DFS through trie. On '.', recursively try all 26 children."
    },
    "hints": [
      "Use a prefix tree structure for efficient prefix operations.",
      "addWord is standard prefix tree insert. search is where it gets interesting.",
      "For '.', you need to try all possible characters at that position. Explore all branches."
    ],
    "solution": {
      "approach": "Trie with search that handles '.'. On '.', recursively search all children. On letter, follow that path.",
      "timeComplexity": "O(m) for add, O(26^m) worst case for search with all dots",
      "spaceComplexity": "O(total characters)",
      "keyInsight": "Trie handles prefixes well. Wildcards require trying all branches at that level."
    }
  },
  "212": {
    "title": "Word Search II",
    "slug": "word-search-ii",
    "difficulty": "hard",
    "primaryPattern": "Trie",
    "acceptablePatterns": [
      "Backtracking"
    ],
    "explanation": "Explore all possible solutions recursively. Build candidates incrementally and abandon paths that cannot lead to solution.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Backtracking",
    "patternExplanations": {
      "Trie": "Build trie of words. DFS from each cell, following trie paths. Prune when no trie match.",
      "Backtracking": "Trie + backtracking. Use trie to quickly check if current path could lead to a word."
    },
    "hints": [
      "Word Search I for each word would be O(words * m * n * 4^L). Can you do better?",
      "Build a prefix tree from all words. Search the board once, following the prefix tree.",
      "At each cell, only continue if current path exists in the prefix structure. This prunes many paths."
    ],
    "solution": {
      "approach": "Build trie of words. DFS from each cell, following trie. When word found, add to result. Mark visited cells.",
      "timeComplexity": "O(m * n * 4^L) but heavily pruned by trie",
      "spaceComplexity": "O(words * avgLength)",
      "keyInsight": "Trie lets you search for all words simultaneously, pruning impossible paths."
    }
  },
  "213": {
    "title": "House Robber II",
    "slug": "house-robber-ii",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "1-D Dynamic Programming",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Dynamic Programming": "Houses in a circle. Can't rob both first and last. Run House Robber twice: once without first, once without last."
    },
    "hints": [
      "Houses are in a circle - first and last are adjacent.",
      "If you rob house 0, you can't rob house n-1 (and vice versa).",
      "Solve two separate House Robber I problems: houses[0..n-2] and houses[1..n-1]. Take max."
    ],
    "solution": {
      "approach": "max(robLinear(nums[0:n-1]), robLinear(nums[1:n])). Exclude either first or last house.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Break the cycle by considering two cases: exclude first house or exclude last house."
    }
  },
  "215": {
    "title": "Kth Largest Element in an Array",
    "slug": "kth-largest-element-in-an-array",
    "difficulty": "medium",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "Heap / Priority Queue",
    "primaryPattern": "Heap/Priority Queue",
    "acceptablePatterns": [
      "Quickselect"
    ],
    "patternExplanations": {
      "Heap/Priority Queue": "Use min-heap of size k. Add all elements. Heap top is kth largest. O(n log k).",
      "Quickselect": "Partition-based selection like quicksort. Average O(n), but worst case O(n^2)."
    },
    "hints": [
      "Kth largest = (n-k+1)th smallest. How can you find this efficiently?",
      "A structure that always gives you the smallest element, kept to size k, holds the k largest. What's at the top?",
      "Add elements. If size > k, remove smallest. Finally, the smallest of the k largest is your answer."
    ],
    "solution": {
      "approach": "Min-heap of size k. Add all elements, remove if size > k. Result is heap top.",
      "timeComplexity": "O(n log k)",
      "spaceComplexity": "O(k)",
      "keyInsight": "Min-heap of size k naturally filters to keep k largest, with smallest of those on top."
    }
  },
  "216": {
    "title": "Combination Sum III",
    "slug": "combination-sum-iii",
    "difficulty": "medium",
    "primaryPattern": "Backtracking",
    "acceptablePatterns": [],
    "explanation": "Explore all possible solutions recursively. Build candidates incrementally and abandon paths that cannot lead to solution.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Backtracking",
    "patternExplanations": {
      "Backtracking": "Choose k numbers from 1-9 that sum to n. Backtrack, trying each number once."
    },
    "hints": [
      "Similar to Combination Sum, but exactly k numbers, each from 1-9, no repeats.",
      "Try choices, undo when needed. Track count and remaining sum.",
      "Start each call from the next number to avoid duplicates."
    ],
    "solution": {
      "approach": "Backtrack with start index (1-9), remaining count k, remaining sum n. Add when k=0 and n=0.",
      "timeComplexity": "O(C(9,k) * k)",
      "spaceComplexity": "O(k)",
      "keyInsight": "Limited to digits 1-9, each used once. Constrained backtracking."
    }
  },
  "217": {
    "title": "Contains Duplicate",
    "slug": "contains-duplicate",
    "difficulty": "easy",
    "lists": [
      "neetcode-150"
    ],
    "category": "Arrays & Hashing",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [
      "Sorting"
    ],
    "patternExplanations": {
      "Hash Map": "Add each number to a set. If you try to add a number that's already there, you found a duplicate. O(n) time, O(n) space.",
      "Sorting": "Sort the array first, then adjacent duplicates will be next to each other. O(n log n) time, O(1) space if sorting in-place."
    },
    "hints": [
      "What's the simplest way to know if you've seen a number before?",
      "A Set automatically rejects duplicates - how can you use that?",
      "Alternatively, if the array were sorted, where would duplicates appear?"
    ],
    "solution": {
      "approach": "Use a HashSet to track seen numbers. Return true if a number is already in the set.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Detecting duplicates is fundamentally about tracking 'have I seen this before?'"
    }
  },
  "226": {
    "title": "Invert Binary Tree",
    "slug": "invert-binary-tree",
    "difficulty": "easy",
    "lists": [
      "neetcode-150"
    ],
    "category": "Trees",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "BFS"
    ],
    "patternExplanations": {
      "DFS": "Recursively invert left and right subtrees, then swap them. Process each node once.",
      "BFS": "Level by level, swap left and right children of each node. Same result, different traversal."
    },
    "hints": [
      "Inverting means swapping left and right children at every node.",
      "If you invert the subtrees first, then swap them, does order matter?",
      "For each node: invert(left), invert(right), then swap left and right."
    ],
    "solution": {
      "approach": "DFS: for each node, swap left and right children, recursively invert both subtrees.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(h) recursion stack",
      "keyInsight": "Inverting is just swapping children at every node - recursion handles the traversal."
    }
  },
  "230": {
    "title": "Kth Smallest Element in a BST",
    "slug": "kth-smallest-element-in-a-bst",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Trees",
    "primaryPattern": "DFS",
    "acceptablePatterns": [],
    "patternExplanations": {
      "DFS": "Inorder traversal of BST visits nodes in sorted order. Count nodes during traversal, stop at k."
    },
    "hints": [
      "In a BST, which traversal order gives you elements in sorted order?",
      "Inorder: left, node, right. For BST this is ascending order.",
      "Do inorder traversal, count nodes visited. When count reaches k, that's your answer."
    ],
    "solution": {
      "approach": "Inorder traversal (iterative or recursive), count elements, return when count = k.",
      "timeComplexity": "O(h + k)",
      "spaceComplexity": "O(h)",
      "keyInsight": "BST inorder traversal = sorted order. Kth smallest = kth element in inorder."
    }
  },
  "235": {
    "title": "Lowest Common Ancestor of a Binary Search Tree",
    "slug": "lowest-common-ancestor-of-a-binary-search-tree",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Trees",
    "primaryPattern": "Binary Search",
    "acceptablePatterns": [
      "DFS"
    ],
    "patternExplanations": {
      "Binary Search": "Use BST property: if both p and q are smaller, go left. If both larger, go right. Otherwise, current node is LCA.",
      "DFS": "BST property guides the search - no need to check both subtrees like in regular binary tree."
    },
    "hints": [
      "In a BST, all left descendants are smaller, all right descendants are larger.",
      "If p and q are on different sides of current node, current node is their LCA. Why?",
      "If both p and q are smaller than current, LCA must be in left subtree. Similarly for right."
    ],
    "solution": {
      "approach": "If p and q both < node, go left. If both > node, go right. Otherwise return node (it's the split point).",
      "timeComplexity": "O(h)",
      "spaceComplexity": "O(1) iterative, O(h) recursive",
      "keyInsight": "BST property means the first node where p and q 'split' (go different directions) is the LCA."
    }
  },
  "236": {
    "title": "Lowest Common Ancestor of a Binary Tree",
    "slug": "lowest-common-ancestor-of-a-binary-tree",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Binary Tree - DFS",
    "primaryPattern": "DFS",
    "acceptablePatterns": [],
    "patternExplanations": {
      "DFS": "Recursively search. If node is p or q, return it. If left and right both return non-null, current is LCA. Else return non-null child."
    },
    "hints": [
      "LCA: deepest node that has both p and q as descendants (node can be its own descendant).",
      "If current is p or q, return it. Search left and right subtrees.",
      "If both subtrees return non-null, current node is LCA. Else return whichever is non-null."
    ],
    "solution": {
      "approach": "If node is null/p/q, return node. Recurse left and right. If both non-null, return node. Else return non-null one.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(h)",
      "keyInsight": "Node is LCA if p and q are found in different subtrees (or node itself is p or q)."
    }
  },
  "238": {
    "title": "Product of Array Except Self",
    "slug": "product-of-array-except-self",
    "difficulty": "medium",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "Arrays & Hashing",
    "primaryPattern": "Prefix/Suffix",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "patternExplanations": {
      "Prefix/Suffix": "For each position, answer = (product of all elements before) × (product of all elements after). Build prefix and suffix products.",
      "Hash Map": "Not ideal, but you could precompute total product and divide (fails with zeros). Prefix/suffix is the clean approach."
    },
    "hints": [
      "The answer for position i is the product of everything except nums[i]. Can you split this?",
      "Product of everything before i × product of everything after i = answer for i.",
      "Can you compute all prefix products in one pass, then all suffix products in another?"
    ],
    "solution": {
      "approach": "First pass: build prefix products. Second pass: multiply by suffix products (computed on the fly).",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1) extra (output array doesn't count)",
      "keyInsight": "Decompose 'everything except self' into 'everything before' × 'everything after'."
    }
  },
  "239": {
    "title": "Sliding Window Maximum",
    "slug": "sliding-window-maximum",
    "difficulty": "hard",
    "primaryPattern": "Sliding Window",
    "acceptablePatterns": [
      "Heap"
    ],
    "explanation": "Maintain a window of elements that slides through the array. Expand when adding elements, contract when removing. Track window state.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Sliding Window",
    "patternExplanations": {
      "Sliding Window": "Monotonic decreasing deque. Remove smaller elements when adding. Remove out-of-window elements.",
      "Heap": "Max-heap of (value, index). Pop elements outside window before getting max."
    },
    "hints": [
      "For each window, you need the maximum. Naive is O(nk). Can you do O(n)?",
      "Use a deque to maintain indices of useful elements in decreasing order.",
      "When adding nums[i], remove all smaller elements from back (they'll never be max). Remove front if outside window."
    ],
    "solution": {
      "approach": "Deque of indices in decreasing order of values. Pop back if smaller, pop front if outside window.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(k)",
      "keyInsight": "Monotonic deque: smaller elements are useless once a larger one enters the window."
    }
  },
  "242": {
    "title": "Valid Anagram",
    "slug": "valid-anagram",
    "difficulty": "easy",
    "lists": [
      "neetcode-150"
    ],
    "category": "Arrays & Hashing",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [
      "Sorting"
    ],
    "patternExplanations": {
      "Hash Map": "Count character frequencies in both strings. If the frequency maps are identical, they're anagrams. O(n) time.",
      "Sorting": "Sort both strings and compare. Anagrams will produce identical sorted strings. O(n log n) time."
    },
    "hints": [
      "What makes two words anagrams of each other?",
      "Anagrams have the exact same letters, just rearranged. How can you verify this?",
      "Count each letter's frequency - what should be true for anagrams?"
    ],
    "solution": {
      "approach": "Build frequency map for each string, compare maps (or use single map with increment/decrement).",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1) - at most 26 letters",
      "keyInsight": "Anagrams are defined by character counts, not character positions."
    }
  },
  "252": {
    "title": "Meeting Rooms",
    "slug": "meeting-rooms",
    "difficulty": "easy",
    "lists": [
      "neetcode-150"
    ],
    "category": "Intervals",
    "primaryPattern": "Greedy",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Greedy": "Sort intervals by start time. Check if any overlap (end > next start)."
    },
    "hints": [
      "If any two meetings overlap, can't attend all.",
      "Sort by start time. Check each consecutive pair.",
      "If meeting[i].end > meeting[i+1].start, they overlap."
    ],
    "solution": {
      "approach": "Sort by start time. For each pair of consecutive meetings, check if they overlap.",
      "timeComplexity": "O(n log n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Sorted by start: only need to check adjacent pairs for overlap."
    }
  },
  "253": {
    "title": "Meeting Rooms II",
    "slug": "meeting-rooms-ii",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Intervals",
    "primaryPattern": "Heap",
    "acceptablePatterns": [
      "Greedy"
    ],
    "patternExplanations": {
      "Heap": "Sort by start. Min-heap of end times. For each meeting, if can reuse room (end <= start), pop. Push new end.",
      "Greedy": "Count maximum concurrent meetings. Sort all start/end points, track running count."
    },
    "hints": [
      "Minimum rooms = maximum number of concurrent meetings.",
      "Sort by start time. Track end times of ongoing meetings.",
      "Track end times so you can always get the earliest. For each meeting: if earliest end <= new start, reuse that room. Always add new end."
    ],
    "solution": {
      "approach": "Sort by start. Min-heap of end times. For each meeting, pop if top <= start (room freed). Push new end. Max heap size = rooms.",
      "timeComplexity": "O(n log n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Heap tracks rooms by end time. Can reuse room if earliest-ending room ends before new meeting starts."
    }
  },
  "261": {
    "title": "Graph Valid Tree",
    "slug": "graph-valid-tree",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Graphs",
    "primaryPattern": "Union Find",
    "acceptablePatterns": [
      "DFS"
    ],
    "patternExplanations": {
      "Union Find": "Tree has n-1 edges and is connected. Use union-find: if edge creates cycle, invalid. Finally check one component.",
      "DFS": "Tree = connected + acyclic. Check both with DFS."
    },
    "hints": [
      "A tree with n nodes has exactly n-1 edges and is connected.",
      "Also, a tree has no cycles.",
      "Process edges. If an edge connects nodes already in the same group, it creates a cycle. Finally check all nodes are in one group."
    ],
    "solution": {
      "approach": "Check edges = n-1. Union-Find: if union returns false (same component), there's a cycle. Check one component at end.",
      "timeComplexity": "O(n α(n))",
      "spaceComplexity": "O(n)",
      "keyInsight": "Tree = n-1 edges + connected + no cycles. Union-Find checks cycles and connectivity."
    }
  },
  "268": {
    "title": "Missing Number",
    "slug": "missing-number",
    "difficulty": "easy",
    "lists": [
      "neetcode-150"
    ],
    "category": "Bit Manipulation",
    "primaryPattern": "Bit Manipulation",
    "acceptablePatterns": [
      "Hash Map",
      "Math"
    ],
    "patternExplanations": {
      "Bit Manipulation": "XOR all indices 0 to n with all elements. Pairs cancel, missing number remains.",
      "Math": "Expected sum = n*(n+1)/2. Actual sum = sum of array. Missing = expected - actual.",
      "Hash Map": "Store all elements, find which 0 to n is missing. Uses O(n) space."
    },
    "hints": [
      "Array contains n numbers in range [0, n]. One is missing.",
      "Sum approach: expected sum of 0 to n minus actual sum = missing number.",
      "XOR approach: XOR indices 0 to n with array elements. Duplicates cancel."
    ],
    "solution": {
      "approach": "XOR: result = n (covers the index). Then result ^= i ^ nums[i] for all i. Or use sum formula.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Both math (sum) and XOR leverage the complete range [0,n] vs array contents."
    }
  },
  "269": {
    "title": "Alien Dictionary",
    "slug": "alien-dictionary",
    "difficulty": "hard",
    "lists": [
      "neetcode-150"
    ],
    "category": "Graphs",
    "primaryPattern": "Topological Sort",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Topological Sort": "Build order graph from adjacent word pairs. Topological sort gives valid ordering. Detect cycle = invalid."
    },
    "hints": [
      "Compare adjacent words to find character ordering.",
      "First differing char in adjacent words tells you: earlier char < later char.",
      "Build directed graph. Order nodes so all edges point forward. If cycle exists, no valid order."
    ],
    "solution": {
      "approach": "Compare adjacent words for ordering. Build graph. Topological sort (Kahn's). Detect cycle. Return order.",
      "timeComplexity": "O(total chars)",
      "spaceComplexity": "O(unique chars)",
      "keyInsight": "Adjacent sorted words reveal character order. Edge a->b means a comes before b."
    }
  },
  "271": {
    "title": "Encode and Decode Strings",
    "slug": "encode-and-decode-strings",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Design",
    "primaryPattern": "Design",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Design": "Encode with length prefix: '3#abc' for 'abc'. Decode by reading length, then extracting string."
    },
    "hints": [
      "Strings can contain any characters including delimiters.",
      "Use length-prefix encoding: store length before each string.",
      "Format: 'len#string'. To decode, read until #, parse length, extract that many chars."
    ],
    "solution": {
      "approach": "Encode: len(s) + '#' + s for each string. Decode: read number until '#', extract that many chars, repeat.",
      "timeComplexity": "O(n) total chars",
      "spaceComplexity": "O(n)",
      "keyInsight": "Length prefix avoids delimiter conflicts. Any character is safe in the string itself."
    }
  },
  "283": {
    "title": "Move Zeroes",
    "slug": "move-zeroes",
    "difficulty": "easy",
    "lists": [
      "leetcode-75"
    ],
    "category": "Two Pointers",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Two Pointers": "Slow pointer tracks position for next non-zero. Fast pointer scans array. Swap when fast finds non-zero."
    },
    "hints": [
      "Move all non-zero elements to the front, maintaining relative order.",
      "Use two indices: slow marks where next non-zero should go, fast finds non-zeros.",
      "When fast finds non-zero, swap with slow position, advance both. Else just advance fast."
    ],
    "solution": {
      "approach": "slow = 0. For fast in range(n): if nums[fast] != 0, swap nums[slow] and nums[fast], slow++.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Partition-like operation: non-zeros to the left, zeros to the right."
    }
  },
  "286": {
    "title": "Walls and Gates",
    "slug": "walls-and-gates",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Graphs",
    "primaryPattern": "BFS",
    "acceptablePatterns": [],
    "patternExplanations": {
      "BFS": "Multi-source BFS from all gates. Each cell gets distance to nearest gate."
    },
    "hints": [
      "Each room should have distance to nearest gate.",
      "Starting from a single source gives distance from that source. What about multiple sources?",
      "Multi-source approach: start from all gates simultaneously. First visit to each room gives shortest distance."
    ],
    "solution": {
      "approach": "Queue all gates. BFS: for each cell, if neighbor is INF, set to distance+1 and queue.",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(m * n)",
      "keyInsight": "Multi-source BFS: treat all gates as distance 0 starting points. BFS gives shortest path."
    }
  },
  "287": {
    "title": "Find the Duplicate Number",
    "slug": "find-the-duplicate-number",
    "difficulty": "medium",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Binary Search"
    ],
    "explanation": "Two pointers technique - use multiple indices to traverse the data structure efficiently, often from opposite ends or at different speeds.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Linked List",
    "patternExplanations": {
      "Two Pointers": "Floyd's cycle detection. Array indices as next pointers. The cycle start is the duplicate.",
      "Binary Search": "Binary search on value range [1,n]. Count elements <= mid. If count > mid, duplicate is <= mid."
    },
    "hints": [
      "There are n+1 numbers in range [1,n]. By pigeonhole, there's a duplicate.",
      "Treat the array as a sequence of jumps: value at index i tells you the next index to visit.",
      "A duplicate means two indices point to the same value - that's a cycle! Use cycle detection."
    ],
    "solution": {
      "approach": "Floyd's algorithm: slow = nums[slow], fast = nums[nums[fast]]. Find cycle, then find entrance.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Treating values as pointers creates a linked list. Duplicate = cycle entrance."
    }
  },
  "295": {
    "title": "Find Median from Data Stream",
    "slug": "find-median-from-data-stream",
    "difficulty": "hard",
    "lists": [
      "neetcode-150"
    ],
    "category": "Heap / Priority Queue",
    "primaryPattern": "Heap/Priority Queue",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Heap/Priority Queue": "Two heaps: max-heap for lower half, min-heap for upper half. Median is from heap tops."
    },
    "hints": [
      "Median is the middle element. Need quick access to middle as elements are added.",
      "What if you kept the smaller half in one structure and larger half in another?",
      "One structure that gives the max of small half, another that gives the min of large half. Balance sizes."
    ],
    "solution": {
      "approach": "Max-heap for lower half, min-heap for upper half. Keep sizes balanced (differ by at most 1). Median from top(s).",
      "timeComplexity": "O(log n) add, O(1) findMedian",
      "spaceComplexity": "O(n)",
      "keyInsight": "Two heaps maintain the partition around the median, giving O(1) access to middle elements."
    }
  },
  "297": {
    "title": "Serialize and Deserialize Binary Tree",
    "slug": "serialize-and-deserialize-binary-tree",
    "difficulty": "hard",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "BFS"
    ],
    "explanation": "Depth-first search - explore as deep as possible before backtracking. Use recursion or stack for implementation.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Trees",
    "patternExplanations": {
      "DFS": "Serialize with preorder, marking nulls. Deserialize by reading preorder, creating nodes or nulls.",
      "BFS": "Level-order traversal for serialization. Include nulls to preserve structure."
    },
    "hints": [
      "You need to encode the tree structure in a string, then reconstruct it.",
      "Preorder traversal with null markers is a common approach.",
      "Serialize: 1,2,null,null,3,4,null,null,5,null,null. Process tokens in order to deserialize."
    ],
    "solution": {
      "approach": "Serialize with preorder DFS, using 'null' for empty nodes. Deserialize by reading tokens and recursing.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Preorder with null markers uniquely identifies tree structure. No need for inorder."
    }
  },
  "300": {
    "title": "Longest Increasing Subsequence",
    "slug": "longest-increasing-subsequence",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "1-D Dynamic Programming",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [
      "Binary Search"
    ],
    "patternExplanations": {
      "Dynamic Programming": "dp[i] = LIS ending at index i. For each j < i where nums[j] < nums[i]: dp[i] = max(dp[i], dp[j] + 1). O(n^2).",
      "Binary Search": "Maintain array of smallest tail for each LIS length. Binary search to find position to update. O(n log n)."
    },
    "hints": [
      "For each position i, what's the longest increasing subsequence that ends at i?",
      "LIS ending at i = 1 + max(LIS ending at any j < i where nums[j] < nums[i]).",
      "O(n^2) approach works. For O(n log n), maintain tails array and search for position efficiently."
    ],
    "solution": {
      "approach": "O(n^2): dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]. Answer = max(dp).",
      "timeComplexity": "O(n^2) or O(n log n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Each element extends the best LIS from some previous element that's smaller."
    }
  },
  "309": {
    "title": "Best Time to Buy and Sell Stock with Cooldown",
    "slug": "best-time-to-buy-and-sell-stock-with-cooldown",
    "difficulty": "medium",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Dynamic Programming",
    "patternExplanations": {
      "Dynamic Programming": "Track states: holding stock, cooldown, not holding. Transition based on actions."
    },
    "hints": [
      "At each day, you can be in one of three states: holding stock, cooling down, or ready to buy.",
      "Holding today = max(held yesterday, bought today from ready state)",
      "Ready today = max(ready yesterday, finished cooldown). Cooldown today = sold today."
    ],
    "solution": {
      "approach": "3 states: hold, sold (cooldown), ready. Transition: hold = max(hold, ready-price), sold = hold+price, ready = max(ready, sold).",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "The cooldown constraint means you can't buy immediately after selling. Track sold state separately."
    }
  },
  "312": {
    "title": "Burst Balloons",
    "slug": "burst-balloons",
    "difficulty": "hard",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Dynamic Programming",
    "patternExplanations": {
      "Dynamic Programming": "dp[i][j] = max coins from bursting balloons in range (i,j). Choose last balloon to burst in range."
    },
    "hints": [
      "If you think about which balloon to burst first, the subproblems aren't independent.",
      "Instead, think about which balloon to burst LAST in a range.",
      "If balloon k is last in range (i,j), coins = result[i][k] + result[k][j] + nums[i]*nums[k]*nums[j]."
    ],
    "solution": {
      "approach": "DP on ranges. dp[i][j] = max coins from (i,j). Try each k as last burst. Pad array with 1s at ends.",
      "timeComplexity": "O(n^3)",
      "spaceComplexity": "O(n^2)",
      "keyInsight": "Choosing last balloon (not first) makes subproblems independent. Boundaries are fixed."
    }
  },
  "322": {
    "title": "Coin Change",
    "slug": "coin-change",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "1-D Dynamic Programming",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [
      "BFS"
    ],
    "patternExplanations": {
      "Dynamic Programming": "dp[amount] = min coins to make that amount. For each coin c: dp[a] = min(dp[a], dp[a-c] + 1).",
      "BFS": "BFS from 0, each edge adds one coin. First time reaching target amount = min coins."
    },
    "hints": [
      "To make amount a, you can use any coin c where c <= a. Then you need to make amount a-c.",
      "Min coins for a = minimum of (min coins for a-c plus 1) for all coins c.",
      "Build up from amount 0. Base case: 0 coins needed for amount 0. For each amount, try each coin."
    ],
    "solution": {
      "approach": "dp[0] = 0, dp[i] = infinity initially. For i from 1 to amount, for each coin: dp[i] = min(dp[i], dp[i-coin]+1).",
      "timeComplexity": "O(amount * coins)",
      "spaceComplexity": "O(amount)",
      "keyInsight": "Unbounded knapsack variant - can use each coin unlimited times."
    }
  },
  "323": {
    "title": "Number of Connected Components in an Undirected Graph",
    "slug": "number-of-connected-components-in-an-undirected-graph",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Graphs",
    "primaryPattern": "Union Find",
    "acceptablePatterns": [
      "DFS",
      "BFS"
    ],
    "patternExplanations": {
      "Union Find": "Initially n components. Each edge potentially merges two. Final count = components.",
      "DFS": "DFS from each unvisited node. Count how many DFS traversals needed."
    },
    "hints": [
      "Count distinct connected components.",
      "Start with n components. Each edge merges two (if they're different).",
      "Count components by counting unique roots (or track component count as you merge)."
    ],
    "solution": {
      "approach": "Union-Find: start with n components. For each edge, union. If roots different, decrement count. Return final count.",
      "timeComplexity": "O(E α(n))",
      "spaceComplexity": "O(n)",
      "keyInsight": "Each successful union reduces component count by 1."
    }
  },
  "328": {
    "title": "Odd Even Linked List",
    "slug": "odd-even-linked-list",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Linked List",
    "primaryPattern": "Linked List",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Linked List": "Build two separate lists: odd-indexed and even-indexed. Connect odd list tail to even list head."
    },
    "hints": [
      "Group nodes by index parity: all odd indices first, then all even indices.",
      "Maintain two lists: odd and even. Iterate, adding nodes to appropriate list.",
      "At end, connect oddTail.next = evenHead."
    ],
    "solution": {
      "approach": "oddHead = head, evenHead = head.next. Build odd and even chains. Connect odd.next = evenHead.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Separate into two chains, then join. Careful with pointer manipulation."
    }
  },
  "329": {
    "title": "Longest Increasing Path in a Matrix",
    "slug": "longest-increasing-path-in-a-matrix",
    "difficulty": "hard",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "Dynamic Programming"
    ],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Dynamic Programming",
    "patternExplanations": {
      "DFS": "DFS with memoization. For each cell, compute longest path starting there by checking neighbors.",
      "Dynamic Programming": "Topological order by value. Process smaller values first. dp[i][j] = 1 + max(neighbors)."
    },
    "hints": [
      "From each cell, you can move to adjacent cells with larger values.",
      "Explore from each cell to find longest path. But this has overlapping subproblems.",
      "Cache results! Once you compute longest path from a cell, store it."
    ],
    "solution": {
      "approach": "DFS with memoization. For each cell, recursively find max of 1 + dfs(neighbor) for valid neighbors.",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(m * n)",
      "keyInsight": "Strictly increasing means no cycles, so memoization works perfectly."
    }
  },
  "332": {
    "title": "Reconstruct Itinerary",
    "slug": "reconstruct-itinerary",
    "difficulty": "hard",
    "primaryPattern": "DFS",
    "acceptablePatterns": [],
    "explanation": "Depth-first search - explore as deep as possible before backtracking. Use recursion or stack for implementation.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Graphs",
    "patternExplanations": {
      "DFS": "Hierholzer's algorithm: DFS through edges, add to result in post-order. Reverse at end."
    },
    "hints": [
      "This is finding an Eulerian path - visit every edge exactly once.",
      "Sort destinations lexicographically. Explore edges systematically.",
      "Add airport to result AFTER exploring all its edges (post-order). Reverse at end."
    ],
    "solution": {
      "approach": "Build graph with sorted adjacency lists. DFS greedily, add to result after all edges used. Reverse result.",
      "timeComplexity": "O(E log E) for sorting",
      "spaceComplexity": "O(E)",
      "keyInsight": "Post-order DFS naturally builds Eulerian path in reverse. Sorting gives lexicographic result."
    }
  },
  "334": {
    "title": "Increasing Triplet Subsequence",
    "slug": "increasing-triplet-subsequence",
    "difficulty": "medium",
    "primaryPattern": "Greedy",
    "acceptablePatterns": [],
    "explanation": "Make locally optimal choice at each step. Works when local optimum leads to global optimum.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Greedy",
    "patternExplanations": {
      "Greedy": "Track smallest and second smallest seen. If current > both, triplet exists."
    },
    "hints": [
      "You need i < j < k with nums[i] < nums[j] < nums[k].",
      "Track the smallest element seen. Track smallest element that has a smaller element before it.",
      "If you find an element larger than both, you found the triplet."
    ],
    "solution": {
      "approach": "Track first (smallest) and second (smallest with smaller before it). Return true if any num > second.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Greedy update first and second. Second implicitly has a smaller element before it."
    }
  },
  "338": {
    "title": "Counting Bits",
    "slug": "counting-bits",
    "difficulty": "easy",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "Bit Manipulation",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [
      "Bit Manipulation"
    ],
    "patternExplanations": {
      "Dynamic Programming": "dp[i] = dp[i >> 1] + (i & 1). Number of 1s in i = 1s in i/2 plus the last bit.",
      "Bit Manipulation": "Or dp[i] = dp[i & (i-1)] + 1. Removing lowest 1-bit gives a smaller number."
    },
    "hints": [
      "Count 1-bits for every number from 0 to n.",
      "Can you use previous answers? How does count for i relate to count for i/2?",
      "i and i>>1 differ only in the last bit. Count for i = count for i>>1 plus (i&1)."
    ],
    "solution": {
      "approach": "dp[0] = 0. For i from 1 to n: dp[i] = dp[i >> 1] + (i & 1).",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Right shift relationship lets you build on previous answers."
    }
  },
  "345": {
    "title": "Reverse Vowels of a String",
    "slug": "reverse-vowels-of-a-string",
    "difficulty": "easy",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [],
    "explanation": "Two pointers technique - use multiple indices to traverse the data structure efficiently, often from opposite ends or at different speeds.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Two Pointers",
    "patternExplanations": {
      "Two Pointers": "Two pointers from ends. Move inward, swapping when both point to vowels."
    },
    "hints": [
      "Only swap vowels, leave consonants in place.",
      "Use two indices from start and end.",
      "Move indices inward. When both point to vowels, swap them."
    ],
    "solution": {
      "approach": "Two pointers. Skip non-vowels. When both at vowels, swap and move both inward.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n) for string manipulation",
      "keyInsight": "Classic two-pointer swap pattern, with condition (vowel check) before swapping."
    }
  },
  "347": {
    "title": "Top K Frequent Elements",
    "slug": "top-k-frequent-elements",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Arrays & Hashing",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [
      "Heap/Priority Queue",
      "Bucket Sort"
    ],
    "patternExplanations": {
      "Hash Map": "Count frequencies, then use bucket sort where index = frequency. Scan buckets from highest to lowest. O(n) time.",
      "Heap/Priority Queue": "Count frequencies, then use a min-heap of size k to track top k elements. O(n log k) time.",
      "Bucket Sort": "Create buckets where bucket[i] contains elements with frequency i. Max frequency is n, so O(n) buckets."
    },
    "hints": [
      "First step: how do you count how often each number appears?",
      "Now you have frequencies - how do you find the k highest?",
      "A priority structure gives top k in O(n log k), but bucket sort can do O(n). What's the max possible frequency?"
    ],
    "solution": {
      "approach": "Count frequencies with hash map, then bucket sort by frequency (index = frequency count).",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Frequency is bounded by n, so bucket sort achieves linear time."
    }
  },
  "355": {
    "title": "Design Twitter",
    "slug": "design-twitter",
    "difficulty": "medium",
    "primaryPattern": "Heap",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Heap / Priority Queue",
    "patternExplanations": {
      "Heap": "Merge k sorted lists (user timelines). Use heap to get 10 most recent across all followed users.",
      "Hash Map": "Track followers and tweets per user. Merge timelines using heap or sorting."
    },
    "hints": [
      "Each user has a timeline (list of tweets). News feed merges followed users' timelines.",
      "This is like 'Merge K Sorted Lists' - each user's tweets are sorted by time.",
      "Use a structure that gives you the most recent efficiently. Process latest from each followed user."
    ],
    "solution": {
      "approach": "HashMap for user->followers and user->tweets. getNewsFeed: heap merge of followed users' tweets.",
      "timeComplexity": "O(k log k) for news feed, O(1) for others",
      "spaceComplexity": "O(users + tweets)",
      "keyInsight": "News feed is merging sorted lists. Use heap to efficiently get top k from multiple lists."
    }
  },
  "371": {
    "title": "Sum of Two Integers",
    "slug": "sum-of-two-integers",
    "difficulty": "medium",
    "primaryPattern": "Bit Manipulation",
    "acceptablePatterns": [],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Bit Manipulation",
    "patternExplanations": {
      "Bit Manipulation": "XOR gives sum without carry. AND + left shift gives carry. Repeat until no carry."
    },
    "hints": [
      "How does addition work in binary? Sum bit and carry bit.",
      "XOR (a ^ b) gives the sum without carry. AND (a & b) gives positions that need carry.",
      "Carry needs to be shifted left. Repeat: sum = a ^ b, carry = (a & b) << 1, until carry is 0."
    ],
    "solution": {
      "approach": "Loop: sum = a XOR b, carry = (a AND b) << 1. Set a = sum, b = carry. Stop when b = 0.",
      "timeComplexity": "O(1) - bounded by bit width",
      "spaceComplexity": "O(1)",
      "keyInsight": "Addition = sum without carry + carry propagation. Iterate until no more carries."
    }
  },
  "374": {
    "title": "Guess Number Higher or Lower",
    "slug": "guess-number-higher-or-lower",
    "difficulty": "easy",
    "primaryPattern": "Binary Search",
    "acceptablePatterns": [],
    "explanation": "Divide and conquer on sorted data. Repeatedly halve the search space by comparing with middle element.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Binary Search",
    "patternExplanations": {
      "Binary Search": "Classic binary search. Call guess(mid) to determine which half to search."
    },
    "hints": [
      "You're finding a number from 1 to n. Eliminate half the possibilities with each guess.",
      "guess(num) returns -1 (too high), 1 (too low), or 0 (correct).",
      "If guess(mid) < 0, search lower half. If > 0, search upper half."
    ],
    "solution": {
      "approach": "Binary search [1, n]. Check guess(mid). Adjust search range accordingly.",
      "timeComplexity": "O(log n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Pure binary search with API-provided comparison function."
    }
  },
  "392": {
    "title": "Is Subsequence",
    "slug": "is-subsequence",
    "difficulty": "easy",
    "lists": [
      "leetcode-75"
    ],
    "category": "Two Pointers",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Two Pointers": "One pointer on s, one on t. When characters match, advance s pointer. Always advance t pointer. s is subsequence if s pointer reaches end."
    },
    "hints": [
      "Is s a subsequence of t? Characters of s must appear in t in order (not necessarily consecutive).",
      "Scan through t. Whenever you match the current character of s, move to next character of s.",
      "If you match all characters of s before t ends, it's a subsequence."
    ],
    "solution": {
      "approach": "i = 0 (for s). For each char in t: if char == s[i], i++. Return i == len(s).",
      "timeComplexity": "O(n) where n = len(t)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Greedy matching: match s characters as early as possible in t."
    }
  },
  "394": {
    "title": "Decode String",
    "slug": "decode-string",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Stack",
    "primaryPattern": "Stack",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Stack": "Push current string and count on '['. On ']', pop and repeat current string count times, append to previous string."
    },
    "hints": [
      "3[a2[c]] = accaccacc. Handle nested brackets.",
      "A LIFO structure handles nesting. On '[', save current state and start fresh. On ']', restore and combine.",
      "Save (currentString, repeatCount) on '['. Restore on ']' and build result."
    ],
    "solution": {
      "approach": "Stack of (string, count). On '[': push current, reset. On ']': pop, repeat current string, append to popped string.",
      "timeComplexity": "O(n * maxRepeat)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Stack saves context for nested structures. Each ']' closes the innermost pending '['."
    }
  },
  "399": {
    "title": "Evaluate Division",
    "slug": "evaluate-division",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Graphs - DFS",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "BFS",
      "Union Find"
    ],
    "patternExplanations": {
      "DFS": "Build graph: a/b=v means edge a->b with weight v and b->a with weight 1/v. Query = find path and multiply weights.",
      "BFS": "Same path finding with BFS.",
      "Union Find": "Union with weights, track ratios to root."
    },
    "hints": [
      "a/b = 2 means path from a to b with value 2. c/d query = find path a to c, multiply edge weights.",
      "Build weighted directed graph. a/b = v creates a->b (weight v) and b->a (weight 1/v).",
      "Explore from query source to target, multiplying edge weights along path."
    ],
    "solution": {
      "approach": "Build bidirectional weighted graph. For each query, DFS/BFS from source to target, multiply weights.",
      "timeComplexity": "O(q * (v + e))",
      "spaceComplexity": "O(v + e)",
      "keyInsight": "Division relationships form a weighted graph where path product gives answer."
    }
  },
  "416": {
    "title": "Partition Equal Subset Sum",
    "slug": "partition-equal-subset-sum",
    "difficulty": "medium",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Dynamic Programming",
    "patternExplanations": {
      "Dynamic Programming": "0/1 knapsack. dp[j] = can we make sum j? Target is totalSum/2."
    },
    "hints": [
      "If we can find a subset with sum = totalSum/2, the other subset also sums to totalSum/2.",
      "This is the subset sum problem: can we select elements summing to target?",
      "Track which sums are achievable. For each num, each previously achievable sum j can now reach j+num (iterate backwards)."
    ],
    "solution": {
      "approach": "If sum is odd, return false. Target = sum/2. dp[j] = can reach sum j. For each num, update dp backwards.",
      "timeComplexity": "O(n * sum)",
      "spaceComplexity": "O(sum)",
      "keyInsight": "Partition = find subset with sum = total/2. Classic subset sum DP."
    }
  },
  "417": {
    "title": "Pacific Atlantic Water Flow",
    "slug": "pacific-atlantic-water-flow",
    "difficulty": "medium",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "BFS"
    ],
    "explanation": "Depth-first search - explore as deep as possible before backtracking. Use recursion or stack for implementation.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Graphs",
    "patternExplanations": {
      "DFS": "DFS from Pacific border and Atlantic border separately. Find cells reachable from both.",
      "BFS": "BFS from ocean borders. Water flows uphill in reverse - visit higher or equal neighbors."
    },
    "hints": [
      "Instead of checking where water can flow from each cell, think in reverse.",
      "From which cells can water reach the Pacific? Atlantic?",
      "Explore from ocean borders going 'uphill'. Find intersection of cells reachable from both."
    ],
    "solution": {
      "approach": "DFS from Pacific border cells, mark reachable. DFS from Atlantic, mark reachable. Return intersection.",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(m * n)",
      "keyInsight": "Reverse the flow: start from oceans, go uphill. Intersection reaches both."
    }
  },
  "424": {
    "title": "Longest Repeating Character Replacement",
    "slug": "longest-repeating-character-replacement",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Sliding Window",
    "primaryPattern": "Sliding Window",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Sliding Window": "Window is valid if (window length - most frequent char count) <= k. Expand right, shrink left if invalid."
    },
    "hints": [
      "In any window, you want to keep the most frequent character and replace the rest.",
      "If window has length L and most frequent char appears M times, you need L-M replacements.",
      "Window is valid if L - M <= k. Expand right, track char counts, shrink left if invalid."
    ],
    "solution": {
      "approach": "Sliding window. Track char frequencies in window. Valid if windowLen - maxFreq <= k.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1) - only 26 letters",
      "keyInsight": "Replacements needed = window size - count of most frequent character in window."
    }
  },
  "435": {
    "title": "Non-overlapping Intervals",
    "slug": "non-overlapping-intervals",
    "difficulty": "medium",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "Intervals",
    "primaryPattern": "Greedy",
    "acceptablePatterns": [
      "Sorting"
    ],
    "patternExplanations": {
      "Greedy": "Sort by end time. Greedily keep intervals that don't overlap with last kept. This maximizes kept intervals.",
      "Sorting": "Equivalent: sort by end, count intervals that fit. Remove = total - kept."
    },
    "hints": [
      "Minimum removals = total - maximum non-overlapping intervals you can keep.",
      "Which intervals should you prefer to keep? Ones that end early leave more room.",
      "Sort by end time. Keep interval if it starts after previous kept interval ends."
    ],
    "solution": {
      "approach": "Sort by end time. Track end of last kept interval. If current starts >= end, keep it and update end.",
      "timeComplexity": "O(n log n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Greedy by earliest end time maximizes the number of non-overlapping intervals."
    }
  },
  "437": {
    "title": "Path Sum III",
    "slug": "path-sum-iii",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Binary Tree - DFS",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "Hash Map",
      "Prefix Sum"
    ],
    "patternExplanations": {
      "DFS": "Use prefix sum with hash map. Track cumulative sum. If currSum - targetSum exists in map, those are valid paths.",
      "Hash Map": "Map stores prefix sums seen on current path. currSum - target in map = path ending at current node.",
      "Prefix Sum": "Path sum from A to B = prefixSum(B) - prefixSum(A). Find where prefixSum(A) = currSum - target."
    },
    "hints": [
      "Path can start/end anywhere (but must go downward). Count all paths summing to target.",
      "Brute force: from each node, try all downward paths. O(n^2).",
      "Optimal: prefix sum + map. If currSum - target seen before, that many paths end here."
    ],
    "solution": {
      "approach": "DFS with prefix sum map. Add currSum to map going down, remove going back up (backtrack).",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Prefix sum technique adapted for trees. Map tracks sums on current root-to-node path."
    }
  },
  "443": {
    "title": "String Compression",
    "slug": "string-compression",
    "difficulty": "medium",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [],
    "explanation": "Two pointers technique - use multiple indices to traverse the data structure efficiently, often from opposite ends or at different speeds.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Two Pointers",
    "patternExplanations": {
      "Two Pointers": "Read pointer scans, write pointer builds compressed result in-place."
    },
    "hints": [
      "Count consecutive characters. Write char and count (if > 1).",
      "Use two indices: one for reading, one for writing.",
      "Be careful with multi-digit counts: '12' needs two characters."
    ],
    "solution": {
      "approach": "Read pointer counts consecutive chars. Write pointer writes char + count. Handle multi-digit counts.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "In-place with read/write pointers. Write is always behind or at read, so no overwrite issues."
    }
  },
  "450": {
    "title": "Delete Node in a BST",
    "slug": "delete-node-in-a-bst",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Binary Search Tree",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "Binary Search"
    ],
    "patternExplanations": {
      "DFS": "Find node, then handle 3 cases: no children (remove), one child (replace with child), two children (replace with successor).",
      "Binary Search": "BST search to find node, then restructure."
    },
    "hints": [
      "First, find the node to delete using BST property.",
      "If leaf, just remove. If one child, replace with child. If two children?",
      "Two children: find inorder successor (smallest in right subtree), swap values, delete successor."
    ],
    "solution": {
      "approach": "Find node. If two children: find successor, copy value, recursively delete successor. Else: return non-null child.",
      "timeComplexity": "O(h)",
      "spaceComplexity": "O(h)",
      "keyInsight": "Two-child case: inorder successor has at most one child, making it easier to delete."
    }
  },
  "452": {
    "title": "Minimum Number of Arrows to Burst Balloons",
    "slug": "minimum-number-of-arrows-to-burst-balloons",
    "difficulty": "medium",
    "primaryPattern": "Greedy",
    "acceptablePatterns": [],
    "explanation": "Make locally optimal choice at each step. Works when local optimum leads to global optimum.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Intervals",
    "patternExplanations": {
      "Greedy": "Sort by end point. Shoot at first end. Skip balloons hit by this shot."
    },
    "hints": [
      "Each arrow bursts all overlapping balloons at that x-coordinate.",
      "Sort by end position. Shoot at the end of the first balloon.",
      "This shot hits all balloons starting before this end. Move to next unhit balloon."
    ],
    "solution": {
      "approach": "Sort by end. Shoot at first balloon's end. Skip all overlapping. Repeat for remaining.",
      "timeComplexity": "O(n log n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Greedy: shoot as late as possible (at end) to hit maximum overlapping balloons."
    }
  },
  "494": {
    "title": "Target Sum",
    "slug": "target-sum",
    "difficulty": "medium",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Dynamic Programming",
    "patternExplanations": {
      "Dynamic Programming": "dp[sum] = ways to reach sum. For each num, can add or subtract it."
    },
    "hints": [
      "Each number can be + or -. We want ways to reach target sum.",
      "Let P = positive numbers sum, N = negative. P - N = target, P + N = total. So P = (target + total)/2.",
      "Convert to: find subsets summing to (target + total)/2. That's subset sum count."
    ],
    "solution": {
      "approach": "Reframe: count subsets summing to (target + total)/2. dp[j] = ways to reach sum j.",
      "timeComplexity": "O(n * sum)",
      "spaceComplexity": "O(sum)",
      "keyInsight": "Transform to subset sum by algebra: positive subset sum = (target + total) / 2."
    }
  },
  "518": {
    "title": "Coin Change II",
    "slug": "coin-change-ii",
    "difficulty": "medium",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Dynamic Programming",
    "patternExplanations": {
      "Dynamic Programming": "dp[j] = ways to make amount j. For each coin, dp[j] += dp[j-coin]. Process coins outer loop."
    },
    "hints": [
      "Unlike Coin Change I (min coins), count combinations (not permutations).",
      "To avoid counting [1,2] and [2,1] as different, process coins in outer loop.",
      "Ways to make j: for each coin (outer), for each amount (inner), ways[j] += ways[j-coin]."
    ],
    "solution": {
      "approach": "dp[j] = ways to make j. Outer loop on coins, inner on amounts. dp[j] += dp[j-coin].",
      "timeComplexity": "O(amount * coins)",
      "spaceComplexity": "O(amount)",
      "keyInsight": "Coin-first loop prevents counting permutations. Each combination counted once."
    }
  },
  "543": {
    "title": "Diameter of Binary Tree",
    "slug": "diameter-of-binary-tree",
    "difficulty": "easy",
    "primaryPattern": "DFS",
    "acceptablePatterns": [],
    "explanation": "Depth-first search - explore as deep as possible before backtracking. Use recursion or stack for implementation.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Trees",
    "patternExplanations": {
      "DFS": "For each node, diameter through it = left height + right height. Track global max."
    },
    "hints": [
      "Diameter is longest path between any two nodes. It may or may not pass through root.",
      "At each node, longest path through it = left depth + right depth.",
      "Traverse to compute depth. At each node, update max diameter. Return depth for parent."
    ],
    "solution": {
      "approach": "DFS returns depth. At each node, update global max with leftDepth + rightDepth. Return max(left, right) + 1.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(h)",
      "keyInsight": "Compute depth, but track diameter as a side effect. Diameter through node = sum of child depths."
    }
  },
  "547": {
    "title": "Number of Provinces",
    "slug": "number-of-provinces",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Graphs - DFS",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "BFS",
      "Union Find"
    ],
    "patternExplanations": {
      "DFS": "Count connected components. For each unvisited city, DFS to mark all connected cities. Count = number of DFS starts.",
      "BFS": "Same component counting with BFS instead.",
      "Union Find": "Union directly connected cities. Count unique roots."
    },
    "hints": [
      "Province = connected component. Count separate groups of connected cities.",
      "Adjacency matrix given. Traverse and count connected components.",
      "For each unvisited city, explore to mark its component. Count how many explorations you start."
    ],
    "solution": {
      "approach": "For each city 0 to n-1: if not visited, DFS to mark component, increment count.",
      "timeComplexity": "O(n^2)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Classic connected components problem - count DFS/BFS initiations."
    }
  },
  "567": {
    "title": "Permutation in String",
    "slug": "permutation-in-string",
    "difficulty": "medium",
    "primaryPattern": "Sliding Window",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Sliding Window",
    "patternExplanations": {
      "Sliding Window": "Fixed window of s1's length. Slide through s2, checking if window has same char counts as s1.",
      "Hash Map": "Use frequency maps. Maintain window counts, check if matches s1's counts."
    },
    "hints": [
      "A permutation has the same characters with same frequencies.",
      "Use a fixed-size window of len(s1). Check if window's char counts match s1's.",
      "Optimize: track how many chars have matching counts. Window is valid when all 26 match."
    ],
    "solution": {
      "approach": "Count s1 chars. Slide window of same size over s2. Add right char, remove left char. Check if counts match.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1) - fixed 26 chars",
      "keyInsight": "Fixed-size sliding window. Only need to check character frequencies match."
    }
  },
  "572": {
    "title": "Subtree of Another Tree",
    "slug": "subtree-of-another-tree",
    "difficulty": "easy",
    "lists": [
      "neetcode-150"
    ],
    "category": "Trees",
    "primaryPattern": "DFS",
    "acceptablePatterns": [],
    "patternExplanations": {
      "DFS": "For each node in main tree, check if subtree rooted there equals the target tree. Uses isSameTree as helper."
    },
    "hints": [
      "A subtree match means: some node in the main tree is the root of a tree identical to subRoot.",
      "For each node in main tree, check: is the tree rooted here identical to subRoot?",
      "Reuse 'same tree' logic. Check current node, or recurse to check left and right subtrees."
    ],
    "solution": {
      "approach": "isSubtree(root, sub) = isSameTree(root, sub) OR isSubtree(root.left, sub) OR isSubtree(root.right, sub).",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(h)",
      "keyInsight": "Subtree check = check every node as potential match using same-tree comparison."
    }
  },
  "605": {
    "title": "Can Place Flowers",
    "slug": "can-place-flowers",
    "difficulty": "easy",
    "primaryPattern": "Greedy",
    "acceptablePatterns": [],
    "explanation": "Make locally optimal choice at each step. Works when local optimum leads to global optimum.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Greedy",
    "patternExplanations": {
      "Greedy": "Place flowers greedily at every valid position (both neighbors are 0)."
    },
    "hints": [
      "A flower can be planted if current and both neighbors are 0.",
      "Greedily plant whenever possible. This doesn't block future plantings.",
      "Handle edges: treat out-of-bounds as 0."
    ],
    "solution": {
      "approach": "Iterate through flowerbed. If current and neighbors are 0, plant (set to 1). Count plantings.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Greedy works: planting ASAP doesn't prevent future valid plantings."
    }
  },
  "621": {
    "title": "Task Scheduler",
    "slug": "task-scheduler",
    "difficulty": "medium",
    "lists": [
      "neetcode-150"
    ],
    "category": "Heap / Priority Queue",
    "primaryPattern": "Heap/Priority Queue",
    "acceptablePatterns": [
      "Greedy"
    ],
    "patternExplanations": {
      "Heap/Priority Queue": "Max heap of task counts. Each cycle, pick n+1 most frequent tasks (or idle). Update counts, repeat.",
      "Greedy": "Math approach: idle slots = (maxFreq - 1) * n. Fill idle slots with other tasks. Total = tasks + remaining idles."
    },
    "hints": [
      "Same task must have at least n intervals between executions.",
      "Always do the task with highest remaining count (minimizes idle time).",
      "Or think mathematically: how many idle slots does the most frequent task create?"
    ],
    "solution": {
      "approach": "Max heap simulation or math: idle_slots = (max_count - 1) * n - (sum of other counts). Time = max(len(tasks), calculated).",
      "timeComplexity": "O(n) for math, O(time * log 26) for heap",
      "spaceComplexity": "O(1)",
      "keyInsight": "The most frequent task determines the minimum time. Other tasks fill in the gaps."
    }
  },
  "643": {
    "title": "Maximum Average Subarray I",
    "slug": "maximum-average-subarray-i",
    "difficulty": "easy",
    "lists": [
      "leetcode-75"
    ],
    "category": "Sliding Window",
    "primaryPattern": "Sliding Window",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Sliding Window": "Fixed-size window of k elements. Slide by adding next element and removing first. Track max sum, divide by k at end."
    },
    "hints": [
      "Find contiguous subarray of length k with maximum average.",
      "Compute initial sum of first k elements. Then slide: add next, remove first.",
      "Track max sum. Average = max sum / k."
    ],
    "solution": {
      "approach": "Compute sum of first k. For each i from k to n: sum += nums[i] - nums[i-k]. Track maxSum. Return maxSum/k.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Fixed window size = sliding window with constant add/remove."
    }
  },
  "647": {
    "title": "Palindromic Substrings",
    "slug": "palindromic-substrings",
    "difficulty": "medium",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Dynamic Programming"
    ],
    "explanation": "Two pointers technique - use multiple indices to traverse the data structure efficiently, often from opposite ends or at different speeds.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Dynamic Programming",
    "patternExplanations": {
      "Two Pointers": "Expand around each center (both odd and even). Count all palindromes found.",
      "Dynamic Programming": "dp[i][j] = true if s[i..j] is palindrome. Count all true entries."
    },
    "hints": [
      "Similar to Longest Palindromic Substring, but count all, not just longest.",
      "Expand around center approach: for each center, count palindromes as you expand.",
      "Each position has potential centers for odd-length and even-length palindromes."
    ],
    "solution": {
      "approach": "For each index, expand around center for both odd and even length. Count each valid expansion.",
      "timeComplexity": "O(n^2)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Each expansion step that succeeds (chars match) is another palindrome."
    }
  },
  "649": {
    "title": "Dota2 Senate",
    "slug": "dota2-senate",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Queue",
    "primaryPattern": "Queue",
    "acceptablePatterns": [
      "Greedy"
    ],
    "patternExplanations": {
      "Queue": "Two queues for R and D indices. Each round, smaller index bans larger. Winner rejoins at end with offset.",
      "Greedy": "Each senator bans the next opponent. Simulate with queues."
    },
    "hints": [
      "Each senator can ban one opponent. Optimal: ban the next opponent to vote.",
      "Use two FIFO structures: one for R indices, one for D indices.",
      "Compare fronts. Smaller index wins, bans other. Winner rejoins at position + n."
    ],
    "solution": {
      "approach": "Queues of indices for R and D. While both non-empty: smaller index wins, add winner to back with +n offset.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Greedy banning + queue simulation handles circular voting."
    }
  },
  "678": {
    "title": "Valid Parenthesis String",
    "slug": "valid-parenthesis-string",
    "difficulty": "medium",
    "primaryPattern": "Greedy",
    "acceptablePatterns": [
      "Dynamic Programming"
    ],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Greedy",
    "patternExplanations": {
      "Greedy": "Track min and max possible open parens. '*' can be '(', ')', or empty. Check if 0 is achievable.",
      "Dynamic Programming": "Track all possible counts of open parens at each position."
    },
    "hints": [
      "'*' can be '(', ')', or empty. Many possibilities.",
      "Track range of possible open paren counts: [lo, hi].",
      "On '(': both increase. On ')': both decrease. On '*': lo-1 (could be ')'), hi+1 (could be '(')."
    ],
    "solution": {
      "approach": "Track lo (min open) and hi (max open). lo = max(0, lo-1) on ')' or '*'. If hi < 0, invalid. End with lo = 0.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Track range of possibilities. If range ever excludes 0, or hi goes negative, invalid."
    }
  },
  "684": {
    "title": "Redundant Connection",
    "slug": "redundant-connection",
    "difficulty": "medium",
    "primaryPattern": "Union Find",
    "acceptablePatterns": [
      "DFS"
    ],
    "explanation": "Depth-first search - explore as deep as possible before backtracking. Use recursion or stack for implementation.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Graphs",
    "patternExplanations": {
      "Union Find": "Process edges. If edge connects already-connected nodes (same component), it's redundant.",
      "DFS": "Build graph edge by edge. Check if new edge creates a cycle using DFS."
    },
    "hints": [
      "A tree has n-1 edges. One extra edge creates exactly one cycle.",
      "The redundant edge is the one that completes the cycle.",
      "Track connected components. If both nodes already in the same group, this edge is redundant."
    ],
    "solution": {
      "approach": "Union-Find: for each edge, if find(u) == find(v), return this edge (cycle). Else union them.",
      "timeComplexity": "O(n α(n)) ≈ O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Redundant edge connects two already-connected nodes. Union-Find detects this."
    }
  },
  "695": {
    "title": "Max Area of Island",
    "slug": "max-area-of-island",
    "difficulty": "medium",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "BFS"
    ],
    "explanation": "Depth-first search - explore as deep as possible before backtracking. Use recursion or stack for implementation.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Graphs",
    "patternExplanations": {
      "DFS": "DFS from each land cell, count cells in island. Track visited. Return max area.",
      "BFS": "BFS to explore each island. Count cells in each, return maximum."
    },
    "hints": [
      "Similar to Number of Islands, but track size of each island.",
      "Explore from each unvisited land cell. Count cells in that island.",
      "Track maximum area seen across all islands."
    ],
    "solution": {
      "approach": "For each unvisited 1, DFS to count island area (marking visited). Track and return max.",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(m * n)",
      "keyInsight": "Standard island traversal, but return count of cells instead of just detecting."
    }
  },
  "700": {
    "title": "Search in a Binary Search Tree",
    "slug": "search-in-a-binary-search-tree",
    "difficulty": "easy",
    "lists": [
      "leetcode-75"
    ],
    "category": "Binary Search Tree",
    "primaryPattern": "Binary Search",
    "acceptablePatterns": [
      "DFS"
    ],
    "patternExplanations": {
      "Binary Search": "BST property: if val < node.val, go left. If val > node.val, go right. If equal, found.",
      "DFS": "Recursive search using BST property to choose direction."
    },
    "hints": [
      "BST: left subtree has smaller values, right subtree has larger values.",
      "Compare target with current node. Go left if smaller, right if larger.",
      "Return the node when found, or null if you reach a leaf without finding."
    ],
    "solution": {
      "approach": "If null or found, return node. If val < node.val, recurse left. Else recurse right.",
      "timeComplexity": "O(h)",
      "spaceComplexity": "O(h) or O(1) iterative",
      "keyInsight": "BST property eliminates half the tree at each step."
    }
  },
  "703": {
    "title": "Kth Largest Element in a Stream",
    "slug": "kth-largest-element-in-a-stream",
    "difficulty": "easy",
    "primaryPattern": "Heap",
    "acceptablePatterns": [],
    "explanation": "Maintain ordered access to min/max elements. Useful for k-largest/smallest, merging, or scheduling problems.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Heap / Priority Queue",
    "patternExplanations": {
      "Heap": "Min-heap of size k. Heap top is kth largest. On add: push, pop if size > k."
    },
    "hints": [
      "Kth largest in a stream. Elements keep coming, need kth largest at any time.",
      "Keep only the k largest elements. The smallest of them is the kth largest.",
      "Use a structure that efficiently gives the minimum element, kept to size k. When adding, insert then remove smallest if size > k."
    ],
    "solution": {
      "approach": "Min-heap of size k. Initialize with first elements. add(): push val, pop if size > k, return top.",
      "timeComplexity": "O(log k) per add",
      "spaceComplexity": "O(k)",
      "keyInsight": "Min-heap of k elements: top is kth largest because k-1 elements are larger (below it in heap logic)."
    }
  },
  "704": {
    "title": "Binary Search",
    "slug": "binary-search",
    "difficulty": "easy",
    "lists": [
      "neetcode-150"
    ],
    "category": "Binary Search",
    "primaryPattern": "Binary Search",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Binary Search": "Compare target with middle element. If equal, found. If target smaller, search left half. If larger, search right half."
    },
    "hints": [
      "The array is sorted. How can you eliminate half the elements with one comparison?",
      "Look at the middle element. Does it tell you which half to search?",
      "left = 0, right = n-1. mid = (left + right) / 2. Adjust bounds based on comparison."
    ],
    "solution": {
      "approach": "Standard binary search: compute mid, compare with target, adjust left/right bounds.",
      "timeComplexity": "O(log n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Each comparison halves the search space."
    }
  },
  "714": {
    "title": "Best Time to Buy and Sell Stock with Transaction Fee",
    "slug": "best-time-to-buy-and-sell-stock-with-transaction-fee",
    "difficulty": "medium",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Dynamic Programming",
    "patternExplanations": {
      "Dynamic Programming": "Track cash (not holding) and hold (holding stock). Fee paid on sell."
    },
    "hints": [
      "Similar to buy/sell stock II, but subtract fee on each transaction.",
      "Two states: holding stock or not. Track max profit in each state.",
      "cash = max(cash, hold + price - fee). hold = max(hold, cash - price)."
    ],
    "solution": {
      "approach": "cash = max(cash, hold + price - fee), hold = max(hold, cash - price). Return cash at end.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Same as unlimited transactions, just subtract fee when selling."
    }
  },
  "724": {
    "title": "Find Pivot Index",
    "slug": "find-pivot-index",
    "difficulty": "easy",
    "lists": [
      "leetcode-75"
    ],
    "category": "Prefix Sum",
    "primaryPattern": "Prefix Sum",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Prefix Sum": "Pivot has equal left and right sums. Total - leftSum - nums[i] = rightSum. At pivot: leftSum = rightSum."
    },
    "hints": [
      "Pivot index has equal sum on both sides (excluding itself).",
      "leftSum + nums[pivot] + rightSum = total. At pivot: leftSum = rightSum.",
      "rightSum = total - leftSum - nums[i]. Check if leftSum == rightSum."
    ],
    "solution": {
      "approach": "Compute total sum. Track leftSum. At each i, if leftSum == total - leftSum - nums[i], return i.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Right sum can be derived from total and left sum without computing it separately."
    }
  },
  "735": {
    "title": "Asteroid Collision",
    "slug": "asteroid-collision",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Stack",
    "primaryPattern": "Stack",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Stack": "Push asteroids. Collision happens when stack top is positive and current is negative. Resolve collisions: larger survives, equal both explode."
    },
    "hints": [
      "Positive = moving right, negative = moving left. Collision if right-moving meets left-moving.",
      "LIFO structure keeps asteroids not yet destroyed. Collision: current negative, last added positive.",
      "While collision possible: compare sizes. Smaller explodes. Equal = both explode."
    ],
    "solution": {
      "approach": "Stack. For each asteroid: while collision (top > 0, curr < 0), compare sizes. Push if curr survives.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Stack resolves collisions in order, letting larger asteroids 'crush' smaller ones."
    }
  },
  "739": {
    "title": "Daily Temperatures",
    "slug": "daily-temperatures",
    "difficulty": "medium",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "Stack",
    "primaryPattern": "Stack",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Stack": "Monotonic decreasing stack of indices. When current temp > stack top, pop and record the difference in days. Stack stores days waiting for warmer weather."
    },
    "hints": [
      "For each day, you want the next day that's warmer. This is 'next greater element'.",
      "Process right to left and maintain candidates? Or left to right resolving when you find greater?",
      "Left to right: track indices of days waiting for warmer day. When you find a warmer day, resolve all waiting days that are cooler."
    ],
    "solution": {
      "approach": "Monotonic decreasing stack. Push indices. When temp[i] > temp[stack.top], pop and set result[popped] = i - popped.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Monotonic stack efficiently finds 'next greater element' for all positions."
    }
  },
  "743": {
    "title": "Network Delay Time",
    "slug": "network-delay-time",
    "difficulty": "medium",
    "primaryPattern": "BFS",
    "acceptablePatterns": [
      "DFS"
    ],
    "explanation": "Depth-first search - explore as deep as possible before backtracking. Use recursion or stack for implementation.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Graphs",
    "patternExplanations": {
      "BFS": "Dijkstra's algorithm: find shortest paths from source to all nodes. Return max of shortest paths.",
      "DFS": "BFS/Dijkstra from source k. Track time to reach each node. Answer is max time."
    },
    "hints": [
      "Find shortest path from k to every other node. Time to reach all = max of those times.",
      "This is single-source shortest path in a weighted graph.",
      "Process nodes by shortest distance from source. Update neighbors' times. Track max time."
    ],
    "solution": {
      "approach": "Dijkstra from node k. Use min-heap (time, node). Return max time when all nodes visited, or -1 if not all reachable.",
      "timeComplexity": "O((V + E) log V)",
      "spaceComplexity": "O(V + E)",
      "keyInsight": "Dijkstra gives shortest paths from source. Max of those is time to reach all."
    }
  },
  "746": {
    "title": "Min Cost Climbing Stairs",
    "slug": "min-cost-climbing-stairs",
    "difficulty": "easy",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "Dynamic Programming",
    "patternExplanations": {
      "Dynamic Programming": "dp[i] = min cost to reach step i. Can come from i-1 or i-2."
    },
    "hints": [
      "You can start from step 0 or 1. You can climb 1 or 2 steps.",
      "At each step, min cost = cost[i] + min(cost to reach from i-1, cost to reach from i-2).",
      "Cost at step i = cost[i] + min(cost at i-1, cost at i-2). Answer is min of last two steps."
    ],
    "solution": {
      "approach": "dp[i] = cost[i] + min(dp[i-1], dp[i-2]). Return min(dp[n-1], dp[n-2]) - can reach top from either.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1) with optimization",
      "keyInsight": "Like climbing stairs, but add cost. Can reach top from last or second-to-last step."
    }
  },
  "763": {
    "title": "Partition Labels",
    "slug": "partition-labels",
    "difficulty": "medium",
    "primaryPattern": "Greedy",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Greedy",
    "patternExplanations": {
      "Greedy": "Find last occurrence of each char. Partition ends when current index = max last occurrence of chars in partition.",
      "Hash Map": "Store last index of each char. Greedy partition at points where all chars' last occurrences are covered."
    },
    "hints": [
      "Each char must appear in exactly one partition.",
      "If a char appears at index i, the partition containing i must extend to char's last occurrence.",
      "Track last occurrence of each char. Partition ends when i reaches max last occurrence of all chars so far."
    ],
    "solution": {
      "approach": "Map char to last index. Traverse: update end = max(end, lastIndex[char]). When i == end, partition ends.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1) - 26 chars",
      "keyInsight": "Partition must contain all occurrences of its chars. Greedily end when possible."
    }
  },
  "778": {
    "title": "Swim in Rising Water",
    "slug": "swim-in-rising-water",
    "difficulty": "hard",
    "primaryPattern": "Binary Search",
    "acceptablePatterns": [
      "Union Find",
      "BFS"
    ],
    "explanation": "Divide and conquer on sorted data. Repeatedly halve the search space by comparing with middle element.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Graphs",
    "patternExplanations": {
      "Binary Search": "Binary search on answer (max elevation). Check if path exists using BFS/DFS with that limit.",
      "Union Find": "Sort cells by elevation. Add cells in order. Check when (0,0) and (n-1,n-1) are connected.",
      "BFS": "Modified Dijkstra: min-heap by max elevation on path. First path to destination has minimum max elevation."
    },
    "hints": [
      "We want minimum T such that there's a path from (0,0) to (n-1,n-1) with all cells <= T.",
      "You can search on T. For each T, check if a path exists where all cells are <= T.",
      "Or: process cells by shortest max-elevation path so far. Track the minimum maximum elevation to reach each cell."
    ],
    "solution": {
      "approach": "Dijkstra variant: min-heap by max elevation on path. Return answer when reaching (n-1,n-1).",
      "timeComplexity": "O(n^2 log n)",
      "spaceComplexity": "O(n^2)",
      "keyInsight": "Modified Dijkstra: instead of summing edge weights, take max. Finds minimum-maximum path."
    }
  },
  "787": {
    "title": "Cheapest Flights Within K Stops",
    "slug": "cheapest-flights-within-k-stops",
    "difficulty": "medium",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [
      "BFS"
    ],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Graphs",
    "patternExplanations": {
      "Dynamic Programming": "Bellman-Ford: dp[i][v] = min cost to reach v with at most i edges. Run k+1 iterations.",
      "BFS": "BFS with k levels. Track min cost to each node at each number of stops."
    },
    "hints": [
      "At most k stops means at most k+1 edges.",
      "You need shortest paths with limited number of edges, not unlimited.",
      "Track min cost to each node using at most i edges. Relax all edges k+1 times."
    ],
    "solution": {
      "approach": "Bellman-Ford with k+1 iterations. dp[v] = min cost to reach v. Update by relaxing all edges.",
      "timeComplexity": "O(k * E)",
      "spaceComplexity": "O(V)",
      "keyInsight": "Bellman-Ford naturally limits edge count. k stops = k+1 edges = k+1 iterations."
    }
  },
  "790": {
    "title": "Domino and Tromino Tiling",
    "slug": "domino-and-tromino-tiling",
    "difficulty": "medium",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Dynamic Programming",
    "patternExplanations": {
      "Dynamic Programming": "Track full rows and rows missing a corner. Derive recurrence from how pieces fit."
    },
    "hints": [
      "Think about states: fully filled rows vs rows with one corner missing.",
      "Ways to fill i full columns. But you need another state for partial columns.",
      "Let f(n) = full tilings, p(n) = partial (L-shaped gap). Derive recurrence from piece placements."
    ],
    "solution": {
      "approach": "f(n) = f(n-1) + f(n-2) + 2*p(n-1). p(n) = p(n-1) + f(n-2). Base: f(0)=1, f(1)=1, p(0)=0, p(1)=1.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Two states needed: complete columns and columns with L-shaped gap."
    }
  },
  "841": {
    "title": "Keys and Rooms",
    "slug": "keys-and-rooms",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Graphs - DFS",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "BFS"
    ],
    "patternExplanations": {
      "DFS": "Start from room 0. DFS to all reachable rooms via keys. Check if all rooms visited.",
      "BFS": "BFS from room 0, exploring rooms as keys are found."
    },
    "hints": [
      "Start in room 0 (unlocked). Each room has keys to other rooms.",
      "This is graph reachability: can you visit all nodes from node 0?",
      "Explore from 0. Track visited rooms. Return visited.size == n."
    ],
    "solution": {
      "approach": "DFS from room 0. Mark visited. For each key in room, visit that room if not visited. Check if all visited.",
      "timeComplexity": "O(n + e) where e = total keys",
      "spaceComplexity": "O(n)",
      "keyInsight": "Graph traversal: rooms are nodes, keys are edges."
    }
  },
  "846": {
    "title": "Hand of Straights",
    "slug": "hand-of-straights",
    "difficulty": "medium",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [
      "Greedy"
    ],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Greedy",
    "patternExplanations": {
      "Hash Map": "Count cards. For smallest card, try to form group starting there. Decrease counts.",
      "Greedy": "Process smallest cards first. Each must start a group (or be invalid)."
    },
    "hints": [
      "Each group is consecutive numbers of size groupSize.",
      "Start with the smallest card. It must begin a group.",
      "Sort cards. For each smallest available card, try to form a group of consecutive values."
    ],
    "solution": {
      "approach": "Count cards in map. Process smallest first. For each, try to use it and next (groupSize-1) consecutive cards.",
      "timeComplexity": "O(n log n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Smallest card must start a group. Greedily form groups from smallest available."
    }
  },
  "853": {
    "title": "Car Fleet",
    "slug": "car-fleet",
    "difficulty": "medium",
    "primaryPattern": "Stack",
    "acceptablePatterns": [
      "Greedy"
    ],
    "explanation": "LIFO structure for nested patterns, matching pairs, or maintaining monotonic sequences.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Stack",
    "patternExplanations": {
      "Stack": "Sort by position. Calculate arrival times. Stack tracks fleets: cars that don't catch up form new fleets.",
      "Greedy": "Sort by position descending. Track latest arrival. Cars arriving earlier catch up (same fleet)."
    },
    "hints": [
      "Calculate time each car takes to reach target: (target - position) / speed.",
      "A car behind cannot pass. If it catches up, they become a fleet.",
      "Sort by position (descending). If car takes longer than the one ahead, it's a new fleet."
    ],
    "solution": {
      "approach": "Sort by position descending. Calculate arrival times. Count times where current > previous (new fleet).",
      "timeComplexity": "O(n log n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Cars closer to target set the pace. Cars behind either catch up (merge) or form new fleet."
    }
  },
  "872": {
    "title": "Leaf-Similar Trees",
    "slug": "leaf-similar-trees",
    "difficulty": "easy",
    "lists": [
      "leetcode-75"
    ],
    "category": "Binary Tree - DFS",
    "primaryPattern": "DFS",
    "acceptablePatterns": [],
    "patternExplanations": {
      "DFS": "DFS both trees, collect leaf values in order. Compare leaf sequences."
    },
    "hints": [
      "Leaf = node with no children. Extract leaf sequence from left to right.",
      "Traversing the tree naturally visits leaves in left-to-right order.",
      "Collect leaves from both trees, compare sequences."
    ],
    "solution": {
      "approach": "DFS to collect leaves in array. Compare arrays from both trees.",
      "timeComplexity": "O(n + m)",
      "spaceComplexity": "O(n + m)",
      "keyInsight": "DFS visits leaves in consistent order, enabling sequence comparison."
    }
  },
  "875": {
    "title": "Koko Eating Bananas",
    "slug": "koko-eating-bananas",
    "difficulty": "medium",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "Binary Search",
    "primaryPattern": "Binary Search",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Binary Search": "Binary search on the answer (eating speed k). For each k, check if all piles can be finished in h hours. Find minimum valid k."
    },
    "hints": [
      "If Koko eats at speed k, hours for pile p = ceil(p/k). Can she finish all piles in h hours?",
      "You're searching for minimum k where total hours <= h. What's the range for k?",
      "k ranges from 1 to max(piles). Search by halving: if current k works, try smaller. If not, try larger."
    ],
    "solution": {
      "approach": "Binary search on k in [1, max(piles)]. For each k, sum ceil(pile/k) for all piles. If <= h, try smaller k.",
      "timeComplexity": "O(n log m) where m = max pile",
      "spaceComplexity": "O(1)",
      "keyInsight": "Binary search on the answer space when you can verify a candidate in O(n)."
    }
  },
  "901": {
    "title": "Online Stock Span",
    "slug": "online-stock-span",
    "difficulty": "medium",
    "primaryPattern": "Stack",
    "acceptablePatterns": [],
    "explanation": "LIFO structure for nested patterns, matching pairs, or maintaining monotonic sequences.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Stack",
    "patternExplanations": {
      "Stack": "Monotonic decreasing stack of (price, span). Pop smaller, accumulate their spans."
    },
    "hints": [
      "Span = consecutive days (including today) where price was <= today's price.",
      "Think about what happens when today's price is higher than yesterday's.",
      "Use a LIFO structure of (price, span). Pop all smaller prices, accumulate their spans."
    ],
    "solution": {
      "approach": "Stack of (price, span). On next: pop all smaller, add their spans. Push (price, total span). Return span.",
      "timeComplexity": "O(1) amortized per call",
      "spaceComplexity": "O(n)",
      "keyInsight": "When we see a higher price, it 'absorbs' the spans of all smaller prices."
    }
  },
  "933": {
    "title": "Number of Recent Calls",
    "slug": "number-of-recent-calls",
    "difficulty": "easy",
    "lists": [
      "leetcode-75"
    ],
    "category": "Queue",
    "primaryPattern": "Queue",
    "acceptablePatterns": [
      "Sliding Window"
    ],
    "patternExplanations": {
      "Queue": "Queue stores timestamps of recent calls. Add new timestamp, remove timestamps older than t-3000. Return queue size.",
      "Sliding Window": "Window of valid timestamps. Slide by adding new and removing old."
    },
    "hints": [
      "Count calls in last 3000 milliseconds including current.",
      "New calls have increasing timestamps. What can you remove?",
      "FIFO structure: add new timestamp, remove from front while front < t - 3000."
    ],
    "solution": {
      "approach": "Queue of timestamps. On ping(t): add t, remove while front < t - 3000. Return queue size.",
      "timeComplexity": "O(1) amortized",
      "spaceComplexity": "O(3000) = O(1)",
      "keyInsight": "FIFO queue naturally handles time-windowed operations."
    }
  },
  "973": {
    "title": "K Closest Points to Origin",
    "slug": "k-closest-points-to-origin",
    "difficulty": "medium",
    "primaryPattern": "Heap",
    "acceptablePatterns": [
      "Quickselect"
    ],
    "explanation": "Maintain ordered access to min/max elements. Useful for k-largest/smallest, merging, or scheduling problems.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Heap / Priority Queue",
    "patternExplanations": {
      "Heap": "Max-heap of size k by distance. Keep k closest by removing farther points.",
      "Quickselect": "Quickselect to partition around kth closest. O(n) average."
    },
    "hints": [
      "Compute distance for each point. Find k smallest distances.",
      "Don't need sqrt for distance - compare squared distances.",
      "Use a structure that gives the max of k elements, so you can remove the farthest. Or partition around kth element."
    ],
    "solution": {
      "approach": "Max-heap of size k. For each point, push. If size > k, pop (removes farthest). Return heap contents.",
      "timeComplexity": "O(n log k)",
      "spaceComplexity": "O(k)",
      "keyInsight": "Max-heap of k elements naturally keeps k smallest (largest gets removed)."
    }
  },
  "981": {
    "title": "Time Based Key-Value Store",
    "slug": "time-based-key-value-store",
    "difficulty": "medium",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [
      "Binary Search"
    ],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Binary Search",
    "patternExplanations": {
      "Hash Map": "Map key to list of (timestamp, value). Binary search list for largest timestamp <= given.",
      "Binary Search": "Store (timestamp, value) pairs per key. Binary search for floor timestamp."
    },
    "hints": [
      "For each key, store all (timestamp, value) pairs.",
      "Timestamps are strictly increasing per key, so the list is sorted.",
      "Search for largest timestamp <= query timestamp in the sorted list."
    ],
    "solution": {
      "approach": "HashMap: key -> list of (timestamp, value). Get: binary search for floor timestamp in list.",
      "timeComplexity": "O(1) set, O(log n) get",
      "spaceComplexity": "O(n)",
      "keyInsight": "Sorted timestamps allow binary search. Find rightmost timestamp <= query."
    }
  },
  "994": {
    "title": "Rotting Oranges",
    "slug": "rotting-oranges",
    "difficulty": "medium",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "Graphs",
    "primaryPattern": "BFS",
    "acceptablePatterns": [],
    "patternExplanations": {
      "BFS": "Multi-source BFS from all rotten oranges simultaneously. Each BFS level = 1 minute. Track fresh oranges remaining."
    },
    "hints": [
      "All rotten oranges spread simultaneously. This is multi-source, not single-source.",
      "Explore from all rotten oranges at once. Each 'wave' of exploration is one minute.",
      "Count fresh oranges initially. Decrement as they rot. Time = number of waves. Check if all rotted."
    ],
    "solution": {
      "approach": "Add all rotten oranges to queue. BFS: for each level (minute), rot adjacent fresh oranges. Track time and fresh count.",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(m * n)",
      "keyInsight": "Multi-source BFS simulates simultaneous spreading. Level = time unit."
    }
  },
  "1004": {
    "title": "Max Consecutive Ones III",
    "slug": "max-consecutive-ones-iii",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Sliding Window",
    "primaryPattern": "Sliding Window",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Sliding Window": "Window contains at most k zeros. Expand right adding elements. When zeros > k, shrink left. Track max window size."
    },
    "hints": [
      "You can flip at most k zeros to ones. Find longest subarray of all 1s after flipping.",
      "Window is valid if it contains at most k zeros.",
      "Expand right, count zeros. When zeros > k, shrink left until zeros <= k."
    ],
    "solution": {
      "approach": "Track zeros count in window. Expand right always. When zeros > k, shrink left. Max length = right - left + 1.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Sliding window with constraint: at most k zeros allowed."
    }
  },
  "1046": {
    "title": "Last Stone Weight",
    "slug": "last-stone-weight",
    "difficulty": "easy",
    "primaryPattern": "Heap",
    "acceptablePatterns": [],
    "explanation": "Maintain ordered access to min/max elements. Useful for k-largest/smallest, merging, or scheduling problems.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Heap / Priority Queue",
    "patternExplanations": {
      "Heap": "Max-heap. Pop two largest, push difference (if nonzero). Continue until <= 1 stone."
    },
    "hints": [
      "Always smash two heaviest stones. Result is their difference (or both destroyed if equal).",
      "Need to repeatedly get two maximum values. What data structure helps?",
      "Use a structure that gives the max element efficiently. Pop two, push difference if nonzero. Stop when 0 or 1 stones left."
    ],
    "solution": {
      "approach": "Max-heap of stones. While size > 1: pop two, push |diff| if nonzero. Return last stone or 0.",
      "timeComplexity": "O(n log n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Max-heap efficiently maintains largest elements for repeated extraction."
    }
  },
  "1071": {
    "title": "Greatest Common Divisor of Strings",
    "slug": "greatest-common-divisor-of-strings",
    "difficulty": "easy",
    "primaryPattern": "Math",
    "acceptablePatterns": [],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Math",
    "patternExplanations": {
      "Math": "If GCD exists, str1 + str2 = str2 + str1. GCD length = gcd(len1, len2)."
    },
    "hints": [
      "If both strings have a common divisor, concatenating them in either order gives same result.",
      "Check if str1 + str2 == str2 + str1. If not, no common divisor.",
      "If yes, the GCD string has length gcd(len(str1), len(str2))."
    ],
    "solution": {
      "approach": "If str1 + str2 != str2 + str1, return ''. Else return str1[0:gcd(len1, len2)].",
      "timeComplexity": "O(n + m)",
      "spaceComplexity": "O(n + m)",
      "keyInsight": "Commutative concatenation implies common divisor exists. GCD of lengths gives divisor length."
    }
  },
  "1137": {
    "title": "N-th Tribonacci Number",
    "slug": "n-th-tribonacci-number",
    "difficulty": "easy",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "explanation": "Break problem into overlapping subproblems. Build solution bottom-up or top-down with memoization.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Dynamic Programming",
    "patternExplanations": {
      "Dynamic Programming": "Like Fibonacci but with 3 terms: T(n) = T(n-1) + T(n-2) + T(n-3)."
    },
    "hints": [
      "T(0) = 0, T(1) = 1, T(2) = 1. For n >= 3, T(n) = T(n-1) + T(n-2) + T(n-3).",
      "Keep track of last three values.",
      "Similar to Fibonacci, just with one more term in the recurrence."
    ],
    "solution": {
      "approach": "Iteratively compute T(n) using T(n) = T(n-1) + T(n-2) + T(n-3). Track last 3 values.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Simple DP recurrence. Only need last 3 values, so O(1) space."
    }
  },
  "1143": {
    "title": "Longest Common Subsequence",
    "slug": "longest-common-subsequence",
    "difficulty": "medium",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "2-D Dynamic Programming",
    "primaryPattern": "Dynamic Programming",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Dynamic Programming": "dp[i][j] = LCS of text1[0:i] and text2[0:j]. If chars match, dp[i][j] = dp[i-1][j-1] + 1. Else max(dp[i-1][j], dp[i][j-1])."
    },
    "hints": [
      "Subsequence doesn't need to be contiguous. What's the longest common one?",
      "Compare last characters. If they match, they're part of LCS. If not, try excluding one or the other.",
      "Match: result = 1 + result for (i-1, j-1). No match: result = max of excluding either character."
    ],
    "solution": {
      "approach": "2D DP: if text1[i] == text2[j], dp[i][j] = dp[i-1][j-1] + 1, else max(dp[i-1][j], dp[i][j-1]).",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(m * n), can be O(min(m,n))",
      "keyInsight": "Classic 2D DP: match characters or skip one string's character."
    }
  },
  "1161": {
    "title": "Maximum Level Sum of a Binary Tree",
    "slug": "maximum-level-sum-of-a-binary-tree",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Binary Tree - BFS",
    "primaryPattern": "BFS",
    "acceptablePatterns": [
      "DFS"
    ],
    "patternExplanations": {
      "BFS": "Level order traversal. For each level, sum all node values. Track level with maximum sum.",
      "DFS": "Can also use DFS with level parameter, accumulating sums per level in an array."
    },
    "hints": [
      "Find the level (1-indexed) with the largest sum.",
      "Process the tree level by level. Sum each level, track max.",
      "Return smallest level number if there are ties."
    ],
    "solution": {
      "approach": "BFS: for each level, sum values. Track maxSum and corresponding level. Return level.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(w) where w is max width",
      "keyInsight": "BFS naturally groups nodes by level for sum calculation."
    }
  },
  "1207": {
    "title": "Unique Number of Occurrences",
    "slug": "unique-number-of-occurrences",
    "difficulty": "easy",
    "lists": [
      "leetcode-75"
    ],
    "category": "Hash Map / Set",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Hash Map": "Count occurrences with map. Check if all counts are unique using a set."
    },
    "hints": [
      "Count how often each number appears.",
      "Are all the occurrence counts unique?",
      "Put counts in a set. If set size == map size, all counts are unique."
    ],
    "solution": {
      "approach": "Count frequencies with map. Put counts in a set. Return counts.size == set.size.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Map for counting, set for uniqueness check."
    }
  },
  "1268": {
    "title": "Search Suggestions System",
    "slug": "search-suggestions-system",
    "difficulty": "medium",
    "primaryPattern": "Trie",
    "acceptablePatterns": [
      "Binary Search"
    ],
    "explanation": "Divide and conquer on sorted data. Repeatedly halve the search space by comparing with middle element.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Trie",
    "patternExplanations": {
      "Trie": "Build trie from products. For each prefix of searchWord, traverse trie and collect up to 3 suggestions.",
      "Binary Search": "Sort products. For each prefix, binary search for first match, take up to 3."
    },
    "hints": [
      "For each prefix of searchWord, find products that start with that prefix.",
      "A prefix tree structure naturally gives you words with a given prefix.",
      "Or: sort products, search for prefix starting position, take first 3 matches."
    ],
    "solution": {
      "approach": "Sort products. For each prefix, binary search to find first match. Collect up to 3 that share prefix.",
      "timeComplexity": "O(n log n + m * n) where m is searchWord length",
      "spaceComplexity": "O(n)",
      "keyInsight": "Sorted array + binary search is simpler than trie for this problem."
    }
  },
  "1318": {
    "title": "Minimum Flips to Make a OR b Equal to c",
    "slug": "minimum-flips-to-make-a-or-b-equal-to-c",
    "difficulty": "medium",
    "primaryPattern": "Bit Manipulation",
    "acceptablePatterns": [],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Bit Manipulation",
    "patternExplanations": {
      "Bit Manipulation": "For each bit position, count flips needed to make (a_bit | b_bit) = c_bit."
    },
    "hints": [
      "For each bit position, consider what flips are needed.",
      "If c_bit is 1: at least one of a_bit or b_bit must be 1.",
      "If c_bit is 0: both a_bit and b_bit must be 0. Count 1s that need flipping."
    ],
    "solution": {
      "approach": "For each bit: if c_bit=1 and both a,b bits are 0, flip 1. If c_bit=0, flip each 1 in a,b.",
      "timeComplexity": "O(1) - 32 bits",
      "spaceComplexity": "O(1)",
      "keyInsight": "Analyze each bit independently. c=0 requires both inputs to be 0. c=1 requires at least one 1."
    }
  },
  "1372": {
    "title": "Longest ZigZag Path in a Binary Tree",
    "slug": "longest-zigzag-path-in-a-binary-tree",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Binary Tree - DFS",
    "primaryPattern": "DFS",
    "acceptablePatterns": [],
    "patternExplanations": {
      "DFS": "DFS tracking direction and current zigzag length. Going opposite direction extends, same direction resets to 1."
    },
    "hints": [
      "ZigZag: go left, then right, then left... alternating directions.",
      "At each node, track: length if we came from left, length if we came from right.",
      "Going left: extend right-path count, reset left-path. Going right: extend left-path, reset right-path."
    ],
    "solution": {
      "approach": "DFS(node, direction, length). Going opposite direction: length+1. Same direction: reset to 1. Track max.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(h)",
      "keyInsight": "Track current zigzag length and direction at each node."
    }
  },
  "1431": {
    "title": "Kids With the Greatest Number of Candies",
    "slug": "kids-with-the-greatest-number-of-candies",
    "difficulty": "easy",
    "primaryPattern": "Greedy",
    "acceptablePatterns": [],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Arrays",
    "patternExplanations": {
      "Greedy": "Find max candies. Check if each kid can have greatest (their candies + extra >= max)."
    },
    "hints": [
      "A kid can have the greatest if candies[i] + extraCandies >= max(candies).",
      "Find the maximum candies any kid has.",
      "For each kid, check if adding extra gets them to at least the max."
    ],
    "solution": {
      "approach": "Find max = max(candies). For each kid, result[i] = (candies[i] + extraCandies >= max).",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Simple comparison after finding global maximum."
    }
  },
  "1448": {
    "title": "Count Good Nodes in Binary Tree",
    "slug": "count-good-nodes-in-binary-tree",
    "difficulty": "medium",
    "lists": [
      "neetcode-150",
      "leetcode-75"
    ],
    "category": "Trees",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "BFS"
    ],
    "patternExplanations": {
      "DFS": "Pass max-so-far down the path. A node is 'good' if its value >= max-so-far. Update max and recurse.",
      "BFS": "Can also use BFS with (node, maxSoFar) pairs, but DFS is more natural for path-based conditions."
    },
    "hints": [
      "A node is 'good' if no node on the path from root has a greater value.",
      "Track the maximum value seen on the path from root to current node.",
      "If current value >= max, it's good. Either way, update max and continue to children."
    ],
    "solution": {
      "approach": "DFS with maxSoFar parameter. If node.val >= maxSoFar, count it. Recurse with max(maxSoFar, node.val).",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(h)",
      "keyInsight": "Path-based conditions naturally use DFS with accumulated state."
    }
  },
  "1456": {
    "title": "Maximum Number of Vowels in a Substring of Given Length",
    "slug": "maximum-number-of-vowels-in-a-substring-of-given-length",
    "difficulty": "medium",
    "primaryPattern": "Sliding Window",
    "acceptablePatterns": [],
    "explanation": "Maintain a window of elements that slides through the array. Expand when adding elements, contract when removing. Track window state.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Sliding Window",
    "patternExplanations": {
      "Sliding Window": "Fixed window of size k. Count vowels in window. Slide and update count."
    },
    "hints": [
      "Fixed-size window of size k.",
      "Count vowels in initial window. As window slides, update count.",
      "Add new char (if vowel), remove old char (if vowel). Track max count."
    ],
    "solution": {
      "approach": "Count vowels in first k chars. Slide window: subtract leaving char, add entering char (if vowels). Track max.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Classic fixed-size sliding window. Efficiently maintain count by adding/subtracting at edges."
    }
  },
  "1466": {
    "title": "Reorder Routes to Make All Paths Lead to the City Zero",
    "slug": "reorder-routes-to-make-all-paths-lead-to-the-city-zero",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Graphs - DFS",
    "primaryPattern": "DFS",
    "acceptablePatterns": [
      "BFS"
    ],
    "patternExplanations": {
      "DFS": "Build graph with edge direction info. DFS from 0. Count edges pointing away from 0 (need reversal).",
      "BFS": "Same logic with BFS - count outward edges."
    },
    "hints": [
      "Roads are directed. All cities should reach city 0. Minimum changes needed?",
      "From city 0's perspective: edges pointing toward 0 are good, away from 0 need reversal.",
      "Explore from 0. Track edge direction. Count edges going 'wrong way' (away from 0)."
    ],
    "solution": {
      "approach": "Build adjacency with direction marker. DFS from 0. Count edges pointing away (need to flip).",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Reverse perspective: from 0, count edges pointing outward (wrong direction)."
    }
  },
  "1493": {
    "title": "Longest Subarray of 1's After Deleting One Element",
    "slug": "longest-subarray-of-1s-after-deleting-one-element",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Sliding Window",
    "primaryPattern": "Sliding Window",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Sliding Window": "Must delete exactly one element. Window can have at most one 0. Track max window size - 1 (for the deletion)."
    },
    "hints": [
      "You must delete exactly one element. Find longest subarray of 1s after deletion.",
      "Window can contain at most one 0 (that's the element we'll delete).",
      "Like Max Consecutive Ones III with k=1, but always subtract 1 for the required deletion."
    ],
    "solution": {
      "approach": "Sliding window allowing at most 1 zero. Track max (right - left). Answer = max window size since we must delete one.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Similar to flipping k=1 zeros, but must delete so result is window size - 1 (or handle all-1s edge case)."
    }
  },
  "1584": {
    "title": "Min Cost to Connect All Points",
    "slug": "min-cost-to-connect-all-points",
    "difficulty": "medium",
    "primaryPattern": "Union Find",
    "acceptablePatterns": [
      "Heap"
    ],
    "explanation": "Graph algorithms - may involve topological sort, cycle detection, union find, or connectivity checks.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Graphs",
    "patternExplanations": {
      "Union Find": "Kruskal's MST: sort all edges by weight, add edges that connect different components.",
      "Heap": "Prim's MST: start from any node, greedily add cheapest edge to unvisited node."
    },
    "hints": [
      "This is Minimum Spanning Tree with Manhattan distance as edge weight.",
      "All pairs of points are potential edges. Sort by distance.",
      "Sort edges, add edges that connect different components (not creating a cycle). Stop at n-1 edges."
    ],
    "solution": {
      "approach": "Generate all O(n^2) edges with Manhattan distance. Sort by weight. Kruskal's with union-find.",
      "timeComplexity": "O(n^2 log n)",
      "spaceComplexity": "O(n^2)",
      "keyInsight": "MST problem. Kruskal's is straightforward when all edges are enumerable."
    }
  },
  "1657": {
    "title": "Determine if Two Strings Are Close",
    "slug": "determine-if-two-strings-are-close",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Hash Map / Set",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Hash Map": "Two strings are close if: 1) same character set, 2) same multiset of frequencies. Count chars, compare sets and sorted frequency lists."
    },
    "hints": [
      "Operation 1: swap adjacent. Operation 2: transform all x's to y's and vice versa.",
      "Swapping can rearrange, so order doesn't matter. Transforming swaps frequencies between characters.",
      "Need: same characters present, and same frequency distribution (sorted frequencies match)."
    ],
    "solution": {
      "approach": "Count chars in both. Check same character set. Check sorted frequency arrays are equal.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1) - at most 26 chars",
      "keyInsight": "Transform swaps frequencies, so frequency multisets must match."
    }
  },
  "1679": {
    "title": "Max Number of K-Sum Pairs",
    "slug": "max-number-of-k-sum-pairs",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Two Pointers",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "patternExplanations": {
      "Two Pointers": "Sort array. Two pointers from ends. If sum = k, pair found. If sum < k, move left up. If sum > k, move right down.",
      "Hash Map": "For each number, check if complement (k - num) exists in map. If yes, pair. Track counts for duplicates."
    },
    "hints": [
      "Find pairs that sum to k. Each element can be used once.",
      "Sorting + scanning from both ends works like Two Sum II.",
      "Or use a map: for each num, check if k-num is available, then remove both."
    ],
    "solution": {
      "approach": "Sort. Two pointers: if sum == k, count++, move both. If < k, move left. If > k, move right.",
      "timeComplexity": "O(n log n)",
      "spaceComplexity": "O(1) if sorting in place",
      "keyInsight": "Sorted two-pointer for pair sum is efficient and straightforward."
    }
  },
  "1732": {
    "title": "Find the Highest Altitude",
    "slug": "find-the-highest-altitude",
    "difficulty": "easy",
    "lists": [
      "leetcode-75"
    ],
    "category": "Prefix Sum",
    "primaryPattern": "Prefix Sum",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Prefix Sum": "Start at altitude 0. Each gain[i] changes altitude. Track running sum and find maximum."
    },
    "hints": [
      "Start at altitude 0. Each gain[i] adds to your current altitude.",
      "Track the running altitude sum as you traverse gains.",
      "Return the maximum altitude reached (including starting altitude 0)."
    ],
    "solution": {
      "approach": "altitude = 0, maxAlt = 0. For each gain: altitude += gain, maxAlt = max(maxAlt, altitude).",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Simple prefix sum - track running total and maximum."
    }
  },
  "1768": {
    "title": "Merge Strings Alternately",
    "slug": "merge-strings-alternately",
    "difficulty": "easy",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [],
    "explanation": "Two pointers technique - use multiple indices to traverse the data structure efficiently, often from opposite ends or at different speeds.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Two Pointers",
    "patternExplanations": {
      "Two Pointers": "Two pointers, one per string. Take alternating characters."
    },
    "hints": [
      "Take one char from word1, one from word2, repeat.",
      "Use two indices i and j. Alternate: take word1[i++], then word2[j++].",
      "When one string is exhausted, append the rest of the other."
    ],
    "solution": {
      "approach": "Two pointers. While both have chars, alternate. Append remaining from whichever is longer.",
      "timeComplexity": "O(n + m)",
      "spaceComplexity": "O(n + m)",
      "keyInsight": "Simple two-pointer interleaving. Handle unequal lengths at end."
    }
  },
  "1851": {
    "title": "Minimum Interval to Include Each Query",
    "slug": "minimum-interval-to-include-each-query",
    "difficulty": "hard",
    "primaryPattern": "Heap",
    "acceptablePatterns": [
      "Binary Search"
    ],
    "explanation": "Divide and conquer on sorted data. Repeatedly halve the search space by comparing with middle element.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Heap / Priority Queue",
    "patternExplanations": {
      "Heap": "Sort queries and intervals by start. Use min-heap by end. For each query, add valid intervals, get smallest.",
      "Binary Search": "Offline processing: sort queries. Use heap to track valid intervals for each query point."
    },
    "hints": [
      "For each query, find smallest interval containing it.",
      "Process queries in sorted order. Maintain active intervals sorted by size.",
      "Add intervals starting before query. Remove intervals ending before query. Smallest active is the answer."
    ],
    "solution": {
      "approach": "Sort queries and intervals. For each query, add intervals with start <= query to min-heap (by size). Remove invalid. Answer = top.",
      "timeComplexity": "O((n + q) log n)",
      "spaceComplexity": "O(n + q)",
      "keyInsight": "Offline processing: sort queries to process intervals in order. Heap maintains smallest valid interval."
    }
  },
  "1899": {
    "title": "Merge Triplets to Form Target Triplet",
    "slug": "merge-triplets-to-form-target-triplet",
    "difficulty": "medium",
    "primaryPattern": "Greedy",
    "acceptablePatterns": [],
    "explanation": "Make locally optimal choice at each step. Works when local optimum leads to global optimum.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Greedy",
    "patternExplanations": {
      "Greedy": "A triplet is usable if each element is <= corresponding target element. Check if all target elements are achievable."
    },
    "hints": [
      "merge([a,b,c], [d,e,f]) = [max(a,d), max(b,e), max(c,f)].",
      "We can only use triplets where each element <= corresponding target element.",
      "For each position, check if some valid triplet has that position's target value."
    ],
    "solution": {
      "approach": "Filter triplets: only use if triplet[i] <= target[i] for all i. Check if for each position, some triplet achieves target value.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Discard triplets that would exceed target in any position. Then check if target values are achievable."
    }
  },
  "1926": {
    "title": "Nearest Exit from Entrance in Maze",
    "slug": "nearest-exit-from-entrance-in-maze",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Graphs - BFS",
    "primaryPattern": "BFS",
    "acceptablePatterns": [],
    "patternExplanations": {
      "BFS": "BFS from entrance. An exit is on border and not the entrance. First exit found is nearest (BFS property)."
    },
    "hints": [
      "Find shortest path to any exit. Exit = empty cell on border (not entrance).",
      "Level-by-level exploration gives shortest path in unweighted graph/grid.",
      "Explore from entrance. When you reach a border cell (not entrance), that's the answer."
    ],
    "solution": {
      "approach": "BFS from entrance. For each cell, check if it's an exit (on border, not entrance). Return distance when found.",
      "timeComplexity": "O(m * n)",
      "spaceComplexity": "O(m * n)",
      "keyInsight": "BFS guarantees shortest path. First exit reached is nearest."
    }
  },
  "2013": {
    "title": "Detect Squares",
    "slug": "detect-squares",
    "difficulty": "medium",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "neetcode-150"
    ],
    "category": "Hash Map",
    "patternExplanations": {
      "Hash Map": "Store points with count. For query point, check if opposite corners exist to form squares."
    },
    "hints": [
      "Store points and their counts. For detect, find squares with query as corner.",
      "A square has corners (x1,y1), (x1,y2), (x2,y1), (x2,y2) where |x2-x1| = |y2-y1|.",
      "Given query point, iterate over points with same x. Check if the two other corners exist."
    ],
    "solution": {
      "approach": "HashMap of (point -> count). detect: for each point with same x, check if square's other corners exist. Sum products.",
      "timeComplexity": "O(n) per detect, O(1) add",
      "spaceComplexity": "O(n)",
      "keyInsight": "Diagonal of square: given two corners with same x, the other corners are determined."
    }
  },
  "2095": {
    "title": "Delete the Middle Node of a Linked List",
    "slug": "delete-the-middle-node-of-a-linked-list",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Linked List",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Linked List"
    ],
    "patternExplanations": {
      "Two Pointers": "Slow and fast pointers. When fast reaches end, slow is at middle. Need previous pointer to delete.",
      "Linked List": "Fast-slow technique finds middle in one pass without counting."
    },
    "hints": [
      "Middle node: for odd length it's center, for even it's floor(n/2)th.",
      "Fast moves 2x speed of slow. When fast reaches end, slow is at middle.",
      "Need to track node before slow to actually delete. Or use prev pointer."
    ],
    "solution": {
      "approach": "Slow, fast pointers. Track prev of slow. When fast done, prev.next = slow.next.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Fast/slow finds middle. Tracking prev allows deletion."
    }
  },
  "2130": {
    "title": "Maximum Twin Sum of a Linked List",
    "slug": "maximum-twin-sum-of-a-linked-list",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Linked List",
    "primaryPattern": "Two Pointers",
    "acceptablePatterns": [
      "Linked List",
      "Stack"
    ],
    "patternExplanations": {
      "Two Pointers": "Find middle, reverse second half, then iterate both halves comparing sums.",
      "Linked List": "Classic technique: find middle, reverse, process.",
      "Stack": "Push first half values. Pop while iterating second half, calculate sums."
    },
    "hints": [
      "Twin: node i and node n-1-i. Sum of twins at opposite ends.",
      "Need to pair first node with last, second with second-to-last, etc.",
      "Reverse second half, then iterate both halves together calculating sums."
    ],
    "solution": {
      "approach": "Find middle (slow/fast). Reverse second half. Iterate both halves, track max sum.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "keyInsight": "Reversing second half enables O(1) space twin pairing."
    }
  },
  "2215": {
    "title": "Find the Difference of Two Arrays",
    "slug": "find-the-difference-of-two-arrays",
    "difficulty": "easy",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Hash Map",
    "patternExplanations": {
      "Hash Map": "Use sets for each array. Find set differences: nums1 - nums2 and nums2 - nums1."
    },
    "hints": [
      "Find elements in nums1 not in nums2, and vice versa.",
      "Convert arrays to sets. Use set difference.",
      "result[0] = set(nums1) - set(nums2), result[1] = set(nums2) - set(nums1)."
    ],
    "solution": {
      "approach": "Convert to sets. Return [elements in set1 but not set2, elements in set2 but not set1].",
      "timeComplexity": "O(n + m)",
      "spaceComplexity": "O(n + m)",
      "keyInsight": "Set difference is the key operation. Sets handle duplicates automatically."
    }
  },
  "2300": {
    "title": "Successful Pairs of Spells and Potions",
    "slug": "successful-pairs-of-spells-and-potions",
    "difficulty": "medium",
    "primaryPattern": "Binary Search",
    "acceptablePatterns": [],
    "explanation": "Two pointers technique - use multiple indices to traverse the data structure efficiently, often from opposite ends or at different speeds.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Binary Search",
    "patternExplanations": {
      "Binary Search": "Sort potions. For each spell, binary search for min potion where spell*potion >= success."
    },
    "hints": [
      "For each spell, count potions where spell * potion >= success.",
      "Potion threshold: success / spell (rounded up). Count potions >= threshold.",
      "Sort potions. Search for first potion >= threshold. All after it are successful."
    ],
    "solution": {
      "approach": "Sort potions. For each spell, binary search for min potion s.t. spell*potion >= success. Count = n - index.",
      "timeComplexity": "O((n + m) log n)",
      "spaceComplexity": "O(n) for sorting",
      "keyInsight": "Sorting allows binary search. Threshold = ceil(success / spell)."
    }
  },
  "2336": {
    "title": "Smallest Number in Infinite Set",
    "slug": "smallest-number-in-infinite-set",
    "difficulty": "medium",
    "primaryPattern": "Heap",
    "acceptablePatterns": [
      "Hash Map"
    ],
    "explanation": "Use hash map for O(1) lookups and frequency counting. Perfect for tracking seen elements or mapping relationships.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Heap / Priority Queue",
    "patternExplanations": {
      "Heap": "Min-heap tracks next available numbers. Set tracks removed numbers added back.",
      "Hash Map": "Track removed numbers. Smallest not removed is answer unless all small ones removed."
    },
    "hints": [
      "Initially, smallest is 1. popSmallest returns smallest and removes it.",
      "addBack puts a number back (if it was removed).",
      "Use a structure that efficiently gives the minimum. Track what's been removed to handle addBack."
    ],
    "solution": {
      "approach": "Min-heap starts with 1. addBack: push to heap if was removed (track in set). popSmallest: pop from heap.",
      "timeComplexity": "O(log n) per operation",
      "spaceComplexity": "O(n)",
      "keyInsight": "Heap gives smallest available. Set tracks what was removed (for addBack validation)."
    }
  },
  "2352": {
    "title": "Equal Row and Column Pairs",
    "slug": "equal-row-and-column-pairs",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Hash Map / Set",
    "primaryPattern": "Hash Map",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Hash Map": "Convert each row to a string/tuple key. Count row occurrences. For each column, check if it matches any row key."
    },
    "hints": [
      "Count pairs (r, c) where row r equals column c.",
      "Convert rows to a hashable form (tuple or string). Count occurrences.",
      "For each column, convert to same form, add count of matching rows."
    ],
    "solution": {
      "approach": "Map row -> count. For each column, look up in map and add to result.",
      "timeComplexity": "O(n^2)",
      "spaceComplexity": "O(n^2)",
      "keyInsight": "Hash rows for O(1) lookup when checking columns."
    }
  },
  "2390": {
    "title": "Removing Stars From a String",
    "slug": "removing-stars-from-a-string",
    "difficulty": "medium",
    "lists": [
      "leetcode-75"
    ],
    "category": "Stack",
    "primaryPattern": "Stack",
    "acceptablePatterns": [],
    "patternExplanations": {
      "Stack": "Push non-star characters. On star, pop the last character. Result is remaining stack contents."
    },
    "hints": [
      "Star removes the closest non-star character to its left.",
      "'Closest to left' = most recently added. What data structure gives that?",
      "LIFO: add letters, remove last on star. Final result is what remains."
    ],
    "solution": {
      "approach": "Stack of chars. For each char: if star, pop. Else push. Join remaining stack.",
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Star acts like backspace - stack naturally handles this."
    }
  },
  "2462": {
    "title": "Total Cost to Hire K Workers",
    "slug": "total-cost-to-hire-k-workers",
    "difficulty": "medium",
    "primaryPattern": "Heap",
    "acceptablePatterns": [],
    "explanation": "Two pointers technique - use multiple indices to traverse the data structure efficiently, often from opposite ends or at different speeds.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Heap / Priority Queue",
    "patternExplanations": {
      "Heap": "Two heaps for front and back candidates. Hire k workers by always picking smallest cost."
    },
    "hints": [
      "Hire k workers. Each time, pick from first 'candidates' or last 'candidates' workers.",
      "Use two structures that give the minimum: one for front candidates, one for back candidates.",
      "Pick smallest from either. Refill from remaining workers."
    ],
    "solution": {
      "approach": "Two min-heaps for front and back 'candidates' workers. Pick min k times, refilling heaps from middle.",
      "timeComplexity": "O((candidates + k) log candidates)",
      "spaceComplexity": "O(candidates)",
      "keyInsight": "Two heaps maintain the candidates pool from each end. Pick globally smallest."
    }
  },
  "2542": {
    "title": "Maximum Subsequence Score",
    "slug": "maximum-subsequence-score",
    "difficulty": "medium",
    "primaryPattern": "Greedy",
    "acceptablePatterns": [
      "Heap"
    ],
    "explanation": "Make locally optimal choice at each step. Works when local optimum leads to global optimum.",
    "lists": [
      "leetcode-75"
    ],
    "category": "Heap / Priority Queue",
    "patternExplanations": {
      "Greedy": "Sort by nums descending. Greedily pick k largest nums, but sum their corresponding (sorted) multipliers.",
      "Heap": "Max-heap by nums. Pick k elements. Use sorted multipliers to maximize score."
    },
    "hints": [
      "Score = min(nums[picked]) * sum(multipliers[picked]). Balance these two.",
      "If you fix which elements are picked, score = min(nums) * sum(multipliers).",
      "Sort by nums descending. Consider prefixes. For each min, compute best sum by tracking k largest multipliers seen so far."
    ],
    "solution": {
      "approach": "Pair (nums[i], multipliers[i]). Sort by nums descending. Use min-heap of size k for largest multipliers. Track max score.",
      "timeComplexity": "O(n log n)",
      "spaceComplexity": "O(n)",
      "keyInsight": "Fix min (iterate sorted nums). Greedily pick k largest multipliers seen so far. Track best score."
    }
  }
};

// Export for use in content script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROBLEM_DATABASE };
}
