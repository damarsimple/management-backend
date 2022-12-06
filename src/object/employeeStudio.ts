import { EmployeeStudioRole } from '@prisma/client'
import builder from '@src/builder'

const EmployeeStudioRoleObj = builder.enumType(EmployeeStudioRole, {
    name: 'EmployeeStudioRole',
    description: 'The role of the employee in the studio',
})

export const EmployeeStudio = builder.prismaObject('EmployeeStudio', {
    fields: (t) => ({
        id: t.exposeID('id'),

        createdAt: t.expose('createdAt', { type: 'Date' }),
        updatedAt: t.expose('updatedAt', { type: 'Date' }),

        studio: t.relation('studio'),
        studioId: t.exposeID('studioId'),

        employee: t.relation('employee'),
        employeeId: t.exposeID('employeeId'),

        role: t.expose('role', {
            type: EmployeeStudioRole,
        }),
    }),
})
