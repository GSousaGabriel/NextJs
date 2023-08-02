import Link from 'next/link';
import classes from './main-navigation.module.css';
import { signOut, useSession } from 'next-auth/react'

function MainNavigation() {
  const { session, status } = useSession()

  console.log(session)
  if (status) {
    return <p className={classes.profile}>loading...</p>
  }

  function logoutHandler() {
    signOut()
  }

  return (
    <header className={classes.header}>
      <Link href='/' className={classes.logo}>
        <div >Next Auth</div>
      </Link>
      <nav>
        <ul>
          {
            !session && loading != 'loading' ?
              <li>
                <Link href='/auth'>Login</Link>
              </li>
              :
              ''
          }
          {
            session && <li>
              <Link href='/profile'>Profile</Link>
            </li>
          }
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
