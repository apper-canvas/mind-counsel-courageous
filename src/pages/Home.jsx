import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
  // Icons declaration
  const BriefcaseIcon = getIcon('Briefcase');
  const UserIcon = getIcon('Users');
  const ClockIcon = getIcon('Clock');
  const FileTextIcon = getIcon('FileText');
  const CalendarIcon = getIcon('Calendar');
  const SettingsIcon = getIcon('Settings');
  const ChevronRightIcon = getIcon('ChevronRight');
  const PlusIcon = getIcon('Plus');
  const SearchIcon = getIcon('Search');
  const BellIcon = getIcon('Bell');
  
  // State for sidebar collapse
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Handle sidebar toggle
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Sample recent matters data
  const recentMatters = [
    { id: 1, title: "Hanson v. Smith", status: "active", type: "Litigation", client: "Hanson Inc." },
    { id: 2, title: "Johnson Estate Planning", status: "pending", type: "Estate", client: "Johnson Family" },
    { id: 3, title: "TechCorp Acquisition", status: "active", type: "Corporate", client: "TechCorp LLC" },
  ];
  
  // Handle create new matter
  const handleCreateMatter = () => {
    toast.success("New matter creation would open here");
  };
  
  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="flex min-h-screen bg-surface-50 dark:bg-surface-800">
      {/* Sidebar */}
      <motion.aside 
        initial={{ width: sidebarCollapsed ? 80 : 280 }}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3 }}
        className={`fixed h-full bg-white dark:bg-surface-900 shadow-soft z-10 overflow-hidden`}
      >
        {/* Logo area */}
        <div className="p-6 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
          {!sidebarCollapsed && (
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xl font-bold text-primary"
            >
              Counsel Hub
            </motion.h1>
          )}
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
          >
            <ChevronRightIcon className={`transform transition-transform duration-300 ${sidebarCollapsed ? 'rotate-0' : 'rotate-180'}`} />
          </button>
        </div>
        
        {/* Menu items */}
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a 
                href="#" 
                className="flex items-center p-3 rounded-xl bg-primary bg-opacity-10 text-primary dark:text-primary-light"
              >
                <BriefcaseIcon className="h-5 w-5" />
                {!sidebarCollapsed && <span className="ml-3">Matters</span>}
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center p-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <UserIcon className="h-5 w-5" />
                {!sidebarCollapsed && <span className="ml-3">Clients</span>}
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center p-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <FileTextIcon className="h-5 w-5" />
                {!sidebarCollapsed && <span className="ml-3">Documents</span>}
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center p-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <ClockIcon className="h-5 w-5" />
                {!sidebarCollapsed && <span className="ml-3">Time & Billing</span>}
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center p-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <CalendarIcon className="h-5 w-5" />
                {!sidebarCollapsed && <span className="ml-3">Calendar</span>}
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center p-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <SettingsIcon className="h-5 w-5" />
                {!sidebarCollapsed && <span className="ml-3">Settings</span>}
              </a>
            </li>
          </ul>
        </nav>
      </motion.aside>
      
      {/* Main content */}
      <main 
        className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-72'}`}
      >
        {/* Top navigation */}
        <header className="bg-white dark:bg-surface-900 h-16 border-b border-surface-200 dark:border-surface-700 shadow-sm px-6 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-50">Matter Dashboard</h2>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-xl bg-surface-100 dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <SearchIcon className="absolute left-3 top-2.5 text-surface-400" size={18} />
            </div>
            
            <button className="relative p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center font-medium">
              JD
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <div className="p-6 md:p-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Stats grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 shadow-card">
                <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400">Active Matters</h3>
                <p className="text-3xl font-bold mt-2">24</p>
                <div className="mt-4 text-xs text-green-600 flex items-center">
                  <span>↑ 12% from last month</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 shadow-card">
                <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400">Pending Tasks</h3>
                <p className="text-3xl font-bold mt-2">15</p>
                <div className="mt-4 text-xs text-yellow-600 flex items-center">
                  <span>3 due today</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 shadow-card">
                <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400">Billable Hours (MTD)</h3>
                <p className="text-3xl font-bold mt-2">128</p>
                <div className="mt-4 text-xs text-green-600 flex items-center">
                  <span>↑ 8% from last month</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 shadow-card">
                <h3 className="text-sm font-medium text-surface-500 dark:text-surface-400">Outstanding Invoices</h3>
                <p className="text-3xl font-bold mt-2">$24,800</p>
                <div className="mt-4 text-xs text-red-600 flex items-center">
                  <span>3 overdue</span>
                </div>
              </div>
            </motion.div>
            
            {/* Recent matters and main feature */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div variants={itemVariants} className="bg-white dark:bg-surface-900 rounded-2xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Recent Matters</h3>
                  <button 
                    onClick={handleCreateMatter}
                    className="flex items-center text-sm font-medium text-primary hover:text-primary-dark"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    <span>New Matter</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {recentMatters.map(matter => (
                    <div 
                      key={matter.id}
                      className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800 hover:shadow-soft cursor-pointer transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{matter.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          matter.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {matter.status}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-surface-500 dark:text-surface-400">
                        <span>{matter.type}</span>
                        <span className="mx-2">•</span>
                        <span>{matter.client}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 p-3 text-sm text-center text-primary hover:text-primary-dark">
                  View All Matters
                </button>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <MainFeature />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Home;