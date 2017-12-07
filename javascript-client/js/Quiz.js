$(document).ready(() => {

  SDK.User.loadNav();

    // i nedenstående kode printes alle bogtitler ud på den givne side.
    // Tilhørende html fil er Quiz.html

  const $bookList = $("#book-list");


  SDK.Quiz.findAll ((err, quizs) => {

    quizs.forEach((quiz)=> {

        const bookHtml = `
        <div class="col-lg-4 book-container">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">${quiz.title}</h3>
                </div>
                <div class="panel-body">
                    <div class="col-lg-4">
                    
                    </div>
                    <div class="col-lg-8">
                      <dl>
                        <dt>Subtitle</dt>
                       
                        <dt>Publisher</dt>
                        <
                        <dt>ISBN</dt>
                        
                      </dl>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-lg-4 price-label">
                            
                        </div>
                        <div class="col-lg-8 text-right">
                        
                            <button class="btn btn-success purchase-button" data-book-id="${quiz.id}">Add to basket</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        $bookList.append(bookHtml);


    });

      //clickhandler kodning.
      // purchase model er fralinje 15 i html
      $(".purchase-button").click(function() {
        $("#purchase-modal").modal("toggle");

          //retunerer det gemte id (data-book-id) fra linje 42.
          // vigtigt at bruge function {} notation, da =()=> ikke giver det samme ved
          //ved brug af this.
          //data fjernes fra referencen (data-book-id) og bruges i steddet for før kaldet (linje 62) (.data("book-id");.
          const bookId = $(this).data("book-id");
          const book = books.find((book)=> book.id ===bookId);
          SDK.Book.addToBasket(book);

          //tjekker vores array for hver objekt og ser om id matcher med vores bookId const fra linje 64.




          });
      });

    $("#purchase-modal").on("shown.bs.modal", () => {
      const basket = SDK.Storage.load("basket");
        //fra linje 34 i html filen
        const $modalTbody = $("#modal-tbody");

      basket.forEach((entry) => {$modalTbody.append(`
        <tr>
            <td>
                <img src="${entry.book.imgUrl}" height="60"/>
            </td>
            <td>${entry.book.title}</td>
            <td>${entry.count}</td>
            <td>kr. ${entry.book.price}</td>
            <td>kr. 0</td>
            
        </tr>
      `);

      });
    });

  });


