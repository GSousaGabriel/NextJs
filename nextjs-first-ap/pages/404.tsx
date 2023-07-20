import classes from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const NotFoundPage = () => {
    const [timer, setTimer] = useState(3)
    const router = useRouter()

    useEffect(() => {
        const countDown = setInterval(() => {
            setTimer((prevTimer) => {
                return prevTimer - 1
            })
        }, 1000)

        if (timer === 0) {
            router.back()
        }
        return () => clearInterval(countDown)
    }, [router, timer])

    return (
        <div>
            <h1 className={classes.userWelcome}>Not found page</h1>
            <h1 className={classes.userWelcome}>Going back in: {timer}</h1>
        </div>
    )
}

export default NotFoundPage