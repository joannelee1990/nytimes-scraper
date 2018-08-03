$("#new-scrape").on("click", async function (e) {
    e.preventDefault();
    const articles = await axios.get("/scrape")
    for (var i = 0; i < 10; i++) {
        let b = i + 10;
        const heading = articles.data.scrape[i].heading
        const link = articles.data.scrape[i].link
        const paragraph = articles.data.scrape[b].paragraph;
        var article = 
        `<div class="card">
          <div class="card-header">
            <h1><strong><a href="${link}" target="_blank">
              ${heading}
            </a></strong></h1>
          </div>
          <div class="card-body">
            <a class="card-text" href="${link}" target="_blank">${paragraph}</a>
            <button class="btn btn-danger saveBtn" heading="${heading}" link="${link}" paragraph="${paragraph}">
              SAVE ARTICLE!
            </button>
          </div>
        </div>`
        $('#articles').append(article);
      }
      $(".saveBtn").on("click", async function(e){
        e.preventDefault();
        const header = $(this).attr('heading');
        const anchor = $(this).attr('link');
        const copy = $(this).attr('paragraph')
        const savedArticle = {
          heading: header,
          link: anchor,
          paragraph: copy
        }
        try {
          const newArticle = await axios.post('/api/articles', savedArticle);
        }
        catch (err) {
          console.log(`Error: ${err.message}`)
        }
      });
    });

   


// //Delete an article
// $(".delete-article").on("click", function(event){
//     var id = $(this).data("id");
//     var selected = $(this).parent().parent();

//     $.ajax({
//         type: "GET",
//         url: "/delete/" + id,

//         //On Success
//         success: function(response) {
//             selected.remove();
//         }
//     })
// })

// //Add A Note
// $(".add-note").on("click", function(event){
//     var id = $(this).data("id");
//     var newNote = $(this).siblings("textarea").val();
//     console.log("ID: " + id + " Note: " + newNote);
//     //Run a POST method to pass the note to the backend

//     $.ajax({
//         method: "POST",
//         url: "/articles/" + id,
//         data: {
//             body: newNote
//         }
//     }).then(function(data) {
//         console.log(JSON.stringify(data));
//     })
//     // Empties Input Field
//     $(this).siblings("textarea").val("");
// })

//See Current Notes
// $(".get-note").on("click", function(event){
//     var id = $(this).data("id");

//     console.log("ID: " + id)
//     //Run a POST method to pass the note to the backend

//     $.ajax({
//         method: "GET",
//         url: "/articles/" + id

//     }).then(function(data) {
//         console.log(JSON.stringify(data));
//     })
// })