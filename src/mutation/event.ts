import builder from '@src/builder'
import prisma from '@src/db'

builder.mutationFields((t) => ({
    createEvent: t.prismaField({
        type: 'Event',
        args: {
            name: t.arg.string({ required: true }),
            description: t.arg.string({ required: false }),
            startAt: t.arg.string({ required: true }),
            endAt: t.arg.string({ required: true }),
            studioId: t.arg.int({ required: true }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.event.create({
                data: {
                    name: args.name,
                    description: args.description,
                    startAt: args.startAt,
                    endAt: args.endAt,
                    studioId: args.studioId,
                },
            })
        },
    }),

    updateEvent: t.prismaField({
        type: 'Event',
        args: {
            id: t.arg.int({ required: true }),
            name: t.arg.string({ required: false }),
            description: t.arg.string({ required: false }),
            startAt: t.arg.string({ required: false }),
            endAt: t.arg.string({ required: false }),
            studioId: t.arg.int({ required: false }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.event.update({
                where: { id: args.id },
                data: {
                    name: args.name || undefined,
                    description: args.description || undefined,
                    startAt: args.startAt || undefined,
                    endAt: args.endAt || undefined,
                    studioId: args.studioId || undefined,
                },
            })
        },
    }),

    deleteEvent: t.prismaField({
        type: 'Event',
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.event.delete({
                where: { id: args.id },
            })
        },
    }),
}))
