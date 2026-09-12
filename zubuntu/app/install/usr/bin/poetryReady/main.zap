function loadJs(url, onSuccess){
    const script = document.createElement('script');
    script.src = url;
    script.onload = ()=>{
        console.log("脚本加载完成");
        onSuccess?.();
    }
    script.onerror=()=>{
        console.error("脚本加载失败",url);
    }
    document.body.appendChild(script);
}
const content=
`<meta charset="UTF-8">
<!-- 兼容老旧浏览器写法 -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<style>@font-face{
font-family: 人间失格奶酪体;
src:url('novel.ttf') format('truetype');font-display: swap;
}</style>
<br><div id="openNovelFileSelection"><h3>Load from Android file</h3>
<input type="file" onchange="parent.read(this)"><br>
<input placeholder="Load from Zhubuntu file" id="ZhubuntuDirectory"><button style="padding:10px;
        border-radius:2vh;
        border:none;
        background-color:#447799;
        color:white;font-weight: bold;" onclick="parent.ZhubuntuDirectoryLoad();document.getElementById('openNovelFileSelection').style.display='none';">Open</button></div>
<div id="ctt"><!--
&emsp;&emsp;夏日的午后，阳光直直地照进屋里，把地板映成温暖的金色。窗外那棵桐树上的知了，
也轻轻地唱着。夏日的午后，一切都是那样的轻松、惬意。程序员梦逐正开发着一个游戏
。然而一条新闻推送，看似平常，却打破了这片宁静，改变了梦逐的人生走向，他的做法，更是改变
了国家命运......-->
</div>

    
<button style="border:none;border-radius:5px;position:absolute;top:1vh;left:4vh;" onclick="document.getElementById('openNovelFileSelection').style.display='block';">Open
</button>`;
//使用示例
loadJs("https://cdn.jsdelivr.net/npm/marked/marked.min.js",()=>{
    runInWindow(content,'Poetry Ready');
});

window.read=function read(i){
  const f=i.files[0],r=new FileReader();
  r.onload=e=>{
      const cttDom = document.getElementById('ctt');
      if(cttDom) cttDom.innerHTML = marked.parse(e.target.result);
  }
  r.readAsText(f);
};


window.ZhubuntuDirectoryLoad=function ZhubuntuDirectoryLoad(){
    dbGet(document.getElementById('ZhubuntuDirectory').value,res=>{
        const cttDom = document.getElementById('ctt');
        if(cttDom) cttDom.innerHTML = marked.parse(res);
    });
}

window.quitApp=function quitApp(){
    const content='';
    document.getElementById('lyappwindow').style.display='none';
    document.getElementById('applist').style.display='block';
    document.getElementById('lyappwindow').style.width='85vw';
    d=0;
    document.getElementById('lyappwindow').style.left='15vw';
}