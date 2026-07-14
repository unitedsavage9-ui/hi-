import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Image as ImageIcon, Briefcase, Camera, Video, Trash2, MapPin, Upload } from 'lucide-react';
import { Listing } from '../types';
import { motion } from 'motion/react';

interface AddListingModalProps {
  onClose: () => void;
  onAddListing: (listing: Omit<Listing, 'id' | 'views' | 'isFavorite' | 'owner'>) => void;
}

export default function AddListingModal({
  onClose,
  onAddListing
}: AddListingModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Electronics' | 'Property' | 'Vehicles' | 'Jobs'>('Electronics');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState<'New' | 'Pending' | 'Refurbished' | 'Used' | 'Vintage' | 'Active'>('New');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('San Francisco, CA');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('dslr');

  // Job specific fields
  const [companyName, setCompanyName] = useState('');
  const [jobType, setJobType] = useState<'Full-time' | 'Part-time' | 'Contract' | 'Remote'>('Full-time');
  const [jobRequirements, setJobRequirements] = useState('');

  // Media capture and upload states
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [videoBlobUrl, setVideoBlobUrl] = useState<string>('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Geolocation states
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  // Interactive high quality image presets
  const productPresets: Record<string, string> = {
    laptop: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600',
    dslr: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600',
    watch: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600',
    car: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
    penthouse: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
    keyboard: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600'
  };

  const jobPresets: Record<string, string> = {
    office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
    team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
    workspace: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600',
    charts: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600'
  };

  const activePresets = category === 'Jobs' ? jobPresets : productPresets;

  useEffect(() => {
    if (category === 'Jobs') {
      setSelectedPreset('team');
      setCondition('Active');
    } else {
      setSelectedPreset('dslr');
      setCondition('New');
    }
  }, [category]);

  // Camera Actions
  const startCamera = async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: true 
      });
      streamRef.current = stream;
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Could not access camera. Please confirm camera permissions in your browser or select files from your device gallery.");
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setIsRecording(false);
  };

  // Attach stream when video element mounts or camera becomes active
  useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraActive]);

  // Clean up stream on modal unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        // Optimize and compress to 85% JPEG quality
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setCapturedPhotos(prev => [...prev, compressedDataUrl]);
      }
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;
    const options = { mimeType: 'video/webm;codecs=vp9' };
    let recorder: MediaRecorder;
    try {
      recorder = new MediaRecorder(streamRef.current, options);
    } catch (e) {
      recorder = new MediaRecorder(streamRef.current);
    }

    const chunks: Blob[] = [];
    recorder.ondataavailable = (e: any) => {
      if (e.data && e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoBlobUrl(url);
      setIsRecording(false);
    };

    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
    setRecordingSeconds(0);
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
  };

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds(s => {
          if (s >= 5) { // 5-second optimal demo limit
            stopRecording();
            return 5;
          }
          return s + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, mediaRecorder]);

  // File Upload Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      (Array.from(files) as File[]).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setCapturedPhotos(prev => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoBlobUrl(url);
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setLatitude(lat);
        setLongitude(lng);
        setShowCoordinates(true);

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`, {
            headers: {
              'Accept-Language': 'en'
            }
          });
          if (response.ok) {
            const data = await response.json();
            const address = data.address;
            const city = address.city || address.town || address.village || address.suburb || 'Bangalore';
            const state = address.state || 'KA';
            const country = address.country || 'India';
            setLocation(`${city}, ${state} (${country})`);
          } else {
            setLocation(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
          }
        } catch (err) {
          console.warn("Reverse geocoding failed, fallback to defaults: ", err);
          setLocation("Mumbai, MH (India)");
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        setIsDetectingLocation(false);
        alert("Could not access GPS location. Please check browser location permissions.");
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  const getActiveImage = () => {
    if (capturedPhotos.length > 0) return capturedPhotos[0];
    if (imageUrl.trim() !== '') return imageUrl;
    return activePresets[selectedPreset] || activePresets[Object.keys(activePresets)[0]];
  };

  const getActiveImagesList = () => {
    if (capturedPhotos.length > 0) return capturedPhotos;
    return [getActiveImage()];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '') {
      alert('Please specify a title.');
      return;
    }
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      alert(category === 'Jobs' ? 'Please specify a positive salary amount.' : 'Please specify a positive price.');
      return;
    }

    onAddListing({
      title,
      category,
      price: numPrice,
      condition,
      location,
      time: 'Just now',
      image: getActiveImage(),
      images: getActiveImagesList(),
      videoUrl: videoBlobUrl || undefined,
      latitude: showCoordinates && latitude !== null ? latitude : undefined,
      longitude: showCoordinates && longitude !== null ? longitude : undefined,
      showCoordinates: showCoordinates,
      description,
      status: 'active',
      companyName: category === 'Jobs' ? companyName : undefined,
      jobType: category === 'Jobs' ? jobType : undefined,
      jobRequirements: category === 'Jobs' ? jobRequirements : undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Tinted Overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, translateY: 15 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        exit={{ opacity: 0, scale: 0.95, translateY: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-2xl glass-card rounded-2xl overflow-hidden border border-outline-variant/70 shadow-2xl z-10 flex flex-col bg-white/95 max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-outline-variant/50 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-on-surface tracking-tight">
              {category === 'Jobs' ? 'Post a New Hiring Opportunity' : 'List New Premium Item'}
            </h3>
            <p className="text-xs text-on-surface-variant/70">
              {category === 'Jobs' ? 'Hire exceptional talent from Vendo\'s elite network' : 'Publish instantly on Vendo\'s luxury feed'}
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-primary/20 text-on-surface hover:text-primary transition-colors flex items-center justify-center cursor-pointer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {/* Main Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-primary font-bold uppercase tracking-wider">
                {category === 'Jobs' ? 'Job Role / Title *' : 'Item Title *'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={category === 'Jobs' ? 'e.g. Senior Frontend Developer' : 'e.g. iPad Pro 12.9 Space Gray'}
                className="bg-surface-container/60 border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-on-surface-variant/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-primary font-bold uppercase tracking-wider">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="bg-surface-container/60 border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
              >
                <option value="Electronics">Electronics</option>
                <option value="Property">Property</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Jobs">Jobs</option>
              </select>
            </div>
          </div>

          {/* Price, Condition & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-primary font-bold uppercase tracking-wider">
                {category === 'Jobs' ? 'Monthly Salary (₹) *' : 'Price (₹) *'}
              </label>
              <input
                type="number"
                required
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={category === 'Jobs' ? 'e.g. 150000' : 'e.g. 85000'}
                className="bg-surface-container/60 border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-on-surface-variant/20"
              />
            </div>

            {category === 'Jobs' ? (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-primary font-bold uppercase tracking-wider">Job Type</label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value as any)}
                  className="bg-surface-container/60 border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-primary font-bold uppercase tracking-wider">Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as any)}
                  className="bg-surface-container/60 border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                >
                  <option value="New">New</option>
                  <option value="Refurbished">Refurbished</option>
                  <option value="Used">Used</option>
                  <option value="Vintage">Vintage</option>
                </select>
              </div>
            )}

            <div className="flex flex-col gap-1.5 relative">
              <div className="flex justify-between items-center">
                <label className="text-xs text-primary font-bold uppercase tracking-wider">
                  {category === 'Jobs' ? 'Job Location' : 'City Location'}
                </label>
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={isDetectingLocation}
                  className="text-[10px] text-primary font-black hover:brightness-125 transition-all flex items-center gap-1 cursor-pointer bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-lg px-2 py-0.5"
                >
                  {isDetectingLocation ? (
                    <>
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      <span>Detecting...</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-3 h-3 animate-pulse" />
                      <span>GPS Detect</span>
                    </>
                  )}
                </button>
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={category === 'Jobs' ? 'e.g. Bangalore, KA' : 'e.g. San Francisco, CA'}
                className="bg-surface-container/60 border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-on-surface-variant/20"
              />
              {latitude && longitude && (
                <div className="flex items-center justify-between mt-1 px-1.5">
                  <span className="text-[10px] text-on-surface-variant/60 font-mono">
                    Coords: {latitude.toFixed(4)}, {longitude.toFixed(4)}
                  </span>
                  <label className="flex items-center gap-1.5 text-[10px] text-primary/90 font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showCoordinates}
                      onChange={(e) => setShowCoordinates(e.target.checked)}
                      className="rounded bg-surface-container border-outline-variant text-primary focus:ring-0 cursor-pointer"
                    />
                    <span>Show on listing map</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Job Specific Fields */}
          {category === 'Jobs' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 gap-4 pt-4 border-t border-outline-variant/50"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-primary font-bold uppercase tracking-wider">Hiring Company / Brand *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Vibe Tech Labs"
                  className="bg-surface-container/60 border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-on-surface-variant/20"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-primary font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-primary" />
                  <span>Job Requirements & Qualifications *</span>
                </label>
                <textarea
                  required
                  value={jobRequirements}
                  onChange={(e) => setJobRequirements(e.target.value)}
                  placeholder="e.g. 3+ years experience with React; familiarity with Tailwind CSS; strong problem solving..."
                  rows={3}
                  className="bg-surface-container/60 border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none placeholder:text-on-surface-variant/20"
                />
              </div>
            </motion.div>
          )}

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-primary font-bold uppercase tracking-wider">
              {category === 'Jobs' ? 'Job Role Description' : 'Item Description'}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={category === 'Jobs' ? 'Provide a brief overview of the role, team, and day-to-day responsibilities...' : 'Provide a clean list of specs, key highlights, or reasons for sale...'}
              rows={3}
              className="bg-surface-container/60 border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none placeholder:text-on-surface-variant/20"
            />
          </div>

          {/* Vendo Unified Media Hub */}
          <div className="space-y-4 border-t border-outline-variant/50 pt-4">
            <div className="flex justify-between items-center">
              <label className="text-xs text-primary font-black uppercase tracking-widest">
                Vendo Media Hub
              </label>
              <span className="text-[10px] text-on-surface-variant/50 font-bold">
                Camera Capture or Upload Multi-Photos & Videos
              </span>
            </div>

            {/* Main Interactive Controls */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={isCameraActive ? stopCamera : startCamera}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isCameraActive 
                    ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20' 
                    : 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>{isCameraActive ? 'Turn Off Camera' : 'Use Live Camera'}</span>
              </button>

              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
                />
                <button
                  type="button"
                  className="w-full h-full py-3 px-4 rounded-xl bg-surface-container border border-outline-variant text-xs text-on-surface hover:bg-outline-variant/40 font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4 text-primary" />
                  <span>Upload Photos</span>
                </button>
              </div>
            </div>

            {/* Live Camera Viewport */}
            {isCameraActive && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-black rounded-xl border border-primary/20 p-3.5 space-y-3"
              >
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-black border border-outline-variant/30">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                  {isRecording && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white font-black text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span>REC {recordingSeconds}s / 5s</span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="bg-primary hover:brightness-110 text-background font-black text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1 shadow cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Capture Image</span>
                    </button>

                    <button
                      type="button"
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`text-xs font-black px-3.5 py-1.5 rounded-lg flex items-center gap-1 shadow cursor-pointer ${
                        isRecording 
                          ? 'bg-red-500 text-white animate-pulse' 
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>{isRecording ? 'Stop Rec' : 'Record Video'}</span>
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-on-surface-variant/50 text-center">
                  Take live high-res shots or hold &quot;Record Video&quot; to attach a 5-second dynamic demo of your item.
                </p>
              </motion.div>
            )}

            {/* Upload Demo Video Selector */}
            {!isCameraActive && !videoBlobUrl && (
              <div className="relative flex items-center gap-2.5 pt-1">
                <span className="text-[11px] text-on-surface-variant/60 font-black uppercase tracking-wider shrink-0">
                  Or Attach Video:
                </span>
                <div className="relative flex-1">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
                  />
                  <button
                    type="button"
                    className="w-full py-2 px-3 rounded-lg bg-surface-container border border-outline-variant text-[11px] text-on-surface-variant/80 hover:bg-outline-variant/40 font-bold transition-all flex items-center gap-2 justify-center"
                  >
                    <Video className="w-3.5 h-3.5 text-primary" />
                    <span>Choose short video file...</span>
                  </button>
                </div>
              </div>
            )}

            {/* Display Captured/Uploaded Media Elements Grid */}
            {(capturedPhotos.length > 0 || videoBlobUrl) && (
              <div className="bg-surface-container border border-outline-variant/50 rounded-xl p-3 space-y-3">
                <p className="text-[10px] font-black uppercase text-primary tracking-widest">
                  Attached Attachments ({capturedPhotos.length} Images {videoBlobUrl ? '+ 1 Video' : ''})
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {/* Images List */}
                  {capturedPhotos.map((photo, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-outline-variant group">
                      <img src={photo} alt={`Captured ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setCapturedPhotos(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer animate-fade-in"
                        title="Remove photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {idx === 0 && (
                        <span className="absolute bottom-0 left-0 right-0 bg-primary/95 text-background text-[8px] font-black text-center uppercase tracking-wider py-0.5">
                          Primary
                        </span>
                      )}
                    </div>
                  ))}

                  {/* Video Clip File preview */}
                  {videoBlobUrl && (
                    <div className="relative w-28 h-16 rounded-lg overflow-hidden border-2 border-primary/40 group">
                      <video src={videoBlobUrl} className="w-full h-full object-cover pointer-events-none" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Video className="w-4 h-4 text-primary animate-pulse" />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          URL.revokeObjectURL(videoBlobUrl);
                          setVideoBlobUrl('');
                        }}
                        className="absolute inset-0 bg-red-500/85 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                        title="Remove Video"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <span className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-[8px] font-black text-center uppercase py-0.5">
                        Video Clip
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Fallback presets & custom URL for items (collapsed inside stock image choices) */}
            {capturedPhotos.length === 0 && (
              <div className="space-y-3 bg-surface-container border border-outline-variant rounded-xl p-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-on-surface-variant/80 font-black uppercase tracking-wider">
                    Or Choose Stock Preset:
                  </span>
                </div>
                
                <div className="grid grid-cols-5 gap-1.5">
                  {Object.keys(activePresets).map((key) => {
                    const active = selectedPreset === key && imageUrl === '';
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setSelectedPreset(key);
                          setImageUrl('');
                        }}
                        className={`h-11 rounded-lg overflow-hidden border-2 transition-all relative ${
                          active ? 'border-primary scale-105' : 'border-outline-variant/50 opacity-55 hover:opacity-100'
                        }`}
                      >
                        <img src={activePresets[key]} alt={key} className="w-full h-full object-cover" />
                        <span className="absolute inset-0 bg-black/40 flex items-end justify-center pb-0.5 text-[8px] text-white uppercase font-black tracking-wider">
                          {key}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2.5 pt-1">
                  <span className="text-[11px] text-on-surface-variant/60 font-black uppercase tracking-wider shrink-0">
                    Or Custom Web URL:
                  </span>
                  <div className="relative flex-1">
                    <ImageIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 text-primary w-3.5 h-3.5" />
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-surface-container/60 border border-outline-variant/40 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="bg-surface-container/50 border border-primary/10 rounded-xl p-4 flex gap-4 items-center">
            <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-outline-variant/50">
              <img src={getActiveImage()} alt="Active Preview" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface">Live Thumbnail Preview</p>
              <p className="text-[10px] text-on-surface-variant/80 mt-1 leading-relaxed">
                Vendo automatically compresses and generates lightweight CDN mirrors for fast mobile loading speed.
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-outline-variant/50">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-surface-container hover:bg-outline-variant/50 text-on-surface font-semibold rounded-xl text-sm transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:brightness-110 text-background font-black rounded-xl text-sm transition-all shadow-[0_2px_15px_rgba(0,112,243,0.2)] flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Publish Listing</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
