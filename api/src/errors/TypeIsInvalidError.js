import lang from '../Internationalization/lang.js';
import maper from '../Internationalization/maper.js';

class TypeIsInvalidError extends Error {
    constructor({
        language = 'en',
        prefixMessage = '',
        suffixMessage = ''
    } = {}) {
        const baseMessage = lang({ lang: language, maperKey: maper['TypeIsInvalidError.baseMessage'] })
        const message = `${prefixMessage}${baseMessage}${suffixMessage}`
        super(message);
        this.name = 'TypeIsEmpty';
        this.message = message
        this.baseMessage = baseMessage
    }

    getMessage() {
        return this.message
    }

    getBaseMessage() {
        return this.message
    }

    getCode() {
        return 400
    }
}

export default TypeIsInvalidError
