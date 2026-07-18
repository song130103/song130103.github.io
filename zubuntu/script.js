// 页面加载执行
const appWindow={
    get full(){
        fullWindow();
    },
    get unfull(){
        unfullWindow();
    },get close(){
        closeWindow();
    }
};
if (navigator.virtualKeyboard) {
    navigator.virtualKeyboard.overlaysContent = true;
}
// 全局变量提前声明
let m = 0;
let x = 0;
let dragStatus = 0;
let ir;
let ctt;
let removingAppName;
let removingAppURI;
let removingAppIco; // 新增存储待删除应用图标

// 修复1：多行HTML改用反引号``，解决换行语法错误
const defaltApp = `
<div style="width:90%;aspect-ratio: 1 / 1;background:rgba(255,255,255,0);border-radius:50%;display:flex;text-align:center;justify-content:center">
<img src="img/3.webp" style="width:100%;height:100%;object-fit:contain;transition:all 0.3s ease;border-radius:50%" onclick="opn('firefox','ChinaSo Browser')">
</div>
<hr>
<div style="width:90%;aspect-ratio: 1 / 1;background:rgba(255,255,255,0);border-radius:50%;transition:all 0.3s ease;">
<img src="img/4.jpg" style="width:100%;height:100%;object-fit:contain;border-radius:50%" onclick="opn('calc','Professional Calculator')">
</div>
<hr>
<div style="width:90%;aspect-ratio: 1 / 1;background:rgba(255,255,255,0);border-radius:50%;transition:all 0.3s ease;">
<img src="img/2.webp" style="width:100%;height:100%;object-fit:contain;transition:all 0.3s ease;border-radius:50%" onclick="opn('bash','JS Terminal')">
</div>
<hr>
<div style="width:90%;aspect-ratio: 1 / 1;background:rgba(255,255,255,0);border-radius:50%;transition:all 0.3s ease;">
<img src="img/1.webp" style="width:100%;height:100%;object-fit:contain;transition:all 0.3s ease;border-radius:50%" onclick="opn('bt')">
</div>
<hr>
<div style="width:90%;aspect-ratio: 1 / 1;background:rgba(255,255,255,0);border-radius:50%;transition:all 0.3s ease;">
<img src="img/add.svg" style="width:100%;height:100%;object-fit:contain;transition:all 0.3s ease;border-radius:50%" onclick="document.getElementById('maskAddApp').style.display='block'">
</div>
<hr>
<div style="width:90%;aspect-ratio: 1 / 1;background:rgba(255,255,255,0);border-radius:50%;transition:all 0.3s ease;"><img src="img/5.png" style="width:100%;height:100%;object-fit:contain;transition:all 0.3s ease;border-radius:50%" onclick="opn('novelReader','Poetry Ready')"></div>
<hr>
<div style="width:90%;aspect-ratio: 1 / 1;background:rgba(255,255,255,0);border-radius:50%;transition:all 0.3s ease;"><img src="img/6.png" style="width:100%;height:100%;object-fit:contain;transition:all 0.3s ease;border-radius:50%" onclick="opn('appstore','App Center')"></div>`;


// 读取壁纸
getItem('/usr/zdesktop/preference/desktop_background_image.var', res => {
    if (!(res == '')) {
        document.getElementById('desktop').style.backgroundImage = res;
        document.getElementById('desktop').style.backgroundRepeat = 'no-repeat';
        document.getElementById('desktop').style.backgroundSize = 'cover';
    }
});
const wd = document.getElementById('wd');
const wds = document.getElementById('wds');

// 启动动画
document.getElementById('startSelection').style.display = 'none';
document.getElementById('launching').style.display = 'block';
setTimeout(() => {
    document.getElementById('launching').style.display = 'none';
    document.getElementById('desktop').style.display = 'block';
}, 300);

// 系统启动选择
function start(o) {
    if (o == 'zhubuntu') {
        document.getElementById('startSelection').style.display = 'none';
        document.getElementById('launching').style.display = 'block';
        setTimeout(() => {
            document.getElementById('launching').style.display = 'none';
            document.getElementById('desktop').style.display = 'block';
        }, 300);
    } else if (o == 'Windows14') {
        alert('It is just a demo , is not real one.');
        window.open('http://www.zreamer.top/Win14SimuNew/');
    } else if (o == 'ubuntu') {
        alert('It is just a demo , is not real one.');
        window.open('https://vivek9patel.github.io/');
    } else {
        alert('This system have not been developed yet.');
    }
}

// 读取引导弹窗开关记录
getItem('/usr/zdesktop/var/guide.var', res => {
    if (!(res == 1)) {
        opn('guide');
    }
});

// 旋转图标定时器（间隔1ms性能损耗极大，建议改为50）
setInterval(() => {
    if (x == 360) x = 0;
    document.getElementById('u').style.transform = `rotate(${x}deg)`;
    x++;
}, 1);

// 打开内嵌窗口
function opn(a,b) {
    wd.style.display = 'block';
    wds.src = `app/${a}.html`;
    wd.style.height = '70vh';
    wd.style.width = '70vw';
    wd.style.zIndex = '100';
    wd.style.top = '50px';
    wd.style.left = '18vw';
    wd.style.borderRadius = '5px';
    wds.style.borderRadius = '5px';
    document.getElementById('windowTitle').innerHTML=b;
    
}

// 关闭窗口
function closeWindow() {
    wd.style.display = 'none';
    dragStatus = 0;
}

// 窗口最大化
function fullWindow() {
    wd.style.top = '3vh';
    wd.style.left = '17vw';
    wd.style.height = '97vh';
    wd.style.width = '83vw';
    wd.style.bottom = '0';
    wd.style.right = '0';
    wds.style.borderRadius = '0';
}

// 窗口还原
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

// 开启拖拽标记
function mv() {
    setTimeout(() => { m = 1; }, 100);
}
document.addEventListener('click', function (e) {
    if (m == 1) {
        wd.style.top = e.clientY + 'px';
        wd.style.left = e.clientX + 'px';
        m = 0;
    }
});

// 时间更新定时器
setInterval(() => {
    const now = new Date();
    ir = now.getMinutes();
    if (ir < 10) {
        document.getElementById('time').innerHTML = `${now.getHours()}:0${now.getMinutes()}`;
        document.getElementById('tme').innerHTML = `${now.getHours()}:0${now.getMinutes()}`;
    } else {
        document.getElementById('time').innerHTML = `${now.getHours()}:${now.getMinutes()}`;
        document.getElementById('tme').innerHTML = `${now.getHours()}:${now.getMinutes()}`;
    }
}, 1000);

// 设置面板开关（仅保留一份，删除下方重复定义）
function options() {
    document.getElementById('opt').style.display = 'block';
}
function hide() {
    document.getElementById('opt').style.display = 'none';
}

// 锁屏解锁
function lc() {
    document.getElementById('lockscreen').style.display = 'flex';
}
function ulc() {
    document.getElementById('lockscreen').style.display = 'none';
}

// 全局弹窗提示
function showAlert(a) {
    document.getElementById('allt').style.display = 'flex';
    document.getElementById('alltctt').innerHTML = a;
}
function clsalt() {
    document.getElementById('allt').style.display = 'none';
}

// ===== IndexedDB 存储（重命名避免与localStorage函数重名冲突）=====
// IndexedDB 写入
function dbSet(id, val) {
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
    request.onerror = (err) => console.error("dbSet 数据库打开失败", err);
}

// IndexedDB 读取
function dbGet(id, cb) {
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
    request.onerror = (err) => console.error("dbGet 数据库打开失败", err);
}

// ===== localStorage 存储 =====
// localStorage 读取
function getItem(key, callback) {
    let res = localStorage.getItem(key) || "";
    callback(res);
}
// localStorage 写入（重命名区分IndexedDB）
function saveItemLS(key, val) {
    localStorage.setItem(key, val);
}

// 添加自定义应用弹窗确认
function sbmta() {
    const name = document.getElementById('userAppName').value.replace(/"/g, '&quot;');
    const url = document.getElementById('userAppURI').value.replace(/"/g, '&quot;');
    const ico = document.getElementById('userAppIcon').value.replace(/"/g, '&quot;');
    // 修复2：函数参数字符串添加双引号包裹
    const html = `<hr>
<div style="width:90%;aspect-ratio: 1 / 1;background:rgba(255,255,255,0.1);border-radius:50%;transition:all 0.3s ease;" oncontextmenu="removeSelection(event,&quot;${url}&quot;,&quot;${name}&quot;,&quot;${ico}&quot;)">
<img src="${ico}" style="width:100%;height:100%;object-fit:contain;transition:all 0.3s ease;border-radius:50%;" alt="${name}" onclick="${url}">
</div>`;
    getItem('/usr/zdesktop/preference/desktop_icon.html', res => {
        saveItemLS('/usr/zdesktop/preference/desktop_icon.html', res + html);
        // 仅渲染一次，删除重复append
        document.getElementById('applist').innerHTML = defaltApp + res + html;
    });
    alert('App link saved');
    document.getElementById('maskAddApp').style.display = 'none';
}
// 页面初始化渲染应用列表
getItem('/usr/zdesktop/preference/desktop_icon.html', res => {
    document.getElementById('applist').innerHTML = defaltApp + res;
});

// 选择待删除应用（保存图标变量）
function removeSelection(event, uri, name, ico) {
    event.preventDefault();
    removingAppURI = uri;
    removingAppName = name;
    removingAppIco = ico;
    document.getElementById('maskRemoveApp').style.display = 'block';
}

// 确认删除应用
function removeAppYes() {
    // 修复3：删除匹配模板同样添加引号转义，保证replace匹配原文
    const rmvctt = `<hr>
<div style="width:90%;aspect-ratio: 1 / 1;background:rgba(255,255,255,0.1);border-radius:50%;transition:all 0.3s ease;" oncontextmenu="removeSelection(event,&quot;${removingAppURI}&quot;,&quot;${removingAppName}&quot;,&quot;${removingAppIco}&quot;)">
<img src="${removingAppIco}" style="width:100%;height:100%;object-fit:contain;transition:all 0.3s ease;border-radius:50%;" alt="${removingAppName}" onclick="${removingAppURI}">
</div>`;
    getItem('/usr/zdesktop/preference/desktop_icon.html', acti => {
        const newHtml = acti.replace(rmvctt, '');
        saveItemLS('/usr/zdesktop/preference/desktop_icon.html', newHtml);
        document.getElementById('applist').innerHTML = defaltApp + newHtml;
    });
    document.getElementById('maskRemoveApp').style.display = 'none';
}

// 修复4：全局右键拦截改为冒泡阶段，放行元素自身绑定的oncontextmenu
document.addEventListener('contextmenu', function(e) {
    // 判断触发源是否绑定了自定义右键函数，放行
    if(e.target.closest('[oncontextmenu]')) return;
    e.preventDefault();
}, false);
/*function submitInstallLanyuePackage(){
    document.getElementById('').addEventListener('change', async e => {
   const file = e.target.files[0];
   if (!file) return;
   const reader = new FileReader();
   reader.onload = function (event) {
     // 按换行切割，取出第一行
     let text = event.target.result;
     const firstLine = text.split(/\r?\n/)[0];
     const lanyueAppName=file.name;
     saveItemLS('/usr/app/'+lanyueAppName,text);
     const ico=firstLine.replace('<!--').replace('-->');
     const html = `<hr>
<div style="width:90%;aspect-ratio: 1 / 1;background:rgba(255,255,255,0.1);border-radius:50%;transition:all 0.3s ease;" oncontextmenu="removeLanyueSelection(event,&quot;${'/usr/app/'+lanyueAppName}&quot;,&quot;${lanyueAppName}&quot;,&quot;${ico}&quot;)">
<img src="${ico}" style="width:100%;height:100%;object-fit:contain;transition:all 0.3s ease;border-radius:50%;" alt="${lanyueAppName.replace('.zap','')}" onclick="lanyueOpen(${lanyueAppName})">
</div>`;
    getItem('/usr/zdesktop/preference/desktop_icon.html', res => {
        saveItemLS('/usr/zdesktop/preference/desktop_icon.html', res + html);
        
        
        
   };
   reader.readAsText(file);
 });
}

function lanyueOpen(a){
    getItem('/usr/app/'+a, res => {let finalCode=res;});
    const lanyueCodeList=[''];
    
    
}}*/