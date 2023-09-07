import { describe, before, after, it } from 'node:test'
import { deepStrictEqual } from 'node:assert'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import TypeIsEmptyError from '../../src/errors/TypeIsEmptyError.js'
import DateIsEmptyError from '../../src/errors/DateIsEmptyError.js'
import ProductIsEmptyError from '../../src/errors/ProductIsEmptyError.js'
import ValueIsEmptyError from '../../src/errors/ValueIsEmptyError.js'
import SellerIsEmptyError from '../../src/errors/SellerIsEmptyError.js'
import TypeIsInvalidError from '../../src/errors/TypeIsInvalidError.js'
import DateIsInvalidError from '../../src/errors/DateIsInvalidError.js'
import ValueIsInvalidError from '../../src/errors/ValueIsInvalidError.js'
import 'dotenv/config'
import Transaction from '../../src/models/Transaction.js'
import Type from '../../src/models/Type.js'

process.env.APP_URL = process.env.TEST_APP_URL
process.env.APP_PORT = process.env.TEST_APP_PORT
const BASE_URL = `${process.env.APP_URL}:${process.env.APP_PORT}`

describe('Api e2e test', () => {
    let _server = {}

    before(async () => {
        _server = (await import('../../src/index.js')).server

        await new Promise(resolve => _server.on('listening', resolve()))

        await Transaction.destroy({ truncate: true })
        await Type.destroy({ truncate: true })
        await Type.bulkCreate([
            {
                id: 1,
                description: 'Venda produtor',
                nature: 'Entrada',
                operator: '+',
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                id: 2,
                description: 'Venda afiliado',
                nature: 'Entrada',
                operator: '+',
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                id: 3,
                description: 'Comissão paga',
                nature: 'Saída',
                operator: '-',
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                id: 4,
                description: 'Comissão recebida',
                nature: 'Entrada',
                operator: '+',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    })

    it('it should return status 200 api is runing', async () => {
        const request = await fetch(`${BASE_URL}/status`)
        deepStrictEqual(request.status, 200)
    })

    it('it should return status 404 endpoint not found', async () => {
        const request = await fetch(`${BASE_URL}`)
        deepStrictEqual(request.status, 404)
    })

    it('it should import a txt file of transactions', async () => {
        const currentDir = dirname(
            fileURLToPath(
                import.meta.url
            )
        )
        const fileData = new FormData();
        const fileBuffer = readFileSync(join(currentDir, '/../assets/sales.txt'));
        fileData.append('txtFile', fileBuffer)
        const response = await fetch(`${BASE_URL}/transaction/txt-import`, {
            method: 'POST',
            body: fileBuffer
        })
        deepStrictEqual(response.status, 200)
        const message = await response.text()
        deepStrictEqual(message, 'O arquivo foi importado com sucesso, E todas as transações já estão disponíveis na listagem principal')
    })

    it('it should return error for import the txt file with empty type', async () => {
        const currentDir = dirname(
            fileURLToPath(
                import.meta.url
            )
        )
        const fileData = new FormData();
        const fileBuffer = readFileSync(join(currentDir, '/../assets/sales-empty-type.txt'));
        fileData.append('txtFile', fileBuffer)
        const response = await fetch(`${BASE_URL}/transaction/txt-import`, {
            method: 'POST',
            body: fileBuffer
        })
        const error = new TypeIsEmptyError
        deepStrictEqual(response.status, error.getCode())
        const message = await response.text()
        const includes = message.includes(error.getBaseMessage())
        deepStrictEqual(includes, true)
    })

    it('it should return error for import the txt file with empty date', async () => {
        const currentDir = dirname(
            fileURLToPath(
                import.meta.url
            )
        )
        const fileData = new FormData();
        const fileBuffer = readFileSync(join(currentDir, '/../assets/sales-empty-date.txt'));
        fileData.append('txtFile', fileBuffer)
        const response = await fetch(`${BASE_URL}/transaction/txt-import`, {
            method: 'POST',
            body: fileBuffer
        })
        const error = new DateIsEmptyError
        deepStrictEqual(response.status, error.getCode())
        const message = await response.text()
        const includes = message.includes(error.getBaseMessage())
        deepStrictEqual(includes, true)
    })

    it('it should return error for import the txt file with empty product', async () => {
        const currentDir = dirname(
            fileURLToPath(
                import.meta.url
            )
        )
        const fileData = new FormData();
        const fileBuffer = readFileSync(join(currentDir, '/../assets/sales-empty-product.txt'));
        fileData.append('txtFile', fileBuffer)
        const response = await fetch(`${BASE_URL}/transaction/txt-import`, {
            method: 'POST',
            body: fileBuffer
        })
        const error = new ProductIsEmptyError
        deepStrictEqual(response.status, error.getCode())
        const message = await response.text()
        const includes = message.includes(error.getBaseMessage())
        deepStrictEqual(includes, true)
    })

    it('it should return error for import the txt file with empty value', async () => {
        const currentDir = dirname(
            fileURLToPath(
                import.meta.url
            )
        )
        const fileData = new FormData();
        const fileBuffer = readFileSync(join(currentDir, '/../assets/sales-empty-value.txt'));
        fileData.append('txtFile', fileBuffer)
        const response = await fetch(`${BASE_URL}/transaction/txt-import`, {
            method: 'POST',
            body: fileBuffer
        })
        const error = new ValueIsEmptyError
        deepStrictEqual(response.status, error.getCode())
        const message = await response.text()
        const includes = message.includes(error.getBaseMessage())
        deepStrictEqual(includes, true)
    })

    it('it should return error for import the txt file with empty seller', async () => {
        const currentDir = dirname(
            fileURLToPath(
                import.meta.url
            )
        )
        const fileData = new FormData();
        const fileBuffer = readFileSync(join(currentDir, '/../assets/sales-empty-seller.txt'));
        fileData.append('txtFile', fileBuffer)
        const response = await fetch(`${BASE_URL}/transaction/txt-import`, {
            method: 'POST',
            body: fileBuffer
        })
        const error = new SellerIsEmptyError
        deepStrictEqual(response.status, error.getCode())
        const message = await response.text()
        const includes = message.includes(error.getBaseMessage())
        deepStrictEqual(includes, true)
    })

    it('it should return error to import txt file with invalid type', async () => {
        const currentDir = dirname(
            fileURLToPath(
                import.meta.url
            )
        )
        const fileData = new FormData();
        const fileBuffer = readFileSync(join(currentDir, '/../assets/sales-invalid-type.txt'));
        fileData.append('txtFile', fileBuffer)
        const response = await fetch(`${BASE_URL}/transaction/txt-import`, {
            method: 'POST',
            body: fileBuffer
        })
        const error = new TypeIsInvalidError()
        deepStrictEqual(response.status, error.getCode())
        const message = await response.text()
        const includes = message.includes(error.getBaseMessage())
        deepStrictEqual(includes, true)
    })

    it('it should return error to import txt file with invalid type v1', async () => {
        const currentDir = dirname(
            fileURLToPath(
                import.meta.url
            )
        )
        const fileData = new FormData();
        const fileBuffer = readFileSync(join(currentDir, '/../assets/sales-invalid-type-v1.txt'));
        fileData.append('txtFile', fileBuffer)
        const response = await fetch(`${BASE_URL}/transaction/txt-import`, {
            method: 'POST',
            body: fileBuffer
        })
        const error = new TypeIsInvalidError()
        deepStrictEqual(response.status, error.getCode())
        const message = await response.text()
        const includes = message.includes(error.getBaseMessage())
        deepStrictEqual(includes, true)
    })

    it('it should return error to import txt file with invalid date', async () => {
        const currentDir = dirname(
            fileURLToPath(
                import.meta.url
            )
        )
        const fileData = new FormData();
        const fileBuffer = readFileSync(join(currentDir, '/../assets/sales-invalid-date.txt'));
        fileData.append('txtFile', fileBuffer)
        const response = await fetch(`${BASE_URL}/transaction/txt-import`, {
            method: 'POST',
            body: fileBuffer
        })
        const error = new DateIsInvalidError()
        deepStrictEqual(response.status, error.getCode())
        const message = await response.text()
        const includes = message.includes(error.getBaseMessage())
        deepStrictEqual(includes, true)
    })

    it('it should return error to import txt file with invalid date v1', async () => {
        const currentDir = dirname(
            fileURLToPath(
                import.meta.url
            )
        )
        const fileData = new FormData();
        const fileBuffer = readFileSync(join(currentDir, '/../assets/sales-invalid-date-v1.txt'));
        fileData.append('txtFile', fileBuffer)
        const response = await fetch(`${BASE_URL}/transaction/txt-import`, {
            method: 'POST',
            body: fileBuffer
        })
        const error = new DateIsInvalidError()
        deepStrictEqual(response.status, error.getCode())
        const message = await response.text()
        const includes = message.includes(error.getBaseMessage())
        deepStrictEqual(includes, true)
    })

    it('it should return error to import txt file with invalid date v2', async () => {
        const currentDir = dirname(
            fileURLToPath(
                import.meta.url
            )
        )
        const fileData = new FormData();
        const fileBuffer = readFileSync(join(currentDir, '/../assets/sales-invalid-date-v2.txt'));
        fileData.append('txtFile', fileBuffer)
        const response = await fetch(`${BASE_URL}/transaction/txt-import`, {
            method: 'POST',
            body: fileBuffer
        })
        const error = new DateIsInvalidError()
        deepStrictEqual(response.status, error.getCode())
        const message = await response.text()
        const includes = message.includes(error.getBaseMessage())
        deepStrictEqual(includes, true)
    })

    it('it should return error to import txt file with invalid date v3', async () => {
        const currentDir = dirname(
            fileURLToPath(
                import.meta.url
            )
        )
        const fileData = new FormData();
        const fileBuffer = readFileSync(join(currentDir, '/../assets/sales-invalid-date-v3.txt'));
        fileData.append('txtFile', fileBuffer)
        const response = await fetch(`${BASE_URL}/transaction/txt-import`, {
            method: 'POST',
            body: fileBuffer
        })
        const error = new DateIsInvalidError()
        deepStrictEqual(response.status, error.getCode())
        const message = await response.text()
        const includes = message.includes(error.getBaseMessage())
        deepStrictEqual(includes, true)
    })

    it('it should return error to import txt file with invalid value', async () => {
        const currentDir = dirname(
            fileURLToPath(
                import.meta.url
            )
        )
        const fileData = new FormData();
        const fileBuffer = readFileSync(join(currentDir, '/../assets/sales-invalid-value.txt'));
        fileData.append('txtFile', fileBuffer)
        const response = await fetch(`${BASE_URL}/transaction/txt-import`, {
            method: 'POST',
            body: fileBuffer
        })
        const error = new ValueIsInvalidError()
        deepStrictEqual(response.status, error.getCode())
        const message = await response.text()
        const includes = message.includes(error.getBaseMessage())
        deepStrictEqual(includes, true)
    })

    it('it should return error to import txt file with invalid value v1', async () => {
        const currentDir = dirname(
            fileURLToPath(
                import.meta.url
            )
        )
        const fileData = new FormData();
        const fileBuffer = readFileSync(join(currentDir, '/../assets/sales-invalid-value-v1.txt'));
        fileData.append('txtFile', fileBuffer)
        const response = await fetch(`${BASE_URL}/transaction/txt-import`, {
            method: 'POST',
            body: fileBuffer
        })
        const error = new ValueIsInvalidError()
        deepStrictEqual(response.status, error.getCode())
        const message = await response.text()
        const includes = message.includes(error.getBaseMessage())
        deepStrictEqual(includes, true)
    })

    it('it should return error to import txt file with invalid value v2', async () => {
        const currentDir = dirname(
            fileURLToPath(
                import.meta.url
            )
        )
        const fileData = new FormData();
        const fileBuffer = readFileSync(join(currentDir, '/../assets/sales-invalid-value-v2.txt'));
        fileData.append('txtFile', fileBuffer)
        const response = await fetch(`${BASE_URL}/transaction/txt-import`, {
            method: 'POST',
            body: fileBuffer
        })
        const error = new ValueIsInvalidError()
        deepStrictEqual(response.status, error.getCode())
        const message = await response.text()
        const includes = message.includes(error.getBaseMessage())
        deepStrictEqual(includes, true)
    })

    it('it should return an array of transactions', async () => {
        const response = await fetch(`${BASE_URL}/transaction`, {
            method: 'GET'
        })
        deepStrictEqual(response.status, 200)
        const result = await response.json()
        deepStrictEqual(result instanceof Array, true)
    })

    it('it should return the sum of the total value of transactions', async () => {
        const response = await fetch(`${BASE_URL}/transaction/sum-value`, {
            method: 'GET'
        })
        deepStrictEqual(response.status, 200)
        const result = await response.json()
        deepStrictEqual(!isNaN(Number(result.sumValue)), true)
    })

    after(async done => {
        _server.close(done)
        await Transaction.destroy({ truncate: true })
        await Type.destroy({ truncate: true })
    })
})
