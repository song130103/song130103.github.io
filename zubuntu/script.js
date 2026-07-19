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
let removingAppIco;
let removingAppPath;

// 默认应用模板（和删除模板严格保持格式一致）
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

// 旋转图标定时器
setInterval(() => {
    if (x == 360) x = 0;
    document.getElementById('u').style.transform = `rotate(${x}deg)`;
    x++;
}, 50);

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

// 设置面板开关
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

// ===== IndexedDB 存储 =====
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
function getItem(key, callback) {
    let res = localStorage.getItem(key) || "";
    callback(res);
}
function saveItemLS(key, val) {
    localStorage.setItem(key, val);
}

// 添加自定义应用
function sbmta() {
    const name = document.getElementById('userAppName').value.replace(/"/g, '&quot;');
    const url = document.getElementById('userAppURI').value.replace(/"/g, '&quot;');
    const ico = document.getElementById('userAppIcon').value.replace(/"/g, '&quot;');
    const html = `<hr>
<div style="width:90%;aspect-ratio: 1 / 1;background:rgba(255,255,255,0.1);border-radius:50%;transition:all 0.3s ease;" oncontextmenu="removeSelection(event,&quot;${url}&quot;,&quot;${name}&quot;,&quot;${ico}&quot;)">
<img src="${ico}" style="width:100%;height:100%;object-fit:contain;transition:all 0.3s ease;border-radius:50%;" alt="${name}" onclick="${url}">
</div>`;
    getItem('/usr/zdesktop/preference/desktop_icon.html', res => {
        saveItemLS('/usr/zdesktop/preference/desktop_icon.html', res + html);
        document.getElementById('applist').innerHTML = defaltApp + res + html;
    });
    alert('App link saved');
    document.getElementById('maskAddApp').style.display = 'none';
}
// 初始化渲染应用列表
getItem('/usr/zdesktop/preference/desktop_icon.html', res => {
    document.getElementById('applist').innerHTML = defaltApp + res;
});

// 普通应用右键删除
function removeSelection(event, uri, name, ico) {
    event.preventDefault();
    removingAppURI = uri;
    removingAppName = name;
    removingAppIco = ico;
    document.getElementById('maskRemoveApp').style.display = 'block';
}
// 普通应用确认删除
function removeAppYes() {
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

// 全局右键拦截
document.addEventListener('contextmenu', function(e) {
    if(e.target.closest('[oncontextmenu]')) return;
    e.preventDefault();
}, false);

// ========== Lanyue应用安装 ==========
function submitInstallLanyuePackage(){
    document.getElementById('uploadInput').addEventListener('change', async e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (event) {
            let text = event.target.result;
            const firstLine = text.split(/\r?\n/)[0];
            const lanyueAppName = file.name;
            const savePath = '/usr/app/'+lanyueAppName;
            saveItemLS(savePath,text);
            const ico = firstLine.replace(/<!--/g,'').replace(/-->/g,'');
            // 【重要】生成模板和删除模板严格保持格式、属性顺序、换行完全一致
            const html = `<hr>
<div style="width:90%;aspect-ratio: 1 / 1;background:rgba(255,255,255,0.1);border-radius:50%;transition:all 0.3s ease;" oncontextmenu="removeLanyueSelection(event,&quot;${savePath}&quot;,&quot;${lanyueAppName}&quot;,&quot;${ico}&quot;)">
<img src="${ico}" style="width:100%;height:100%;object-fit:contain;transition:all 0.3s ease;border-radius:50%;" alt="${lanyueAppName.replace('.zap','')}" onclick="lanyueOpen(&quot;${lanyueAppName}&quot;)">
</div>`;
            getItem('/usr/zdesktop/preference/desktop_icon.html', res => {
                const newList = res + html;
                saveItemLS('/usr/zdesktop/preference/desktop_icon.html', newList);
                document.getElementById('applist').innerHTML = defaltApp + newList;
            });
            alert('Lanyue 应用安装成功');
            document.getElementById('uploadInput').value = '';
        };
        reader.readAsText(file);
    });
}
submitInstallLanyuePackage();

// ========== Lanyue应用打开 ==========
function lanyueOpen(a){
    getItem('/usr/app/'+a, res => {
        let finalCode = res;
        const lanyueCodeList=['文档.','主体.','获取元素(','HTML内容=','样式.','宽度:','高度:','宽度=','高度=','窗口.','警告(','地址.','链接到=','打开(','大标题>','副标题>','小标题>','段落>','超链接>','<图片','唯一标识=','居中>','粗体>','斜体>','下划线>','删除线>','引用>','<输入框','输入提示=','资源链接=','视频>','音频>','内联样式>','按下执行=','css类=','声明函数','定时执行(','延时执行(','添加事件监听器(','({[转义]})','<容器','容器>','<视频','<音频','location.href=','window.open('];
        const JavaScriptList=['document.','body.','getElementById(','innerHTML=','style.','width:','height:','width=','height=','window.','alert(','location.','href=','open(','h1>','h2>','h3>','p>','<img','id=','center>','b>','i>','u>','del>','q>','<input','placeholder=','src=','video>','audio>','style>','onclick=','class=','function','setInterval(','setTimeout(','addEventListener(','','<div','div>','<video','<audio','',''];
        for(let i=0;i<lanyueCodeList.length;i++){
            finalCode=finalCode.replaceAll(lanyueCodeList[i],JavaScriptList[i]);
        }
        // 打开窗口注入代码
        wd.style.display = 'block';
        wds.srcdoc = finalCode;
        wd.style.height = '70vh';
        wd.style.width = '70vw';
        wd.style.zIndex = '100';
        wd.style.top = '50px';
        wd.style.left = '18vw';
        wd.style.borderRadius = '5px';
        wds.style.borderRadius = '5px';
        document.getElementById('windowTitle').innerHTML = a.replace('.zap','');
    });
}

// ========== Lanyue应用右键选中删除 ==========
function removeLanyueSelection(event, path, name, ico){
    event.preventDefault();
    removingAppPath = path;
    removingAppName = name; // 修复：不再重复加.zap后缀，传入的name本身就带.zap
    removingAppIco = ico;
    document.getElementById('maskRemoveAppLanyue').style.display = 'block';
}

// ========== Lanyue应用确认删除（核心修复） ==========
function removeAppYesLanyue() {
    // 【和安装模板100%一致】：换行、属性顺序、alt处理完全相同，保证精确匹配
    const rmvctt = `<hr>
<div style="width:90%;aspect-ratio: 1 / 1;background:rgba(255,255,255,0.1);border-radius:50%;transition:all 0.3s ease;" oncontextmenu="removeLanyueSelection(event,&quot;${removingAppPath}&quot;,&quot;${removingAppName}&quot;,&quot;${removingAppIco}&quot;)">
<img src="${removingAppIco}" style="width:100%;height:100%;object-fit:contain;transition:all 0.3s ease;border-radius:50%;" alt="${removingAppName.replace('.zap','')}" onclick="lanyueOpen(&quot;${removingAppName}&quot;)">
</div>`;
    getItem('/usr/zdesktop/preference/desktop_icon.html', acti => {
        const newHtml = acti.replace(rmvctt, '');
        saveItemLS('/usr/zdesktop/preference/desktop_icon.html', newHtml);
        saveItemLS(removingAppPath, ''); // 同时清空应用包数据
        document.getElementById('applist').innerHTML = defaltApp + newHtml;
    });
    document.getElementById('maskRemoveAppLanyue').style.display = 'none';
}
