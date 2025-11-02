import { motion } from 'motion/react';
import { TrendingUp, Target, BookOpen, Briefcase, CheckCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { StatCard } from '../StatCard';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { TimelineRoadmap } from '../TimelineRoadmap';
import { useState } from 'react';

interface DashboardScreenProps {
  onNavigate: (screen: string) => void;
}

export function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const [showRoadmap, setShowRoadmap] = useState(false);
  const recentActivity = [
    { icon: CheckCircle, title: 'Completed React Advanced Test', time: '2 hours ago', type: 'success' },
    { icon: BookOpen, title: 'Started SQL Fundamentals Course', time: '1 day ago', type: 'info' },
    { icon: Target, title: 'New skill gap identified: AWS', time: '2 days ago', type: 'warning' },
    { icon: Briefcase, title: 'Matched with 5 new jobs', time: '3 days ago', type: 'info' }
  ];

  const skillCompleteness = 68;
  const nextTest = 'Python Data Structures';
  const matchedJobs = 12;

  const roadmapMilestones = [
    {
      id: '1',
      title: 'Master React Fundamentals',
      description: 'Complete core concepts and build 3 projects',
      eta: '2 weeks',
      status: 'completed' as const,
      icon: 'code' as const,
    },
    {
      id: '2',
      title: 'Advanced TypeScript',
      description: 'Type systems, generics, and best practices',
      eta: '3 weeks',
      status: 'current' as const,
      icon: 'book' as const,
      actions: [
        { label: 'Take Test', onClick: () => onNavigate('tests') },
        { label: 'Find Courses', onClick: () => onNavigate('courses') }
      ]
    },
    {
      id: '3',
      title: 'Backend Development',
      description: 'Node.js, Express, and Database fundamentals',
      eta: '2 months',
      status: 'locked' as const,
      icon: 'code' as const,
    },
    {
      id: '4',
      title: 'Cloud & DevOps',
      description: 'AWS, Docker, CI/CD pipelines',
      eta: '3 months',
      status: 'locked' as const,
      icon: 'award' as const,
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--surface-muted)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-[var(--radius-lg)] p-8 sm:p-12 mb-8 overflow-hidden bg-gradient-to-br from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)]"
        >
          <div className="relative z-10">
            <h1 className="text-white mb-2" style={{ fontWeight: 600, fontSize: '32px' }}>
              Welcome back, Priya! 👋
            </h1>
            <p className="text-white/90 text-lg mb-6 max-w-2xl">
              You're making great progress. Here's your personalized dashboard with the latest insights.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-lg bg-white text-[var(--accent-solid)] hover:bg-white/90"
                onClick={() => onNavigate('upload')}
              >
                Update Resume
              </Button>
              <Button
                size="lg"
                className="rounded-lg bg-white/20 text-white hover:bg-white/30 border-2 border-white/50"
                onClick={() => setShowRoadmap(!showRoadmap)}
              >
                {showRoadmap ? (
                  <>
                    Hide Roadmap
                    <ChevronUp className="ml-2 w-5 h-5" />
                  </>
                ) : (
                  <>
                    View Roadmap
                    <ChevronDown className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </motion.div>

        {/* Collapsible Roadmap Section */}
        {showRoadmap && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className="bg-white rounded-[var(--radius-lg)] p-6 sm:p-8 border border-gray-200" style={{ boxShadow: 'var(--shadow-card)' }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-[var(--text-primary)] mb-2" style={{ fontWeight: 600, fontSize: '24px' }}>
                    Your Career Roadmap
                  </h2>
                  <p className="text-[var(--text-muted)]">
                    Personalized path to Senior Frontend Developer
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-lg"
                  onClick={() => onNavigate('career')}
                >
                  View Full Details
                </Button>
              </div>
              <TimelineRoadmap milestones={roadmapMilestones} />
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Skills Completeness"
            value={`${skillCompleteness}%`}
            subtitle="4 skills to master"
            icon={Target}
            action={{
              label: 'View Skills',
              onClick: () => onNavigate('career')
            }}
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Tests Completed"
            value="8"
            subtitle="5 tests this month"
            icon={CheckCircle}
            action={{
              label: 'Take Test',
              onClick: () => onNavigate('tests')
            }}
          />
          <StatCard
            title="Courses In Progress"
            value="3"
            subtitle="2 near completion"
            icon={BookOpen}
            action={{
              label: 'Browse Courses',
              onClick: () => onNavigate('courses')
            }}
          />
          <StatCard
            title="Job Matches"
            value={matchedJobs}
            subtitle="78% avg match"
            icon={Briefcase}
            gradient
            action={{
              label: 'View Jobs',
              onClick: () => onNavigate('jobs')
            }}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Next Steps */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recommended Test */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[var(--radius-md)] p-6 border border-gray-200"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="mb-2 bg-blue-50 text-[var(--accent-solid)] border-[var(--accent-solid)]">
                    Recommended
                  </Badge>
                  <h3 className="text-[var(--text-primary)] mb-1" style={{ fontWeight: 600, fontSize: '20px' }}>
                    Next Skill Test
                  </h3>
                  <p className="text-[var(--text-muted)]">
                    Based on your career path to Senior Frontend Developer
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-[var(--accent-solid)]" />
                </div>
              </div>
              
              <div className="bg-[var(--surface-muted)] rounded-lg p-4 mb-4">
                <p style={{ fontWeight: 600 }} className="mb-2">{nextTest}</p>
                <p className="text-sm text-[var(--text-muted)] mb-3">
                  20 questions • Adaptive difficulty • New questions each attempt
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-[var(--text-muted)]" />
                  <span className="text-[var(--text-muted)]">Est. 25 minutes</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full rounded-lg"
                onClick={() => onNavigate('tests')}
              >
                Start Test
              </Button>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-[var(--radius-md)] p-6 border border-gray-200"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <h3 className="text-[var(--text-primary)] mb-4" style={{ fontWeight: 600, fontSize: '20px' }}>
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                      ${activity.type === 'success' ? 'bg-green-50' : activity.type === 'warning' ? 'bg-orange-50' : 'bg-blue-50'}
                    `}>
                      <activity.icon className={`
                        w-5 h-5
                        ${activity.type === 'success' ? 'text-[var(--success)]' : activity.type === 'warning' ? 'text-[var(--warning)]' : 'text-[var(--accent-solid)]'}
                      `} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[var(--text-primary)]" style={{ fontWeight: 600 }}>
                        {activity.title}
                      </p>
                      <p className="text-sm text-[var(--text-muted)]">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Progress Summary */}
          <div className="space-y-6">
            {/* Skills Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-[var(--radius-md)] p-6 border border-gray-200"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <h3 className="text-[var(--text-primary)] mb-4" style={{ fontWeight: 600 }}>
                Skills Progress
              </h3>
              <div className="space-y-4">
                {[
                  { skill: 'React', progress: 85, color: 'bg-blue-500' },
                  { skill: 'TypeScript', progress: 70, color: 'bg-indigo-500' },
                  { skill: 'Node.js', progress: 60, color: 'bg-green-500' },
                  { skill: 'Python', progress: 45, color: 'bg-yellow-500' }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm" style={{ fontWeight: 600 }}>{item.skill}</span>
                      <span className="text-sm text-[var(--text-muted)]">{item.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-[var(--radius-md)] p-6 border border-gray-200"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <h3 className="text-[var(--text-primary)] mb-4" style={{ fontWeight: 600 }}>
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-lg"
                  onClick={() => onNavigate('chatbot')}
                >
                  💬 Ask AI Mentor
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-lg"
                  onClick={() => onNavigate('courses')}
                >
                  📚 Find Courses
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-lg"
                  onClick={() => onNavigate('jobs')}
                >
                  🎯 Browse Jobs
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
