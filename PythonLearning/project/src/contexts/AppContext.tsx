import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress } from '../types';

interface AppContextType {
  userProgress: UserProgress;
  updateProgress: (lessonId: number, score?: number) => void;
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('python-learning-progress');
    return saved ? JSON.parse(saved) : {
      completedLessons: [],
      totalScore: 0,
      currentStreak: 0,
      achievements: []
    };
  });

  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('python-learning-theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('python-learning-progress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem('python-learning-theme', currentTheme);
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  }, [currentTheme]);

  const updateProgress = (lessonId: number, score: number = 0) => {
    setUserProgress(prev => {
      const newCompletedLessons = prev.completedLessons.includes(lessonId) 
        ? prev.completedLessons 
        : [...prev.completedLessons, lessonId];
      
      const newAchievements = [...prev.achievements];
      
      // Add achievements based on progress
      if (newCompletedLessons.length === 1 && !newAchievements.includes('First Steps')) {
        newAchievements.push('First Steps');
      }
      if (newCompletedLessons.length === 10 && !newAchievements.includes('Python Explorer')) {
        newAchievements.push('Python Explorer');
      }
      if (newCompletedLessons.length === 25 && !newAchievements.includes('Python Master')) {
        newAchievements.push('Python Master');
      }

      return {
        completedLessons: newCompletedLessons,
        totalScore: prev.totalScore + score,
        currentStreak: prev.currentStreak + 1,
        achievements: newAchievements
      };
    });
  };

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider value={{
      userProgress,
      updateProgress,
      currentTheme,
      toggleTheme,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </AppContext.Provider>
  );
};