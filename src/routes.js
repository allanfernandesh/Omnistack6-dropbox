const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/Multer')

const routes = express.Router()

const BoxControllers = require('../src/controllers/BoxController')
const FileController = require('../src/controllers/FileController')

routes.post("/boxes", BoxControllers.store)
routes.post("/boxes/:id/files", multer(multerConfig).single('file'), FileController.store)
routes.get("/boxes/:id", BoxControllers.show)

module.exports = routes