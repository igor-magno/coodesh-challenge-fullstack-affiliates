class GetAllTransactionsService
{
    constructor({ transactionRepository })
    {
        this.transactionRepository = transactionRepository
    }

    async run()
    {
        return await this.transactionRepository.all()
    }
}

export default GetAllTransactionsService
