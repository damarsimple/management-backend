import builder from '@src/builder'
import prisma from '@src/db'

builder.queryFields((t) => ({
    studios: t.prismaField({
        type: ['Studio'],
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
            return prisma.studio.findMany({
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
    studio: t.prismaField({
        type: 'Studio',
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.studio.findUniqueOrThrow({
                where: { id: args.id },
            })
        },
    }),
}))
