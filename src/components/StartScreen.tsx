import { useState } from 'react';
import { FlashcardForm } from './FlashcardForm';
import { DocUploader } from './DocUploader';
import { Flashcard } from '../types';

interface Props {
  categories: string[];
  onStart: (config: {
    category: string;
    difficulty: string;
    questionCount: number;
    timeLimit: number;
    mode: 'timer' | 'stopwatch';
  }) => void;
  onAddCard: (card: Flashcard) => void;
  onAddBatch: (cards: Flashcard[]) => void;
}

export function StartScreen({ categories, onStart, onAddCard, onAddBatch }: Props) {
  const [activeTab, setActiveTab] = useState<'quiz' | 'add' | 'upload'>('quiz');

  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [timeLimit, setTimeLimit] = useState(60);
  const [mode, setMode] = useState<'timer' | 'stopwatch'>('timer');

  return (
    <div style={{ maxWidth: '550px', margin: '3rem auto', padding: '2rem', background: '#f9faff', borderRadius: '12px', boxShadow: '0 0 20px rgba(0,0,0,0.05)' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div onClick={() => setActiveTab('quiz')} className={`tab ${activeTab === 'quiz' ? 'active-tab' : ''}`} style={tabStyle(activeTab === 'quiz')}>🧠 Quiz</div>
        <div onClick={() => setActiveTab('add')} className={`tab ${activeTab === 'add' ? 'active-tab' : ''}`} style={tabStyle(activeTab === 'add')}>➕ Add Cards</div>
        <div onClick={() => setActiveTab('upload')} className={`tab ${activeTab === 'upload' ? 'active-tab' : ''}`} style={tabStyle(activeTab === 'upload')}>📄 Upload Notes</div>
      </div>

      {/* Quiz Settings */}
      {activeTab === 'quiz' && (
        <>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>🧠 Configure Your Quiz</h2>

          <label style={labelStyle}>Select Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={selectStyle}>
            <option value="">All Categories</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>

          <label style={labelStyle}>Select Difficulty:</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} style={selectStyle}>
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <label style={labelStyle}>Number of Questions:</label>
          <input
            type="number"
            min={1}
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            style={inputStyle}
          />

          {mode === 'timer' && (
            <>
              <label style={labelStyle}>Time Limit (seconds):</label>
              <input
                type="number"
                min={10}
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                style={inputStyle}
              />
            </>
          )}

          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <label>
              <input
                type="radio"
                value="timer"
                checked={mode === 'timer'}
                onChange={() => setMode('timer')}
              /> Timer Mode
            </label>
            <label>
              <input
                type="radio"
                value="stopwatch"
                checked={mode === 'stopwatch'}
                onChange={() => setMode('stopwatch')}
              /> Stopwatch Mode
            </label>
          </div>

          <button
            onClick={() =>
              onStart({ category, difficulty, questionCount, timeLimit, mode })
            }
            style={buttonStyle}
          >
            🚀 Start Quiz
          </button>
        </>
      )}

      {activeTab === 'add' && (
        <>
          <h2 style={{ textAlign: 'center' }}>➕ Add Flashcard</h2>
          <FlashcardForm onAdd={onAddCard} />
        </>
      )}

      {activeTab === 'upload' && (
        <>
          <h2 style={{ textAlign: 'center' }}>📄 Upload Notes</h2>
          <DocUploader onAddBatch={onAddBatch} />
        </>
      )}
    </div>
  );
}

// Reusable styles
const labelStyle = { display: 'block', marginTop: '1rem', marginBottom: '0.5rem' };

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

const selectStyle = {
  ...inputStyle
};

const buttonStyle = {
  marginTop: '2rem',
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#3b82f6',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1rem',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer'
};

const tabStyle = (active: boolean): React.CSSProperties => ({
  padding: '0.5rem 1.2rem',
  borderRadius: '6px',
  backgroundColor: active ? '#3b82f6' : '#e0e7ff',
  color: active ? 'white' : '#333',
  fontWeight: 600,
  cursor: 'pointer',
  transition: '0.2s ease all'
});
