import {TZDate} from "@date-fns/tz";
import {format} from "date-fns";


export const getCurrentTime = () => {
    return TZDate.tz("Asia/Tashkent");
}


export const parseTime=(date: Date)=>{
    return format(date, "dd.MM.yyyy hh:mm:ss")
}