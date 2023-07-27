import EventItem from './event-item';
import classes from './event-list.module.css';

function EventList(props: { items: IEvent[] }) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((event: IEvent) => (
        <EventItem
          key={event._id.toString()}
          _id={event._id.toString()}
          title={event.title}
          location={event.location}
          description={event.description}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
  );
}

export default EventList;
