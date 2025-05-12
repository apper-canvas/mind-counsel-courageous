import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MatterDetail = () => {
  const { matterId } = useParams();
  const navigate = useNavigate();
  const id = parseInt(matterId, 10);

  // Icons
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const ChevronRightIcon = getIcon('ChevronRight');
  const DownloadIcon = getIcon('Download');
  const EditIcon = getIcon('Edit');
  const TrashIcon = getIcon('Trash');
  const FileIcon = getIcon('File');
  const ClockIcon = getIcon('Clock');
  const DollarIcon = getIcon('DollarSign');
  const MessageIcon = getIcon('MessageSquare');
  const CalendarIcon = getIcon('Calendar');
  const UserIcon = getIcon('User');
  const BuildingIcon = getIcon('Building');
  const PhoneIcon = getIcon('Phone');
  const MailIcon = getIcon('Mail');
  const ClipboardIcon = getIcon('Clipboard');
  const CheckCircleIcon = getIcon('CheckCircle');
  const AlertCircleIcon = getIcon('AlertCircle');
  const LinkIcon = getIcon('Link');
  const PlusIcon = getIcon('Plus');
  const ChevronDownIcon = getIcon('ChevronDown');

  // States
  const [activeTab, setActiveTab] = useState('overview');
  const [matter, setMatter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    client: true,
    contacts: true,
    dates: true
  });

  // Sample data - would be fetched from API in a real application
  const matterData = {
    1: {
      id: 1,
      title: "Hanson v. Smith",
      description: "Litigation case regarding breach of contract between Hanson Inc. and Smith Enterprise LLC.",
      client: {
        name: "Hanson Inc.",
        type: "Corporation",
        industry: "Manufacturing",
        contact: {
          name: "Robert Hanson",
          email: "robert.hanson@example.com",
          phone: "(555) 123-4567"
        },
        address: "123 Corporate Way, Business Park, NY 10001"
      },
      status: "active",
      priority: "high",
      type: "Litigation",
      practice_area: "Commercial Litigation",
      court: "Superior Court",
      case_number: "CL-2023-1234",
      judge: "Hon. Jennifer Martinez",
      opposing_counsel: "Smith & Associates",
      jurisdiction: "New York County",
      filing_date: "2023-07-20",
      trial_date: "2024-03-15",
      hearing_date: "2023-11-10",
      last_updated: "2023-09-15",
      created_date: "2023-07-15",
      assigned_to: {
        primary: "Jane Doe",
        team: ["John Smith", "Alex Rivera"]
      },
      documents: [
        { id: 101, name: "Complaint.pdf", type: "pdf", size: "1.2 MB", uploaded: "2023-07-15", uploaded_by: "Jane Doe" },
        { id: 102, name: "Answer to Complaint.pdf", type: "pdf", size: "875 KB", uploaded: "2023-08-03", uploaded_by: "John Smith" },
        { id: 103, name: "Discovery Request.docx", type: "docx", size: "645 KB", uploaded: "2023-08-15", uploaded_by: "Jane Doe" },
        { id: 104, name: "Deposition Transcript - R. Smith.pdf", type: "pdf", size: "3.1 MB", uploaded: "2023-09-02", uploaded_by: "Alex Rivera" },
        { id: 105, name: "Email Exhibits.zip", type: "zip", size: "4.5 MB", uploaded: "2023-09-10", uploaded_by: "Jane Doe" }
      ],
      billing: {
        billing_type: "Hourly",
        rate: "$350/hour",
        total_hours: 32.5,
        total_billed: "$11,375.00",
        outstanding: "$5,250.00",
        last_invoice: "2023-09-01",
        time_entries: [
          { id: 201, description: "Initial client consultation", date: "2023-07-15", hours: 1.5, amount: "$525.00", billed_by: "Jane Doe" },
          { id: 202, description: "Drafting complaint", date: "2023-07-16", hours: 4.5, amount: "$1,575.00", billed_by: "Jane Doe" },
          { id: 203, description: "Legal research", date: "2023-07-18", hours: 3.0, amount: "$1,050.00", billed_by: "John Smith" },
          { id: 204, description: "Filing preparation", date: "2023-07-19", hours: 2.0, amount: "$700.00", billed_by: "Jane Doe" },
          { id: 205, description: "Review of opposing counsel's answer", date: "2023-08-04", hours: 2.5, amount: "$875.00", billed_by: "Jane Doe" },
          { id: 206, description: "Prepare discovery requests", date: "2023-08-10", hours: 5.0, amount: "$1,750.00", billed_by: "Jane Doe" },
          { id: 207, description: "Deposition preparation", date: "2023-08-25", hours: 6.0, amount: "$2,100.00", billed_by: "Jane Doe" },
          { id: 208, description: "Deposition of R. Smith", date: "2023-09-01", hours: 8.0, amount: "$2,800.00", billed_by: "Alex Rivera" }
        ]
      },
      notes: [
        { id: 301, content: "Client informed of litigation process and expected timeline.", date: "2023-07-15", created_by: "Jane Doe" },
        { id: 302, content: "Discussed settlement options. Client prefers to proceed with litigation at this time.", date: "2023-07-30", created_by: "Jane Doe" },
        { id: 303, content: "Smith's counsel requesting extension for discovery responses. Will discuss with client.", date: "2023-08-20", created_by: "John Smith" },
        { id: 304, content: "Client approved 15-day extension for discovery responses.", date: "2023-08-21", created_by: "Jane Doe" },
        { id: 305, content: "Deposition revealed potential new evidence. Need to follow up with client.", date: "2023-09-02", created_by: "Alex Rivera" }
      ],
      timeline: [
        { id: 401, event: "Case opened", date: "2023-07-15", type: "milestone" },
        { id: 402, event: "Complaint filed", date: "2023-07-20", type: "filing" },
        { id: 403, event: "Complaint served on defendant", date: "2023-07-25", type: "service" },
        { id: 404, event: "Answer to complaint received", date: "2023-08-03", type: "filing" },
        { id: 405, event: "Discovery requests sent", date: "2023-08-15", type: "discovery" },
        { id: 406, event: "Deposition of R. Smith", date: "2023-09-01", type: "deposition" },
        { id: 407, event: "Hearing on Motion to Compel", date: "2023-11-10", type: "hearing", upcoming: true },
        { id: 408, event: "Trial date", date: "2024-03-15", type: "trial", upcoming: true }
      ]
    },
    2: {
      id: 2,
      title: "Johnson Estate Planning",
      description: "Comprehensive estate planning for the Johnson family, including wills, trusts, and power of attorney documents.",
      client: {
        name: "Johnson Family",
        type: "Family",
        contact: {
          name: "Michael Johnson",
          email: "michael.johnson@example.com",
          phone: "(555) 234-5678"
        },
        address: "456 Family Lane, Suburbia, CA 90210"
      },
      status: "pending",
      priority: "medium",
      type: "Estate",
      practice_area: "Estate Planning",
      last_updated: "2023-09-10",
      created_date: "2023-09-05",
      assigned_to: {
        primary: "John Smith",
        team: []
      },
      documents: [
        { id: 106, name: "Client Questionnaire.pdf", type: "pdf", size: "850 KB", uploaded: "2023-09-05", uploaded_by: "John Smith" },
        { id: 107, name: "Asset Inventory.xlsx", type: "xlsx", size: "425 KB", uploaded: "2023-09-08", uploaded_by: "Michael Johnson" }
      ],
      billing: {
        billing_type: "Flat Fee",
        rate: "$5,000.00",
        total_billed: "$2,500.00",
        outstanding: "$2,500.00",
        last_invoice: "2023-09-05",
        time_entries: [
          { id: 209, description: "Initial consultation and planning", date: "2023-09-05", hours: 2.0, amount: "$2,500.00", billed_by: "John Smith" }
        ]
      },
      notes: [
        { id: 306, content: "Client has three adult children and significant real estate holdings.", date: "2023-09-05", created_by: "John Smith" },
        { id: 307, content: "Client concerned about minimizing estate taxes and ensuring fair distribution.", date: "2023-09-05", created_by: "John Smith" }
      ],
      timeline: [
        { id: 409, event: "Matter opened", date: "2023-09-05", type: "milestone" },
        { id: 410, event: "Initial client meeting", date: "2023-09-05", type: "meeting" },
        { id: 411, event: "Draft documents due", date: "2023-09-20", type: "deadline", upcoming: true },
        { id: 412, event: "Document review with client", date: "2023-09-25", type: "meeting", upcoming: true },
        { id: 413, event: "Document signing", date: "2023-10-10", type: "meeting", upcoming: true }
      ]
    }
  };

  // On mount - fetch matter data
  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      if (matterData[id]) {
        setMatter(matterData[id]);
        setLoading(false);
      } else {
        setError("Matter not found");
        setLoading(false);
        toast.error("Matter not found");
      }
    }, 500);
  }, [id]);

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  // Handle file download
  const handleDownload = (file) => {
    toast.success(`Downloading ${file.name}`);
  };

  // Handle document actions
  const handleDocumentAction = (action, document) => {
    switch(action) {
      case 'download':
        toast.success(`Downloading ${document.name}`);
        break;
      case 'delete':
        toast.info(`Delete functionality would be implemented here for ${document.name}`);
        break;
      case 'edit':
        toast.info(`Edit functionality would be implemented here for ${document.name}`);
        break;
      default:
        break;
    }
  };

  // Handle edit matter
  const handleEditMatter = () => {
    toast.info("Edit matter functionality would be implemented here");
  };

  // Handle new note
  const handleNewNote = () => {
    toast.info("New note functionality would be implemented here");
  };

  // Handle new billing entry
  const handleNewBillingEntry = () => {
    toast.info("New billing entry functionality would be implemented here");
  };

  // Handle new document upload
  const handleNewDocument = () => {
    toast.info("New document upload functionality would be implemented here");
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-50 dark:bg-surface-800">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-surface-200 border-t-primary dark:border-surface-700 dark:border-t-primary"></div>
          <p className="mt-4 text-lg text-surface-600 dark:text-surface-400">Loading matter details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-50 dark:bg-surface-800">
        <div className="max-w-md p-8 bg-white dark:bg-surface-900 rounded-2xl shadow-card text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mx-auto flex items-center justify-center mb-4">
            <AlertCircleIcon size={32} className="text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Matter Not Found</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-6">The matter you're looking for doesn't exist or you don't have permission to view it.</p>
          <button 
            onClick={() => navigate('/matters')}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-sm"
          >
            Return to Matters List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface-50 dark:bg-surface-800">
      {/* Sidebar is reused from Home/MattersList components */}
      <motion.aside 
        initial={{ width: sidebarCollapsed ? 80 : 280 }}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3 }}
        className="fixed h-full bg-white dark:bg-surface-900 shadow-soft z-10 overflow-hidden"
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
                onClick={(e) => { e.preventDefault(); navigate('/'); }}
                className="flex items-center p-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <ClipboardIcon className="h-5 w-5" />
                {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
              </a>
            </li>
            <li>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); navigate('/matters'); }}
                className="flex items-center p-3 rounded-xl bg-primary bg-opacity-10 text-primary dark:text-primary-light"
              >
                <FileIcon className="h-5 w-5" />
                {!sidebarCollapsed && <span className="ml-3">Matters</span>}
              </a>
            </li>
            {/* Other menu items would be the same as in Home */}
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
            <button 
              onClick={() => navigate('/matters')}
              className="mr-4 p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
              aria-label="Back to matters"
            >
              <ChevronLeftIcon size={20} />
            </button>
            <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-50">{matter.title}</h2>
            {matter.status && (
              <span className={`ml-4 px-3 py-1 rounded-full text-xs font-medium ${
                matter.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                matter.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
              }`}>
                {matter.status.charAt(0).toUpperCase() + matter.status.slice(1)}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleEditMatter}
              className="p-2 rounded-full text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
              title="Edit matter"
            >
              <EditIcon size={18} />
            </button>
            
            {/* User avatar */}
            <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center font-medium">
              JD
            </div>
          </div>
        </header>
        
        {/* Matter detail content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-6 md:p-8 max-w-7xl mx-auto"
        >
          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left column - Matter summary */}
            <div className="lg:w-1/3 space-y-6">
              {/* Matter details section */}
              <div className="bg-white dark:bg-surface-900 rounded-2xl shadow-card overflow-hidden">
                <div 
                  className="p-4 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection('details')}
                >
                  <h3 className="font-semibold">Matter Details</h3>
                  <ChevronDownIcon className={`transform transition-transform duration-300 ${expandedSections.details ? 'rotate-180' : 'rotate-0'}`} />
                </div>
                
                {expandedSections.details && (
                  <div className="p-6">
                    <div className="mb-6">
                      <p className="text-surface-600 dark:text-surface-400">{matter.description}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-surface-500 dark:text-surface-400">Matter Type</span>
                        <span className="text-sm font-medium">{matter.type}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-surface-500 dark:text-surface-400">Practice Area</span>
                        <span className="text-sm font-medium">{matter.practice_area}</span>
                      </div>
                      
                      {matter.court && (
                        <div className="flex justify-between">
                          <span className="text-sm text-surface-500 dark:text-surface-400">Court</span>
                          <span className="text-sm font-medium">{matter.court}</span>
                        </div>
                      )}
                      
                      {matter.case_number && (
                        <div className="flex justify-between">
                          <span className="text-sm text-surface-500 dark:text-surface-400">Case Number</span>
                          <span className="text-sm font-medium">{matter.case_number}</span>
                        </div>
                      )}
                      
                      {matter.priority && (
                        <div className="flex justify-between">
                          <span className="text-sm text-surface-500 dark:text-surface-400">Priority</span>
                          <span className={`text-sm font-medium ${
                            matter.priority === 'high' ? 'text-red-600 dark:text-red-400' :
                            matter.priority === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                            'text-green-600 dark:text-green-400'
                          }`}>
                            {matter.priority.charAt(0).toUpperCase() + matter.priority.slice(1)}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-surface-500 dark:text-surface-400">Assigned To</span>
                        <span className="text-sm font-medium">{matter.assigned_to.primary}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Client information section */}
              <div className="bg-white dark:bg-surface-900 rounded-2xl shadow-card overflow-hidden">
                <div 
                  className="p-4 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection('client')}
                >
                  <h3 className="font-semibold">Client Information</h3>
                  <ChevronDownIcon className={`transform transition-transform duration-300 ${expandedSections.client ? 'rotate-180' : 'rotate-0'}`} />
                </div>
                
                {expandedSections.client && (
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                        <BuildingIcon className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{matter.client.name}</h4>
                        <p className="text-sm text-surface-500 dark:text-surface-400">{matter.client.type}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mt-6">
                      {matter.client.industry && (
                        <div className="flex justify-between">
                          <span className="text-sm text-surface-500 dark:text-surface-400">Industry</span>
                          <span className="text-sm font-medium">{matter.client.industry}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-surface-500 dark:text-surface-400">Contact</span>
                        <span className="text-sm font-medium">{matter.client.contact.name}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-surface-500 dark:text-surface-400">Phone</span>
                        <span className="text-sm font-medium">{matter.client.contact.phone}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-surface-500 dark:text-surface-400">Email</span>
                        <span className="text-sm font-medium text-primary">{matter.client.contact.email}</span>
                      </div>
                      
                      <div className="pt-4 border-t border-surface-200 dark:border-surface-700">
                        <span className="text-sm text-surface-500 dark:text-surface-400 block mb-2">Address</span>
                        <p className="text-sm">{matter.client.address}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Important dates section */}
              <div className="bg-white dark:bg-surface-900 rounded-2xl shadow-card overflow-hidden">
                <div 
                  className="p-4 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection('dates')}
                >
                  <h3 className="font-semibold">Important Dates</h3>
                  <ChevronDownIcon className={`transform transition-transform duration-300 ${expandedSections.dates ? 'rotate-180' : 'rotate-0'}`} />
                </div>
                
                {expandedSections.dates && (
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-surface-500 dark:text-surface-400">Created</span>
                        <span className="text-sm font-medium">{formatDate(matter.created_date)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-surface-500 dark:text-surface-400">Last Updated</span>
                        <span className="text-sm font-medium">{formatDate(matter.last_updated)}</span>
                      </div>
                      
                      {matter.filing_date && (
                        <div className="flex justify-between">
                          <span className="text-sm text-surface-500 dark:text-surface-400">Filing Date</span>
                          <span className="text-sm font-medium">{formatDate(matter.filing_date)}</span>
                        </div>
                      )}
                      
                      {matter.hearing_date && (
                        <div className="flex justify-between">
                          <span className="text-sm text-surface-500 dark:text-surface-400">Next Hearing</span>
                          <span className="text-sm font-medium text-primary">{formatDate(matter.hearing_date)}</span>
                        </div>
                      )}
                      
                      {matter.trial_date && (
                        <div className="flex justify-between">
                          <span className="text-sm text-surface-500 dark:text-surface-400">Trial Date</span>
                          <span className="text-sm font-medium text-primary">{formatDate(matter.trial_date)}</span>
                        </div>
                      )}
                      
                      {/* Upcoming deadlines from timeline */}
                      {matter.timeline && matter.timeline.some(item => item.upcoming) && (
                        <div className="pt-4 mt-2 border-t border-surface-200 dark:border-surface-700">
                          <h4 className="text-sm font-medium mb-3">Upcoming Deadlines</h4>
                          <div className="space-y-3">
                            {matter.timeline
                              .filter(item => item.upcoming)
                              .sort((a, b) => new Date(a.date) - new Date(b.date))
                              .slice(0, 3)
                              .map(item => (
                                <div key={item.id} className="flex items-center">
                                  <CalendarIcon size={14} className="text-primary mr-2" />
                                  <span className="text-sm">{item.event}: </span>
                                  <span className="text-sm font-medium ml-1">{formatDate(item.date)}</span>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right column - Tabbed content */}
            <div className="lg:w-2/3">
              {/* Tabs */}
              <div className="bg-white dark:bg-surface-900 rounded-t-2xl shadow-sm">
                <div className="border-b border-surface-200 dark:border-surface-700">
                  <nav className="flex overflow-x-auto scrollbar-hide">
                    <button 
                      onClick={() => setActiveTab('overview')}
                      className={`py-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 ${
                        activeTab === 'overview' ? 
                        'border-primary text-primary dark:text-primary-light' : 
                        'border-transparent text-surface-500 hover:text-surface-900 dark:hover:text-surface-100'
                      }`}
                    >
                      Overview
                    </button>
                    <button 
                      onClick={() => setActiveTab('documents')}
                      className={`py-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 ${
                        activeTab === 'documents' ? 
                        'border-primary text-primary dark:text-primary-light' : 
                        'border-transparent text-surface-500 hover:text-surface-900 dark:hover:text-surface-100'
                      }`}
                    >
                      Documents ({matter.documents?.length || 0})
                    </button>
                    <button 
                      onClick={() => setActiveTab('billing')}
                      className={`py-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 ${
                        activeTab === 'billing' ? 
                        'border-primary text-primary dark:text-primary-light' : 
                        'border-transparent text-surface-500 hover:text-surface-900 dark:hover:text-surface-100'
                      }`}
                    >
                      Billing & Time
                    </button>
                    <button 
                      onClick={() => setActiveTab('notes')}
                      className={`py-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 ${
                        activeTab === 'notes' ? 
                        'border-primary text-primary dark:text-primary-light' : 
                        'border-transparent text-surface-500 hover:text-surface-900 dark:hover:text-surface-100'
                      }`}
                    >
                      Notes ({matter.notes?.length || 0})
                    </button>
                    <button 
                      onClick={() => setActiveTab('timeline')}
                      className={`py-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 ${
                        activeTab === 'timeline' ? 
                        'border-primary text-primary dark:text-primary-light' : 
                        'border-transparent text-surface-500 hover:text-surface-900 dark:hover:text-surface-100'
                      }`}
                    >
                      Timeline
                    </button>
                  </nav>
                </div>
                
                {/* Tab content */}
                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Matter Overview</h3>
                      <p className="text-surface-600 dark:text-surface-400 mb-6">{matter.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-surface-50 dark:bg-surface-800 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center mb-2">
                            <FileIcon size={16} className="text-primary mr-2" />
                            <h4 className="font-medium">Matter Details</h4>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-surface-500">Type:</span>
                              <span className="text-sm">{matter.type}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-surface-500">Practice Area:</span>
                              <span className="text-sm">{matter.practice_area}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-surface-500">Status:</span>
                              <span className="text-sm">{matter.status.charAt(0).toUpperCase() + matter.status.slice(1)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-surface-500">Priority:</span>
                              <span className="text-sm">{matter.priority ? matter.priority.charAt(0).toUpperCase() + matter.priority.slice(1) : 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-surface-50 dark:bg-surface-800 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center mb-2">
                            <UserIcon size={16} className="text-primary mr-2" />
                            <h4 className="font-medium">People</h4>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-surface-500">Primary Attorney:</span>
                              <span className="text-sm">{matter.assigned_to.primary}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-surface-500">Client:</span>
                              <span className="text-sm">{matter.client.name}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-surface-500">Client Contact:</span>
                              <span className="text-sm">{matter.client.contact.name}</span>
                            </div>
                            {matter.opposing_counsel && (
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-surface-500">Opposing Counsel:</span>
                                <span className="text-sm">{matter.opposing_counsel}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Recent Activity */}
                      <h4 className="text-md font-semibold mb-3">Recent Activity</h4>
                      <div className="space-y-4">
                        {matter.timeline && [...matter.timeline]
                          .sort((a, b) => new Date(b.date) - new Date(a.date))
                          .slice(0, 3)
                          .map(event => (
                            <div key={event.id} className="bg-white dark:bg-surface-900 p-4 rounded-xl border border-surface-200 dark:border-surface-700">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <CalendarIcon size={16} className="text-primary mr-2" />
                                  <span className="font-medium">{event.event}</span>
                                </div>
                                <span className="text-sm text-surface-500 dark:text-surface-400">{formatDate(event.date)}</span>
                              </div>
                            </div>
                          ))
                        }
                        
                        {matter.notes && [...matter.notes]
                          .sort((a, b) => new Date(b.date) - new Date(a.date))
                          .slice(0, 2)
                          .map(note => (
                            <div key={note.id} className="bg-white dark:bg-surface-900 p-4 rounded-xl border border-surface-200 dark:border-surface-700">
                              <div className="flex items-start">
                                <MessageIcon size={16} className="text-primary mr-2 mt-1" />
                                <div>
                                  <p className="mb-2">{note.content}</p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-surface-500 dark:text-surface-400">By {note.created_by}</span>
                                    <span className="text-sm text-surface-500 dark:text-surface-400">{formatDate(note.date)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )}
                  
                  {/* Documents Tab */}
                  {activeTab === 'documents' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold">Documents</h3>
                        <button 
                          onClick={handleNewDocument}
                          className="px-3 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-sm flex items-center text-sm"
                        >
                          <PlusIcon size={16} className="mr-2" />
                          <span>Upload Document</span>
                        </button>
                      </div>
                      
                      {matter.documents && matter.documents.length > 0 ? (
                        <div className="space-y-4">
                          {matter.documents.map(doc => (
                            <div 
                              key={doc.id} 
                              className="bg-white dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-700 p-4 flex items-center justify-between hover:shadow-soft transition-shadow"
                            >
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-surface-100 dark:bg-surface-800 rounded flex items-center justify-center mr-4">
                                  <FileIcon className="text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{doc.name}</h4>
                                  <p className="text-sm text-surface-500 dark:text-surface-400">
                                    {doc.size} • Uploaded {formatDate(doc.uploaded)} by {doc.uploaded_by}
                                  </p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => handleDocumentAction('download', doc)}
                                  className="p-2 text-surface-500 hover:text-primary rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
                                  title="Download"
                                >
                                  <DownloadIcon size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDocumentAction('edit', doc)}
                                  className="p-2 text-surface-500 hover:text-primary rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
                                  title="Edit metadata"
                                >
                                  <EditIcon size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDocumentAction('delete', doc)}
                                  className="p-2 text-surface-500 hover:text-red-500 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
                                  title="Delete"
                                >
                                  <TrashIcon size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-surface-50 dark:bg-surface-800 rounded-xl p-8 text-center">
                          <div className="w-16 h-16 bg-surface-100 dark:bg-surface-700 rounded-full mx-auto flex items-center justify-center mb-4">
                            <FileIcon size={24} className="text-surface-400" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">No documents</h3>
                          <p className="text-surface-500 dark:text-surface-400 mb-6">Upload documents for this matter</p>
                          <button 
                            onClick={handleNewDocument}
                            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl"
                          >
                            Upload Document
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Billing Tab */}
                  {activeTab === 'billing' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold">Billing & Time</h3>
                        <button 
                          onClick={handleNewBillingEntry}
                          className="px-3 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-sm flex items-center text-sm"
                        >
                          <PlusIcon size={16} className="mr-2" />
                          <span>New Time Entry</span>
                        </button>
                      </div>
                      
                      {/* Billing summary */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white dark:bg-surface-900 rounded-xl p-4 border border-surface-200 dark:border-surface-700">
                          <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Total Billed</div>
                          <div className="text-xl font-semibold">{matter.billing?.total_billed || '$0.00'}</div>
                          <div className="text-sm mt-2">{matter.billing?.billing_type || 'Hourly'}</div>
                        </div>
                        
                        <div className="bg-white dark:bg-surface-900 rounded-xl p-4 border border-surface-200 dark:border-surface-700">
                          <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Outstanding</div>
                          <div className="text-xl font-semibold">{matter.billing?.outstanding || '$0.00'}</div>
                          <div className="text-sm mt-2">Last Invoice: {formatDate(matter.billing?.last_invoice || '')}</div>
                        </div>
                        
                        <div className="bg-white dark:bg-surface-900 rounded-xl p-4 border border-surface-200 dark:border-surface-700">
                          <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Hours Worked</div>
                          <div className="text-xl font-semibold">{matter.billing?.total_hours || '0'}</div>
                          <div className="text-sm mt-2">Rate: {matter.billing?.rate || '$0'}</div>
                        </div>
                      </div>
                      
                      {/* Time entries */}
                      {matter.billing?.time_entries && matter.billing.time_entries.length > 0 ? (
                        <div className="bg-white dark:bg-surface-900 rounded-xl overflow-hidden shadow-card">
                          <table className="w-full">
                            <thead className="bg-surface-50 dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700">
                              <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-surface-700 dark:text-surface-300">Description</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-surface-700 dark:text-surface-300">Date</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-surface-700 dark:text-surface-300">Hours</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-surface-700 dark:text-surface-300">Amount</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-surface-700 dark:text-surface-300">Billed By</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                              {matter.billing.time_entries.map(entry => (
                                <tr key={entry.id} className="hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                                  <td className="px-6 py-4">{entry.description}</td>
                                  <td className="px-6 py-4 text-surface-700 dark:text-surface-300">{formatDate(entry.date)}</td>
                                  <td className="px-6 py-4 text-surface-700 dark:text-surface-300">{entry.hours}</td>
                                  <td className="px-6 py-4 font-medium">{entry.amount}</td>
                                  <td className="px-6 py-4 text-surface-700 dark:text-surface-300">{entry.billed_by}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="bg-surface-50 dark:bg-surface-800 rounded-xl p-8 text-center">
                          <div className="w-16 h-16 bg-surface-100 dark:bg-surface-700 rounded-full mx-auto flex items-center justify-center mb-4">
                            <ClockIcon size={24} className="text-surface-400" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">No time entries</h3>
                          <p className="text-surface-500 dark:text-surface-400 mb-6">Add time entries to track billable hours</p>
                          <button 
                            onClick={handleNewBillingEntry}
                            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl"
                          >
                            Add Time Entry
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Notes Tab */}
                  {activeTab === 'notes' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold">Notes</h3>
                        <button 
                          onClick={handleNewNote}
                          className="px-3 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-sm flex items-center text-sm"
                        >
                          <PlusIcon size={16} className="mr-2" />
                          <span>Add Note</span>
                        </button>
                      </div>
                      
                      {matter.notes && matter.notes.length > 0 ? (
                        <div className="space-y-4">
                          {matter.notes.map(note => (
                            <div 
                              key={note.id} 
                              className="bg-white dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-700 p-5 hover:shadow-soft transition-shadow"
                            >
                              <p className="mb-4">{note.content}</p>
                              <div className="flex items-center justify-between pt-3 border-t border-surface-200 dark:border-surface-700">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3">
                                    <UserIcon size={14} className="text-primary" />
                                  </div>
                                  <span className="text-sm font-medium">{note.created_by}</span>
                                </div>
                                <span className="text-sm text-surface-500 dark:text-surface-400">{formatDate(note.date)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-surface-50 dark:bg-surface-800 rounded-xl p-8 text-center">
                          <div className="w-16 h-16 bg-surface-100 dark:bg-surface-700 rounded-full mx-auto flex items-center justify-center mb-4">
                            <MessageIcon size={24} className="text-surface-400" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">No notes</h3>
                          <p className="text-surface-500 dark:text-surface-400 mb-6">Add notes to keep track of important details</p>
                          <button 
                            onClick={handleNewNote}
                            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl"
                          >
                            Add Note
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Timeline Tab */}
                  {activeTab === 'timeline' && (
                    <div>
                      <h3 className="text-lg font-semibold mb-6">Timeline</h3>
                      
                      {matter.timeline && matter.timeline.length > 0 ? (
                        <div className="relative pl-8 before:absolute before:left-3 before:top-0 before:h-full before:w-0.5 before:bg-surface-200 dark:before:bg-surface-700">
                          {[...matter.timeline]
                            .sort((a, b) => new Date(a.date) - new Date(b.date))
                            .map((event, index) => (
                              <div 
                                key={event.id} 
                                className={`relative mb-6 ${event.upcoming ? 'opacity-70' : ''}`}
                              >
                                <div className="absolute -left-8 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                                  <CheckCircleIcon size={12} className="text-white" />
                                </div>
                                <div className="bg-white dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-700 p-4 shadow-sm">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium">{event.event}</h4>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      event.upcoming ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    }`}>
                                      {event.type}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <CalendarIcon size={14} className="text-surface-400 mr-2" />
                                    <span className="text-sm text-surface-600 dark:text-surface-400">{formatDate(event.date)}</span>
                                  </div>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      ) : (
                        <div className="bg-surface-50 dark:bg-surface-800 rounded-xl p-8 text-center">
                          <div className="w-16 h-16 bg-surface-100 dark:bg-surface-700 rounded-full mx-auto flex items-center justify-center mb-4">
                            <CalendarIcon size={24} className="text-surface-400" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">No timeline events</h3>
                          <p className="text-surface-500 dark:text-surface-400">Create events to track matter progress</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default MatterDetail;