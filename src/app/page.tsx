'use client'

import useSWR from "swr";
import {Button, Card, Container, Flex, IconButton, Text} from "@radix-ui/themes";
import {Cross1Icon, PlusIcon, UploadIcon} from "@radix-ui/react-icons";
import {useState} from "react";
import {toast, Toaster} from "sonner";
import "./globals.css"
import {useFilePicker} from "use-file-picker";
import byteSize from "byte-size"
import DirectoryItem from "@/components/DirectoryItem";

export default function Home() {
    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const [file, setFile] = useState<File>()
    const [submitting, setSubmitting] = useState(false)
    const {openFilePicker} = useFilePicker({
        readAs: "ArrayBuffer",
        onFilesSuccessfullySelected: (data) => {
            setFile(data.plainFiles[0])
        }
    })

    const {data, mutate} = useSWR<FileResponse>("/api/files", fetcher)

    const submitFile = () => {
        if (!file) return

        const data = new FormData()
        data.set("file", file)
        const promise = fetch("/api/files", {
            body: data,
            method: "POST"
        })

        setSubmitting(true)

        toast.promise(promise, {
            loading: "Uploading file...",
            success: () => {
                setSubmitting(false)
                mutate()
                setFile(undefined)
                return "File uploaded."
            },
            error: "Failed to upload file."
        })
    }


    return (
        <Container py={"5"} px={"5"}>
            <Toaster richColors/>
            <Flex direction={"row"} gap={"3"}>
                <Button mb={"5"} onClick={() => openFilePicker()} color={"gray"} variant={"outline"}>
                    <PlusIcon/>
                    Select file...
                </Button>
            </Flex>
            {
                file && <>
                    <Card mb={"2"}>
                        <Flex justify={"between"} align={"center"}>
                            <Flex gap={"3"} align={"center"}>
                                <Text>{file.name}</Text>
                                <Text size={"2"} style={{opacity: ".5"}} as={"p"} weight={"medium"}>
                                    {byteSize(file.size).value}
                                    {byteSize(file.size).unit}
                                </Text>
                            </Flex>

                            <IconButton color={"red"} variant={"outline"} onClick={() => setFile(undefined)}
                                        disabled={submitting}>
                                <Cross1Icon/>
                            </IconButton>
                        </Flex>
                    </Card>

                    <Button mb={"5"} onClick={() => submitFile()} disabled={submitting}>
                        <UploadIcon/> Upload
                    </Button>
                </>
            }


            <Flex gap={"2"} direction={"column"}>
                {data && data.items.sort((a, b) => {
                    return a.isDir ? b.isDir ? 0 : -1 : 1
                }).map((value) =>
                    <DirectoryItem item={value} key={value.name}/>
                )}
            </Flex>
        </Container>

    );
}
