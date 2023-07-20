import classes from '@/styles/Home.module.css'
import { useRouter } from 'next/router'

const ProjectClientPage = () => {
    const router= useRouter()

    return (
        <div>
            <h1 className={classes.userWelcome}>Selected Project {router.query.clientProjId} of client {router.query.clientId} page</h1>
        </div>
    )
}

export default ProjectClientPage