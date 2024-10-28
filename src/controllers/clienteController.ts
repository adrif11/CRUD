import { Request,Response } from 'express';
import {Cliente, clientes} from '../models/clienteModel'
import {v4 as uuidv4 } from 'uuid'

export const create = async (request: Request, response: Response) => {
    let cliente : Cliente = request.body
    cliente.id = uuidv4()
    clientes.push(cliente)
    console.log(cliente)
    response.status(201).send({"message": "Metodo HTTP: método create."})
    
}
export const researchAll = async (request: Request, response: Response) => {
    response.status(200).send(clientes)
    //response.send({"message": "Metodo HTTP: método researchAll."})
}
export const update = async (request: Request, response: Response) => {
    const {id} = request.params
    const {nome, email, celular} = request.body
    const clienteIndice = clientes.findIndex(c => c.id === id)
    if(clienteIndice < 0){
        await response.status(404).send({"Error": "404 : Recurso não localizado."})
    }
    else if(!nome || !email){
        await response.status(400).send({"Error": "400 : Campos incompletos"})
    }
    else{
        clientes[clienteIndice] = {id,nome,email,celular};
        await response.send({"message": "OK - Recurso atualizado com sucesso!"})
    }
    
}
export const deleted = async (request: Request, response: Response) => {
    const {id} = request.params
    const clienteIndice = clientes.findIndex(c => c.id === id)
    if(clienteIndice < 0){
        await response.status(404).send({"Error": "404 : Recurso não localizado."})
        return;
    }
        console.log(clienteIndice)
        clientes.splice(clienteIndice,1)
        console.log(clientes)
        await response.send({"message": "OK - Recurso deletado com sucesso!"})
    
}