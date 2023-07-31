"use client"

import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface INotification {
    title: string,
    message: string,
    status: string
}
let initialState: INotification | undefined

const NotificationContext = createContext({
    notification: initialState,
    showNotification: (notificationData: INotification) => { },
    hideNotification: () => { }
})

const NotificationContextProvider = (props: PropsWithChildren) => {
    const [activeNotification, setActiveNotification] = useState<INotification>()

    useEffect(() => {
        if (activeNotification && (activeNotification.status === "success" || activeNotification.status === "error")) {
            const timer = setTimeout(() => {
                setActiveNotification(undefined)
            }, 3000);

            return () => { clearTimeout(timer) }
        }
    }, [activeNotification])

    const showNotificationHandler = (notificationData: INotification) => {
        setActiveNotification({
            title: notificationData.title,
            message: notificationData.message,
            status: notificationData.status
        })
    }
    const hideNotificationHandler = () => {
        setActiveNotification(undefined)
    }

    const context = { notification: activeNotification, showNotification: showNotificationHandler, hideNotification: hideNotificationHandler }

    return (
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    )

}

export default NotificationContext
export { NotificationContextProvider }