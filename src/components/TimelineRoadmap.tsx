import { motion } from 'motion/react';
import { Check, Circle, Lock, BookOpen, Code, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Milestone {
  id: string;
  title: string;
  description: string;
  eta: string;
  status: 'completed' | 'current' | 'locked';
  icon?: 'book' | 'code' | 'award';
  actions?: {
    label: string;
    onClick: () => void;
  }[];
}

interface TimelineRoadmapProps {
  milestones: Milestone[];
}

const iconMap = {
  book: BookOpen,
  code: Code,
  award: Award
};

export function TimelineRoadmap({ milestones }: TimelineRoadmapProps) {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
      
      <div className="space-y-8">
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon ? iconMap[milestone.icon] : Circle;
          const isLast = index === milestones.length - 1;
          
          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-16"
            >
              {/* Icon */}
              <div className={`
                absolute left-0 w-12 h-12 rounded-full flex items-center justify-center
                border-2 transition-all duration-200
                ${milestone.status === 'completed' 
                  ? 'bg-[var(--success)] border-[var(--success)]' 
                  : milestone.status === 'current'
                  ? 'bg-gradient-to-br from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)] border-transparent'
                  : 'bg-gray-100 border-gray-300'
                }
              `}>
                {milestone.status === 'completed' ? (
                  <Check className="w-6 h-6 text-white" />
                ) : milestone.status === 'locked' ? (
                  <Lock className="w-6 h-6 text-gray-400" />
                ) : (
                  <Icon className="w-6 h-6 text-white" />
                )}
              </div>

              {/* Content Card */}
              <motion.div
                whileHover={milestone.status !== 'locked' ? { y: -2 } : {}}
                className={`
                  rounded-[var(--radius-md)] p-6 border
                  ${milestone.status === 'locked' 
                    ? 'bg-gray-50 border-gray-200 opacity-60' 
                    : 'bg-white border-gray-200'
                  }
                `}
                style={milestone.status !== 'locked' ? { boxShadow: 'var(--shadow-card)' } : {}}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[var(--text-primary)]" style={{ fontWeight: 600 }}>
                        {milestone.title}
                      </h3>
                      {milestone.status === 'current' && (
                        <Badge className="bg-[var(--accent-solid)] text-white border-0">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-[var(--text-muted)]">
                      {milestone.description}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-xs text-[var(--text-muted)]">ETA</p>
                    <p className="text-sm text-[var(--text-primary)]" style={{ fontWeight: 600 }}>
                      {milestone.eta}
                    </p>
                  </div>
                </div>

                {milestone.actions && milestone.status !== 'locked' && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {milestone.actions.map((action, idx) => (
                      <Button
                        key={idx}
                        variant={idx === 0 ? 'default' : 'outline'}
                        size="sm"
                        className="rounded-lg"
                        onClick={action.onClick}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
