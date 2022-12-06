import builder from '@src/builder'
import prisma from '@src/db'

builder.queryFields((t) => ({
    bookings: t.prismaField({
        type: ['Booking'],
        args: {
            take: t.arg.int({
                required: false,
            }),

            skip: t.arg.int({
                required: false,
            }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.booking.findMany({
                take: args.take || undefined,
                skip: args.skip || undefined,
            })
        },
    }),
    bookin: t.prismaField({
        type: 'Booking',
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.booking.findUniqueOrThrow({
                where: { id: args.id },
            })
        },
    }),
}))
