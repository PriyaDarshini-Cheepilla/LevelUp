import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Clock, Star, Filter, Search, ExternalLink, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface CoursesScreenProps {
  onNavigate: (screen: string) => void;
}

export function CoursesScreen({ onNavigate }: CoursesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [provider, setProvider] = useState('all');
  const [difficulty, setDifficulty] = useState('all');

  const courses = [
    {
      id: '1',
      title: 'Advanced React Patterns',
      provider: 'Frontend Masters',
      difficulty: 'Advanced',
      duration: '6 hours',
      rating: 4.8,
      students: '12.5k',
      isFree: true,
      skills: ['React', 'JavaScript', 'Hooks'],
      thumbnail: 'https://images.unsplash.com/photo-1645363308298-3a949c8bfd86?w=400',
      description: 'Master advanced React patterns including compound components, render props, and custom hooks.',
      syllabus: ['Custom Hooks', 'Context Optimization', 'Performance Patterns', 'Advanced Composition']
    },
    {
      id: '2',
      title: 'SQL for Data Analysis',
      provider: 'Coursera',
      difficulty: 'Intermediate',
      duration: '4 weeks',
      rating: 4.7,
      students: '45.2k',
      isFree: true,
      skills: ['SQL', 'Data Analysis'],
      thumbnail: 'https://images.unsplash.com/photo-1645363308298-3a949c8bfd86?w=400',
      description: 'Learn SQL from scratch and master querying databases for data analysis.',
      syllabus: ['Basic Queries', 'Joins & Subqueries', 'Aggregations', 'Window Functions']
    },
    {
      id: '3',
      title: 'AWS Cloud Fundamentals',
      provider: 'AWS Training',
      difficulty: 'Beginner',
      duration: '8 hours',
      rating: 4.9,
      students: '28.3k',
      isFree: true,
      skills: ['AWS', 'Cloud Computing'],
      thumbnail: 'https://images.unsplash.com/photo-1645363308298-3a949c8bfd86?w=400',
      description: 'Introduction to AWS core services including EC2, S3, Lambda, and more.',
      syllabus: ['AWS Basics', 'EC2 & S3', 'Lambda Functions', 'Security & IAM']
    },
    {
      id: '4',
      title: 'TypeScript Deep Dive',
      provider: 'Udemy',
      difficulty: 'Intermediate',
      duration: '5 hours',
      rating: 4.6,
      students: '18.7k',
      isFree: true,
      skills: ['TypeScript', 'JavaScript'],
      thumbnail: 'https://images.unsplash.com/photo-1645363308298-3a949c8bfd86?w=400',
      description: 'Go beyond the basics and master advanced TypeScript features.',
      syllabus: ['Generics', 'Advanced Types', 'Decorators', 'Type Guards']
    },
    {
      id: '5',
      title: 'GraphQL API Design',
      provider: 'Pluralsight',
      difficulty: 'Intermediate',
      duration: '3 hours',
      rating: 4.5,
      students: '9.8k',
      isFree: true,
      skills: ['GraphQL', 'API Design'],
      thumbnail: 'https://images.unsplash.com/photo-1645363308298-3a949c8bfd86?w=400',
      description: 'Learn to design and implement GraphQL APIs from scratch.',
      syllabus: ['Schema Design', 'Resolvers', 'Mutations', 'Subscriptions']
    },
    {
      id: '6',
      title: 'Testing with Jest & React Testing Library',
      provider: 'Testing JavaScript',
      difficulty: 'Intermediate',
      duration: '4 hours',
      rating: 4.9,
      students: '15.4k',
      isFree: true,
      skills: ['Testing', 'Jest', 'React'],
      thumbnail: 'https://images.unsplash.com/photo-1645363308298-3a949c8bfd86?w=400',
      description: 'Master testing React applications with modern testing tools.',
      syllabus: ['Unit Testing', 'Integration Tests', 'Mocking', 'Best Practices']
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesProvider = provider === 'all' || course.provider === provider;
    const matchesDifficulty = difficulty === 'all' || course.difficulty === difficulty;
    return matchesSearch && matchesProvider && matchesDifficulty;
  });

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
            Free Courses
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl">
            Curated collection of free courses to help you master the skills you need for your career goals.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[var(--radius-md)] p-6 mb-8 border border-gray-200"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <Input
                  placeholder="Search courses or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-lg"
                />
              </div>
            </div>
            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                <SelectItem value="Coursera">Coursera</SelectItem>
                <SelectItem value="Udemy">Udemy</SelectItem>
                <SelectItem value="Frontend Masters">Frontend Masters</SelectItem>
                <SelectItem value="Pluralsight">Pluralsight</SelectItem>
              </SelectContent>
            </Select>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-[var(--text-muted)]">
            Showing {filteredCourses.length} courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="bg-white rounded-[var(--radius-md)] overflow-hidden border border-gray-200 flex flex-col group hover:shadow-lg transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white/30" />
                </div>
                {course.isFree && (
                  <Badge className="absolute top-4 right-4 bg-white text-[var(--accent-solid)] border-0">
                    FREE
                  </Badge>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {course.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span style={{ fontWeight: 600 }}>{course.rating}</span>
                  </div>
                </div>

                <h3 className="text-[var(--text-primary)] mb-2" style={{ fontWeight: 600, fontSize: '18px' }}>
                  {course.title}
                </h3>

                <p className="text-sm text-[var(--text-muted)] mb-4 flex-1">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {course.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </div>
                  <span>•</span>
                  <span>{course.students} students</span>
                </div>

                <p className="text-xs text-[var(--text-muted)] mb-4">
                  By {course.provider}
                </p>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-lg"
                    onClick={() => {}}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Roadmap
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 rounded-lg"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Course
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-[var(--text-muted)] mb-4">No courses found matching your criteria</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setProvider('all');
              setDifficulty('all');
            }}>
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
