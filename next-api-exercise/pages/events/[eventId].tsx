import { Fragment } from 'react';
import Head from 'next/head';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import Comments from '../../components/input/comments';
import { GetStaticProps } from 'next';
import { MongoClient, ObjectId } from 'mongodb';
import { getFeaturedEvents } from '@/helpers/api-props-util';

function EventDetailPage(props: { selectedEvent: IEvent }) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta
          name='description'
          content={event.description}
        />
      </Head>
      <EventSummary title={event!.title} />
      <EventLogistics
        date={event.date}
        location={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventComment={event._id.toString()} />
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const eventId = new ObjectId(context.params!.eventId as string);
  const client = await MongoClient.connect('mongodb+srv://pasteu008:admin@cluster0.arcwbve.mongodb.net/')
  const db = client.db('NextEvents')
  const collection = db.collection('events')

  const eventObject = await collection.findOne({ _id: eventId });
  const event = {
    ...eventObject,
    _id: eventObject!._id.toString()
  }

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30
  };
}

export async function getStaticPaths() {
  const featuredPaths = await getFeaturedEvents()
  const paths = featuredPaths.map((featuredPath) => ({ params: { eventId: featuredPath._id.toString() } }))
  
  return {
    paths: paths,
    fallback: 'blocking'
  };
}

export default EventDetailPage;
