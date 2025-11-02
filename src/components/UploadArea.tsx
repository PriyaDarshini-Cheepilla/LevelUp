import { useState, useRef } from 'react';
import { Upload, FileText, Check, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface UploadAreaProps {
  onUploadComplete?: (data: any) => void;
}

export function UploadArea({ onUploadComplete }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || 
        droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      processFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    setUploading(true);
    setProgress(0);

    // Simulate upload and parsing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          // Simulate parsed data
          setTimeout(() => {
            onUploadComplete?.({
              fileName: selectedFile.name,
              skills: ['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Git'],
              education: 'BS Computer Science',
              experience: '2 years'
            });
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleRemove = () => {
    setFile(null);
    setProgress(0);
    setUploading(false);
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx"
        className="hidden"
        onChange={handleFileSelect}
      />

      {!file ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            relative border-2 border-dashed rounded-[var(--radius-lg)] p-12
            transition-all duration-200 cursor-pointer
            ${isDragging 
              ? 'border-[var(--accent-solid)] bg-blue-50/50' 
              : 'border-gray-300 hover:border-[var(--accent-solid)] hover:bg-gray-50'
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)] flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <p className="text-[var(--text-primary)] mb-1" style={{ fontWeight: 600 }}>
                Drop your resume here, or click to browse
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                Supports PDF and DOCX • Max 10MB
              </p>
            </div>
            <p className="text-xs text-[var(--text-muted)] max-w-md text-center">
              We extract skills, education, and projects to build your personalized career roadmap.
              Your data is stored securely and you can delete it anytime.
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border border-gray-200 rounded-[var(--radius-md)] p-6 bg-white"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-[var(--accent-solid)]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ fontWeight: 600 }}>
                    {file.name}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {!uploading && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    onClick={handleRemove}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              {uploading ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--text-muted)]">Parsing resume...</span>
                    <span className="text-[var(--accent-solid)]" style={{ fontWeight: 600 }}>
                      {progress}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-1.5" />
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-[var(--success)]">
                  <Check className="w-4 h-4" />
                  <span style={{ fontWeight: 600 }}>Upload complete</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
