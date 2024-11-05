import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Activity, Users, Package, AlertTriangle, MessageSquare, Star, ChevronRight } from 'lucide-react';
import { getAdminStats, getUserActivities } from '../utils/adminData';
import { useFeedbackStore } from '../stores/feedbackStore';
import { useHistoryStore } from '../stores/historyStore';
import { WEAPONS, AMMUNITION } from '../data/weapons';
import DetailedStockChart from '../components/DetailedStockChart';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
  
  const feedback = useFeedbackStore((state) => state.feedback);
  const updateFeedbackStatus = useFeedbackStore((state) => state.updateStatus);
  const history = useHistoryStore((state) => state.entries);

  const weaponsData = WEAPONS.map(weapon => ({
    name: weapon.name,
    current: weapon.stock,
    critical: weapon.criticalLevel,
    production: weapon.monthlyProduction
  }));

  const ammoData = Object.values(AMMUNITION)
    .flat()
    .map(ammo => ({
      name: `${ammo.name} ${ammo.type}`,
      current: ammo.stock,
      critical: ammo.criticalLevel,
      production: ammo.monthlyProduction
    }));

  const criticalWeapons = WEAPONS.filter(w => w.stock <= w.criticalLevel);
  const criticalAmmo = Object.values(AMMUNITION)
    .flat()
    .filter(a => a.stock <= a.criticalLevel);

  useEffect(() => {
    const fetchData = async () => {
      const statsData = await getAdminStats();
      const activitiesData = await getUserActivities();
      setStats(statsData);
      setActivities(activitiesData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <button
          onClick={() => {
            setActiveTab('overview');
            setSelectedDetail(null);
          }}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => {
            setActiveTab('feedback');
            setSelectedDetail(null);
          }}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'feedback'
              ? 'bg-blue-600 text-white'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          Feedback
        </button>
        <button
          onClick={() => {
            setActiveTab('history');
            setSelectedDetail(null);
          }}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'history'
              ? 'bg-blue-600 text-white'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          History
        </button>
      </div>

      {activeTab === 'overview' && !selectedDetail && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              className="bg-white/10 backdrop-blur-md rounded-lg p-6 cursor-pointer hover:bg-white/20 transition-all"
              onClick={() => setSelectedDetail('predictions')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">Total Predictions</p>
                    <p className="text-2xl font-bold text-white">{stats.totalPredictions}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div 
              className="bg-white/10 backdrop-blur-md rounded-lg p-6 cursor-pointer hover:bg-white/20 transition-all"
              onClick={() => setSelectedDetail('users')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">Active Users</p>
                    <p className="text-2xl font-bold text-white">{stats.activeUsers}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div 
              className="bg-white/10 backdrop-blur-md rounded-lg p-6 cursor-pointer hover:bg-white/20 transition-all"
              onClick={() => setSelectedDetail('production')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">Total Production</p>
                    <p className="text-2xl font-bold text-white">{stats.totalProduction}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div 
              className="bg-white/10 backdrop-blur-md rounded-lg p-6 cursor-pointer hover:bg-white/20 transition-all"
              onClick={() => setSelectedDetail('critical')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-300">Critical Stocks</p>
                    <p className="text-2xl font-bold text-white">{criticalWeapons.length + criticalAmmo.length}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Production Overview</h3>
              <BarChart width={500} height={300} data={stats.productionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }} />
                <Legend />
                <Bar dataKey="planned" fill="#8884d8" name="Planned Production" />
                <Bar dataKey="actual" fill="#82ca9d" name="Actual Production" />
              </BarChart>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{activity.user}</p>
                        <p className="text-sm text-gray-300">{activity.action}</p>
                      </div>
                      <p className="text-sm text-gray-400">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'overview' && selectedDetail === 'critical' && (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedDetail(null)}
            className="text-white flex items-center space-x-2 hover:text-blue-400 transition-colors"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
            <span>Back to Overview</span>
          </button>

          <DetailedStockChart
            data={weaponsData.filter(w => {
              const weapon = WEAPONS.find(wp => wp.name === w.name);
              return weapon && weapon.stock <= weapon.criticalLevel;
            })}
            title="Critical Weapon Stocks"
          />

          <DetailedStockChart
            data={ammoData.filter(a => {
              const ammo = Object.values(AMMUNITION)
                .flat()
                .find(am => `${am.name} ${am.type}` === a.name);
              return ammo && ammo.stock <= ammo.criticalLevel;
            })}
            title="Critical Ammunition Stocks"
          />
        </div>
      )}

      {activeTab === 'overview' && selectedDetail === 'production' && (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedDetail(null)}
            className="text-white flex items-center space-x-2 hover:text-blue-400 transition-colors"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
            <span>Back to Overview</span>
          </button>

          <DetailedStockChart
            data={weaponsData}
            title="Weapons Production Overview"
          />

          <DetailedStockChart
            data={ammoData}
            title="Ammunition Production Overview"
          />
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">User Feedback</h3>
          <div className="space-y-4">
            {feedback.map((item) => (
              <div key={item.id} className="bg-white/5 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    <span className="text-white font-medium">{item.username}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.status === 'reviewed'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= item.rating
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-300">{item.message}</p>
                {item.status === 'pending' && (
                  <button
                    onClick={() => updateFeedbackStatus(item.id, 'reviewed')}
                    className="mt-2 px-3 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Mark as Reviewed
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Prediction History</h3>
          <div className="space-y-4">
            {history.map((entry) => (
              <div key={entry.id} className="bg-white/5 p-4 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="text-white">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white">
                      {entry.state} - Zone {entry.zone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Weapon/Ammo</p>
                    <p className="text-white">
                      {entry.weapon} - {entry.ammo}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Stock Level</p>
                    <p className="text-white">{entry.stock}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">Prediction Results</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-1">
                    <div className="text-white">
                      Depletion: {entry.prediction.depletionDate}
                    </div>
                    <div className="text-white">
                      Order: {entry.prediction.recommendedOrder}
                    </div>
                    <div className="text-white">
                      Time: {entry.prediction.productionTime}
                    </div>
                    <div className="text-white">
                      Rate: {entry.prediction.depletionRate}/day
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}