import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { motion } from 'framer-motion';
import { 
  Filter, 
  AlertTriangle, 
  Droplets, 
  Thermometer, 
  Zap,
  Calendar,
  MapPin,
  Eye,
  EyeOff
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface HazardReport {
  id: string;
  type: 'contamination' | 'flooding' | 'chemical' | 'temperature' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: [number, number];
  title: string;
  description: string;
  reportedBy: string;
  reportedAt: string;
  status: 'active' | 'investigating' | 'resolved';
}

const HazardMap = () => {
  const [hazards, setHazards] = useState<HazardReport[]>([]);
  const [filteredHazards, setFilteredHazards] = useState<HazardReport[]>([]);
  const [filters, setFilters] = useState({
    type: 'all',
    severity: 'all',
    status: 'all',
    dateRange: '7'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock data
  useEffect(() => {
    const mockHazards: HazardReport[] = [
      {
        id: '1',
        type: 'contamination',
        severity: 'high',
        location: [19.0760, 72.8777],
        title: 'Chemical Contamination Detected',
        description: 'Unusual chemical odor and discoloration in water supply',
        reportedBy: 'John Smith',
        reportedAt: '2024-01-15T10:30:00Z',
        status: 'investigating'
      },
      {
        id: '2',
        type: 'flooding',
        severity: 'critical',
        location: [28.6139, 77.2090],
        title: 'Flash Flood Warning',
        description: 'Rapid water level rise due to heavy rainfall',
        reportedBy: 'Emergency Services',
        reportedAt: '2024-01-15T08:15:00Z',
        status: 'active'
      },
      {
        id: '3',
        type: 'temperature',
        severity: 'medium',
        location: [13.0827, 80.2707],
        title: 'Elevated Water Temperature',
        description: 'Water temperature 15°F above normal levels',
        reportedBy: 'Marine Biologist Team',
        reportedAt: '2024-01-14T16:45:00Z',
        status: 'active'
      },
      {
        id: '4',
        type: 'chemical',
        severity: 'low',
        location: [22.5726, 88.3639],
        title: 'pH Level Anomaly',
        description: 'Slightly acidic pH levels detected in local reservoir',
        reportedBy: 'Srinivas Rao',
        reportedAt: '2024-01-13T12:20:00Z',
        status: 'resolved'
      }
    ];
    
    setHazards(mockHazards);
    setFilteredHazards(mockHazards);
  }, []);

  // Filter hazards based on selected filters
  useEffect(() => {
    let filtered = hazards;

    if (filters.type !== 'all') {
      filtered = filtered.filter(hazard => hazard.type === filters.type);
    }

    if (filters.severity !== 'all') {
      filtered = filtered.filter(hazard => hazard.severity === filters.severity);
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(hazard => hazard.status === filters.status);
    }

    // Date range filter
    /*const daysAgo = parseInt(filters.dateRange);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
    
    filtered = filtered.filter(hazard => 
      new Date(hazard.reportedAt) >= cutoffDate
    );*/

    setFilteredHazards(filtered);
  }, [filters, hazards]);

  const getMarkerColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#d97706';
      case 'low': return '#65a30d';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'contamination': return Droplets;
      case 'flooding': return AlertTriangle;
      case 'chemical': return Zap;
      case 'temperature': return Thermometer;
      default: return MapPin;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
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
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Interactive Hazard Map</h1>
          <p className="text-lg text-gray-600">
            Real-time visualization of water hazards reported by the community
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              {showFilters ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
            </button>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hazard Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="contamination">Contamination</option>
                <option value="flooding">Flooding</option>
                <option value="chemical">Chemical</option>
                <option value="temperature">Temperature</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
              <select
                value={filters.severity}
                onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1">Last 24 hours</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredHazards.length} of {hazards.length} hazard reports
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="h-96 lg:h-[600px]">
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {filteredHazards.map((hazard) => {
                const TypeIcon = getTypeIcon(hazard.type);
                return (
                  <React.Fragment key={hazard.id}>
                    <Marker position={hazard.location}>
                      <Popup>
                        <div className="p-2 min-w-64">
                          <div className="flex items-center space-x-2 mb-2">
                            <TypeIcon className="h-5 w-5 text-blue-600" />
                            <h3 className="font-semibold text-gray-900">{hazard.title}</h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{hazard.description}</p>
                          <div className="space-y-1 text-xs text-gray-500">
                            <div className="flex justify-between">
                              <span>Severity:</span>
                              <span className={`px-2 py-1 rounded text-white ${
                                hazard.severity === 'critical' ? 'bg-red-600' :
                                hazard.severity === 'high' ? 'bg-orange-600' :
                                hazard.severity === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                              }`}>
                                {hazard.severity.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Status:</span>
                              <span className="capitalize">{hazard.status}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Reported:</span>
                              <span>{formatDate(hazard.reportedAt)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>By:</span>
                              <span>{hazard.reportedBy}</span>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                    
                    {/* Severity circle */}
                    <Circle
                      center={hazard.location}
                      radius={hazard.severity === 'critical' ? 1000 : 
                             hazard.severity === 'high' ? 750 :
                             hazard.severity === 'medium' ? 500 : 250}
                      color={getMarkerColor(hazard.severity)}
                      fillColor={getMarkerColor(hazard.severity)}
                      fillOpacity={0.1}
                      weight={2}
                    />
                  </React.Fragment>
                );
              })}
            </MapContainer>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Map Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Severity Levels</h4>
              <div className="space-y-2">
                {[
                  { level: 'Critical', color: 'bg-red-600', description: 'Immediate danger' },
                  { level: 'High', color: 'bg-orange-600', description: 'Significant risk' },
                  { level: 'Medium', color: 'bg-yellow-600', description: 'Moderate concern' },
                  { level: 'Low', color: 'bg-green-600', description: 'Minor issue' }
                ].map((item) => (
                  <div key={item.level} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-medium">{item.level}</span>
                    <span className="text-sm text-gray-600">- {item.description}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Hazard Types</h4>
              <div className="space-y-2">
                {[
                  { type: 'Contamination', icon: Droplets, description: 'Water quality issues' },
                  { type: 'Flooding', icon: AlertTriangle, description: 'Water level emergencies' },
                  { type: 'Chemical', icon: Zap, description: 'Chemical hazards' },
                  { type: 'Temperature', icon: Thermometer, description: 'Temperature anomalies' }
                ].map((item) => (
                  <div key={item.type} className="flex items-center space-x-3">
                    <item.icon className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">{item.type}</span>
                    <span className="text-sm text-gray-600">- {item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HazardMap;