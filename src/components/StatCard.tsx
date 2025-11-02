import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: {
    label: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  action?: {
    label: string;
    onClick: () => void;
  };
  gradient?: boolean;
  trend?: {
    value: number;
    positive: boolean;
  };
}

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  badge,
  action,
  gradient = false,
  trend
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`
        relative rounded-[var(--radius-md)] p-6
        border border-gray-200 transition-all duration-200
        ${gradient 
          ? 'bg-gradient-to-br from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)] text-white border-transparent' 
          : 'bg-white hover:shadow-md'
        }
      `}
      style={!gradient ? { boxShadow: 'var(--shadow-card)' } : {}}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className={`text-sm ${gradient ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
              {title}
            </p>
            {badge && (
              <Badge variant={badge.variant || 'secondary'} className="text-xs">
                {badge.label}
              </Badge>
            )}
          </div>
          <p className={`text-3xl ${gradient ? 'text-white' : 'text-[var(--text-primary)]'}`} style={{ fontWeight: 600 }}>
            {value}
          </p>
          {subtitle && (
            <p className={`text-sm mt-1 ${gradient ? 'text-white/70' : 'text-[var(--text-muted)]'}`}>
              {subtitle}
            </p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${trend.positive ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
              <span>{trend.positive ? '↑' : '↓'}</span>
              <span style={{ fontWeight: 600 }}>{Math.abs(trend.value)}%</span>
              <span className={gradient ? 'text-white/70' : 'text-[var(--text-muted)]'}>vs last week</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`
            w-12 h-12 rounded-lg flex items-center justify-center
            ${gradient ? 'bg-white/20' : 'bg-blue-50'}
          `}>
            <Icon className={`w-6 h-6 ${gradient ? 'text-white' : 'text-[var(--accent-solid)]'}`} />
          </div>
        )}
      </div>
      
      {action && (
        <Button
          variant={gradient ? 'secondary' : 'outline'}
          size="sm"
          className="w-full rounded-lg mt-2"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}
