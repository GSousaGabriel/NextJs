import { hash, compare } from 'bcryptjs'

export async function hashPass(pass) {
    const hashedPass = await hash(pass, 12)

    return hashedPass
}
export async function comparePass(inputPass, pass) {
    const isEqual = await compare(inputPass, pass)

    return isEqual
}