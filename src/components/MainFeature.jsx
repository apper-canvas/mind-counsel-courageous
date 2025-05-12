import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  // Icons declaration
  const ClockIcon = getIcon('Clock');
  const PauseIcon = getIcon('Pause');
  const PlayIcon = getIcon('Play');
  const SaveIcon = getIcon('Save');
  const PlusIcon = getIcon('Plus');
  const CheckIcon = getIcon('Check');
  const XIcon = getIcon('X');
  const EditIcon = getIcon('Edit');
  const ChevronDownIcon = getIcon('ChevronDown');
  
  // States
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timerDescription, setTimerDescription] = useState('');
  const [selectedMatter, setSelectedMatter] = useState(null);
  const [showMatterDropdown, setShowMatterDropdown] = useState(false);
  const [timeEntries, setTimeEntries] = useState([
    { id: 1, matter: 'Hanson v. Smith', description: 'Research on precedent cases', duration: 3600, date: new Date().toISOString().slice(0, 10) }
  ]);
  
  // Sample matters for selection
  const matters = [
    { id: 1, title: 'Hanson v. Smith' },
    { id: 2, title: 'Johnson Estate Planning' },
    { id: 3, title: 'TechCorp Acquisition' }
  ];
  
  // Timer functionality
  const startTimer = () => {
    if (!selectedMatter) {
      toast.error('Please select a matter first');
      return;
    }
    
    setIsTimerRunning(true);
    
    // Set up interval to increment timer
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);
    
    // Store interval ID to clear it later
    window.timerInterval = intervalId;
  };
  
  const pauseTimer = () => {
    setIsTimerRunning(false);
    clearInterval(window.timerInterval);
  };
  
  const resetTimer = () => {
    setSeconds(0);
    setIsTimerRunning(false);
    clearInterval(window.timerInterval);
  };
  
  // Format seconds to hh:mm:ss
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };
  
  // Save time entry
  const saveTimeEntry = () => {
    if (!selectedMatter) {
      toast.error('Please select a matter');
      return;
    }
    
    if (seconds === 0) {
      toast.error('Timer has not been started');
      return;
    }
    
    if (!timerDescription.trim()) {
      toast.error('Please add a description');
      return;
    }
    
    // Create new time entry
    const newEntry = {
      id: Date.now(),
      matter: selectedMatter.title,
      description: timerDescription,
      duration: seconds,
      date: new Date().toISOString().slice(0, 10)
    };
    
    // Add to list
    setTimeEntries([newEntry, ...timeEntries]);
    
    // Reset timer
    resetTimer();
    setTimerDescription('');
    
    toast.success('Time entry saved successfully');
  };
  
  // Delete time entry
  const deleteTimeEntry = (id) => {
    setTimeEntries(timeEntries.filter(entry => entry.id !== id));
    toast.success('Time entry deleted');
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-surface-900 rounded-2xl shadow-card overflow-hidden"
    >
      <div className="bg-primary text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ClockIcon className="h-6 w-6 mr-3" />
            <h3 className="text-xl font-semibold">Time Tracker</h3>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Matter selector */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
            Matter
          </label>
          <div 
            className="w-full p-3 flex items-center justify-between bg-surface-50 dark:bg-surface-800 rounded-xl cursor-pointer border border-surface-200 dark:border-surface-700"
            onClick={() => setShowMatterDropdown(!showMatterDropdown)}
          >
            <span className={`${!selectedMatter ? 'text-surface-400' : ''}`}>
              {selectedMatter ? selectedMatter.title : 'Select a matter'}
            </span>
            <ChevronDownIcon className={`transform transition-transform duration-200 ${showMatterDropdown ? 'rotate-180' : ''}`} />
          </div>
          
          {/* Dropdown */}
          <AnimatePresence>
            {showMatterDropdown && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 mt-1 w-full bg-white dark:bg-surface-800 rounded-xl shadow-card border border-surface-200 dark:border-surface-700 py-2"
              >
                {matters.map(matter => (
                  <div 
                    key={matter.id}
                    className="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer"
                    onClick={() => {
                      setSelectedMatter(matter);
                      setShowMatterDropdown(false);
                    }}
                  >
                    {matter.title}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-surface-700 dark:text-surface-300">
            Description
          </label>
          <input
            type="text"
            value={timerDescription}
            onChange={(e) => setTimerDescription(e.target.value)}
            placeholder="What are you working on?"
            className="w-full p-3 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        {/* Timer display */}
        <div className="mb-6 p-6 bg-surface-50 dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700">
          <div className="text-center">
            <span className="text-4xl font-mono font-bold tracking-wider">{formatTime(seconds)}</span>
          </div>
          
          <div className="mt-6 flex items-center justify-center space-x-4">
            {isTimerRunning ? (
              <button
                onClick={pauseTimer}
                className="p-4 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              >
                <PauseIcon className="h-6 w-6" />
              </button>
            ) : (
              <button
                onClick={startTimer}
                className="p-4 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
              >
                <PlayIcon className="h-6 w-6" />
              </button>
            )}
            
            <button
              onClick={saveTimeEntry}
              className="flex items-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
            >
              <SaveIcon className="h-5 w-5 mr-2" />
              <span>Save Entry</span>
            </button>
          </div>
        </div>
        
        {/* Recent time entries */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Recent Entries</h4>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
            {timeEntries.map(entry => (
              <div 
                key={entry.id}
                className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{entry.matter}</p>
                  <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">{entry.description}</p>
                  <div className="flex items-center mt-2 text-xs text-surface-500 dark:text-surface-400">
                    <span>{entry.date}</span>
                    <span className="mx-2">•</span>
                    <span>{formatTime(entry.duration)}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    className="p-2 text-surface-500 hover:text-primary rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                    aria-label="Edit time entry"
                  >
                    <EditIcon className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => deleteTimeEntry(entry.id)}
                    className="p-2 text-surface-500 hover:text-red-500 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                    aria-label="Delete time entry"
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            
            {timeEntries.length === 0 && (
              <div className="text-center py-8 text-surface-500 dark:text-surface-400">
                <p>No time entries yet</p>
              </div>
            )}
          </div>
          
          {timeEntries.length > 0 && (
            <button className="w-full mt-4 p-3 text-sm text-center text-primary hover:text-primary-dark border border-surface-200 dark:border-surface-700 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
              View All Time Entries
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MainFeature;