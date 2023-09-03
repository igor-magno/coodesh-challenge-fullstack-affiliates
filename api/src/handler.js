import { parse } from 'node:url'

const allRoutes = {
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
        console.log('Something bad has  happened**', error.stack)
        response.writeHead(500)
        response.write('Internal server error!. Try again later. If the error persists, contact support.')

        return response.end()
    }
}

export default handler
