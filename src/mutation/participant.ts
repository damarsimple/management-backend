import builder from '@src/builder'
import prisma from '@src/db'

builder.mutationFields((t) => ({
    createParticipant: t.prismaField({
        type: 'Participant',
        args: {
            userId: t.arg.int({ required: true }),
            eventId: t.arg.int({ required: true }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.participant.create({
                data: {
                    userId: args.userId,
                    eventId: args.eventId,
                },
            })
        },
    }),

    updateParticipant: t.prismaField({
        type: 'Participant',
        args: {
            id: t.arg.int({ required: true }),
            userId: t.arg.int({ required: false }),
            eventId: t.arg.int({ required: false }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.participant.update({
                where: { id: args.id },
                data: {
                    userId: args.userId || undefined,
                    eventId: args.eventId || undefined,
                },
            })
        },
    }),

    deleteParticipant: t.prismaField({
        type: 'Participant',
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.participant.delete({
                where: { id: args.id },
            })
        },
    }),
}))
