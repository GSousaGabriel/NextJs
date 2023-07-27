interface IEvent {
    _id: Object,
    title: string,
    date: string,
    location: string,
    description: string,
    image: string,
}

interface IEventLogistics {
    date: string,
    location: string,
    image: string,
    imageAlt?: string
}