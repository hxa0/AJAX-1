var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号\n例如:node server.js 8888')
    process.exit(1)
}

var server = http.createServer(function(request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有用户发送请求！路径（带查询参数）为：' + pathWithQuery)

    if (path === '/index.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        let string = fs.readFileSync('public/index.html') //把这个路径的文件转化成字符创写入
            .toString()
        const page1 = fs.readFileSync('db/page1.json') //读取page1.json文件中的内容，格式为字符串
        const array = JSON.parse(page1) //字符串变成数组
        const result = array.map(item => `<li>${item.id}</li>`).join('') //数组里面的每一项，li标签放入每一项的id,然后将标签放到数组的内衣项目里面，用空字符串连接

        string = string.replace('{{page1}}', `<ul id="xxx">${result}</ul>`) //把{{page1}}变成result内容
        response.write(string)
        response.end()
    } else if (path === '/main.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/main.js'))
        response.end()
    } else if (path === '/style.css') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(fs.readFileSync('public/style.css'))
        response.end()
    } else if (path === '/2.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/2.js'))
        response.end()
    } else if (path === '/3.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(fs.readFileSync('public/3.html'))
        response.end()
    } else if (path === '/4.xml') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/xml;charset=utf-8')
        response.write(fs.readFileSync('public/4.xml'))
        response.end()
    } else if (path === '/5.json') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'application/json;charset=utf-8') //也可以写成tex/json
        response.write(fs.readFileSync('public/5.json'))
        response.end()
    } else if (path === '/page2') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8') //也可以写成application/json
        response.write(fs.readFileSync('db/page2.json'))
        response.end()
    } else if (path === '/page3') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8') //也可以写成application/json
        response.write(fs.readFileSync('db/page3.json'))
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你输入的路径不存在对应的内容`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port)