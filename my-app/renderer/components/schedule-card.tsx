"use client"
import * as React from "react"
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

interface CardWithFormProps {
  title: string;
  description: string;
  button_text: string;
  file: string;
  code: string;
}

interface FileState {
  filePath: string | null;
  error: string | null;
}

export function CardWithForm({ 
  title, 
  description, 
  button_text,
  file,
  code
}: CardWithFormProps) {
  const [fileState, setFileState] = React.useState<FileState>({
    filePath: null,
    error: null
  });
  const [isLoading, setIsLoading] = React.useState(false);

  // Update fileState when file prop changes
  React.useEffect(() => {
    if (file) {
      setFileState({
        filePath: file,
        error: null
      });
    }
  }, [file]);

  const handleSubmit = async () => {
    if (!fileState.filePath) {
      setFileState(prev => ({...prev, error: 'Please select a file first'}));
      return;
    }

    try {
      setIsLoading(true);
      const today = new Date();
      const dateStr = today.getFullYear().toString() +
        (today.getMonth() + 1).toString().padStart(2, '0') +
        today.getDate().toString().padStart(2, '0');

      const response = await fetch('http://localhost:5000/api/execute-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          resolution: 'PT15M',
          date: dateStr,
          filename: fileState.filePath
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to execute script');
      }

      const result = await response.json();
      console.log('Script execution result:', result);

    } catch (error) {
      console.error('Error executing script:', error);
      setFileState(prev => ({
        ...prev, 
        error: error instanceof Error ? error.message : 'An error occurred'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          {fileState.filePath && (
            <p className="text-sm text-green-600">
              Selected: {fileState.filePath}
            </p>
          )}
          {fileState.error && (
            <p className="text-sm text-red-600">
              {fileState.error}
            </p>
          )}
        </div>
        <Button 
          onClick={handleSubmit} 
          disabled={!fileState.filePath || isLoading}
        >
          {isLoading ? 'Processing...' : button_text}
        </Button>
      </CardContent>
    </Card>
  )
}
