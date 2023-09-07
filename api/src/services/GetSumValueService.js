class GetSumValueService
{
    constructor({ transactionRepository })
    {
        this.transactionRepository = transactionRepository
    }

    async run()
    {
        return await this.transactionRepository.getTotalValue()
    }
}

export default GetSumValueService
