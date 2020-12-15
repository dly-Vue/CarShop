// 加载模块
const express = require('express');
const app = express();                          // 执行express返回express实例对象
const router = require('./my_modules/routes/router')
const bodyparser = require('body-parser');

// app.use('/product', router);

//使用中间件，解决数据问题
app.use(bodyparser.json());     // 使用boddyparser中间件
app.use(bodyparser.urlencoded({
	extended:false
}))

router(app)

//测试所用例子
// app.post('/product', function (req, res, next) {
//     console.log(req.body)
// 	var data = {
// 		code: 0,
// 		data: {
// 			name: req.body.userName,
// 			pwd: req.body.userPassword
// 			// name:"dfa",
// 			// age:12
// 		},
// 		isSuccess: true,
// 		msg: "请求成功"
// 	}
// 	res.json(data);
// });
//跨域问题解决方面
// app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header("Access-Control-Allow-Methods", "*");
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });


// app.get('/',(req,res)=>{
//     res.send('hello world')
// })

router(app)


app.listen(8888, (err) => {
    if (err) {
        console.log('服务器开启失败，详细信息为：')
        console.log(err)
    } else {
        console.log('服务器开启成功：端口为：8888')
    }
})