import builder from '@src/builder'
import prisma from '@src/db'

builder.queryFields((t) => ({
    events: t.prismaField({
        type: ['Event'],
        args: {
            take: t.arg.int({
                required: false,
            }),

            skip: t.arg.int({
                required: false,
            }),

            name: t.arg.string({
                required: false,
            }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.event.findMany({
                take: args.take || undefined,
                skip: args.skip || undefined,

                where: {
                    name: {
                        contains: args.name || undefined,
                        mode: 'insensitive',
                    },
                },
            })
        },
    }),
    event: t.prismaField({
        type: 'Event',
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.event.findUniqueOrThrow({
                where: { id: args.id },
            })
        },
    }),
}))
