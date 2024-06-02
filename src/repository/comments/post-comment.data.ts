import {ApiUrl} from "../../const/ApiUrl.ts";
import {cookieManager} from "../../services/coockies/CoockieManager.service.ts";

export const postCommentData = async (message: string, task_id: string) => {
    try {
        await fetch(ApiUrl.Comments.Create + "/" + task_id, {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieManager.getCookie('token')
            },
            'body': JSON.stringify({
                content: message
            })
        })
    } catch (error) {
        console.log(error);
    }
}