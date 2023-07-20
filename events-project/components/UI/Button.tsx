import Link from "next/link"
import classes from "./Button.module.css"
import { MouseEventHandler, ReactNode } from "react"

enum ButtonEnum {
    Button = "button",
    Submit = "submit",
    React = "reset"
}

function Button(props: { type?: ButtonEnum, onClick?: MouseEventHandler, link?: string, children: ReactNode }) {

    if (props.link) {
        return (
            <Link href={props.link} className={classes.btn}>
                {props.children}
            </Link>
        )
    }
    return (
        <button type={props.type} onClick={props.onClick} className={classes.btn}>{props.children}</button>
    )
}

export default Button