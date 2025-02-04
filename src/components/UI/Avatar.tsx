import React, {FC} from 'react';
import Image from "next/image";

interface AvatarProps {
    src?: string
    image_size: number
}

const AVATAR_URL = "/api/avatar"

const Avatar: FC<AvatarProps> = ({src, image_size: IMAGE_SIZE}) => {
    // const [loading, setLoading] = useState(true);
    //
    // useEffect(() => {
    //     setLoading(true);
    // }, [src, IMAGE_SIZE])

    // console.count("Avatar render")

    return (
        <div
            className={" md:me-3 border-4 border-solid box-content relative border-[var(--secondary)] rounded-full"}
            style={{width: IMAGE_SIZE, height: IMAGE_SIZE,}}>
            {/*{loading &&*/}
            {/*    <Skeleton borderRadius={999} width={IMAGE_SIZE} height={IMAGE_SIZE}*/}
            {/*              style={{lineHeight: "inherit", position: "absolute", inset: 0, zIndex: 10}}/>*/}
            {/*}*/}
            <Image
                priority
                loading={"eager"}
                className={"rounded-full"}
                // hidden={loading}
                // onLoad={() => setLoading(false)}
                src={src ?? AVATAR_URL}
                alt={"my photo"}
                width={IMAGE_SIZE} height={IMAGE_SIZE} placeholder={"empty"}
            />
        </div>
    );
};

Avatar.displayName = "Avatar"
export default Avatar;