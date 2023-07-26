import { ChangeEvent, FormEvent, useState } from 'react';
import classes from './newsletter-registration.module.css';
import { newsletterResgistration } from '@/helpers/api-util';

function NewsletterRegistration() {
  const [addError, setAddError] = useState<string>()
  const [buttonLabel, setButtonLabel] = useState<string>('Register')
  const [email, setEmail] = useState<string>()
  const [message, setMessage] = useState<string>()

  async function registrationHandler(event: FormEvent) {
    event.preventDefault();

    if (email) {
      setButtonLabel('Subscribing...')

      const result = await newsletterResgistration(email)
      if (result.success) {
        setEmail('')
      }
      setButtonLabel('Register')
      setMessage(result.message)
    } else {
      setAddError(classes.error)
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
          <p>{message}</p>
          <button disabled={buttonLabel === "Subscribing..." && true}>{buttonLabel}</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
