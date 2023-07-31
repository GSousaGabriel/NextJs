"use client"

import { FormEvent, useContext, useState } from 'react'
import classes from './contact-form.module.css'
import NotificationContext from '@/store/notification-context'
import Notification from '../ui/notification'

async function sendContactData(contactData: { email: string, name: string, message: string }) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactData),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error('Error on server side')
    }
    const data = await response.json()
}

export default function ContactForm() {
    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredName, setEnteredName] = useState('')
    const [enteredMessage, setEnteredMessage] = useState('')
    const notificationCtx = useContext(NotificationContext)

    async function sendMessageHandler(e: FormEvent) {
        e.preventDefault()

        notificationCtx.showNotification({
            title: "Sending message...",
            message: "Your message is being sent...",
            status: 'pending'
        })

        try {
            const data = await sendContactData({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage,
            })

            notificationCtx.showNotification({
                title: "Message sent!",
                message: "Your message has been sent!",
                status: 'success'
            })

            resetData()

        } catch (e) {
            notificationCtx.showNotification({
                title: "Error sending the message",
                message: (e as Error).message,
                status: 'error'
            })
        }
    }

    const resetData = () => {
        setEnteredEmail('')
        setEnteredMessage('')
        setEnteredName('')
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor='email'>Your email</label>
                        <input type='email' id='email' name='email' value={enteredEmail} onChange={(event) => setEnteredEmail(event.target.value)} required />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='name'>Your name</label>
                        <input type='text' id='name' name='name' value={enteredName} onChange={(event) => setEnteredName(event.target.value)} required />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor='message'>Your message</label>
                    <textarea id='message' name='message' value={enteredMessage} onChange={(event) => setEnteredMessage(event.target.value)} required></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Send message</button>
                </div>
            </form>
            {notificationCtx.notification && <Notification status={notificationCtx.notification.status} title={notificationCtx.notification.title} message={notificationCtx.notification.message} />}
        </section>
    )
}