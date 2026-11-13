import type { Question } from "@/types/question";
import { oaQuestions } from './oaQuestions';

const academic = (id: string, title: string, topic: string, difficulty: Question["difficulty"], year: string, semester: string, subject: string, description: string, companies: string[] = [], exampleInput?: string, exampleOutput?: string): Question => ({ id, title, topic, difficulty, year, semester, subject, description, companies, type: "Academic PYQ", exampleInput, exampleOutput });
const placement = (id: string, title: string, topic: string, difficulty: Question["difficulty"], companies: string[], description: string, exampleInput?: string, exampleOutput?: string): Question => ({ id, title, topic, difficulty, companies, description, type: "Placement Practice", exampleInput, exampleOutput });

export const questions: Question[] = [
  academic("pyq-2022-01", "Two Sum using Hashing", "Hashing", "Easy", "2022", "Semester 3", "Data Structures", "Given an array and a target, return the indices of two values that add up to the target.", ["Amazon", "Microsoft"], "nums = [2, 7, 11, 15], target = 9", "[0, 1]"),
  academic("pyq-2022-02", "Reverse a Linked List", "Linked Lists", "Easy", "2022", "Semester 3", "Data Structures", "Reverse a singly linked list iteratively and recursively.", ["Amazon", "TCS"], "1 → 2 → 3 → null", "3 → 2 → 1 → null"),
  academic("pyq-2022-03", "Merge Sort", "Sorting", "Medium", "2022", "Semester 4", "Design and Analysis of Algorithms", "Explain and implement merge sort, including its recurrence and time complexity.", ["Google"], "[38, 27, 43, 3]", "[3, 27, 38, 43]"),
  academic("pyq-2022-04", "Binary Tree Traversal", "Trees", "Easy", "2022", "Semester 4", "Data Structures", "Implement preorder, inorder, and postorder traversals for a binary tree.", ["Infosys"], "root = [1, 2, 3]", "[2, 1, 3] (inorder)"),
  academic("pyq-2022-05", "0/1 Knapsack", "Dynamic Programming", "Hard", "2022", "Semester 5", "Design and Analysis of Algorithms", "Find the maximum value that fits within a knapsack when each item can be selected once.", ["Microsoft"], "weights=[2,3], values=[4,5], cap=3", "5"),
  academic("pyq-2023-01", "Maximum Subarray Sum", "Arrays", "Medium", "2023", "Semester 3", "Data Structures", "Find the contiguous subarray with the largest sum using Kadane's algorithm.", ["Amazon", "TCS"], "[-2,1,-3,4,-1,2,1,-5,4]", "6"),
  academic("pyq-2023-02", "Valid Parentheses", "Stacks", "Easy", "2023", "Semester 3", "Data Structures", "Determine whether every opening bracket in a string is closed in the correct order.", ["Google", "Accenture"], "s = '()[]{}'", "true"),
  academic("pyq-2023-03", "Implement a Stack", "Stacks", "Medium", "2023", "Semester 3", "Data Structures", "Design a stack with push, pop, top, and constant-time minimum retrieval.", ["Microsoft"], "push(3), push(1), getMin()", "1"),
  academic("pyq-2023-04", "BFS of a Graph", "Graphs", "Easy", "2023", "Semester 4", "Data Structures", "Traverse an adjacency-list graph breadth-first from a given source vertex.", ["Infosys", "Wipro"], "graph = {0:[1,2],1:[3]}", "0, 1, 2, 3"),
  academic("pyq-2023-05", "Longest Common Subsequence", "Dynamic Programming", "Hard", "2023", "Semester 5", "Design and Analysis of Algorithms", "Find the length of the longest subsequence common to two strings.", ["Amazon", "Google"], "text1='abcde', text2='ace'", "3"),
  academic("pyq-2023-06", "Binary Search", "Searching", "Easy", "2023", "Semester 2", "Programming Fundamentals", "Search a sorted array in logarithmic time and return the matching index.", ["TCS"], "nums=[1,3,5,7], target=5", "2"),
  academic("pyq-2024-01", "Detect a Linked List Cycle", "Linked Lists", "Medium", "2024", "Semester 3", "Data Structures", "Use two pointers to determine whether a linked list contains a cycle.", ["Amazon", "Microsoft"], "head = [3,2,0,-4], pos=1", "true"),
  academic("pyq-2024-02", "Quick Sort", "Sorting", "Medium", "2024", "Semester 4", "Design and Analysis of Algorithms", "Partition an array around a pivot and analyze quick sort's average and worst cases.", ["Google"], "[10, 7, 8, 9, 1, 5]", "[1, 5, 7, 8, 9, 10]"),
  academic("pyq-2024-03", "DFS of a Graph", "Graphs", "Medium", "2024", "Semester 4", "Data Structures", "Implement depth-first traversal recursively and with an explicit stack.", ["Accenture", "Wipro"], "graph = {A:[B,C], B:[D]}", "A, B, D, C"),
  academic("pyq-2024-04", "Dijkstra's Shortest Path", "Graphs", "Hard", "2024", "Semester 5", "Design and Analysis of Algorithms", "Compute shortest paths from a source in a weighted graph with non-negative edges.", ["Amazon", "Google", "Microsoft"], "edges=[A-B:4, A-C:1, C-B:2]", "distance(A,B)=3"),
  academic("pyq-2024-05", "Coin Change", "Dynamic Programming", "Medium", "2024", "Semester 5", "Design and Analysis of Algorithms", "Find the fewest coins needed to make a target amount, or return -1.", ["TCS", "Infosys"], "coins=[1,2,5], amount=11", "3"),
  academic("pyq-2024-06", "Queue using Two Stacks", "Queues", "Medium", "2024", "Semester 3", "Data Structures", "Implement FIFO queue operations using two LIFO stacks.", ["Wipro"], "push(1), push(2), pop()", "1"),
  academic("pyq-2025-01", "Rotate an Array", "Arrays", "Medium", "2025", "Semester 2", "Programming Fundamentals", "Rotate an array to the right by k steps in-place.", ["Amazon", "Accenture"], "nums=[1,2,3,4,5,6,7], k=3", "[5,6,7,1,2,3,4]"),
  academic("pyq-2025-02", "Anagram Check", "Strings", "Easy", "2025", "Semester 2", "Programming Fundamentals", "Check whether two strings contain the same characters with the same frequencies.", ["Infosys", "TCS"], "s='listen', t='silent'", "true"),
  academic("pyq-2025-03", "Implement a Circular Queue", "Queues", "Medium", "2025", "Semester 3", "Data Structures", "Design a fixed-size circular queue with enqueue and dequeue operations.", ["Microsoft"], "capacity=3, enqueue(1), enqueue(2)", "front=1, rear=2"),
  academic("pyq-2025-04", "Build a Binary Search Tree", "Trees", "Medium", "2025", "Semester 4", "Data Structures", "Insert, search, and delete values in a binary search tree.", ["Amazon", "Wipro"], "insert=[5,3,7], search=3", "true"),
  academic("pyq-2025-05", "Activity Selection", "Greedy Algorithms", "Medium", "2025", "Semester 5", "Design and Analysis of Algorithms", "Select the maximum number of non-overlapping activities by finish time.", ["Google"], "activities=[(1,2),(2,4),(3,5)]", "2"),
  academic("pyq-2026-01", "Find Duplicate Number", "Arrays", "Medium", "2026", "Semester 2", "Programming Fundamentals", "Find a repeated value in an array containing n+1 integers without modifying the array.", ["Microsoft", "Amazon"], "nums=[1,3,4,2,2]", "2"),
  academic("pyq-2026-02", "Longest Palindromic Substring", "Strings", "Hard", "2026", "Semester 3", "Data Structures", "Return the longest substring that reads the same forwards and backwards.", ["Google"], "s='babad'", "'bab'"),
  academic("pyq-2026-03", "Evaluate Postfix Expression", "Stacks", "Medium", "2026", "Semester 3", "Data Structures", "Evaluate an arithmetic expression written in postfix notation using a stack.", ["TCS"], "tokens=['2','1','+','3','*']", "9"),
  academic("pyq-2026-04", "Lowest Common Ancestor", "Trees", "Medium", "2026", "Semester 4", "Data Structures", "Find the lowest common ancestor of two nodes in a binary tree.", ["Amazon", "Microsoft"], "root=[3,5,1], p=5, q=1", "3"),
  academic("pyq-2026-05", "Floyd Warshall Algorithm", "Graphs", "Hard", "2026", "Semester 5", "Design and Analysis of Algorithms", "Find all-pairs shortest paths and explain the dynamic programming transition.", ["Google", "Infosys"], "graph matrix", "distance matrix"),
  academic("pyq-2026-06", "Subset Sum", "Dynamic Programming", "Hard", "2026", "Semester 5", "Design and Analysis of Algorithms", "Determine whether a subset reaches an exact target sum.", ["Accenture"], "nums=[3,34,4,12,5,2], target=9", "true"),
  placement("place-01", "Merge Intervals", "Arrays", "Medium", ["Amazon", "Google", "Microsoft"], "Merge all overlapping intervals and return a compact set of non-overlapping ranges.", "intervals=[[1,3],[2,6],[8,10]]", "[[1,6],[8,10]]"),
  placement("place-02", "Top K Frequent Elements", "Hashing", "Medium", ["Amazon", "Google"], "Return the k values that occur most frequently in an integer array.", "nums=[1,1,1,2,2,3], k=2", "[1,2]"),
  placement("place-03", "Trapping Rain Water", "Arrays", "Hard", ["Amazon", "Microsoft"], "Calculate how much water can be trapped between elevation bars after raining.", "height=[0,1,0,2,1,0,1,3]", "6"),
  placement("place-04", "Word Break", "Dynamic Programming", "Medium", ["Google", "Microsoft"], "Determine whether a string can be segmented into dictionary words.", "s='leetcode', dict=['leet','code']", "true"),
  placement("place-05", "Number of Islands", "Graphs", "Medium", ["Amazon", "Microsoft", "TCS"], "Count connected land components in a grid using BFS or DFS.", "grid=[[1,1,0],[0,1,0],[1,0,1]]", "3"),
  placement("place-06", "LRU Cache", "Hashing", "Hard", ["Amazon", "Google", "Microsoft"], "Design a least-recently-used cache with O(1) get and put operations.", "cache.put(1,1), cache.get(1)", "1"),
  placement("place-07", "Kth Largest Element", "Searching", "Medium", ["Amazon", "Accenture"], "Find the kth largest element without fully sorting the input.", "nums=[3,2,1,5,6,4], k=2", "5"),
  placement("place-08", "Climbing Stairs", "Recursion", "Easy", ["TCS", "Infosys", "Wipro"], "Count the distinct ways to reach the top when taking one or two steps at a time.", "n=5", "8"),
  placement("place-09", "Validate Binary Search Tree", "Trees", "Medium", ["Amazon", "Microsoft"], "Check whether a binary tree satisfies strict BST ordering constraints.", "root=[2,1,3]", "true"),
  placement("place-10", "Course Schedule", "Graphs", "Medium", ["Google", "Microsoft"], "Use topological sorting to decide whether all courses can be completed.", "numCourses=2, prerequisites=[[1,0]]", "true"),
  placement("place-11", "Product of Array Except Self", "Arrays", "Medium", ["Amazon", "Google"], "Return products of every array element except itself without division.", "nums=[1,2,3,4]", "[24,12,8,6]"),
  placement("place-12", "First Non-Repeating Character", "Strings", "Easy", ["TCS", "Infosys"], "Return the first character that appears exactly once in a string.", "s='swiss'", "'w'"),
  placement("place-13", "Implement Trie", "Trees", "Medium", ["Google", "Microsoft"], "Implement insert, search, and prefix operations for a trie.", "insert('apple'), startsWith('app')", "true"),
  placement("place-14", "House Robber", "Dynamic Programming", "Medium", ["Amazon", "Accenture"], "Maximize stolen value from non-adjacent houses on a street.", "nums=[2,7,9,3,1]", "12"),
  placement("place-15", "N-Queens", "Backtracking", "Hard", ["Google", "Microsoft"], "Place n queens on an n×n board so that no two queens attack each other.", "n=4", "2 solutions"),
  ...oaQuestions,
];

export const topics = [...new Set(questions.map(q => q.topic))];
export const subjects = ["Data Structures", "Design and Analysis of Algorithms", "Programming Fundamentals"];
export const companies = ["Amazon", "Google", "Microsoft", "TCS", "Infosys", "Accenture", "Wipro"];
export const years = ["2022", "2023", "2024", "2025", "2026"];
export const semesters = ["Semester 2", "Semester 3", "Semester 4", "Semester 5"];
