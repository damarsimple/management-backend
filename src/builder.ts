import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import type PrismaTypes from '@pothos/plugin-prisma/generated'
import { User } from '@prisma/client'
import prisma from '@src/db'
import ScopeAuthPlugin from '@pothos/plugin-scope-auth'

type Context = {
    user: User | null
}
const builder = new SchemaBuilder<{
    PrismaTypes: PrismaTypes
    Scalars: {
        Date: {
            Input: Date
            Output: Date
        }
    }
    Context: Context
    AuthScopes: {
        loggedIn: boolean
    }
    AuthContexts: {
        loggedIn: Context & { user: User }
    }
}>({
    plugins: [PrismaPlugin, ScopeAuthPlugin],
    prisma: {
        client: prisma,
        exposeDescriptions: true,
        filterConnectionTotalCount: true,
    },
    authScopes: async (context) => ({
        loggedIn: !!context.user,
    }),
})

builder.scalarType('Date', {
    serialize: (n) => n,
    parseValue: (n: unknown) => new Date(n as string),
})

export default builder
