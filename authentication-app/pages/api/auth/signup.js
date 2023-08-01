import { hashPass } from "../../../lib/auth"
import { connectToClient } from "../../../lib/db"


async function handler(req, res) {
    if (req.method === "POST") {
        const result = await createUser(req.body)

        res.status(result.status).json({
            message: result.message
        })
        return
    }
}

async function createUser({ email, pass }) {
    const client = await connectToClient()
    const db = client.db('Blog')
    const collection = db.collection('users')

    if (!email || !email.includes("@") || !pass || pass.trim().length < 7) {
        client.close()
        return {
            status: 422,
            message: "Invalid input - please insert a valid email and a password longer than 7 characteres"
        }
    }

    if (await checkUser(email)) {
        client.close()
        return {
            status: 422,
            message: "User already exists!"
        }
    }

    const hashedPass = await hashPass(pass)
    const data = await collection.insertOne({ email, pass: hashedPass })
    client.close()
    return {
        status: 201,
        message: "User created!"
    }
}

async function checkUser(email) {
    const client = await connectToClient()
    const db = client.db('Blog')
    const collection = db.collection('users')

    const existingUser = await collection.findOne({ email })
    console.log(existingUser)

    if (existingUser) {
        return true
    }
    return false
}

export default handler