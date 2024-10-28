import { UUID } from "crypto"

interface Cliente {
    id : string
    nome : string,
    email : string,
    celular : string
}

const clientes : Cliente [] = []

export {Cliente, clientes}