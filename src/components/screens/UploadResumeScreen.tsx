import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Plus, Trash2 } from 'lucide-react';
import { UploadArea } from '../UploadArea';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Separator } from '../ui/separator';

interface UploadResumeScreenProps {
  onNavigate: (screen: string) => void;
}

interface ParsedData {
  fileName: string;
  skills: string[];
  education: string;
  experience: string;
}

export function UploadResumeScreen({ onNavigate }: UploadResumeScreenProps) {
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [skillProficiencies, setSkillProficiencies] = useState<Record<string, number>>({});

  const handleUploadComplete = (data: ParsedData) => {
    setParsedData(data);
    // Initialize proficiencies
    const initialProficiencies: Record<string, number> = {};
    data.skills.forEach(skill => {
      initialProficiencies[skill] = 60; // Default to 60%
    });
    setSkillProficiencies(initialProficiencies);
  };

  const handleProficiencyChange = (skill: string, value: number[]) => {
    setSkillProficiencies(prev => ({
      ...prev,
      [skill]: value[0]
    }));
  };

  const handleContinue = () => {
    // In a real app, this would save the data and redirect
    onNavigate('career');
  };

  return (
    <div className="min-h-screen bg-[var(--surface-muted)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-[var(--text-primary)] mb-3" style={{ fontWeight: 600, fontSize: '36px' }}>
            Upload Your Resume
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            Drag & drop your PDF/DOCX or click to upload. We extract skills, education, and projects 
            to build your personalized career roadmap.
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <UploadArea onUploadComplete={handleUploadComplete} />
        </motion.div>

        {/* Parsed Data Preview */}
        {parsedData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            {/* Success Message */}
            <div className="bg-green-50 border border-[var(--success)] rounded-[var(--radius-md)] p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[var(--success)] flex-shrink-0 mt-0.5" />
                <div>
                  <p style={{ fontWeight: 600 }} className="text-[var(--text-primary)] mb-1">
                    Resume Parsed Successfully!
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    We've extracted your skills, education, and experience. Review and adjust below.
                  </p>
                </div>
              </div>
            </div>

            {/* Extracted Skills */}
            <div className="bg-white rounded-[var(--radius-md)] p-6 border border-gray-200" style={{ boxShadow: 'var(--shadow-card)' }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[var(--text-primary)]" style={{ fontWeight: 600, fontSize: '20px' }}>
                    Extracted Skills
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    Adjust proficiency levels (0-100) for each skill
                  </p>
                </div>
                <Button variant="outline" size="sm" className="rounded-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </div>

              <div className="space-y-6">
                {parsedData.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-blue-50 text-[var(--accent-solid)] border-[var(--accent-solid)]">
                          {skill}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-[var(--text-muted)] hover:text-[var(--danger)]"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-[var(--text-muted)] min-w-[60px] text-right">
                          {skillProficiencies[skill]}% proficient
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg text-xs h-7"
                          onClick={() => onNavigate('courses')}
                        >
                          Learn
                        </Button>
                      </div>
                    </div>
                    <Slider
                      value={[skillProficiencies[skill] || 60]}
                      onValueChange={(value) => handleProficiencyChange(skill, value)}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education & Experience */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-[var(--radius-md)] p-6 border border-gray-200" style={{ boxShadow: 'var(--shadow-card)' }}>
                <h3 className="text-[var(--text-primary)] mb-3" style={{ fontWeight: 600 }}>
                  Education
                </h3>
                <p className="text-[var(--text-muted)]">{parsedData.education}</p>
              </div>

              <div className="bg-white rounded-[var(--radius-md)] p-6 border border-gray-200" style={{ boxShadow: 'var(--shadow-card)' }}>
                <h3 className="text-[var(--text-primary)] mb-3" style={{ fontWeight: 600 }}>
                  Experience
                </h3>
                <p className="text-[var(--text-muted)]">{parsedData.experience}</p>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Privacy Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-md)] p-4">
              <p className="text-sm text-[var(--text-primary)]">
                🔒 <span style={{ fontWeight: 600 }}>Privacy Note:</span> Your resume is stored securely 
                in Firestore with industry-standard encryption. You can download or delete your data 
                anytime from your dashboard settings.
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                size="lg"
                className="rounded-lg"
                onClick={() => setParsedData(null)}
              >
                Upload New Resume
              </Button>
              <Button
                size="lg"
                className="rounded-lg bg-gradient-to-r from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)]"
                onClick={handleContinue}
              >
                Continue to Career Path
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
