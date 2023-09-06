import { describe, it } from 'node:test'
import { deepEqual } from 'node:assert'
import 'dotenv/config'
import TransactionRepository from './TransactionRepository.js'
import TransactionModel from '../models/Transaction.js'

describe('TransactionRepository Integration Test', () => {
    const _transactionRepository = new TransactionRepository({ transactionModel: TransactionModel })

    it('all(): it should return one array', async () => {
        await TransactionModel.destroy({ truncate: true })
        const transactions = await _transactionRepository.all()
        deepEqual(transactions, [])
    })

    it('store(): it should store a new transaction in the database and return it with its id', async () => {
        await TransactionModel.destroy({ truncate: true })
        const transaction = await _transactionRepository.store({
            typeId: 1,
            date: '2023-09-06',
            product: 'Ecova de Dentes',
            value: 20,
            seller: 'Jon Do'
        })
        deepEqual(transaction instanceof Object, true)
        deepEqual(transaction.id ? true : false, true)
    })

    it('getTotalValue(): it should return total value of transaction', async () => {
        await TransactionModel.destroy({ truncate: true })
        await _transactionRepository.store({ typeId: 1, date: '2023-09-06', product: 'Ecova de Dentes', value: 20, seller: 'Jon Do' })
        await _transactionRepository.store({ typeId: 1, date: '2023-09-06', product: 'Ecova de Dentes', value: 20, seller: 'Jon Do' })
        const totalValue = await _transactionRepository.getTotalValue()
        deepEqual(totalValue, 40)
    })
})
