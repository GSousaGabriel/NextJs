import NextAuth from 'next-auth'
import CredentialsProvider  from 'next-auth/providers/credentials'
import { connectToClient } from '../../../lib/db'

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            session: {
                jwt: true
            },
            async authorize(credentials) {
                console.log('easdhao')
                const client = await connectToClient()
                const db = client.db('Blog')
                const collection = db.collection('users')

                const user = await collection.findOne({ email: credentials.email })

                if (!user) {
                    throw new Error('User or password incorrect!')
                }

                const isValidPass = await comparePass(credentials.pass, user.pass)

                if (!isValidPass) {
                    throw new Error('User or password incorrect!')
                }

                client.close()

                return { email: user.email }
            }
        })
    ]
})