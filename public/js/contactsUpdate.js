/*
Filename: contactsUpdate.js
Student: Zicong Liang
Student#: 301068166
Date: 10/19/2021
*/

if(!window.localStorage.isLogin) location.href = '/login'

let dataId = location.search.split('=')[1]; 
if(!dataId) location.href = '/contactsManage'
else  getDetail();

function getDetail(){
	
	ajax('/api/read',{id: dataId}).then(r=> {
		if(r.code !== 200) return alert('Network busy');
		
		$("#n-name").value = r.data.name;
		$("#n-phone").value = r.data.phone;
		$("#n-email").value = r.data.email;
	})
	
}

function update(id){
	const form = {
		id: dataId,
		name: $("#n-name").value,
		phone: $("#n-phone").value,
		email: $("#n-email").value,
	}
	
	ajax('/api/update',form).then(r=> {
		if(r.code !== 200) return alert('Update failed');
		alert('Update success!');
		location.href = '/contactsManage'
	})
	
	
}

function del(){
	
	ajax('/api/del',{id:dataId}).then(r=>{
		if(r.code !== 200) return alert('Deletion failed');
		alert('Delete success');
		location.href = '/contactsManage'
		getData();
	})
	
}