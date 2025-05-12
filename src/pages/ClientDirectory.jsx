import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

const ClientDirectory = () => {
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
  const BuildingIcon = getIcon('Building');
  const PhoneIcon = getIcon('Phone');
  const MailIcon = getIcon('Mail');
  const MoreHorizontalIcon = getIcon('MoreHorizontal');
  const EditIcon = getIcon('Edit');
  const FileTextIcon = getIcon('FileText');
  const EyeIcon = getIcon('Eye');
  
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [viewMode, setViewMode] = useState('table');
  const [selectedClients, setSelectedClients] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showClientModal, setShowClientModal] = useState(false);
  const [clientFormData, setClientFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const itemsPerPage = 10;
  
  // Sample data
  const initialClients = [
    { id: 1, name: "Hanson Inc.", type: "Corporate", status: "active", contactPerson: "Robert Hanson", email: "robert@hansoninc.com", phone: "(555) 123-4567", address: "123 Business Ave, New York, NY", lastContact: "2023-09-15" },
    { id: 2, name: "Johnson Family", type: "Individual", status: "active", contactPerson: "Sarah Johnson", email: "sarah@johnson.com", phone: "(555) 234-5678", address: "456 Maple St, Boston, MA", lastContact: "2023-09-10" },
    { id: 3, name: "TechCorp LLC", type: "Corporate", status: "active", contactPerson: "Alex Chen", email: "alex@techcorp.com", phone: "(555) 345-6789", address: "789 Tech Blvd, San Francisco, CA", lastContact: "2023-09-08" },
    { id: 4, name: "Thomas Davidson", type: "Individual", status: "inactive", contactPerson: "Thomas Davidson", email: "thomas@email.com", phone: "(555) 456-7890", address: "321 Oak Lane, Chicago, IL", lastContact: "2023-08-30" },
    { id: 5, name: "Medtech Inc.", type: "Corporate", status: "active", contactPerson: "Jennifer Lee", email: "jennifer@medtech.com", phone: "(555) 567-8901", address: "567 Health Way, Houston, TX", lastContact: "2023-09-12" },
    { id: 6, name: "GreenEnergy Co.", type: "Corporate", status: "active", contactPerson: "Michael Green", email: "michael@greenenergy.com", phone: "(555) 678-9012", address: "890 Solar Rd, Denver, CO", lastContact: "2023-09-05" },
    { id: 7, name: "Maria Rivera", type: "Individual", status: "inactive", contactPerson: "Maria Rivera", email: "maria@email.com", phone: "(555) 789-0123", address: "234 Pine St, Miami, FL", lastContact: "2023-09-03" },
    { id: 8, name: "City Development LLC", type: "Corporate", status: "active", contactPerson: "David City", email: "david@citydevelopment.com", phone: "(555) 890-1234", address: "456 Urban Center, Seattle, WA", lastContact: "2023-08-20" },
    { id: 9, name: "Thompson Health", type: "Corporate", status: "active", contactPerson: "Lisa Thompson", email: "lisa@thompsonhealth.com", phone: "(555) 901-2345", address: "789 Wellness Ave, Portland, OR", lastContact: "2023-09-01" },
    { id: 10, name: "Jackson Manufacturing", type: "Corporate", status: "inactive", contactPerson: "Peter Jackson", email: "peter@jacksonmfg.com", phone: "(555) 012-3456", address: "345 Factory Lane, Detroit, MI", lastContact: "2023-08-28" },
    { id: 11, name: "Smith Family", type: "Individual", status: "active", contactPerson: "John Smith", email: "john@smith.com", phone: "(555) 234-5678", address: "567 Family Circle, Atlanta, GA", lastContact: "2023-09-07" },
    { id: 12, name: "BlueOcean Inc.", type: "Corporate", status: "active", contactPerson: "Emma Blue", email: "emma@blueocean.com", phone: "(555) 345-6789", address: "890 Sea Blvd, San Diego, CA", lastContact: "2023-09-14" },
  ];
  
  const [clients, setClients] = useState(initialClients);
  
  // Filter types and statuses derived from data
  const clientTypes = [...new Set(initialClients.map(client => client.type))];
  const clientStatuses = [...new Set(initialClients.map(client => client.status))];
  
  // Effect to filter and sort clients
  useEffect(() => {
    let filtered = [...initialClients];
    
    // Filter by search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(search) || 
        client.contactPerson.toLowerCase().includes(search) ||
        client.email.toLowerCase().includes(search)
      );
    }
    
    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(client => client.status === selectedStatus);
    }
    
    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(client => client.type === selectedType);
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
    
    setClients(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, selectedType, sortField, sortDirection]);

  // Validate client form
  const validateClientForm = (data) => {
    const errors = {};
    
    if (!data.name || data.name.trim() === '') {
      errors.name = 'Client name is required';
    }
    
    if (!data.contactPerson || data.contactPerson.trim() === '') {
      errors.contactPerson = 'Contact person is required';
    }
    
    if (!data.email || data.email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!data.phone || data.phone.trim() === '') {
      errors.phone = 'Phone number is required';
    }
    
    if (!data.type || data.type.trim() === '') {
      errors.type = 'Client type is required';
    }
    
    if (!data.status || data.status.trim() === '') {
      errors.status = 'Status is required';
    }
    
    return errors;
  };

  // Handle client form submit
  const handleClientFormSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateClientForm(clientFormData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      toast.error('Please fill in all required fields correctly');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        if (isEditMode) {
          // Update existing client
          const updatedClients = clients.map(client => 
            client.id === clientFormData.id ? clientFormData : client
          );
          setClients(updatedClients);
          toast.success('Client updated successfully');
        } else {
          // Create new client
          const newClient = {
            ...clientFormData,
            id: Math.max(...clients.map(c => c.id)) + 1,
            lastContact: new Date().toISOString().split('T')[0]
          };
          setClients([...clients, newClient]);
          toast.success('Client created successfully');
        }
        
        // Reset form and close modal
        setClientFormData({});
        setShowClientModal(false);
        setIsEditMode(false);
        setFormErrors({});
      } catch (error) {
        toast.error(isEditMode ? 'Failed to update client' : 'Failed to create client');
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }, 800);
  };
  
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
  
  // Handle client selection
  const toggleClientSelection = (clientId) => {
    if (selectedClients.includes(clientId)) {
      setSelectedClients(selectedClients.filter(id => id !== clientId));
    } else {
      setSelectedClients([...selectedClients, clientId]);
    }
  };
  
  // Handle select all
  const handleSelectAll = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clients.map(client => client.id));
    }
  };
  
  // Handle batch actions
  const handleBatchAction = (action) => {
    if (selectedClients.length === 0) {
      toast.error('No clients selected');
      return;
    }
    
    switch(action) {
      case 'delete':
        setShowDeleteConfirm(true);
        break;
      case 'export':
        toast.success(`${selectedClients.length} clients would be exported`);
        break;
      case 'status':
        toast.success(`Status would be changed for ${selectedClients.length} clients`);
        break;
      default:
        break;
    }
  };
  
  // Handle delete confirmation
  const confirmDelete = () => {
    if (clientToDelete) {
      // Single client delete
      setClients(clients.filter(client => client.id !== clientToDelete));
      setSelectedClients(selectedClients.filter(id => id !== clientToDelete));
      toast.success(`Client deleted successfully`);
    } else if (selectedClients.length > 0) {
      // Batch delete
      setClients(clients.filter(client => !selectedClients.includes(client.id)));
      toast.success(`${selectedClients.length} clients deleted successfully`);
      setSelectedClients([]);
    }
    setShowDeleteConfirm(false);
    setClientToDelete(null);
  };
  
  // Handle delete client request
  const handleDeleteClient = (clientId) => {
    setClientToDelete(clientId);
    setShowDeleteConfirm(true);
  };
  
  // Handle create client
  const handleCreateClient = () => {
    setClientFormData({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      type: 'Individual',
      status: 'active'
    });
    setIsEditMode(false);
    setShowClientModal(true);
    setFormErrors({});
  };
  
  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setClientFormData({
      ...clientFormData,
      [name]: value
    });
    
    // Clear error for this field if set
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };
  
  // Handle edit client
  const handleEditClient = (clientId) => {
    toast.info(`Editing client ${clientId}`);
    // This would typically open a modal or navigate to an edit form
    const clientToEdit = clients.find(client => client.id === clientId);
    if (clientToEdit) {
      setClientFormData({ ...clientToEdit });
      setIsEditMode(true);
      setShowClientModal(true);
      setFormErrors({});
    }
  };
  
  const handleViewClient = (clientId) => {
    navigate(`/clients/${clientId}`);
  };
  
  // Handle sidebar toggle
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Pagination
  const totalPages = Math.ceil(clients.length / itemsPerPage);
  const paginatedClients = clients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Render status pill
  const renderStatusPill = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
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
  
  // Handle export clients
  const handleExportClients = () => {
    const selectedClientData = clients.filter(client => selectedClients.includes(client.id));
    // In a real app, this would generate CSV or PDF
    console.log('Exporting clients:', selectedClientData);
    
    // Show success message
    toast.success(`${selectedClients.length} clients exported successfully`);
    setSelectedClients([]);
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
                  // Stay on current page, just prevent default navigation
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
          <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-50">Client Directory</h2>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl bg-surface-100 dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <SearchIcon className="absolute left-3 top-2.5 text-surface-400" size={18} />
            </div>
            
            {/* User avatar */}
            <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center font-medium">
              JD
            </div>
          </div>
        </header>
        
        {/* Client directory content */}
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
              
              {selectedClients.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-surface-600 dark:text-surface-400">{selectedClients.length} selected</span>
                  <button 
                    onClick={() => handleBatchAction('delete')}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <TrashIcon size={16} />
                  </button>
                    onClick={handleExportClients}
                    onClick={() => handleBatchAction('export')}
                    className="p-2 rounded-lg text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
                  >
                    <DownloadIcon size={16} />
                  </button>
                </div>
              )}
            </div>
            
            <button 
              onClick={handleCreateClient}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-sm flex items-center justify-center ml-auto"
            >
              <PlusIcon size={16} className="mr-2" />
              <span>New Client</span>
            </button>
          </div>
          
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
                    {clientStatuses.map(status => (
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
                    {clientTypes.map(type => (
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
                            checked={selectedClients.length === clients.length && clients.length > 0}
                            onChange={handleSelectAll}
                            className="mr-3 h-4 w-4 rounded border-surface-300 text-primary focus:ring-primary"
                          />
                          <button 
                            onClick={() => handleSort('name')}
                            className="group flex items-center font-medium text-sm text-surface-700 dark:text-surface-300"
                          >
                            Client Name
                            {sortField === 'name' && (
                              sortDirection === 'asc' ? 
                              <ArrowUpIcon size={14} className="ml-1" /> : 
                              <ArrowDownIcon size={14} className="ml-1" />
                            )}
                          </button>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <button 
                          onClick={() => handleSort('contactPerson')}
                          className="group flex items-center font-medium text-sm text-surface-700 dark:text-surface-300"
                        >
                          Contact Person
                          {sortField === 'contactPerson' && (
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
                          onClick={() => handleSort('email')}
                          className="group flex items-center font-medium text-sm text-surface-700 dark:text-surface-300"
                        >
                          Email
                          {sortField === 'email' && (
                            sortDirection === 'asc' ? 
                            <ArrowUpIcon size={14} className="ml-1" /> : 
                            <ArrowDownIcon size={14} className="ml-1" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <button 
                          onClick={() => handleSort('lastContact')}
                          className="group flex items-center font-medium text-sm text-surface-700 dark:text-surface-300"
                        >
                          Last Contact
                          {sortField === 'lastContact' && (
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
                    {paginatedClients.map(client => (
                      <tr 
                        key={client.id}
                        className="hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              checked={selectedClients.includes(client.id)}
                              onChange={() => toggleClientSelection(client.id)}
                              className="mr-3 h-4 w-4 rounded border-surface-300 text-primary focus:ring-primary"
                            />
                            <a 
                              href={`/clients/${client.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(`/clients/${client.id}`);
                              }}
                              className="font-medium hover:text-primary transition-colors"
                            >{client.name}</a>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-surface-700 dark:text-surface-300">{client.contactPerson}</td>
                        <td className="px-6 py-4">{renderStatusPill(client.status)}</td>
                        <td className="px-6 py-4 text-surface-700 dark:text-surface-300">{client.type}</td>
                        <td className="px-6 py-4 text-surface-700 dark:text-surface-300">{client.email}</td>
                        <td className="px-6 py-4 text-surface-700 dark:text-surface-300">{formatDate(client.lastContact)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleViewClient(client.id)}
                              className="p-1 text-surface-400 hover:text-primary rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
                              title="View client profile"
                            >
                              <EyeIcon size={16} />
                            </button>
                            <button 
                              onClick={() => handleEditClient(client.id)}
                              className="p-1 text-surface-400 hover:text-primary rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
                              title="Edit client"
                            >
                              <EditIcon size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteClient(client.id)}
                              className="p-1 text-surface-400 hover:text-red-500 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
                              title="Delete client"
                            >
                              <TrashIcon size={16} />
                            </button>
                            <button className="p-1 text-surface-400 hover:text-primary rounded-full hover:bg-surface-100 dark:hover:bg-surface-800">
                              <MoreHorizontalIcon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {clients.length > itemsPerPage && (
                <div className="px-6 py-4 bg-surface-50 dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 flex items-center justify-between">
                  <div className="text-sm text-surface-600 dark:text-surface-400">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, clients.length)} of {clients.length} clients
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
              {paginatedClients.map(client => (
                <div 
                  key={client.id}
                  className="bg-white dark:bg-surface-900 rounded-2xl shadow-card overflow-hidden hover:shadow-soft transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold">
                        <a 
                          href={`/clients/${client.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/clients/${client.id}`);
                          }}
                          className="hover:text-primary transition-colors"
                        >{client.name}</a>
                      </h3>
                      {renderStatusPill(client.status)}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <UserIcon size={16} className="mr-2 text-surface-400" />
                        <span className="text-surface-600 dark:text-surface-400">{client.contactPerson}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MailIcon size={16} className="mr-2 text-surface-400" />
                        <span className="text-surface-600 dark:text-surface-400">{client.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <PhoneIcon size={16} className="mr-2 text-surface-400" />
                        <span className="text-surface-600 dark:text-surface-400">{client.phone}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <BuildingIcon size={16} className="mr-2 text-surface-400" />
                        <span className="text-surface-600 dark:text-surface-400 truncate">{client.address}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-surface-200 dark:border-surface-700">
                      <span className="text-sm text-surface-500 dark:text-surface-400">Last Contact: {formatDate(client.lastContact)}</span>
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => handleViewClient(client.id)}
                          className="p-1 text-surface-400 hover:text-primary rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
                          title="View client profile"
                        >
                          <EyeIcon size={16} />
                        </button>
                        <button 
                          onClick={() => handleEditClient(client.id)}
                          className="p-1 text-surface-400 hover:text-primary rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
                        >
                          <EditIcon size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteClient(client.id)}
                          className="p-1 text-surface-400 hover:text-red-500 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
                        >
                          <TrashIcon size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty state */}
          {clients.length === 0 && (
            <div className="bg-white dark:bg-surface-900 rounded-2xl p-8 text-center shadow-card">
              <div className="w-16 h-16 bg-surface-100 dark:bg-surface-800 rounded-full mx-auto flex items-center justify-center mb-4">
                <SlashIcon size={24} className="text-surface-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No clients found</h3>
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
          
          {/* Delete confirmation dialog */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-medium mb-2">Confirm Delete</h3>
                <p className="text-surface-600 dark:text-surface-400 mb-6">
                  {clientToDelete ? 
                    "Are you sure you want to delete this client? This action cannot be undone." : 
                    `Are you sure you want to delete ${selectedClients.length} selected clients? This action cannot be undone.`
                  }
                </p>
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setClientToDelete(null);
                    }}
                    className="px-4 py-2 border border-surface-200 dark:border-surface-700 rounded-xl text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Client Form Modal */}
        {showClientModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-surface-900 rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-medium mb-4">
                {isEditMode ? 'Edit Client' : 'Add New Client'}
              </h3>
              
              <form onSubmit={handleClientFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Client Name</label>
                    <input
                      type="text"
                      name="name"
                      value={clientFormData.name || ''}
                      onChange={handleFormChange}
                      className={`w-full p-2 border rounded-xl ${formErrors.name ? 'border-red-500' : 'border-surface-200 dark:border-surface-700'} bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Person</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={clientFormData.contactPerson || ''}
                      onChange={handleFormChange}
                      className={`w-full p-2 border rounded-xl ${formErrors.contactPerson ? 'border-red-500' : 'border-surface-200 dark:border-surface-700'} bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {formErrors.contactPerson && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.contactPerson}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={clientFormData.email || ''}
                      onChange={handleFormChange}
                      className={`w-full p-2 border rounded-xl ${formErrors.email ? 'border-red-500' : 'border-surface-200 dark:border-surface-700'} bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={clientFormData.phone || ''}
                      onChange={handleFormChange}
                      className={`w-full p-2 border rounded-xl ${formErrors.phone ? 'border-red-500' : 'border-surface-200 dark:border-surface-700'} bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select
                      name="type"
                      value={clientFormData.type || ''}
                      onChange={handleFormChange}
                      className={`w-full p-2 border rounded-xl ${formErrors.type ? 'border-red-500' : 'border-surface-200 dark:border-surface-700'} bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                    >
                      {clientTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {formErrors.type && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.type}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      name="status"
                      value={clientFormData.status || ''}
                      onChange={handleFormChange}
                      className={`w-full p-2 border rounded-xl ${formErrors.status ? 'border-red-500' : 'border-surface-200 dark:border-surface-700'} bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary`}
                    >
                      {clientStatuses.map(status => (
                        <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                      ))}
                    </select>
                    {formErrors.status && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.status}</p>
                    )}
                  </div>
                  
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <textarea
                      name="address"
                      value={clientFormData.address || ''}
                      onChange={handleFormChange}
                      rows="3"
                      className="w-full p-2 border border-surface-200 dark:border-surface-700 rounded-xl bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={() => setShowClientModal(false)} className="px-4 py-2 border border-surface-200 dark:border-surface-700 rounded-xl text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl flex items-center">
                    {isSubmitting && <span className="inline-block mr-2 animate-spin">&#9696;</span>}
                    {isEditMode ? 'Update Client' : 'Create Client'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientDirectory;