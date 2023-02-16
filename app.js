const express = require('express');
const path = require('path');
const app = express();

const route = [
	{
		methode:'get',
		address:'/',
		callback(req,res){
			res.sendFile('/more/index.html',{root:path.join(__dirname)},function(err){if(err)console.log(err)});
		}
	},
	{
		methode:'get',
		address:'/scripts',
		callback(req,res){
			res.sendFile(`/more/${req.query.fn}.js`,{root:path.join(__dirname)},function(err){if(err)console.log(err)});
		}
	},
	{
		methode:'get',
		address:'/style',
		callback(req,res){
			res.sendFile('/more/style.css',{root:path.join(__dirname)},function(err){if(err)console.log(err)});
		}
	},
	{
		methode:'get',
		address:'/media',
		callback(req,res){
			res.sendFile(`/more/media/${req.query.fn}`,{root:path.join(__dirname)},function(err){if(err)console.log(err)})
		}
	},
	{
		methode:'get',
		address:'/reqDB',
		callback(req,res){
			res.sendFile(`/more/db/data.js`,{root:path.join(__dirname)},function(err){if(err)console.log(err)})
		}
	}
];
route.forEach((opt)=>{app[opt.methode](opt.address,(req,res)=>{opt.callback(req,res)});})

app.listen(process.env.PORT||8080,()=>console.log('am lived!'));
