import {AlertDialog, Button, Code, Flex, IconButton} from "@radix-ui/themes";
import {TrashIcon} from "@radix-ui/react-icons";
import {toast, Toaster} from "sonner";
import {mutate} from "swr";


const DeleteDialog = ({fileName}: { fileName: string }) => {
    const deleteFile = () => {
        const req = fetch("/api/files", {
            method: "DELETE",
            body: JSON.stringify({fileName})
        })

        toast.promise(req, {
            loading: "Deleting file...",
            success: () => "File deleted",
            error: (data) => data,
        })
        mutate("/api/files")
    }

    return (
        <AlertDialog.Root>
            <Toaster richColors/>
            <AlertDialog.Trigger>
                <IconButton variant={"outline"} color={"red"}>
                    <TrashIcon/>
                </IconButton>
            </AlertDialog.Trigger>

            <AlertDialog.Content>
                <AlertDialog.Title>Are you sure?</AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure you want to delete <Code>{fileName}</Code>?
                </AlertDialog.Description>

                <Flex mt={"3"} justify={"end"} gap={"3"}>
                    <AlertDialog.Cancel>
                        <Button color={"gray"} variant={"soft"}>Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action onClick={() => {
                        deleteFile()
                    }}>
                        <Button color={"red"}>Delete</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DeleteDialog
