import { Inter } from 'next/font/google'
import { getFeaturedEvents } from '@/dummy-data'
import EventList from '@/components/events/EventList'

export default function Home() {
  const featuredEvents = getFeaturedEvents()

  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  )
}
