import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const ClientProfile = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  
  // Icons
  const HomeIcon = getIcon('Home');
  const ChevronRightIcon = getIcon('ChevronRight');
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const UserIcon = getIcon('User');
  const UsersIcon = getIcon('Users');
  const ClockIcon = getIcon('Clock');
  const SettingsIcon = getIcon('Settings');
  const CalendarIcon = getIcon('Calendar');
  const FileTextIcon = getIcon('FileText');
  const PhoneIcon = getIcon('Phone');
  const MailIcon = getIcon('Mail');
  const BuildingIcon = getIcon('Building');
  const EditIcon = getIcon('Edit');
  const PlusIcon = getIcon('Plus');
  const DollarSignIcon = getIcon('DollarSign');
  const FileIcon = getIcon('File');
  const StickyNoteIcon = getIcon('StickyNote');
  const ClipboardIcon = getIcon('Clipboard');
  const DownloadIcon = getIcon('Download');
  const PrinterIcon = getIcon('Printer');
  const SaveIcon = getIcon('Save');
  const CheckIcon = getIcon('Check');
  const ExternalLinkIcon = getIcon('ExternalLink');

  // States
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [matters, setMatters] = useState([]);
  const [billingHistory, setBillingHistory] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  
  // Sample data - in a real app, this would come from an API
  const clientData = [
    { id: 1, name: "Hanson Inc.", type: "Corporate", status: "active", contactPerson: "Robert Hanson", email: "robert@hansoninc.com", phone: "(555) 123-4567", address: "123 Business Ave, New York, NY", lastContact: "2023-09-15" },
    { id: 2, name: "Johnson Family", type: "Individual", status: "active", contactPerson: "Sarah Johnson", email: "sarah@johnson.com", phone: "(555) 234-5678", address: "456 Maple St, Boston, MA", lastContact: "2023-09-10" },
    { id: 3, name: "TechCorp LLC", type: "Corporate", status: "active", contactPerson: "Alex Chen", email: "alex@techcorp.com", phone: "(555) 345-6789", address: "789 Tech Blvd, San Francisco, CA", lastContact: "2023-09-08" },
    { id: 4, name: "Thomas Davidson", type: "Individual", status: "inactive", contactPerson: "Thomas Davidson", email: "thomas@email.com", phone: "(555) 456-7890", address: "321 Oak Lane, Chicago, IL", lastContact: "2023-08-30" },
    { id: 5, name: "Medtech Inc.", type: "Corporate", status: "active", contactPerson: "Jennifer Lee", email: "jennifer@medtech.com", phone: "(555) 567-8901", address: "567 Health Way, Houston, TX", lastContact: "2023-09-12" },
  ];
  
  // Sample matters data
  const sampleMatters = [
    { id: 101, title: "Contract Review", status: "active", startDate: "2023-06-15", practiceArea: "Business Law", assignedTo: "John Doe" },
    { id: 102, title: "Trademark Registration", status: "completed", startDate: "2023-01-10", endDate: "2023-07-22", practiceArea: "Intellectual Property", assignedTo: "Maria Garcia" },
    { id: 103, title: "Employment Dispute", status: "active", startDate: "2023-08-05", practiceArea: "Employment Law", assignedTo: "James Wilson" },
  ];
  
  // Sample billing data
  const sampleBilling = [
    { id: 201, date: "2023-08-20", description: "Initial Consultation", amount: 850.00, status: "paid" },
    { id: 202, date: "2023-09-05", description: "Document Preparation", amount: 1250.00, status: "pending" },
    { id: 203, date: "2023-09-18", description: "Legal Research", amount: 625.00, status: "overdue" },
  ];
  
  // Sample documents
  const sampleDocuments = [
    { id: 301, title: "Client Agreement", type: "Contract", dateUploaded: "2023-06-10", size: "245 KB" },
    { id: 302, title: "Corporate Bylaws", type: "Legal Document", dateUploaded: "2023-07-15", size: "1.2 MB" },
    { id: 303, title: "Trademark Application", type: "Form", dateUploaded: "2023-08-22", size: "500 KB" },
    { id: 304, title: "Meeting Minutes", type: "Notes", dateUploaded: "2023-09-01", size: "180 KB" },
  ];
  
  // Sample notes
  const sampleNotes = [
    { id: 401, content: "Client expressed interest in expanding trademark portfolio internationally.", date: "2023-09-15", author: "John Doe" },
    { id: 402, content: "Follow up regarding pending litigation matter in the next two weeks.", date: "2023-09-10", author: "Maria Garcia" },
    { id: 403, content: "Client requested additional information about tax implications for new business venture.", date: "2023-08-28", author: "James Wilson" },
  ];
  
  // Fetch client data
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    
    // Find client by ID in our sample data
    setTimeout(() => {
      const foundClient = clientData.find(c => c.id === parseInt(clientId, 10));
      
      if (foundClient) {
        setClient(foundClient);
        setMatters(sampleMatters);
        setBillingHistory(sampleBilling);
        setDocuments(sampleDocuments);
        setNotes(sampleNotes);
      } else {
        // Handle client not found
        toast.error("Client not found");
        navigate("/clients");
      }
      
      setLoading(false);
    }, 500); // Simulate network delay
  }, [clientId, navigate]);
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Handle tab change
  const changeTab = (tab) => {
    setActiveTab(tab);
  };
  
  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };
  
  // Handle edit client
  const handleEditClient = () => {
    toast.info(`Editing client ${client.name}`);
  };
  
  // Handle add note
  const handleAddNote = () => {
    if (!newNote.trim()) {
      toast.error("Note cannot be empty");
      return;
    }
    
    const newNoteObj = {
      id: Date.now(),
      content: newNote,
      date: new Date().toISOString().split('T')[0],
      author: "Current User" // In a real app, this would be the logged-in user
    };
    
    setNotes([newNoteObj, ...notes]);
    setNewNote('');
    toast.success("Note added successfully");
  };
  
  // Render status pill
  const renderStatusPill = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      overdue: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || ''}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  if (loading) {
    return (
      <div className="flex min-h-screen bg-surface-50 dark:bg-surface-800 items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-surface-200 dark:bg-surface-700 rounded-full mb-4"></div>
          <div className="h-6 w-32 bg-surface-200 dark:bg-surface-700 rounded-md"></div>
        </div>
      </div>
    );
  }
  
  if (!client) {
    return (
      <div className="flex min-h-screen bg-surface-50 dark:bg-surface-800 items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Client Not Found</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">The client you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/clients')}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl"
          >
            Return to Client Directory
          </button>
        </div>
      </div>
    );
  }
  
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
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/dashboard');
                }}
                className="flex items-center p-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800"
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
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/clients');
                }}
                className="flex items-center p-3 rounded-xl bg-primary bg-opacity-10 text-primary dark:text-primary-light"
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
      <main 
        className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-72'}`}
      >
        {/* Top navigation */}
        <header className="bg-white dark:bg-surface-900 h-16 border-b border-surface-200 dark:border-surface-700 shadow-sm px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-50">Client Profile</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* User avatar */}
            <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center font-medium">
              JD
            </div>
          </div>
        </header>
        
        {/* Client profile content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-6 md:p-8"
        >
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center text-sm text-surface-600 dark:text-surface-400">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/clients');
                  }}
                  className="hover:text-primary"
                >
                  Clients
                </a>
              </li>
              <li className="mx-2">
                <ChevronRightIcon size={16} />
              </li>
              <li className="font-medium text-surface-900 dark:text-surface-50 truncate">
                {client.name}
              </li>
            </ol>
          </nav>
          
          {/* Client header */}
          <div className="bg-white dark:bg-surface-900 rounded-2xl shadow-card p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="h-16 w-16 bg-primary bg-opacity-10 rounded-xl flex items-center justify-center text-primary mr-4">
                  {client.type === 'Individual' ? (
                    <UserIcon size={32} />
                  ) : (
                    <BuildingIcon size={32} />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{client.name}</h1>
                  <div className="flex items-center mt-1">
                    {renderStatusPill(client.status)}
                    <span className="ml-3 text-surface-600 dark:text-surface-400">Client since {formatDate('2022-05-15')}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleEditClient}
                  className="flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl"
                >
                  <EditIcon size={16} className="mr-2" />
                  Edit Client
                </button>
                <button 
                  onClick={() => navigate('/matters/new?client=' + clientId)}
                  className="flex items-center px-4 py-2 bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-900 dark:text-surface-50 rounded-xl"
                >
                  <PlusIcon size={16} className="mr-2" />
                  New Matter
                </button>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-surface-200 dark:border-surface-700 mb-6">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button 
                onClick={() => changeTab('overview')}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'overview' 
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-50'
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => changeTab('matters')}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'matters' 
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-50'
                }`}
              >
                Matters
              </button>
              <button 
                onClick={() => changeTab('billing')}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'billing' 
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-50'
                }`}
              >
                Billing
              </button>
              <button 
                onClick={() => changeTab('documents')}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'documents' 
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-50'
                }`}
              >
                Documents
              </button>
              <button 
                onClick={() => changeTab('notes')}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'notes' 
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-50'
                }`}
              >
                Notes
              </button>
            </div>
          </div>
          
          {/* Tab content */}
          <div className="mb-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contact Information */}
                <div className="bg-white dark:bg-surface-900 rounded-2xl shadow-card p-6 lg:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Name</p>
                      <p className="font-medium">{client.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Contact Person</p>
                      <p className="font-medium">{client.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Email</p>
                      <p className="font-medium">{client.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Phone</p>
                      <p className="font-medium">{client.phone}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-surface-500 dark:text-surface-400">Address</p>
                      <p className="font-medium">{client.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Client Type</p>
                      <p className="font-medium">{client.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Last Contact</p>
                      <p className="font-medium">{formatDate(client.lastContact)}</p>
                    </div>
                  </div>
                </div>
                
                {/* Client Statistics */}
                <div className="bg-white dark:bg-surface-900 rounded-2xl shadow-card p-6">
                  <h3 className="text-lg font-semibold mb-4">Client Summary</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                      <p className="text-sm text-surface-500 dark:text-surface-400">Active Matters</p>
                      <p className="text-2xl font-bold text-primary">{matters.filter(m => m.status === 'active').length}</p>
                    </div>
                    <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                      <p className="text-sm text-surface-500 dark:text-surface-400">Total Billing</p>
                      <p className="text-2xl font-bold text-primary">
                        ${billingHistory.reduce((sum, item) => sum + item.amount, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                      <p className="text-sm text-surface-500 dark:text-surface-400">Documents</p>
                      <p className="text-2xl font-bold text-primary">{documents.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Matters Tab */}
            {activeTab === 'matters' && (
              <div className="bg-white dark:bg-surface-900 rounded-2xl shadow-card overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-surface-200 dark:border-surface-700">
                  <h3 className="text-lg font-semibold">Client Matters</h3>
                  <button 
                    onClick={() => navigate('/matters/new?client=' + clientId)}
                    className="flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl"
                  >
                    <PlusIcon size={16} className="mr-2" />
                    Add Matter
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-surface-50 dark:bg-surface-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Matter Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Start Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Practice Area</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Assigned To</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                      {matters.map(matter => (
                        <tr key={matter.id} className="hover:bg-surface-50 dark:hover:bg-surface-800">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <a 
                              href={`/matters/${matter.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(`/matters/${matter.id}`);
                              }}
                              className="font-medium hover:text-primary transition-colors"
                            >
                              {matter.title}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {renderStatusPill(matter.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-surface-600 dark:text-surface-400">
                            {formatDate(matter.startDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-surface-600 dark:text-surface-400">
                            {matter.practiceArea}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-surface-600 dark:text-surface-400">
                            {matter.assignedTo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <a
                              href={`/matters/${matter.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(`/matters/${matter.id}`);
                              }}
                              className="text-primary hover:text-primary-dark"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      ))}
                      {matters.length === 0 && (
                        <tr>
                          <td colSpan="6" className="px-6 py-8 text-center text-surface-500 dark:text-surface-400">
                            No matters found for this client
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ClientProfile;