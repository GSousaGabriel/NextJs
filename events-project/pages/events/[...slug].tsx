import ErrorAlert from "@/components/UI/ErrorAlert"
import EventList from "@/components/events/EventList"
import ResultsTitle from "@/components/events/ResultsTitle"
import { getFilteredEvents } from "@/dummy-data"
import { useRouter } from "next/router"

function FilteredEvents() {
    const router = useRouter()
    const filters = router.query.slug

    if (!filters) {
        return (
            <ErrorAlert>
                <p className="center">Loading...</p>
            </ErrorAlert>
        )
    } else {
        const monthFilter = +filters[1]
        const yearFilter = +filters[0]

        if (isNaN(yearFilter) || isNaN(monthFilter)) {
            return (
                <ErrorAlert>
                    <p className="center">Error filtering...</p>
                </ErrorAlert>
            )
        }

        const filteredEvents = getFilteredEvents({ year: yearFilter, month: monthFilter })

        if (!filteredEvents || filteredEvents.length === 0) {
            return (
                <ErrorAlert>
                    <p className="center">No events Found...</p>
                </ErrorAlert>
            )
        }

        const date = new Date(yearFilter, monthFilter - 1)

        return (
            <>
                <ResultsTitle date={date} />
                <EventList events={filteredEvents} />
            </>
        )
    }
}

export default FilteredEvents