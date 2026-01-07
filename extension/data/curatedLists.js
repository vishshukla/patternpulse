// Curated Problem Lists - NeetCode 150 + LeetCode 75
// Combined ~175 unique problems (with overlap)

const NEETCODE_150 = {
  name: "NeetCode 150",
  description: "Comprehensive coding interview prep covering all major patterns",
  categories: {
    "Arrays & Hashing": [
      { leetcodeId: 217, title: "Contains Duplicate", difficulty: "easy" },
      { leetcodeId: 242, title: "Valid Anagram", difficulty: "easy" },
      { leetcodeId: 1, title: "Two Sum", difficulty: "easy" },
      { leetcodeId: 49, title: "Group Anagrams", difficulty: "medium" },
      { leetcodeId: 347, title: "Top K Frequent Elements", difficulty: "medium" },
      { leetcodeId: 271, title: "Encode and Decode Strings", difficulty: "medium" },
      { leetcodeId: 238, title: "Product of Array Except Self", difficulty: "medium" },
      { leetcodeId: 128, title: "Longest Consecutive Sequence", difficulty: "medium" },
      { leetcodeId: 36, title: "Valid Sudoku", difficulty: "medium" }
    ],
    "Two Pointers": [
      { leetcodeId: 125, title: "Valid Palindrome", difficulty: "easy" },
      { leetcodeId: 167, title: "Two Sum II - Input Array Is Sorted", difficulty: "medium" },
      { leetcodeId: 15, title: "3Sum", difficulty: "medium" },
      { leetcodeId: 11, title: "Container With Most Water", difficulty: "medium" },
      { leetcodeId: 42, title: "Trapping Rain Water", difficulty: "hard" }
    ],
    "Sliding Window": [
      { leetcodeId: 121, title: "Best Time to Buy and Sell Stock", difficulty: "easy" },
      { leetcodeId: 3, title: "Longest Substring Without Repeating Characters", difficulty: "medium" },
      { leetcodeId: 424, title: "Longest Repeating Character Replacement", difficulty: "medium" },
      { leetcodeId: 567, title: "Permutation in String", difficulty: "medium" },
      { leetcodeId: 76, title: "Minimum Window Substring", difficulty: "hard" },
      { leetcodeId: 239, title: "Sliding Window Maximum", difficulty: "hard" }
    ],
    "Stack": [
      { leetcodeId: 20, title: "Valid Parentheses", difficulty: "easy" },
      { leetcodeId: 155, title: "Min Stack", difficulty: "medium" },
      { leetcodeId: 150, title: "Evaluate Reverse Polish Notation", difficulty: "medium" },
      { leetcodeId: 22, title: "Generate Parentheses", difficulty: "medium" },
      { leetcodeId: 739, title: "Daily Temperatures", difficulty: "medium" },
      { leetcodeId: 853, title: "Car Fleet", difficulty: "medium" },
      { leetcodeId: 84, title: "Largest Rectangle in Histogram", difficulty: "hard" }
    ],
    "Binary Search": [
      { leetcodeId: 704, title: "Binary Search", difficulty: "easy" },
      { leetcodeId: 74, title: "Search a 2D Matrix", difficulty: "medium" },
      { leetcodeId: 875, title: "Koko Eating Bananas", difficulty: "medium" },
      { leetcodeId: 153, title: "Find Minimum in Rotated Sorted Array", difficulty: "medium" },
      { leetcodeId: 33, title: "Search in Rotated Sorted Array", difficulty: "medium" },
      { leetcodeId: 981, title: "Time Based Key-Value Store", difficulty: "medium" },
      { leetcodeId: 4, title: "Median of Two Sorted Arrays", difficulty: "hard" }
    ],
    "Linked List": [
      { leetcodeId: 206, title: "Reverse Linked List", difficulty: "easy" },
      { leetcodeId: 21, title: "Merge Two Sorted Lists", difficulty: "easy" },
      { leetcodeId: 141, title: "Linked List Cycle", difficulty: "easy" },
      { leetcodeId: 143, title: "Reorder List", difficulty: "medium" },
      { leetcodeId: 19, title: "Remove Nth Node From End of List", difficulty: "medium" },
      { leetcodeId: 138, title: "Copy List with Random Pointer", difficulty: "medium" },
      { leetcodeId: 2, title: "Add Two Numbers", difficulty: "medium" },
      { leetcodeId: 287, title: "Find the Duplicate Number", difficulty: "medium" },
      { leetcodeId: 146, title: "LRU Cache", difficulty: "medium" },
      { leetcodeId: 23, title: "Merge k Sorted Lists", difficulty: "hard" },
      { leetcodeId: 25, title: "Reverse Nodes in k-Group", difficulty: "hard" }
    ],
    "Trees": [
      { leetcodeId: 226, title: "Invert Binary Tree", difficulty: "easy" },
      { leetcodeId: 104, title: "Maximum Depth of Binary Tree", difficulty: "easy" },
      { leetcodeId: 543, title: "Diameter of Binary Tree", difficulty: "easy" },
      { leetcodeId: 110, title: "Balanced Binary Tree", difficulty: "easy" },
      { leetcodeId: 100, title: "Same Tree", difficulty: "easy" },
      { leetcodeId: 572, title: "Subtree of Another Tree", difficulty: "easy" },
      { leetcodeId: 235, title: "Lowest Common Ancestor of a Binary Search Tree", difficulty: "medium" },
      { leetcodeId: 102, title: "Binary Tree Level Order Traversal", difficulty: "medium" },
      { leetcodeId: 199, title: "Binary Tree Right Side View", difficulty: "medium" },
      { leetcodeId: 1448, title: "Count Good Nodes in Binary Tree", difficulty: "medium" },
      { leetcodeId: 98, title: "Validate Binary Search Tree", difficulty: "medium" },
      { leetcodeId: 230, title: "Kth Smallest Element in a BST", difficulty: "medium" },
      { leetcodeId: 105, title: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: "medium" },
      { leetcodeId: 124, title: "Binary Tree Maximum Path Sum", difficulty: "hard" },
      { leetcodeId: 297, title: "Serialize and Deserialize Binary Tree", difficulty: "hard" }
    ],
    "Tries": [
      { leetcodeId: 208, title: "Implement Trie (Prefix Tree)", difficulty: "medium" },
      { leetcodeId: 211, title: "Design Add and Search Words Data Structure", difficulty: "medium" },
      { leetcodeId: 212, title: "Word Search II", difficulty: "hard" }
    ],
    "Heap / Priority Queue": [
      { leetcodeId: 703, title: "Kth Largest Element in a Stream", difficulty: "easy" },
      { leetcodeId: 1046, title: "Last Stone Weight", difficulty: "easy" },
      { leetcodeId: 973, title: "K Closest Points to Origin", difficulty: "medium" },
      { leetcodeId: 215, title: "Kth Largest Element in an Array", difficulty: "medium" },
      { leetcodeId: 621, title: "Task Scheduler", difficulty: "medium" },
      { leetcodeId: 355, title: "Design Twitter", difficulty: "medium" },
      { leetcodeId: 295, title: "Find Median from Data Stream", difficulty: "hard" }
    ],
    "Backtracking": [
      { leetcodeId: 78, title: "Subsets", difficulty: "medium" },
      { leetcodeId: 39, title: "Combination Sum", difficulty: "medium" },
      { leetcodeId: 46, title: "Permutations", difficulty: "medium" },
      { leetcodeId: 90, title: "Subsets II", difficulty: "medium" },
      { leetcodeId: 40, title: "Combination Sum II", difficulty: "medium" },
      { leetcodeId: 79, title: "Word Search", difficulty: "medium" },
      { leetcodeId: 131, title: "Palindrome Partitioning", difficulty: "medium" },
      { leetcodeId: 17, title: "Letter Combinations of a Phone Number", difficulty: "medium" },
      { leetcodeId: 51, title: "N-Queens", difficulty: "hard" }
    ],
    "Graphs": [
      { leetcodeId: 200, title: "Number of Islands", difficulty: "medium" },
      { leetcodeId: 133, title: "Clone Graph", difficulty: "medium" },
      { leetcodeId: 695, title: "Max Area of Island", difficulty: "medium" },
      { leetcodeId: 417, title: "Pacific Atlantic Water Flow", difficulty: "medium" },
      { leetcodeId: 130, title: "Surrounded Regions", difficulty: "medium" },
      { leetcodeId: 994, title: "Rotting Oranges", difficulty: "medium" },
      { leetcodeId: 286, title: "Walls and Gates", difficulty: "medium" },
      { leetcodeId: 207, title: "Course Schedule", difficulty: "medium" },
      { leetcodeId: 210, title: "Course Schedule II", difficulty: "medium" },
      { leetcodeId: 684, title: "Redundant Connection", difficulty: "medium" },
      { leetcodeId: 323, title: "Number of Connected Components in an Undirected Graph", difficulty: "medium" },
      { leetcodeId: 261, title: "Graph Valid Tree", difficulty: "medium" }
    ],
    "Advanced Graphs": [
      { leetcodeId: 743, title: "Network Delay Time", difficulty: "medium" },
      { leetcodeId: 787, title: "Cheapest Flights Within K Stops", difficulty: "medium" },
      { leetcodeId: 269, title: "Alien Dictionary", difficulty: "hard" },
      { leetcodeId: 778, title: "Swim in Rising Water", difficulty: "hard" },
      { leetcodeId: 332, title: "Reconstruct Itinerary", difficulty: "hard" },
      { leetcodeId: 1584, title: "Min Cost to Connect All Points", difficulty: "medium" }
    ],
    "1-D Dynamic Programming": [
      { leetcodeId: 70, title: "Climbing Stairs", difficulty: "easy" },
      { leetcodeId: 746, title: "Min Cost Climbing Stairs", difficulty: "easy" },
      { leetcodeId: 198, title: "House Robber", difficulty: "medium" },
      { leetcodeId: 213, title: "House Robber II", difficulty: "medium" },
      { leetcodeId: 5, title: "Longest Palindromic Substring", difficulty: "medium" },
      { leetcodeId: 647, title: "Palindromic Substrings", difficulty: "medium" },
      { leetcodeId: 91, title: "Decode Ways", difficulty: "medium" },
      { leetcodeId: 322, title: "Coin Change", difficulty: "medium" },
      { leetcodeId: 152, title: "Maximum Product Subarray", difficulty: "medium" },
      { leetcodeId: 139, title: "Word Break", difficulty: "medium" },
      { leetcodeId: 300, title: "Longest Increasing Subsequence", difficulty: "medium" },
      { leetcodeId: 416, title: "Partition Equal Subset Sum", difficulty: "medium" }
    ],
    "2-D Dynamic Programming": [
      { leetcodeId: 62, title: "Unique Paths", difficulty: "medium" },
      { leetcodeId: 1143, title: "Longest Common Subsequence", difficulty: "medium" },
      { leetcodeId: 309, title: "Best Time to Buy and Sell Stock with Cooldown", difficulty: "medium" },
      { leetcodeId: 518, title: "Coin Change II", difficulty: "medium" },
      { leetcodeId: 494, title: "Target Sum", difficulty: "medium" },
      { leetcodeId: 97, title: "Interleaving String", difficulty: "medium" },
      { leetcodeId: 329, title: "Longest Increasing Path in a Matrix", difficulty: "hard" },
      { leetcodeId: 115, title: "Distinct Subsequences", difficulty: "hard" },
      { leetcodeId: 72, title: "Edit Distance", difficulty: "medium" },
      { leetcodeId: 312, title: "Burst Balloons", difficulty: "hard" },
      { leetcodeId: 10, title: "Regular Expression Matching", difficulty: "hard" }
    ],
    "Greedy": [
      { leetcodeId: 53, title: "Maximum Subarray", difficulty: "medium" },
      { leetcodeId: 55, title: "Jump Game", difficulty: "medium" },
      { leetcodeId: 45, title: "Jump Game II", difficulty: "medium" },
      { leetcodeId: 134, title: "Gas Station", difficulty: "medium" },
      { leetcodeId: 846, title: "Hand of Straights", difficulty: "medium" },
      { leetcodeId: 1899, title: "Merge Triplets to Form Target Triplet", difficulty: "medium" },
      { leetcodeId: 763, title: "Partition Labels", difficulty: "medium" },
      { leetcodeId: 678, title: "Valid Parenthesis String", difficulty: "medium" }
    ],
    "Intervals": [
      { leetcodeId: 57, title: "Insert Interval", difficulty: "medium" },
      { leetcodeId: 56, title: "Merge Intervals", difficulty: "medium" },
      { leetcodeId: 435, title: "Non-overlapping Intervals", difficulty: "medium" },
      { leetcodeId: 252, title: "Meeting Rooms", difficulty: "easy" },
      { leetcodeId: 253, title: "Meeting Rooms II", difficulty: "medium" },
      { leetcodeId: 1851, title: "Minimum Interval to Include Each Query", difficulty: "hard" }
    ],
    "Math & Geometry": [
      { leetcodeId: 48, title: "Rotate Image", difficulty: "medium" },
      { leetcodeId: 54, title: "Spiral Matrix", difficulty: "medium" },
      { leetcodeId: 73, title: "Set Matrix Zeroes", difficulty: "medium" },
      { leetcodeId: 202, title: "Happy Number", difficulty: "easy" },
      { leetcodeId: 66, title: "Plus One", difficulty: "easy" },
      { leetcodeId: 50, title: "Pow(x, n)", difficulty: "medium" },
      { leetcodeId: 43, title: "Multiply Strings", difficulty: "medium" },
      { leetcodeId: 2013, title: "Detect Squares", difficulty: "medium" }
    ],
    "Bit Manipulation": [
      { leetcodeId: 136, title: "Single Number", difficulty: "easy" },
      { leetcodeId: 191, title: "Number of 1 Bits", difficulty: "easy" },
      { leetcodeId: 338, title: "Counting Bits", difficulty: "easy" },
      { leetcodeId: 190, title: "Reverse Bits", difficulty: "easy" },
      { leetcodeId: 268, title: "Missing Number", difficulty: "easy" },
      { leetcodeId: 371, title: "Sum of Two Integers", difficulty: "medium" },
      { leetcodeId: 7, title: "Reverse Integer", difficulty: "medium" }
    ]
  }
};

const LEETCODE_75 = {
  name: "LeetCode 75",
  description: "Essential problems for interview prep - no hard problems",
  categories: {
    "Array / String": [
      { leetcodeId: 1768, title: "Merge Strings Alternately", difficulty: "easy" },
      { leetcodeId: 1071, title: "Greatest Common Divisor of Strings", difficulty: "easy" },
      { leetcodeId: 1431, title: "Kids With the Greatest Number of Candies", difficulty: "easy" },
      { leetcodeId: 605, title: "Can Place Flowers", difficulty: "easy" },
      { leetcodeId: 345, title: "Reverse Vowels of a String", difficulty: "easy" },
      { leetcodeId: 151, title: "Reverse Words in a String", difficulty: "medium" },
      { leetcodeId: 238, title: "Product of Array Except Self", difficulty: "medium" },
      { leetcodeId: 334, title: "Increasing Triplet Subsequence", difficulty: "medium" },
      { leetcodeId: 443, title: "String Compression", difficulty: "medium" }
    ],
    "Two Pointers": [
      { leetcodeId: 283, title: "Move Zeroes", difficulty: "easy" },
      { leetcodeId: 392, title: "Is Subsequence", difficulty: "easy" },
      { leetcodeId: 11, title: "Container With Most Water", difficulty: "medium" },
      { leetcodeId: 1679, title: "Max Number of K-Sum Pairs", difficulty: "medium" }
    ],
    "Sliding Window": [
      { leetcodeId: 643, title: "Maximum Average Subarray I", difficulty: "easy" },
      { leetcodeId: 1456, title: "Maximum Number of Vowels in a Substring of Given Length", difficulty: "medium" },
      { leetcodeId: 1004, title: "Max Consecutive Ones III", difficulty: "medium" },
      { leetcodeId: 1493, title: "Longest Subarray of 1's After Deleting One Element", difficulty: "medium" }
    ],
    "Prefix Sum": [
      { leetcodeId: 1732, title: "Find the Highest Altitude", difficulty: "easy" },
      { leetcodeId: 724, title: "Find Pivot Index", difficulty: "easy" }
    ],
    "Hash Map / Set": [
      { leetcodeId: 2215, title: "Find the Difference of Two Arrays", difficulty: "easy" },
      { leetcodeId: 1207, title: "Unique Number of Occurrences", difficulty: "easy" },
      { leetcodeId: 1657, title: "Determine if Two Strings Are Close", difficulty: "medium" },
      { leetcodeId: 2352, title: "Equal Row and Column Pairs", difficulty: "medium" }
    ],
    "Stack": [
      { leetcodeId: 2390, title: "Removing Stars From a String", difficulty: "medium" },
      { leetcodeId: 735, title: "Asteroid Collision", difficulty: "medium" },
      { leetcodeId: 394, title: "Decode String", difficulty: "medium" }
    ],
    "Queue": [
      { leetcodeId: 933, title: "Number of Recent Calls", difficulty: "easy" },
      { leetcodeId: 649, title: "Dota2 Senate", difficulty: "medium" }
    ],
    "Linked List": [
      { leetcodeId: 2095, title: "Delete the Middle Node of a Linked List", difficulty: "medium" },
      { leetcodeId: 328, title: "Odd Even Linked List", difficulty: "medium" },
      { leetcodeId: 206, title: "Reverse Linked List", difficulty: "easy" },
      { leetcodeId: 2130, title: "Maximum Twin Sum of a Linked List", difficulty: "medium" }
    ],
    "Binary Tree - DFS": [
      { leetcodeId: 104, title: "Maximum Depth of Binary Tree", difficulty: "easy" },
      { leetcodeId: 872, title: "Leaf-Similar Trees", difficulty: "easy" },
      { leetcodeId: 1448, title: "Count Good Nodes in Binary Tree", difficulty: "medium" },
      { leetcodeId: 437, title: "Path Sum III", difficulty: "medium" },
      { leetcodeId: 1372, title: "Longest ZigZag Path in a Binary Tree", difficulty: "medium" },
      { leetcodeId: 236, title: "Lowest Common Ancestor of a Binary Tree", difficulty: "medium" }
    ],
    "Binary Tree - BFS": [
      { leetcodeId: 199, title: "Binary Tree Right Side View", difficulty: "medium" },
      { leetcodeId: 1161, title: "Maximum Level Sum of a Binary Tree", difficulty: "medium" }
    ],
    "Binary Search Tree": [
      { leetcodeId: 700, title: "Search in a Binary Search Tree", difficulty: "easy" },
      { leetcodeId: 450, title: "Delete Node in a BST", difficulty: "medium" }
    ],
    "Graphs - DFS": [
      { leetcodeId: 841, title: "Keys and Rooms", difficulty: "medium" },
      { leetcodeId: 547, title: "Number of Provinces", difficulty: "medium" },
      { leetcodeId: 1466, title: "Reorder Routes to Make All Paths Lead to the City Zero", difficulty: "medium" },
      { leetcodeId: 399, title: "Evaluate Division", difficulty: "medium" }
    ],
    "Graphs - BFS": [
      { leetcodeId: 1926, title: "Nearest Exit from Entrance in Maze", difficulty: "medium" },
      { leetcodeId: 994, title: "Rotting Oranges", difficulty: "medium" }
    ],
    "Heap / Priority Queue": [
      { leetcodeId: 215, title: "Kth Largest Element in an Array", difficulty: "medium" },
      { leetcodeId: 2336, title: "Smallest Number in Infinite Set", difficulty: "medium" },
      { leetcodeId: 2542, title: "Maximum Subsequence Score", difficulty: "medium" },
      { leetcodeId: 2462, title: "Total Cost to Hire K Workers", difficulty: "medium" }
    ],
    "Binary Search": [
      { leetcodeId: 374, title: "Guess Number Higher or Lower", difficulty: "easy" },
      { leetcodeId: 2300, title: "Successful Pairs of Spells and Potions", difficulty: "medium" },
      { leetcodeId: 162, title: "Find Peak Element", difficulty: "medium" },
      { leetcodeId: 875, title: "Koko Eating Bananas", difficulty: "medium" }
    ],
    "Backtracking": [
      { leetcodeId: 17, title: "Letter Combinations of a Phone Number", difficulty: "medium" },
      { leetcodeId: 216, title: "Combination Sum III", difficulty: "medium" }
    ],
    "DP - 1D": [
      { leetcodeId: 1137, title: "N-th Tribonacci Number", difficulty: "easy" },
      { leetcodeId: 746, title: "Min Cost Climbing Stairs", difficulty: "easy" },
      { leetcodeId: 198, title: "House Robber", difficulty: "medium" },
      { leetcodeId: 790, title: "Domino and Tromino Tiling", difficulty: "medium" }
    ],
    "DP - Multidimensional": [
      { leetcodeId: 62, title: "Unique Paths", difficulty: "medium" },
      { leetcodeId: 1143, title: "Longest Common Subsequence", difficulty: "medium" },
      { leetcodeId: 714, title: "Best Time to Buy and Sell Stock with Transaction Fee", difficulty: "medium" },
      { leetcodeId: 72, title: "Edit Distance", difficulty: "medium" }
    ],
    "Bit Manipulation": [
      { leetcodeId: 338, title: "Counting Bits", difficulty: "easy" },
      { leetcodeId: 136, title: "Single Number", difficulty: "easy" },
      { leetcodeId: 1318, title: "Minimum Flips to Make a OR b Equal to c", difficulty: "medium" }
    ],
    "Trie": [
      { leetcodeId: 208, title: "Implement Trie (Prefix Tree)", difficulty: "medium" },
      { leetcodeId: 1268, title: "Search Suggestions System", difficulty: "medium" }
    ],
    "Intervals": [
      { leetcodeId: 435, title: "Non-overlapping Intervals", difficulty: "medium" },
      { leetcodeId: 452, title: "Minimum Number of Arrows to Burst Balloons", difficulty: "medium" }
    ],
    "Monotonic Stack": [
      { leetcodeId: 739, title: "Daily Temperatures", difficulty: "medium" },
      { leetcodeId: 901, title: "Online Stock Span", difficulty: "medium" }
    ]
  }
};

// Helper function to get all unique problem IDs from both lists
function getAllCuratedProblemIds() {
  const ids = new Set();

  // Add NeetCode 150
  Object.values(NEETCODE_150.categories).forEach(problems => {
    problems.forEach(p => ids.add(p.leetcodeId));
  });

  // Add LeetCode 75
  Object.values(LEETCODE_75.categories).forEach(problems => {
    problems.forEach(p => ids.add(p.leetcodeId));
  });

  return Array.from(ids).sort((a, b) => a - b);
}

// Helper to check which lists a problem belongs to
function getProblemLists(leetcodeId) {
  const lists = [];

  // Check NeetCode 150
  for (const [category, problems] of Object.entries(NEETCODE_150.categories)) {
    if (problems.some(p => p.leetcodeId === leetcodeId)) {
      lists.push({ list: "neetcode-150", category });
      break;
    }
  }

  // Check LeetCode 75
  for (const [category, problems] of Object.entries(LEETCODE_75.categories)) {
    if (problems.some(p => p.leetcodeId === leetcodeId)) {
      lists.push({ list: "leetcode-75", category });
      break;
    }
  }

  return lists;
}

// Export for use in extension
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NEETCODE_150, LEETCODE_75, getAllCuratedProblemIds, getProblemLists };
}
