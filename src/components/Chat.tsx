"use client"
import React, {useEffect} from 'react';
import {createChat} from "@n8n/chat";
import {useDictionary} from "@/locales/hook";


const Chat = () => {

    const [dictionary] = useDictionary()
    useEffect(() => {
        createChat({
            webhookUrl: process.env.NEXT_PUBLIC_CHAT_URL,
            initialMessages: dictionary.chat.initialMessages,
            i18n: {
                en: {
                    ...(dictionary.chat.config),
                },
            },

        });
    }, [dictionary]);
    return (<></>);
};

export default Chat;