import builder from '@src/builder'
import prisma from '@src/db'
import { comparePassword } from '@src/modules/hash'
import { generateToken } from '@src/modules/token'
import { AuthPayload } from '@src/object/authPayload'

builder.mutationType({
    fields: (t) => ({
        login: t.field({
            type: AuthPayload,
            args: {
                email: t.arg.string({
                    required: true,
                }),
                password: t.arg.string({
                    required: true,
                }),
            },
            resolve: async (_, args) => {
                const user = await prisma.user.findFirst({
                    where: {
                        email: args.email,
                    },
                })

                if (!user) {
                    return {
                        status: false,
                        message: 'Pengguna tidak ditemukan',
                    }
                }

                const checkPassword = comparePassword(
                    args.password,
                    user.password
                )

                if (!checkPassword) {
                    return {
                        status: false,
                        message: 'Kata sandi salah',
                    }
                }

                const token = await generateToken(user)

                return {
                    status: true,
                    token,
                    message: 'Berhasil masuk',
                    user,
                }
            },
        }),

        register: t.field({
            type: AuthPayload,
            args: {
                email: t.arg.string({
                    required: true,
                }),
                password: t.arg.string({
                    required: true,
                }),
                name: t.arg.string({
                    required: true,
                }),
                username: t.arg.string({
                    required: true,
                }),
            },
            resolve: async (_, args) => {
                let user = await prisma.user.findFirst({
                    where: {
                        email: args.email,
                    },
                })

                if (user) {
                    return {
                        status: false,
                        message: 'Pengguna sudah terdaftar',
                    }
                }

                user = await prisma.user.create({
                    data: {
                        ...args,
                    },
                })

                const token = await generateToken(user)

                return {
                    status: true,
                    token,
                    message: 'Berhasil masuk',
                    user,
                }
            },
        }),
    }),
})
