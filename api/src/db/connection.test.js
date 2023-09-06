import { describe, it } from 'node:test'
import { ok, fail } from 'node:assert'
import connection from './connection.js'

describe('Connection Integration test', () => {
    it('it should report that the connection was successfully established', async () => {
        try {
            await connection.authenticate();
            ok(true, 'Connection has been established successfully.');
        } catch (error) {
            fail('erro in get connection')
        }
    })
})
