import { Fragment } from 'react';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';

function EventDetailPage(props) {
  const event = props.event

  if (!event) {
    return (
      <ErrorAlert>
        <p>Loading...</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetailPage;

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const pathParams = events.map((event) => ({
    params: { eventId: event.id }
  }))

  return {
    paths: pathParams,
    fallback: true
  }
}

export const getStaticProps = async (ctx) => {
  const { params } = ctx
  console.log(params)
  const eventId = params.eventId;
  const event = await getEventById(eventId);

  if (!event) {
    return { notFound: true }
  }

  return {
    props: { event },
    revalidate: 300
  }
}