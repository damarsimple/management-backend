import { EmployeeStudioRole } from '@prisma/client'
import builder from '@src/builder'
import prisma from '@src/db'

builder.mutationFields((t) => ({
    createEmployee: t.prismaField({
        type: 'EmployeeStudio',
        args: {
            studioId: t.arg.int({ required: true }),
            employeeId: t.arg.int({ required: true }),
            role: t.arg({ type: EmployeeStudioRole, required: true }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.employeeStudio.create({
                data: {
                    studioId: args.studioId,
                    employeeId: args.employeeId,
                    role: args.role,
                },
            })
        },
    }),

    updateEmployee: t.prismaField({
        type: 'EmployeeStudio',
        args: {
            id: t.arg.int({ required: true }),
            role: t.arg({ type: EmployeeStudioRole, required: false }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.employeeStudio.update({
                where: { id: args.id },
                data: {
                    role: args.role || undefined,
                },
            })
        },
    }),

    deleteEmployee: t.prismaField({
        type: 'EmployeeStudio',
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.employeeStudio.delete({
                where: { id: args.id },
            })
        },
    }),
}))
