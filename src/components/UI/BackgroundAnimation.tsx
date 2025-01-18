"use client"
import React, {use, useCallback, useEffect, useState} from 'react';
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {loadSlim} from "@tsparticles/slim";
import {ISourceOptions} from "@tsparticles/engine";
import {MainContext} from "@/components/StoreProvider";

const BackgroundAnimation = () => {
    const [init, setInit] = useState<boolean>(false)
    const {theme} = use(MainContext)

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true)
        });
    }, []);

    const getVariable = useCallback((name: string) => {
        console.log(theme)
        if (window){
            return getComputedStyle(document.documentElement).getPropertyValue(name);
        }
        return "#000"
    }, [theme])

    const options: ISourceOptions = {
        background: {
            color: {
                value: "var(--background)",
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: getVariable("--foreground"),
            },
            links: {
                color: getVariable("--foreground"),
                distance: 150,
                enable: true,
                opacity: 0.7,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                },
                limit: {
                    mode: "wait",
                    value: 300
                },
                value: 150,
            },
            opacity: {
                value: 0.7,
            },
            shape: {
                type: ["circle", "triangle", "square"],
            },
            size: {
                value: {min: 1, max: 5},
            },
        },
        detectRetina: true,
    }

    if (init) {
        return <Particles options={options} className={"fixed -z-50"}/>
    }

    return <></>

};

export default BackgroundAnimation;