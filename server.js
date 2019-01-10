const http = require('http')
const fs = require('fs')
const ws = require('socket.io')
const server = http.createServer((req, res) => {
    let html = fs.readFileSync('client.html')
    res.end(html)

})  //创建Web服务
const io = ws(server)//基于相当web服务开启socket实例
// 检测连接信息
io.on('connection', (socket) => {
    console.log('有客户端连接')
    //接受客户端锁发送的连接
    socket.on('message', (json) => {
        // 向所有客户端广播发送的消息
        console.log(json)
        io.emit('message', json)
    })
})
server.listen(3000)

