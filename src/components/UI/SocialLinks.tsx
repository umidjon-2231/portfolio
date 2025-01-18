import React, {FC, memo} from 'react';
import {IPersonalInfo} from "@/db/scheme/personalInfo";
import {SocialIcon} from "react-social-icons";

type SocialLinksProps = Partial<IPersonalInfo["socialLinks"]>

const SocialLinks: FC<SocialLinksProps> = memo<SocialLinksProps>((links) => {
    return (
        <div className={"w-full flex flex-wrap justify-center md:justify-start"} >
            {Object.entries(links).map(([key, value]) =>
                <div key={key} className={"me-3 mt-3"}>
                    <SocialIcon
                        fgColor={"var(--foreground)"}
                        bgColor={"var(--background)"}
                                network={key}
                                href={value}
                                target={"_blank"}
                        className={"border border-solid border-[var(--foreground)] rounded-full"}
                                style={{width: "3rem", height: "3rem"}}
                    />
                </div>
            )}
        </div>
    );
});

SocialLinks.displayName = "SocialLinks"
export default SocialLinks;