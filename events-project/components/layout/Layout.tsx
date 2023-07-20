import { PropsWithChildren } from "react"
import MainHeader from "./MainHeader"

const Layout = (props: PropsWithChildren) => {
    return (
        <>
            <MainHeader />
            <main>
                {props.children}
            </main>
        </>
    )
}

export default Layout