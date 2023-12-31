"use client"

import Image from "next/image";
import classes from './hero.module.css'

export default function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src='/images/site/your-image-here.jpg' alt="Site owner" width={300} height={300} />
            </div>
            <h1>Hi, I&apos;m Gabriel</h1>
            <p>I blog about web development - especially frontend frameworks like angular or react</p>
        </section>
    )
}