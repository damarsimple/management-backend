import builder from '@src/builder'

export const Participant = builder.prismaObject('Participant', {
    fields: (t) => ({
        id: t.exposeID('id'),

        createdAt: t.expose('createdAt', { type: 'Date' }),
        updatedAt: t.expose('updatedAt', { type: 'Date' }),

        user: t.relation('user'),
        userId: t.exposeID('userId'),

        event: t.relation('event'),
        eventId: t.exposeID('eventId'),
    }),
})
