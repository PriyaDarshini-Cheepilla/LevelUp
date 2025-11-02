import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Clock, RotateCw } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizUIProps {
  questions: QuizQuestion[];
  onComplete?: (score: number) => void;
  onRegenerate?: () => void;
  showTimer?: boolean;
  timeLimit?: number; 
}

export function QuizUI({ questions, onComplete, onRegenerate, showTimer = false, timeLimit = 30 }: QuizUIProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showRegenerateDialog, setShowRegenerateDialog] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  useEffect(() => {
    if (showTimer && !isAnswered && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return timeLimit;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isAnswered, showTimer]);

  const handleSelectAnswer = (index: number) => {
    if (!isAnswered) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null || timeLeft === 0) {
      setIsAnswered(true);
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(timeLimit);
    } else {
      onComplete?.(score + (isCorrect ? 1 : 0));
    }
  };

  const handleRegenerate = () => {
    setShowRegenerateDialog(false);
    onRegenerate?.();
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-[var(--text-muted)] mb-1">
              Question {currentIndex + 1} of {questions.length}
            </p>
            <Progress value={progress} className="h-2 w-64" />
          </div>
          <div className="flex items-center gap-4">
            {showTimer && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100">
                <Clock className="w-4 h-4 text-[var(--text-muted)]" />
                <span className="text-sm" style={{ fontWeight: 600 }}>
                  {timeLeft}s
                </span>
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg"
              onClick={() => setShowRegenerateDialog(true)}
            >
              <RotateCw className="w-4 h-4 mr-2" />
              New Attempt
            </Button>
          </div>
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-[var(--radius-lg)] p-8 border border-gray-200" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h2 className="text-[var(--text-primary)] mb-6" style={{ fontWeight: 600, fontSize: '24px' }}>
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectOption = index === currentQuestion.correctAnswer;
                const showCorrect = isAnswered && isCorrectOption;
                const showIncorrect = isAnswered && isSelected && !isCorrectOption;

                return (
                  <motion.button
                    key={index}
                    whileHover={!isAnswered ? { y: -2 } : {}}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={isAnswered}
                    className={`
                      w-full p-4 rounded-[var(--radius-md)] border-2 text-left
                      transition-all duration-200 flex items-center gap-3
                      ${!isAnswered && !isSelected ? 'border-gray-200 hover:border-[var(--accent-solid)] hover:bg-blue-50' : ''}
                      ${!isAnswered && isSelected ? 'border-[var(--accent-solid)] bg-blue-50' : ''}
                      ${showCorrect ? 'border-[var(--success)] bg-green-50' : ''}
                      ${showIncorrect ? 'border-[var(--danger)] bg-red-50' : ''}
                    `}
                  >
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                      ${!isAnswered && isSelected ? 'border-[var(--accent-solid)] bg-[var(--accent-solid)]' : 'border-gray-300'}
                      ${showCorrect ? 'border-[var(--success)] bg-[var(--success)]' : ''}
                      ${showIncorrect ? 'border-[var(--danger)] bg-[var(--danger)]' : ''}
                    `}>
                      {isSelected && !isAnswered && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                      {showCorrect && <Check className="w-4 h-4 text-white" />}
                      {showIncorrect && <X className="w-4 h-4 text-white" />}
                    </div>
                    <span className="flex-1">{option}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                rounded-[var(--radius-md)] p-6 border-l-4
                ${isCorrect ? 'bg-green-50 border-[var(--success)]' : 'bg-red-50 border-[var(--danger)]'}
              `}
            >
              <div className="flex items-start gap-3 mb-2">
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center
                  ${isCorrect ? 'bg-[var(--success)]' : 'bg-[var(--danger)]'}
                `}>
                  {isCorrect ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <X className="w-4 h-4 text-white" />
                  )}
                </div>
                <p style={{ fontWeight: 600 }}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
              </div>
              <p className="text-sm text-[var(--text-muted)] ml-9">
                {currentQuestion.explanation}
              </p>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            {!isAnswered ? (
              <Button
                size="lg"
                className="rounded-lg px-8"
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                size="lg"
                className="rounded-lg px-8"
                onClick={handleNext}
              >
                {currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Regenerate Dialog */}
      <AlertDialog open={showRegenerateDialog} onOpenChange={setShowRegenerateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Generate New Test Attempt?</AlertDialogTitle>
            <AlertDialogDescription>
              This will generate a fresh set of unique questions for this test. Your current progress will be lost.
              Each attempt uses a unique seed to ensure different questions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRegenerate}>
              Generate New Questions
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
