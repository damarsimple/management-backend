import { User as UserType } from '@prisma/client'
import builder from '@src/builder'
import { User } from './user'

export const AuthPayload = builder.objectRef<{
    status: boolean
    token?: string
    message?: string
    user?: UserType
}>('AuthPayload')

builder.objectType(AuthPayload, {
    name: 'AuthPayload',
    fields: (t) => ({
        status: t.exposeBoolean('status'),
        token: t.exposeString('token', {
            nullable: true,
        }),
        message: t.exposeString('message', {
            nullable: true,
        }),
        user: t.field({
            type: User,
            nullable: true,
            resolve: (root) => root.user,
        }),
    }),
})
