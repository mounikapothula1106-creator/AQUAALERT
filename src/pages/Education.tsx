import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  Download, 
  ExternalLink,
  Droplets,
  AlertTriangle,
  Shield,
  Thermometer,
  Zap,
  Eye,
  ChevronRight,
  Clock,
  User
} from 'lucide-react';

interface EducationalResource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'guide' | 'infographic';
  category: string;
  duration?: string;
  author: string;
  publishedAt: string;
  downloadUrl?: string;
  videoUrl?: string;
  thumbnail: string;
  tags: string[];
}

const Education = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [resources, setResources] = useState<EducationalResource[]>([]);

  // Mock educational resources
  React.useEffect(() => {
    const mockResources: EducationalResource[] = [
      {
        id: '1',
        title: 'Understanding Water Quality Parameters',
        description: 'Learn about pH, turbidity, dissolved oxygen, and other key indicators of water quality. This comprehensive guide covers what each parameter means and why it matters.',
        type: 'article',
        category: 'water-quality',
        author: 'Dr. Sarah Martinez',
        publishedAt: '2024-01-10',
        thumbnail: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
        tags: ['pH', 'turbidity', 'dissolved-oxygen', 'basics']
      },
      {
        id: '2',
        title: 'How to Test Water Quality at Home',
        description: 'Step-by-step video tutorial showing you how to test your water quality using simple home testing kits and interpret the results.',
        type: 'video',
        category: 'testing',
        duration: '12 minutes',
        author: 'Water Safety Institute',
        publishedAt: '2024-01-08',
        videoUrl: 'https://example.com/video',
        thumbnail: 'https://images.pexels.com/photos/1458671/pexels-photo-1458671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
        tags: ['testing', 'home', 'diy', 'tutorial']
      },
      {
        id: '3',
        title: 'Water Contamination Types and Sources',
        description: 'Comprehensive guide to different types of water contamination, their sources, health effects, and prevention methods.',
        type: 'guide',
        category: 'contamination',
        author: 'Environmental Protection Agency',
        publishedAt: '2024-01-05',
        downloadUrl: 'https://example.com/guide.pdf',
        thumbnail: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
        tags: ['contamination', 'sources', 'health', 'prevention']
      },
      {
        id: '4',
        title: 'Emergency Water Safety Procedures',
        description: 'What to do during water emergencies: flooding, contamination alerts, and infrastructure failures. Essential knowledge for every community member.',
        type: 'article',
        category: 'emergency',
        author: 'Emergency Response Team',
        publishedAt: '2024-01-03',
        thumbnail: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
        tags: ['emergency', 'flooding', 'procedures', 'safety']
      },
      {
        id: '5',
        title: 'IoT Sensors: How They Monitor Water Quality',
        description: 'Learn how Internet of Things sensors work to continuously monitor water quality parameters and provide real-time data.',
        type: 'video',
        category: 'technology',
        duration: '8 minutes',
        author: 'Tech for Good Foundation',
        publishedAt: '2024-01-01',
        videoUrl: 'https://example.com/video2',
        thumbnail: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
        tags: ['iot', 'sensors', 'technology', 'monitoring']
      },
      {
        id: '6',
        title: 'Water Safety Infographic',
        description: 'Visual guide to water safety best practices, warning signs, and emergency contacts. Perfect for printing and sharing.',
        type: 'infographic',
        category: 'safety',
        author: 'Public Health Department',
        publishedAt: '2023-12-28',
        downloadUrl: 'https://example.com/infographic.pdf',
        thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
        tags: ['infographic', 'safety', 'visual', 'reference']
      }
    ];

    setResources(mockResources);
  }, []);

  const categories = [
    { value: 'all', label: 'All Resources', icon: BookOpen },
    { value: 'water-quality', label: 'Water Quality', icon: Droplets },
    { value: 'testing', label: 'Testing Methods', icon: Eye },
    { value: 'contamination', label: 'Contamination', icon: AlertTriangle },
    { value: 'emergency', label: 'Emergency Procedures', icon: Shield },
    { value: 'technology', label: 'Technology', icon: Zap },
    { value: 'safety', label: 'Safety Guidelines', icon: Shield }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'guide': return Download;
      case 'infographic': return Eye;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-600';
      case 'guide': return 'bg-green-100 text-green-600';
      case 'infographic': return 'bg-purple-100 text-purple-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  const filteredResources = resources.filter(resource => 
    selectedCategory === 'all' || resource.category === selectedCategory
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Educational Resources</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn about water safety, quality monitoring, emergency procedures, and prevention measures. 
            Knowledge is your first line of defense against water hazards.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'Total Resources', value: resources.length, icon: BookOpen },
            { label: 'Video Tutorials', value: resources.filter(r => r.type === 'video').length, icon: Play },
            { label: 'Downloadable Guides', value: resources.filter(r => r.downloadUrl).length, icon: Download },
            { label: 'Categories', value: categories.length - 1, icon: Eye }
          ].map((stat, index) => (
            <div key={stat.label} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex flex-col items-center p-4 rounded-lg transition-all duration-200 ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <category.icon className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium text-center">{category.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource, index) => {
            const TypeIcon = getTypeIcon(resource.type);
            
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                      <TypeIcon className="h-3 w-3 mr-1" />
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </span>
                  </div>
                  {resource.duration && (
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                      {resource.duration}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {resource.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-4">{resource.author}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{formatDate(resource.publishedAt)}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                    {resource.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{resource.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {resource.type === 'video' && (
                      <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        <Play className="h-4 w-4" />
                        <span>Watch Video</span>
                      </button>
                    )}
                    
                    {resource.downloadUrl && (
                      <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                    )}
                    
                    {!resource.videoUrl && !resource.downloadUrl && (
                      <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <ExternalLink className="h-4 w-4" />
                        <span>Read More</span>
                      </button>
                    )}
                    
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Emergency Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-red-50 border border-red-200 rounded-lg p-8"
        >
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-red-800">Emergency Resources</h2>
          </div>
          <p className="text-red-700 mb-6">
            Quick access to essential emergency information and contacts for water-related emergencies.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <h3 className="font-semibold text-red-800 mb-2">Emergency Contacts</h3>
              <p className="text-sm text-red-700 mb-2">Emergency Services: 911</p>
              <p className="text-sm text-red-700 mb-2">Water Authority: (555) 123-4567</p>
              <p className="text-sm text-red-700">Poison Control: (800) 222-1222</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <h3 className="font-semibold text-red-800 mb-2">Quick Actions</h3>
              <p className="text-sm text-red-700 mb-2">• Stop using contaminated water</p>
              <p className="text-sm text-red-700 mb-2">• Report hazards immediately</p>
              <p className="text-sm text-red-700">• Follow evacuation orders</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <h3 className="font-semibold text-red-800 mb-2">Emergency Kit</h3>
              <p className="text-sm text-red-700 mb-2">• 1 gallon water per person/day</p>
              <p className="text-sm text-red-700 mb-2">• Water purification tablets</p>
              <p className="text-sm text-red-700">• Battery-powered radio</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Education;