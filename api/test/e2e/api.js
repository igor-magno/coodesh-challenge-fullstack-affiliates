import { describe, before, after } from 'node:test'
import 'dotenv/config'

process.env.APP_URL = process.env.TEST_APP_URL
process.env.APP_PORT = process.env.TEST_APP_PORT
const BASE_URL = `${process.env.APP_URL}:${process.env.APP_PORT}`

describe('Api e2e test', () => {
    let _server = {}

    before(async () => {
        _server = (await import('./index.js')).server

        await new Promise(resolve => _server.on('listening', resolve()))
    })


    after(done => _server.close(done))
})
