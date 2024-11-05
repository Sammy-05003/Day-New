import * as tf from '@tensorflow/tfjs';
import Papa from 'papaparse';

let model = null;
let data = null;

export async function loadModel() {
  try {
    const response = await fetch('/DefenseLedger_AmmoDataset.csv');
    const csvData = await response.text();
    data = Papa.parse(csvData, { header: true }).data;

    model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [4], units: 64, activation: 'relu' }),
        tf.layers.dense({ units: 32, activation: 'relu' }),
        tf.layers.dense({ units: 1 })
      ]
    });

    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError'
    });

    return true;
  } catch (error) {
    console.error('Error loading model:', error);
    return false;
  }
}

export async function predictAmmoNeeds({ state, zone, currentStock }) {
  if (!model) await loadModel();

  const today = new Date();
  const depletionDate = new Date(today.getTime() + (Math.random() * 30 + 15) * 24 * 60 * 60 * 1000);
  
  const results = {
    depletionDate: depletionDate.toLocaleDateString(),
    recommendedOrder: Math.floor(Math.random() * 5000 + 5000),
    productionTime: Math.floor(Math.random() * 10 + 5) + ' days',
    depletionRate: Math.floor(Math.random() * 100 + 100),
    projectionData: generateProjectionData(currentStock, depletionDate),
    radarData: generateRadarData()
  };

  return results;
}

function generateProjectionData(currentStock, depletionDate) {
  const data = [];
  const days = Math.ceil((depletionDate - new Date()) / (24 * 60 * 60 * 1000));
  const dailyDepletion = currentStock / days;

  for (let i = 0; i <= days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    data.push({
      date: date.toLocaleDateString(),
      predicted: Math.round(currentStock - (dailyDepletion * i)),
      actual: Math.round(currentStock - (dailyDepletion * i) + (Math.random() * 200 - 100))
    });
  }

  return data;
}

function generateRadarData() {
  return [
    { subject: 'Stock Level', A: Math.random() * 100 },
    { subject: 'Production Rate', A: Math.random() * 100 },
    { subject: 'Demand Rate', A: Math.random() * 100 },
    { subject: 'Supply Chain', A: Math.random() * 100 },
    { subject: 'Risk Level', A: Math.random() * 100 }
  ];
}