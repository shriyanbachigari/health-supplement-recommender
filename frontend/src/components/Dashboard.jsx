import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import { MdSpa, MdDashboard, MdScience, MdWbSunny, MdVisibility, MdAddShoppingCart, MdStar, MdClose, MdDelete, MdWbTwilight, MdNightlight } from 'react-icons/md';

export default function Dashboard() {
  const [recommendations, setRecommendations] = useState([]);
  const [regimen, setRegimen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('Dashboard');
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplement, setSelectedSupplement] = useState(null);
  const navigate = useNavigate();

  // Timing configuration for regimen cards
  const timingConfig = {
    morning: { icon: MdWbSunny, bg: 'bg-yellow-100', text: 'text-yellow-500', btn: 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100' },
    afternoon: { icon: MdWbTwilight, bg: 'bg-orange-100', text: 'text-orange-500', btn: 'text-orange-600 bg-orange-50 hover:bg-orange-100' },
    evening: { icon: MdWbTwilight, bg: 'bg-purple-100', text: 'text-purple-500', btn: 'text-purple-600 bg-purple-50 hover:bg-purple-100' },
    night: { icon: MdNightlight, bg: 'bg-indigo-100', text: 'text-indigo-500', btn: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100' }
  };

  // API functions for regimen management
  const fetchRegimen = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch('http://localhost:8000/api/regimen/', {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        setRegimen(data);
      }
    } catch (error) {
      console.error('Error fetching regimen:', error);
    }
  };

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
        const newItem = await response.json();
        setRegimen(prev => [newItem, ...prev]);
        setShowModal(false);
        setSelectedSupplement(null);
      }
    } catch (error) {
      console.error('Error adding to regimen:', error);
    }
  };

  const removeFromRegimen = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:8000/api/regimen/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setRegimen(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error removing from regimen:', error);
    }
  };

  // Fetch user name, recommendations, and regimen
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        
        // Fetch user profile for name
        try {
          const profileResponse = await fetch('http://localhost:8000/api/profile/', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            console.log('Profile API response:', profileData);
            // Prioritize first name, then username, then email as fallback
            const name = profileData.user?.first_name || profileData.user?.username || profileData.user?.email || 'User';
            setUserName(name);
          } else {
            console.log('Profile response not ok:', profileResponse.status);
          }
        } catch (profileError) {
          console.log('Could not fetch profile:', profileError);
        }

        // Fetch recommendations
        const response = await fetch('http://localhost:8000/api/recommend/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRecommendations(data.recommendations || []);
        } else {
          setError('Failed to fetch recommendations');
        }

        // Fetch regimen
        await fetchRegimen();
        
      } catch (err) {
        setError('Error fetching data');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Modal component for adding supplements to regimen
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
            <button 
              onClick={() => setShowModal(false)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <MdClose className="text-xl text-[var(--text-secondary)]" />
            </button>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-[var(--text-primary)]">{selectedSupplement?.title}</h4>
            <p className="text-sm text-[var(--text-secondary)]">By {selectedSupplement?.brand}</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Dosage *
              </label>
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
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                When to take
              </label>
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
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Notes (optional)
              </label>
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
      
      <aside className="w-64 bg-white p-6 border-r border-[var(--border-color)] min-h-screen flex flex-col">
        <div className="flex items-center gap-2 mb-12">
          <MdSpa className="text-[var(--brand-color)] text-3xl" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{userName}</h1>
        </div>
        
        <nav className="flex-1">
          <ul>
            <li className="mb-4">
              <button className="flex items-center text-white font-semibold bg-[var(--brand-color)] rounded-lg py-2 px-4 shadow-md w-full">
                <MdDashboard className="mr-3 text-xl" />
                Dashboard
              </button>
            </li>
            <li>
              <button className="flex items-center text-[var(--text-secondary)] hover:bg-blue-50 hover:text-[var(--text-accent)] rounded-lg py-2 px-4 transition-colors w-full">
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

      <main className="flex-1 p-10">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold text-[var(--text-primary)]">Your Health Dashboard</h2>
            <p className="text-[var(--text-secondary)] mt-2">Welcome back! Here's a personalized view of your health journey.</p>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full border-2 border-[var(--brand-color)] bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">Current Supplement Regimen</h3>
          
          {regimen.length === 0 ? (
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl text-center">
              <p className="text-blue-700">No supplements in your regimen yet. Add some from the recommendations below!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {regimen
                .sort((a, b) => {
                  const order = { morning: 0, afternoon: 1, evening: 2, night: 3 };
                  return order[a.timing] - order[b.timing];
                })
                .map((supplement) => {
                const config = timingConfig[supplement.timing] || timingConfig.morning;
                const IconComponent = config.icon;
                
                return (
                  <div key={supplement.id} className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--border-color)] flex flex-col relative">
                    <button
                      onClick={() => removeFromRegimen(supplement.id)}
                      className="absolute top-3 right-3 p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove from regimen"
                    >
                      <MdDelete className="text-lg" />
                    </button>
                    
                    <div className="flex items-center mb-4">
                      <div className={`p-3 ${config.bg} rounded-full mr-4`}>
                        <IconComponent className={`${config.text} text-xl`} />
                      </div>
                      <div className="flex-1 mr-8">
                        <h4 className="font-semibold text-lg text-[var(--text-primary)]">{supplement.supplement_title}</h4>
                        <p className="text-sm text-[var(--text-secondary)]">{supplement.dosage}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4 flex-grow">
                      <p className="text-sm text-[var(--text-secondary)] mb-2">
                        <strong>Timing:</strong> {supplement.timing.charAt(0).toUpperCase() + supplement.timing.slice(1)}
                      </p>
                      {supplement.notes && (
                        <p className="text-sm text-[var(--text-secondary)]">
                          <strong>Notes:</strong> {supplement.notes}
                        </p>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => {
                        if (supplement.supplement_url) {
                          window.open(supplement.supplement_url, '_blank', 'noopener,noreferrer');
                        } else {
                          alert('No product URL available');
                        }
                      }}
                      className={`w-full text-center font-medium py-2 rounded-lg transition-colors ${config.btn}`}
                    >
                      View Details
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-[var(--text-primary)]">Personalized Recommendations</h3>
            <button className="text-sm font-medium text-[var(--text-accent)] hover:underline">View All</button>
          </div>
          
          {loading && (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-[var(--text-secondary)]">Loading recommendations...</span>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {!loading && !error && recommendations.length === 0 && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-yellow-700">No recommendations available. Try updating your profile or preferences.</p>
            </div>
          )}

          {!loading && !error && recommendations.length > 0 && (
            <div className="space-y-4">
              {recommendations.slice(0, 6).map((supplement, index) => (
                <div key={supplement.id || index} className="bg-white p-4 rounded-2xl shadow-sm border border-[var(--border-color)] hover:shadow-md hover:border-[var(--brand-color)] transition-all duration-300">
                  <div className="flex items-center gap-6">
                    <div className="flex-grow">
                      <p className="text-xs text-indigo-500 font-semibold uppercase">{supplement.category || 'Vitamin Supplement'}</p>
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
          )}
        </section>

        <section className="mt-12">
          <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            {['Edit Health Goals', 'Update Supplement Info', 'Retake Onboarding'].map(btn => (
              <button
                key={btn}
                className="bg-white text-[var(--text-accent)] font-medium px-6 py-3 rounded-lg border border-[var(--border-color)] hover:bg-blue-50 hover:border-[var(--brand-color)] transition-colors"
                onClick={() => {
                  localStorage.removeItem('hasProfile');
                  navigate('/onboard');
                }}
              >
                {btn}
              </button>
            ))}
          </div>
        </section>
      </main>

      <AddToRegimenModal />
    </div>
  );
}
