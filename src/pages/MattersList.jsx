import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

const MattersList = () => {
  const navigate = useNavigate();
  
  // Icons
  const SearchIcon = getIcon('Search');
  const FilterIcon = getIcon('Filter');
  const HomeIcon = getIcon('Home');
  const PlusIcon = getIcon('Plus');
  const ListIcon = getIcon('List');
  const GridIcon = getIcon('Grid');
  const ArrowUpIcon = getIcon('ArrowUp');
  const ArrowDownIcon = getIcon('ArrowDown');
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const ChevronRightIcon = getIcon('ChevronRight');
  const SlashIcon = getIcon('Slash');
  const TrashIcon = getIcon('Trash');
  const DownloadIcon = getIcon('Download');
  const CheckCircleIcon = getIcon('CheckCircle');
  const UserIcon = getIcon('User');
  const UsersIcon = getIcon('Users');
  const ClockIcon = getIcon('Clock');
  const SettingsIcon = getIcon('Settings');
  const CalendarIcon = getIcon('Calendar');
  const FolderIcon = getIcon('Folder');
  const MoreHorizontalIcon = getIcon('MoreHorizontal');
  const EditIcon = getIcon('Edit');
  
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [viewMode, setViewMode] = useState('table');
  const [selectedMatters, setSelectedMatters] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal states
  const [showNewMatterModal, setShowNewMatterModal] = useState(false);
  const [showEditMatterModal, setShowEditMatterModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(null);
  const [currentMatter, setCurrentMatter] = useState(null);
  
  // Form state
  const initialFormState = {
    title: '',
    client: '',
    type: '',
    court: '',
    status: 'pending',
    assignedTo: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});
  
  // Handle form change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for the field being edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.client.trim()) errors.client = 'Client is required';
    if (!formData.type.trim()) errors.type = 'Type is required';
    if (!formData.assignedTo.trim()) errors.assignedTo = 'Assignment is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Reset form
  const resetForm = () => {
    setFormData(initialFormState);
    setFormErrors({});
  };
  
  // Sample data
  const initialMatters = [
    { id: 1, title: "Hanson v. Smith", client: "Hanson Inc.", status: "active", type: "Litigation", court: "Superior Court", lastUpdated: "2023-09-15", assignedTo: "Jane Doe" },
    { id: 2, title: "Johnson Estate Planning", client: "Johnson Family", status: "pending", type: "Estate", court: "", lastUpdated: "2023-09-10", assignedTo: "John Smith" },
    { id: 3, title: "TechCorp Acquisition", client: "TechCorp LLC", status: "active", type: "Corporate", court: "", lastUpdated: "2023-09-08", assignedTo: "Alex Rivera" },
    { id: 4, title: "Davidson Divorce", client: "Thomas Davidson", status: "closed", type: "Family", court: "Family Court", lastUpdated: "2023-08-30", assignedTo: "Sarah Johnson" },
    { id: 5, title: "Medtech Patent Dispute", client: "Medtech Inc.", status: "active", type: "Intellectual Property", court: "Federal Circuit", lastUpdated: "2023-09-12", assignedTo: "Jane Doe" },
    { id: 6, title: "GreenEnergy Compliance", client: "GreenEnergy Co.", status: "pending", type: "Regulatory", court: "", lastUpdated: "2023-09-05", assignedTo: "Michael Chen" },
    { id: 7, title: "Rivera Bankruptcy", client: "Maria Rivera", status: "active", type: "Bankruptcy", court: "Bankruptcy Court", lastUpdated: "2023-09-03", assignedTo: "John Smith" },
    { id: 8, title: "Downtown Property Acquisition", client: "City Development LLC", status: "closed", type: "Real Estate", court: "", lastUpdated: "2023-08-20", assignedTo: "Alex Rivera" },
    { id: 9, title: "Thompson Healthcare Compliance", client: "Thompson Health", status: "active", type: "Healthcare", court: "", lastUpdated: "2023-09-01", assignedTo: "Sarah Johnson" },
    { id: 10, title: "Jackson Labor Dispute", client: "Jackson Manufacturing", status: "pending", type: "Labor", court: "Labor Court", lastUpdated: "2023-08-28", assignedTo: "Michael Chen" },
    { id: 11, title: "Smith v. Johnson", client: "Smith Family", status: "active", type: "Litigation", court: "District Court", lastUpdated: "2023-09-07", assignedTo: "Jane Doe" },
    { id: 12, title: "BlueOcean Merger Review", client: "BlueOcean Inc.", status: "pending", type: "Corporate", court: "", lastUpdated: "2023-09-14", assignedTo: "Alex Rivera" },
  ];
  
  const [matters, setMatters] = useState(initialMatters);
  
  // Filter types and statuses derived from data
  const matterTypes = [...new Set(initialMatters.map(matter => matter.type))];
  const matterStatuses = [...new Set(initialMatters.map(matter => matter.status))];
  
  // Effect to filter and sort matters
  useEffect(() => {
    let filtered = [...initialMatters];
    
    // Filter by search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(matter => 
        matter.title.toLowerCase().includes(search) || 
        matter.client.toLowerCase().includes(search) ||
        matter.assignedTo.toLowerCase().includes(search)
      );
    }
    
    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(matter => matter.status === selectedStatus);
    }
    
    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(matter => matter.type === selectedType);
    }
    
    // Sort
    filtered.sort((a, b) => {
      const aValue = a[sortField]?.toLowerCase() || '';
      const bValue = b[sortField]?.toLowerCase() || '';
      
      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
    
    setMatters(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, selectedType, sortField, sortDirection]);
  
  // Handle status filters
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setShowFilterMenu(false);
  };
  
  // Handle type filters
  const handleTypeChange = (type) => {
    setSelectedType(type);
    setShowFilterMenu(false);
  };
  
  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Handle matter selection
  const toggleMatterSelection = (matterId) => {
    if (selectedMatters.includes(matterId)) {
      setSelectedMatters(selectedMatters.filter(id => id !== matterId));
    } else {
      setSelectedMatters([...selectedMatters, matterId]);
    }
  };
  
  // Handle select all
  const handleSelectAll = () => {
    if (selectedMatters.length === matters.length) {
      setSelectedMatters([]);
    } else {
      setSelectedMatters(matters.map(matter => matter.id));
    }
  };
  
  // Handle batch actions
  const handleBatchAction = (action) => {
    if (selectedMatters.length === 0) {
      toast.error('No matters selected');
      return;
    }
    
    switch(action) {
      case 'delete':
        setShowDeleteConfirmation(true);
        break;
      case 'export':
        // Simulate export functionality
        setTimeout(() => {
          toast.success(`${selectedMatters.length} matters exported successfully`);
          setSelectedMatters([]);
        }, 1000);
        break;
      case 'status':
        // Simulate status change
        const newStatus = 'active';
        const updatedMatters = matters.map(matter => 
          selectedMatters.includes(matter.id) 
            ? {...matter, status: newStatus} 
            : matter
        );
        setMatters(updatedMatters);
        toast.success(`Status changed to '${newStatus}' for ${selectedMatters.length} matters`);
        setSelectedMatters([]);
        break;
      default:
        break;
    }
  };
  
  // Handle delete confirmation
  const confirmDelete = () => {
    // Delete the selected matters
    const mattersToDelete = selectedMatters;
    const updatedMatters = matters.filter(matter => !mattersToDelete.includes(matter.id));
    setMatters(updatedMatters);
    toast.success(`${selectedMatters.length} matters deleted successfully`);
    setSelectedMatters([]);
    setShowDeleteConfirmation(false);
  };
  
  // Handle more menu click
  const handleMoreClick = (matterId, event) => {
    event.stopPropagation();
    setShowMoreMenu(showMoreMenu === matterId ? null : matterId);
  };
  
  // Handle more menu actions
  const handleMoreAction = (action, matter) => {
    setShowMoreMenu(null);
    // Clear selection after action
    setSelectedMatters([]);
  };
  
  // Handle create matter
  const handleCreateMatter = () => {
    resetForm();
    setShowNewMatterModal(true);
  };
  
  // Handle edit matter
  const handleEditMatter = (matter, event) => {
    if (event) event.stopPropagation();
    setCurrentMatter(matter);
    setFormData({
      title: matter.title,
      client: matter.client,
      type: matter.type,
      court: matter.court || '',
      status: matter.status,
      assignedTo: matter.assignedTo
    });
    setShowEditMatterModal(true);
    setShowMoreMenu(null);
  };
  
  // Handle form submission
  const handleSubmitForm = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (showNewMatterModal) {
        // Create new matter
        const newMatter = {
          id: matters.length + 1,
          ...formData,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        setMatters([...matters, newMatter]);
        toast.success('New matter created successfully');
        setShowNewMatterModal(false);
        resetForm();
      }
    }
  };
  
  // Handle sidebar toggle
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Pagination
  const totalPages = Math.ceil(matters.length / itemsPerPage);
  const paginatedMatters = matters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Render status pill
  const renderStatusPill = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      closed: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || ''}`}>
        {status}
      </span>
    );
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
  
  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <div className="flex min-h-screen bg-surface-50 dark:bg-surface-800">
      {/* Sidebar is reused from Home component */}
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
                  // Stay on current page, just prevent default navigation
                }}
                className="flex items-center p-3 rounded-xl bg-primary bg-opacity-10 text-primary dark:text-primary-light"
              >
                <ListIcon className="h-5 w-5" />
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
      <main 
        className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-72'}`}
      >
        {/* Top navigation */}
        <header className="bg-white dark:bg-surface-900 h-16 border-b border-surface-200 dark:border-surface-700 shadow-sm px-6 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-50">Matters</h2>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search matters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl bg-surface-100 dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <SearchIcon className="absolute left-3 top-2.5 text-surface-400" size={18} />
            </div>
            
            {/* User avatar from Home component */}
            <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center font-medium">
              JD
            </div>
          </div>
        </header>
        
        {/* Matter list content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-6 md:p-8"
        >
          {/* Action bar */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowFilterMenu(!showFilterMenu)} 
                className="px-4 py-2 bg-white dark:bg-surface-900 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700 flex items-center"
              >
                <FilterIcon size={16} className="mr-2" />
                <span>Filter</span>
              </button>
              
              <div className="flex items-center space-x-2 text-sm">
                <button 
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-primary text-white' : 'bg-white dark:bg-surface-900 text-surface-600 dark:text-surface-400 border border-surface-200 dark:border-surface-700'}`}
                >
                  <ListIcon size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white dark:bg-surface-900 text-surface-600 dark:text-surface-400 border border-surface-200 dark:border-surface-700'}`}
                >
                  <GridIcon size={16} />
                </button>
              </div>
              
              {selectedMatters.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-surface-600 dark:text-surface-400">{selectedMatters.length} selected</span>
                  <button 
                    onClick={() => handleBatchAction('delete')}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <TrashIcon size={16} />
                  </button>
                  <button 
                    onClick={() => handleBatchAction('export')}
                    className="p-2 rounded-lg text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
                  >
                    <DownloadIcon size={16} />
                  </button>
                </div>
              )}
            </div>
            
            <button 
              onClick={handleCreateMatter}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-sm flex items-center justify-center ml-auto"
            >
              <PlusIcon size={16} className="mr-2" />
              <span>New Matter</span>
            </button>
          </div>

          {/* New Matter Modal */}
          {showNewMatterModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Create New Matter</h3>
                  <button 
                    onClick={() => setShowNewMatterModal(false)}
                    className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
                  >
                    <SlashIcon size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleSubmitForm}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Matter Title</label>
                      <input 
                        type="text" 
                        name="title"
                        value={formData.title}
                        onChange={handleFormChange}
                        className={`w-full p-2 border rounded-xl ${formErrors.title ? 'border-red-500' : 'border-surface-300 dark:border-surface-600'}`}
                        placeholder="Enter matter title"
                      />
                      {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Client</label>
                      <input 
                        type="text" 
                        name="client"
                        value={formData.client}
                        onChange={handleFormChange}
                        className={`w-full p-2 border rounded-xl ${formErrors.client ? 'border-red-500' : 'border-surface-300 dark:border-surface-600'}`}
                        placeholder="Enter client name"
                      />
                      {formErrors.client && <p className="text-red-500 text-xs mt-1">{formErrors.client}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Type</label>
                      <select 
                        name="type"
                        value={formData.type}
                        onChange={handleFormChange}
                        className={`w-full p-2 border rounded-xl ${formErrors.type ? 'border-red-500' : 'border-surface-300 dark:border-surface-600'}`}
                      >
                        <option value="">Select type</option>
                        {matterTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {formErrors.type && <p className="text-red-500 text-xs mt-1">{formErrors.type}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Court (Optional)</label>
                      <input 
                        type="text" 
                        name="court"
                        value={formData.court}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-surface-300 dark:border-surface-600 rounded-xl"
                        placeholder="Enter court name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Status</label>
                      <select 
                        name="status"
                        value={formData.status}
                        onChange={handleFormChange}
                        className="w-full p-2 border border-surface-300 dark:border-surface-600 rounded-xl"
                      >
                        {matterStatuses.map(status => (
                          <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Assigned To</label>
                      <input 
                        type="text" 
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleFormChange}
                        className={`w-full p-2 border rounded-xl ${formErrors.assignedTo ? 'border-red-500' : 'border-surface-300 dark:border-surface-600'}`}
                        placeholder="Enter attorney name"
                      />
                      {formErrors.assignedTo && <p className="text-red-500 text-xs mt-1">{formErrors.assignedTo}</p>}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-6">
                    <button 
                      type="button"
                      onClick={() => setShowNewMatterModal(false)}
                      className="px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl"
                    >
                      Create Matter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Edit Matter Modal */}
          {showEditMatterModal && currentMatter && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Edit Matter</h3>
                  <button 
                    onClick={() => setShowEditMatterModal(false)}
                    className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
                  >
                    <SlashIcon size={20} />
                  </button>
                </div>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (validateForm()) {
                    // Update the matter
                    const updatedMatters = matters.map(m => 
                      m.id === currentMatter.id ? 
                      {...m, ...formData, lastUpdated: new Date().toISOString().split('T')[0]} : 
                      m
                    );
                    setMatters(updatedMatters);
                    toast.success('Matter updated successfully');
                    setShowEditMatterModal(false);
                  }
                }}>
                  {/* Same form fields as New Matter Modal */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Matter Title</label>
                      <input 
                        type="text" 
                        name="title"
                        value={formData.title}
                        onChange={handleFormChange}
                        className={`w-full p-2 border rounded-xl ${formErrors.title ? 'border-red-500' : 'border-surface-300 dark:border-surface-600'}`}
                        placeholder="Enter matter title"
                      />
                      {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
                    </div>
                    
                    {/* Additional form fields would be repeated here */}
                    {/* ... */}
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-6">
                    <button 
                      type="button"
                      onClick={() => setShowEditMatterModal(false)}
                      className="px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl"
                    >
                      Update Matter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Filter dropdown */}
          {showFilterMenu && (
            <div className="mb-6 p-4 bg-white dark:bg-surface-900 rounded-xl shadow-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Status</h4>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => handleStatusChange('all')}
                      className={`px-3 py-1 text-sm rounded-lg ${selectedStatus === 'all' ? 'bg-primary text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'}`}
                    >
                      All
                    </button>
                    {matterStatuses.map(status => (
                      <button 
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`px-3 py-1 text-sm rounded-lg ${selectedStatus === status ? 'bg-primary text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'}`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Type</h4>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => handleTypeChange('all')}
                      className={`px-3 py-1 text-sm rounded-lg ${selectedType === 'all' ? 'bg-primary text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'}`}
                    >
                      All
                    </button>
                    {matterTypes.map(type => (
                      <button 
                        key={type}
                        onClick={() => handleTypeChange(type)}
                        className={`px-3 py-1 text-sm rounded-lg ${selectedType === type ? 'bg-primary text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Table view */}
          {viewMode === 'table' && (
            <div className="bg-white dark:bg-surface-900 rounded-2xl overflow-hidden shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface-50 dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            checked={selectedMatters.length === matters.length && matters.length > 0}
                            onChange={handleSelectAll}
                            className="mr-3 h-4 w-4 rounded border-surface-300 text-primary focus:ring-primary"
                          />
                          <button 
                            onClick={() => handleSort('title')}
                            className="group flex items-center font-medium text-sm text-surface-700 dark:text-surface-300"
                          >
                            Matter
                            {sortField === 'title' && (
                              sortDirection === 'asc' ? 
                              <ArrowUpIcon size={14} className="ml-1" /> : 
                              <ArrowDownIcon size={14} className="ml-1" />
                            )}
                          </button>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <button 
                          onClick={() => handleSort('client')}
                          className="group flex items-center font-medium text-sm text-surface-700 dark:text-surface-300"
                        >
                          Client
                          {sortField === 'client' && (
                            sortDirection === 'asc' ? 
                            <ArrowUpIcon size={14} className="ml-1" /> : 
                            <ArrowDownIcon size={14} className="ml-1" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <span className="font-medium text-sm text-surface-700 dark:text-surface-300">Status</span>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <button 
                          onClick={() => handleSort('type')}
                          className="group flex items-center font-medium text-sm text-surface-700 dark:text-surface-300"
                        >
                          Type
                          {sortField === 'type' && (
                            sortDirection === 'asc' ? 
                            <ArrowUpIcon size={14} className="ml-1" /> : 
                            <ArrowDownIcon size={14} className="ml-1" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <button 
                          onClick={() => handleSort('lastUpdated')}
                          className="group flex items-center font-medium text-sm text-surface-700 dark:text-surface-300"
                        >
                          Last Updated
                          {sortField === 'lastUpdated' && (
                            sortDirection === 'asc' ? 
                            <ArrowUpIcon size={14} className="ml-1" /> : 
                            <ArrowDownIcon size={14} className="ml-1" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <span className="font-medium text-sm text-surface-700 dark:text-surface-300">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                    {paginatedMatters.map(matter => (
                      <tr 
                        key={matter.id}
                        className="hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              checked={selectedMatters.includes(matter.id)}
                              onChange={() => toggleMatterSelection(matter.id)}
                              className="mr-3 h-4 w-4 rounded border-surface-300 text-primary focus:ring-primary"
                            />
                            <span 
                              className="font-medium cursor-pointer hover:text-primary"
                              onClick={() => navigate(`/matters/${matter.id}`)}
                            >
                              {matter.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-surface-700 dark:text-surface-300">{matter.client}</td>
                        <td className="px-6 py-4">{renderStatusPill(matter.status)}</td>
                        <td className="px-6 py-4 text-surface-700 dark:text-surface-300">{matter.type}</td>
                        <td className="px-6 py-4 text-surface-700 dark:text-surface-300">{formatDate(matter.lastUpdated)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => navigate(`/matters/${matter.id}`)}
                              className="p-1 text-surface-400 hover:text-primary rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
                              title="View matter details"
                            >
                              <UserIcon size={16} />
                            </button>
                            <button 
                              className="p-1 text-surface-400 hover:text-primary rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                              title="Edit matter"
                              onClick={(e) => handleEditMatter(matter, e)}
                            >
                              <EditIcon size={16} />
                            </button>
                            <div className="relative">
                              <button 
                                onClick={(e) => handleMoreClick(matter.id, e)}
                                className="p-1 text-surface-400 hover:text-primary rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                title="More options"
                              >
                                <MoreHorizontalIcon size={16} />
                              </button>
                              
                              {/* Dropdown menu */}
                              {showMoreMenu === matter.id && (
                                <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-surface-800 rounded-xl shadow-card border border-surface-200 dark:border-surface-700 z-10">
                                  <ul className="py-1">
                                    <li>
                                      <button
                                        onClick={() => {
                                          setCurrentMatter(matter);
                                          setShowMoreMenu(null);
                                          toast.success(`Matter ${matter.title} duplicated`);
                                          // Duplicate logic would go here
                                        }}
                                        className="w-full text-left px-4 py-2 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                                      >
                                        Duplicate
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        onClick={() => {
                                          toast.success(`Matter ${matter.title} archived`);
                                          setShowMoreMenu(null);
                                          // Archive logic would go here
                                        }}
                                        className="w-full text-left px-4 py-2 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                                      >
                                        Archive
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        onClick={() => {
                                          setShowMoreMenu(null);
                                          // Set selected matter and trigger single delete
                                          setSelectedMatters([matter.id]);
                                          setShowDeleteConfirmation(true);
                                        }}
                                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                      >
                                        Delete
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Delete Confirmation Modal */}
              {showDeleteConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 w-full max-w-md shadow-xl">
                    <div className="text-center mb-5">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full mx-auto flex items-center justify-center mb-4">
                        <TrashIcon size={24} className="text-red-600 dark:text-red-400" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Delete {selectedMatters.length > 1 ? 'Matters' : 'Matter'}</h3>
                      <p className="text-surface-600 dark:text-surface-400">
                        Are you sure you want to delete {selectedMatters.length > 1 ? `these ${selectedMatters.length} matters` : 'this matter'}? This action cannot be undone.
                      </p>
                    </div>
                    
                    <div className="flex justify-center space-x-3">
                      <button 
                        onClick={() => setShowDeleteConfirmation(false)}
                        className="px-4 py-2 border border-surface-300 dark:border-surface-600 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={confirmDelete}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Pagination */}
              {matters.length > itemsPerPage && (
                <div className="px-6 py-4 bg-surface-50 dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 flex items-center justify-between">
                  <div className="text-sm text-surface-600 dark:text-surface-400">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, matters.length)} of {matters.length} matters
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setCurrentPage(curr => Math.max(curr - 1, 1))}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg ${currentPage === 1 ? 'text-surface-400 cursor-not-allowed' : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                    >
                      <ChevronLeftIcon size={16} />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 rounded-lg ${currentPage === i + 1 ? 'bg-primary text-white' : 'bg-white dark:bg-surface-900 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button 
                      onClick={() => setCurrentPage(curr => Math.min(curr + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-surface-400 cursor-not-allowed' : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'}`}
                    >
                      <ChevronRightIcon size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Grid view */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedMatters.map(matter => (
                <div 
                  key={matter.id}
                  className="bg-white dark:bg-surface-900 rounded-2xl shadow-card overflow-hidden hover:shadow-soft transition-shadow"
                >
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => navigate(`/matters/${matter.id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold">{matter.title}</h3>
                      {renderStatusPill(matter.status)}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <UserIcon size={16} className="mr-2 text-surface-400" />
                        <span className="text-surface-600 dark:text-surface-400">Client: {matter.client}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FolderIcon size={16} className="mr-2 text-surface-400" />
                        <span className="text-surface-600 dark:text-surface-400">Type: {matter.type}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CalendarIcon size={16} className="mr-2 text-surface-400" />
                        <span className="text-surface-600 dark:text-surface-400">Updated: {formatDate(matter.lastUpdated)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-surface-200 dark:border-surface-700">
                      <span className="text-sm text-surface-500 dark:text-surface-400">Assigned to: {matter.assignedTo}</span>
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditMatter(matter, e);
                          }}
                          className="p-1 text-surface-500 hover:text-primary rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
                          title="Edit matter"
                        >
                          <EditIcon size={16} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoreClick(matter.id, e);
                          }}
                          className="p-1 text-surface-500 hover:text-primary rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
                          title="More options"
                        >
                          <MoreHorizontalIcon size={16} />
                        </button>
                        
                        {/* Dropdown menu for grid view */}
                        {showMoreMenu === matter.id && (
                          <div className="absolute mt-8 w-48 bg-white dark:bg-surface-800 rounded-xl shadow-card border border-surface-200 dark:border-surface-700 z-10">
                            <ul className="py-1">
                              <li>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentMatter(matter);
                                    setShowMoreMenu(null);
                                    toast.success(`Matter ${matter.title} duplicated`);
                                  }}
                                  className="w-full text-left px-4 py-2 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                                >
                                  Duplicate
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toast.success(`Matter ${matter.title} archived`);
                                    setShowMoreMenu(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                                >
                                  Archive
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowMoreMenu(null);
                                    setSelectedMatters([matter.id]);
                                    setShowDeleteConfirmation(true);
                                  }}
                                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty state */}
          {matters.length === 0 && (
            <div className="bg-white dark:bg-surface-900 rounded-2xl p-8 text-center shadow-card">
              <div className="w-16 h-16 bg-surface-100 dark:bg-surface-800 rounded-full mx-auto flex items-center justify-center mb-4">
                <SlashIcon size={24} className="text-surface-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No matters found</h3>
              <p className="text-surface-500 dark:text-surface-400 mb-6">Try adjusting your search or filter criteria</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStatus('all');
                  setSelectedType('all');
                }}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl"
              >
                Reset filters
              </button>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default MattersList;