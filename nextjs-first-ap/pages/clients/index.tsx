import classes from '@/styles/Home.module.css'
import Link from 'next/link'

const ClientsPage = () => {
    const clients = [
        {
            id: 1,
            name: 'Gabriel'
        },
        {
            id: 2,
            name: 'Bruno'
        },
        {
            id: 3,
            name: 'Roger'
        }
    ]

    return (
        <div>
            <h1 className={classes.userWelcome}>clients page</h1>
            <ul>
                {clients.map(client => (
                <li key={client.id}>
                    <Link href={{
                        pathname: 'clients/[clientId]',
                        query: {clientId: client.id}
                        }}>{client.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ClientsPage