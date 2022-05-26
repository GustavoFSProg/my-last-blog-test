'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _commentsController = require('./commentsController');

var _commentsController2 = _interopRequireDefault(_commentsController);

var _postController = require('./postController');

var _postController2 = _interopRequireDefault(_postController);

var _uploadConfig = require('./uploadConfig');

var _uploadConfig2 = _interopRequireDefault(_uploadConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upload = (0, _multer2.default)(_uploadConfig2.default);

const routes = (0, _express.Router)();

routes.get('/', (req, res) => {
  return res.status(200).send({ msg: 'API version 1.0' });
});
routes.get('/get-all', _postController2.default.getAll);
routes.post('/register', upload.single('image'), _postController2.default.register);
routes.put('/update/:id', upload.single('image'), _postController2.default.update);
routes.put('/likes/:id', _postController2.default.updateLikes);
routes.put('/views/:id', _postController2.default.updateViews);
routes.delete('/del/:id', _postController2.default.deleted);

routes.post('/comments/:id', _commentsController2.default.comments);
routes.get('/commentsGetAll', _commentsController2.default.getAllComments);

exports.default = routes;