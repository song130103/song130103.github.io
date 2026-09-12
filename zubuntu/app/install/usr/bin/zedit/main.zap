let filePath='';
const content=`<meta name="description" content="Zhubuntu is a web Android desktop environment that imitated Ubuntu GNOME desktop environment's user interface">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=0.25, viewport-fit=cover, interactive-widget=overlays-content">
<meta charset="UTF-8">
<meta name="screen-orientation" content="portrait">
<meta name="x5-orientation" content="portrait">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="mobile-web-app-capable" content="yes">
<button style="position:absolute;top:8px;left:4vh;" onclick="zeditOpenFile()">Open</button><button style="position:absolute;top:8px;right:4vh;" onclick="zeditSaveFile()">Save</button><br>
<textarea style="position:absolute;top:6%;width:100%;height:94%" placeholder="Type your file path there..." id="fileEditArea"></textarea>`;
let editAreaStatus=0;
    window.zeditOpenFile=function zeditOpenFile(){
        if(editAreaStatus==0){filePath=document.getElementById('fileEditArea').value;dbGet(filePath,res=>{document.getElementById('fileEditArea').value=res;document.getElementById('fileEditArea').placeholder='Edit your file here';});
        editAreaStatus=1;}
        else{
        dbSet(filePath,document.getElementById('fileEditArea').value);
        document.getElementById('fileEditArea').placeholder='Type your file path there...';editAreaStatus=0;
        
        }
    };
    window.zeditSaveFile=function zeditSaveFile(){
    if(editAreaStatus==0){showAlert('No file opened yet');}
    else{dbSet(filePath,document.getElementById('fileEditArea').value);}
    
    };
    runInWindow(content,'Zedit');


window.quitApp=function quitApp(){
const content='';
document.getElementById('lyappwindow').style.display='none';document.getElementById('applist').style.display='block';
document.getElementById('lyappwindow').style.width='85vw';
d=0;
document.getElementById('lyappwindow').style.left='15vw';
};