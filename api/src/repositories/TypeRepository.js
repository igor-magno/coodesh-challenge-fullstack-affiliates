class TypeRepository
{
    constructor({ typeModel })
    {
        this.typeModel = typeModel
    }
    
    async all()
    {
        return await this.typeModel.findAll()
    }
}

export default TypeRepository
