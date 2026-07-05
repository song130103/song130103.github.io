
// 修改变量名，解决函数与变量重名冲突
let m = 0;getItem(3,res=>{
    if(!(res='n')){document.getElementById('desktop').style.backgroundImage=res;document.getElementById('desktop').style.backgroundRepeat='no-repeat';document.getElementById('desktop').style.backgroundSize='cover';}});
const wd = document.getElementById('wd');
const wds = document.getElementById('wds');
document.getElementById('startSelection').style.display = 'none';
document.getElementById('launching').style.display = 'block';
setTimeout(()=>{
document.getElementById('launching').style.display = 'none';
document.getElementById('desktop').style.display = 'block';},300);
function start(o){
if(o == 'zhubuntu'){
document.getElementById('startSelection').style.display = 'none';
document.getElementById('launching').style.display = 'block';
setTimeout(()=>{
document.getElementById('launching').style.display = 'none';
document.getElementById('desktop').style.display = 'block';
  
  }, 300);
}else if(o=='Windows14'){
  alert('It is just a demo , is not real one.');window.open('http://www.zreamer.top/Win14SimuNew/');
}else if(o=='ubuntu'){alert('It is just a demo , is not real one.');
  window.open('https://vivek9patel.github.io/');

  }
else{
  alert('This system have not been developed yet.');
}
  }

let x = 0;
getItem(2,res=>{
    if(!(res=1)){opn('guide');}});

  setInterval(()=>{
if(x == 360)
  {
x = 0;
  }
document.getElementById('u').style.transform = `rotate(${x}deg)`;
  x++;
}, 1);

  function opn(a){
wd.style.display = 'block';
  wds.src = `app/${a}.html`;
wd.style.height = '70vh';
  wd.style.width = '70vw';
wd.style.zIndex = '100';
  wd.style.top = '50px';
wd.style.left = '18vw';
  wd.style.borderRadius = '5px';
wds.style.borderRadius = '5px';
  }

function closeWindow() {
  wd.style.display = 'none';
// 关闭窗口重置拖拽状态
  dragStatus = 0;
}

  function fullWindow() {
wd.style.top = '3vh';
  wd.style.left = '17vw';
wd.style.height = '97vh';
  wd.style.width = '83vw';
wd.style.bottom = '0';
  wd.style.right = '0';
wds.style.borderRadius = '0';
  }

// 移除无用形参
  function unfullWindow() {
wd.style.display = 'block';
  wd.style.height = '70vh';
wd.style.width = '70vw';
  wd.style.zIndex = '100';
wd.style.top = '50px';
  wd.style.left = '18vw';
wd.style.borderRadius = '5px';
  wds.style.borderRadius = '5px';
}
  function mv(){setTimeout(()=>{m=1;},100);}
// 开启拖拽标记
  document.addEventListener('click',function(e){if(m==1){wd.style.top=e.clientY+'px';wd.style.left=e.clientX+'px';m = 0;}});
setInterval(()=>{
  const now = new Date();
ir=now.getMinutes();
  if(ir<10){document.getElementById('time').innerHTML=`${now.getHours()}:0${now.getMinutes()}`;document.getElementById('tme').innerHTML=`${now.getHours()}:0${now.getMinutes()}`;}
else{
  document.getElementById('time').innerHTML=`${now.getHours()}:${now.getMinutes()}`;document.getElementById('tme').innerHTML=`${now.getHours()}:${now.getMinutes()}`;
}
  },1000);
function options(){
  document.getElementById('opt').style.display='block';
}function hide(){
  document.getElementById('opt').style.display='none';
}
  function lc(){
document.getElementById('lockscreen').style.display='flex';
  }function ulc(){
document.getElementById('lockscreen').style.display='none';
  }

function showAlert(a){
  document.getElementById('allt').style.display='flex';
document.getElementById('alltctt').innerHTML=a;
  }
function clsalt(){document.getElementById('allt').style.display='none';}

  // 写入
// 写入函数
function saveItem(id, val) {
	const request = indexedDB.open("simpleDB", 1);
	request.onupgradeneeded = (e) => {
		const db = e.target.result;
		if (!db.objectStoreNames.contains("main")) {
			db.createObjectStore("main", { keyPath: "id" });
		}
	};
	request.onsuccess = (e) => {
		const db = e.target.result;
		if (!db.objectStoreNames.contains("main")) return;
		const tx = db.transaction("main", "readwrite");
		const store = tx.objectStore("main");
		store.put({ id, data: val });
	};
	request.onerror = (err) => console.error("saveItem 数据库打开失败", err);
}

// 读取函数
function saveItem(id, cb) {
	const request = indexedDB.open("simpleDB", 1);
	request.onupgradeneeded = (e) => {
		const db = e.target.result;
		if (!db.objectStoreNames.contains("main")) {
			db.createObjectStore("main", { keyPath: "id" });
		}
	};
	request.onsuccess = (e) => {
		const db = e.target.result;
		if (!db.objectStoreNames.contains("main")) {
			cb(null);
			return;
		}
		const tx = db.transaction("main");
		const store = tx.objectStore("main");
		const query = store.get(id);
		query.onsuccess = () => cb(query.result?.data ?? null);
	};
	request.onerror = (err) => console.error("getItem 数据库打开失败", err);
}
function getItem(key, callback){
let res = localStorage.getItem(key) || "";
callback(res);
}
function saveItem(key, val){
localStorage.setItem(key, val);
}

let ctt;
let removingAppName;
let removingAppURI;
function sbmta(){
const name = document.getElementById('userAppName').value.replace(/"/g, '&quot;');
const uri = document.getElementById('userAppURI').value.replace(/"/g, '&quot;');
const html = `<div class="appmore" id="${uri}" onclick="window.open('${uri}')" oncontextmenu="removeSelection(event, '${uri}', '${name}')">${name}</div><br>`;
getItem(1,res=>{saveItem(1,html+res)});
alert('App link saved');
getItem(1, res => {
document.getElementById('alst').innerHTML= res;
});
document.getElementById('maskAddApp').style.display='none';
}
getItem(1, res => {
document.getElementById('alst').innerHTML= res;
});
function removeSelection(event, uri, name){
event.preventDefault();
removingAppURI = uri;
removingAppName = name;
document.getElementById('maskRemoveApp').style.display = 'block';
}
function removeAppYes(){
const rmvctt = `<div class="appmore" id="${removingAppURI}" onclick="window.open('${removingAppURI}')" oncontextmenu="removeSelection(event, '${removingAppURI}', '${removingAppName}')">${removingAppName}</div><br>`;
getItem(1,acti=>{
saveItem(1, acti.replace(rmvctt, ''));
document.getElementById('alst').innerHTML= acti.replace(rmvctt, '');
});
document.getElementById('maskRemoveApp').style.display='none';
}
function hide(){
document.getElementById('opt').style.display='none';
}
function options(){
document.getElementById('opt').style.display='block';
}