import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import getIcon from '../utils/iconUtils';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Icons
  const HomeIcon = getIcon('Home');
  const UsersIcon = getIcon('Users');
  const FileTextIcon = getIcon('FileText');
  const CalendarIcon = getIcon('Calendar');
  const ClockIcon = getIcon('Clock');
  const SettingsIcon = getIcon('Settings');
  const BellIcon = getIcon('Bell');
  const PlusIcon = getIcon('Plus');
  const SearchIcon = getIcon('Search');
  const MoreHorizontalIcon = getIcon('MoreHorizontal');
  const ChevronRightIcon = getIcon('ChevronRight');
  const ArrowUpIcon = getIcon('ArrowUp');
  const ArrowDownIcon = getIcon('ArrowDown');
  
  // State
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Sample data
  const recentMatters = [
    { id: 1, title: "Hanson v. Smith", client: "Hanson Inc.", status: "active", lastUpdated: "2023-09-15" },
    { id: 2, title: "Johnson Estate Planning", client: "Johnson Family", status: "pending", lastUpdated: "2023-09-10" },
    { id: 3, title: "TechCorp Acquisition", client: "TechCorp LLC", status: "active", lastUpdated: "2023-09-08" },
    { id: 4, title: "Davidson Divorce", client: "Thomas Davidson", status: "closed", lastUpdated: "2023-08-30" },
  ];
  
  const upcomingDeadlines = [
    { id: 1, title: "File Motion for Summary Judgment", matter: "Hanson v. Smith", dueDate: "2023-09-22" },
    { id: 2, title: "Client Meeting", matter: "Johnson Estate Planning", dueDate: "2023-09-25" },
    { id: 3, title: "Document Review", matter: "TechCorp Acquisition", dueDate: "2023-09-28" },
  ];
  
  const billableHoursOptions = {
    chart: {
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#2A4365', '#3B5C88'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.2,
        gradientToColors: ['#3B5C88'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    grid: {
      borderColor: '#e0e6ed',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10
      }
    },
    markers: {
      size: 4,
      colors: ['#2A4365'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 6
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        format: 'dd MMM'
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400
        },
        formatter: function(val) {
          return val.toFixed(1) + 'h';
        }
      }
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      },
      y: {
        formatter: function(val) {
          return val.toFixed(1) + ' hours';
        }
      }
    }
  };
  
  const billableHoursSeries = [
    {
      name: "Billable Hours",
      data: [
        [new Date('2023-09-01').getTime(), 5.4],
        [new Date('2023-09-02').getTime(), 4.2],
        [new Date('2023-09-03').getTime(), 3.8],
        [new Date('2023-09-04').getTime(), 6.1],
        [new Date('2023-09-05').getTime(), 5.7],
        [new Date('2023-09-06').getTime(), 4.9],
        [new Date('2023-09-07').getTime(), 7.3],
        [new Date('2023-09-08').getTime(), 6.2],
        [new Date('2023-09-09').getTime(), 3.9],
        [new Date('2023-09-10').getTime(), 4.5],
        [new Date('2023-09-11').getTime(), 5.8],
        [new Date('2023-09-12').getTime(), 6.5],
        [new Date('2023-09-13').getTime(), 7.1],
        [new Date('2023-09-14').getTime(), 5.3],
      ]
    }
  ];
  
  const matterDistributionOptions = {
    chart: {
      type: 'donut',
      offsetY: 0,
      sparkline: {
        enabled: true
      }
    },
    colors: ['#2A4365', '#3B5C88', '#1E432F', '#3D7A56', '#C5A47E'],
    labels: ['Litigation', 'Corporate', 'Estate', 'Family', 'Other'],
    stroke: {
      width: 2
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val + ' matters';
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              color: '#1A1A1A',
              offsetY: -10
            },
            value: {
              show: true,
              fontSize: '20px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              color: '#1A1A1A',
              offsetY: 5,
              formatter: function(val) {
                return val;
              }
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '11px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              color: '#1A1A1A',
              formatter: function(w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              }
            }
          }
        }
      }
    }
  };
  
  const matterDistributionSeries = [14, 8, 6, 4, 3];
  
  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };
  
  // Get status classes
  const getStatusClass = (status) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };
  
  // Page transition
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
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
                <HomeIcon className="h-5 w-5" />
                {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
              </a>
            </li>
            <li>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/matters');
                }}
                className="flex items-center p-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <FileTextIcon className="h-5 w-5" />
                {!sidebarCollapsed && <span className="ml-3">Matters</span>}
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center p-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <UsersIcon className="h-5 w-5" />
                {!sidebarCollapsed && <span className="ml-3">Clients</span>}
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
                <ClockIcon className="h-5 w-5" />
                {!sidebarCollapsed && <span className="ml-3">Time & Billing</span>}
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
      <motion.main 
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-72'}`}
      >
        {/* Top navigation */}
        <header className="bg-white dark:bg-surface-900 h-16 border-b border-surface-200 dark:border-surface-700 shadow-sm px-6 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-50">Dashboard</h2>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-xl bg-surface-100 dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <SearchIcon className="absolute left-3 top-2.5 text-surface-400" size={18} />
            </div>
            
            <button className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 relative">
              <BellIcon className="h-5 w-5 text-surface-600 dark:text-surface-400" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center font-medium">
              JD
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <div className="p-6 md:p-8">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-surface-500 dark:text-surface-400 font-medium">Active Matters</h3>
                <span className="flex items-center text-green-600 text-sm font-medium">
                  <ArrowUpIcon size={14} className="mr-1" />
                  12%
                </span>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold">28</p>
                <span className="text-surface-400 text-sm">Last 30 days</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-surface-500 dark:text-surface-400 font-medium">Total Clients</h3>
                <span className="flex items-center text-green-600 text-sm font-medium">
                  <ArrowUpIcon size={14} className="mr-1" />
                  8%
                </span>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold">64</p>
                <span className="text-surface-400 text-sm">+3 this month</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-surface-500 dark:text-surface-400 font-medium">Billable Hours</h3>
                <span className="flex items-center text-red-600 text-sm font-medium">
                  <ArrowDownIcon size={14} className="mr-1" />
                  5%
                </span>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold">182</p>
                <span className="text-surface-400 text-sm">This month</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-surface-500 dark:text-surface-400 font-medium">Revenue</h3>
                <span className="flex items-center text-green-600 text-sm font-medium">
                  <ArrowUpIcon size={14} className="mr-1" />
                  14%
                </span>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold">$42.5k</p>
                <span className="text-surface-400 text-sm">This month</span>
              </div>
            </div>
          </div>
          
          {/* Charts and data */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Billable hours chart */}
            <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 shadow-card lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Billable Hours</h3>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm bg-surface-100 dark:bg-surface-800 rounded-lg text-surface-600 dark:text-surface-400">Week</button>
                  <button className="px-3 py-1 text-sm bg-primary text-white rounded-lg">Month</button>
                  <button className="px-3 py-1 text-sm bg-surface-100 dark:bg-surface-800 rounded-lg text-surface-600 dark:text-surface-400">Year</button>
                </div>
              </div>
              <Chart 
                options={billableHoursOptions} 
                series={billableHoursSeries} 
                type="area" 
                height={300} 
              />
            </div>
            
            {/* Matter distribution */}
            <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Matter Types</h3>
                <button className="text-surface-400 hover:text-surface-900 dark:hover:text-surface-50">
                  <MoreHorizontalIcon size={18} />
                </button>
              </div>
              <Chart 
                options={matterDistributionOptions} 
                series={matterDistributionSeries} 
                type="donut" 
                height={250} 
              />
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-primary mr-2"></span>
                  <span className="text-sm text-surface-600 dark:text-surface-400">Litigation</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-[#3B5C88] mr-2"></span>
                  <span className="text-sm text-surface-600 dark:text-surface-400">Corporate</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-[#1E432F] mr-2"></span>
                  <span className="text-sm text-surface-600 dark:text-surface-400">Estate</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-[#3D7A56] mr-2"></span>
                  <span className="text-sm text-surface-600 dark:text-surface-400">Family</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-[#C5A47E] mr-2"></span>
                  <span className="text-sm text-surface-600 dark:text-surface-400">Other</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent matters and Deadlines */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent matters */}
            <div className="bg-white dark:bg-surface-900 rounded-2xl shadow-card">
              <div className="px-6 py-4 flex items-center justify-between border-b border-surface-200 dark:border-surface-700">
                <h3 className="text-lg font-medium">Recent Matters</h3>
                <button 
                  onClick={() => navigate('/matters')}
                  className="text-primary text-sm font-medium flex items-center"
                >
                  View All
                  <ChevronRightIcon size={16} className="ml-1" />
                </button>
              </div>
              <div className="divide-y divide-surface-200 dark:divide-surface-700">
                {recentMatters.map((matter) => (
                  <div 
                    key={matter.id} 
                    className="px-6 py-4 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 
                          className="font-medium cursor-pointer hover:text-primary"
                          onClick={() => navigate(`/matters/${matter.id}`)}
                        >
                          {matter.title}
                        </h4>
                        <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
                          {matter.client}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(matter.status)}`}>
                          {matter.status}
                        </span>
                        <span className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                          Updated {formatDate(matter.lastUpdated)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 bg-surface-50 dark:bg-surface-800 rounded-b-2xl border-t border-surface-200 dark:border-surface-700">
                <button 
                  className="w-full py-2 rounded-xl border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-white dark:hover:bg-surface-900 transition-colors flex items-center justify-center"
                  onClick={() => navigate('/matters')}
                >
                  <PlusIcon size={16} className="mr-2" />
                  Create New Matter
                </button>
              </div>
            </div>
            
            {/* Upcoming deadlines */}
            <div className="bg-white dark:bg-surface-900 rounded-2xl shadow-card">
              <div className="px-6 py-4 flex items-center justify-between border-b border-surface-200 dark:border-surface-700">
                <h3 className="text-lg font-medium">Upcoming Deadlines</h3>
                <button className="text-primary text-sm font-medium flex items-center">
                  View Calendar
                  <ChevronRightIcon size={16} className="ml-1" />
                </button>
              </div>
              <div className="divide-y divide-surface-200 dark:divide-surface-700">
                {upcomingDeadlines.map((deadline) => (
                  <div 
                    key={deadline.id} 
                    className="px-6 py-4 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{deadline.title}</h4>
                        <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
                          {deadline.matter}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium">
                          {formatDate(deadline.dueDate)}
                        </span>
                        <button className="text-surface-400 hover:text-surface-900 dark:hover:text-surface-50">
                          <MoreHorizontalIcon size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 bg-surface-50 dark:bg-surface-800 rounded-b-2xl border-t border-surface-200 dark:border-surface-700">
                <button className="w-full py-2 rounded-xl border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-white dark:hover:bg-surface-900 transition-colors flex items-center justify-center">
                  <PlusIcon size={16} className="mr-2" />
                  Add Deadline
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default Dashboard;