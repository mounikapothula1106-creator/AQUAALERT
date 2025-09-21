import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Waves, 
  Cloud, 
  Zap, 
  MapPin,
  Clock,
  Shield,
  Volume2,
  VolumeX,
  Bell,
  ExternalLink
} from 'lucide-react';

interface EmergencyAlert {
  id: string;
  type: 'tsunami' | 'flood' | 'storm' | 'chemical' | 'infrastructure';
  severity: 'watch' | 'warning' | 'emergency';
  title: string;
  description: string;
  location: string;
  coordinates: [number, number];
  issuedAt: string;
  expiresAt: string;
  source: string;
  instructions: string[];
  affectedAreas: string[];
  status: 'active' | 'expired' | 'cancelled';
}

const EmergencyAlerts = () => {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'watch' | 'warning' | 'emergency'>('all');

  // Mock INCOIS alerts data
  useEffect(() => {
    const mockAlerts: EmergencyAlert[] = [
      {
        id: 'alert-001',
        type: 'tsunami',
        severity: 'warning',
        title: 'Tsunami Warning - Coastal Areas',
        description: 'A tsunami warning has been issued for coastal areas following a 7.2 magnitude earthquake in the Pacific Ocean.',
        location: 'East Coast Maritime Zone',
        coordinates: [40.7128, -74.0060],
        issuedAt: '2024-01-15T14:30:00Z',
        expiresAt: '2024-01-15T20:30:00Z',
        source: 'INCOIS - Indian National Centre for Ocean Information Services',
        instructions: [
          'Move immediately to higher ground or inland',
          'Stay away from beaches, harbors, and coastal areas',
          'Listen to local emergency broadcasts',
          'Do not return to coastal areas until all-clear is given'
        ],
        affectedAreas: ['Coastal District A', 'Harbor Zone B', 'Beach Communities C-F'],
        status: 'active'
      },
      {
        id: 'alert-002',
        type: 'flood',
        severity: 'emergency',
        title: 'Flash Flood Emergency - Urban Areas',
        description: 'Extreme rainfall has caused rapid flooding in urban areas. Immediate evacuation required for low-lying zones.',
        location: 'Metropolitan Downtown',
        coordinates: [40.7589, -73.9851],
        issuedAt: '2024-01-15T12:15:00Z',
        expiresAt: '2024-01-16T06:00:00Z',
        source: 'National Weather Service',
        instructions: [
          'Evacuate low-lying areas immediately',
          'Do not drive through flooded roads',
          'Seek higher ground and shelter',
          'Call emergency services if trapped'
        ],
        affectedAreas: ['Downtown District', 'Riverside Communities', 'Industrial Zone'],
        status: 'active'
      },
      {
        id: 'alert-003',
        type: 'storm',
        severity: 'watch',
        title: 'Severe Storm Watch - Regional',
        description: 'Conditions are favorable for severe thunderstorms with potential for damaging winds and heavy rainfall.',
        location: 'Regional Area',
        coordinates: [40.7282, -73.7949],
        issuedAt: '2024-01-15T10:00:00Z',
        expiresAt: '2024-01-15T22:00:00Z',
        source: 'Regional Weather Center',
        instructions: [
          'Monitor weather conditions closely',
          'Secure outdoor objects and equipment',
          'Avoid unnecessary travel',
          'Stay indoors during severe weather'
        ],
        affectedAreas: ['Northern Suburbs', 'Agricultural Areas', 'Mountain Regions'],
        status: 'active'
      },
      {
        id: 'alert-004',
        type: 'chemical',
        severity: 'warning',
        title: 'Chemical Spill - Water Supply Risk',
        description: 'Industrial chemical spill detected near water treatment facility. Potential contamination risk.',
        location: 'Industrial Complex East',
        coordinates: [40.6892, -74.0445],
        issuedAt: '2024-01-14T16:45:00Z',
        expiresAt: '2024-01-15T16:45:00Z',
        source: 'Environmental Protection Agency',
        instructions: [
          'Avoid using tap water until further notice',
          'Use bottled water for drinking and cooking',
          'Stay away from affected industrial area',
          'Report any unusual water odor or color'
        ],
        affectedAreas: ['East Industrial Zone', 'Adjacent Residential Areas'],
        status: 'expired'
      }
    ];

    setAlerts(mockAlerts);
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'tsunami': return Waves;
      case 'flood': return Cloud;
      case 'storm': return Zap;
      case 'chemical': return AlertTriangle;
      default: return Shield;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'emergency': return 'bg-red-600 text-white border-red-600';
      case 'warning': return 'bg-orange-500 text-white border-orange-500';
      case 'watch': return 'bg-yellow-500 text-white border-yellow-500';
      default: return 'bg-gray-500 text-white border-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-100';
      case 'expired': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'active') return alert.status === 'active';
    return alert.severity === filter;
  });

  const formatTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    }
    return `${minutes}m remaining`;
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Alerts</h1>
              <p className="text-lg text-gray-600">
                Real-time emergency notifications from INCOIS and other authorities
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  soundEnabled 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                <span>Sound {soundEnabled ? 'On' : 'Off'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Alert Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { 
              label: 'Active Alerts', 
              value: alerts.filter(a => a.status === 'active').length,
              color: 'text-red-600',
              bgColor: 'bg-red-100'
            },
            { 
              label: 'Emergency Level', 
              value: alerts.filter(a => a.severity === 'emergency' && a.status === 'active').length,
              color: 'text-red-600',
              bgColor: 'bg-red-100'
            },
            { 
              label: 'Warnings', 
              value: alerts.filter(a => a.severity === 'warning' && a.status === 'active').length,
              color: 'text-orange-600',
              bgColor: 'bg-orange-100'
            },
            { 
              label: 'Watches', 
              value: alerts.filter(a => a.severity === 'watch' && a.status === 'active').length,
              color: 'text-yellow-600',
              bgColor: 'bg-yellow-100'
            }
          ].map((stat, index) => (
            <div key={stat.label} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Bell className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-6"
        >
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Alerts' },
              { key: 'active', label: 'Active Only' },
              { key: 'emergency', label: 'Emergency' },
              { key: 'warning', label: 'Warning' },
              { key: 'watch', label: 'Watch' }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === filterOption.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredAlerts.length} of {alerts.length} alerts
          </div>
        </motion.div>

        {/* Alerts List */}
        <div className="space-y-6">
          {filteredAlerts.map((alert, index) => {
            const AlertIcon = getAlertIcon(alert.type);
            
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`bg-white rounded-lg shadow-lg overflow-hidden border-l-4 ${
                  alert.severity === 'emergency' ? 'border-red-600' :
                  alert.severity === 'warning' ? 'border-orange-500' :
                  'border-yellow-500'
                }`}
              >
                <div className="p-6">
                  {/* Alert Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        alert.severity === 'emergency' ? 'bg-red-100' :
                        alert.severity === 'warning' ? 'bg-orange-100' :
                        'bg-yellow-100'
                      }`}>
                        <AlertIcon className={`h-6 w-6 ${
                          alert.severity === 'emergency' ? 'text-red-600' :
                          alert.severity === 'warning' ? 'text-orange-600' :
                          'text-yellow-600'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-xl font-bold text-gray-900">{alert.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${getSeverityColor(alert.severity)}`}>
                            {alert.severity.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{alert.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{formatTimeRemaining(alert.expiresAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                        {alert.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Alert Description */}
                  <p className="text-gray-700 mb-4 leading-relaxed">{alert.description}</p>

                  {/* Instructions */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Emergency Instructions:</h4>
                    <ul className="space-y-1">
                      {alert.instructions.map((instruction, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span className="text-gray-700">{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Affected Areas */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Affected Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {alert.affectedAreas.map((area, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      <div>Source: {alert.source}</div>
                      <div>Issued: {new Date(alert.issuedAt).toLocaleString()}</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <ExternalLink className="h-4 w-4" />
                        <span>View on Map</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Bell className="h-4 w-4" />
                        <span>Set Reminder</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredAlerts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-12"
          >
            <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Alerts Found</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'There are currently no emergency alerts in the system.' 
                : `No alerts match the selected filter: ${filter}`}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EmergencyAlerts;