document.getElementById("submit").addEventListener("click",(event)=>{
    let nameBook = document.getElementById("name_book");
    let selectedGenereSend = document.querySelectorAll("select")[2];
    let selectedAuthorSend = document.querySelectorAll("select")[3];
    let price = document.querySelector("[name = pricebook]");
    let state = false;
    if(nameBook.value.length == 0) {
        nameBook.style = "border:2px solid red;";
        state = false;
    } else {
        nameBook.style = "border:2px solid green;";
        state = true; 
    }
    if(isNaN(Number.parseInt(price.value)) || Number.parseInt(price.value) == 0) {
        price.style = "border:2px solid red;";
        state = false;
    } else {
        state = true; 
        price.style = "border:2px solid green;";
    }
    if(state == false) return;
    if(selectedGenereSend.selectedIndex == 0) {
        selectedGenereSend.style = "border:2px solid red;";
        state = false;
    } else {
        state = true; 
        selectedGenereSend.style = "border:2px solid green;";
    }
    if(state == false) return;
    if(selectedAuthorSend.selectedIndex == 0) {
        selectedAuthorSend.style = "border:2px solid red;";
        state = false;
    } else {
        state = true;
        selectedAuthorSend.style = "border:2px solid green;";
    }
    if(state == false) return;
    if(state == true){
        event.target.setAttribute("type","submit");
        event.target.click();
    }
    // alert(selectedGenereSend.selectedIndex);
    // alert(selectedAuthorSend.selectedIndex);
});