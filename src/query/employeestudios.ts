import builder from '@src/builder'
import prisma from '@src/db'

builder.queryFields((t) => ({
    categories: t.prismaField({
        type: ['EmployeeStudio'],
        args: {
            take: t.arg.int({
                required: false,
            }),

            skip: t.arg.int({
                required: false,
            }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.employeeStudio.findMany({
                take: args.take || undefined,
                skip: args.skip || undefined,
            })
        },
    }),
    category: t.prismaField({
        type: 'EmployeeStudio',
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.employeeStudio.findUniqueOrThrow({
                where: { id: args.id },
            })
        },
    }),
}))
