import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, MapPin, DollarSign, Target, CheckCircle, X, Send, Bookmark } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';

interface JobsScreenProps {
  onNavigate: (screen: string) => void;
}

export function JobsScreen({ onNavigate }: JobsScreenProps) {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [autoApplyEnabled, setAutoApplyEnabled] = useState(false);

  const jobs = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$140k - $180k',
      matchScore: 85,
      matchedSkills: ['React', 'TypeScript', 'Node.js', 'CSS'],
      missingSkills: ['AWS', 'GraphQL'],
      description: 'We are looking for an experienced Frontend Developer to join our growing team...',
      requirements: [
        '5+ years of React experience',
        'Strong TypeScript skills',
        'Experience with modern build tools',
        'Cloud deployment experience preferred'
      ],
      posted: '2 days ago',
      applicants: 45
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120k - $160k',
      matchScore: 78,
      matchedSkills: ['React', 'Node.js', 'SQL'],
      missingSkills: ['AWS', 'Docker', 'Kubernetes'],
      description: 'Join our fast-paced startup as a Full Stack Engineer...',
      requirements: [
        '3+ years full stack development',
        'React and Node.js expertise',
        'Database design experience',
        'Startup experience a plus'
      ],
      posted: '5 days ago',
      applicants: 67
    },
    {
      id: '3',
      title: 'React Native Developer',
      company: 'MobileFirst',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$130k - $150k',
      matchScore: 72,
      matchedSkills: ['React', 'JavaScript', 'TypeScript'],
      missingSkills: ['React Native', 'iOS', 'Android'],
      description: 'Looking for a talented React Native developer to build cross-platform mobile apps...',
      requirements: [
        '2+ years React Native experience',
        'Published apps on App Store/Play Store',
        'Strong understanding of mobile UX',
        'Experience with native modules'
      ],
      posted: '1 week ago',
      applicants: 32
    }
  ];

  const handleApplyClick = (job: any) => {
    setSelectedJob(job);
    // Generate AI cover letter
    const generatedCoverLetter = `Dear Hiring Manager,

I am excited to apply for the ${job.title} position at ${job.company}. With strong expertise in ${job.matchedSkills.join(', ')}, I believe I would be a great fit for your team.

My experience includes building scalable web applications and working with modern technologies. I am particularly drawn to this role because of the opportunity to work on challenging projects and contribute to your team's success.

I am currently working on developing my skills in ${job.missingSkills.join(', ')} to further strengthen my qualifications for this position.

Thank you for considering my application. I look forward to discussing how I can contribute to ${job.company}.

Best regards,
Alex Johnson`;
    setCoverLetter(generatedCoverLetter);
    setShowApplyDialog(true);
  };

  const handleSimulateApply = () => {
    // Simulate application submission
    setShowApplyDialog(false);
    setSelectedJob(null);
    // Show success message
    alert('Application simulated successfully! Your application has been saved to your dashboard.');
  };

  return (
    <div className="min-h-screen bg-[var(--surface-muted)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-[var(--text-primary)] mb-3" style={{ fontWeight: 600, fontSize: '36px' }}>
            Dream Jobs
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl">
            Discover job opportunities matched to your skills. Track your applications and simulate the auto-apply process.
          </p>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 border border-blue-200 rounded-[var(--radius-md)] p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <Target className="w-6 h-6 text-[var(--accent-solid)] flex-shrink-0 mt-0.5" />
            <div>
              <p style={{ fontWeight: 600 }} className="text-[var(--text-primary)] mb-2">
                Auto-Apply Simulation
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                Our AI generates personalized cover letters and highlights your matched skills. 
                This is a simulation to help you prepare your applications. Review and edit the generated content before actual submission.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Jobs List */}
        <div className="space-y-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-[var(--radius-md)] p-6 border border-gray-200"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Job Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-[var(--text-primary)]" style={{ fontWeight: 600, fontSize: '20px' }}>
                          {job.title}
                        </h3>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                      <p className="text-[var(--text-muted)] mb-3" style={{ fontWeight: 600 }}>
                        {job.company}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{job.applicants} applicants</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <Bookmark className="w-5 h-5" />
                    </Button>
                  </div>

                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    {job.description}
                  </p>

                  {/* Skills Match */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm mb-2" style={{ fontWeight: 600 }}>
                        Matched Skills ({job.matchedSkills.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.matchedSkills.map((skill, idx) => (
                          <Badge key={idx} className="bg-green-50 text-[var(--success)] border-[var(--success)]">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {job.missingSkills.length > 0 && (
                      <div>
                        <p className="text-sm mb-2" style={{ fontWeight: 600 }}>
                          Skills to Learn ({job.missingSkills.length})
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {job.missingSkills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-[var(--warning)]">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Match Score & Actions */}
                <div className="lg:w-64 flex flex-col gap-4">
                  <div className="bg-gradient-to-br from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)] rounded-[var(--radius-md)] p-6 text-white text-center">
                    <p className="text-white/80 mb-2 text-sm">Match Score</p>
                    <div className="text-5xl mb-2" style={{ fontWeight: 600 }}>
                      {job.matchScore}%
                    </div>
                    <Progress value={job.matchScore} className="h-2 bg-white/20 mb-2" />
                    <p className="text-white/80 text-xs">
                      {job.matchedSkills.length}/{job.matchedSkills.length + job.missingSkills.length} skills matched
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full rounded-lg"
                      onClick={() => handleApplyClick(job)}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Simulate Apply
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full rounded-lg"
                      onClick={() => onNavigate('courses')}
                    >
                      Learn Missing Skills
                    </Button>
                  </div>

                  <div className="text-xs text-[var(--text-muted)] text-center">
                    Posted {job.posted}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Apply Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Simulate Application</DialogTitle>
            <DialogDescription>
              Review and edit the AI-generated application materials below
            </DialogDescription>
          </DialogHeader>

          {selectedJob && (
            <div className="space-y-6">
              {/* Job Summary */}
              <div className="bg-[var(--surface-muted)] rounded-lg p-4">
                <h4 style={{ fontWeight: 600 }} className="mb-1">{selectedJob.title}</h4>
                <p className="text-sm text-[var(--text-muted)]">{selectedJob.company}</p>
              </div>

              {/* CV Highlights */}
              <div>
                <label className="text-sm mb-2 block" style={{ fontWeight: 600 }}>
                  Suggested CV Highlights
                </label>
                <div className="space-y-2">
                  {selectedJob.matchedSkills.map((skill: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[var(--success)] mt-0.5 flex-shrink-0" />
                      <span>Proficient in {skill} with hands-on project experience</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="text-sm mb-2 block" style={{ fontWeight: 600 }}>
                  AI-Generated Cover Letter
                </label>
                <Textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="min-h-[300px] rounded-lg"
                  placeholder="Edit your cover letter..."
                />
                <p className="text-xs text-[var(--text-muted)] mt-2">
                  ✨ This cover letter was generated by AI. Feel free to edit and personalize it.
                </p>
              </div>

              {/* Auto-Apply Option */}
              <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
                <Checkbox
                  id="auto-apply"
                  checked={autoApplyEnabled}
                  onCheckedChange={(checked) => setAutoApplyEnabled(checked as boolean)}
                />
                <label htmlFor="auto-apply" className="text-sm cursor-pointer flex-1">
                  <span style={{ fontWeight: 600 }}>Enable Auto-Apply Simulation</span>
                  <span className="block text-[var(--text-muted)] text-xs mt-1">
                    This will simulate submitting your application with the generated materials
                  </span>
                </label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApplyDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSimulateApply}>
              Simulate Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
