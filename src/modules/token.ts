import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './constant'

export async function generateToken(user: User) {
    const token = jwt.sign(user, JWT_SECRET, {
        expiresIn: '1d',
    })

    return token
}

export async function verifyToken(token) {
    if (!token) return null

    const data = jwt.verify(token, JWT_SECRET) as User | null

    return data
}
