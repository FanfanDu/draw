//引入http模块
var http = require("http");
//引入socket.io模块
var ioFunc = require("socket.io");
//实例化express
//创建普通服务器
var server = http.createServer()
	//实例化第一个socket的服务端
var io = ioFunc(server);
//保存题目
var text;
//创建连接
io.on("connection", function(socket) {
		//接受图案的路径
		socket.on("draw", function(data) {
				io.sockets.emit("paint", data);
			})
			//监听停笔的事件
		socket.on("stop", function(data) {
				io.sockets.emit("paint", "stop");
			})
			//接受清除画布的事件
		socket.on("clear", function(data) {
				io.sockets.emit("clear", "clear");
			})
			//接受题目
		socket.on("ask", function(data) {
			text = data;
			console.log("答案:" + text);
		})
		socket.on("answer", function(data) {
			console.log("回答:" + data);
			if(data==text){
				//正确
				io.sockets.emit("answer", "right");
			}else{
				//错误
				io.sockets.emit("answer", "wrong");
			}
		})
	})
	//用8899端口去监听这个服务器
server.listen(8899);
console.log("开启socket.io服务器");