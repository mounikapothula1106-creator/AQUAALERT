import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  AlertTriangle, 
  Activity, 
  Users, 
  Shield, 
  Zap,
  TrendingUp,
  Globe,
  ArrowRight
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Interactive Hazard Map',
      description: 'Real-time visualization of water hazards reported by the community',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: AlertTriangle,
      title: 'Emergency Reporting',
      description: 'Quick and easy hazard reporting with voice activation support',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: Activity,
      title: 'IoT Monitoring',
      description: 'Live sensor data tracking water quality parameters across locations',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Connect with neighbors and organize water safety initiatives',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const stats = [
    { label: 'Active Sensors', value: '150+', icon: Activity },
    { label: 'Reports Filed', value: '2,847', icon: AlertTriangle },
    { label: 'Community Members', value: '12,500+', icon: Users },
    { label: 'Areas Monitored', value: '45', icon: Globe }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Protecting Communities Through
              <span className="block text-teal-300">Water Safety Monitoring</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Join thousands of citizens in creating safer water environments through real-time monitoring, 
              community reporting, and emergency response coordination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/map"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <MapPin className="h-5 w-5" />
                <span>View Hazard Map</span>
              </Link>
              <Link
                to="/report"
                className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <AlertTriangle className="h-5 w-5" />
                <span>Report Emergency</span>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Animated water waves */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-12 fill-blue-50">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z">
              <animate attributeName="d" dur="10s" repeatCount="indefinite"
                values="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z;
                        M0,60 C300,0 900,120 1200,60 L1200,120 L0,120 Z;
                        M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" />
            </path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Water Safety Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology meets community action to create the most effective water monitoring system
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.bgColor} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Alert Banner */}
      <section className="py-12 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">24/7 Emergency Monitoring</h3>
                <p className="text-red-100">Real-time alerts from INCOIS for tsunamis, floods, and water emergencies</p>
              </div>
            </div>
            <Link
              to="/alerts"
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center space-x-2"
            >
              <span>View Alerts</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make Your Community Safer?
            </h2>
            <p className="text-xl mb-8 text-teal-100">
              Join Project Aqua Alert today and be part of the solution for water safety in your area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Get Started Today
              </Link>
              <Link
                to="/education"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-teal-600 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;