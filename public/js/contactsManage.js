/*
Filename: contactsManage.js
Student: Zicong Liang
Student#: 301068166
Date: 10/19/2021
*/

if(!window.localStorage.isLogin) location.href = '/login'
else getData()
function getData(){
	ajax('/api/get').then(r=>{
		if(r.code !== 200) return alert('Network busy');
		$("#list").innerHTML = r.data.map(v=> `
			<tr>
				<td>${v.name}</td>
				<td>${v.phone}</td>
				<td>${v.email}</td>
				<td>
					<button style="color:#01b9fe"><a href="/contactsUpdate?id=${v.id}">Update</a></button>
					<button style="color:#f00" onclick="del(${v.id})">Delete</button>
				</td>
			</tr> 
		`).join('');
	})
}



function del(id){
	
	ajax('/api/del',{id: id}).then(r=>{
		if(r.code !== 200) return alert('Deletion failed');
		alert('Delete success');
		getData();
	})
	
}


function logout(){
	alert("Logout!")
	window.localStorage.removeItem('isLogin')
	location.href = '/'
}