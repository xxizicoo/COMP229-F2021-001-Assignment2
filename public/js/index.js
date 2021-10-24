/*
Filename: index.js
Student: Zicong Liang
Student#: 301068166
Date: 10/01/2021
*/

const $ = (s,all)=> document[all ? 'querySelectorAll' : 'querySelector'](s)

$('.n-nav a',1).forEach(a=> {
	a.parentElement.className = a.href === location.href ? 'n-nav-this' : ''
} ) 



function ajax(url,data){
	return fetch(url,{
		method: 'POST',
		headers:{
			'Content-Type': 'appliction/json',
		},
		body: JSON.stringify(data)
	}).then(r=> r.json())
}


function sub(){
	const form = {
		name: $("#n-name").value + ' ' +  $("#n-name2").value,
		phone: $("#n-phone").value,
		email: $("#n-email").value,
		msg: $("#n-msg").value,
	}
	
	ajax('/api/add',form).then(r=> {
	
		alert('Submit success!');
		location.href= '/';
	})
}

