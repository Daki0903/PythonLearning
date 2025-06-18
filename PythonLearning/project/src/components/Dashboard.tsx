import React from 'react';
import { BookOpen, Trophy, Target, TrendingUp, Clock, Star, Award, Code } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { allLessons } from '../data/lessons';

interface DashboardProps {
  onNavigate: (page: string, lessonId?: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { userProgress } = useApp();

  const completionPercentage = Math.round((userProgress.completedLessons.length / allLessons.length) * 100);
  
  const recentLessons = allLessons
    .filter(lesson => userProgress.completedLessons.includes(lesson.id))
    .slice(-3);

  const nextLessons = allLessons
    .filter(lesson => !userProgress.completedLessons.includes(lesson.id))
    .slice(0, 3);

  const stats = [
    {
      label: 'Lessons Completed',
      value: userProgress.completedLessons.length,
      total: allLessons.length,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900'
    },
    {
      label: 'Total Score',
      value: userProgress.totalScore,
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900'
    },
    {
      label: 'Current Streak',
      value: userProgress.currentStreak,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900'
    },
    {
      label: 'Achievements',
      value: userProgress.achievements.length,
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-blue-100 text-lg">
              You've completed {userProgress.completedLessons.length} lessons. Keep up the great work!
            </p>
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span className="font-medium">{completionPercentage}% Complete</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">~{(allLessons.length - userProgress.completedLessons.length) * 25} min remaining</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
              <Code className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{completionPercentage}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                    {stat.total && (
                      <span className="text-lg text-gray-500 dark:text-gray-400">
                        /{stat.total}
                      </span>
                    )}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Continue Learning */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Continue Learning</h2>
            <button
              onClick={() => onNavigate('lessons')}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {nextLessons.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => onNavigate('lesson', lesson.id)}
                className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{lesson.title}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{lesson.category}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{lesson.duration}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      lesson.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                      lesson.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
          
          {recentLessons.length > 0 ? (
            <div className="space-y-4">
              {recentLessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{lesson.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Completed • {lesson.category}</p>
                  </div>
                  <div className="text-green-600 dark:text-green-400">
                    <Trophy className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No completed lessons yet.</p>
              <p className="text-gray-500 dark:text-gray-400">Start your first lesson to see activity here!</p>
            </div>
          )}

          {/* Achievements */}
          {userProgress.achievements.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Latest Achievements</h3>
              <div className="flex flex-wrap gap-2">
                {userProgress.achievements.map((achievement, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                  >
                    <Award className="w-3 h-3 mr-1" />
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;