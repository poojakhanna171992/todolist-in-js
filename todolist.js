let inputbox = document.querySelector('#input-box');
let listbox=document.querySelector('#list-container');

function addtask(){
  if(inputbox.value=== ''){
    alert("You must write something.");
  }else{
    let li=document.createElement('li');
    li.innerHTML= inputbox.value;
    listbox.appendChild(li);
    let span=document.createElement('span')
    span.innerHTML="\u00d7";
    li.appendChild(span);
  }
inputbox.value="";
savedata();
}

listbox.addEventListener('click',function(e){
  if(e.target.tagName==="LI"){
    e.target.classList.toggle("checked");
    savedata();
  }
  else if(e.target.tagName==="SPAN"){
    e.target.parentElement.remove();
    savedata();
  }
},false);

function savedata(){
  localStorage.setItem('data',listbox.innerHTML);

}
function showdata(){
  listbox.innerHTML=localStorage.getItem('data');
}
showdata();