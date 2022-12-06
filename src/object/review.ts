import builder from '@src/builder'

export const Review = builder.prismaObject('Review', {
    fields: (t) => ({
        id: t.exposeID('id'),

        createdAt: t.expose('createdAt', { type: 'Date' }),
        updatedAt: t.expose('updatedAt', { type: 'Date' }),

        reviewer: t.relation('reviewer'),

        reviewed: t.relation('reviewed'),

        rating: t.exposeInt('rating'),

        comment: t.exposeString('comment', {
            nullable: true,
        }),
    }),
})
