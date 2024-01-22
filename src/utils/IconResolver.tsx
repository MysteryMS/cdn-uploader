import {File, FileAudio, FileImage, FileQuestion, FileVideo} from "lucide-react";

export default function IconResolver({fileName}: { fileName: string }) {
    const regex = /(\..+)$/gi
    const groups = fileName.match(regex)

    if (groups == null || groups?.length == 0) {
        return (
            <>
                <FileQuestion/>
            </>
        )
    }

    const extension = groups[0]

    const videoExts = ['.MP4', '.AVI', '.MKV', '.WMV', '.MOV', '.FLV', '.WEBM', '.MPEG', '.3GP']
    const audioExts = ['.MP3', '.AAC', '.WAV', '.FLAC', '.OGG', '.WMA', '.AIFF', '.M4A']
    const imageExts = ['.JPEG', '.PNG', '.GIF', '.BMP', '.TIFF', '.SVG', '.RAW', '.ICO', '.HEIF', '.JPG']

    const isAudio = audioExts.includes(extension.toUpperCase())
    const isVideo = videoExts.includes(extension.toUpperCase())
    const isImage = imageExts.includes(extension.toUpperCase())

    return (
        <>
            {
                isAudio ? <FileAudio/> : isVideo ? <FileVideo/> : isImage ? <FileImage/> : <File/>
            }
        </>
    )
}