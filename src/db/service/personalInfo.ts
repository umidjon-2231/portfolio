import PersonalInfo, {IPersonalInfo} from "@/db/scheme/personalInfo";


export const getInfo = async (): Promise<IPersonalInfo | null> => {
    return PersonalInfo.findOne();
}