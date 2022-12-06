// stolen from Copyright (c) 2020 Ollie Thwaites
// npm-packages : pdf-img-convert
// reason : the current version of library does not support image scaling

import Canvas from 'canvas'

import assert from 'assert'
// @ts-ignore
const pdfjs = require('pdfjs-dist/legacy/build/pdf.js')

class NodeCanvasFactory {
    create(width, height) {
        assert(width > 0 && height > 0, 'Invalid canvas size')
        const canvas = Canvas.createCanvas(width, height)
        const context = canvas.getContext('2d')
        return {
            canvas: canvas,
            context: context,
        }
    }

    reset(canvasAndContext, width, height) {
        assert(canvasAndContext.canvas, 'Canvas is not specified')
        assert(width > 0 && height > 0, 'Invalid canvas size')
        canvasAndContext.canvas.width = width
        canvasAndContext.canvas.height = height
    }

    destroy(canvasAndContext) {
        assert(canvasAndContext.canvas, 'Canvas is not specified')

        // Zeroing the width and height cause Firefox to release graphics
        // resources immediately, which can greatly reduce memory consumption.
        canvasAndContext.canvas.width = 0
        canvasAndContext.canvas.height = 0
        canvasAndContext.canvas = null
        canvasAndContext.context = null
    }
}

export const convert = async function (
    pdf: Uint8Array | Buffer,
    conversion_config = {} as {
        /** Number in px */
        width?: number
        /** Number in px */
        height?: number
        /** A list of pages to render instead of all of them */
        page_numbers?: number[]
        output_scale?: number
    }
): Promise<string[] | Uint8Array[]> {
    // Get the PDF in Uint8Array form

    let pdfData = pdf

    pdfData = new Uint8Array(pdf)

    // At this point, we want to convert the pdf data into a 2D array representing
    // the images (indexed like array[page][pixel])

    const outputPages = [] as Uint8Array[]
    const loadingTask = await pdfjs.getDocument({
        data: pdfData,
        disableFontFace: true,
        verbosity: 0,
    })

    const pdfDocument = await loadingTask.promise

    const canvasFactory = new NodeCanvasFactory()
    if (conversion_config.height && conversion_config.width) {
        if (conversion_config?.height <= 0 || conversion_config.width <= 0)
            console.error(
                'Negative viewport dimension given. Defaulting to 100% scale.'
            )
    }

    // If there are page numbers supplied in the conversion config
    if (conversion_config.page_numbers)
        for (let i = 0; i < conversion_config.page_numbers.length; i++) {
            // This just pushes a render of the page to the array
            const currentPage = await doc_render(
                pdfDocument,
                conversion_config.page_numbers[i],
                canvasFactory,
                conversion_config,
                conversion_config.output_scale
            )
            if (currentPage != null) {
                outputPages.push(new Uint8Array(currentPage))
            }
        }
    // Otherwise just loop the whole doc
    else
        for (let i = 1; i <= pdfDocument.numPages; i++) {
            const currentPage = await doc_render(
                pdfDocument,
                i,
                canvasFactory,
                conversion_config,
                conversion_config.output_scale
            )
            if (currentPage != null) {
                // This allows for base64 conversion of output images
                outputPages.push(new Uint8Array(currentPage))
            }
        }

    return outputPages
} // convert method

async function doc_render(
    pdfDocument,
    pageNo,
    canvasFactory,
    conversion_config,
    outputScale = 1
) {
    // Page number sanity check
    if (pageNo < 1 || pageNo > pdfDocument.numPages) {
        console.error('Invalid page number ' + pageNo)
        return
    }

    // Get the page
    const page = await pdfDocument.getPage(pageNo)

    // Create a viewport at 100% scale
    let viewport = page.getViewport({ scale: outputScale })

    // Scale it up / down dependent on the sizes given in the config (if there
    // are any)
    if (conversion_config.width)
        outputScale = conversion_config.width / viewport.width
    else if (conversion_config.height)
        outputScale = conversion_config.height / viewport.height
    if (outputScale != 1 && outputScale > 0)
        viewport = page.getViewport({ scale: outputScale })

    const canvasAndContext = canvasFactory.create(
        viewport.width,
        viewport.height
    )

    const renderContext = {
        canvasContext: canvasAndContext.context,
        viewport: viewport,
        canvasFactory: canvasFactory,
    }

    await page.render(renderContext).promise

    // Convert the canvas to an image buffer.
    const image = canvasAndContext.canvas.toBuffer()

    return image
} // doc_render
