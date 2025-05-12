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
        toast.success(`${selectedMatters.length} matters would be deleted`);
        break;
      case 'export':
        toast.success(`${selectedMatters.length} matters would be exported`);
        break;
      case 'status':
        toast.success(`Status would be changed for ${selectedMatters.length} matters`);
        break;
      default:
        break;
    }
    
    // Clear selection after action
    setSelectedMatters([]);
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
                onClick={() => navigate('/')}
                className="flex items-center p-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <FolderIcon className="h-5 w-5" />
                {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center p-3 rounded-xl bg-primary bg-opacity-10 text-primary dark:text-primary-light"
              >
                <ListIcon className="h-5 w-5" />
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
                            <span className="font-medium">{matter.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-surface-700 dark:text-surface-300">{matter.client}</td>
                        <td className="px-6 py-4">{renderStatusPill(matter.status)}</td>
                        <td className="px-6 py-4 text-surface-700 dark:text-surface-300">{matter.type}</td>
                        <td className="px-6 py-4 text-surface-700 dark:text-surface-300">{formatDate(matter.lastUpdated)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-surface-400 hover:text-primary rounded-full hover:bg-surface-100 dark:hover:bg-surface-800">
                              <EditIcon size={16} />
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
                  <div className="p-6">
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
                      <button className="p-2 text-surface-500 hover:text-primary rounded-full hover:bg-surface-100 dark:hover:bg-surface-800">
                        <MoreHorizontalIcon size={16} />
                      </button>
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