import { getSession } from 'next-auth/react';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { useEffect, useState } from 'react';

function UserProfile() {
  const [loading, setLoading] = useState(true)
  const [loadedSession, setLoadedSession] = useState()

  useEffect(() => {
    getSession.then(session => {
      if (!session) {
        window.location.href = '/auth'
      } else {
        setLoading(false)
      }
      setLoadedSession(session)
    })
  }, [])

  if (loading) {
    return <p className={classes.profile}>loading...</p>
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
