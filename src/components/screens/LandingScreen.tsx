import { motion } from 'motion/react';
import { Upload, TrendingUp, Target, ArrowRight, Check } from 'lucide-react';
import { Button } from '../ui/button';

interface LandingScreenProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function LandingScreen({ onGetStarted, onLogin }: LandingScreenProps) {
  const features = [
    {
      icon: Upload,
      title: 'Upload Resume',
      description: 'We extract your skills, education, and experience automatically'
    },
    {
      icon: TrendingUp,
      title: 'Get Your Roadmap',
      description: 'Personalized career paths with skill gaps and timelines'
    },
    {
      icon: Target,
      title: 'Level Up Skills',
      description: 'Adaptive tests, free courses, and dream job matching'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--surface-muted)]">
      {/* Hero Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 
              className="text-[var(--text-primary)] mb-6 leading-tight"
              style={{ fontWeight: 600, fontSize: 'clamp(32px, 5vw, 56px)' }}
            >
              LevelUp — Your AI Career & Skills Advisor
            </h1>
            
            <p className="text-xl text-[var(--text-muted)] mb-8 leading-relaxed">
              Upload your resume. Get a personalized career roadmap, fresh skill tests, 
              curated free courses, and dream-job matches — all in minutes.
            </p>

            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="rounded-full px-8 bg-gradient-to-r from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)] text-white border-0 h-14"
                  style={{ boxShadow: 'var(--shadow-floating)' }}
                  onClick={onGetStarted}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-14"
                onClick={onLogin}
              >
                Sign In
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--success)]" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--success)]" />
                Free forever
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[var(--text-primary)] mb-4" style={{ fontWeight: 600, fontSize: '36px' }}>
              How LevelUp Works
            </h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              Three simple steps to accelerate your career growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-[var(--radius-lg)] p-8 border border-gray-200 h-full" style={{ boxShadow: 'var(--shadow-card)' }}>
                  <div className="absolute -top-4 left-8">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)] flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-[var(--text-primary)] mb-3" style={{ fontWeight: 600, fontSize: '20px' }}>
                      {feature.title}
                    </h3>
                    <p className="text-[var(--text-muted)]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-24 bg-gradient-to-br from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-4" style={{ fontWeight: 600, fontSize: '36px' }}>
            Ready to Level Up Your Career?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students and professionals who are accelerating their careers with AI-powered guidance.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="rounded-full px-8 bg-white text-[var(--accent-solid)] hover:bg-white/90 h-14"
              onClick={onGetStarted}
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
