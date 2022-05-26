import { Router } from 'express'
import multer from 'multer'
import commentsController from './commentsController'
import postController from './postController'
import uploadConfig from './uploadConfig'

const upload = multer(uploadConfig)

const routes = Router()

routes.get('/', (req, res) => {
  return res.send({ msg: 'API version 1.0' })
})
routes.get('/get-all', postController.getAll)
routes.post('/register', upload.single('image'), postController.register)
routes.put('/update/:id', upload.single('image'), postController.update)
routes.put('/likes/:id', postController.updateLikes)
routes.put('/views/:id', postController.updateViews)
routes.delete('/del/:id', postController.deleted)

routes.post('/comments/:id', commentsController.comments)
routes.get('/commentsGetAll', commentsController.getAllComments)

export default routes
