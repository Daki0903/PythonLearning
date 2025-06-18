import { QAItem } from '../types';

export const qaData: QAItem[] = [
  {
    id: 1,
    question: "What is Python?",
    answer: "Python is a high-level, interpreted programming language known for its simple and readable syntax. It was created by Guido van Rossum and first released in 1991. Python emphasizes code readability and allows programmers to express concepts in fewer lines of code than languages like C++ or Java.",
    category: "Basics",
    difficulty: "Beginner",
    tags: ["python", "introduction", "basics"]
  },
  {
    id: 2,
    question: "What are Python's main features?",
    answer: "Python's main features include: Easy to learn and use, Interpreted language (no compilation needed), Cross-platform compatibility, Extensive standard library, Support for multiple programming paradigms, Dynamic typing, Automatic memory management, Large community and ecosystem.",
    category: "Basics",
    difficulty: "Beginner",
    tags: ["features", "overview"]
  },
  {
    id: 3,
    question: "What is the difference between a list and a tuple?",
    answer: "Lists are mutable (can be changed) and use square brackets []. Tuples are immutable (cannot be changed after creation) and use parentheses (). Lists are better for collections that need to be modified, while tuples are better for data that shouldn't change, like coordinates.",
    category: "Data Structures",
    difficulty: "Beginner",
    tags: ["list", "tuple", "data-structures"]
  },
  {
    id: 4,
    question: "How do you handle errors in Python?",
    answer: "Python uses try-except blocks for error handling. The try block contains code that might raise an exception, and the except block handles the exception. You can also use finally for cleanup code and else for code that runs when no exception occurs.",
    category: "Error Handling",
    difficulty: "Intermediate",
    tags: ["exceptions", "error-handling", "try-except"]
  },
  {
    id: 5,
    question: "What is a lambda function?",
    answer: "A lambda function is a small anonymous function that can have any number of arguments but can only have one expression. It's defined using the lambda keyword. Example: lambda x: x * 2. Lambda functions are often used with functions like map(), filter(), and sort().",
    category: "Functions",
    difficulty: "Intermediate",
    tags: ["lambda", "functions", "anonymous"]
  },
  {
    id: 6,
    question: "What is the difference between '==' and 'is' in Python?",
    answer: "'==' compares the values of two objects to see if they're equal, while 'is' compares the identity (memory location) of two objects. Use '==' for value comparison and 'is' for identity comparison, especially with None, True, and False.",
    category: "Operators",
    difficulty: "Intermediate",
    tags: ["comparison", "operators", "identity"]
  },
  {
    id: 7,
    question: "What is list comprehension?",
    answer: "List comprehension is a concise way to create lists in Python. It consists of brackets containing an expression followed by a for clause, then zero or more for or if clauses. Example: [x**2 for x in range(10) if x % 2 == 0] creates a list of squares of even numbers.",
    category: "Data Structures",
    difficulty: "Intermediate",
    tags: ["list-comprehension", "lists", "syntax"]
  },
  {
    id: 8,
    question: "What are Python decorators?",
    answer: "Decorators are a way to modify or enhance functions or classes without permanently modifying their code. They use the @decorator_name syntax. Common examples include @property, @staticmethod, and @classmethod. Decorators are functions that take another function as an argument and return a modified version.",
    category: "Advanced Python",
    difficulty: "Advanced",
    tags: ["decorators", "functions", "advanced"]
  },
  {
    id: 9,
    question: "What is the difference between append() and extend()?",
    answer: "append() adds a single element to the end of a list, while extend() adds all elements from an iterable to the end of a list. append([1,2]) adds the list as a single element, while extend([1,2]) adds 1 and 2 as separate elements.",
    category: "Data Structures",
    difficulty: "Beginner",
    tags: ["lists", "methods", "append", "extend"]
  },
  {
    id: 10,
    question: "What is PEP 8?",
    answer: "PEP 8 is the Style Guide for Python Code. It provides conventions for writing readable Python code, including naming conventions, indentation rules, line length limits, and other formatting guidelines. Following PEP 8 makes your code more readable and maintainable.",
    category: "Best Practices",
    difficulty: "Beginner",
    tags: ["pep8", "style", "best-practices"]
  },
  {
    id: 11,
    question: "What are *args and **kwargs?",
    answer: "*args allows a function to accept any number of positional arguments as a tuple. **kwargs allows a function to accept any number of keyword arguments as a dictionary. They're useful for creating flexible functions that can handle varying numbers of arguments.",
    category: "Functions",
    difficulty: "Intermediate",
    tags: ["args", "kwargs", "functions", "parameters"]
  },
  {
    id: 12,
    question: "What is the Global Interpreter Lock (GIL)?",
    answer: "The GIL is a mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes simultaneously. This means that even in a multi-threaded Python program, only one thread can execute Python code at a time, which can limit performance for CPU-bound tasks.",
    category: "Advanced Python",
    difficulty: "Advanced",
    tags: ["gil", "threading", "performance"]
  },
  {
    id: 13,
    question: "What are Python generators?",
    answer: "Generators are functions that return an iterable set of items, one at a time, in a special way. They use the yield keyword instead of return. Generators are memory-efficient because they generate items on-demand rather than storing all items in memory at once.",
    category: "Advanced Python",
    difficulty: "Advanced",
    tags: ["generators", "yield", "iteration"]
  },
  {
    id: 14,
    question: "What is the difference between deep copy and shallow copy?",
    answer: "Shallow copy creates a new object but references to nested objects are shared. Deep copy creates a new object and recursively copies all nested objects. Use copy.copy() for shallow copy and copy.deepcopy() for deep copy.",
    category: "Memory Management",
    difficulty: "Intermediate",
    tags: ["copy", "memory", "objects"]
  },
  {
    id: 15,
    question: "What are Python modules?",
    answer: "Modules are files containing Python code that can be imported and used in other Python programs. They help organize code into reusable components. You can import modules using the import statement, and Python has a vast standard library of built-in modules.",
    category: "Code Organization",
    difficulty: "Beginner",
    tags: ["modules", "import", "organization"]
  },
  {
    id: 16,
    question: "What is the difference between remove(), del, and pop()?",
    answer: "remove() removes the first occurrence of a value from a list. del removes an item at a specific index. pop() removes and returns an item at a given index (or the last item if no index is specified).",
    category: "Data Structures",
    difficulty: "Beginner",
    tags: ["lists", "removal", "methods"]
  },
  {
    id: 17,
    question: "What are Python context managers?",
    answer: "Context managers are objects that define methods to use with Python's 'with' statement. They ensure proper resource management by automatically handling setup and cleanup operations. The most common example is file handling: 'with open(file) as f:'.",
    category: "Advanced Python",
    difficulty: "Intermediate",
    tags: ["context-managers", "with-statement", "resources"]
  },
  {
    id: 18,
    question: "What is the difference between Python 2 and Python 3?",
    answer: "Python 3 introduced many improvements: print is a function, division returns float by default, strings are Unicode by default, better exception handling syntax, and many other enhancements. Python 2 reached end-of-life in 2020, so all new projects should use Python 3.",
    category: "Python Versions",
    difficulty: "Beginner",
    tags: ["python2", "python3", "versions"]
  },
  {
    id: 19,
    question: "What is monkey patching?",
    answer: "Monkey patching is the practice of dynamically modifying a class or module at runtime. It allows you to extend or modify the behavior of third-party libraries without modifying their source code. While powerful, it should be used carefully as it can make code harder to understand and maintain.",
    category: "Advanced Python",
    difficulty: "Advanced",
    tags: ["monkey-patching", "dynamic", "modification"]
  },
  {
    id: 20,
    question: "What are Python metaclasses?",
    answer: "Metaclasses are classes whose instances are classes themselves. They define how classes are constructed and behave. In Python, the default metaclass is 'type'. Metaclasses are rarely needed in everyday programming but are powerful for creating APIs and frameworks.",
    category: "Advanced Python",
    difficulty: "Advanced",
    tags: ["metaclasses", "classes", "advanced"]
  },
  {
    id: 21,
    question: "How do you optimize Python code performance?",
    answer: "Python performance can be optimized by: Using built-in functions and libraries, List comprehensions instead of loops, Avoiding global variables, Using local variables, Caching results, Using generators for large datasets, Profiling code to identify bottlenecks, and considering libraries like NumPy for numerical operations.",
    category: "Performance",
    difficulty: "Advanced",
    tags: ["optimization", "performance", "efficiency"]
  },
  {
    id: 22,
    question: "What is the difference between __str__ and __repr__?",
    answer: "__str__ returns a human-readable string representation of an object, while __repr__ returns a detailed string representation that should ideally be valid Python code to recreate the object. __str__ is for end users, __repr__ is for developers.",
    category: "Object-Oriented Programming",
    difficulty: "Intermediate",
    tags: ["dunder-methods", "string-representation", "oop"]
  },
  {
    id: 23,
    question: "What are Python virtual environments?",
    answer: "Virtual environments are isolated Python environments that allow you to install packages for a specific project without affecting other projects or the system Python installation. They're created using tools like venv, virtualenv, or conda.",
    category: "Development Environment",
    difficulty: "Intermediate",
    tags: ["virtual-environments", "packages", "isolation"]
  },
  {
    id: 24,
    question: "What is the difference between staticmethod and classmethod?",
    answer: "@staticmethod creates a method that doesn't receive any automatic arguments (no self or cls). @classmethod creates a method that receives the class as the first argument (cls). Static methods are utility functions, class methods are alternative constructors or class-level operations.",
    category: "Object-Oriented Programming",
    difficulty: "Intermediate",
    tags: ["staticmethod", "classmethod", "decorators", "oop"]
  },
  {
    id: 25,
    question: "What is duck typing in Python?",
    answer: "Duck typing is a programming concept where the type or class of an object is determined by its behavior (methods and properties) rather than its explicit type. The phrase comes from 'If it walks like a duck and quacks like a duck, then it must be a duck.'",
    category: "Type System",
    difficulty: "Intermediate",
    tags: ["duck-typing", "polymorphism", "types"]
  }
];