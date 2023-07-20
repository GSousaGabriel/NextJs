import classes from '@/styles/Home.module.css'
import { useRouter } from 'next/router'

const ProjectsClientPage = () => {
    const router= useRouter()

    const autoLoad= ()=>{
        // router.push(`${router.query.clientId}/A`)
        router.push({
            pathname:'[clientId]/[clientProjId]',
            query:{clientId: router.query.clientId, clientProjId: 'A'}
        })
    }

    return (
        <div>
            <h1 className={classes.userWelcome}>Projects of client {router.query.clientId} page</h1>
            <button onClick={autoLoad}>Load Project A automatically</button>
        </div>
    )
}

export default ProjectsClientPage