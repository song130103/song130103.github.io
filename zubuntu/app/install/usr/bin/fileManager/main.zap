let fileList=[];
let parentFileDirectory='/';

function getKeyList(callback) {
  const req = indexedDB.open("Zhubuntu", 1);
  req.onsuccess = e => {
    const db = e.target.result;
    const tx = db.transaction("main", "readonly");
    const store = tx.objectStore("main");
    const keyReq = store.getAllKeys();
    keyReq.onsuccess = ev => {
      const keyList = ev.target.result;
      // ❗不要这里close，事务结束再关闭
      callback(keyList);
    };
    tx.oncomplete=()=>{
      db.close();
    }
  };
}

window.loadAllFileDirectory=function loadAllFileDirectory(){
  console.log("loadAllFileDirectory 正在加载目录：", JSON.stringify(parentFileDirectory));
  fileList=[];
  getKeyList((keyArr)=>{
    console.log("拿到keyArr",keyArr);
    for(let i=0;i<keyArr.length;i++){
      const fullKey = keyArr[i];
      if(!fullKey.startsWith(parentFileDirectory)) continue;

      let relativePath = keyArr[i].replace(parentFileDirectory,'');
      let pathArray = relativePath.split('/');
      relativePath = pathArray[0];

      if(!relativePath) continue;

      let exists = false;
      for(let j=0;j<fileList.length;j++){
        if(relativePath === fileList[j]){
          exists = true;
          break;
        }
      }
      if(!exists){
        fileList.push(relativePath);
      }
    }
    console.log("本目录子项 fileList",fileList);

    let htmlBuf = "";
    for(let i=0;i<fileList.length;i++){
      const itemName = fileList[i];
      htmlBuf += `
<div class="file-item" data-name="${itemName}">
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48">
    <path fill="#e9b368" d="M42 14H18l‑4‑4H6c‑2.2 0‑4 1.8‑4 4v24c0 2.2 1.8 4 4 4h36c2.2 0 4‑1.8 4‑4V18c0‑2.2‑1.8‑4‑4‑4z"/>
    <path fill="#f6cd86" d="M42 14H18l‑4‑4H6c‑2.2 0‑4 1.8‑4 4v4h44v‑4c0‑2.2‑1.8‑4‑4‑4z"/>
  </svg>
  <div class="filename">${itemName}</div>
</div>`;
    }
    document.getElementById('fileGraphicList').innerHTML = htmlBuf;
    document.getElementById('currentPathText').innerText = parentFileDirectory;
  });
};

// 严格：先去掉末尾/，再删除最后一项
function goBackDirectory(){
  console.log("【goBackDirectory】原始路径=",JSON.stringify(parentFileDirectory));
  if(parentFileDirectory === "/"){
    console.log("已经根目录，禁止返回");
    return;
  }
  // 1. 移除末尾单个斜杠
  let noTailSlash = parentFileDirectory.replace(/\/$/, "");
  // 2. 找最后一个 /
  const lastSlashIndex = noTailSlash.lastIndexOf("/");

  if(lastSlashIndex <= 0){
    parentFileDirectory = "/";
  }else{
    parentFileDirectory = noTailSlash.substring(0, lastSlashIndex) + "/";
  }
  console.log("【goBackDirectory】跳转后=",JSON.stringify(parentFileDirectory));
  loadAllFileDirectory();
}

// -------- content HTML片段 --------
const content = `
<style>
#pathBar{padding:8px;background:#222;color:#fff;margin-bottom:8px;display:flex;gap:8px;align-items:center;}
#fileGraphicList{display:grid;grid-template-columns:repeat(auto-fill,120px);gap:8px;padding:8px;}
.file-item{padding:12px;background:#333;color:#eee;text-align:center;border-radius:6px;cursor:pointer;}
.file-item:hover{background:#444;}
.file-item svg{margin:0 auto 4px;display:block;}
.filename{font-size:13px;word-break:break-all;}
</style>
<div id="pathBar">
  <button id="btnBack">← 返回上一级</button>
  <span id="currentPathText">/</span>
</div>
<div id="fileGraphicList"></div>
`;

runInWindow(content,'File');

// ✅【只绑定一次事件，不再每次渲染重复绑定】
document.getElementById("btnBack").onclick = goBackDirectory;

// 文件夹点击：使用全局委托，不渲染内绑定
document.getElementById("fileGraphicList").onclick = function(e){
  const item = e.target.closest(".file-item");
  if(!item) return;
  const dirName = item.dataset.name;
  if(parentFileDirectory.endsWith('/')){
    parentFileDirectory = parentFileDirectory + dirName + '/';
  }else{
    parentFileDirectory = parentFileDirectory + '/' + dirName + '/';
  }
  loadAllFileDirectory();
};

loadAllFileDirectory();