import EventList from '@/components/events/EventList'
import EventsSearch from '@/components/events/EventsSearch'
import { getAllEvents } from '@/dummy-data'
import { useRouter } from 'next/router'

export default function Events() {
    const router= useRouter()
    const featuredEvents = getAllEvents()

    const searchEventsHandler = (year: string, month: string) => {
        router.push(`events/${year}/${month}`)
    }

    return (
        <>
            <EventsSearch onSearch={searchEventsHandler} />
            <EventList events={featuredEvents} />
        </>
    )
}
