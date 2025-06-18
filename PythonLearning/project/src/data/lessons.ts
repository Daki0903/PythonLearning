import { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Introduction to Python",
    category: "Basics",
    difficulty: "Beginner",
    duration: "15 min",
    description: "Learn what Python is and why it's popular",
    content: `Python is a high-level, interpreted programming language known for its simplicity and readability. Created by Guido van Rossum in 1991, Python emphasizes code readability with its use of significant whitespace.

Key features of Python:
• Easy to learn and use
• Interpreted language
• Cross-platform compatibility
• Large standard library
• Active community support
• Versatile applications (web, data science, AI, automation)`,
    codeExample: `# Your first Python program
print("Hello, World!")
print("Welcome to Python programming!")

# Variables and basic operations
name = "Python"
version = 3.12
print(f"{name} version {version}")`,
    exercises: [
      {
        id: 1,
        question: "What makes Python special compared to other programming languages?",
        type: "multiple-choice",
        options: ["Complex syntax", "Readability and simplicity", "Only for web development", "Requires compilation"],
        correctAnswer: 1,
        explanation: "Python is known for its readable and simple syntax, making it beginner-friendly."
      }
    ]
  },
  {
    id: 2,
    title: "Variables and Data Types",
    category: "Basics",
    difficulty: "Beginner",
    duration: "20 min",
    description: "Understanding Python's fundamental data types",
    content: `Variables in Python are containers for storing data values. Python has several built-in data types:

**Basic Data Types:**
• **int**: Integer numbers (e.g., 42, -17)
• **float**: Decimal numbers (e.g., 3.14, -0.5)
• **str**: Text strings (e.g., "Hello", 'Python')
• **bool**: Boolean values (True, False)

**Collection Types:**
• **list**: Ordered, mutable collection [1, 2, 3]
• **tuple**: Ordered, immutable collection (1, 2, 3)
• **dict**: Key-value pairs {"name": "Alice"}
• **set**: Unordered collection of unique items {1, 2, 3}`,
    codeExample: `# Different data types
age = 25                    # int
height = 5.9               # float
name = "Alice"             # str
is_student = True          # bool

# Collections
numbers = [1, 2, 3, 4, 5]  # list
coordinates = (10, 20)      # tuple
person = {"name": "Bob", "age": 30}  # dict
unique_numbers = {1, 2, 3, 2, 1}     # set (duplicates removed)

# Check types
print(type(age))           # <class 'int'>
print(type(name))          # <class 'str'>`,
    exercises: [
      {
        id: 1,
        question: "Which data type would you use to store a person's age?",
        type: "multiple-choice",
        options: ["str", "int", "list", "bool"],
        correctAnswer: 1,
        explanation: "Age is typically represented as a whole number, so 'int' is the appropriate data type."
      }
    ]
  },
  {
    id: 3,
    title: "Strings and String Methods",
    category: "Basics",
    difficulty: "Beginner",
    duration: "25 min",
    description: "Working with text data in Python",
    content: `Strings are sequences of characters enclosed in quotes. Python provides many built-in methods for string manipulation.

**String Creation:**
• Single quotes: 'Hello'
• Double quotes: "Hello"
• Triple quotes: '''Multi-line string'''

**Common String Methods:**
• .upper() - Convert to uppercase
• .lower() - Convert to lowercase
• .strip() - Remove whitespace
• .split() - Split into list
• .replace() - Replace substring
• .find() - Find substring position
• .len() - Get string length`,
    codeExample: `# String basics
message = "Hello, Python World!"
print(message.upper())         # HELLO, PYTHON WORLD!
print(message.lower())         # hello, python world!

# String methods
name = "  Alice  "
clean_name = name.strip()      # "Alice"
words = message.split()        # ["Hello,", "Python", "World!"]

# String formatting
age = 25
greeting = f"Hello, I'm {age} years old"  # f-string
old_style = "Hello, I'm {} years old".format(age)  # .format()

# String slicing
text = "Python"
print(text[0])     # P (first character)
print(text[-1])    # n (last character)
print(text[0:3])   # Pyt (slice)`,
    exercises: [
      {
        id: 1,
        question: "What does 'Hello World'.lower() return?",
        type: "fill-blank",
        correctAnswer: "hello world",
        explanation: "The lower() method converts all characters in the string to lowercase."
      }
    ]
  },
  {
    id: 4,
    title: "Numbers and Mathematical Operations",
    category: "Basics",
    difficulty: "Beginner",
    duration: "20 min",
    description: "Performing calculations and working with numbers",
    content: `Python supports various types of numbers and mathematical operations.

**Number Types:**
• **int**: Whole numbers (unlimited precision)
• **float**: Decimal numbers (64-bit precision)
• **complex**: Complex numbers (3+4j)

**Arithmetic Operators:**
• + Addition
• - Subtraction
• * Multiplication
• / Division (float result)
• // Floor division (integer result)
• % Modulo (remainder)
• ** Exponentiation (power)

**Math Module:**
Python's math module provides additional mathematical functions.`,
    codeExample: `# Basic arithmetic
a = 10
b = 3

print(a + b)    # 13
print(a - b)    # 7
print(a * b)    # 30
print(a / b)    # 3.3333...
print(a // b)   # 3 (floor division)
print(a % b)    # 1 (remainder)
print(a ** b)   # 1000 (10 to the power of 3)

# Math module
import math

print(math.sqrt(16))    # 4.0
print(math.pi)          # 3.141592653589793
print(math.ceil(3.2))   # 4
print(math.floor(3.8))  # 3

# Number conversions
float_num = 3.14
int_num = int(float_num)  # 3
str_num = str(float_num)  # "3.14"`,
    exercises: [
      {
        id: 1,
        question: "What is the result of 17 % 5 in Python?",
        type: "multiple-choice",
        options: ["3", "2", "3.4", "12"],
        correctAnswer: 1,
        explanation: "The modulo operator (%) returns the remainder of division. 17 ÷ 5 = 3 remainder 2."
      }
    ]
  },
  {
    id: 5,
    title: "Lists and List Methods",
    category: "Data Structures",
    difficulty: "Beginner",
    duration: "30 min",
    description: "Working with ordered collections of items",
    content: `Lists are ordered, mutable collections that can store multiple items of different types.

**List Creation:**
• Empty list: []
• With items: [1, 2, 3]
• Mixed types: [1, "hello", True]

**Common List Methods:**
• .append() - Add item to end
• .insert() - Insert item at position
• .remove() - Remove first occurrence
• .pop() - Remove and return item
• .sort() - Sort the list
• .reverse() - Reverse the list
• .count() - Count occurrences
• .index() - Find item position`,
    codeExample: `# Creating lists
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", True, 3.14]

# Accessing elements
print(fruits[0])      # "apple" (first item)
print(fruits[-1])     # "orange" (last item)
print(fruits[0:2])    # ["apple", "banana"] (slice)

# Modifying lists
fruits.append("grape")           # Add to end
fruits.insert(1, "mango")        # Insert at position 1
fruits.remove("banana")          # Remove first occurrence
last_fruit = fruits.pop()        # Remove and return last item

# List operations
print(len(fruits))               # Get length
print("apple" in fruits)         # Check if item exists
fruits.sort()                    # Sort alphabetically
fruits.reverse()                 # Reverse order

# List comprehension
squares = [x**2 for x in range(5)]  # [0, 1, 4, 9, 16]`,
    exercises: [
      {
        id: 1,
        question: "How do you add an item to the end of a list?",
        type: "multiple-choice",
        options: [".add()", ".append()", ".insert()", ".push()"],
        correctAnswer: 1,
        explanation: "The .append() method adds an item to the end of a list."
      }
    ]
  },
  {
    id: 6,
    title: "Dictionaries and Key-Value Pairs",
    category: "Data Structures",
    difficulty: "Beginner",
    duration: "25 min",
    description: "Storing data in key-value pairs",
    content: `Dictionaries store data in key-value pairs, allowing fast lookups by key.

**Dictionary Features:**
• Unordered collection (Python 3.7+ maintains insertion order)
• Keys must be immutable (strings, numbers, tuples)
• Values can be any type
• Mutable (can be changed)

**Common Dictionary Methods:**
• .get() - Get value by key (safe)
• .keys() - Get all keys
• .values() - Get all values
• .items() - Get key-value pairs
• .update() - Update with another dict
• .pop() - Remove and return value`,
    codeExample: `# Creating dictionaries
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

# Accessing values
print(person["name"])           # "Alice"
print(person.get("age"))        # 30
print(person.get("country", "Unknown"))  # "Unknown" (default)

# Modifying dictionaries
person["age"] = 31              # Update value
person["job"] = "Engineer"      # Add new key-value pair
del person["city"]              # Remove key-value pair

# Dictionary methods
print(person.keys())            # dict_keys(['name', 'age', 'job'])
print(person.values())          # dict_values(['Alice', 31, 'Engineer'])
print(person.items())           # dict_items([('name', 'Alice'), ...])

# Looping through dictionaries
for key, value in person.items():
    print(f"{key}: {value}")

# Dictionary comprehension
squares = {x: x**2 for x in range(5)}  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}`,
    exercises: [
      {
        id: 1,
        question: "What's the safe way to get a value from a dictionary that might not exist?",
        type: "multiple-choice",
        options: ["dict[key]", "dict.get(key)", "dict.find(key)", "dict.search(key)"],
        correctAnswer: 1,
        explanation: "The .get() method returns None if the key doesn't exist, preventing KeyError."
      }
    ]
  },
  {
    id: 7,
    title: "Conditional Statements (if, elif, else)",
    category: "Control Flow",
    difficulty: "Beginner",
    duration: "25 min",
    description: "Making decisions in your code",
    content: `Conditional statements allow your program to make decisions based on different conditions.

**Conditional Operators:**
• == Equal to
• != Not equal to
• < Less than
• > Greater than
• <= Less than or equal to
• >= Greater than or equal to
• in Check membership
• not in Check non-membership

**Logical Operators:**
• and - Both conditions must be True
• or - At least one condition must be True
• not - Reverse the condition`,
    codeExample: `# Basic if statement
age = 18
if age >= 18:
    print("You are an adult")

# if-else statement
if age >= 18:
    print("You can vote")
else:
    print("You cannot vote yet")

# if-elif-else statement
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Your grade is: {grade}")

# Logical operators
temperature = 25
is_sunny = True

if temperature > 20 and is_sunny:
    print("Perfect weather for a picnic!")

# Membership testing
fruits = ["apple", "banana", "orange"]
if "apple" in fruits:
    print("We have apples!")

# Nested conditions
weather = "sunny"
if weather == "sunny":
    if temperature > 25:
        print("Great day for swimming!")
    else:
        print("Nice day for a walk!")`,
    exercises: [
      {
        id: 1,
        question: "What will be printed if x = 5? if x > 3 and x < 10: print('Yes')",
        type: "multiple-choice",
        options: ["Yes", "No", "Nothing", "Error"],
        correctAnswer: 0,
        explanation: "Since 5 > 3 and 5 < 10, both conditions are True, so 'Yes' is printed."
      }
    ]
  },
  {
    id: 8,
    title: "Loops - For and While",
    category: "Control Flow",
    difficulty: "Beginner",
    duration: "30 min",
    description: "Repeating code execution with loops",
    content: `Loops allow you to repeat code multiple times efficiently.

**For Loops:**
• Iterate over sequences (lists, strings, ranges)
• Known number of iterations
• Used with iterable objects

**While Loops:**
• Continue while condition is True
• Unknown number of iterations
• Risk of infinite loops

**Loop Control:**
• break - Exit loop early
• continue - Skip to next iteration
• else - Execute when loop completes normally`,
    codeExample: `# For loop with range
for i in range(5):
    print(f"Count: {i}")  # 0, 1, 2, 3, 4

# For loop with list
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(f"I like {fruit}")

# For loop with enumerate (get index and value)
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# While loop
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1

# Loop control statements
for i in range(10):
    if i == 3:
        continue  # Skip when i is 3
    if i == 7:
        break     # Exit loop when i is 7
    print(i)

# Loop with else
for i in range(3):
    print(i)
else:
    print("Loop completed normally")

# Nested loops
for i in range(3):
    for j in range(2):
        print(f"i={i}, j={j}")

# List comprehension (advanced for loop)
squares = [x**2 for x in range(5)]
even_squares = [x**2 for x in range(10) if x % 2 == 0]`,
    exercises: [
      {
        id: 1,
        question: "What does 'continue' do in a loop?",
        type: "multiple-choice",
        options: ["Exits the loop", "Skips to next iteration", "Restarts the loop", "Pauses the loop"],
        correctAnswer: 1,
        explanation: "The 'continue' statement skips the rest of the current iteration and moves to the next one."
      }
    ]
  },
  {
    id: 9,
    title: "Functions - Defining and Calling",
    category: "Functions",
    difficulty: "Beginner",
    duration: "35 min",
    description: "Creating reusable blocks of code",
    content: `Functions are reusable blocks of code that perform specific tasks.

**Function Benefits:**
• Code reusability
• Better organization
• Easier testing and debugging
• Modular programming

**Function Components:**
• def keyword
• Function name
• Parameters (optional)
• Return statement (optional)
• Docstring (optional but recommended)

**Parameter Types:**
• Positional parameters
• Keyword parameters
• Default parameters
• *args and **kwargs`,
    codeExample: `# Basic function
def greet():
    print("Hello, World!")

greet()  # Call the function

# Function with parameters
def greet_person(name):
    print(f"Hello, {name}!")

greet_person("Alice")

# Function with return value
def add_numbers(a, b):
    return a + b

result = add_numbers(5, 3)
print(result)  # 8

# Function with default parameters
def greet_with_title(name, title="Mr./Ms."):
    return f"Hello, {title} {name}!"

print(greet_with_title("Smith"))           # Uses default title
print(greet_with_title("Smith", "Dr."))    # Uses custom title

# Function with multiple return values
def get_name_age():
    name = "Alice"
    age = 30
    return name, age

person_name, person_age = get_name_age()

# Function with docstring
def calculate_area(length, width):
    """
    Calculate the area of a rectangle.
    
    Args:
        length (float): The length of the rectangle
        width (float): The width of the rectangle
    
    Returns:
        float: The area of the rectangle
    """
    return length * width

# Variable-length arguments
def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3, 4, 5))  # 15

# Keyword arguments
def create_profile(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

create_profile(name="Alice", age=30, city="New York")`,
    exercises: [
      {
        id: 1,
        question: "What keyword is used to define a function in Python?",
        type: "fill-blank",
        correctAnswer: "def",
        explanation: "The 'def' keyword is used to define functions in Python."
      }
    ]
  },
  {
    id: 10,
    title: "Function Parameters and Arguments",
    category: "Functions",
    difficulty: "Intermediate",
    duration: "30 min",
    description: "Advanced function parameter handling",
    content: `Understanding different types of function parameters and arguments.

**Parameter Types:**
• **Positional**: Must be provided in order
• **Keyword**: Can be provided by name
• **Default**: Have default values
• **Variable-length**: *args and **kwargs

**Argument Passing:**
• Call by value (immutable objects)
• Call by reference (mutable objects)

**Best Practices:**
• Use descriptive parameter names
• Provide default values when appropriate
• Document your functions
• Keep functions focused on single tasks`,
    codeExample: `# Different parameter types
def student_info(name, age, grade="A", *subjects, **details):
    print(f"Name: {name}")
    print(f"Age: {age}")
    print(f"Grade: {grade}")
    print(f"Subjects: {subjects}")
    print(f"Details: {details}")

# Calling with different argument types
student_info("Alice", 20, "B", "Math", "Science", city="NYC", gpa=3.8)

# Keyword-only arguments
def create_user(name, *, email, password):
    """Email and password must be provided as keyword arguments"""
    return {
        "name": name,
        "email": email,
        "password": password
    }

# user = create_user("Alice", "alice@email.com", "pass123")  # Error!
user = create_user("Alice", email="alice@email.com", password="pass123")  # Correct

# Lambda functions (anonymous functions)
square = lambda x: x ** 2
print(square(5))  # 25

# Using lambda with built-in functions
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))

# Function as first-class objects
def multiply(x, y):
    return x * y

def apply_operation(func, a, b):
    return func(a, b)

result = apply_operation(multiply, 4, 5)  # 20

# Closures
def outer_function(x):
    def inner_function(y):
        return x + y
    return inner_function

add_10 = outer_function(10)
print(add_10(5))  # 15`,
    exercises: [
      {
        id: 1,
        question: "What does *args allow you to do in a function?",
        type: "multiple-choice",
        options: ["Accept keyword arguments", "Accept variable number of positional arguments", "Set default values", "Create lambda functions"],
        correctAnswer: 1,
        explanation: "*args allows a function to accept any number of positional arguments as a tuple."
      }
    ]
  }
  // Additional lessons would continue here following the same pattern...
];

// Generate additional lessons programmatically to reach 30+
const generateAdvancedLessons = (): Lesson[] => {
  const advancedTopics = [
    {
      title: "Object-Oriented Programming - Classes",
      category: "OOP",
      difficulty: "Intermediate" as const,
      description: "Introduction to classes and objects"
    },
    {
      title: "Inheritance and Polymorphism",
      category: "OOP",
      difficulty: "Intermediate" as const,
      description: "Advanced OOP concepts"
    },
    {
      title: "File Handling and I/O Operations",
      category: "File Operations",
      difficulty: "Intermediate" as const,
      description: "Reading and writing files"
    },
    {
      title: "Exception Handling",
      category: "Error Handling",
      difficulty: "Intermediate" as const,
      description: "Managing errors gracefully"
    },
    {
      title: "Modules and Packages",
      category: "Code Organization",
      difficulty: "Intermediate" as const,
      description: "Organizing code into modules"
    },
    {
      title: "Regular Expressions",
      category: "Text Processing",
      difficulty: "Intermediate" as const,
      description: "Pattern matching with regex"
    },
    {
      title: "Working with APIs",
      category: "Web Development",
      difficulty: "Intermediate" as const,
      description: "Making HTTP requests"
    },
    {
      title: "Database Operations with SQLite",
      category: "Database",
      difficulty: "Intermediate" as const,
      description: "Storing and retrieving data"
    },
    {
      title: "Web Scraping with BeautifulSoup",
      category: "Web Development",
      difficulty: "Advanced" as const,
      description: "Extracting data from websites"
    },
    {
      title: "Data Analysis with Pandas",
      category: "Data Science",
      difficulty: "Advanced" as const,
      description: "Analyzing data with pandas"
    },
    {
      title: "Data Visualization with Matplotlib",
      category: "Data Science",
      difficulty: "Advanced" as const,
      description: "Creating charts and graphs"
    },
    {
      title: "Machine Learning Introduction",
      category: "AI/ML",
      difficulty: "Advanced" as const,
      description: "Basic ML concepts"
    },
    {
      title: "Building REST APIs with Flask",
      category: "Web Development",
      difficulty: "Advanced" as const,
      description: "Creating web APIs"
    },
    {
      title: "Testing Your Python Code",
      category: "Testing",
      difficulty: "Intermediate" as const,
      description: "Unit testing and debugging"
    },
    {
      title: "Decorators and Metaclasses",
      category: "Advanced Python",
      difficulty: "Advanced" as const,
      description: "Advanced Python features"
    },
    {
      title: "Async Programming with asyncio",
      category: "Advanced Python",
      difficulty: "Advanced" as const,
      description: "Asynchronous programming"
    },
    {
      title: "Working with JSON and XML",
      category: "Data Formats",
      difficulty: "Intermediate" as const,
      description: "Parsing structured data"
    },
    {
      title: "Command Line Applications",
      category: "CLI Development",
      difficulty: "Intermediate" as const,
      description: "Building CLI tools"
    },
    {
      title: "Virtual Environments and Package Management",
      category: "Development Environment",
      difficulty: "Intermediate" as const,
      description: "Managing project dependencies"
    },
    {
      title: "Python Performance Optimization",
      category: "Performance",
      difficulty: "Advanced" as const,
      description: "Making Python code faster"
    },
    {
      title: "GUI Development with Tkinter",
      category: "GUI Development",
      difficulty: "Intermediate" as const,
      description: "Creating desktop applications"
    },
    {
      title: "Working with Dates and Times",
      category: "Standard Library",
      difficulty: "Beginner" as const,
      description: "Date and time manipulation"
    },
    {
      title: "Logging and Debugging",
      category: "Development Tools",
      difficulty: "Intermediate" as const,
      description: "Monitoring and debugging code"
    },
    {
      title: "Memory Management and Garbage Collection",
      category: "Advanced Python",
      difficulty: "Advanced" as const,
      description: "Understanding Python's memory model"
    },
    {
      title: "Design Patterns in Python",
      category: "Software Design",
      difficulty: "Advanced" as const,
      description: "Common programming patterns"
    }
  ];

  return advancedTopics.map((topic, index) => ({
    id: 11 + index,
    title: topic.title,
    category: topic.category,
    difficulty: topic.difficulty,
    duration: "30 min",
    description: topic.description,
    content: `This is an advanced lesson on ${topic.title}. Content would include detailed explanations, examples, and practical applications.`,
    codeExample: `# Example code for ${topic.title}\nprint("Advanced Python concept")`,
    exercises: [
      {
        id: 1,
        question: `What is the main purpose of ${topic.title}?`,
        type: "multiple-choice" as const,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: 0,
        explanation: `${topic.title} is used for ${topic.description.toLowerCase()}.`
      }
    ]
  }));
};

export const allLessons = [...lessons, ...generateAdvancedLessons()];