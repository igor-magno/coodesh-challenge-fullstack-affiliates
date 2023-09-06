import { describe, it } from 'node:test'
import { deepEqual } from 'node:assert'
import 'dotenv/config'
import TypeRepository from './TypeRepository.js'
import TypeModel from '../models/Type.js'

describe('TypeRepository Integration Test', () => {
    const _typeRepository = new TypeRepository({ typeModel: TypeModel })
    it('all(): it should return one array', async () => {
        TypeModel.destroy({ truncate: true })
        const types = await _typeRepository.all()
        deepEqual(types, [])
    })
})
