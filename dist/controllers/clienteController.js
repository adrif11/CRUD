"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleted = exports.update = exports.researchAll = exports.create = void 0;
const clienteModel_1 = require("../models/clienteModel");
const uuid_1 = require("uuid");
const create = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let cliente = request.body;
    cliente.id = (0, uuid_1.v4)();
    clienteModel_1.clientes.push(cliente);
    console.log(cliente);
    response.status(201).send({ "message": "Metodo HTTP: método create." });
});
exports.create = create;
const researchAll = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.status(200).send(clienteModel_1.clientes);
    //response.send({"message": "Metodo HTTP: método researchAll."})
});
exports.researchAll = researchAll;
const update = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { nome, email, celular } = request.body;
    const clienteIndice = clienteModel_1.clientes.findIndex(c => c.id === id);
    if (clienteIndice < 0) {
        yield response.status(404).send({ "Error": "404 : Recurso não localizado." });
    }
    else if (!nome || !email) {
        yield response.status(400).send({ "Error": "400 : Campos incompletos" });
    }
    else {
        clienteModel_1.clientes[clienteIndice] = { id, nome, email, celular };
        yield response.send({ "message": "OK - Recurso atualizado com sucesso!" });
    }
});
exports.update = update;
const deleted = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const clienteIndice = clienteModel_1.clientes.findIndex(c => c.id === id);
    if (clienteIndice < 0) {
        yield response.status(404).send({ "Error": "404 : Recurso não localizado." });
        return;
    }
    console.log(clienteIndice);
    clienteModel_1.clientes.splice(clienteIndice, 1);
    console.log(clienteModel_1.clientes);
    yield response.send({ "message": "OK - Recurso deletado com sucesso!" });
});
exports.deleted = deleted;
