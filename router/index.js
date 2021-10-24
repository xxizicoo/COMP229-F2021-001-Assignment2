/*
Filename: index.js
Student: Zicong Liang
Student#: 301068166
Date: 10/01/2021
*/

const express = require('express');

const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) =>  res.render( 'page/home') );
router.get('/about', (req, res, next) =>  res.render( 'page/about') );
router.get('/contactMe', (req, res, next) =>  res.render( 'page/contactMe') );
router.get('/project', (req, res, next) =>  res.render( 'page/project') );
router.get('/service', (req, res, next) =>  res.render( 'page/service') );
router.get('/login', (req, res, next) =>  res.render( 'page/login') );
router.get('/contactsManage', (req, res, next) =>  res.render( 'page/contactsManage') );
router.get('/contactsUpdate', (req, res, next) =>  res.render( 'page/contactsUpdate') );


const dataBase = {
	contacts:[],
	get(){
		return this.contacts;
	},
	read(id){
		const target = this.contacts.find(function(obj){
			return obj.id == id
		})
		
		return target;
	},
	del(id){
		const idx = this.contacts.findIndex(function(obj){
			return obj.id == id
		})
		if(idx === -1) return false;
		this.contacts.splice(idx,1);
		return true;
	},
	add(obj){
		this.contacts.push({...obj, id: new Date().getTime()})
	},
	update(id,obj){
		const idx = this.contacts.findIndex(function(obj){
			return obj.id == id
		})
		if(idx === -1) return false;
		this.contacts[idx] = {...this.contacts[idx],...obj}; 
		return true;
	}
	
}

const resData = (res,data)=> {
	res.send(JSON.stringify(data))
	res.end()
}

const username = 'admin';
const password = 'admin';

router.post('/api/add', (req, res, next) => {
	req.on('data', e=> {
		dataBase.add( JSON.parse(e.toString('utf8')) );
		resData(res,{code: 200 });
	});
} );

router.post('/api/get', (req, res, next) => {
	
	resData(res,{code: 200, data:  dataBase.get() });
} );

router.post('/api/update', (req, res, next) => {
	req.on('data', e=> {
		const data = JSON.parse(e.toString('utf8'));
		
		const r = dataBase.update(data.id, data);
		resData(res,{code: r ?  200 : 0 });
	});
} );


router.post('/api/del', (req, res, next) => {
	req.on('data', e=> {
		const data = JSON.parse(e.toString('utf8'));
		
		const r = dataBase.del(data.id);
		resData(res,{code: r ?  200 : 0 });
	});
} );


router.post('/api/read', (req, res, next) => {
	req.on('data', e=> {
		const data = JSON.parse(e.toString('utf8'));
		const r = dataBase.read(data.id);
		if(!r) return resData(res,{code:  0 });
		resData(res,{code: 200, data: r });
	});
} );

router.post('/api/login', (req, res, next) => {
	req.on('data', e=> {
		const data = JSON.parse(e.toString('utf8'));
		if(data.username === username && data.password === password) return resData(res,{code: 200 });
		resData(res,{code: 0 });
	});
} );



module.exports = router;