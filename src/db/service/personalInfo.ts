import PersonalInfo, {} from "@/db/scheme/personalInfo";


export const getInfo = async () => {
    return PersonalInfo.findOne();
}