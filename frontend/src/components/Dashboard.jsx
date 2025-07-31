import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiFillHome, AiOutlineSearch, AiOutlineBell, AiOutlineLogout } from 'react-icons/ai';
import { GiPill, GiMedicines } from 'react-icons/gi';
import { MdSpa, MdDashboard, MdScience, MdWbSunny, MdWaterDrop, MdBedtime, MdVisibility, MdAddShoppingCart, MdStar } from 'react-icons/md';

export default function Dashboard() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('Dashboard');
  const navigate = useNavigate();

  // Fetch user name and recommendations
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
      } catch (err) {
        setError('Error fetching recommendations');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        {/* Logo and Brand */}
        <div className="flex items-center gap-2 mb-12">
          <MdSpa className="text-[var(--brand-color)] text-3xl" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{userName}</h1>
        </div>
        
        {/* Navigation */}
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
        
        {/* Logout */}
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
        {/* Header */}
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold text-[var(--text-primary)]">Your Health Dashboard</h2>
            <p className="text-[var(--text-secondary)] mt-2">Welcome back! Here's a personalized view of your health journey.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                className="pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-full w-64 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all" 
                placeholder="Search anything..." 
                type="text"
              />
              <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] text-xl" />
            </div>
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <AiOutlineBell className="text-[var(--text-secondary)] text-xl" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-[var(--brand-color)] bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Current Regimen */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">Current Supplement Regimen</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Vitamin D3', dosage: '2000 IU', schedule: 'Daily with breakfast', description: 'Daily with breakfast to support bone health and immunity.', icon: MdWbSunny, color: 'blue' },
              { name: 'Omega-3 Fish Oil', dosage: '1000 mg', schedule: 'Twice daily with meals', description: 'Twice daily with meals for heart and brain function.', icon: MdWaterDrop, color: 'green' },
              { name: 'Probiotic', dosage: '1 capsule', schedule: 'Daily before bed', description: 'Daily before bed to promote gut health.', icon: MdBedtime, color: 'purple' }
            ].map((supplement) => {
              const IconComponent = supplement.icon;
              const colorClasses = {
                blue: { bg: 'bg-blue-100', text: 'text-blue-500', button: 'text-blue-600 bg-blue-50 hover:bg-blue-100' },
                green: { bg: 'bg-green-100', text: 'text-green-500', button: 'text-green-600 bg-green-50 hover:bg-green-100' },
                purple: { bg: 'bg-purple-100', text: 'text-purple-500', button: 'text-purple-600 bg-purple-50 hover:bg-purple-100' }
              }[supplement.color];
              
              return (
                <div key={supplement.name} className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--border-color)] flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 ${colorClasses.bg} rounded-full mr-4`}>
                      <IconComponent className={`${colorClasses.text} text-xl`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-[var(--text-primary)]">{supplement.name}</h4>
                      <p className="text-sm text-[var(--text-secondary)]">{supplement.dosage}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-4 flex-grow">{supplement.description}</p>
                  <button className={`w-full text-center font-medium py-2 rounded-lg transition-colors ${colorClasses.button}`}>
                    View Details
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Personalized Recommendations */}
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
                        <button className="bg-blue-50 text-[var(--text-accent)] font-medium py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors w-full flex items-center justify-center gap-2">
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

        {/* Quick Actions */}
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
    </div>
  );
}
