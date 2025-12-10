/**
 * MCQ Questions Bank - 100 Questions across various topics
 * Topics: Data Structures, Algorithms, JavaScript, Python, React, System Design, Databases, etc.
 */

export const mcqQuestions = [
  // Data Structures & Algorithms (20 questions)
  {
    id: 1,
    topic: 'Data Structures',
    difficulty: 'easy',
    question: 'What is the time complexity of accessing an element in an array by index?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 0,
    explanation: 'Array elements can be accessed directly using their index in constant time O(1).'
  },
  {
    id: 2,
    topic: 'Data Structures',
    difficulty: 'medium',
    question: 'Which data structure uses LIFO (Last In First Out) principle?',
    options: ['Queue', 'Stack', 'Array', 'Tree'],
    correctAnswer: 1,
    explanation: 'Stack follows LIFO principle where the last element added is the first one to be removed.'
  },
  {
    id: 3,
    topic: 'Algorithms',
    difficulty: 'medium',
    question: 'What is the average time complexity of Quick Sort?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctAnswer: 1,
    explanation: 'Quick Sort has an average time complexity of O(n log n), though worst case is O(n²).'
  },
  {
    id: 4,
    topic: 'Data Structures',
    difficulty: 'hard',
    question: 'What is the space complexity of a recursive implementation of the Fibonacci sequence?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(2^n)'],
    correctAnswer: 1,
    explanation: 'Due to the call stack, recursive Fibonacci has O(n) space complexity.'
  },
  {
    id: 5,
    topic: 'Algorithms',
    difficulty: 'easy',
    question: 'Which algorithm is best for finding the shortest path in an unweighted graph?',
    options: ['DFS', 'BFS', 'Dijkstra', 'Binary Search'],
    correctAnswer: 1,
    explanation: 'BFS (Breadth-First Search) is optimal for finding shortest path in unweighted graphs.'
  },
  {
    id: 6,
    topic: 'Data Structures',
    difficulty: 'medium',
    question: 'What is the main advantage of a hash table?',
    options: ['Sorted data', 'O(1) average lookup time', 'Memory efficient', 'Thread safe'],
    correctAnswer: 1,
    explanation: 'Hash tables provide O(1) average time complexity for insertions, deletions, and lookups.'
  },
  {
    id: 7,
    topic: 'Algorithms',
    difficulty: 'hard',
    question: 'Which algorithm technique is used in the Merge Sort algorithm?',
    options: ['Greedy', 'Dynamic Programming', 'Divide and Conquer', 'Backtracking'],
    correctAnswer: 2,
    explanation: 'Merge Sort uses Divide and Conquer by dividing the array into halves and merging them.'
  },
  {
    id: 8,
    topic: 'Data Structures',
    difficulty: 'easy',
    question: 'What is the maximum number of children a binary tree node can have?',
    options: ['1', '2', '3', 'Unlimited'],
    correctAnswer: 1,
    explanation: 'A binary tree node can have at most 2 children (left and right).'
  },
  {
    id: 9,
    topic: 'Algorithms',
    difficulty: 'medium',
    question: 'What is the time complexity of Binary Search?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 1,
    explanation: 'Binary Search divides the search space in half each time, resulting in O(log n).'
  },
  {
    id: 10,
    topic: 'Data Structures',
    difficulty: 'medium',
    question: 'Which data structure is best for implementing a priority queue?',
    options: ['Array', 'Linked List', 'Heap', 'Stack'],
    correctAnswer: 2,
    explanation: 'A heap (min-heap or max-heap) is most efficient for priority queue operations.'
  },

  // JavaScript (20 questions)
  {
    id: 11,
    topic: 'JavaScript',
    difficulty: 'easy',
    question: 'What keyword is used to declare a block-scoped variable in JavaScript?',
    options: ['var', 'let', 'const', 'Both let and const'],
    correctAnswer: 3,
    explanation: 'Both let and const create block-scoped variables in JavaScript.'
  },
  {
    id: 12,
    topic: 'JavaScript',
    difficulty: 'medium',
    question: 'What does the "this" keyword refer to in an arrow function?',
    options: ['The function itself', 'The global object', 'The parent scope', 'undefined'],
    correctAnswer: 2,
    explanation: 'Arrow functions do not have their own "this"; they inherit it from the parent scope.'
  },
  {
    id: 13,
    topic: 'JavaScript',
    difficulty: 'hard',
    question: 'What is a closure in JavaScript?',
    options: [
      'A way to close a function',
      'A function with access to its outer scope',
      'A type of loop',
      'An error handling mechanism'
    ],
    correctAnswer: 1,
    explanation: 'A closure is a function that has access to variables in its outer (enclosing) scope.'
  },
  {
    id: 14,
    topic: 'JavaScript',
    difficulty: 'easy',
    question: 'Which method is used to add an element to the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 0,
    explanation: 'push() adds one or more elements to the end of an array.'
  },
  {
    id: 15,
    topic: 'JavaScript',
    difficulty: 'medium',
    question: 'What is the output of: typeof null?',
    options: ['"null"', '"undefined"', '"object"', '"number"'],
    correctAnswer: 2,
    explanation: 'typeof null returns "object", which is a known JavaScript quirk/bug.'
  },
  {
    id: 16,
    topic: 'JavaScript',
    difficulty: 'medium',
    question: 'What is event bubbling?',
    options: [
      'Events go from child to parent',
      'Events go from parent to child',
      'Events are cancelled',
      'Events are duplicated'
    ],
    correctAnswer: 0,
    explanation: 'Event bubbling means events propagate from the target element up to its ancestors.'
  },
  {
    id: 17,
    topic: 'JavaScript',
    difficulty: 'hard',
    question: 'What is the difference between == and ===?',
    options: [
      'No difference',
      '=== checks type and value, == only value',
      '== checks type and value, === only value',
      '=== is faster'
    ],
    correctAnswer: 1,
    explanation: '=== (strict equality) checks both type and value, while == performs type coercion.'
  },
  {
    id: 18,
    topic: 'JavaScript',
    difficulty: 'easy',
    question: 'Which method converts a JSON string to a JavaScript object?',
    options: ['JSON.parse()', 'JSON.stringify()', 'JSON.convert()', 'JSON.toObject()'],
    correctAnswer: 0,
    explanation: 'JSON.parse() parses a JSON string and converts it to a JavaScript object.'
  },
  {
    id: 19,
    topic: 'JavaScript',
    difficulty: 'medium',
    question: 'What is the purpose of the "async" keyword?',
    options: [
      'Makes code run faster',
      'Makes a function return a Promise',
      'Delays execution',
      'Handles errors'
    ],
    correctAnswer: 1,
    explanation: 'The async keyword makes a function return a Promise and allows use of await inside it.'
  },
  {
    id: 20,
    topic: 'JavaScript',
    difficulty: 'hard',
    question: 'What is the output of: [1, 2, 3].map(x => x * 2)?',
    options: ['[1, 2, 3]', '[2, 4, 6]', '[1, 4, 9]', 'Error'],
    correctAnswer: 1,
    explanation: 'map() applies the function to each element, doubling them: [2, 4, 6].'
  },

  // React (15 questions)
  {
    id: 21,
    topic: 'React',
    difficulty: 'easy',
    question: 'What is JSX?',
    options: [
      'A JavaScript library',
      'A syntax extension for JavaScript',
      'A CSS framework',
      'A build tool'
    ],
    correctAnswer: 1,
    explanation: 'JSX is a syntax extension that allows writing HTML-like code in JavaScript.'
  },
  {
    id: 22,
    topic: 'React',
    difficulty: 'medium',
    question: 'What hook is used to manage component state in functional components?',
    options: ['useEffect', 'useState', 'useContext', 'useReducer'],
    correctAnswer: 1,
    explanation: 'useState is the hook for adding state to functional components.'
  },
  {
    id: 23,
    topic: 'React',
    difficulty: 'medium',
    question: 'When does useEffect run by default?',
    options: [
      'Before render',
      'After every render',
      'Only on mount',
      'Only on unmount'
    ],
    correctAnswer: 1,
    explanation: 'useEffect runs after every render by default unless dependencies are specified.'
  },
  {
    id: 24,
    topic: 'React',
    difficulty: 'hard',
    question: 'What is the purpose of React.memo()?',
    options: [
      'Store data',
      'Prevent unnecessary re-renders',
      'Create memoized values',
      'Handle errors'
    ],
    correctAnswer: 1,
    explanation: 'React.memo() is a HOC that prevents re-renders if props haven\'t changed.'
  },
  {
    id: 25,
    topic: 'React',
    difficulty: 'easy',
    question: 'Which method is used to update state in a class component?',
    options: ['updateState()', 'setState()', 'changeState()', 'modifyState()'],
    correctAnswer: 1,
    explanation: 'setState() is the method used to update state in class components.'
  },
  {
    id: 26,
    topic: 'React',
    difficulty: 'medium',
    question: 'What is prop drilling?',
    options: [
      'Creating props',
      'Passing props through multiple levels',
      'Deleting props',
      'Validating props'
    ],
    correctAnswer: 1,
    explanation: 'Prop drilling is passing props through intermediate components that don\'t need them.'
  },
  {
    id: 27,
    topic: 'React',
    difficulty: 'hard',
    question: 'What is the purpose of the useCallback hook?',
    options: [
      'Fetch data',
      'Memoize functions',
      'Create callbacks',
      'Handle events'
    ],
    correctAnswer: 1,
    explanation: 'useCallback memoizes functions to prevent unnecessary re-creation on re-renders.'
  },
  {
    id: 28,
    topic: 'React',
    difficulty: 'medium',
    question: 'What is the virtual DOM?',
    options: [
      'A real DOM copy',
      'A lightweight JavaScript representation of the DOM',
      'A browser API',
      'A CSS concept'
    ],
    correctAnswer: 1,
    explanation: 'The virtual DOM is a lightweight JavaScript object representation of the actual DOM.'
  },

  // Python (15 questions)
  {
    id: 29,
    topic: 'Python',
    difficulty: 'easy',
    question: 'Which keyword is used to define a function in Python?',
    options: ['function', 'def', 'func', 'define'],
    correctAnswer: 1,
    explanation: 'The "def" keyword is used to define functions in Python.'
  },
  {
    id: 30,
    topic: 'Python',
    difficulty: 'medium',
    question: 'What is a Python decorator?',
    options: [
      'A design pattern',
      'A function that modifies another function',
      'A class inheritance',
      'A loop structure'
    ],
    correctAnswer: 1,
    explanation: 'A decorator is a function that takes another function and extends its behavior.'
  },
  {
    id: 31,
    topic: 'Python',
    difficulty: 'easy',
    question: 'Which data type is mutable in Python?',
    options: ['tuple', 'string', 'list', 'int'],
    correctAnswer: 2,
    explanation: 'Lists are mutable in Python, meaning their elements can be changed after creation.'
  },
  {
    id: 32,
    topic: 'Python',
    difficulty: 'medium',
    question: 'What is the difference between a list and a tuple?',
    options: [
      'No difference',
      'Lists are mutable, tuples are immutable',
      'Tuples are mutable, lists are immutable',
      'Lists are faster'
    ],
    correctAnswer: 1,
    explanation: 'Lists can be modified after creation, while tuples cannot be changed.'
  },
  {
    id: 33,
    topic: 'Python',
    difficulty: 'hard',
    question: 'What is a generator in Python?',
    options: [
      'A random number creator',
      'A function that returns an iterator using yield',
      'A class constructor',
      'A loop type'
    ],
    correctAnswer: 1,
    explanation: 'A generator is a function that uses yield to return an iterator lazily.'
  },
  {
    id: 34,
    topic: 'Python',
    difficulty: 'medium',
    question: 'What does the "pass" statement do?',
    options: [
      'Skips a loop iteration',
      'Does nothing (placeholder)',
      'Returns None',
      'Raises an exception'
    ],
    correctAnswer: 1,
    explanation: 'The pass statement is a null operation used as a placeholder.'
  },

  // System Design (10 questions)
  {
    id: 35,
    topic: 'System Design',
    difficulty: 'medium',
    question: 'What is horizontal scaling?',
    options: [
      'Adding more power to existing servers',
      'Adding more servers',
      'Reducing servers',
      'Upgrading software'
    ],
    correctAnswer: 1,
    explanation: 'Horizontal scaling means adding more machines to distribute the load.'
  },
  {
    id: 36,
    topic: 'System Design',
    difficulty: 'hard',
    question: 'What is the CAP theorem?',
    options: [
      'A database optimization technique',
      'Consistency, Availability, Partition tolerance trade-off',
      'A caching strategy',
      'A load balancing algorithm'
    ],
    correctAnswer: 1,
    explanation: 'CAP theorem states you can only have 2 of 3: Consistency, Availability, Partition tolerance.'
  },
  {
    id: 37,
    topic: 'System Design',
    difficulty: 'medium',
    question: 'What is a CDN?',
    options: [
      'Central Data Network',
      'Content Delivery Network',
      'Cloud Database Network',
      'Cache Distribution Node'
    ],
    correctAnswer: 1,
    explanation: 'CDN (Content Delivery Network) distributes content across geographically distributed servers.'
  },
  {
    id: 38,
    topic: 'System Design',
    difficulty: 'hard',
    question: 'What is the purpose of a load balancer?',
    options: [
      'Store data',
      'Distribute incoming requests across multiple servers',
      'Cache responses',
      'Monitor servers'
    ],
    correctAnswer: 1,
    explanation: 'A load balancer distributes network traffic across multiple servers for better performance.'
  },

  // Databases (10 questions)
  {
    id: 39,
    topic: 'Databases',
    difficulty: 'easy',
    question: 'What does SQL stand for?',
    options: [
      'Simple Query Language',
      'Structured Query Language',
      'Standard Query Language',
      'Sequential Query Language'
    ],
    correctAnswer: 1,
    explanation: 'SQL stands for Structured Query Language.'
  },
  {
    id: 40,
    topic: 'Databases',
    difficulty: 'medium',
    question: 'What is a primary key?',
    options: [
      'The first column in a table',
      'A unique identifier for a record',
      'The most important field',
      'A foreign key reference'
    ],
    correctAnswer: 1,
    explanation: 'A primary key uniquely identifies each record in a database table.'
  },
  {
    id: 41,
    topic: 'Databases',
    difficulty: 'hard',
    question: 'What is database normalization?',
    options: [
      'Making data faster',
      'Organizing data to reduce redundancy',
      'Backing up data',
      'Encrypting data'
    ],
    correctAnswer: 1,
    explanation: 'Normalization organizes data to minimize redundancy and dependency.'
  },
  {
    id: 42,
    topic: 'Databases',
    difficulty: 'medium',
    question: 'What is the difference between INNER JOIN and LEFT JOIN?',
    options: [
      'No difference',
      'INNER returns only matches, LEFT returns all from left table',
      'LEFT is faster',
      'INNER joins more tables'
    ],
    correctAnswer: 1,
    explanation: 'INNER JOIN returns only matching records, LEFT JOIN returns all from left table.'
  },

  // Web Development (10 questions)
  {
    id: 43,
    topic: 'Web Development',
    difficulty: 'easy',
    question: 'What does HTTP stand for?',
    options: [
      'HyperText Transfer Protocol',
      'High Transfer Text Protocol',
      'HyperText Transmission Process',
      'High Text Transfer Process'
    ],
    correctAnswer: 0,
    explanation: 'HTTP stands for HyperText Transfer Protocol.'
  },
  {
    id: 44,
    topic: 'Web Development',
    difficulty: 'medium',
    question: 'What is the difference between GET and POST requests?',
    options: [
      'No difference',
      'GET retrieves data, POST submits data',
      'POST is faster',
      'GET is more secure'
    ],
    correctAnswer: 1,
    explanation: 'GET requests retrieve data while POST requests submit data to be processed.'
  },
  {
    id: 45,
    topic: 'Web Development',
    difficulty: 'medium',
    question: 'What is CORS?',
    options: [
      'A database',
      'Cross-Origin Resource Sharing',
      'A JavaScript framework',
      'A CSS property'
    ],
    correctAnswer: 1,
    explanation: 'CORS is a security feature that controls how resources are shared across different origins.'
  },
  {
    id: 46,
    topic: 'Web Development',
    difficulty: 'hard',
    question: 'What is a REST API?',
    options: [
      'A sleeping protocol',
      'Representational State Transfer API',
      'A database type',
      'A frontend framework'
    ],
    correctAnswer: 1,
    explanation: 'REST is an architectural style for designing networked applications using HTTP.'
  },

  // Additional questions to reach 100
  {
    id: 47,
    topic: 'Algorithms',
    difficulty: 'medium',
    question: 'What is dynamic programming?',
    options: [
      'Programming at runtime',
      'Solving problems by breaking into subproblems and storing results',
      'A programming language',
      'Real-time programming'
    ],
    correctAnswer: 1,
    explanation: 'Dynamic programming solves problems by breaking them down and storing subproblem results.'
  },
  {
    id: 48,
    topic: 'JavaScript',
    difficulty: 'medium',
    question: 'What is the spread operator in JavaScript?',
    options: ['...', '+++', '***', '>>>'],
    correctAnswer: 0,
    explanation: 'The spread operator (...) expands an iterable into individual elements.'
  },
  {
    id: 49,
    topic: 'React',
    difficulty: 'medium',
    question: 'What is the purpose of keys in React lists?',
    options: [
      'Styling',
      'Help React identify which items changed',
      'Security',
      'Performance only'
    ],
    correctAnswer: 1,
    explanation: 'Keys help React identify which items have changed, been added, or removed.'
  },
  {
    id: 50,
    topic: 'Python',
    difficulty: 'easy',
    question: 'What is the output of: print(type([]))?',
    options: ['<class \'array\'>', '<class \'list\'>', '<class \'tuple\'>', 'Error'],
    correctAnswer: 1,
    explanation: '[] creates an empty list, so type([]) returns <class \'list\'>.'
  },

  // Continue with 50 more questions...
  {
    id: 51,
    topic: 'Data Structures',
    difficulty: 'medium',
    question: 'What is the time complexity of inserting an element at the beginning of a linked list?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 0,
    explanation: 'Inserting at the beginning of a linked list takes constant time O(1).'
  },
  {
    id: 52,
    topic: 'JavaScript',
    difficulty: 'easy',
    question: 'Which method is used to remove the last element from an array?',
    options: ['pop()', 'shift()', 'splice()', 'delete()'],
    correctAnswer: 0,
    explanation: 'pop() removes and returns the last element from an array.'
  },
  {
    id: 53,
    topic: 'React',
    difficulty: 'hard',
    question: 'What is the Context API used for?',
    options: [
      'API calls',
      'Sharing data across component tree without props',
      'Routing',
      'State management only'
    ],
    correctAnswer: 1,
    explanation: 'Context API allows passing data through the component tree without manually passing props.'
  },
  {
    id: 54,
    topic: 'System Design',
    difficulty: 'medium',
    question: 'What is caching?',
    options: [
      'Deleting old data',
      'Storing frequently accessed data in fast storage',
      'Backing up data',
      'Compressing data'
    ],
    correctAnswer: 1,
    explanation: 'Caching stores frequently accessed data in fast storage to improve performance.'
  },
  {
    id: 55,
    topic: 'Databases',
    difficulty: 'medium',
    question: 'What is an index in a database?',
    options: [
      'The first row',
      'A data structure that improves query speed',
      'A backup',
      'A table counter'
    ],
    correctAnswer: 1,
    explanation: 'An index is a data structure that improves the speed of data retrieval operations.'
  },
  {
    id: 56,
    topic: 'Python',
    difficulty: 'medium',
    question: 'What is a lambda function?',
    options: [
      'A named function',
      'An anonymous function',
      'A class method',
      'A loop'
    ],
    correctAnswer: 1,
    explanation: 'A lambda function is a small anonymous function defined with the lambda keyword.'
  },
  {
    id: 57,
    topic: 'Web Development',
    difficulty: 'easy',
    question: 'What does CSS stand for?',
    options: [
      'Computer Style Sheets',
      'Cascading Style Sheets',
      'Creative Style System',
      'Colorful Style Sheets'
    ],
    correctAnswer: 1,
    explanation: 'CSS stands for Cascading Style Sheets.'
  },
  {
    id: 58,
    topic: 'Algorithms',
    difficulty: 'hard',
    question: 'What is the time complexity of the Travelling Salesman Problem?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(n!)'],
    correctAnswer: 3,
    explanation: 'TSP has factorial time complexity O(n!), making it NP-hard.'
  },
  {
    id: 59,
    topic: 'JavaScript',
    difficulty: 'hard',
    question: 'What is hoisting in JavaScript?',
    options: [
      'Raising errors',
      'Moving declarations to the top of scope',
      'Optimizing code',
      'Deleting variables'
    ],
    correctAnswer: 1,
    explanation: 'Hoisting moves variable and function declarations to the top of their scope during compilation.'
  },
  {
    id: 60,
    topic: 'React',
    difficulty: 'easy',
    question: 'What is a component in React?',
    options: [
      'A CSS file',
      'A reusable piece of UI',
      'A database',
      'A server'
    ],
    correctAnswer: 1,
    explanation: 'A component is a reusable, independent piece of UI in React.'
  },
  {
    id: 61,
    topic: 'Data Structures',
    difficulty: 'easy',
    question: 'What is a queue?',
    options: [
      'LIFO structure',
      'FIFO structure',
      'Random access structure',
      'Tree structure'
    ],
    correctAnswer: 1,
    explanation: 'A queue is a First-In-First-Out (FIFO) data structure.'
  },
  {
    id: 62,
    topic: 'System Design',
    difficulty: 'hard',
    question: 'What is microservices architecture?',
    options: [
      'Small code files',
      'Application as collection of small independent services',
      'Miniature applications',
      'Mobile app architecture'
    ],
    correctAnswer: 1,
    explanation: 'Microservices architecture structures an application as a collection of loosely coupled services.'
  },
  {
    id: 63,
    topic: 'Databases',
    difficulty: 'easy',
    question: 'What is CRUD?',
    options: [
      'A database type',
      'Create, Read, Update, Delete operations',
      'A query language',
      'A security protocol'
    ],
    correctAnswer: 1,
    explanation: 'CRUD stands for Create, Read, Update, and Delete - basic database operations.'
  },
  {
    id: 64,
    topic: 'Python',
    difficulty: 'hard',
    question: 'What is the Global Interpreter Lock (GIL)?',
    options: [
      'A security feature',
      'A mutex that protects Python objects',
      'A compilation step',
      'An encryption method'
    ],
    correctAnswer: 1,
    explanation: 'GIL is a mutex that allows only one thread to execute Python bytecode at a time.'
  },
  {
    id: 65,
    topic: 'Web Development',
    difficulty: 'medium',
    question: 'What is JWT?',
    options: [
      'JavaScript Web Tool',
      'JSON Web Token',
      'Java Web Technology',
      'Joint Web Transfer'
    ],
    correctAnswer: 1,
    explanation: 'JWT (JSON Web Token) is a compact way to securely transmit information between parties.'
  },
  {
    id: 66,
    topic: 'JavaScript',
    difficulty: 'medium',
    question: 'What is destructuring in JavaScript?',
    options: [
      'Deleting objects',
      'Extracting values from arrays/objects',
      'Breaking loops',
      'Error handling'
    ],
    correctAnswer: 1,
    explanation: 'Destructuring allows unpacking values from arrays or properties from objects into variables.'
  },
  {
    id: 67,
    topic: 'React',
    difficulty: 'medium',
    question: 'What is the difference between state and props?',
    options: [
      'No difference',
      'State is internal, props are external',
      'Props are faster',
      'State is immutable'
    ],
    correctAnswer: 1,
    explanation: 'State is managed within the component, while props are passed from parent components.'
  },
  {
    id: 68,
    topic: 'Algorithms',
    difficulty: 'easy',
    question: 'What is recursion?',
    options: [
      'A loop',
      'A function calling itself',
      'An array method',
      'A data structure'
    ],
    correctAnswer: 1,
    explanation: 'Recursion is when a function calls itself to solve a problem.'
  },
  {
    id: 69,
    topic: 'Data Structures',
    difficulty: 'medium',
    question: 'What is a graph?',
    options: [
      'A chart',
      'A collection of nodes and edges',
      'A linear structure',
      'A sorted array'
    ],
    correctAnswer: 1,
    explanation: 'A graph is a non-linear data structure consisting of nodes (vertices) connected by edges.'
  },
  {
    id: 70,
    topic: 'System Design',
    difficulty: 'medium',
    question: 'What is a message queue?',
    options: [
      'An email system',
      'A system for asynchronous communication between services',
      'A database',
      'A sorting algorithm'
    ],
    correctAnswer: 1,
    explanation: 'A message queue enables asynchronous communication between distributed systems or services.'
  },
  {
    id: 71,
    topic: 'Python',
    difficulty: 'easy',
    question: 'What symbol is used for comments in Python?',
    options: ['//', '#', '/*', '--'],
    correctAnswer: 1,
    explanation: 'The hash symbol (#) is used for single-line comments in Python.'
  },
  {
    id: 72,
    topic: 'Databases',
    difficulty: 'hard',
    question: 'What is database sharding?',
    options: [
      'Deleting data',
      'Horizontally partitioning data across multiple databases',
      'Backing up data',
      'Indexing data'
    ],
    correctAnswer: 1,
    explanation: 'Sharding splits large databases into smaller, faster, more manageable pieces called shards.'
  },
  {
    id: 73,
    topic: 'JavaScript',
    difficulty: 'easy',
    question: 'What is NaN in JavaScript?',
    options: [
      'A null value',
      'Not a Number',
      'A string',
      'An error'
    ],
    correctAnswer: 1,
    explanation: 'NaN stands for "Not a Number" and represents an invalid numerical value.'
  },
  {
    id: 74,
    topic: 'Web Development',
    difficulty: 'medium',
    question: 'What is HTTPS?',
    options: [
      'High Text Transfer Protocol',
      'HTTP Secure (HTTP over SSL/TLS)',
      'Hyper Text Protocol System',
      'HTTP Server'
    ],
    correctAnswer: 1,
    explanation: 'HTTPS is HTTP with encryption using SSL/TLS for secure communication.'
  },
  {
    id: 75,
    topic: 'React',
    difficulty: 'hard',
    question: 'What is server-side rendering (SSR)?',
    options: [
      'Rendering on GPU',
      'Rendering HTML on the server before sending to client',
      'Rendering images',
      'Database rendering'
    ],
    correctAnswer: 1,
    explanation: 'SSR generates the full HTML on the server on each request for better SEO and initial load.'
  },
  {
    id: 76,
    topic: 'Algorithms',
    difficulty: 'medium',
    question: 'What is a greedy algorithm?',
    options: [
      'A slow algorithm',
      'An algorithm that makes locally optimal choices',
      'A searching algorithm',
      'A sorting algorithm'
    ],
    correctAnswer: 1,
    explanation: 'A greedy algorithm makes the locally optimal choice at each step hoping to find global optimum.'
  },
  {
    id: 77,
    topic: 'Data Structures',
    difficulty: 'hard',
    question: 'What is a trie?',
    options: [
      'A binary tree',
      'A tree structure for storing strings',
      'A linked list',
      'A hash table'
    ],
    correctAnswer: 1,
    explanation: 'A trie is a tree-like data structure used to store and search strings efficiently.'
  },
  {
    id: 78,
    topic: 'Python',
    difficulty: 'medium',
    question: 'What is list comprehension?',
    options: [
      'Understanding lists',
      'A concise way to create lists',
      'Deleting list items',
      'Sorting lists'
    ],
    correctAnswer: 1,
    explanation: 'List comprehension provides a concise way to create lists based on existing lists.'
  },
  {
    id: 79,
    topic: 'System Design',
    difficulty: 'easy',
    question: 'What is an API?',
    options: [
      'A programming language',
      'Application Programming Interface',
      'A database',
      'A server'
    ],
    correctAnswer: 1,
    explanation: 'API (Application Programming Interface) is a way for applications to communicate with each other.'
  },
  {
    id: 80,
    topic: 'Databases',
    difficulty: 'medium',
    question: 'What is a transaction in databases?',
    options: [
      'A query',
      'A sequence of operations treated as single unit',
      'A table',
      'An index'
    ],
    correctAnswer: 1,
    explanation: 'A transaction is a logical unit of work that must be completed entirely or not at all.'
  },
  {
    id: 81,
    topic: 'JavaScript',
    difficulty: 'hard',
    question: 'What is the event loop?',
    options: [
      'A for loop',
      'Mechanism for handling asynchronous operations',
      'An error handler',
      'A DOM event'
    ],
    correctAnswer: 1,
    explanation: 'The event loop handles asynchronous callbacks by managing the call stack and task queue.'
  },
  {
    id: 82,
    topic: 'Web Development',
    difficulty: 'easy',
    question: 'What port does HTTP use by default?',
    options: ['8080', '443', '80', '3000'],
    correctAnswer: 2,
    explanation: 'HTTP uses port 80 by default, while HTTPS uses port 443.'
  },
  {
    id: 83,
    topic: 'React',
    difficulty: 'medium',
    question: 'What is lifting state up?',
    options: [
      'Moving state to cloud',
      'Moving state to closest common ancestor',
      'Deleting state',
      'Creating state'
    ],
    correctAnswer: 1,
    explanation: 'Lifting state up means moving state to the closest common ancestor of components that need it.'
  },
  {
    id: 84,
    topic: 'Algorithms',
    difficulty: 'easy',
    question: 'What is linear search?',
    options: [
      'A sorting algorithm',
      'Checking each element sequentially',
      'A graph algorithm',
      'A tree traversal'
    ],
    correctAnswer: 1,
    explanation: 'Linear search checks each element in sequence until the target is found or list ends.'
  },
  {
    id: 85,
    topic: 'Data Structures',
    difficulty: 'medium',
    question: 'What is a balanced tree?',
    options: [
      'A tree with equal values',
      'A tree where height difference between subtrees is minimal',
      'A sorted tree',
      'A complete tree'
    ],
    correctAnswer: 1,
    explanation: 'A balanced tree maintains minimal height difference between left and right subtrees.'
  },
  {
    id: 86,
    topic: 'Python',
    difficulty: 'medium',
    question: 'What is the purpose of __init__ in Python?',
    options: [
      'End a class',
      'Constructor/initialize object',
      'Delete an object',
      'Import modules'
    ],
    correctAnswer: 1,
    explanation: '__init__ is a special method called when creating a new instance of a class.'
  },
  {
    id: 87,
    topic: 'System Design',
    difficulty: 'hard',
    question: 'What is eventual consistency?',
    options: [
      'Immediate consistency',
      'System becomes consistent over time',
      'Never consistent',
      'Always consistent'
    ],
    correctAnswer: 1,
    explanation: 'Eventual consistency means the system will become consistent given enough time without updates.'
  },
  {
    id: 88,
    topic: 'Databases',
    difficulty: 'medium',
    question: 'What is NoSQL?',
    options: [
      'No Structured Query Language',
      'Non-relational database',
      'New SQL',
      'Not Only SQL'
    ],
    correctAnswer: 3,
    explanation: 'NoSQL stands for "Not Only SQL" - databases that don\'t use traditional relational structure.'
  },
  {
    id: 89,
    topic: 'JavaScript',
    difficulty: 'medium',
    question: 'What is a Promise in JavaScript?',
    options: [
      'A guarantee',
      'An object representing eventual completion of async operation',
      'A loop',
      'A variable type'
    ],
    correctAnswer: 1,
    explanation: 'A Promise is an object that may produce a single value in the future: resolved or rejected.'
  },
  {
    id: 90,
    topic: 'Web Development',
    difficulty: 'hard',
    question: 'What is WebSocket?',
    options: [
      'A socket for plugs',
      'A protocol for bidirectional communication',
      'A web browser',
      'A CSS framework'
    ],
    correctAnswer: 1,
    explanation: 'WebSocket provides full-duplex communication channels over a single TCP connection.'
  },
  {
    id: 91,
    topic: 'React',
    difficulty: 'easy',
    question: 'What file extension is commonly used for React components?',
    options: ['.js', '.jsx', '.react', 'Both .js and .jsx'],
    correctAnswer: 3,
    explanation: 'React components can use both .js and .jsx extensions, though .jsx is more explicit.'
  },
  {
    id: 92,
    topic: 'Algorithms',
    difficulty: 'medium',
    question: 'What is memoization?',
    options: [
      'Memory allocation',
      'Caching function results',
      'Memory cleanup',
      'Creating memories'
    ],
    correctAnswer: 1,
    explanation: 'Memoization is an optimization technique that caches function results for given inputs.'
  },
  {
    id: 93,
    topic: 'Data Structures',
    difficulty: 'easy',
    question: 'What is the root node in a tree?',
    options: [
      'The bottom node',
      'The topmost node',
      'The middle node',
      'Any leaf node'
    ],
    correctAnswer: 1,
    explanation: 'The root node is the topmost node in a tree with no parent.'
  },
  {
    id: 94,
    topic: 'Python',
    difficulty: 'hard',
    question: 'What is a metaclass in Python?',
    options: [
      'A parent class',
      'A class of a class',
      'An abstract class',
      'A derived class'
    ],
    correctAnswer: 1,
    explanation: 'A metaclass is a class whose instances are classes themselves.'
  },
  {
    id: 95,
    topic: 'System Design',
    difficulty: 'medium',
    question: 'What is rate limiting?',
    options: [
      'Speed optimization',
      'Controlling request frequency',
      'Data compression',
      'Server monitoring'
    ],
    correctAnswer: 1,
    explanation: 'Rate limiting controls how many requests a client can make in a given time period.'
  },
  {
    id: 96,
    topic: 'Databases',
    difficulty: 'easy',
    question: 'What is a foreign key?',
    options: [
      'A key from another country',
      'A field that links two tables',
      'A backup key',
      'An encrypted key'
    ],
    correctAnswer: 1,
    explanation: 'A foreign key is a field that creates a link between two tables.'
  },
  {
    id: 97,
    topic: 'JavaScript',
    difficulty: 'medium',
    question: 'What is the difference between null and undefined?',
    options: [
      'No difference',
      'null is assigned, undefined is not initialized',
      'undefined is assigned, null is not initialized',
      'null is an error'
    ],
    correctAnswer: 1,
    explanation: 'null is an assigned value representing "no value", undefined means not initialized.'
  },
  {
    id: 98,
    topic: 'Web Development',
    difficulty: 'medium',
    question: 'What is the purpose of localStorage?',
    options: [
      'Server storage',
      'Client-side data storage in browser',
      'Database storage',
      'Cloud storage'
    ],
    correctAnswer: 1,
    explanation: 'localStorage stores data in the browser with no expiration time.'
  },
  {
    id: 99,
    topic: 'React',
    difficulty: 'hard',
    question: 'What is code splitting in React?',
    options: [
      'Dividing code into files',
      'Loading code dynamically when needed',
      'Removing unused code',
      'Compiling code'
    ],
    correctAnswer: 1,
    explanation: 'Code splitting dynamically loads code chunks when needed to reduce initial bundle size.'
  },
  {
    id: 100,
    topic: 'Algorithms',
    difficulty: 'hard',
    question: 'What is Big O notation used for?',
    options: [
      'Measuring code length',
      'Describing algorithm time/space complexity',
      'Counting variables',
      'Error handling'
    ],
    correctAnswer: 1,
    explanation: 'Big O notation describes the upper bound of algorithm time or space complexity as input grows.'
  }
];

/**
 * Get questions by topic
 */
export function getQuestionsByTopic(topic) {
  return mcqQuestions.filter(q => q.topic === topic);
}

/**
 * Get questions by difficulty
 */
export function getQuestionsByDifficulty(difficulty) {
  return mcqQuestions.filter(q => q.difficulty === difficulty);
}

/**
 * Get random questions
 */
export function getRandomQuestions(count = 10, topic = null, difficulty = null) {
  let filteredQuestions = [...mcqQuestions];
  
  if (topic) {
    filteredQuestions = filteredQuestions.filter(q => q.topic === topic);
  }
  
  if (difficulty) {
    filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
  }
  
  // Shuffle and get random questions
  const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get all available topics
 */
export function getAllTopics() {
  return [...new Set(mcqQuestions.map(q => q.topic))];
}

/**
 * Get statistics about question bank
 */
export function getQuestionStats() {
  const topics = {};
  const difficulties = { easy: 0, medium: 0, hard: 0 };
  
  mcqQuestions.forEach(q => {
    topics[q.topic] = (topics[q.topic] || 0) + 1;
    difficulties[q.difficulty]++;
  });
  
  return {
    total: mcqQuestions.length,
    topics,
    difficulties
  };
}
