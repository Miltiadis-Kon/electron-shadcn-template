"use client"
import * as React from "react"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Label } from "../components/ui/label";

export function XMLInput({ onFileSelect }: { onFileSelect: (filename: string) => void }) {
  const [availableFiles, setAvailableFiles] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Fetch the list of available files when component mounts
    async function fetchFiles() {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/available-files');
        
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
        
        const data = await response.json();
        setAvailableFiles(data.files || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load files');
        console.error('Error fetching files:', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchFiles();
  }, []);

  const handleFileSelect = (value: string) => {
    onFileSelect(value);
  };

  if (isLoading) {
    return <div>Loading available files...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (availableFiles.length === 0) {
    return (
      <div>
        <p>No Excel files found. Please add .xlsx files to your designated folder.</p>
        <Button onClick={() => window.location.reload()}>Refresh</Button>
      </div>
    );
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
    <Label>b) Select Excel file.</Label>
    <div className="space-y-2">
      <Select onValueChange={handleFileSelect}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select Excel File" />
        </SelectTrigger>
        <SelectContent>
          {availableFiles.map((file) => (
            <SelectItem key={file} value={file}>{file}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    </div>
  )
}
