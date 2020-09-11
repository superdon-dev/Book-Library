class UI {
  static fetchAuthors() {
    document.addEventListener("DOMContentLoaded", function () {
      //fetch authors
      fetch("https://5f589b048040620016ab8335.mockapi.io/api/v1/author")
        .then((response) => response.json())
        .then((authors) => {
          authors.forEach((author) => {
            UI.addAuthorToList(author);
          });
        })
        .catch((error) => {
          console.log("Error" + error);
        });
    });
  }
  static addAuthorToList(author) {
    const list = document.querySelector("#authors");
    const line = document.createElement("option");
    line.innerHTML = author.name;
    line.id = author.id;
    list.appendChild(line);
  }
}

class Book {
  constructor(name, isbn, authorId, unitsSold) {
    this.name = name;
    this.isbn = isbn;
    this.authorId = authorId;
    this.unitsSold = unitsSold;
  }
  static addNewBook() {
    document.querySelector("#book-form").addEventListener("submit", (e) => {
      e.preventDefault();
      let name = document.querySelector("#name").value;
      let isbnNumber = document.querySelector("#isbn").value;
      let authorsId = document.querySelector("#authors");
      let authorId = authorsId.options[authorsId.selectedIndex].id;
      let unitsSold = document.querySelector("#unitsSold").value;

      let book = new Book(name, isbnNumber, authorId, unitsSold);
      console.log(book);
      fetch("https://5f589b048040620016ab8335.mockapi.io/api/v1/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: book.name,
          isbnNumber: book.isbnNumber,
          authorId: book.authorId,
          unitsSold: book.unitsSold,
        }),
      })
        .then((res) => {
          window.location.replace("../index.html");
        })
        .catch((error) => {
          console.log("Error" + error);
        });
    });
  }
}

UI.fetchAuthors();
Book.addNewBook();
