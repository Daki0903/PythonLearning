import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import LessonList from './components/LessonList';
import LessonDetail from './components/LessonDetail';
import QASection from './components/QASection';
import Activities from './components/Activities';

type Page = 'dashboard' | 'lessons' | 'lesson' | 'qa' | 'activities';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

  const handleNavigate = (page: string, lessonId?: number) => {
    setCurrentPage(page as Page);
    if (lessonId) {
      setSelectedLessonId(lessonId);
    }
  };

  const handleSelectLesson = (lessonId: number) => {
    setSelectedLessonId(lessonId);
    setCurrentPage('lesson');
  };

  const handleBackToLessons = () => {
    setCurrentPage('lessons');
    setSelectedLessonId(null);
  };

  const handleNextLesson = (nextLessonId: number) => {
    setSelectedLessonId(nextLessonId);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'lessons':
        return <LessonList onSelectLesson={handleSelectLesson} />;
      case 'lesson':
        return selectedLessonId ? (
          <LessonDetail
            lessonId={selectedLessonId}
            onBack={handleBackToLessons}
            onNext={handleNextLesson}
          />
        ) : (
          <LessonList onSelectLesson={handleSelectLesson} />
        );
      case 'qa':
        return <QASection />;
      case 'activities':
        return <Activities />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Header onNavigate={handleNavigate} currentPage={currentPage} />
          <main>
            {renderCurrentPage()}
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;