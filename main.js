class UI {
  static displayBooks() {
    //list items
    document.addEventListener("DOMContentLoaded", function () {
      //fetch books
      fetch("https://5f589b048040620016ab8335.mockapi.io/api/v1/books")
        .then((response) => response.json())
        .then((books) => {
          books.forEach((book) => {
            //fetch author
            fetch(
              `https://5f589b048040620016ab8335.mockapi.io/api/v1/author/${book.authorId}`
            )
              .then((response) => response.json())
              .then((author) => {
                if (author.name !== undefined) {
                  book.authorName = author.name;
                  UI.addBookToList(book);
                } else {
                  book.authorName = "-";
                  UI.addBookToList(book);
                }
              });
          });
        });
    });
    //delete handler
    document.querySelector("#book-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("delete")) {
        UI.deleteBookFromList(e.target.id);
      }
    });
  }

  static deleteBookFromList(bookId) {
    //fetch authors
    fetch(
      `https://5f589b048040620016ab8335.mockapi.io/api/v1/books/${bookId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        window.location.replace("index.html");
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `<td>${book.name}</td><td>${book.isbnNumber}</td><td>${book.authorName}</td><td><a href="views/edit-book.html?id=${book.id}" class="btn btn-success id=${book.id} btn-sm edit">EDIT
    </a></td><td><a href="#" id=${book.id} class="btn btn-danger btn-sm delete">DEL
    </a></td>`;
    list.appendChild(row);
  }
}

//display all books
UI.displayBooks();
