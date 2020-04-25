let value = "";
$("#userValue")
  .keyup(function () {
    value = $(this).val();

    $("#DIV").html(`<p>We Search: " ${value} " </p>`);
  })
  .keyup();
value = value.replace(" ", "+");

const apiKey = "http://www.omdbapi.com/?apikey=4941d150&";
let data;
let dataFavor;
function pressFuncSearch() {
  let select = $("#single").val();
  let newSearch = `${apiKey}s=${value}&type=${select}`;
  fetch(newSearch)
    .then((resposiv) => {
      return resposiv.json();
    })
    .then((responseData) => {
      data = responseData;
      show();
    });

  console.log("pressFunc - працює");
}

function show() {
  let html = "";
  if (data.Response === "False") {
    html = "<h2>Movie not found!</h2>";
    $("#content").html(html);
  }
  for (let index = 0; index < data.Search.length; index++) {
    html += `<div><h2> ${data.Search[index].Title}</h2>`;
    html += `<img src="${data.Search[index].Poster}" alt="" /></a><i id="${data.Search[index].imdbID}" class="fas fa-heart"></i></div>`;
  }
  console.log(data);

  $("#content").html(html);

  $("i").on("click", function (e) {
    $(e.target).css("color", "red");
    localStorage.setItem($(this).attr("id"), $(this).attr("id"));
    funcGetFavorFromData();
  });
}

//витягую ІД
funcGetFavorFromData();
function funcGetFavorFromData() {
  for (let key in localStorage) {
    let id = localStorage.getItem(localStorage[key]);
    console.log(id + `Це ІД`);

    // шукаю з бази фільмів по ІД
    let SearchFavor = `${apiKey}i=${id}`;
    fetch(SearchFavor)
      .then((resposiv) => {
        return resposiv.json();
      })
      .then((responseData) => {
        dataFavor = responseData;
        // вписую
        console.log(dataFavor);

        if (dataFavor.Response === "True") {
          showFavor();
        }
      });
  }
}
let htmlFavorite = "";
function favorites() {
  // нажимаю кнопку = приховую\показую вміст favorites
  $(".myFavorites").fadeToggle();
  $(".myFavorites").html(htmlFavorite);
  $(".content").hide();
}

// вписую люблені фільми
function showFavor() {
  htmlFavorite += `<div><h2> ${dataFavor.Title}</h2>`;
  htmlFavorite += `<img src="${dataFavor.Poster}" alt="" />
  </div>`;
}
