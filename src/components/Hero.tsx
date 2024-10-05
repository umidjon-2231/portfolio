import React, {FC, memo} from 'react';

interface HeroProps {
    title: string;
}

const Hero: FC<HeroProps> = memo<HeroProps>(async ({title}) => {


    return (
        <div className={"hero flex justify-between"}>
            <div>
                <b className={"hero-title"}>{title}</b>
            </div>
        </div>
    );
});

Hero.displayName = "Hero"
export default Hero;