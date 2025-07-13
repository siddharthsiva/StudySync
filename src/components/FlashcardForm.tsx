import { useState } from 'react';
import { Flashcard } from '../types';

interface Props {
  onAdd: (card: Flashcard) => void;
}

export function FlashcardForm({ onAdd }: Props) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: Date.now(),
      question,
      answer,
      category,
      difficulty
    });
    setQuestion('');
    setAnswer('');
    setCategory('');
    setDifficulty('Easy');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Question" required />
      <input value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Answer" required />
      <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" required />
      <select value={difficulty} onChange={e => setDifficulty(e.target.value as any)}>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <button type="submit">Add Flashcard</button>
    </form>
  );
}
