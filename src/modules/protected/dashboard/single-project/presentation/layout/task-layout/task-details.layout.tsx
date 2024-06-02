import {TaskType} from "../../../../../../../types/task/task.type.ts";
import {Drawer, DrawerContent, DrawerHeader, DrawerTrigger} from "../../../../../../../ui/components/drawer.tsx";
import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import { MainButton } from "../../../../../../../ui/components/mainButton.tsx";
import {postCommentData} from "../../../../../../../repository/comments/post-comment.data.ts";

export const TaskDetailsLayout = (
    {
        task,
        fetchProject,
    }: {
        task: TaskType,
        fetchProject: () => void
    }
) => {
    console.log(task)

    const handlePostComment = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!task.id) return
        e.preventDefault();
        const message = e.currentTarget.querySelector('textarea')?.value;
        if (!message) return;
        e.currentTarget.querySelector('textarea')!.value = '';
        await postCommentData(message, task.id);
        fetchProject();
    }

    return (
        <div className={"flex flex-col gap-400"}>
            <Drawer>
                <DrawerTrigger asChild>
                    <HamburgerMenuIcon className={"w-6 h-6 cursor-pointer"} />
                </DrawerTrigger>
                <DrawerContent className={"w-[100vw] pl-12 pr-12 h-[75vh]"}>
                    <DrawerHeader>
                     <h2 className={"h2"}>{task.name}</h2>
                    </DrawerHeader>
                    <hr className={'w-full'}></hr>
                    <div>
                    </div>
                    <div className="flex flex-colgap-200">
                        {
                            task.comments && task.comments.map((comment) => {
                                return (
                                    <div key={comment.id} className={"flex flex-col gap-200"}>
                                        <p>{comment.content}</p>
                                        <p>{comment.createdAt}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <form onSubmit={handlePostComment}>
                        <textarea placeholder={"Post a comment"} className={"w-full blue-900 p-s padding-200 bg-blue-100 border-radius-200 h-[100px]"}></textarea>
                        <MainButton className={"w-fit mt-6"}>Post</MainButton>
                    </form>
                </DrawerContent>
            </Drawer>
        </div>
    )
}