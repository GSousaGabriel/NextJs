import { Fragment } from 'react';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../helpers/api-util';
import Head from 'next/head'

function FilteredEventsPage(props) {

  let pageHeader = (title, description) => (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </Head>
  )

  if (props.hasError) {
    return (
      <Fragment>
        {pageHeader('Invalid filter', 'Invalid filter. Please adjust your values')}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!props.filteredEvents || props.filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeader('No events', 'No events found for the chosen filter!')}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.year, props.month - 1);

  return (
    <Fragment>
      {pageHeader('Filtered events', `All events for ${props.month} ${props.year}`)}
      <ResultsTitle date={date} />
      <EventList items={props.filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;

export const getServerSideProps = async (ctx) => {
  const { params } = ctx

  const filteredYear = params.slug[0];
  const filteredMonth = params.slug[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true }
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      filteredEvents,
      year: numYear,
      month: numMonth
    }
  }
}
