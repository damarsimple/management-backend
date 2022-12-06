import 'module-alias/register'
import schema from '@src/schema'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import { json } from 'body-parser'
import { verifyToken } from '@src/modules/token'
async function main() {
    const app = express()
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
        schema: await schema(),
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })
    await server.start()
    app.use(express.static('public'))
    app.use(
        '/graphql',

        cors<cors.CorsRequest>({
            origin: [
                'https://studio.apollographql.com',
            ],
        }),

        json(),

        expressMiddleware(server, {
            context: async ({ req }) => {
                const token = req.headers.authorization?.split(' ')[1]

                return {
                    user: token ? await verifyToken(token) : undefined,
                }
            },
        })
    )

    await new Promise((resolve) =>
        httpServer.listen({ port: 4000 }, () => {
            console.log('🚀 Server ready at http://localhost:4000/graphql')
            resolve(true)
        })
    )
}

main()
