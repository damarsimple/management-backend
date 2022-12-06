import builder from '@src/builder'
import prisma from '@src/db'

builder.queryFields((t) => ({
    categories: t.prismaField({
        type: ['User'],
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
            return prisma.user.findMany({
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
    category: t.prismaField({
        type: 'User',
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.user.findUniqueOrThrow({
                where: { id: args.id },
            })
        },
    }),
}))
