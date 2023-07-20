import Image from "next/image"
import classes from "./EventItem.module.css"
import Button from "../UI/Button"
import DateIcon from "../icons/DateIcon"
import AddressIcon from "../icons/AddressIcon"
import ArrowRightIcon from "../icons/ArrowRightIcon"

function EventItem(props: EventInterface) {
    const { title, image, date, location, id } = props
    const formatedDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: '2-digit',
        year: 'numeric'
    })
    const formatedAddress = location.replace(',', '\n')

    return (
        <li className={classes.item}>
            <Image src={'/' + image} alt={title} width='100' height='100' />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{formatedDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{formatedAddress}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={`events/${id}`}>
                        <span>Explore event</span>
                        <span className={classes.icon}><ArrowRightIcon /></span>
                    </Button>
                </div>
            </div>
        </li>
    )
}

export default EventItem
