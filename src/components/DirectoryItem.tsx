import {Card, Flex, IconButton, Text} from "@radix-ui/themes";
import IconResolver from "@/utils/IconResolver";
import byteSize from "byte-size";
import DeleteDialog from "@/components/DeleteDialog";
import {Folder} from "lucide-react";
import {Link2Icon} from "@radix-ui/react-icons";
import styles from "./DirectoryItem.module.css"
import {toast, Toaster} from "sonner";

const DirectoryItem = ({item}: { item: DirectoryItem }) => {
    const fileUrl = `https://${process.env.NEXT_PUBLIC_CDN_URL}/${item.name}`
    const copyDownloadUrl = () => {
        navigator.clipboard.writeText(fileUrl)
            .then(() => toast.message("Download link copied"))
    }


    return (
        <Card key={item.name} className={styles.hoverCard}>
            <Toaster/>
            <Flex justify={"between"}>
                <Flex align={"center"} gap={"2"}>
                    {
                        item.isDir ? <Folder/> : <IconResolver fileName={item.name}/>
                    }
                    <Text>{item.name}</Text>
                    <Text size={"2"} style={{opacity: ".5"}} weight={"medium"}>
                        {byteSize(item.size).value}
                        {byteSize(item.size).unit}
                    </Text>
                    <IconButton variant={"outline"} className={styles.icon} onClick={() => copyDownloadUrl()}>
                        <Link2Icon/>
                    </IconButton>
                </Flex>
                <DeleteDialog fileName={item.name}/>
            </Flex>
        </Card>
    )
}

export default DirectoryItem
