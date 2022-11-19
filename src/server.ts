import Fastify from 'fastify';
import cors from '@fastify/cors'

import { FunctionalDocument } from './routes/FunctionalDocument'


async function bootsstrap(){
    const fastify = Fastify({
        logger: true, //send log for all actions on application
    })

    await fastify.register(cors,{
        origin:true
    })

    fastify.register(FunctionalDocument)

    await fastify.listen({ port: 3333, /*host:'0.0.0.0'*/ })
}

bootsstrap();