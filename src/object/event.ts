import builder from '@src/builder'

export const Event = builder.prismaObject('Event', {
    fields: (t) => ({
        id: t.exposeID('id'),
        name: t.exposeString('name'),
        description: t.exposeString('description', {
            nullable: true,
        }),
        startAt: t.expose('startAt', { type: 'Date' }),
        endAt: t.expose('endAt', { type: 'Date' }),

        cretedAt: t.expose('createdAt', { type: 'Date' }),
        updatedAt: t.expose('updatedAt', { type: 'Date' }),

        studio: t.relation('studio'),
        studioId: t.exposeID('studioId'),

        participants: t.relation('participants'),
    }),
})
