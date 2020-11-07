let scalePage = document.createElement("div");
scalePage.setAttribute("name","scale_place");
let images_places = document.createElement("div");
images_places.setAttribute("name","images_place");
// Changer left Images
let divChangeLeft = document.createElement("div");
divChangeLeft.setAttribute("name","changerLeft");
// Images 
let images = document.createElement("img");
// Changer Right Images
let divChangeRight = document.createElement("div");
divChangeRight.setAttribute("name","changerRight");
images_places.append(divChangeLeft);
images_places.append(images);
images_places.append(divChangeRight);
scalePage.append(images_places);
// Set Events for books title
scalePage.addEventListener("click",(event) => {
    if(event.target.getAttribute("name") == "scale_place") event.target.parentNode.removeChild(event.target);
    
});
let listPages = Array();
document.querySelectorAll("[name = book]").forEach(element => element.addEventListener("click",(event)=>{
    scalePage.style.display = "flex";
    listPages.length = 0;
    images.src = event.target.src;
    listPages.push(images.src);
    let cardBook = element.parentNode.parentNode;
    // Clean other span
    
    // Add next pages elements
    for(let element of cardBook.children) {
        if(element.tagName.toLocaleLowerCase() == "span" && element.style.display.toLocaleLowerCase() == "none") {  
            listPages.push(element.textContent);
        }
        
    }
    document.body.prepend(scalePage);

}));



// Changer pages in left --
let count_Listen = 0;
divChangeLeft.addEventListener("click",()=> {
    if(listPages.length < 1) return; 
    count_Listen--;
    if(count_Listen < 0){
        count_Listen = listPages.length-1;
    }
    if(count_Listen != 0) {
        images.src = "http://localhost/book_shopping"+listPages[count_Listen];
    } else {
        images.src = listPages[count_Listen];
    }
});
// Changer pages in left ++
divChangeRight.addEventListener("click",()=> {
    if(listPages.length < 1) return; 
    count_Listen++;
    if(count_Listen == listPages.length){
        count_Listen = 0;
    }
    if(count_Listen != 0) {
        images.src = "http://localhost/book_shopping"+listPages[count_Listen];
    } else {
        images.src = listPages[count_Listen];
    }
});