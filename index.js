const http = require('http')
const router = require('./router')
// const url = require('url')
// const path = require('path')

const server = http.createServer(router)

const PORT = process.env.PORT || 8000
server.listen(PORT, () => console.log(`Server is running! : ${PORT}`))

