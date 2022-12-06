import builder from '@src/builder'
import prisma from '@src/db'

builder.mutationFields((t) => ({
    createReview: t.prismaField({
        type: 'Review',
        args: {
            reviewerId: t.arg.int({ required: true }),
            reviewedId: t.arg.int({ required: true }),
            rating: t.arg.int({ required: true }),
            comment: t.arg.string({ required: false }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.review.create({
                data: {
                    reviewerId: args.reviewerId,
                    reviewedId: args.reviewedId,
                    rating: args.rating,
                    comment: args.comment,
                },
            })
        },
    }),

    updateReview: t.prismaField({
        type: 'Review',
        args: {
            id: t.arg.int({ required: true }),
            rating: t.arg.int({ required: false }),
            comment: t.arg.string({ required: false }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.review.update({
                where: { id: args.id },
                data: {
                    rating: args.rating || undefined,
                    comment: args.comment || undefined,
                },
            })
        },
    }),

    deleteReview: t.prismaField({
        type: 'Review',
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.review.delete({
                where: { id: args.id },
            })
        },
    }),
}))
