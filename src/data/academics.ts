import type { Difficulty, Question } from '@/types/question';

// Fictional fixtures, not verified university papers. Each generated question
// belongs to exactly one paper; persisted practice lives in the shared ID Set,
// never in these records. Stable IDs must not be reassigned to different papers.
export interface AcademicSubject { id: string; name: string; semester: number }
export const examinationTypes = ['Internal Assessment 1', 'Internal Assessment 2', 'End-Semester Examination'] as const;
export interface AcademicPaper {
  paperId: string;
  subjectId: string;
  semester: number;
  year: string;
  examinationType: typeof examinationTypes[number];
  title: string;
  questionIds: string[];
}
export interface AcademicQuestion extends Question { paperId: string; subjectId: string; marks: number; format: 'Short answer' | 'Numerical' | 'Long answer' | 'Conceptual' }
export const academicSubjects: AcademicSubject[] = [
  { id: 'math1', name: 'Engineering Mathematics I', semester: 1 },
  { id: 'prog', name: 'Programming Fundamentals', semester: 1 },
  { id: 'physics', name: 'Engineering Physics', semester: 1 },
  { id: 'math2', name: 'Engineering Mathematics II', semester: 2 },
  { id: 'c', name: 'Programming in C', semester: 2 },
  { id: 'electronics', name: 'Basic Electronics', semester: 2 },
  { id: 'ds', name: 'Data Structures', semester: 3 },
  { id: 'discrete', name: 'Discrete Mathematics', semester: 3 },
  { id: 'logic', name: 'Digital Logic Design', semester: 3 },
  { id: 'dbms', name: 'Database Management Systems', semester: 4 },
  { id: 'os', name: 'Operating Systems', semester: 4 },
  { id: 'daa', name: 'Design and Analysis of Algorithms', semester: 4 },
];
type Prompt = [topic: string, statement: string, marks: number, difficulty: Difficulty, format: AcademicQuestion['format']];
type Seed = [subjectId: string, year: string, exam: 0 | 1 | 2, prompts: Prompt[]];
const seeds: Seed[] = [
  ['math1', '2022', 0, [
    ['Differential Calculus', 'Find the first and second derivatives of y = x²eˣ. Identify the stationary points.', 6, 'Medium', 'Numerical'],
    ['Differential Calculus', 'State Rolle’s theorem and verify its conditions for f(x) = x² − 4x + 3 on [1, 3].', 6, 'Medium', 'Long answer'],
    ['Matrices', 'Find the eigenvalues and corresponding eigenvectors of the matrix [[2,1],[1,2]].', 8, 'Medium', 'Numerical'],
    ['Matrices', 'Explain matrix rank and determine the rank of [[1,2,3],[2,4,6],[1,1,1]].', 5, 'Easy', 'Numerical'],
    ['Integral Calculus', 'Evaluate the definite integral of x sin(x) from 0 to π using integration by parts.', 5, 'Medium', 'Numerical'],
  ]],
  ['prog', '2023', 0, [
    ['Algorithms', 'Write pseudocode and draw a flowchart to find the largest of three distinct input numbers.', 6, 'Easy', 'Long answer'],
    ['Algorithms', 'Distinguish an algorithm from a program. State four properties of a well-defined algorithm.', 4, 'Easy', 'Short answer'],
    ['Control Flow', 'Trace a loop that starts with s = 0 and adds i² for i from 1 to 5. Show every intermediate value of s.', 5, 'Easy', 'Numerical'],
    ['Functions', 'Explain parameter passing and return values using a function that computes the greatest common divisor.', 8, 'Medium', 'Long answer'],
    ['Number Systems', 'Convert decimal 45 to binary and hexadecimal. Explain each conversion step.', 7, 'Easy', 'Numerical'],
  ]],
  ['physics', '2024', 2, [
    ['Optics', 'Derive the fringe-width expression for Young’s double-slit experiment, stating the assumptions.', 10, 'Medium', 'Long answer'],
    ['Optics', 'Slits separated by 0.5 mm illuminate a screen 2 m away with 600 nm light. Calculate the fringe width.', 6, 'Medium', 'Numerical'],
    ['Quantum Physics', 'Explain the photoelectric effect and the significance of threshold frequency.', 8, 'Medium', 'Conceptual'],
    ['Quantum Physics', 'Calculate the de Broglie wavelength of an electron moving at 1.0 × 10⁶ m/s. Use h = 6.626 × 10⁻³⁴ J s and m = 9.11 × 10⁻³¹ kg.', 6, 'Medium', 'Numerical'],
    ['Lasers', 'Describe population inversion and stimulated emission. Explain why both are necessary for laser operation.', 10, 'Hard', 'Long answer'],
  ]],
  ['math2', '2025', 1, [
    ['Differential Equations', 'Solve dy/dx + y = eˣ with y(0) = 1 using an integrating factor.', 8, 'Medium', 'Numerical'],
    ['Differential Equations', 'Explain the order and degree of a differential equation, with two examples.', 4, 'Easy', 'Short answer'],
    ['Laplace Transforms', 'Find the Laplace transform of t² + 3 sin(2t), stating the formulas used.', 6, 'Medium', 'Numerical'],
    ['Vector Calculus', 'Compute the divergence and curl of F = (xy, yz, zx).', 6, 'Medium', 'Numerical'],
    ['Multiple Integrals', 'Evaluate the double integral of x + y over 0 ≤ x ≤ 1 and 0 ≤ y ≤ 2.', 6, 'Medium', 'Numerical'],
  ]],
  ['c', '2026', 2, [
    ['Pointers', 'Explain pointer arithmetic for an integer array. Illustrate the difference between p++ and (*p)++.', 8, 'Medium', 'Conceptual'],
    ['Pointers', 'Write a C function that swaps two integers through pointer parameters. Show a call from main.', 6, 'Easy', 'Long answer'],
    ['Structures', 'Define a student structure with roll number, name, and marks. Write code to find the highest-scoring student in an array.', 10, 'Medium', 'Long answer'],
    ['File Handling', 'Explain fopen, fprintf, fscanf, and fclose. Show how to write and read one student record in a text file.', 8, 'Medium', 'Long answer'],
    ['Memory Management', 'Compare malloc and calloc. Explain a memory leak and show how free prevents it in a dynamically allocated array.', 8, 'Hard', 'Long answer'],
  ]],
  ['electronics', '2022', 1, [
    ['Diodes', 'Sketch and explain the forward and reverse bias characteristics of a PN junction diode.', 6, 'Easy', 'Conceptual'],
    ['Diodes', 'A 5 V supply drives a silicon diode and a 1 kΩ resistor in series. Assuming a 0.7 V diode drop, find the current.', 4, 'Easy', 'Numerical'],
    ['Rectifiers', 'Explain a bridge rectifier with a circuit diagram and input/output waveforms.', 8, 'Medium', 'Long answer'],
    ['Transistors', 'For a BJT with current gain β = 100 and base current 20 μA, calculate collector and emitter currents.', 6, 'Medium', 'Numerical'],
    ['Operational Amplifiers', 'Derive the gain of an ideal inverting amplifier and calculate it for Rin = 10 kΩ and Rf = 100 kΩ.', 6, 'Medium', 'Long answer'],
  ]],
  ['ds', '2025', 2, [
    ['Linked Lists', 'Write pseudocode to insert a node at the beginning and delete the last node of a singly linked list. Handle an empty list and a single-node list.', 8, 'Medium', 'Long answer'],
    ['Stacks', 'Convert A + B * (C − D) to postfix using a stack. Show the operator stack after each token.', 6, 'Medium', 'Long answer'],
    ['Trees', 'Insert 40, 20, 60, 10, 30, 50, 70 into an empty binary search tree. Draw the tree and give its inorder traversal.', 8, 'Medium', 'Long answer'],
    ['Trees', 'Explain the AVL balance factor. Insert 30, 20, 10 into an empty AVL tree and show the rotation needed to restore balance.', 10, 'Hard', 'Long answer'],
    ['Graphs', 'For the undirected graph with edges A–B, A–C, B–D, C–D, and D–E, perform BFS from A using alphabetical neighbour order. Show the queue at each step.', 8, 'Medium', 'Long answer'],
  ]],
  ['discrete', '2023', 2, [
    ['Logic', 'Construct a truth table to verify that p → q is equivalent to ¬p ∨ q.', 6, 'Easy', 'Conceptual'],
    ['Relations', 'On the integers, define aRb when a − b is divisible by 3. Prove R is an equivalence relation and describe its classes.', 10, 'Hard', 'Long answer'],
    ['Combinatorics', 'How many five-character strings can be made from A, B, C, D without repetition? Explain why the answer changes if repetition is allowed.', 6, 'Medium', 'Numerical'],
    ['Graph Theory', 'State the handshaking lemma. Can a simple undirected graph have vertex degrees 3, 3, 2, 1? Justify.', 8, 'Medium', 'Conceptual'],
    ['Recurrences', 'Solve aₙ = 2aₙ₋₁ + 1 for n ≥ 1 with a₀ = 0, and verify the first four terms.', 10, 'Medium', 'Long answer'],
  ]],
  ['logic', '2024', 0, [
    ['Boolean Algebra', 'Simplify F = AB + AB̅ + A̅B using Boolean identities. Draw the simplified gate circuit.', 6, 'Easy', 'Long answer'],
    ['Karnaugh Maps', 'Minimize F(A,B,C) = Σm(1,3,5,7) using a three-variable Karnaugh map.', 6, 'Medium', 'Numerical'],
    ['Combinational Circuits', 'Design a full adder. Provide its truth table and expressions for sum and carry.', 8, 'Medium', 'Long answer'],
    ['Sequential Circuits', 'Compare combinational and sequential circuits, with one application of each.', 4, 'Easy', 'Short answer'],
    ['Sequential Circuits', 'Explain the characteristic table of a JK flip-flop and the race-around condition.', 6, 'Medium', 'Conceptual'],
  ]],
  ['dbms', '2025', 2, [
    ['Relational Model', 'For Student(sid, name, dept) and Enrolment(sid, course, grade), identify suitable primary and foreign keys. Explain referential integrity.', 6, 'Easy', 'Conceptual'],
    ['SQL', 'Using Student(sid, name, dept) and Enrolment(sid, course, grade), write SQL to list names of students enrolled in DBMS without duplicate names.', 8, 'Medium', 'Long answer'],
    ['Normalization', 'For R(A,B,C) with dependencies A → B and B → C, identify a candidate key and decompose R into 3NF. Explain the violation removed.', 10, 'Hard', 'Long answer'],
    ['Transactions', 'Explain ACID properties with an example of transferring money between two bank accounts.', 8, 'Medium', 'Long answer'],
    ['Indexing', 'Compare a full table scan with a B+ tree index lookup. Discuss when an index may not improve performance.', 8, 'Medium', 'Conceptual'],
  ]],
  ['os', '2026', 1, [
    ['Scheduling', 'Processes P1, P2, P3 arrive at time 0 with burst times 5, 3, 2. Under non-preemptive FCFS in that order, draw the Gantt chart and compute average waiting time.', 8, 'Medium', 'Numerical'],
    ['Synchronization', 'Explain the critical-section problem and its three correctness requirements.', 6, 'Medium', 'Conceptual'],
    ['Deadlocks', 'State the four necessary conditions for deadlock and explain how resource ordering prevents circular wait.', 6, 'Medium', 'Long answer'],
    ['Memory Management', 'Using three initially empty frames and FIFO replacement, count page faults for 1, 2, 3, 1, 4, 2, 5. Show frame contents after every reference.', 6, 'Hard', 'Numerical'],
    ['File Systems', 'Compare contiguous and linked file allocation in terms of random access, fragmentation, and growth.', 4, 'Easy', 'Short answer'],
  ]],
  ['daa', '2024', 2, [
    ['Complexity', 'Solve T(n) = 2T(n/2) + n with T(1) = 1 using a recursion tree. State the asymptotic bound.', 8, 'Medium', 'Long answer'],
    ['Greedy Algorithms', 'Apply activity selection to intervals (1,3), (2,5), (4,7), (6,9), (8,10), treating an activity starting at the previous finish as compatible. Show your selection order.', 8, 'Medium', 'Long answer'],
    ['Dynamic Programming', 'Solve 0/1 knapsack for capacity 5, weights [2,3,4], and values [3,4,5]. Show the DP table and selected items.', 10, 'Hard', 'Long answer'],
    ['Graph Algorithms', 'Explain why Dijkstra’s algorithm requires non-negative edge weights. Give a counterexample with a negative edge and no negative cycle.', 8, 'Hard', 'Conceptual'],
    ['Complexity Classes', 'Distinguish P, NP, NP-hard, and NP-complete. Explain what must be shown to prove a problem NP-complete.', 6, 'Hard', 'Conceptual'],
  ]],
  ['ds', '2023', 0, [
    ['Arrays', 'Derive the address formula for A[i][j] stored in row-major order with R rows and C columns, zero-based indices, base address B, and element size w.', 6, 'Medium', 'Long answer'],
    ['Linked Lists', 'Compare arrays and linked lists for indexed access, insertion, and memory overhead.', 4, 'Easy', 'Short answer'],
    ['Stacks', 'Write pseudocode for balanced-parenthesis checking with a stack. Trace it for (()()).', 8, 'Medium', 'Long answer'],
    ['Queues', 'Describe a circular queue of capacity 5 using a count variable. Show enqueue and dequeue conditions.', 6, 'Medium', 'Long answer'],
    ['Trees', 'Define height, depth, leaf, and degree in a rooted tree. Illustrate each using a tree of your choice.', 6, 'Easy', 'Conceptual'],
  ]],
  ['ds', '2024', 1, [
    ['Trees', 'Construct a binary tree from preorder [A,B,D,E,C] and inorder [D,B,E,A,C]. Give its postorder traversal.', 8, 'Medium', 'Long answer'],
    ['Trees', 'Explain why searching a skewed binary search tree can take O(n) time, while a balanced tree takes O(log n).', 4, 'Easy', 'Conceptual'],
    ['Hashing', 'Insert keys 12, 22, 32, 15 into a size-10 hash table using h(k) = k mod 10 and linear probing. Show the resulting table.', 6, 'Medium', 'Numerical'],
    ['Graphs', 'Represent a graph with edges A–B, B–C, C–A, C–D using adjacency lists and an adjacency matrix. Compare space costs.', 6, 'Medium', 'Long answer'],
    ['Heaps', 'Build a max heap by successively inserting 10, 30, 20, 5, 40. Show the heap after each insertion.', 6, 'Medium', 'Long answer'],
  ]],
];

export const academicPapers: AcademicPaper[] = [];
export const academicQuestions: AcademicQuestion[] = [];
for (const [subjectId, year, exam, prompts] of seeds) {
  const subject = academicSubjects.find(s => s.id === subjectId)!;
  const paperId = `academic-${subjectId}-${year}-${exam}`;
  const questionIds = prompts.map((_, index) => `${paperId}-q${index + 1}`);
  academicPapers.push({ paperId, subjectId, semester: subject.semester, year, examinationType: examinationTypes[exam], title: `${subject.name} — ${year}`, questionIds });
  prompts.forEach(([topic, description, marks, difficulty, format], index) => {
    academicQuestions.push({ id: questionIds[index], paperId, subjectId, title: `${subject.name} · Question ${index + 1}`, description, topic, marks, difficulty, format, year, semester: `Semester ${subject.semester}`, subject: subject.name, companies: [], type: 'Academic PYQ', questionType: 'informational' });
  });
}
export const academicQuestionById = new Map(academicQuestions.map(q => [q.id, q]));
export const academicPaperById = new Map(academicPapers.map(p => [p.paperId, p]));
