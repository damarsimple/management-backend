import { BookingStatus } from '@prisma/client'
import builder from '@src/builder'

export const BookingStatusObj = builder.enumType(BookingStatus, {
    name: 'BookingStatus',
})

export const Booking = builder.prismaObject('Booking', {
    fields: (t) => ({
        id: t.exposeID('id'),

        createdAt: t.expose('createdAt', { type: 'Date' }),
        updatedAt: t.expose('updatedAt', { type: 'Date' }),

        studio: t.relation('studio'),
        studioId: t.exposeID('studioId'),

        performer: t.relation('performer'),
        performerId: t.exposeID('performerId'),

        startAt: t.expose('startAt', { type: 'Date' }),
        endAt: t.expose('endAt', { type: 'Date' }),

        price: t.expose('price', { type: 'Float' }),

        description: t.exposeString('description', { nullable: true }),

        status: t.expose('status', { type: BookingStatus }),
    }),
})
