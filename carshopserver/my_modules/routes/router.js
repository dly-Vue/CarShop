const express = require('express');           //使用express
const router = express.Router();               //放数据
const DB = require('../Base/Base')
//问题一，使用了中间件body-parser，必须和接受数据的请求放在一块

module.exports = function (app) {
	//注册模块的路由
	app.post('/index/register', function (req, res) {
		let Model = new DB('user');
		Model.where({ userName: req.body.userName })
			.select(function (result) {
				if (result != "") {
					// 如果登录成功，我们把用户的信息保存到session中，用于用户已经登录的凭证
					console.log("注册失败");
					console.log(result)
					res.json({ "content": "2" });
				} else {
					Model.data({ userName: req.body.userName, userPassword: req.body.userPassword })
						.insert(function (result) {
							if (result) {
								// console.log("注册成功");
								res.json({ "content": "1" })
							} else {
								// console.log("注册失败");
								res.json({ "content": "2" })
							}
						});
					let insertModel = new DB('userinfo');
					insertModel.data({ userName: req.body.userName, userPassword: req.body.userPassword })
						.insert(function (result) {
							console.log(result);
						});
				}
			})

	});
	//登录模块的路由
	app.post('/index/login', function (req, res) {
		let Model = new DB('user')
		Model.where({ userName: req.body.userName, userPassword: req.body.userPassword })
			.select(function (result) {
				if (result != "") {
					// 如果登录成功，我们把用户的信息保存到session中，用于用户已经登录的凭证
					console.log("登录成功");
					console.log(result)
					res.json({ "content": "1" });
				} else {
					console.log("登录失败");
					res.json({ "content": "2" });
				}
			})
	});
	//汽车中心所有的数据
	app.post('/carcenter', function (req, res) {
		let Model = new DB('user')
		Model.where({ userName: req.body.userName, userPassword: req.body.userPassword })
			.select(function (result) {
				if (result != "") {
					// 如果登录成功，我们把用户的信息保存到session中，用于用户已经登录的凭证
					console.log("登录成功");
					console.log(result)
					res.json({ "content": "1" });
				} else {
					console.log("登录失败");
					res.json({ "content": "2" });
				}
			})
	});
	//个人中心的数据
	app.post('/user/userinfo', function (req, res) {
		let Model = new DB('userinfo')
		Model.where({ userName: req.body.userName })
			.select(function (result) {
				res.json(result[0]);
			})
	});
	//保存修改的用户信息
	app.post('/user/saveuserinfo', function (req, res) {
		let Model = new DB('userinfo')
		console.log(req.body);
		Model.where({ userName: req.body.userName }).data(req.body)
			.update(function (result) {
				if(result){
					res.json({ "content": "1" });
				}else{
					res.json({ "content": "2" });
				}
				
			})
	});
	//读取用户收货地址的信息
	app.post('/user/useraddress', function (req, res) {
		let Model = new DB('useraddress')
		Model.where({ userName: req.body.userName })
			.select(function (result) {
				res.json(result);
			})
	});
	//添加用户收货地址的信息
	app.post('/user/adduseraddress', function (req, res) {
		let Model = new DB('useraddress')
		console.log(req.body);
		Model.data({ userName: req.body.userName,userAddress:req.body.userAddress})
		.insert(function (result) {
			console.log("22");
		});
	});
	//获取购物车商品信息
	app.post('/user/shopcar', function (req, res) {
		let Model = new DB('usershopcar')
		Model.where({ userName: req.body.userName})
		.select(function (result) {
			res.json(result);
		});
	});
}