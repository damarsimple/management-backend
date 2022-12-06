import { EmployeeStudioRole } from '@prisma/client'
import builder from '@src/builder'
import prisma from '@src/db'

const EmployeeStudioInput = builder.inputType('EmployeeStudioInput', {
    fields: (t) => ({
        employeeId: t.int({ required: true }),
        role: t.field({ type: EmployeeStudioRole, required: true }),
    }),
})

builder.mutationFields((t) => ({
    createStudio: t.prismaField({
        type: 'Studio',
        args: {
            name: t.arg.string({ required: true }),
            avatar: t.arg.string({ required: false }),
            employees: t.arg({ required: false, type: [EmployeeStudioInput] }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.studio.create({
                data: {
                    name: args.name,
                    avatar: args.avatar,
                    employees: {
                        createMany: {
                            data:
                                args.employees?.map((employee) => ({
                                    employeeId: employee.employeeId,
                                    role: employee.role,
                                })) ?? [],
                        },
                    },
                },
            })
        },
    }),

    updateStudio: t.prismaField({
        type: 'Studio',
        args: {
            id: t.arg.int({ required: true }),
            name: t.arg.string({ required: false }),
            avatar: t.arg.string({ required: false }),
            employees: t.arg({ required: false, type: [EmployeeStudioInput] }),
        },
        resolve: async (query, root, args, ctx, info) => {
            const existing = prisma.studio.findUniqueOrThrow({
                where: { id: args.id },
                include: { employees: true },
            })

            const newEmployees =
                args.employees?.map((employee) => ({
                    employeeId: employee.employeeId,
                    role: employee.role,
                })) ?? []

            const employeesToDelete = (await existing.employees()).filter(
                (employee) => {
                    return !newEmployees.some(
                        (newEmployee) => newEmployee.employeeId === employee.id
                    )
                }
            )

            return prisma.studio.update({
                where: { id: args.id },
                data: {
                    name: args.name ?? undefined,
                    avatar: args.avatar ?? undefined,
                    employees: {
                        deleteMany: {
                            id: {
                                in: employeesToDelete.map(
                                    (employee) => employee.id
                                ),
                            },
                        },

                        createMany: {
                            data: newEmployees,
                        },
                    },
                },
            })
        },
    }),

    deleteStudio: t.prismaField({
        type: 'Studio',
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: (query, root, args, ctx, info) => {
            return prisma.studio.delete({
                where: { id: args.id },
            })
        },
    }),
}))
