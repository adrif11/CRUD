import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client'
import { ErrorRequest } from '../utils/TratamentoErros'

const prisma = new PrismaClient()

//********************************************************************************************* */
export const create = async (request: Request, response: Response) => {
    const { titulo, ano_publicacao, genero } = request.body
    try {
        const result = await prisma.livro.create({
            data: {
                titulo: titulo,
                ano_publicacao: ano_publicacao,
                genero: genero
            }
        })
        response.status(201).send({
            "message": "Metodo HTTP: método create."
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code)
            response.status(409).json({
                error: {
                    message: ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            })
        }
    }
}
//********************************************************************************************* */
export const researchAll = async (request: Request, response: Response) => {
    try {
        const result = await prisma.livro.findMany({})
        response.status(200).json(result)
        console.log(result)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code)
            response.status(409).json({
                error: {
                    message: ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            })
        }
    }
}

//********************************************************************************************* */
export const update = async (request: Request, response: Response) => {
    const id = request.params.id
    const { titulo, ano_publicacao, genero } = request.body

    try {
        const result = await prisma.livro.update({
            where: { id: Number(id) },
            data: {
                titulo: titulo,
                ano_publicacao: ano_publicacao,
                genero: genero
            }
        })
        console.log(result)
        response.status(200).json(result)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code)
            response.status(409).json({
                error: {
                    message: ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            })
        }
    }
}
//********************************************************************************************* */
export const deleted = async (request: Request, response: Response) => {
    const id = request.params.id
    const { titulo, ano_publicacao, genero } = request.body

    try {
        const result = await prisma.livro.delete({
            where: { id: Number(id) },

        })
        console.log(result)
        response.status(200).json(result)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code)
            response.status(409).json({
                error: {
                    message: ErrorRequest.errorRequest(error.code),
                    field: error.meta
                }
            })
        }
    }

}