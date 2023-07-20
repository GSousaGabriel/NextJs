import EventContent from "@/components/events/EventDetail/EventContent"
import EventLogistics from "@/components/events/EventDetail/EventLogistics"
import EventSummary from "@/components/events/EventDetail/EventSummary"
import { getEventById } from "@/dummy-data"
import { useRouter } from "next/router"

function EventDetail() {
    const router = useRouter()

    const event = getEventById(router.query.eventId as string)

    if (!event) {
        throw 'error'
    }

    return (
        <>
            <EventSummary title={event.title} />
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </>
    )
}

export default EventDetail