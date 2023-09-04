import langs from "./langs.js"

const lang = ({ lang = 'en', maperKey }) => {
    lang = lang.replace('-', '')
    if (!langs[lang])
        lang = 'en'
    return langs[lang][maperKey]
}

export default lang
