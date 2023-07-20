import Link from "next/link"
import { PropsWithChildren } from "react"
import classes from './MainHeader.module.css'

const MainHeader = (props: PropsWithChildren) => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link href={''}>NextEvents</Link>
            </div>
            <nav className={classes.navigation}>
                <ul>
                    <li>
                        <Link href={'/events'}>Browse all events</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainHeader