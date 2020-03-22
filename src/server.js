const express = require("express")
const mongoose = require("mongoose")
const path = require('path')
const cors = require("cors")

const app = express();
app.use(cors())

const server = require("http").Server(app)
const io = require("socket.io")(server)

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box)
    })
})

mongoose.connect('mongodb+srv://omnistack:omnistack123@cluster0-bic8w.mongodb.net/dropbox?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

app.use((req, res, next) => {
    req.io = io
    return next()
})


/*ajuda o servidor a entender as requisições quue vem em formato json
um seviço que retornar e recebe dados em json */
app.use(express.json()) 

//permite que envie arquivos tipo img.mp4 nas requisções
app.use(express.urlencoded({ extended: true }))
app.use("/files", express.static(path.resolve(__dirname, '..','temp')))

app.use(require('./routes'))

server.listen(process.env.PORT || 3333)