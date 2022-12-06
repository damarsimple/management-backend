import { BookingStatus } from '@prisma/client'
import builder from '@src/builder'
import prisma from '@src/db'

builder.mutationFields((t) => ({
    createBooking: t.prismaField({
        type: 'Booking',
        args: {
            studioId: t.arg.int({ required: true }),
            performerId: t.arg.int({ required: true }),
            startAt: t.arg.string({ required: true }),
            endAt: t.arg.string({ required: true }),
            price: t.arg.int({ required: true }),
            description: t.arg.string({ required: false }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.booking.create({
                data: {
                    studioId: args.studioId,
                    performerId: args.performerId,
                    startAt: args.startAt,
                    endAt: args.endAt,
                    price: args.price,
                    description: args.description,
                    status: BookingStatus.PENDING,
                },
            })
        },
    }),

    updateBooking: t.prismaField({
        type: 'Booking',
        args: {
            id: t.arg.int({ required: true }),
            status: t.arg({ type: BookingStatus, required: false }),
            startAt: t.arg.string({ required: false }),
            endAt: t.arg.string({ required: false }),
            price: t.arg.float({ required: false }),
            description: t.arg.string({ required: false }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.booking.update({
                where: {
                    id: args.id,
                },
                data: {
                    status: args.status || BookingStatus.PENDING,
                    startAt: args.startAt || undefined,
                    endAt: args.endAt || undefined,
                    price: args.price || undefined,
                    description: args.description || undefined,
                },
            })
        },
    }),

    deleteBooking: t.prismaField({
        type: 'Booking',
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.booking.delete({
                where: {
                    id: args.id,
                },
            })
        },
    }),
}))
