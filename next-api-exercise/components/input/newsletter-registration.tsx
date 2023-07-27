import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import classes from './newsletter-registration.module.css';
import { newsletterResgistration } from '@/helpers/api-util';
import NotificationContext from '@/store/notification-context';

function NewsletterRegistration() {
  const [addError, setAddError] = useState<string>()
  const [buttonLabel, setButtonLabel] = useState<string>('Register')
  const [email, setEmail] = useState<string>()

  const notificationCtx = useContext(NotificationContext)

  async function registrationHandler(event: FormEvent) {
    event.preventDefault();

    if (email) {
      setButtonLabel('Subscribing...')

      notificationCtx.showNotification({
        title: 'Signing Up...',
        message: 'Registering to newsletter',
        status: 'pending'
      })

      try {
        const result = await newsletterResgistration(email)
        if (result.success) {
          setEmail('')

          notificationCtx.showNotification({
            title: 'Success!',
            message: result.message,
            status: 'success'
          })
        }
      } catch (e) {
        setAddError(classes.error)
        notificationCtx.showNotification({
          title: 'Failed!',
          message: (e as Error).message || 'Failed to register',
          status: 'error'
        })
      }finally{
        setButtonLabel('Register')
      }
    }

  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            className={addError && classes.error}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            onChange={onChangeHandler}
            value={email}
          />
          <button disabled={buttonLabel === "Subscribing..." && true}>{buttonLabel}</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
