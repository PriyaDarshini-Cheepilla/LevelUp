import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Target, Clock, CheckCircle } from 'lucide-react';
import { QuizUI } from '../QuizUI';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '../ui/chart';

interface TestScreenProps {
  onNavigate: (screen: string) => void;
}

export function TestScreen({ onNavigate }: TestScreenProps) {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [testScore, setTestScore] = useState(0);

  const availableTests = [
    {
      id: 'react-advanced',
      title: 'React Advanced Patterns',
      description: 'Hooks, Context, Performance, Custom Hooks',
      difficulty: 'Advanced',
      duration: '25 min',
      questions: 20,
      completed: false,
      recommended: true
    },
    {
      id: 'typescript',
      title: 'TypeScript Fundamentals',
      description: 'Types, Interfaces, Generics, Advanced Types',
      difficulty: 'Intermediate',
      duration: '20 min',
      questions: 15,
      completed: true,
      score: 85
    },
    {
      id: 'algorithms',
      title: 'Data Structures & Algorithms',
      description: 'Arrays, Trees, Graphs, Dynamic Programming',
      difficulty: 'Advanced',
      duration: '30 min',
      questions: 25,
      completed: false
    }
  ];

  const mockQuestions = [
    {
      id: '1',
      question: 'What is the purpose of the useCallback hook in React?',
      options: [
        'To memoize a value that is expensive to compute',
        'To memoize a callback function to prevent unnecessary re-renders',
        'To create a ref that persists across renders',
        'To synchronize with an external system'
      ],
      correctAnswer: 1,
      explanation: 'useCallback returns a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality.'
    },
    {
      id: '2',
      question: 'Which pattern is best for managing complex global state in React?',
      options: [
        'Prop drilling',
        'Context API with useReducer',
        'Local component state',
        'Direct DOM manipulation'
      ],
      correctAnswer: 1,
      explanation: 'Context API combined with useReducer is ideal for managing complex global state as it provides a predictable state management pattern similar to Redux but built into React.'
    }
  ];

  const handleStartTest = (testId: string) => {
    setSelectedTest(testId);
    setShowResults(false);
  };

  const handleTestComplete = (score: number) => {
    setTestScore(score);
    setShowResults(true);
  };

  const handleRegenerate = () => {
    setSelectedTest(null);
    setShowResults(false);
  };

  const resultsData = [
    { category: 'Fundamentals', score: 90 },
    { category: 'Advanced Concepts', score: 75 },
    { category: 'Performance', score: 80 },
    { category: 'Best Practices', score: 85 }
  ];

  if (showResults) {
    return (
      <div className="min-h-screen bg-[var(--surface-muted)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)] mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-[var(--text-primary)] mb-3" style={{ fontWeight: 600, fontSize: '36px' }}>
              Test Complete!
            </h1>
            <p className="text-lg text-[var(--text-muted)]">
              You scored {testScore} out of {mockQuestions.length} questions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[var(--radius-md)] p-6 border border-gray-200"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <h3 className="text-[var(--text-primary)] mb-4" style={{ fontWeight: 600 }}>
                Your Score
              </h3>
              <div className="text-center py-6">
                <div className="text-5xl text-[var(--accent-solid)] mb-2" style={{ fontWeight: 600 }}>
                  {Math.round((testScore / mockQuestions.length) * 100)}%
                </div>
                <p className="text-[var(--text-muted)]">
                  {testScore} / {mockQuestions.length} correct
                </p>
              </div>
              <Progress value={(testScore / mockQuestions.length) * 100} className="h-2" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-[var(--radius-md)] p-6 border border-gray-200"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <h3 className="text-[var(--text-primary)] mb-4" style={{ fontWeight: 600 }}>
                Performance Breakdown
              </h3>
              <ChartContainer
                config={{
                  score: { label: 'Score', color: 'var(--accent-solid)' }
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={resultsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar
                      dataKey="score"
                      stroke="#5B8CFF"
                      fill="#5B8CFF"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </motion.div>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="rounded-lg"
              onClick={handleRegenerate}
            >
              Take New Attempt
            </Button>
            <Button
              size="lg"
              className="rounded-lg"
              onClick={() => onNavigate('dashboard')}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedTest) {
    return (
      <div className="min-h-screen bg-[var(--surface-muted)] py-12">
        <QuizUI
          questions={mockQuestions}
          onComplete={handleTestComplete}
          onRegenerate={handleRegenerate}
          showTimer
          timeLimit={30}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface-muted)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-[var(--text-primary)] mb-3" style={{ fontWeight: 600, fontSize: '36px' }}>
            Skill Tests
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl">
            Take adaptive skill tests to assess your knowledge. Each attempt generates unique questions 
            to ensure a fresh challenge every time.
          </p>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 border border-blue-200 rounded-[var(--radius-md)] p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <Target className="w-6 h-6 text-[var(--accent-solid)] flex-shrink-0 mt-0.5" />
            <div>
              <p style={{ fontWeight: 600 }} className="text-[var(--text-primary)] mb-2">
                How Our Adaptive Tests Work
              </p>
              <p className="text-sm text-[var(--text-muted)] mb-3">
                Each test generates unique questions using AI. You can retake tests multiple times, 
                and each attempt will have different questions to test your knowledge comprehensively. 
                Results are saved and contribute to your skill progress.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[var(--success)]" />
                  <span>Unique questions per attempt</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[var(--success)]" />
                  <span>Immediate feedback</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[var(--success)]" />
                  <span>Progress tracking</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableTests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-[var(--radius-md)] p-6 border border-gray-200 flex flex-col"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <Badge
                    variant={test.difficulty === 'Advanced' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {test.difficulty}
                  </Badge>
                  {test.recommended && (
                    <Badge className="bg-blue-50 text-[var(--accent-solid)] border-[var(--accent-solid)] text-xs">
                      Recommended
                    </Badge>
                  )}
                </div>

                <h3 className="text-[var(--text-primary)] mb-2" style={{ fontWeight: 600, fontSize: '18px' }}>
                  {test.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  {test.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{test.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>{test.questions} questions</span>
                  </div>
                </div>

                {test.completed && test.score !== undefined && (
                  <div className="mb-4 p-3 rounded-lg bg-green-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm" style={{ fontWeight: 600 }}>Last Score</span>
                      <span className="text-sm text-[var(--success)]" style={{ fontWeight: 600 }}>
                        {test.score}%
                      </span>
                    </div>
                    <Progress value={test.score} className="h-1.5" />
                  </div>
                )}
              </div>

              <Button
                className="w-full rounded-lg mt-4"
                variant={test.recommended ? 'default' : 'outline'}
                onClick={() => handleStartTest(test.id)}
              >
                {test.completed ? 'Retake Test' : 'Start Test'}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
