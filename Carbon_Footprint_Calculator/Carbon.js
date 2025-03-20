const EMISSION_FACTORS = {
    // Transportation (per km)
    car: {
      small: 0.15,
      medium: 0.19,
      large: 0.28,
      electric: 0.05,
      none: 0
    },
    publicTransport: 0.05, // average
    flight: 0.14, // average
    
    // Energy usage (per kWh)
    electricity: {
      coal: 0.9,
      natural_gas: 0.4,
      renewable: 0.02,
      grid_average: 0.5
    },
    
    // Food (per kg)
    food: {
      beef: 27,
      poultry: 6.9,
      dairy: 5.9,
      vegetables: 2.0
    },
    
    // Waste (per kg)
    waste: {
      landfill: 0.58,
      recycled: 0.04,
      composted: 0.08
    }
  };
  
  // Global chart variable
  let footprintChart;
  
  document.getElementById('calculate-btn').addEventListener('click', function() {
    // Get inputs
    const carType = document.getElementById('car-type').value;
    const carDistance = Number(document.getElementById('car-distance').value) || 0;
    const publicTransportDistance = Number(document.getElementById('public-transport-distance').value) || 0;
    const flightDistance = Number(document.getElementById('flight-distance').value) || 0;
    
    const electricityConsumption = Number(document.getElementById('electricity-consumption').value) || 0;
    const electricityType = document.getElementById('electricity-type').value;
    
    const beefConsumption = Number(document.getElementById('beef-consumption').value) || 0;
    const poultryConsumption = Number(document.getElementById('poultry-consumption').value) || 0;
    const dairyConsumption = Number(document.getElementById('dairy-consumption').value) || 0;
    const vegetablesConsumption = Number(document.getElementById('vegetables-consumption').value) || 0;
    
    const landfillWaste = Number(document.getElementById('landfill-waste').value) || 0;
    const recycledWaste = Number(document.getElementById('recycled-waste').value) || 0;
    const compostedWaste = Number(document.getElementById('composted-waste').value) || 0;
    
    // Calculate emissions
    const transportationEmissions = 
      (EMISSION_FACTORS.car[carType] * carDistance) +
      (EMISSION_FACTORS.publicTransport * publicTransportDistance) +
      (EMISSION_FACTORS.flight * flightDistance);
    
    const energyEmissions = electricityConsumption * 12 * EMISSION_FACTORS.electricity[electricityType];
    
    const foodEmissions = 52 * (
      (beefConsumption * EMISSION_FACTORS.food.beef) +
      (poultryConsumption * EMISSION_FACTORS.food.poultry) +
      (dairyConsumption * EMISSION_FACTORS.food.dairy) +
      (vegetablesConsumption * EMISSION_FACTORS.food.vegetables)
    );
    
    const wasteEmissions = 52 * (
      (landfillWaste * EMISSION_FACTORS.waste.landfill) +
      (recycledWaste * EMISSION_FACTORS.waste.recycled) +
      (compostedWaste * EMISSION_FACTORS.waste.composted)
    );
    
    const totalEmissions = transportationEmissions + energyEmissions + foodEmissions + wasteEmissions;
    
    // Display results
    if(transportationEmissions>=0&& energyEmissions>=0 && foodEmissions>=0 && wasteEmissions>=0 && totalEmissions>=0 ){
    document.getElementById('transportation-result').textContent = `${transportationEmissions.toFixed(2)} kg CO2e`;
    document.getElementById('energy-result').textContent = `${energyEmissions.toFixed(2)} kg CO2e`;
    document.getElementById('food-result').textContent = `${foodEmissions.toFixed(2)} kg CO2e`;
    document.getElementById('waste-result').textContent = `${wasteEmissions.toFixed(2)} kg CO2e`;
    document.getElementById('total-result').textContent = `${totalEmissions.toFixed(2)} kg CO2e (${(totalEmissions / 1000).toFixed(2)} tonnes)`;
    
    // Compare with global average
    const globalAverage = 5000; // kg CO2e
    const comparison = (totalEmissions / globalAverage) * 100;
    document.getElementById('comparison').textContent = 
      `Your carbon footprint is ${comparison.toFixed(0)}% of the global average (5 tonnes CO2e per year).`;
    
    // Show results
    document.getElementById('results').style.display = 'block';
    }

    else{

        document.getElementById('comparison').textContent = 
      `Enter Valid data.`;
    
      document.getElementById('results').style.display = 'block';
    }
    // Create chart
    const ctx = document.getElementById('footprint-chart').getContext('2d');
    
    // Destroy previous chart if it exists
    if (footprintChart) {
      footprintChart.destroy();
    }
    
    footprintChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Transportation', 'Home Energy', 'Food', 'Waste'],
        datasets: [{
          data: [transportationEmissions, energyEmissions, foodEmissions, wasteEmissions],
          backgroundColor: [
            '#4CAF50',
            '#2196F3',
            '#FFC107',
            '#9C27B0'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Carbon Footprint Breakdown'
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    });
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
  });