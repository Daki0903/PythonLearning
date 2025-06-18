import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Clock, CheckCircle, Copy, Play, RotateCcw } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { allLessons } from '../data/lessons';
import { Lesson, Exercise } from '../types';

interface LessonDetailProps {
  lessonId: number;
  onBack: () => void;
  onNext: (nextLessonId: number) => void;
}

const LessonDetail: React.FC<LessonDetailProps> = ({ lessonId, onBack, onNext }) => {
  const { userProgress, updateProgress } = useApp();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: any }>({});
  const [showResults, setShowResults] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const lesson = allLessons.find(l => l.id === lessonId);
  const isCompleted = userProgress.completedLessons.includes(lessonId);
  const nextLesson = allLessons.find(l => l.id === lessonId + 1);

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lesson not found</h1>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleAnswerSelect = (exerciseId: number, answer: any) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [exerciseId]: answer
    }));
  };

  const handleSubmitExercises = () => {
    let score = 0;
    lesson.exercises.forEach(exercise => {
      const userAnswer = selectedAnswers[exercise.id];
      if (userAnswer === exercise.correctAnswer) {
        score += 10;
      }
    });

    setShowResults(true);
    
    if (!isCompleted) {
      updateProgress(lessonId, score);
    }
  };

  const handleCopyCode = () => {
    if (lesson.codeExample) {
      navigator.clipboard.writeText(lesson.codeExample);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const resetExercises = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setCurrentExercise(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Lessons</span>
        </button>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {lesson.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Lesson {lesson.id} • {lesson.category}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {lesson.duration}
                </span>
              </div>
              <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                lesson.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                lesson.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              }`}>
                {lesson.difficulty}
              </span>
              {isCompleted && (
                <span className="flex items-center space-x-1 text-sm text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4" />
                  <span>Completed</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Lesson Content */}
        <div className="p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {lesson.content}
            </div>
          </div>

          {/* Code Example */}
          {lesson.codeExample && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Code Example
                </h3>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center space-x-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                <pre className="text-sm text-gray-100">
                  <code>{lesson.codeExample}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Exercises */}
        {lesson.exercises.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Practice Exercises
              </h3>
              {showResults && (
                <button
                  onClick={resetExercises}
                  className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <div className="space-y-6">
              {lesson.exercises.map((exercise, index) => (
                <div key={exercise.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                    Question {index + 1}: {exercise.question}
                  </h4>

                  {exercise.type === 'multiple-choice' && exercise.options && (
                    <div className="space-y-2">
                      {exercise.options.map((option, optionIndex) => {
                        const isSelected = selectedAnswers[exercise.id] === optionIndex;
                        const isCorrect = exercise.correctAnswer === optionIndex;
                        const showCorrectAnswer = showResults && isCorrect;
                        const showIncorrectAnswer = showResults && isSelected && !isCorrect;

                        return (
                          <label
                            key={optionIndex}
                            className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                              showCorrectAnswer 
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                              showIncorrectAnswer 
                                ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                              isSelected 
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' :
                                'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`exercise-${exercise.id}`}
                              checked={isSelected}
                              onChange={() => handleAnswerSelect(exercise.id, optionIndex)}
                              disabled={showResults}
                              className="text-blue-600"
                            />
                            <span className="text-gray-900 dark:text-white">{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {exercise.type === 'fill-blank' && (
                    <input
                      type="text"
                      placeholder="Enter your answer..."
                      value={selectedAnswers[exercise.id] || ''}
                      onChange={(e) => handleAnswerSelect(exercise.id, e.target.value)}
                      disabled={showResults}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}

                  {showResults && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>Explanation:</strong> {exercise.explanation}
                      </p>
                      {selectedAnswers[exercise.id] === exercise.correctAnswer ? (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                          ✓ Correct!
                        </p>
                      ) : (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                          ✗ Incorrect. The correct answer is: {
                            exercise.type === 'multiple-choice' && exercise.options
                              ? exercise.options[exercise.correctAnswer as number]
                              : exercise.correctAnswer
                          }
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!showResults && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleSubmitExercises}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Submit Answers
                </button>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-700">
          <div className="flex justify-between items-center">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Lessons</span>
            </button>

            {nextLesson && (
              <button
                onClick={() => onNext(nextLesson.id)}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Next Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;