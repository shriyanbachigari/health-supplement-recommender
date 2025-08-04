import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import { MdSpa, MdDashboard, MdScience, MdSearch, MdVisibility, MdAddShoppingCart, MdStar, MdClose } from 'react-icons/md';
import { CgPill } from 'react-icons/cg';
import { MdFitnessCenter, MdLocalDrink, MdEmojiFoodBeverage, MdBiotech } from 'react-icons/md';

export default function SupplementsPage() {
  const [supplements, setSupplements] = useState([]);
  const [filteredSupplements, setFilteredSupplements] = useState([]);
  const [displayedSupplements, setDisplayedSupplements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('User');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplement, setSelectedSupplement] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 10;

  // Category icon mapping (same as Dashboard)
  const getCategoryIcon = (category) => {
    const icons = {
      'Vitamin Supplement': { icon: CgPill, color: 'bg-yellow-500' },
      'Protein Supplement': { icon: MdFitnessCenter, color: 'bg-purple-500' },
      'Digestive Probiotic': { icon: MdBiotech, color: 'bg-pink-500' },
      'Energy Drinks': { icon: MdLocalDrink, color: 'bg-red-500' },
      'Milk Drink Mixes': { icon: MdEmojiFoodBeverage, color: 'bg-blue-500' },
      'default': { icon: CgPill, color: 'bg-gray-500' }
    };
    return icons[category] || icons.default;
  };

  // Get unique categories from supplements
  const categories = ['All', ...new Set(supplements.map(s => s.category).filter(Boolean))];

  // Fetch all supplements from database
  useEffect(() => {
    const fetchSupplements = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        
        // Fetch user name
        try {
          const profileResponse = await fetch('http://localhost:8000/api/profile/', {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
          });
          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            const name = profileData.user?.first_name || profileData.user?.username || 'User';
            setUserName(name);
          }
        } catch (profileError) {
          console.log('Could not fetch profile:', profileError);
        }

        // Fetch all supplements (you'll need to create this endpoint)
        const response = await fetch('http://localhost:8000/api/supplements/', {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          const data = await response.json();
          setSupplements(data);
          setFilteredSupplements(data);
        } else {
          setError('Failed to fetch supplements');
        }
        
      } catch (err) {
        setError('Error fetching supplements');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplements();
  }, []);

  // Filter and sort supplements
  useEffect(() => {
    let filtered = supplements;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.title || '').localeCompare(b.title || '');
        case 'price':
          return (a.price || 0) - (b.price || 0);
        case 'rating':
          return (b.avg_rating || 0) - (a.avg_rating || 0);
        default:
          return 0;
      }
    });

    setFilteredSupplements(filtered);
    
    // Reset pagination when filters change
    setCurrentPage(1);
    const initialItems = filtered.slice(0, ITEMS_PER_PAGE);
    setDisplayedSupplements(initialItems);
    setHasMore(filtered.length > ITEMS_PER_PAGE);
  }, [supplements, selectedCategory, searchTerm, sortBy]);

  // Load more supplements
  const loadMoreSupplements = () => {
    setLoadingMore(true);
    
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = nextPage * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newItems = filteredSupplements.slice(startIndex, endIndex);
      
      setDisplayedSupplements(prev => [...prev, ...newItems]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < filteredSupplements.length);
      setLoadingMore(false);
    }, 500); // Small delay for better UX
  };

  // Add to regimen function (same as Dashboard)
  const addToRegimen = async (supplementData) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/api/regimen/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplementData),
      });
      if (response.ok) {
        setShowModal(false);
        setSelectedSupplement(null);
        alert('Added to regimen successfully!');
      }
    } catch (error) {
      console.error('Error adding to regimen:', error);
    }
  };

  // Modal component (same as Dashboard)
  const AddToRegimenModal = () => {
    const [dosage, setDosage] = useState('');
    const [timing, setTiming] = useState('morning');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!dosage.trim()) return;
      
      const regimenData = {
        supplement_title: selectedSupplement.title,
        supplement_brand: selectedSupplement.brand || '',
        supplement_price: selectedSupplement.price || null,
        supplement_url: selectedSupplement.product_url || '',
        supplement_category: selectedSupplement.category || '',
        dosage: dosage.trim(),
        timing,
        notes: notes.trim(),
      };
      
      addToRegimen(regimenData);
    };

    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">Add to Regimen</h3>
            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
              <MdClose className="text-xl text-[var(--text-secondary)]" />
            </button>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-[var(--text-primary)]">{selectedSupplement?.title}</h4>
            <p className="text-sm text-[var(--text-secondary)]">By {selectedSupplement?.brand}</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Dosage *</label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="e.g., 2000 IU, 1 capsule"
                className="w-full p-3 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">When to take</label>
              <select
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                className="w-full p-3 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Notes (optional)</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., with breakfast, on empty stomach"
                className="w-full p-3 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 text-[var(--text-secondary)] border border-[var(--border-color)] rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-[var(--brand-color)] text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Add to Regimen
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#f7faff] font-['Poppins',sans-serif]">
      <style>{`
        :root {
          --brand-color: #2563eb;
          --background-primary: #f7faff;
          --background-secondary: #ffffff;
          --text-primary: #1e293b;
          --text-secondary: #64748b;
          --text-accent: #2563eb;
          --border-color: #e2e8f0;
        }
      `}</style>
      
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 border-r border-[var(--border-color)] min-h-screen flex flex-col">
        <div className="flex items-center gap-2 mb-12">
          <MdSpa className="text-[var(--brand-color)] text-3xl" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{userName}</h1>
        </div>
        
        <nav className="flex-1">
          <ul>
            <li className="mb-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-[var(--text-secondary)] hover:bg-blue-50 hover:text-[var(--text-accent)] rounded-lg py-2 px-4 transition-colors w-full"
              >
                <MdDashboard className="mr-3 text-xl" />
                Dashboard
              </button>
            </li>
            <li>
              <button className="flex items-center text-white font-semibold bg-[var(--brand-color)] rounded-lg py-2 px-4 shadow-md w-full">
                <MdScience className="mr-3 text-xl" />
                Supplements
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="mt-auto">
          <button 
            onClick={() => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('hasProfile');
              navigate('/login');
            }}
            className="flex items-center text-[var(--text-secondary)] hover:bg-gray-100 rounded-lg py-2 px-4 transition-colors w-full"
          >
            <AiOutlineLogout className="mr-3 text-xl" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="mb-8">
          <h2 className="text-4xl font-bold text-[var(--text-primary)]">All Supplements</h2>
          <p className="text-[var(--text-secondary)] mt-2">Browse our complete supplement database</p>
        </header>

        {/* Search and Filters */}
        <div className="mb-8 bg-white p-6 rounded-2xl border border-[var(--border-color)]">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] text-xl" />
              <input
                type="text"
                placeholder="Search supplements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        {/* Loading/Error States */}
        {loading && (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-[var(--text-secondary)]">Loading supplements...</span>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Supplements Grid */}
        {!loading && !error && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-[var(--text-secondary)]">
                Showing {displayedSupplements.length} of {filteredSupplements.length} supplements
              </p>
            </div>
            
            {displayedSupplements.length === 0 ? (
              <div className="p-8 bg-yellow-50 border border-yellow-200 rounded-xl text-center">
                <p className="text-yellow-700">No supplements found matching your criteria.</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {displayedSupplements.map((supplement, index) => (
                    <div key={supplement.id || index} className="bg-white p-4 rounded-2xl shadow-sm border border-[var(--border-color)] hover:shadow-md hover:border-[var(--brand-color)] transition-all duration-300">
                      <div className="flex items-center gap-6">
                        {(() => {
                          const categoryInfo = getCategoryIcon(supplement.category);
                          const IconComponent = categoryInfo.icon;
                          return (
                            <div className={`w-16 h-16 ${categoryInfo.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                              <IconComponent className="text-2xl" />
                            </div>
                          );
                        })()}
                        <div className="flex-grow">
                          <p className="text-xs text-indigo-500 font-semibold uppercase">{supplement.category || 'Supplement'}</p>
                          <h4 className="text-lg font-semibold text-[var(--text-primary)] mt-1">{supplement.title}</h4>
                          <p className="text-sm text-[var(--text-secondary)] mt-1">By {supplement.brand}</p>
                          <div className="flex items-center text-sm text-[var(--text-secondary)] mt-2">
                            {supplement.avg_rating ? (
                              <>
                                <MdStar className="text-yellow-500 text-base mr-1" />
                                <span className="font-semibold text-gray-700">{supplement.avg_rating}/5</span>
                                <span className="mx-2">·</span>
                                <span>{supplement.rating_count || 0} ratings</span>
                              </>
                            ) : (
                              <span>No rating</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 w-48">
                          <p className="text-2xl font-bold text-[var(--text-primary)]">₹{supplement.price}</p>
                          <div className="mt-4 flex flex-col gap-2">
                            <button 
                              onClick={() => {
                                if (supplement.product_url) {
                                  window.open(supplement.product_url, '_blank', 'noopener,noreferrer');
                                } else {
                                  alert('No product URL available for this supplement');
                                }
                              }}
                              className="bg-[var(--brand-color)] text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors w-full flex items-center justify-center gap-2"
                            >
                              <MdVisibility className="text-lg" />
                              View Product
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedSupplement(supplement);
                                setShowModal(true);
                              }}
                              className="bg-blue-50 text-[var(--text-accent)] font-medium py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors w-full flex items-center justify-center gap-2"
                            >
                              <MdAddShoppingCart className="text-lg" />
                              Add to Regimen
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-8">
                    <button
                      onClick={loadMoreSupplements}
                      disabled={loadingMore}
                      className="bg-[var(--brand-color)] text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingMore ? (
                        <>
                          <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Loading...
                        </>
                      ) : (
                        `Load More (${filteredSupplements.length - displayedSupplements.length} remaining)`
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      <AddToRegimenModal />
    </div>
  );
}
