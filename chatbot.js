document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotWidget = document.querySelector('.chatbot-widget');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    
    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        chatbotWidget.classList.toggle('open');
    });
    
    chatbotClose.addEventListener('click', function() {
        chatbotWidget.classList.remove('open');
    });
    
    // Chatbot responses
    const botResponses = {
        'hello': 'Hello! How can I help you with your beekeeping today?',
        'hi': 'Hi there! What would you like to know about beekeeping?',
        'temperature': 'The optimal temperature range for beehives is between 32-36°C (90-97°F). Outside this range, bees may struggle to maintain the hive.',
        'humidity': 'Ideal hive humidity is between 50-80%. Too dry can dehydrate bees, too humid can promote mold growth.',
        'honey': 'A healthy hive typically produces 10-30kg of honey per year, depending on factors like location, weather, and bee species.',
        'help': 'I can help with: temperature, humidity, honey production, pests, and general beekeeping advice. What do you need?',
        'default': "I'm sorry, I didn't understand that. Try asking about temperature, humidity, or honey production."
    };
    
    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;
        
        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        // Simulate bot typing
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender);
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Get bot response
    function getBotResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
            return botResponses['hello'];
        } else if (lowerMsg.includes('temp')) {
            return botResponses['temperature'];
        } else if (lowerMsg.includes('humid')) {
            return botResponses['humidity'];
        } else if (lowerMsg.includes('honey')) {
            return botResponses['honey'];
        } else if (lowerMsg.includes('help')) {
            return botResponses['help'];
        } else {
            return botResponses['default'];
        }
    }
    
    // Event listeners
    chatbotSend.addEventListener('click', sendMessage);
    
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Initial greeting
    setTimeout(() => {
        addMessage("Hello! I'm HiveMind Assistant. How can I help you with your beekeeping today?", 'bot');
    }, 1000);
});