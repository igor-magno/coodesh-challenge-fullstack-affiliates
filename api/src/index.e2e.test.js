import { describe, before, after, it } from 'node:test'
import { deepStrictEqual } from 'node:assert'
import 'dotenv/config'

process.env.APP_URL = process.env.TEST_APP_URL
process.env.APP_PORT = process.env.TEST_APP_PORT
const BASE_URL = `${process.env.APP_URL}:${process.env.APP_PORT}`

describe('Api status test suite', () => {
    let _server = {}

    before(async () => {
        _server = (await import('./index.js')).server

        await new Promise(resolve => _server.on('listening', resolve()))
    })

    it('it should return status 200 api is runing', async () => {
        const request = await fetch(`${BASE_URL}/status`)
        deepStrictEqual(request.status, 200)
    })

    it('it should return status 404 endpoint not found', async () => {
        const request = await fetch(`${BASE_URL}`)
        deepStrictEqual(request.status, 404)
    })

    after(done => _server.close(done))
})
