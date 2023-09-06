import { describe, it } from 'node:test'
import { fail, ok } from 'node:assert'
import 'dotenv/config'
import getConnection from './getConnection.js'

describe('connection', () => {
    it('ge(): it should return one array', async () => {
        try {
            const connection = getConnection()
            await connection.authenticate();
            ok(true, 'Connection has been established successfully.');
        } catch (error) {
            fail('erro in get connection')
        }
    })
})
