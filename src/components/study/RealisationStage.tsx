// src/components/study/RealisationStage.tsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import api from '@/lib/api';

interface Props {
  problem: string;
  onNext: (stage: 'recall') => void;
}

export default function RealisationStage({ problem, onNext }: Props) {
  const [code, setCode] = useState(`# Tulis solusi kamu di sini
print("Hello world")

# Contoh algoritma sederhana
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

# Test
numbers = [64, 34, 25, 12, 22, 11, 90]
print("Sorted array:", bubble_sort(numbers))`);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const runCode = async () => {
    setIsLoading(true);
    try {
      const res = await api.post('/run-python', { code });
      setOutput(res.data.output);
    } catch (error) {
      console.log('Backend not available, using mock output');
      // Mock output for demo
      setOutput(`Hello world
Sorted array: [11, 12, 22, 25, 34, 64, 90]

Demo Mode: Backend belum tersedia.
Dalam mode produksi, kode Python akan dijalankan di server.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelesai = () => {
    onNext('recall');
  };

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Realisasi Solusi</h2>
        <p className="text-sm text-gray-600">
          {problem || 'Implementasikan solusi algoritma yang telah dipelajari'}
        </p>
        
        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
          💡 Demo Mode: Backend belum tersedia. Kode akan dijalankan dengan mock output.
        </div>
        
        <Textarea
          value={code}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCode(e.target.value)}
          className="font-mono h-48"
          placeholder="Tulis kode Python Anda di sini..."
        />
        <Button onClick={runCode} disabled={isLoading}>
          {isLoading ? 'Menjalankan...' : 'Run Code'}
        </Button>
        {output && (
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
            {output}
          </pre>
        )}
        <Button onClick={handleSelesai} className="w-full">
          Selesai & Lanjut ke Recall
        </Button>
      </CardContent>
    </Card>
  );
}