let url = new URL(document.URL);
let search_params = url.searchParams;
let bookId = search_params.get("id");

class UI {
  static fetchBookInfo() {
    //fetch book
    fetch(`https://5f589b048040620016ab8335.mockapi.io/api/v1/books/${bookId}`)
      .then((response) => response.json())
      .then((book) => {
        UI.fillFields(book);
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  }
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
  static fillFields(book) {
    document.querySelector("#name").value = book.name;
    document.querySelector("#isbn").value = book.isbnNumber;
    document.querySelector("#unitsSold").value = book.unitsSold;
    document.querySelector("#authors").selectedIndex = book.authorId;
  }
}

class Book {
  constructor(name, isbn, authorId, unitsSold) {
    this.name = name;
    this.isbn = isbn;
    this.authorId = authorId;
    this.unitsSold = unitsSold;
  }
  static editBook() {
    document.querySelector("#book-form").addEventListener("submit", (e) => {
      e.preventDefault();
      let name = document.querySelector("#name").value;
      let isbnNumber = document.querySelector("#isbn").value;
      let authorsId = document.querySelector("#authors");
      let authorId = authorsId.options[authorsId.selectedIndex].id;
      let unitsSold = document.querySelector("#unitsSold").value;
      let book = new Book(name, isbnNumber, authorId, unitsSold);
      fetch(
        `https://5f589b048040620016ab8335.mockapi.io/api/v1/books/${bookId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: book.name,
            isbnNumber: book.isbnNumber,
            authorId: book.authorId,
            unitsSold: book.unitsSold,
          }),
        }
      )
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
UI.fetchBookInfo();
Book.editBook();
