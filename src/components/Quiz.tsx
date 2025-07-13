import { useEffect, useState } from 'react';
import { Flashcard } from '../types';
import { Tabs } from './Tabs';
import { StartScreen } from './StartScreen';
import { Stopwatch } from './Stopwatch';
import './Quiz.css';

export function Quiz() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [filtered, setFiltered] = useState<Flashcard[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [showAnswer, setShowAnswer] = useState(false);
  const [mode, setMode] = useState<'setup' | 'quiz'>('setup');
  const [isStopwatch, setIsStopwatch] = useState(false);
  const [loading, setLoading] = useState(false);

  const categoryList = [
    'Math', 'Science', 'History', 'Programming',
    'Geography', 'Vocabulary', 'Literature'
  ];

  const startQuiz = async (config: {
    category: string;
    difficulty: string;
    questionCount: number;
    timeLimit: number;
    mode: 'timer' | 'stopwatch';
  }) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: config.category,
          questionCount: config.questionCount,
        }),
      });

      const cardsRaw = await response.json();

      const flashcards: Flashcard[] = cardsRaw.map((item: any, index: number) => ({
        id: Date.now() + index,
        question: item.question,
        answer: item.answer,
        category: config.category,
        difficulty: config.difficulty || 'Medium',
      }));

      setCards(flashcards);
      setFiltered(flashcards);
      setSecondsLeft(config.timeLimit);
      setIsStopwatch(config.mode === 'stopwatch');
      setMode('quiz');
    } catch (err) {
      console.error('❌ Failed to load flashcards from backend:', err);
      alert('❌ Failed to generate flashcards. Please check your backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isStopwatch && mode === 'quiz') {
      const timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isStopwatch, mode]);

  const handleAnswer = (correct: boolean) => {
    setShowAnswer(true);
    if (correct) setScore((prev) => prev + 1);
    setTimeout(() => {
      setShowAnswer(false);
      setCurrent((prev) => prev + 1);
    }, 1500);
  };

  const handleAddCard = (card: Flashcard) => {
    setCards((prev) => [...prev, card]);
    setFiltered((prev) => [...prev, card]);
  };

  const handleAddBatch = (newCards: Flashcard[]) => {
    setCards((prev) => [...prev, ...newCards]);
    setFiltered((prev) => [...prev, ...newCards]);
  };

  if (mode === 'setup') {
    return (
      <StartScreen
        categories={categoryList}
        onStart={startQuiz}
        onAddCard={handleAddCard}
        onAddBatch={handleAddBatch}
      />
    );
  }

  if ((!isStopwatch && secondsLeft <= 0) || current >= filtered.length) {
    return (
      <div className="quiz-end">
        <h2>⏱️ Done!</h2>
        <p>Your Score: {score} / {filtered.length}</p>
      </div>
    );
  }

  return (
    <div>
      {loading && <p>🔄 Generating flashcards from Claude...</p>}
      {!isStopwatch && <h3>Time left: {secondsLeft}s</h3>}
      {isStopwatch && <Stopwatch />}
      <Tabs
        cards={cards}
        onAddCard={handleAddCard}
        onAddBatch={handleAddBatch}
        current={current}
        showAnswer={showAnswer}
        onSelect={handleAnswer}
        filtered={filtered}
        secondsLeft={secondsLeft}
        score={score}
      />
    </div>
  );
}
