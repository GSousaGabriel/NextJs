export async function getAllEvents() {
    const response = await fetch('https://nextjs-6ee97-default-rtdb.firebaseio.com/events.json')
    const data = await response.json()
    const events = formatEvents(data)

    return events;
}

export async function getFeaturedEvents() {
    const data = await getAllEvents()
    return data.filter((event) => event.isFeatured);
}

export async function getFilteredEvents(dateFilter) {
    const data = await getAllEvents()
    const { year, month } = dateFilter;

    let filteredEvents = data.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}

export async function getEventById(id) {
    const data = await getAllEvents()
    return data.find((event) => event.id === id);
}

export const formatEvents = (data) => {
    const events = []

    for (const key in data) {
        events.push({
            id: key,
            ...data[key]
        })
    }

    return events
}
