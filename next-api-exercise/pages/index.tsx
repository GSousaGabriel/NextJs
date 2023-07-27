import Head from 'next/head';
import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';
import { GetServerSideProps } from 'next';
import { getFeaturedEvents } from '@/helpers/api-props-util';

function HomePage(props: { events: string }) {
  const events = JSON.parse(props.events)

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const featuredEvents = await getFeaturedEvents()

  return {
    props: {
      events: JSON.stringify(featuredEvents),
    }
  };
}

export default HomePage;
