import { motion } from 'motion/react';
import { Target, TrendingUp, AlertCircle, Download } from 'lucide-react';
import { TimelineRoadmap } from '../TimelineRoadmap';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '../ui/chart';

interface CareerPathScreenProps {
  onNavigate: (screen: string) => void;
}

export function CareerPathScreen({ onNavigate }: CareerPathScreenProps) {
  const primaryRole = {
    title: 'Senior Frontend Developer',
    match: 78,
    timeline: '6-8 months',
    salary: '$120k - $150k'
  };

  const alternateRoles = [
    { title: 'Full Stack Developer', match: 72 },
    { title: 'React Native Developer', match: 68 },
    { title: 'UI Engineer', match: 65 }
  ];

  const missingSkills = [
    { name: 'AWS', priority: 'High', courses: 2 },
    { name: 'GraphQL', priority: 'Medium', courses: 3 },
    { name: 'Testing (Jest)', priority: 'Medium', courses: 4 }
  ];

  const milestones = [
    {
      id: '1',
      title: 'Master React Advanced Patterns',
      description: 'Complete advanced hooks, context, and performance optimization',
      eta: '2 weeks',
      status: 'current' as const,
      icon: 'code' as const,
      actions: [
        { label: 'Take Test', onClick: () => onNavigate('tests') },
        { label: 'Find Courses', onClick: () => onNavigate('courses') }
      ]
    },
    {
      id: '2',
      title: 'Learn AWS Fundamentals',
      description: 'S3, Lambda, EC2, and basic cloud architecture',
      eta: '4 weeks',
      status: 'locked' as const,
      icon: 'book' as const,
      actions: [
        { label: 'View Courses', onClick: () => onNavigate('courses') }
      ]
    },
    {
      id: '3',
      title: 'Build Portfolio Project',
      description: 'Full-stack app with React, Node.js, and AWS deployment',
      eta: '8 weeks',
      status: 'locked' as const,
      icon: 'code' as const
    },
    {
      id: '4',
      title: 'Apply to Target Companies',
      description: 'Prepare for interviews and submit applications',
      eta: '12 weeks',
      status: 'locked' as const,
      icon: 'award' as const,
      actions: [
        { label: 'View Jobs', onClick: () => onNavigate('jobs') }
      ]
    }
  ];

  const radarData = [
    { skill: 'React', current: 85, target: 90 },
    { skill: 'TypeScript', current: 70, target: 85 },
    { skill: 'Node.js', current: 60, target: 75 },
    { skill: 'AWS', current: 30, target: 70 },
    { skill: 'Testing', current: 45, target: 80 },
    { skill: 'GraphQL', current: 40, target: 75 }
  ];

  return (
    <div className="min-h-screen bg-[var(--surface-muted)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <Badge className="mb-3 bg-blue-50 text-[var(--accent-solid)] border-[var(--accent-solid)]">
                <Target className="w-3 h-3 mr-1" />
                Personalized Roadmap
              </Badge>
              <h1 className="text-[var(--text-primary)] mb-2" style={{ fontWeight: 600, fontSize: '36px' }}>
                Your Career Path
              </h1>
              <p className="text-lg text-[var(--text-muted)]">
                Based on your skills and goals, here's your personalized roadmap
              </p>
            </div>
            <Button variant="outline" className="rounded-lg">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Primary Role Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)] rounded-[var(--radius-lg)] p-8 text-white"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white/80 mb-2">Primary Target Role</p>
                  <h2 style={{ fontWeight: 600, fontSize: '28px' }} className="mb-2">
                    {primaryRole.title}
                  </h2>
                  <p className="text-white/90">
                    Est. salary range: <span style={{ fontWeight: 600 }}>{primaryRole.salary}</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-4xl mb-1" style={{ fontWeight: 600 }}>
                    {primaryRole.match}%
                  </div>
                  <p className="text-white/80 text-sm">Match Score</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <TrendingUp className="w-5 h-5" />
                <span>Timeline: {primaryRole.timeline}</span>
              </div>
            </motion.div>

            {/* Roadmap Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[var(--radius-lg)] p-8 border border-gray-200"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <h3 className="text-[var(--text-primary)] mb-6" style={{ fontWeight: 600, fontSize: '24px' }}>
                Your Learning Roadmap
              </h3>
              <TimelineRoadmap milestones={milestones} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills Radar Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[var(--radius-md)] p-6 border border-gray-200"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[var(--text-primary)]" style={{ fontWeight: 600 }}>
                  Skills Overview
                </h3>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              
              <ChartContainer
                config={{
                  current: { label: 'Current', color: 'var(--accent-solid)' },
                  target: { label: 'Target', color: 'var(--success)' }
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid strokeDasharray="3 3" />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar
                      name="Current"
                      dataKey="current"
                      stroke="#5B8CFF"
                      fill="#5B8CFF"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Target"
                      dataKey="target"
                      stroke="#22C55E"
                      fill="#22C55E"
                      fillOpacity={0.2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="flex items-center justify-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[var(--accent-solid)]" />
                  <span>Current Level</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[var(--success)]" />
                  <span>Target Level</span>
                </div>
              </div>
            </motion.div>

            {/* Missing Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-[var(--radius-md)] p-6 border border-gray-200"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-[var(--warning)]" />
                <h3 className="text-[var(--text-primary)]" style={{ fontWeight: 600 }}>
                  Skills to Learn
                </h3>
              </div>
              
              <div className="space-y-3">
                {missingSkills.map((skill, index) => (
                  <div key={index} className="p-3 rounded-lg bg-[var(--surface-muted)]">
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ fontWeight: 600 }}>{skill.name}</span>
                      <Badge
                        variant={skill.priority === 'High' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {skill.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mb-2">
                      {skill.courses} free courses available
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full rounded-lg text-xs"
                      onClick={() => onNavigate('courses')}
                    >
                      Browse Courses
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Alternate Paths */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-[var(--radius-md)] p-6 border border-gray-200"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <h3 className="text-[var(--text-primary)] mb-4" style={{ fontWeight: 600 }}>
                Alternate Roles
              </h3>
              <div className="space-y-3">
                {alternateRoles.map((role, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--surface-muted)] transition-colors cursor-pointer">
                    <span className="text-sm">{role.title}</span>
                    <span className="text-sm text-[var(--accent-solid)]" style={{ fontWeight: 600 }}>
                      {role.match}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
