import classes from './logistics-item.module.css';

function LogisticsItem(props: { icon: JSX.ElementType, children: JSX.Element }) {
  const { icon: Icon } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
