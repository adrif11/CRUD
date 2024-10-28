import { Router } from 'express';
import {create, researchAll,update,deleted } from '../controllers/clienteController'

const router = Router()

router.post('/cliente',create)
router.get('/cliente',researchAll)
router.put('/cliente/:id',update)
router.put('/cliente/:id',deleted)

export default router