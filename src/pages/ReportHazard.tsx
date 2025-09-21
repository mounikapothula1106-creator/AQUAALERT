import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  AlertTriangle, 
  MapPin, 
  Camera, 
  Mic, 
  MicOff, 
  Upload,
  Send,
  Droplets,
  Thermometer,
  Zap,
  Eye
} from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

interface HazardForm {
  type: string;
  severity: string;
  title: string;
  description: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  contactInfo: string;
  anonymous: boolean;
}

const ReportHazard = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const { addNotification } = useNotifications();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<HazardForm>({
    defaultValues: {
      anonymous: false,
      coordinates: { lat: 0, lng: 0 }
    }
  });

  const hazardTypes = [
    { value: 'contamination', label: 'Water Contamination', icon: Droplets, color: 'text-blue-600' },
    { value: 'flooding', label: 'Flooding/High Water', icon: AlertTriangle, color: 'text-red-600' },
    { value: 'chemical', label: 'Chemical Spill', icon: Zap, color: 'text-yellow-600' },
    { value: 'temperature', label: 'Temperature Anomaly', icon: Thermometer, color: 'text-orange-600' },
    { value: 'infrastructure', label: 'Infrastructure Damage', icon: AlertTriangle, color: 'text-gray-600' },
    { value: 'other', label: 'Other Hazard', icon: Eye, color: 'text-purple-600' }
  ];

  const severityLevels = [
    { value: 'low', label: 'Low', description: 'Minor concern, no immediate danger', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', description: 'Moderate risk, attention needed', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', description: 'Significant risk, urgent response needed', color: 'bg-orange-100 text-orange-800' },
    { value: 'critical', label: 'Critical', description: 'Immediate danger, emergency response required', color: 'bg-red-100 text-red-800' }
  ];

  const getCurrentLocation = () => {
    setUseCurrentLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue('coordinates.lat', position.coords.latitude);
          setValue('coordinates.lng', position.coords.longitude);
          setValue('location', `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`);
          setUseCurrentLocation(false);
          addNotification({
            type: 'success',
            title: 'Location Found',
            message: 'Your current location has been set successfully.'
          });
        },
        (error) => {
          setUseCurrentLocation(false);
          addNotification({
            type: 'error',
            title: 'Location Error',
            message: 'Unable to get your current location. Please enter manually.'
          });
        }
      );
    }
  };

  const handleVoiceRecording = () => {
    if (!isRecording) {
      // Start recording
      setIsRecording(true);
      addNotification({
        type: 'info',
        title: 'Voice Recording Started',
        message: 'Speak clearly to describe the hazard. Tap the microphone again to stop.'
      });
      
      // Simulate voice recording (in real app, implement actual voice recognition)
      setTimeout(() => {
        setIsRecording(false);
        setValue('description', 'Voice recording: Emergency water contamination detected near the main reservoir. Strong chemical smell and unusual water color observed.');
        addNotification({
          type: 'success',
          title: 'Voice Recording Complete',
          message: 'Your voice description has been transcribed successfully.'
        });
      }, 3000);
    } else {
      // Stop recording
      setIsRecording(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedImages(prev => [...prev, ...files]);
    addNotification({
      type: 'success',
      title: 'Images Uploaded',
      message: `${files.length} image(s) added to your report.`
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: HazardForm) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addNotification({
        type: 'success',
        title: 'Hazard Report Submitted',
        message: 'Your report has been submitted successfully. Emergency services have been notified.'
      });

      // Reset form or redirect
      window.location.href = '/map';
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Submission Failed',
        message: 'There was an error submitting your report. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Report Water Hazard</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help keep your community safe by reporting water hazards. Your report will be immediately 
            shared with relevant authorities and community members.
          </p>
        </motion.div>

        {/* Emergency Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8"
        >
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-800">Emergency Situations</h3>
              <p className="text-red-700 text-sm">
                For immediate life-threatening emergencies, call 911 first, then submit this report.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Report Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Hazard Type */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                What type of hazard are you reporting?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hazardTypes.map((type) => (
                  <label key={type.value} className="relative">
                    <input
                      type="radio"
                      value={type.value}
                      {...register('type', { required: 'Please select a hazard type' })}
                      className="sr-only"
                    />
                    <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-300 transition-colors peer-checked:border-blue-500 peer-checked:bg-blue-50">
                      <div className="flex items-center space-x-3">
                        <type.icon className={`h-6 w-6 ${type.color}`} />
                        <span className="font-medium text-gray-900">{type.label}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.type && (
                <p className="mt-2 text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>

            {/* Severity Level */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                How severe is this hazard?
              </label>
              <div className="space-y-3">
                {severityLevels.map((level) => (
                  <label key={level.value} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      value={level.value}
                      {...register('severity', { required: 'Please select a severity level' })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${level.color}`}>
                          {level.label}
                        </span>
                        <span className="text-gray-700">{level.description}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.severity && (
                <p className="mt-2 text-sm text-red-600">{errors.severity.message}</p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Brief Title
              </label>
              <input
                type="text"
                {...register('title', { required: 'Please provide a brief title' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Chemical spill near Main Street bridge"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Description with Voice Recording */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Detailed Description
              </label>
              <div className="relative">
                <textarea
                  {...register('description', { required: 'Please provide a detailed description' })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  placeholder="Describe what you observed, when it happened, and any other relevant details..."
                />
                <button
                  type="button"
                  onClick={handleVoiceRecording}
                  className={`absolute top-3 right-3 p-2 rounded-lg transition-colors ${
                    isRecording 
                      ? 'bg-red-100 text-red-600 animate-pulse' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
              </div>
              {isRecording && (
                <p className="mt-2 text-sm text-red-600 animate-pulse">
                  🔴 Recording... Speak clearly and tap the microphone to stop.
                </p>
              )}
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Location
              </label>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    {...register('location', { required: 'Please provide the location' })}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter address or coordinates"
                  />
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={useCurrentLocation}
                    className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <MapPin className="h-5 w-5" />
                    <span>{useCurrentLocation ? 'Getting...' : 'Use Current'}</span>
                  </button>
                </div>
              </div>
              {errors.location && (
                <p className="mt-2 text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload photos or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                </label>
              </div>
              
              {uploadedImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Contact Information (Optional)
              </label>
              <input
                type="text"
                {...register('contactInfo')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Phone number or email for follow-up"
              />
              <div className="mt-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('anonymous')}
                    className="rounded"
                  />
                  <span className="text-gray-700">Submit this report anonymously</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Submit Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportHazard;