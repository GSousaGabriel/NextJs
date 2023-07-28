"use client"

import { PropsWithChildren } from "react";
import MainNavigation from "./main-navigation";

export default function Layout(props: PropsWithChildren) {
    return (
        <>
            <MainNavigation />
            <main>{props.children}</main>
        </>
    )
}