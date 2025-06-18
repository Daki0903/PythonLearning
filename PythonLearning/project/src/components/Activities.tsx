import React, { useState } from 'react';
import { Trophy, Code, Target, Timer, Star, CheckCircle, RotateCcw, Play } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface Activity {
  id: number;
  title: string;
  description: string;
  type: 'coding' | 'quiz' | 'debugging' | 'project';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  points: number;
  timeLimit?: number;
  questions?: any[];
  code?: string;
  expectedOutput?: string;
}

const activities: Activity[] = [
  {
    id: 1,
    title: "Hello World Challenge",
    description: "Write your first Python program that prints 'Hello, World!' to the console.",
    type: "coding",
    difficulty: "Beginner",
    points: 10,
    code: "# Write your code here\n",
    expectedOutput: "Hello, World!"
  },
  {
    id: 2,
    title: "Variable Basics Quiz",
    description: "Test your knowledge of Python variables and data types.",
    type: "quiz",
    difficulty: "Beginner",
    points: 15,
    questions: [
      {
        question: "Which of these is a valid variable name?",
        options: ["2name", "name2", "name-2", "name 2"],
        correct: 1
      },
      {
        question: "What type is the value 3.14?",
        options: ["int", "float", "str", "bool"],
        correct: 1
      }
    ]
  },
  {
    id: 3,
    title: "List Operations",
    description: "Create a list of numbers and perform various operations on it.",
    type: "coding",
    difficulty: "Beginner",
    points: 20,
    code: "# Create a list of numbers from 1 to 5\n# Add the number 6 to the list\n# Remove the number 3 from the list\n# Print the final list\n",
    expectedOutput: "[1, 2, 4, 5, 6]"
  },
  {
    id: 4,
    title: "Debug the Loop",
    description: "Find and fix the bugs in this Python loop code.",
    type: "debugging",
    difficulty: "Intermediate",
    points: 25,
    code: "# This code should print numbers 1 to 5, but it has bugs\nfor i in range(0, 5):\n    print(i)\n# Fix the bugs to make it work correctly",
    expectedOutput: "1\n2\n3\n4\n5"
  },
  {
    id: 5,
    title: "Function Fundamentals",
    description: "Write a function that calculates the area of a rectangle.",
    type: "coding",
    difficulty: "Intermediate",
    points: 30,
    code: "# Write a function called 'rectangle_area' that takes length and width as parameters\n# and returns the area (length * width)\n\n# Test your function with length=5 and width=3\n",
    expectedOutput: "15"
  },
  {
    id: 6,
    title: "Python Concepts Quiz",
    description: "Advanced quiz covering functions, loops, and data structures.",
    type: "quiz",
    difficulty: "Advanced",
    points: 35,
    timeLimit: 300,
    questions: [
      {
        question: "What does the 'yield' keyword do in Python?",
        options: ["Returns a value and ends the function", "Creates a generator", "Imports a module", "Defines a variable"],
        correct: 1
      },
      {
        question: "Which method adds an element to the end of a list?",
        options: ["add()", "append()", "push()", "insert()"],
        correct: 1
      },
      {
        question: "What is the output of: print([1, 2, 3] * 2)?",
        options: ["[2, 4, 6]", "[1, 2, 3, 1, 2, 3]", "[1, 2, 3, 2]", "Error"],
        correct: 1
      }
    ]
  },
  {
    id: 7,
    title: "Build a Calculator",
    description: "Create a simple calculator that can perform basic arithmetic operations.",
    type: "project",
    difficulty: "Intermediate",
    points: 50,
    code: "# Build a calculator that can add, subtract, multiply, and divide\n# Create functions for each operation\n# Create a main function that takes user input and performs the calculation\n\ndef add(a, b):\n    # Your code here\n    pass\n\ndef subtract(a, b):\n    # Your code here\n    pass\n\n# Continue with multiply and divide functions\n",
    expectedOutput: "Calculator with working operations"
  },
  {
    id: 8,
    title: "String Manipulation Challenge",
    description: "Master string operations with this comprehensive challenge.",
    type: "coding",
    difficulty: "Advanced",
    points: 40,
    code: "# Given a string, write code to:\n# 1. Count the number of vowels\n# 2. Reverse the string\n# 3. Check if it's a palindrome\n# 4. Convert to title case\n\ntext = \"python programming\"\n# Your code here\n",
    expectedOutput: "Vowels: 5, Reversed: gnimargorp nohtyp, Palindrome: False, Title: Python Programming"
  }
];

const Activities: React.FC = () => {
  const { userProgress, updateProgress } = useApp();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [userCode, setUserCode] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const [filter, setFilter] = useState<'all' | 'coding' | 'quiz' | 'debugging' | 'project'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all');

  const filteredActivities = activities.filter(activity => {
    const matchesType = filter === 'all' || activity.type === filter;
    const matchesDifficulty = difficultyFilter === 'all' || activity.difficulty === difficultyFilter;
    return matchesType && matchesDifficulty;
  });

  const startActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setUserCode(activity.code || '');
    setQuizAnswers({});
    setShowResults(false);
    setIsRunning(true);
    
    if (activity.timeLimit) {
      setTimeLeft(activity.timeLimit);
    }
  };

  const submitActivity = () => {
    if (!selectedActivity) return;

    let score = 0;
    
    if (selectedActivity.type === 'quiz' && selectedActivity.questions) {
      selectedActivity.questions.forEach((question, index) => {
        if (quizAnswers[index] === question.correct) {
          score += selectedActivity.points / selectedActivity.questions!.length;
        }
      });
    } else {
      // For coding activities, give full points (in a real app, you'd validate the code)
      score = selectedActivity.points;
    }

    updateProgress(0, Math.round(score)); // Pass 0 as lesson ID since this is an activity
    setShowResults(true);
    setIsRunning(false);
  };

  const resetActivity = () => {
    if (selectedActivity) {
      setUserCode(selectedActivity.code || '');
      setQuizAnswers({});
      setShowResults(false);
      setTimeLeft(selectedActivity.timeLimit || null);
      setIsRunning(true);
    }
  };

  const closeActivity = () => {
    setSelectedActivity(null);
    setUserCode('');
    setQuizAnswers({});
    setShowResults(false);
    setTimeLeft(null);
    setIsRunning(false);
  };

  // Timer effect
  React.useEffect(() => {
    if (timeLeft && timeLeft > 0 && isRunning) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      submitActivity();
    }
  }, [timeLeft, isRunning]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'coding': return Code;
      case 'quiz': return Target;
      case 'debugging': return RotateCcw;
      case 'project': return Star;
      default: return Code;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'coding': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'quiz': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'debugging': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'project': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (selectedActivity) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Activity Header */}
        <div className="mb-6">
          <button
            onClick={closeActivity}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            ← Back to Activities
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedActivity.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {selectedActivity.description}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {timeLeft !== null && (
                <div className="flex items-center space-x-2 bg-red-100 dark:bg-red-900 px-3 py-1 rounded-lg">
                  <Timer className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span className="font-mono text-red-600 dark:text-red-400">
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              )}
              
              <div className="flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded-lg">
                <Trophy className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                <span className="font-medium text-yellow-600 dark:text-yellow-400">
                  {selectedActivity.points} pts
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          {(selectedActivity.type === 'coding' || selectedActivity.type === 'debugging' || selectedActivity.type === 'project') && (
            <div className="p-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Code Editor</h3>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-900 text-green-400 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write your Python code here..."
                disabled={showResults}
              />
              
              {selectedActivity.expectedOutput && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Expected Output:</h4>
                  <pre className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                    {selectedActivity.expectedOutput}
                  </pre>
                </div>
              )}
            </div>
          )}

          {selectedActivity.type === 'quiz' && selectedActivity.questions && (
            <div className="p-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-6">Quiz Questions</h3>
              <div className="space-y-6">
                {selectedActivity.questions.map((question, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Question {index + 1}: {question.question}
                    </h4>
                    <div className="space-y-2">
                      {question.options.map((option: string, optionIndex: number) => (
                        <label
                          key={optionIndex}
                          className="flex items-center space-x-3 p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            checked={quizAnswers[index] === optionIndex}
                            onChange={() => setQuizAnswers(prev => ({ ...prev, [index]: optionIndex }))}
                            disabled={showResults}
                            className="text-blue-600"
                          />
                          <span className="text-gray-700 dark:text-gray-300">{option}</span>
                        </label>
                      ))}
                    </div>
                    
                    {showResults && (
                      <div className="mt-3 text-sm">
                        {quizAnswers[index] === question.correct ? (
                          <span className="text-green-600 dark:text-green-400">✓ Correct!</span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400">
                            ✗ Incorrect. The correct answer is: {question.options[question.correct]}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-700">
            <div className="flex justify-between items-center">
              <button
                onClick={closeActivity}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Close
              </button>
              
              <div className="flex space-x-3">
                {showResults && (
                  <button
                    onClick={resetActivity}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Try Again</span>
                  </button>
                )}
                
                {!showResults && (
                  <button
                    onClick={submitActivity}
                    className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Submit</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {showResults && (
          <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              <div>
                <h3 className="font-medium text-green-900 dark:text-green-100">
                  Activity Completed!
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  You earned {selectedActivity.points} points for completing this activity.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Practice Activities
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Hands-on coding challenges to reinforce your Python learning
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Activity Type
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="coding">Coding</option>
              <option value="quiz">Quiz</option>
              <option value="debugging">Debugging</option>
              <option value="project">Project</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Difficulty
            </label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          
          return (
            <div
              key={activity.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
              onClick={() => startActivity(activity)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {activity.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(activity.type)}`}>
                      {activity.type}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-yellow-600 dark:text-yellow-400">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm font-medium">{activity.points}</span>
                  </div>
                  {activity.timeLimit && (
                    <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 mt-1">
                      <Timer className="w-3 h-3" />
                      <span className="text-xs">{activity.timeLimit / 60}min</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                {activity.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activity.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                  activity.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {activity.difficulty}
                </span>
                
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                  <Play className="w-4 h-4" />
                  <span className="text-sm font-medium">Start</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Activities;