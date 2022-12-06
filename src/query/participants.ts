import builder from '@src/builder'
import prisma from '@src/db'

builder.queryFields((t) => ({
    participants: t.prismaField({
        type: ['Participant'],
        args: {
            take: t.arg.int({
                required: false,
            }),

            skip: t.arg.int({
                required: false,
            }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.participant.findMany({
                take: args.take || undefined,
                skip: args.skip || undefined,
            })
        },
    }),
    participant: t.prismaField({
        type: 'Participant',
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.participant.findUniqueOrThrow({
                where: { id: args.id },
            })
        },
    }),
}))
