export interface Lesson {
  id: number;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  description: string;
  content: string;
  codeExample?: string;
  exercises: Exercise[];
  completed?: boolean;
}

export interface Exercise {
  id: number;
  question: string;
  type: 'multiple-choice' | 'code' | 'fill-blank';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

export interface QAItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  difficulty: string;
  tags: string[];
}

export interface UserProgress {
  completedLessons: number[];
  totalScore: number;
  currentStreak: number;
  achievements: string[];
}