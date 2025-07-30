// src/components/study/ExplanationStage.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CodeBlock from './CodeBlock';

interface Props {
  text: string;
  onNext: (stage: 'realisation') => void;
}

export default function ExplanationStage({ text, onNext }: Props) {
  // Pisahkan kode dari teks
  const parts = text.split(/```([\s\S]*?)```/);

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Penjelasan Materi</h2>
        <div className="prose max-w-none">
          {parts.map((part, i) =>
            i % 2 === 0 ? (
              <p key={i}>{part}</p>
            ) : (
              <CodeBlock key={i} code={part.trim()} />
            )
          )}
        </div>
        <Button onClick={() => onNext('realisation')} className="w-full">
          Lanjut ke Realisasi
        </Button>
      </CardContent>
    </Card>
  );
}