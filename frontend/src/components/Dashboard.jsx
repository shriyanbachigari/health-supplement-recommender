import React, { useState, useEffect } from 'react';
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { GiPill, GiMedicines } from 'react-icons/gi';

export default function Dashboard() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('Dashboard');

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
    <div>
      <div className="relative flex flex-col min-h-screen bg-white font-[Lexend,'Noto Sans',sans-serif] overflow-x-hidden">
        <div className="layout-container flex flex-col flex-1">
          <div className="flex flex-1 gap-6 px-8 py-6">

            {/* Sidebar */}
            <aside className="w-84 flex flex-col justify-between bg-white p-6 border-r border-gray-100">
              {/* User */}
              <div className="flex flex-col gap-4">
                {/* User Name */}
                <div className="pb-4 border-b border-gray-100">
                  <p className="text-lg font-bold text-[#0d141b]">{userName}</p>
                </div>
                
                {/* Nav */}
                <nav className="flex flex-col gap-2">
                  {[
                    { label: 'Overview', ActiveIcon: AiFillHome, InactiveIcon: AiOutlineHome, active: true },
                    { label: 'Supplements', ActiveIcon: GiPill, InactiveIcon: GiMedicines, active: false }
                  ].map((item) => {
                    const IconComponent = item.active ? item.ActiveIcon : item.InactiveIcon;
                    return (
                      <button
                        key={item.label}
                        className={`flex items-center gap-3 px-3 py-2 rounded-full ${item.active ? 'bg-[#e7edf3]' : ''}`}
                      >
                        <IconComponent className="w-5 h-5 text-[#0d141b]" />
                        <p className="text-sm font-medium text-[#0d141b]">{item.label}</p>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex flex-col flex-1 max-w-none">
              {/* Header */}
              <header className="flex flex-wrap justify-between items-center gap-3 pl-6 pb-4">
                <div>
                  <p className="text-[32px] font-bold text-[#0d141b] pb-4">Your Health Dashboard</p>
                  <p className="text-sm text-[#4c739a]">Welcome back! Here's a snapshot of your health journey.</p>
                </div>
              </header>

              {/* Current Regimen */}
              <section className="px-6 pb-4 pt-6">
                <h2 className="text-[24px] font-bold text-[#0d141b] mb-4">Current Supplement Regimen</h2>
                <div className="overflow-hidden rounded-xl border border-[#cfdbe7] bg-white">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm font-medium text-[#0d141b] border-b border-[#cfdbe7]">
                        <th className="px-4 py-4">Supplement</th>
                        <th className="px-4 py-4">Dosage</th>
                        <th className="px-4 py-4">Schedule</th>
                        <th className="px-4 py-4 text-[#4c739a]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {[
                        ['Vitamin D3', '2000 IU', 'Daily with breakfast'],
                        ['Omega-3 Fish Oil', '1000 mg', 'Twice daily with meals'],
                        ['Probiotic', '1 capsule', 'Daily before bed']
                      ].map(([supp, dose, sched]) => (
                        <tr key={supp} className="border-b border-[#cfdbe7] last:border-b-0">
                          <td className="px-4 py-4 text-[#0d141b]">{supp}</td>
                          <td className="px-4 py-4 text-[#4c739a]">{dose}</td>
                          <td className="px-4 py-4 text-[#4c739a]">{sched}</td>
                          <td className="px-4 py-4 text-[#4c739a] font-bold cursor-pointer hover:text-blue-600">View Details</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Personalized Recommendations - REAL DATA */}
              <section className="px-6 pb-4 pt-6">
                <h2 className="text-[24px] font-bold text-[#0d141b] mb-4">Personalized Recommendations</h2>
                
                {loading && (
                  <div className="flex justify-center items-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-[#4c739a]">Loading recommendations...</span>
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
                  <div className="space-y-6">
                    {recommendations.slice(0, 6).map((supplement, index) => (
                      <div key={supplement.id || index} className="flex gap-6 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                        <div className="flex flex-2 flex-col gap-3">
                          <p className="font-bold text-[#0d141b] text-lg">{supplement.title}</p>
                          <p className="text-sm text-[#4c739a]">
                            {supplement.brand} • {supplement.category}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-[#4c739a]">
                              {supplement.avg_rating ? `★ ${supplement.avg_rating}/5` : 'No rating'} • 
                              {supplement.rating_count ? ` ${supplement.rating_count} ratings` : ' No ratings'} • 
                              ₹{supplement.price}
                            </span>
                          </div>
                          <div className="flex gap-3 mt-2">
                            <button 
                              onClick={() => {
                                if (supplement.product_url) {
                                  window.open(supplement.product_url, '_blank', 'noopener,noreferrer');
                                } else {
                                  alert('No product URL available for this supplement');
                                }
                              }}
                              className="rounded-full bg-[#47a6ea] text-white px-6 py-2 text-sm font-medium hover:bg-blue-600 transition-colors"
                            >
                              View Product
                            </button>
                            <button className="rounded-full bg-[#e7edf3] px-6 py-2 text-sm font-medium hover:bg-gray-200 transition-colors">
                              Add to Regimen
                            </button>
                          </div>
                        </div>
                        <div className="flex-shrink-0 w-32 h-32 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-xs">SUPP</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Goals & Progress (placeholder cards) */}
              <section className="px-6 pb-4 pt-6">
                <h2 className="text-[24px] font-bold text-[#0d141b] mb-4">Health Goals & Progress</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 py-4">
                  {[
                    ['Energy Levels', '8/10', '+5%'],
                    ['Sleep Quality', '7/10', '+3%']
                  ].map(([label, score, delta]) => (
                    <div key={label} className="flex flex-col gap-3 rounded-xl border border-[#cfdbe7] p-6 bg-white min-h-[200px]">
                      <p className="font-medium text-[#0d141b]">{label}</p>
                      <p className="text-[32px] font-bold text-[#0d141b]">{score}</p>
                      <p className="flex gap-1">
                        <span className="text-sm text-[#4c739a]">Last 7 Days</span>
                        <span className="text-sm font-medium text-[#078838]">{delta}</span>
                      </p>
                      {/* Placeholder chart */}
                      <div className="h-36 bg-gradient-to-b from-[#e7edf3] to-transparent rounded flex items-center justify-center">
                        <span className="text-[#4c739a] text-sm">Chart Coming Soon</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick Actions */}
              <section className="px-6 pb-8">
                <h2 className="text-[24px] font-bold text-[#0d141b] mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4 py-2">
                  {['Edit Health Goals', 'Update Supplement Info', 'Retake Onboarding'].map(btn => (
                    <button
                      key={btn}
                      className="rounded-full bg-[#e7edf3] px-6 py-3 text-sm font-bold hover:bg-gray-200"
                      onClick={() => {
                        localStorage.removeItem('hasProfile');
                        window.location.href = '/onboard';
                      }}
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
