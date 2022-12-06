import axios from 'axios'
import {
    existsSync,
    mkdirSync,
    readFileSync,
    writeFile,
    writeFileSync,
} from 'fs'
import sharp from 'sharp'
import prisma from './db'
import { convert } from './modules/pdf'
import chunk from 'lodash/chunk'

async function main() {
    const dataBooks = readFileSync('seeds/books.json')
    const books = JSON.parse(dataBooks.toString())

    const d2: any = books[2]['data'] ?? { data: [] }

    let index = 0

    for (const books of chunk(d2, 6)) {
        const promises = books.map(async (book: any) => {
            try {
                if (book.type !== '1') {
                    console.log(
                        `Skipping ${book.title} (${index++}/${d2.length})`
                    )
                    return
                }
                console.log(`downloading ${book.slug}`)

                const filePath = `pdfsource/${book.slug}.pdf`

                if (!existsSync(filePath)) {
                    const req = await axios.get(book.pdf, {
                        responseType: 'arraybuffer',
                    })

                    writeFileSync(filePath, req.data)
                }

                console.log(`downloaded ${book.slug}`)

                const pdfArray = await convert(readFileSync(filePath), {
                    output_scale: 1.5,
                })
                console.log(`converted ${book.slug}`)
                const images = [] as string[]

                // create dir
                const dir = `public/images/${book.slug}`

                mkdirSync(dir, { recursive: true })

                for (let i = 1; i < pdfArray.length; i++) {
                    const saved = `${dir}/${i}.webp`

                    if (!existsSync(saved)) {
                        continue
                    }

                    const webp = await sharp(pdfArray[i]).webp().toBuffer()

                    writeFileSync(saved, webp)
                    images.push(saved)
                }

                const bookDb = await prisma.book.findFirst({
                    where: {
                        slug: book.slug,
                    },
                })

                if (bookDb) {
                    await prisma.book.update({
                        where: {
                            id: bookDb.id,
                        },
                        data: {
                            images: {
                                set: images.map((i) => i.replace('public', '')),
                            },
                        },
                    })

                    console.log(`updated ${book.slug}`)
                }

                console.log(`${index++}/${d2.length} ${book.slug} `)
            } catch (e) {
                console.log(`${index++}/${d2.length} ${book.slug} ${e}`)
            }
        })

        await Promise.all(promises)

        console.log('done chunk of 5')
    }
}

main()
