document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', options);
    
    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            // Clear any user session data
            localStorage.removeItem('userToken');
            // Redirect to login page
            window.location.href = 'index.html';
        }
    });
    
    // Load user data
    const userData = JSON.parse(localStorage.getItem('userData')) || {
        name: 'John Beekeeper',
        avatar: 'assets/images/user-avatar.jpg',
        membership: 'Premium'
    };
    
    document.getElementById('username').textContent = userData.name;
    document.getElementById('userAvatar').src = userData.avatar;
    
    // Initialize charts
    initHoneyProductionChart();
    initHiveHealthChart();
    
    // Calculator modal
    const calculatorBtn = document.getElementById('calculatorBtn');
    const calculatorModal = document.getElementById('calculatorModal');
    const closeModal = document.querySelector('.close-modal');
    
    calculatorBtn.addEventListener('click', function(e) {
        e.preventDefault();
        calculatorModal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', function() {
        calculatorModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === calculatorModal) {
            calculatorModal.style.display = 'none';
        }
    });
    
    // Simulate real-time data updates
    function updateSensorData() {
        // Random temperature between 30-38°C
        const temp = (30 + Math.random() * 8).toFixed(1);
        document.getElementById('temperatureValue').textContent = temp + '°C';
        
        // Random humidity between 50-80%
        const humidity = Math.floor(50 + Math.random() * 30);
        document.getElementById('humidityValue').textContent = humidity + '%';
        
        // Update timestamps
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById('tempTime').textContent = timeStr;
        document.getElementById('humidityTime').textContent = timeStr;
        
        // Schedule next update
        setTimeout(updateSensorData, 120000); // Update every 2 minutes
    }
    
    // Initial data update
    updateSensorData();
    
    // Initialize charts
    function initHoneyProductionChart() {
        const ctx = document.getElementById('honeyChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Honey Production (kg)',
                    data: [8.2, 9.1, 10.5, 11.2, 11.8, 12.1, 12.4],
                    borderColor: '#FFC107',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 7
                    }
                }
            }
        });
    }
    
    function initHiveHealthChart() {
        const ctx = document.getElementById('hiveHealthChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Healthy', 'Warning', 'Critical'],
                datasets: [{
                    data: [85, 10, 5],
                    backgroundColor: [
                        '#4CAF50',
                        '#FFC107',
                        '#F44336'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    }
});