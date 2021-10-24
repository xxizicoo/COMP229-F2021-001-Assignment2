/*
Filename: login.js
Student: Zicong Liang
Student#: 301068166
Date: 10/19/2021
*/

if(window.localStorage.isLogin) location.href = '/contactsManage'
function login(){
	
	const form = {
		username: $('#username').value,
		password: $('#password').value,
	}
	ajax('/api/login',form).then(r=> {
		if(r.code !== 200) return alert('Wrong username or password');
		alert('Login success!');
		localStorage.setItem('isLogin',1)
		location.href = '/contactsManage';
	})
	
}