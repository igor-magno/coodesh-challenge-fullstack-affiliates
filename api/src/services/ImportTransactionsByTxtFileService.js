import { once } from 'node:events'
import lang from '../Internationalization/lang.js'
import maper from '../Internationalization/maper.js'
import TypeIsEmptyError from '../errors/TypeIsEmptyError.js'
import DateIsEmptyError from '../errors/DateIsEmptyError.js'
import ProductIsEmptyError from '../errors/ProductIsEmptyError.js'
import ValueIsEmptyError from '../errors/ValueIsEmptyError.js'
import SellerIsEmptyError from '../errors/SellerIsEmptyError.js'
import TypeIsInvalidError from '../errors/TypeIsInvalidError.js'
import DateIsInvalidError from '../errors/DateIsInvalidError.js'
import ValueIsInvalidError from '../errors/ValueIsInvalidError.js'

class ImportTransactionsByTxtFileService
{
    constructor({ transactionRepository, typeRepository })
    {
        this.transactionRepository = transactionRepository
        this.typeRepository = typeRepository
    }

    async run(request)
    {
        const buffer = await once(request, "data")
        const bufferString = buffer.toString()
        const linesArray = bufferString.split('\n')

        const transactions = []

        const types = await this.typeRepository.all()
        const typesIds = types.map(t => t.id)

        for (let i = 0; i < linesArray.length; i++) {
            const line = linesArray[i]
            if (line.trimEnd().length > 0) {

                const type = line.slice(0, 1).trimEnd() // 1
                const date = line.slice(1, 26).trimEnd() // 25
                const product = line.slice(26, 56).trimEnd() // 30
                const value = line.slice(56, 66).trimEnd() // 10
                const seller = line.slice(66, 86).trimEnd() // 20 

                const lineErro = `${lang({ maperKey: maper['generic.errorInLine'] })} ${i + 1}: `

                if (type == '') throw new TypeIsEmptyError({ prefixMessage: lineErro })
                if (date == '') throw new DateIsEmptyError({ prefixMessage: lineErro })
                if (product == '') throw new ProductIsEmptyError({ prefixMessage: lineErro })
                if (value == '') throw new ValueIsEmptyError({ prefixMessage: lineErro })
                if (seller == '') throw new SellerIsEmptyError({ prefixMessage: lineErro })
                if (!this.validTypeString(typesIds, type)) throw new TypeIsInvalidError({ prefixMessage: lineErro })
                if (!this.validDateString(date)) throw new DateIsInvalidError({ prefixMessage: lineErro })
                if (!this.validValueString(value)) throw new ValueIsInvalidError({ prefixMessage: lineErro })

                const transaction = {
                    typeId: type,
                    date: date,
                    product: product,
                    value: value,
                    seller: seller
                }

                transactions.push(transaction)
            }
        }

        if(transactions.length == 0) throw new Error('O arquivo esta vazio, nenhuma trasação foi importada.')
 
        transactions.forEach(async transaction => {
            await this.transactionRepository.store(transaction)
        })
    }

    validTypeString(validTypes, typeString) {
        const regex = /^[0-9]+$/
        if(!regex.test(typeString)) return false
        if(!validTypes.includes(Number(typeString))) return false
        return true
    }
    
    validDateString(dateString) {
        const regexISO8601 = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z|(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?)(?:Z|[-+]\d{2}:\d{2}))$/
        if (!regexISO8601.test(dateString)) return false
        return true
    }
    
    validValueString(valueString) {
        const regex = /^[0-9]+$/
        if(!regex.test(valueString)) return false
        return true
    }
}

export default ImportTransactionsByTxtFileService
