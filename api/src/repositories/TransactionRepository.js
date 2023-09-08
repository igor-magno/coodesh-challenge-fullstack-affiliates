import Type from "../models/Type.js"

class TransactionRepository {
    constructor({ transactionModel }) {
        this.transactionModel = transactionModel
    }

    async all() {
        const transactions = await this.transactionModel.findAll({ include: Type })
        return transactions
    }

    async store(newTransaction) {
        const transaction = await this.transactionModel.create(newTransaction)
        return transaction
    }

    async getTotalValue() {
        const totalValue = await this.transactionModel.sum('value')
        return totalValue
    }
}

export default TransactionRepository
