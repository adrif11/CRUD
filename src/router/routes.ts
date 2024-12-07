import { Router } from 'express';
import { create, researchAll, update, deleted } from '../controllers/livroController'

const router = Router()

router.post('/livro', create)
router.get('/livro', researchAll)
router.put('/livro/:id', update)
router.delete('/livro/:id', deleted)

export default router