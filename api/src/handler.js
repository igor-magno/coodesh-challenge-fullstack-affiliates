import { parse } from 'node:url'
import routes from './routes/Route.js'

const allRoutes = {
    ...routes,
    '/status:get': (request, response) => {
        response.end('Api is runing.')
    },
    notFound: (request, response) => {
        response.writeHead(404)
        response.end('Endpoint does not found!')
    }
}

const handler = (request, response) => {
    const {
        url,
        method
    } = request

    const {
        pathname
    } = parse(url, true)

    const key = `${pathname}:${method.toLowerCase()}`
    const chosen = allRoutes[key] || allRoutes.notFound

    return Promise.resolve(chosen(request, response))
        .catch(handlerError(response))
}

const handlerError = (response) => {
    return error => {
        let code = 500
        let message = error.message
        if('getCode' in error) code = error.getCode()
        if('getMessage' in error) message = error.getMessage()
        response.writeHead(code)
        return response.end(message)
    }
}

export default handler
