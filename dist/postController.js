'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _client = require('@prisma/client');

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prisma = new _client.PrismaClient();

var imagem = '';
var resultado = '';

async function register(req, res) {
  try {
    _cloudinary2.default.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    _cloudinary2.default.uploader.upload(req.file.path, function (result, error) {
      imagem = result.secure_url;
      resultado = result;
      console.log(resultado);
    });

    await prisma.posts.create({
      data: {
        title: req.body.title,
        author: req.body.author,
        image: imagem,
        text: req.body.text,
        description: req.body.description,
        likes: Number(req.body.likes),
        views: Number(req.body.views)
      }
    });

    return res.status(201).send({ msg: 'Post cadastrado!!!' });
  } catch (error) {
    return res.status(400).send({ msg: 'Error', error });
  }
}

async function update(req, res) {
  try {
    _cloudinary2.default.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    _cloudinary2.default.uploader.upload(req.file.path, function (result, error) {
      imagem = result.secure_url;
      resultado = result;
      console.log(resultado);
    });

    await prisma.posts.update({
      where: { id: req.params.id },
      data: {
        title: req.body.title,
        author: req.body.author,
        image: imagem,
        text: req.body.text,
        description: req.body.description,
        likes: Number(req.body.likes),
        views: Number(req.body.views)
      }
    });

    return res.status(201).send({ msg: 'Post Editado!!!' });
  } catch (error) {
    return res.status(400).send({ msg: 'Error', error });
  }
}

async function updateLikes(req, res) {
  try {
    const dataLike = await prisma.posts.findFirst({
      where: { id: req.params.id }
    });

    await prisma.posts.update({
      where: { id: req.params.id },
      data: {
        likes: dataLike.likes + 1
      }
    });

    console.log(dataLike);
    const numberLikes = dataLike.likes;
    // const Like = dataLike.likes

    return res.status(200).send({ msg: 'Like adicionado!!!', numberLikes });
  } catch (error) {
    return res.status(400).send({ msg: 'Error', error });
  }
}

async function updateViews(req, res) {
  try {
    const dataLike = await prisma.posts.findFirst({
      where: { id: req.params.id }
    });

    await prisma.posts.update({
      where: { id: req.params.id },
      data: {
        views: dataLike.views + 1
      }
    });

    console.log(dataLike);
    const numberViews = dataLike.views;

    return res.status(200).send({ msg: 'Like adicionado!!!', numberViews });
  } catch (error) {
    return res.status(400).send({ msg: 'Error', error });
  }
}

async function getAll(req, res) {
  try {
    const number = 2;

    // const { number } = req.params

    const data = await prisma.posts.findMany({
      // take: Number(number),
      // skip: 1,

      orderBy: {
        createdAt: 'desc'
      }
    });
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send({ message: 'ERROR no controller getall!' });
  }
}

async function deleted(req, res) {
  try {
    await prisma.posts.delete({
      where: { id: req.params.id }
    });
    return res.status(200).send({ msg: 'Post Deletado!!!' });
  } catch (error) {
    return res.status(400).send({ message: 'ERROR no controller getall!' });
  }
}

exports.default = { getAll, updateViews, updateLikes, deleted, update, register };