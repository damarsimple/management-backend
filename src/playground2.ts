import axios from 'axios'
import { mkdirSync, readFileSync, writeFile, writeFileSync } from 'fs'
import sharp from 'sharp'
import prisma from './db'
import { convert } from './modules/pdf'
async function main() {
    const dataBooks = readFileSync('seeds/books.json')
    const books = JSON.parse(dataBooks.toString())

    const d2: any = books[2]['data'] ?? { data: [] }

    let index = 0
    let totalSize = 0
    for (const book of d2) {
        try {
            const req = await axios.head(book.pdf)

            // get content length
            const contentLength = req.headers['content-length']

            if (contentLength) {
                totalSize += parseInt(contentLength)
            }

            console.log(
                `checked ${book.slug} ${contentLength} (${index++}/${
                    d2.length
                })`
            )
        } catch (e) {
            console.log(`${index++}/${d2.length} ${book.slug} ${e}`)
        }
    }

    console.log(`Total size: ${totalSize / 1024 / 1024} MB`)
}

main()
