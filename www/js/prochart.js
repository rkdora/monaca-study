function pon(text){
    alert(text);
};
function log(text){
    console.log(text);
};

function appear(){
    var div=document.getElementById("record");
    div.setAttribute("style","display:inline");
};

function genTextBox(TARGET, POSITION){
    var target = document.getElementById(TARGET);
    var textBox = document.createElement('input');
    var resisterBox = document.createElement('input');
    
    textBox.type = "text";
    textBox.id = "NewLangName"
    resisterBox.type = "button";
    resisterBox.id = "newLangName";
    resisterBox.value = "完了";
    resisterBox.onclick = function() {
        ln.save();
    };
    
    target.insertAdjacentElement(POSITION, resisterBox);
    target.insertAdjacentElement(POSITION, textBox);
    
    console.log("create form");
};

function getId(targetId){
    return window.document.getElementById(targetId);
};
