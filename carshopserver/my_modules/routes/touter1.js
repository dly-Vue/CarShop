const express = require('express');           //使用express
const router = express.Router();               //放数据
const DB = require('../Base/Base');
const qs = require('qs');



module.exports = function (app) {
	//注册模块的路由

	app.post('/index/register', function (req, res) {
        let Model=new DB('user');
		Model.where({ userName: req.body.userName })
			.select(function (result) {
				if (result != "") {
					// 如果登录成功，我们把用户的信息保存到session中，用于用户已经登录的凭证
					console.log("注册失败");
					//console.log(result)
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
					//console.log(result)
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
		//console.log(req.body);
		Model.where({ userName: req.body.userName }).data(req.body)
			.update(function (result) {
				if (result) {
					res.json({ "content": "1" });
				} else {
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
		//console.log(req.body);
		Model.data({ userName: req.body.userName, userAddress: req.body.userAddress })
			.insert(function (result) {
				//console.log("22");
			});
	});
	//获取购物车商品信息
	app.post('/user/shopcar', function (req, res) {
		let Model = new DB('usershopcar')
		Model.where({ userName: req.body.userName, payMoney: 1 })
			.select(function (result) {
				res.json(result);
			});
	});
	//获取所有商品的信息
	app.post('/car/allCar', function (req, res) {
		let Model = new DB('allCar');
		Model.select(function (result) {
			res.json(result);
		})
	});
	//获取部分商品的信息
	app.post('/car/someCar', function (req, res) {
		let Model = new DB('allCar');
		Model.limit(0, 20).select(function (result) {
			res.json(result);
		})
	});
	//获取单个商品的信息
	app.post('/car/oneCarInfo', function (req, res) {
		let Model = new DB('allCar');
		console.log(req.body);
		Model.where({ carId: req.body.carId }).select(function (result) {
			console.log(result)
			res.json(result);
		})

	});
	//将商品的信息提交到数据库
	app.post('/car/addShop', function (req, res) {
		let Model = new DB('usershopcar');
		console.log(req.body);
		//如果数据库有这个数据，直接数量+1；否则直接插入
		Model.where({ carId: req.body.carId, userName: req.body.userName, payMoney: 1 })
			.select(function (result) {
				if (result.length != 0) {
					Model.data({ carNumber: result[0].carNumber + 1 }).where({ carId: req.body.carId, userName: req.body.userName, payMoney: 1 })
						.update(function (result) {
							if (result) {
								console.log({ "content": "修改成功" })
								res.json()
							}
						});
				}
				else {
					Model.data(req.body)
						.insert(function (result) {
							if (result) {
								console.log({ "content": "插入成功" })
								res.json({ "content": "插入成功" })
							}
						});
				}

			})


	});
	//将商品的信息修改
	app.post('/car/submitData', function (req, res) {
		let Model = new DB('usershopcar');
		let data = qs.parse(req.body)
		let arr = Object.keys(data).map(key => data[key]);
		for (let i = 0; i < arr.length; i++) {
			Model.where({ userName: arr[i].userName, carId: arr[i].carId, payMoney: 1 })//修改其中的数据
				.data({ carNumber: arr[i].carNumber })
				.update(function (result) {

				});
		}
	});
	//删除一些没有的商品 
	app.post('/car/deleteCar', function (req, res) {
		let Model = new DB('usershopcar');
		let data = qs.parse(req.body)
		let arr = Object.keys(data).map(key => data[key]);
		//console.log(arr)
		for (let i = 0; i < arr.length; i++) {
			Model.where({ userName: arr[i].userName, carId: arr[i].carId, payMoney: 1 }).delete(function (result) {
			})
		}

	});
	//修改商品购买状态
	app.post('/car/upData', function (req, res) {
		let Model = new DB('usershopcar');
		let data = qs.parse(req.body)
		let arr = Object.keys(data).map(key => data[key]);
		for (let i = 0; i < arr.length; i++) {
			Model.where({ userName: arr[i].userName, carId: arr[i].carId, payMoney: 1 })//修改其中的数据
				.data({ payMoney: 2 })
				.update(function (result) {
					console.log("修改成功")
				});
		}
	});
	//获得订单信息
	app.post('/car/reck', function (req, res) {
		let Model = new DB('usershopcar');
	    console.log(req.body);
	    Model.where({userName:req.body.userName,payMoney:2}).select(function(result){
			console.log(result);
			res.json(result)
		})
	});
}
