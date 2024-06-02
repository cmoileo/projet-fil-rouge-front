import {TaskType} from "../../../../../../../types/task/task.type.ts";
import {Drawer, DrawerContent, DrawerHeader, DrawerTrigger} from "../../../../../../../ui/components/drawer.tsx";
import {ChatBubbleIcon} from "@radix-ui/react-icons";
import { MainButton } from "../../../../../../../ui/components/mainButton.tsx";
import {postCommentData} from "../../../../../../../repository/comments/post-comment.data.ts";
import {cookieManager} from "../../../../../../../services/coockies/CoockieManager.service.ts";

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
                    <ChatBubbleIcon className={"w-6 h-6 cursor-pointer"} />
                </DrawerTrigger>
                <DrawerContent className={"w-[100vw] pl-12 pr-12 h-[80vh]"}>
                    <DrawerHeader>
                     <h2 className={"h2"}>{task.name}</h2>
                    </DrawerHeader>
                    <hr className={'w-full'}></hr>
                    <div className={"flex flex-col justify-between h-full overflow-hidden py-8"}>
                        <div className="flex flex-col gap-400 h-full overflow-y-auto">
                            {task.comments && task.comments.map((comment) => (
                                comment.author.id === cookieManager.getCookie('userId') ? (
                                    <div className={"flex flex-col gap-500 items-end"}>
                                        <div key={comment.id} className="flex w-full gap-600">
                                            <p className={"p-s w-full bg-green-100 border-radius-400 padding-300"}>{comment.content}</p>
                                            {
                                                comment.author.profile_picture_url ? (
                                                    <img src={comment.author.profile_picture_url}
                                                         className={"w-10 h-10 object-cover rounded-full"}/>
                                                ) : (
                                                    <div className={"w-10 h-10 rounded-full bg-gray-200"}></div>
                                                )
                                            }
                                        </div>
                                        <p className={"p-xs w-fit"}>{new Date("2024-06-01T12:52:27.442Z").toLocaleString("fr-FR", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false
                                        }).replace(',', '')}</p>
                                    </div>
                                ) : (
                                    <div className={"flex flex-col gap-500"}>
                                        <div key={comment.id} className="flex w-full gap-600">
                                            {
                                                comment.author.profile_picture_url ? (
                                                    <img src={comment.author.profile_picture_url}
                                                         className={"w-10 h-10 object-cover rounded-full"}/>
                                                ) : (
                                                    <div className={"w-10 h-10 rounded-full bg-gray-200"}></div>
                                                )
                                            }
                                            <p className={"p-s w-full bg-green-100 border-radius-400 padding-300"}>{comment.content}</p>
                                        </div>
                                        <p className={"p-xs w-fit"}>{new Date("2024-06-01T12:52:27.442Z").toLocaleString("fr-FR", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false
                                        }).replace(',', '')}</p>
                                    </div>
                                )
                            ))}
                        </div>
                        <form className={"margin-300-top" +
                            ""} onSubmit={handlePostComment}>
                        <textarea placeholder={"Post a comment"}
                                  className={"w-full blue-900 p-s padding-200 bg-blue-100 border-radius-200 h-[100px]"}></textarea>
                            <MainButton className={"w-fit mt-6"}>Post</MainButton>
                        </form>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}