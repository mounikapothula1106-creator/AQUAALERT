import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  MapPin, 
  Heart,
  Share2,
  Plus,
  Search,
  Filter,
  Clock,
  User,
  Trash2
} from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  replies: number;
  likes: number;
  category: string;
  tags: string[];
}

interface CleanupEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  participants: number;
  maxParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

const Community = () => {
  const [activeTab, setActiveTab] = useState<'forum' | 'events'>('forum');
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [cleanupEvents, setCleanupEvents] = useState<CleanupEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data
  React.useEffect(() => {
    const mockPosts: ForumPost[] = [
      {
        id: '1',
        title: 'Water Quality Concerns in Downtown Area',
        content: 'Has anyone else noticed unusual taste in tap water near the downtown district? I\'ve been monitoring this for the past week and would like to coordinate with others to report this properly.',
        author: 'Sarah Johnson',
        authorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        createdAt: '2024-01-15T10:30:00Z',
        replies: 12,
        likes: 8,
        category: 'water-quality',
        tags: ['downtown', 'taste', 'monitoring']
      },
      {
        id: '2',
        title: 'Successful Beach Cleanup - Thank You All!',
        content: 'Amazing turnout for yesterday\'s beach cleanup! We collected over 200 pounds of debris and found several water quality issues that we\'ve reported. Photos and results attached.',
        author: 'Mike Chen',
        authorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        createdAt: '2024-01-14T16:45:00Z',
        replies: 25,
        likes: 34,
        category: 'cleanup',
        tags: ['beach', 'success', 'debris']
      },
      {
        id: '3',
        title: 'New IoT Sensor Installation - Riverside Park',
        content: 'Great news! A new water quality sensor has been installed at Riverside Park. You can now monitor real-time data from this location on the IoT dashboard.',
        author: 'Admin Team',
        authorAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
        createdAt: '2024-01-13T09:15:00Z',
        replies: 7,
        likes: 15,
        category: 'technology',
        tags: ['iot', 'sensor', 'riverside']
      }
    ];

    const mockEvents: CleanupEvent[] = [
      {
        id: '1',
        title: 'Harbor District Water Quality Assessment',
        description: 'Join us for a comprehensive water quality assessment in the harbor district. We\'ll be collecting samples and documenting any issues found.',
        date: '2024-01-20',
        time: '09:00',
        location: 'Harbor District Marina',
        organizer: 'Environmental Action Group',
        participants: 15,
        maxParticipants: 25,
        status: 'upcoming'
      },
      {
        id: '2',
        title: 'Community River Cleanup',
        description: 'Monthly river cleanup event. Bring gloves and water bottles - all other equipment provided. Great for families!',
        date: '2024-01-22',
        time: '08:00',
        location: 'Riverside Park Entrance',
        organizer: 'River Guardians',
        participants: 32,
        maxParticipants: 50,
        status: 'upcoming'
      },
      {
        id: '3',
        title: 'Educational Workshop: Water Testing',
        description: 'Learn how to test water quality at home and understand the results. Perfect for new community members.',
        date: '2024-01-25',
        time: '18:00',
        location: 'Community Center',
        organizer: 'Aqua Alert Education Team',
        participants: 8,
        maxParticipants: 20,
        status: 'upcoming'
      }
    ];

    setForumPosts(mockPosts);
    setCleanupEvents(mockEvents);
  }, []);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'water-quality', label: 'Water Quality' },
    { value: 'cleanup', label: 'Cleanup Events' },
    { value: 'technology', label: 'Technology' },
    { value: 'education', label: 'Education' },
    { value: 'emergency', label: 'Emergency' }
  ];

  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatEventDate = (date: string, time: string) => {
    const eventDate = new Date(`${date}T${time}`);
    return eventDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Community Hub</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with fellow community members, share experiences, and organize water safety initiatives together.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-lg shadow-lg p-1 flex">
            <button
              onClick={() => setActiveTab('forum')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'forum'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Community Forum</span>
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'events'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Cleanup Events</span>
            </button>
          </div>
        </motion.div>

        {/* Forum Tab */}
        {activeTab === 'forum' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search discussions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>New Post</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Forum Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                            {post.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{post.author}</span>
                            <span>•</span>
                            <span>{formatDate(post.createdAt)}</span>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {categories.find(c => c.value === post.category)?.label}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                            <MessageSquare className="h-4 w-4" />
                            <span className="text-sm">{post.replies} replies</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors">
                            <Share2 className="h-4 w-4" />
                            <span className="text-sm">Share</span>
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            {/* Create Event Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-end"
            >
              <button className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg">
                <Plus className="h-5 w-5" />
                <span>Organize Cleanup Event</span>
              </button>
            </motion.div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cleanupEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                        event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{event.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Clock className="h-5 w-5" />
                        <span>{formatEventDate(event.date, event.time)}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-600">
                        <MapPin className="h-5 w-5" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-600">
                        <User className="h-5 w-5" />
                        <span>Organized by {event.organizer}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-gray-600" />
                        <span className="text-sm text-gray-600">
                          {event.participants}/{event.maxParticipants} participants
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          Join Event
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                          Details
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Registration Progress</span>
                        <span>{Math.round((event.participants / event.maxParticipants) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;