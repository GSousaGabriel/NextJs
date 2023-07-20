import EventItem from "./EventItem"
import classes from "./EventList.module.css"

function EventList(props: { events: Array<EventInterface> }) {
    const { events } = props

    return (
        <ul className={classes.list}>
            {events.map((event) => (
                <EventItem
                    key={event.id}
                    date={event.date}
                    description={event.description}
                    id={event.id}
                    location={event.location}
                    title={event.title}
                    isFeatured={event.isFeatured}
                    image={event.image}
                />
            ))}
        </ul>
    )
}

export default EventList