import fg from 'fast-glob'

export default async function load() {
    const files = await fg('src/{mutation,object,query}/*.ts', {})

    for (const file of files) {
        await require('@' + file.replace(/\.(js|ts)$/, ''))
    }
}
