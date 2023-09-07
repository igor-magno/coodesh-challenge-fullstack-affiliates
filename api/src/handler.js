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
        response.writeHead(error.getCode())
        return response.end(error.getMessage())
    }
}

export default handler
