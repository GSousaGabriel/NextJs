import Link from 'next/link';

import classes from './button.module.css';
import { MouseEventHandler, ReactNode } from 'react';

function Button(props: { link: string, onClick?: MouseEventHandler<HTMLButtonElement>, children: ReactNode }) {
  if (props.link) {
    return (
      <Link href={props.link} className={classes.btn}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
