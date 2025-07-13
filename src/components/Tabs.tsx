import { useState } from 'react';
import { Flashcard } from '../types';
import { Flashcard as FlashcardComponent } from './Flashcard';
import { FlashcardForm } from './FlashcardForm';
import { DocUploader } from './DocUploader';

interface Props {
  cards: Flashcard[];
  onAddCard: (card: Flashcard) => void;
  onAddBatch: (cards: Flashcard[]) => void;
  current: number;
  showAnswer: boolean;
  onSelect: (correct: boolean) => void;
  filtered: Flashcard[];
  secondsLeft: number;
  score: number;
}

export function Tabs({
  cards,
  onAddCard,
  onAddBatch,
  current,
  showAnswer,
  onSelect,
  filtered,
  secondsLeft,
  score,
}: Props) {
  const [activeTab, setActiveTab] = useState<'quiz' | 'add' | 'upload'>('quiz');

  const tabStyle = (tab: string) =>
    `cursor-pointer px-4 py-2 border-b-2 ${activeTab === tab ? 'border-blue-500 font-bold' : 'border-transparent'}`;

  return (
    <div>
      {/* Tab Selector */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div className={tabStyle('quiz')} onClick={() => setActiveTab('quiz')}>🧠 Quiz</div>
        <div className={tabStyle('add')} onClick={() => setActiveTab('add')}>➕ Add Cards</div>
        <div className={tabStyle('upload')} onClick={() => setActiveTab('upload')}>📄 Upload Notes</div>
      </div>

      {/* Tab Content */}
      {activeTab === 'quiz' && (
        <>
          <h3>Time left: {secondsLeft}s</h3>
          {secondsLeft <= 0 || current >= filtered.length ? (
            <div className="quiz-end">
              <h2>⏱️ Done!</h2>
              <p>Your Score: {score} / {filtered.length}</p>
            </div>
          ) : (
            <FlashcardComponent
              flashcard={filtered[current]}
              showAnswer={showAnswer}
              onSelect={onSelect}
            />
          )}
        </>
      )}

      {activeTab === 'add' && (
        <div style={{ marginTop: '1rem' }}>
          <FlashcardForm onAdd={onAddCard} />
        </div>
      )}

      {activeTab === 'upload' && (
        <div style={{ marginTop: '1rem' }}>
          <DocUploader onAddBatch={onAddBatch} />
        </div>
      )}
    </div>
  );
}
