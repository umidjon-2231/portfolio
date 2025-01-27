import React, {FC, memo, useEffect, useState} from 'react';
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import DEFAULT_USER_ICON from "@/app/images/icons/user_circle.svg";

interface AvatarProps {
    src: string
    image_size: number
}

const Avatar: FC<AvatarProps> = memo<AvatarProps>(({src, image_size: IMAGE_SIZE}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
    }, [src, IMAGE_SIZE])

    return (
        <div
            className={" md:me-3 border-4 border-solid box-content border-[var(--secondary)] rounded-full"}
            style={{width: IMAGE_SIZE, height: IMAGE_SIZE,}}>
            {loading &&
                <Skeleton borderRadius={999} width={IMAGE_SIZE} height={IMAGE_SIZE}
                          style={{lineHeight: "inherit"}}/>
            }
            <Image
                loading={"eager"}
                className={"rounded-full"}
                hidden={loading}
                onLoad={() => setLoading(false)}
                src={src || DEFAULT_USER_ICON.src}
                alt={"my photo"}
                width={IMAGE_SIZE} height={IMAGE_SIZE} placeholder={"empty"}
            />
        </div>
    );
});

Avatar.displayName = "Avatar"
export default Avatar;