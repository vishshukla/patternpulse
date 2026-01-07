# PatternPulse

> Chrome extension for mastering LeetCode patterns

Train your pattern recognition skills by identifying algorithmic patterns **before** seeing hints, tags, and difficulty. Track your progress and improve for coding interviews.

## Features

- **Pattern Quiz** - Identify the pattern before solving
- **Smart Shields** - Blur tags, difficulty, hints until you guess correctly
- **Progress Tracking** - Track accuracy and identify weak areas
- **Streak Counter** - Build momentum with consecutive perfect solves
- **15 Core Patterns** - Hash Map, Two Pointers, Sliding Window, Binary Search, DP, Greedy, Backtracking, DFS, BFS, Stack, Linked List, Heap, Trie, Union Find, Topological Sort

## Installation

### From Chrome Web Store
Coming soon!

### Load Unpacked (Developer Mode)
1. Clone this repository
2. Go to `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `/extension` folder

## Usage

1. Visit any LeetCode problem
2. Hover over the PatternPulse tab on the right
3. Select the pattern you think applies
4. Get it right to unlock the problem metadata!

## Project Structure

```
extension/
├── contentScript.js   # Main extension logic
├── storage.js         # Chrome storage wrapper
├── popup.html/js      # Extension popup UI
├── shield.css         # Styles for shields/quiz
├── manifest.json      # Extension manifest
├── data/
│   ├── problemDatabase.js   # Problem patterns
│   └── curatedLists.js      # Curated problem lists
└── icons/             # Extension icons
```

## Privacy

- All data stored locally in your browser
- No data sent to external servers
- No personal information collected
- See [Privacy Policy](./PRIVACY.md)

## Feedback

This is a beta release! Your feedback helps improve the extension.
- Use the "Send Feedback" button in the extension popup
- Or click "Disagree?" on wrong answers to suggest corrections

## License

MIT
