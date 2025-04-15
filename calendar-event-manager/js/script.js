// Get DOM elements
const eventForm = document.getElementById('eventForm');
const eventsList = document.getElementById('eventsList');
const filterMonth = document.getElementById('filterMonth');
const filterBtn = document.getElementById('filterBtn');
const clearFilterBtn = document.getElementById('clearFilterBtn');

// Load events from localStorage
function getEvents() {
    return JSON.parse(localStorage.getItem('events')) || [];
}

// Save events to localStorage
function saveEvents(events) {
    localStorage.setItem('events', JSON.stringify(events));
}

// Add new event
function addEvent(event) {
    const events = getEvents();
    event.id = Date.now().toString();
    events.push(event);
    saveEvents(events);
    displayEvents();
}

// Delete event
function deleteEvent(id) {
    const events = getEvents();
    const newEvents = events.filter(event => event.id !== id);
    saveEvents(newEvents);
    displayEvents();
}

// Edit event
function editEvent(id) {
    const events = getEvents();
    const event = events.find(event => event.id === id);
    if (event) {
        document.getElementById('eventId').value = event.id;
        document.getElementById('eventTitle').value = event.title;
        document.getElementById('eventDate').value = event.date;
        document.getElementById('eventTime').value = event.time;
    }
}

// Display events in the list
function displayEvents() {
    const events = getEvents();
    const month = filterMonth.value;
    
    // Filter events if month is selected
    const filteredEvents = month
        ? events.filter(event => event.date.startsWith(month))
        : events;
    
    // Sort events by date and time
    const sortedEvents = filteredEvents.sort((a, b) => {
        const dateA = new Date(a.date + 'T' + a.time);
        const dateB = new Date(b.date + 'T' + b.time);
        return dateA - dateB;
    });

    // Clear current list
    eventsList.innerHTML = '';

    // Add events to list
    sortedEvents.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event-item';
        eventElement.innerHTML = `
            <h3>${event.title}</h3>
            <p>Date: ${event.date}</p>
            <p>Time: ${event.time}</p>
            <button onclick="editEvent('${event.id}')">Edit</button>
            <button onclick="deleteEvent('${event.id}')">Delete</button>
        `;
        eventsList.appendChild(eventElement);
    });
}

// Handle form submit
eventForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const eventData = {
        title: document.getElementById('eventTitle').value,
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        id: document.getElementById('eventId').value
    };

    const events = getEvents();
    if (eventData.id) {
        // Update existing event
        const index = events.findIndex(e => e.id === eventData.id);
        events[index] = eventData;
        saveEvents(events);
    } else {
        // Add new event
        addEvent(eventData);
    }

    // Reset form
    eventForm.reset();
    document.getElementById('eventId').value = '';
    displayEvents();
});

// Handle filter
filterBtn.addEventListener('click', displayEvents);
clearFilterBtn.addEventListener('click', function() {
    filterMonth.value = '';
    displayEvents();
});

// Initial display
displayEvents();