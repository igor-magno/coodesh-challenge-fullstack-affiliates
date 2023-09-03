import { createServer } from 'node:http'
import handler from './handler.js'
import 'dotenv/config'

const PORT = process.env.APP_PORT || 3000

const server = createServer(handler).listen(PORT, () => console.log(`listening to ${PORT}`))

export {
    server
}
