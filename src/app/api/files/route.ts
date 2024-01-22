import {NextRequest, NextResponse} from "next/server";
import * as fs from "fs";
import path from "node:path";
import {unlink, writeFile} from "node:fs/promises";

export async function GET(req: NextRequest) {
    const info = (filename: string) => {
        return fs.lstatSync(filename)
    }

    const dirPath = "./src/cdn"
    const dir = fs.readdirSync(dirPath)

    const items: DirectoryItem[] = []

    console.log(dir)

    for (let filePath of dir) {
        const fullPath = path.join(dirPath, filePath)
        const i = info(fullPath)
        items.push({isDir: !i.isFile(), isFile: i.isFile(), name: filePath, size: i.size})

    }

    const payload: FileResponse = {
        items
    }

    return NextResponse.json(payload)
}

export async function DELETE(req: NextRequest) {
    const body = await req.json()
    if (!body.fileName) {
        return NextResponse.json({error: "Missing file name"}, {status: 400})
    }

    const path = `./src/cdn/${body.fileName}`

    try {
        await unlink(path)
        return new Response(null, {
            status: 200
        })
    } catch (e: unknown) {
        console.log(e)
        return NextResponse.json({error: e}, {status: 500})
    }
}

export async function POST(req: NextRequest) {
    //const body  = req.body
    const formData = await req.formData()
    console.log(formData)

    const file: File | null = formData.get("file") as unknown as File

    if (!file) {
        return NextResponse.json({}, {status: 400})
    }

    console.log(file)
    const bytes = await file.arrayBuffer()
    console.log(bytes)

    const path = `./src/cdn/${file.name.replaceAll(' ', '_')}`
    try {
        await writeFile(path, Buffer.from(bytes))
        return NextResponse.json({})
    } catch (e: unknown) {
        console.log(e)
        return NextResponse.json({error: e}, {status: 500})
    }

}
