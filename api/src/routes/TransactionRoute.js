import TransactionRepository from '../repositories/TransactionRepository.js'
import GetAllTransactionsService from '../services/GetAllTransactionsService.js'
import GetSumValueService from '../services/GetSumValueService.js'
import ImportTransactionsByTxtFileService from '../services/ImportTransactionsByTxtFileService.js'
import TransactionModel from '../models/Transaction.js'
import TypeRepository from '../repositories/TypeRepository.js'
import TypeModel from '../models/Type.js'

const routes = {
    '/transaction/txt-import:post': async (request, response) => {
        
        await (new ImportTransactionsByTxtFileService({ 
            transactionRepository: new TransactionRepository({ transactionModel: TransactionModel }),
            typeRepository: new TypeRepository({ typeModel: TypeModel })
        })).run(request)

        response.writeHead(200, {
            'content-type': 'text/plain'
        })

        return response.end('O arquivo foi importado com sucesso, E todas as transações já estão disponíveis na listagem principal')
    },
    '/transaction:get': async (request, response) => {
        
        const result = await (new GetAllTransactionsService({ transactionRepository: new TransactionRepository({ transactionModel: TransactionModel }) })).run()
        
        response.writeHead(200, {
            'content-type': 'aplication/json'
        })
        
        return response.end(JSON.stringify(result))
    },
    '/transaction/sum-value:get': async (request, response) => {

        const result = await (new GetSumValueService({ transactionRepository: new TransactionRepository({ transactionModel: TransactionModel }) })).run()
        
        response.writeHead(200, {
            'content-type': 'aplication/json'
        })
        
        return response.end(JSON.stringify({
            sumValue: result
        }))
    }
}

export default {
    routes: routes
}
