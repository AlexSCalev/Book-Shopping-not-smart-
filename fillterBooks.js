let getByElementsPrice = function(priceStart,priceFinish,cardsArray) {
    let priceStartLoc  = Number.parseInt(priceStart);
    let priceFinishLoc =  Number.parseInt(priceFinish);
    if(isNaN(priceStartLoc)) priceStartLoc = 0;
    if(isNaN(priceFinishLoc)) priceFinishLoc = 99999;
    if(priceStartLoc < 0 || priceStartLoc > priceFinishLoc) {
        return cardsArray;
    } else {
        for(let element of cardsArray) {
            let cardPrice = Number.parseInt(element.querySelector("[name = price]").textContent);
            if(cardPrice < priceStartLoc || cardPrice > priceFinishLoc) {
                element.style.display = "none";
            }
        }
        return cardsArray;
    }
}
let getByElementGenere = function(foundGenere,cardsArray) {
    if(foundGenere.toLocaleLowerCase() == "none") return cardsArray;
    for(let element of cardsArray) {
        let genereCard = element.dataset.tooltip;
        if(!genereCard.includes(foundGenere)) {
            element.style.display = "none";
        }
    }
    return cardsArray;
}
let getByElementAuthor = function(authorBooks,cardsArray) {
    if(authorBooks.toLocaleLowerCase() == "none") return cardsArray;
    for(let element of cardsArray) {
        let genereCard = element.querySelector("[name = author]").textContent;
        if(!genereCard.includes(authorBooks)) {
            element.style.display = "none";
        }
    }
    return cardsArray;
}
document.querySelector("[name = submit]").addEventListener("click", (element) => {
    // Read user inputs date
    let priceElement = document.querySelector("[name = prace_place]");
    let priceStart = priceElement.querySelectorAll("input")[0].value;
    let priceFinish = priceElement.querySelectorAll("input")[1].value;
    let select1 = document.querySelectorAll("select")[0];
    let select2 = document.querySelectorAll("select")[1];
    let genereBooks = select1.options[select1.selectedIndex].value;
    let authorBooks = select2.options[select2.selectedIndex].value;
    let booksCards  = document.querySelectorAll("[name = cards_books]");
    if(isNaN(Number.parseInt(priceStart)) && isNaN(Number.parseInt(priceFinish)) && 
    authorBooks.toLocaleLowerCase() == "none" && genereBooks.toLocaleLowerCase() == "none") {
       location.reload(true);
    } else {
        booksCards = getByElementsPrice(priceStart,priceFinish,booksCards);
        booksCards = getByElementGenere(genereBooks,booksCards);
        booksCards = getByElementAuthor(authorBooks,booksCards);
    }
});