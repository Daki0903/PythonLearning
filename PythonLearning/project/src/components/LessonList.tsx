import React, { useState, useMemo } from 'react';
import { BookOpen, Clock, CheckCircle, Play, Filter, Search } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { allLessons } from '../data/lessons';
import { Lesson } from '../types';

interface LessonListProps {
  onSelectLesson: (lessonId: number) => void;
}

const LessonList: React.FC<LessonListProps> = ({ onSelectLesson }) => {
  const { userProgress, searchQuery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [showCompleted, setShowCompleted] = useState<boolean>(true);

  const categories = ['All', ...new Set(allLessons.map(lesson => lesson.category))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredLessons = useMemo(() => {
    return allLessons.filter(lesson => {
      const matchesSearch = searchQuery === '' || 
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || lesson.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || lesson.difficulty === selectedDifficulty;
      const matchesCompletion = showCompleted || !userProgress.completedLessons.includes(lesson.id);
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesCompletion;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, showCompleted, userProgress.completedLessons]);

  const completedCount = userProgress.completedLessons.length;
  const totalCount = allLessons.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Python Lessons
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Master Python programming with our comprehensive lesson collection
        </p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {completedCount} of {totalCount} completed
            </span>
          </div>
          <div className="flex-1 max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <h2 className="font-medium text-gray-900 dark:text-white">Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Category Filter */}
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

          {/* Difficulty Filter */}
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

          {/* Completion Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Show completed
              </span>
            </label>
          </div>

          {/* Results Count */}
          <div className="flex items-end">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredLessons.length} lesson{filteredLessons.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => {
          const isCompleted = userProgress.completedLessons.includes(lesson.id);
          
          return (
            <div
              key={lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 ${
                isCompleted 
                  ? 'border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    isCompleted 
                      ? 'bg-green-100 dark:bg-green-900' 
                      : 'bg-gradient-to-br from-blue-500 to-purple-600'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    ) : (
                      <BookOpen className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Lesson {lesson.id}
                    </p>
                  </div>
                </div>
                
                {!isCompleted && (
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                    <Play className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Content */}
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {lesson.description}
              </p>

              {/* Metadata */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {lesson.duration}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {lesson.category}
                  </span>
                </div>
                
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  lesson.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                  lesson.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {lesson.difficulty}
                </span>
              </div>

              {/* Progress Indicator */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {isCompleted ? 'Completed' : 'Not Started'}
                  </span>
                  <div className={`w-3 h-3 rounded-full ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No lessons found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your filters or search terms to find lessons.
          </p>
        </div>
      )}
    </div>
  );
};

export default LessonList;