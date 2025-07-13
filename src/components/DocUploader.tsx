import { useRef } from 'react';
import { Flashcard } from '../types';
import mammoth from 'mammoth';

interface Props {
  onAddBatch: (cards: Flashcard[]) => void;
}

export function DocUploader({ onAddBatch }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const parseTextToFlashcards = (text: string): Flashcard[] => {
    const lines = text.split('\n');
    const flashcards: Flashcard[] = [];
    let currentQ = '';
    let currentA = '';
    let id = Date.now();

    lines.forEach(line => {
      if (line.trim().startsWith('Q:')) {
        currentQ = line.replace('Q:', '').trim();
      } else if (line.trim().startsWith('A:')) {
        currentA = line.replace('A:', '').trim();
        if (currentQ && currentA) {
          flashcards.push({
            id: id++,
            question: currentQ,
            answer: currentA,
            category: 'Auto',
            difficulty: 'Medium',
          });
          currentQ = '';
          currentA = '';
        }
      }
    });

    return flashcards;
  };

  const handleFileUpload = async (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (ext === 'txt') {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        const flashcards = parseTextToFlashcards(text);
        onAddBatch(flashcards);
      };
      reader.readAsText(file);
    } else if (ext === 'docx') {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const flashcards = parseTextToFlashcards(result.value);
      onAddBatch(flashcards);
    } else {
      alert('Please upload a .txt or .docx file');
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>📄 Upload Study Notes (.txt or .docx)</h3>
      <input
        ref={inputRef}
        type="file"
        accept=".txt,.docx"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
      />
    </div>
  );
}
