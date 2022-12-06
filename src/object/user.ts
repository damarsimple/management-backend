import { UserType } from '@prisma/client'
import builder from '@src/builder'

export const UserTypeObj = builder.enumType(UserType, {
    name: 'UserType',
    description: 'The type of the user',
})

export const User = builder.prismaObject('User', {
    fields: (t) => ({
        id: t.exposeID('id'),
        email: t.exposeString('email'),
        name: t.exposeString('name', {
            nullable: true,
        }),
        avatar: t.exposeString('avatar', {
            nullable: true,
        }),

        createdAt: t.expose('createdAt', { type: 'Date' }),
        updatedAt: t.expose('updatedAt', { type: 'Date' }),

        type: t.expose('type', {
            type: UserType,
        }),

        bookings: t.relation('bookings'),
        employeeStudios: t.relation('employeeStudios'),
        reviewer: t.relation('reviewer'),
        reviewed: t.relation('reviewed'),
        participants: t.relation('participants'),
    }),
})
