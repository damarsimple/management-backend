import builder from '@src/builder'
import prisma from '@src/db'

builder.queryField('me', (t) =>
    t.prismaField({
        type: 'User',
        nullable: true,
        resolve: async (query, root, args, ctx, info) =>
            ctx.user?.id
                ? prisma.user.findFirstOrThrow({
                      where: {
                          id: ctx.user.id,
                      },
                  })
                : null,
    })
)
