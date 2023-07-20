import { PropsWithChildren } from 'react';
import classes from './ErrorAlert.module.css';

function ErrorAlert(props: PropsWithChildren) {
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;
