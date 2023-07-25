import EventList from '../components/events/event-list';
import useSWR from 'swr';
import { formatEvents, getFeaturedEvents } from '../helpers/api-util';
import { useState } from 'react';

function HomePage(props) {
  const [featuredEvents, setFeaturedEvents] = useState(props.featuredEvents)

  const Fetcher = async (url) => {
    console.log('client fetch')
    const response = await fetch(url)
    const data = await response.json()
    const formatedData= formatEvents(data)
    const featured= formatedData.filter((event) => event.isFeatured);
    setFeaturedEvents(featured)
  }

  useSWR('https://nextjs-6ee97-default-rtdb.firebaseio.com/events.json', Fetcher)

  if (!featuredEvents) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;

export const getServerSideProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: { featuredEvents }
  }
}
