import load from '@src/import'
import builder from '@src/builder'

export default async function getSchema() {
    await load()

    return builder.toSchema()
}
