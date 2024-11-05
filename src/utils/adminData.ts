export async function getAdminStats() {
  // Mock data for demonstration
  return {
    totalPredictions: Math.floor(Math.random() * 1000 + 500),
    activeUsers: Math.floor(Math.random() * 50 + 20),
    totalProduction: Math.floor(Math.random() * 100000 + 50000),
    criticalStocks: Math.floor(Math.random() * 10),
    productionData: generateProductionData()
  };
}

export async function getUserActivities() {
  // Mock data for demonstration
  const activities = [];
  const actions = [
    'Generated prediction for Zone Z01',
    'Updated stock levels',
    'Requested production increase',
    'Reviewed depletion rates',
    'Generated monthly report'
  ];
  
  for (let i = 0; i < 5; i++) {
    activities.push({
      user: `User${Math.floor(Math.random() * 100)}`,
      action: actions[Math.floor(Math.random() * actions.length)],
      timestamp: new Date(Date.now() - i * 3600000).toLocaleString()
    });
  }
  
  return activities;
}

function generateProductionData() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(name => ({
    name,
    planned: Math.floor(Math.random() * 10000 + 5000),
    actual: Math.floor(Math.random() * 10000 + 5000)
  }));
}