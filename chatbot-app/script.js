// Initialize the chatbot class
window.Chatbot = class Chatbot {
    constructor() {
        this.name = 'David';
        this.userName = '';
        this.context = [];
        this.askedForName = false;
        this.askingForSong = false;
        this.radioInfo = {
            contact: 'rockmoulds@gmail.com',
            genres: ['electronic', 'hip-hop', 'indie', 'deep house', 'trap'],
            djs: {
                'DJ MICKY': 'Morning Drive (6-10am)',
                'DJ IPRO': 'Lunch Break Mix (12-2pm)',
                'DJ FUSION': 'Evening Vibes (6-10pm)'
            },
            shows: {
                'Morning Drive': { time: '6-10am', dj: 'DJ MICKY', description: 'Start your day with DJ MICKY\'s energetic beats' },
                'Lunch Break Mix': { time: '12-2pm', dj: 'DJ IPRO', description: 'Get your midday groove with DJ IPRO' },
                'Evening Vibes': { time: '6-10pm', dj: 'DJ FUSION', description: 'Wind down with DJ FUSION\'s signature mix' }
            },
            social: {
                twitch: 'Fusion2Radio',
                twitchUrl: 'https://twitch.tv/Fusion2Radio',
                features: {
                    'Live Interaction': 'Engage in real-time with our DJs and community',
                    'Song Requests': 'Request your favorite tracks through chat',
                    'Community Events': 'Join themed nights, Q&As, and music trivia',
                    'Chat Experience': 'Share thoughts and connect with fellow listeners',
                    'AI Integration': 'Interact with David, our AI chatbot, for seamless requests'
                },
                benefits: [
                    'Personalized music experience',
                    'Active community engagement',
                    'Diverse music selection',
                    'Special live events',
                    'Access from anywhere'
                ],
                events: [
                    'Themed music nights',
                    'Live Q&A sessions',
                    'Music trivia contests',
                    'Community challenges',
                    'Genre spotlight events'
                ]
            },
            advertising: {
                overview: 'Fusion2Radio offers unbeatable value for radio advertising, making quality promotion accessible for businesses of all sizes.',
                benefits: [
                    'Best prices in the market',
                    'Quality content creation',
                    'Wide reach and engagement',
                    'Flexible advertising solutions',
                    'Exceptional customer service'
                ],
                services: {
                    'Content Creation': 'Professional production team crafting compelling ads',
                    'Campaign Management': 'Strategic programming and innovative campaign management',
                    'Custom Packages': 'Tailored solutions from short spots to comprehensive packages',
                    'Promotions': 'Special offers and promotional discounts available',
                    'Brand Development': 'Strategic advice and brand visibility enhancement'
                },
                solutions: [
                    'Short spot advertisements',
                    'Comprehensive advertising packages',
                    'Event sponsorships',
                    'Promotional campaigns',
                    'Brand partnerships'
                ]
            }
        };
    }

    analyzeIntent(input) {
        const cleanInput = input.toLowerCase().trim();
        const words = cleanInput.split(' ');
        
        const intents = {
            greeting: ['hello', 'hi', 'hey', 'sup', 'yo'],
            farewell: ['bye', 'goodbye', 'cya', 'later'],
            booking: ['book', 'booking', 'hire', 'contact'],
            schedule: ['schedule', 'time', 'when', 'show', 'shows'],
            music: ['music', 'genre', 'play', 'song', 'track'],
            dj: ['dj', 'host', 'presenter'],
            twitch: ['twitch', 'stream', 'live', 'watch', 'streaming'],
            advertising: ['advertise', 'advertising', 'promotion', 'marketing', 'ads', 'prices', 'cost', 'package', 'sponsor'],
            request: ['request', 'play', 'hear', 'listen', 'song', 'track', 'music'],
            inquiry: ['what', 'how', 'who', 'where', 'when', 'why']
        };

        for (const [intent, keywords] of Object.entries(intents)) {
            if (keywords.some(keyword => words.includes(keyword))) {
                return intent;
            }
        }
        return 'general';
    }

    generateResponse(input) {
        const intent = this.analyzeIntent(input);
        const cleanInput = input.toLowerCase().trim();
        
        // Handle song request in progress
        if (this.askingForSong) {
            this.askingForSong = false;
            const personalizedGreeting = this.userName ? `, ${this.userName}` : '';
            return `🎧 YO${personalizedGreeting}! I'll add "${input}" to our mix! Keep it locked to hear your track! 🎵`;
        }

        // Handle name asking first
        if (!this.userName && !this.askedForName) {
            this.askedForName = true;
            return "🎧 YO! DJ David in the house! Before we drop the beats, what's your name? 🎵";
        }

        if (!this.userName && this.askedForName) {
            const words = input.split(' ');
            let potentialName = '';
            
            if (input.toLowerCase().includes('my name is')) {
                potentialName = input.toLowerCase().split('my name is')[1].trim();
            } else if (input.toLowerCase().includes("i'm")) {
                potentialName = input.toLowerCase().split("i'm")[1].trim();
            } else if (input.toLowerCase().includes('i am')) {
                potentialName = input.toLowerCase().split('i am')[1].trim();
            } else {
                potentialName = words[0];
            }
            
            this.userName = potentialName.charAt(0).toUpperCase() + potentialName.slice(1);
            return `🎵 Ayy ${this.userName}! Welcome to the party! Ready to drop some beats and take your requests! 🎧`;
        }

        this.context.push({ input, intent });
        if (this.context.length > 5) this.context.shift();

        switch (intent) {
            case 'greeting':
                return this.getGreeting();
            case 'farewell':
                return this.getFarewell();
            case 'booking':
                return this.getBookingInfo();
            case 'schedule':
                return this.getScheduleInfo(cleanInput);
            case 'music':
                return this.getMusicInfo(cleanInput);
            case 'dj':
                return this.getDJInfo(input);
            case 'twitch':
                return this.getTwitchInfo();
            case 'advertising':
                return this.getAdvertisingInfo(cleanInput);
            case 'request':
                return this.handleSongRequest();
            default:
                return this.getContextualResponse(cleanInput);
        }
    }

    handleSongRequest() {
        this.askingForSong = true;
        const personalizedGreeting = this.userName ? `, ${this.userName}` : '';
        return `🎧 YO${personalizedGreeting}! Drop that track name and artist, and I'll add it to the mix! 🎵\n\n` +
               `Format: [Song Name] by [Artist]\n` +
               `Example: "Levels by Avicii" 🎶`;
    }

    getGreeting() {
        const timeOfDay = new Date().getHours();
        let greeting = '';
        
        if (timeOfDay < 12) {
            greeting = '🌅 Good morning';
        } else if (timeOfDay < 18) {
            greeting = '☀️ Good afternoon';
        } else {
            greeting = '🌙 Good evening';
        }
        
        if (this.userName) {
            return `${greeting}, ${this.userName}! 🎧 DJ David in the mix! Ready to drop some beats and take your requests! 🎵`;
        }
        return `${greeting}! 🎧 DJ David here, ready to make your day awesome! What's your name? 🎵`;
    }

    getFarewell() {
        if (this.userName) {
            return `🎧 Peace out, ${this.userName}! Keep those vibes high and catch us live on Twitch at ${this.radioInfo.social.twitchUrl}! 🎵`;
        }
        return `🎧 Stay tuned, friend! Catch the freshest beats on Twitch at ${this.radioInfo.social.twitchUrl}! 🎵`;
    }

    getDJInfo(input) {
        const djProfiles = {
            'DJ MICKY': {
                bio: 'The morning energy master, DJ MICKY kicks off your day with the perfect blend of upbeat tracks.',
                specialty: 'Morning groove and energetic beats',
                showTime: '6-10am'
            },
            'DJ IPRO': {
                bio: 'DJ IPRO brings the heat during lunch hours, keeping your midday fresh with the latest hits.',
                specialty: 'Midday mix and current hits',
                showTime: '12-2pm'
            },
            'DJ FUSION': {
                bio: 'The evening maestro, DJ FUSION creates the perfect atmosphere to end your day.',
                specialty: 'Evening vibes and smooth transitions',
                showTime: '6-10pm'
            }
        };

        // Check for specific DJ inquiries
        for (const [dj, info] of Object.entries(djProfiles)) {
            if (input.toLowerCase().includes(dj.toLowerCase())) {
                return `🎧 ${dj} - ${info.bio}\n• Show Time: ${info.showTime}\n• Specialty: ${info.specialty}\n\n🎵 Catch their live sets on our Twitch channel: ${this.radioInfo.social.twitchUrl} 🎵`;
            }
        }
        
        // General DJ response
        return `🎧 Meet our amazing Fusion2Radio DJs!\n\n` +
               `🌅 DJ MICKY - Morning Energy Master (6-10am)\n` +
               `☀️ DJ IPRO - Midday Mix Specialist (12-2pm)\n` +
               `🌙 DJ FUSION - Evening Vibe Creator (6-10pm)\n\n` +
               `🎵 Watch them live on Twitch: ${this.radioInfo.social.twitchUrl}\n` +
               `📧 For bookings: ${this.radioInfo.contact}`;
    }

    getTwitchInfo() {
        return `🎧 Join the party at Fusion2Radio! 🎵\n\n` +
               `🔴 Watch us LIVE on Twitch: ${this.radioInfo.social.twitchUrl}\n\n` +
               `Meet our incredible DJs:\n` +
               `🌅 DJ MICKY - Your Morning Energy (6-10am)\n` +
               `☀️ DJ IPRO - Lunch Break Vibes (12-2pm)\n` +
               `🌙 DJ FUSION - Evening Sessions (6-10pm)\n\n` +
               `📧 Want to book our DJs? Email us: ${this.radioInfo.contact}\n\n` +
               `🎵 Join us for:\n` +
               `• Live DJ Sets\n` +
               `• Song Requests\n` +
               `• Interactive Chat\n` +
               `• Special Events\n` +
               `• Community Vibes`;
    }

    getBookingInfo() {
        return `🎧 Ready to book our amazing DJs? 🎵\n\n` +
               `📧 Contact us at: ${this.radioInfo.contact}\n\n` +
               `Available for:\n` +
               `• Private Events\n` +
               `• Club Nights\n` +
               `• Corporate Functions\n` +
               `• Special Occasions\n\n` +
               `🎵 Watch our DJs in action on Twitch: ${this.radioInfo.social.twitchUrl}`;
    }

    getContextualResponse(input) {
        const recentTopics = this.context.slice(-3).map(ctx => ctx.intent);
        const personalizedGreeting = this.userName ? `, ${this.userName}` : '';
        
        if (recentTopics.includes('request')) {
            return `🎧 Ready to drop your favorite track${personalizedGreeting}? Let me know what you want to hear! 🎵`;
        }

        if (recentTopics.includes('twitch')) {
            return `🎵 Yo${personalizedGreeting}! Join the party on Twitch at ${this.radioInfo.social.twitchUrl} - where the music never stops! 🎧`;
        }
        
        if (recentTopics.includes('music')) {
            return `🎶 Feeling the rhythm${personalizedGreeting}? Drop your song request and let's keep this party going! 🎵`;
        }
        
        if (recentTopics.includes('dj')) {
            return `${this.userName ? `🎧 ${this.userName}, you're vibing with us! ` : ''}Our DJs are ready to spin your favorites! What's your jam? 🎵`;
        }

        const responses = [
            `🎧 Let's make some noise${personalizedGreeting}! Drop a request or ask about our shows - I'm here to keep the party going! 🎵`,
            `🎵 Need some fresh beats${personalizedGreeting}? Tell me what you want to hear! 🎧`,
            `🎶 Ready to feel the music${personalizedGreeting}? Let's get this party started! 🔥`
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
};

// Function to add a message to the chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    // Handle multi-line messages
    if (message.includes('\n')) {
        message.split('\n').forEach((line, index) => {
            if (index > 0) messageContent.appendChild(document.createElement('br'));
            messageContent.appendChild(document.createTextNode(line));
        });
    } else {
        messageContent.textContent = message;
    }
    
    // Add timestamp
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    const now = new Date();
    timeDiv.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(timeDiv);
    
    // Remove typing indicator if it exists
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.classList.remove('visible');
    }
    
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to show typing indicator
function showTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.classList.add('visible');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to handle sending messages
function handleSendMessage() {
    const message = userInput.value.trim();
    
    if (message) {
        // Add user message
        addMessage(message, true);
        
        // Clear input
        userInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Get and add bot response after a small delay
        setTimeout(() => {
            const response = chatbot.generateResponse(message);
            addMessage(response, false);
        }, 1000); // Increased delay for more natural feeling
    }
}

// Event listeners
sendButton.addEventListener('click', handleSendMessage);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

// Add welcome message
setTimeout(() => {
    const currentHour = new Date().getHours();
    let greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
    addMessage(`${greeting}! I'm ${chatbot.name}, your Fusion2Radio assistant. Ask me about our music, shows, DJs, or booking information!`, false);
}, 500);

// Focus input on load
window.onload = () => {
    userInput.focus();
};
