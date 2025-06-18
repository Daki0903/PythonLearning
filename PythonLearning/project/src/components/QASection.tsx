import React, { useState, useMemo } from 'react';
import { Search, MessageCircle, Tag, Filter, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { qaData } from '../data/qa';

const QASection: React.FC = () => {
  const { searchQuery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const categories = ['All', ...new Set(qaData.map(item => item.category))];
  const difficulties = ['All', ...new Set(qaData.map(item => item.difficulty))];

  const filteredQA = useMemo(() => {
    return qaData.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || item.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAiQuery = async () => {
    if (!aiQuery.trim()) return;
    
    setIsAiLoading(true);
    
    // Simulate AI response (in a real app, this would call an AI API)
    setTimeout(() => {
      const responses = [
        "Python is a versatile programming language that's great for beginners because of its readable syntax and extensive libraries. It's commonly used in web development, data science, automation, and artificial intelligence.",
        "To get started with Python, I recommend installing Python from python.org, then trying a simple 'Hello, World!' program. Focus on understanding variables, data types, and basic operations first.",
        "Python functions are defined using the 'def' keyword. They help organize code into reusable blocks. For example: def greet(name): return f'Hello, {name}!'",
        "Lists in Python are ordered collections that can hold different data types. You can create them with square brackets: [1, 2, 3] and modify them using methods like append(), remove(), and pop().",
        "Python's object-oriented programming allows you to create classes and objects. Classes are blueprints for objects, and objects are instances of classes with their own data and methods."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiResponse(randomResponse);
      setIsAiLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Python Q&A
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get answers to common Python questions and ask our AI assistant
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* AI Assistant */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-6 text-white mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">AI Assistant</h2>
                <p className="text-purple-100">Ask me anything about Python!</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <textarea
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Ask a Python question..."
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-purple-200 border border-white/30 focus:border-white/50 focus:outline-none resize-none"
                rows={3}
              />
              
              <button
                onClick={handleAiQuery}
                disabled={isAiLoading || !aiQuery.trim()}
                className="w-full py-2 px-4 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isAiLoading ? 'Thinking...' : 'Ask AI'}
              </button>
            </div>

            {aiResponse && (
              <div className="mt-4 p-4 bg-white/20 rounded-lg">
                <p className="text-sm text-purple-100 leading-relaxed">
                  {aiResponse}
                </p>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Questions</span>
                <span className="font-medium text-gray-900 dark:text-white">{qaData.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Categories</span>
                <span className="font-medium text-gray-900 dark:text-white">{categories.length - 1}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Filtered Results</span>
                <span className="font-medium text-gray-900 dark:text-white">{filteredQA.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Q&A List */}
        <div className="lg:col-span-2">
          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <h3 className="font-medium text-gray-900 dark:text-white">Filters</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Q&A Items */}
          <div className="space-y-4">
            {filteredQA.map((item) => {
              const isExpanded = expandedItems.has(item.id);
              
              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <MessageCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {item.question}
                          </h3>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {item.category}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            item.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            item.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {item.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                      <div className="pt-4">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                          {item.answer}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center space-x-1 text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full"
                            >
                              <Tag className="w-3 h-3" />
                              <span>{tag}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredQA.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No questions found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your filters or search terms, or ask the AI assistant above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QASection;