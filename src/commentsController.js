import { PrismaClient } from '@prisma/client'
import cloudinary from 'cloudinary'

const prisma = new PrismaClient()

async function comments(req, res) {
  try {
    const CreateComment = await prisma.comments.create({
      data: {
        author: req.body.author,
        post_id: req.params.id,
        comment: req.body.comment,
      },
    })

    return res.status(201).send({ CreateComment })
  } catch (error) {
    return res.status(400).send({ msg: 'Error', error })
  }
}

async function getAllComments(req, res) {
  try {
    const Comments = await prisma.comments.findMany()

    return res.status(201).send({ Comments })
  } catch (error) {
    return res.status(400).send({ msg: 'Error', error })
  }
}

export default { comments, getAllComments }
