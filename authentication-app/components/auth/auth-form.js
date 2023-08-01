import { useRef, useState } from 'react';
import classes from './auth-form.module.css';
import { signIn } from 'next-auth/react';

async function createUser(email, pass) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, pass }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Ops. Something went wrong!')
  }
  const data = response.json()

  return data
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailInput = useRef()
  const passInput = useRef()

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(e) {
    e.preventDefault()
    const email = emailInput.current.value
    const pass = passInput.current.value

    if (isLogin) {
      const result = await signIn({
        email,
        pass,
        profile: null,
        email: null,
        credentials: 'credentials'
      })

      if (result.error) {
        console.log(result.error)
        return
      }

    } else {
      try {
        const result = await createUser(email, pass)
        console.log(result)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInput} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passInput} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
