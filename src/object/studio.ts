import builder from '@src/builder'

export const Studio = builder.prismaObject('Studio', {
    fields: (t) => ({
        id: t.exposeID('id'),

        createdAt: t.expose('createdAt', { type: 'Date' }),
        updatedAt: t.expose('updatedAt', { type: 'Date' }),

        name: t.exposeString('name'),
        avatar: t.exposeString('avatar', {
            nullable: true,
        }),

        bookings: t.relation('bookings'),
        employees: t.relation('employees'),
        events: t.relation('events'),
    }),
})
