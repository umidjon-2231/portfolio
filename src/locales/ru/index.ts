import {DictionaryType} from "@/locales";

const ru: DictionaryType = {
    chooseLanguage: "Выберите язык",
    locale: "Русский",
    errors: {
        something: "Что-то пошло не так! 😵",
        hacker: "Будущий хакер 😏",
    },
    back: "Назад ⬅️",
    navbar: {
        items: {
            about: "О себе",
            projects: "Проекты",
            testimonials: "Отзывы",
            contact: "Контакты",
        },
        downloadCv: "Скачать резюме",
    },
    hero: {
        title: "Привет, я Умид",
        noBio: "Это место для моей биографии, но она не загрузилась из-за твоего плохого интернета.",
        noCity: "Город не загружен",
        noStatus: "Статус также :(",
    },
    chat: {
        config: {
            title: 'Привет! 👋',
            subtitle: "Начать чат.",
            footer: '',
            getStarted: 'Новый диалог',
            inputPlaceholder: 'Введите свой вопрос..',
            closeButtonTooltip: "Закрыть чат"
        },
        initialMessages: [
            'Привет! 👋',
            'Меня зовут Умид. Что ты хочешь узнать обо мне?'
        ]
    },
}

export default ru;