import './Flashcard.css';
import { Flashcard as FlashcardType } from '../types';

interface Props {
  flashcard: FlashcardType;
  showAnswer: boolean;
  onSelect: (correct: boolean) => void;
}

export function Flashcard({ flashcard, showAnswer, onSelect }: Props) {
  return (
    <div className={`flashcard ${showAnswer ? 'flipped' : ''}`}>
      <div className="front">
        <h2>{flashcard.question}</h2>
        <p><strong>Category:</strong> {flashcard.category}</p>
        <p><strong>Difficulty:</strong> {flashcard.difficulty}</p>
        <button onClick={() => onSelect(true)}>I knew it</button>
        <button onClick={() => onSelect(false)}>I didn’t</button>
      </div>
      <div className="back">
        <p>Answer: {flashcard.answer}</p>
      </div>
    </div>
  );
}
