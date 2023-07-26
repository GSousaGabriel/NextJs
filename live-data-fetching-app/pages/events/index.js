import { Fragment } from 'react';
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { getAllEvents } from '../../helpers/api-util';
import Head from 'next/head'

function AllEventsPage(props) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
      <title>NextJs Events</title>
      <meta name="description" content="interesting events to explore"></meta>
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={props.events} />
    </Fragment>
  );
}

export default AllEventsPage;


export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: { events },
    revalidate: 300
  }
}