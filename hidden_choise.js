
document.querySelector("[name = hidden]").addEventListener("click",(event)=>{
    if(event.target.getAttribute("id") == '0'){
        event.target.style = "margin-left:-1%;";
        document.querySelectorAll("[name = shell_books]").forEach(element => {
            element.style = "margin-left:2%;";
        });
        document.querySelector("[name = principal_content]").style = "width:100%;";
        event.target.parentNode.parentNode.style = "width:0.2%;";
        event.target.setAttribute("id","1");
    } else if (event.target.getAttribute("id") == '1') {
        event.target.removeAttribute("style");
        document.querySelectorAll("[name = shell_books]").forEach(element => {
            element.removeAttribute("style");
        });
        document.querySelector("[name = principal_content]").removeAttribute("style");
        event.target.parentNode.parentNode.removeAttribute("style");
        event.target.setAttribute("id","0");
    }
  
});
let state_menu = 0;
document.querySelector("[name = dropdowns_name]").addEventListener("click",(event)=>{
   if(state_menu == 0) {
        document.querySelector("[name = dropdowns_link]").style = "display:block;";
        state_menu = 1;
    } else {
        document.querySelector("[name = dropdowns_link]").style = " ";
        state_menu = 0;
    }
});
document.body.addEventListener("click",(event)=>{
    if(event.target.getAttribute("name") != "dropdowns_name") {
      document.querySelector("[name = dropdowns_link]").style = " ";
      state_menu = 0;
    }
});