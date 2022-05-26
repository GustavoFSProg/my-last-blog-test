'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _client = require('@prisma/client');

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prisma = new _client.PrismaClient();

async function comments(req, res) {
  try {
    const CreateComment = await prisma.comments.create({
      data: {
        author: req.body.author,
        post_id: req.params.id,
        comment: req.body.comment
      }
    });

    return res.status(201).send({ CreateComment });
  } catch (error) {
    return res.status(400).send({ msg: 'Error', error });
  }
}

async function getAllComments(req, res) {
  try {
    const Comments = await prisma.comments.findMany();

    return res.status(201).send({ Comments });
  } catch (error) {
    return res.status(400).send({ msg: 'Error', error });
  }
}

exports.default = { comments, getAllComments };