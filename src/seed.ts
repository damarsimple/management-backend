import 'module-alias/register'
import prisma from '@src/db'
import { readFileSync } from 'fs'
async function main() {
    const books = await prisma.book.findMany()

    await prisma.agencyBookLoan.createMany({
        data: books.map((book) => ({
            bookId: book.id,
            agencyId: 19,
            stock: 10,
        })),
    })

    // const dataBanners = readFileSync('seeds/banners.json', 'utf-8')
    // const banners = JSON.parse(dataBanners)
    // for (const banner of banners) {
    //     await prisma.banner.create({
    //         data: {
    //             title: banner.name,
    //             content: banner.image,
    //             action: banner.link,
    //             tag: 'GLOBAL',
    //         },
    //     })
    // }

    // const dataAgencies = readFileSync('seeds/agencies.json')
    // const agencies = JSON.parse(dataAgencies.toString())

    // const d: any = agencies[2]['data'] ?? { data: [] }

    // await prisma.agency.createMany({
    //     data: d.map((a) => ({
    //         id: parseInt(a['id']),
    //         name: a.name,
    //         address: a.address ?? 'undefine',
    //         email: a.email,
    //         password: 'password',
    //         phone: a.phone,
    //         logo: a.logo,
    //         organizer_app: a.organizer_app,
    //         organizer_phone: a.organizer_phone,
    //     })),
    // })

    // console.log('done 1')

    // const dataCategory = readFileSync('seeds/category.json')
    // const categories = JSON.parse(dataCategory.toString())

    // const d6: any = categories[2]['data'] ?? { data: [] }

    // await prisma.bookCategory.createMany({
    //     data: d6.map((a) => ({
    //         id: parseInt(a.id),
    //         name: a.name,
    //         slug: a.slug,
    //         image: a.image,
    //     })),
    // })
    // console.log('done 2')
    // const dataSubCategory = readFileSync('seeds/sub_categories.json')
    // const subcategories = JSON.parse(dataSubCategory.toString())

    // const d7: any = subcategories[2]['data'] ?? { data: [] }

    // await prisma.bookSubCategory.createMany({
    //     data: d7.map((a) => ({
    //         name: a.name,
    //         categoryId: parseInt(a.category_id),
    //     })),
    // })
    // console.log('done 3')
    // const dataPublishers = readFileSync('seeds/publishers.json')
    // const publishers = JSON.parse(dataPublishers.toString())

    // const d4: any = publishers[2]['data'] ?? { data: [] }

    // await prisma.publisher.createMany({
    //     data: d4.map((a) => ({
    //         id: parseInt(a.id),
    //         name: a.name,
    //         logo: a.logo,
    //         phone: a.phone,
    //         email: a.email,
    //         address: a.address,
    //     })),
    // })
    // console.log('done 4')
    // const dataBooks = readFileSync('seeds/books.json')
    // const books = JSON.parse(dataBooks.toString())

    // const d2: any = books[2]['data'] ?? { data: [] }

    // for (const a of d2) {
    //     const d = {
    //         slug: a.slug,
    //         title: a.title,
    //         cover: a.cover,
    //         description: a.description ?? '',
    //         duration: parseInt(a.page),
    //         language: a.language ?? 'Indonesia',
    //         price: parseFloat(a.price ?? 0),
    //         rate: 0,
    //         yearPublished: parseInt(a.publication_year) ?? 2022,
    //         isbn: a.isbn,
    //         author: a.writer ?? 'n/a',
    //         publisherId: parseInt(a.publisher_id),
    //         categories: a.category_id
    //             ? {
    //                   connect: { id: parseInt(a.category_id) },
    //               }
    //             : undefined,
    //         subcategories: a.sub_category_id
    //             ? {
    //                   connect: { id: parseInt(a.sub_category_id) },
    //               }
    //             : undefined,
    //     }

    //     try {
    //         await prisma.book.create({ data: d })
    //     } catch (error) {
    //         console.log(d)
    //     }
    // }
    // const dataBooksW = readFileSync('seeds/books_wates.json')
    // const booksW = JSON.parse(dataBooksW.toString())

    // const d5: any = booksW[2]['data'] ?? { data: [] }

    // const agency = await prisma.agency.findFirst({
    //     where: {
    //         name: 'SMAN 1 BABAKAN MADANG',
    //     },
    // })

    // if (!agency) {
    //     return
    // }

    // for (const a of d5) {
    //     const book = await prisma.book.findFirst({
    //         where: {
    //             slug: a.slug,
    //         },
    //     })

    //     if (!book) {
    //         console.log(a)
    //         continue
    //     }

    //     await prisma.agencyBookLoan.create({
    //         data: {
    //             agencyId: agency.id,
    //             bookId: book.id,
    //             stock: parseInt(a.total ?? 0) ?? 0,
    //             loaned: 0,
    //         },
    //     })
    // }

    // const dataUSERS = readFileSync('seeds/users.json')
    // const users = JSON.parse(dataUSERS.toString())

    // const d1: any = users[2]['data'] ?? { data: [] }

    // for (const a of d1) {
    //     const d = {
    //         name: a.name,
    //         username: a.username ?? 'n/a',
    //         email: a.email,
    //         avatar: a.avatar,
    //         password: '123',
    //         phone: a.phone,
    //         address: a.address,
    //         gender: a.gender == 'male' ? 'MALE' : 'FEMALE',
    //         // dateOfBirth: a.date_of_birth,
    //         agencyId: agency.id,
    //     } as any

    //     try {
    //         await prisma.user.create({ data: d })
    //     } catch (error) {
    //         console.log(d)
    //         console.log(error)
    //     }
    // }
    // console.log('done 2')

    // console.log('done')
}

main()
