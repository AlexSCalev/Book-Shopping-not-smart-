
let shells;
let drawSheels = function (count_sheels){
    let shell_place = document.querySelector("[name = principal_content]");
    let i = 0;
    while(i < count_sheels){
        let shell = document.createElement("div");
        shell.setAttribute("name","shell_books");
        shell_place.append(shell);
        i++;
    }
    shells = document.querySelectorAll("[name = shell_books]");
}
let cleanBooks = function(aboutBooks) {
    let cleanBooks = [];
    for(let value of aboutBooks){
      if(!cleanBooks.includes(value)){
        cleanBooks.push(value);
      }
    }
    about_books = cleanBooks;
}

let books_pages = [];
let about_books = [];
let formatDates = function (information_about_book,book_pages,count_pages){
    about_books.push(information_about_book);
    books_pages.push(book_pages);
    if(books_pages.length == count_pages){
        cleanBooks(about_books);
        drowBooks(about_books,books_pages);
    }
}

let drowBooks = function(about_books,books_pages){
    for(let i = 0; i < about_books.length; i++) { 
  
        let [id,nameBook,genereBook,nameAuthor,priceBook] = about_books[i].split("|");
        let numberBook = "["+Number.parseInt(id)+"]";
        let cardBook = document.createElement("div");
        cardBook.setAttribute("name","cards_books");
        cardBook.setAttribute("data-tooltip",genereBook);
        cardBook.id = id;

        let deleteButton = document.createElement("input");
        deleteButton.setAttribute("name","delete");
        deleteButton.setAttribute("type","button");
        deleteButton.value = "Delete";

        let nameBookTitle = document.createElement("span");
        nameBookTitle.textContent = nameBook;

        let aLink = document.createElement("a"); // Optional in future must will remove
        let images = document.createElement("img");
        images.setAttribute("name","book");
        let nameAuthorBook = document.createElement("span");
        nameAuthorBook.setAttribute("name","author");
        nameAuthorBook.textContent = nameAuthor;
        
        let priceBookBook = document.createElement("span");
        priceBookBook.setAttribute("name","price");
        priceBookBook.textContent = priceBook;

        for(let j = 0; j < books_pages.length; j++){
            
            if(books_pages[j].includes(numberBook) && books_pages[j].includes("Oblojca")){
                images.src = books_pages[j].slice(1,books_pages[j].length);   
            }

            if(books_pages[j].includes(numberBook) && !books_pages[j].includes("Oblojca")){
                let spanPages = document.createElement("span");
                spanPages.textContent = books_pages[j];
                spanPages.style.display = "none";
                cardBook.append(spanPages);
            }

        }
        cardBook.append(deleteButton);
        aLink.append(images);
        cardBook.append(nameBookTitle);
        cardBook.append(aLink);
        cardBook.append(nameAuthorBook);
        cardBook.append(priceBookBook);
        // find free sheel
      
        for(shell of shells) {
            if(shell.children.length < 6){
                shell.append(cardBook);
                break;
            }
        }
    }
}
