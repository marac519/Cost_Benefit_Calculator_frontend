document.getElementById("belepes").addEventListener("click", function(){
    login()
})

async function login() {
    var url = " https://apa-alkalmazas.herokuapp.com/check";

var xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
      const data = JSON.parse(xhr.responseText)
      //console.log(jelsz.category)

      if (data.category == 'ADMIN') {
        window.location.href = '/screens/home.html'
        localStorage.setItem("signed_in", "true")
        localStorage.setItem("token", data.token)

      }
      else if (data.category == 'GUEST') {
          window.location.href = '/screens/GUEST_home.html'
          localStorage.setItem("signed_in", "true")
          localStorage.setItem("token", data.token)

      }
      else if (data.category === 'Ures jelszo!') {
          const hiba = document.getElementById('container-error')
          hiba.innerHTML = '<h6>Üres jelszót adtál meg!</h6> <style>#container h6 {margin-left: 120px; margin-top:30px}</style>'
      }
      else {
        const hiba = document.getElementById('container-error')
        hiba.innerHTML = "<h6>Rossz jelszó! Don't try to hack me!</h6> <style>#container h6 {margin-left: 75px; margin-top:30px}</style>"
      }
   }
};
let ertek = document.getElementById("input-mező").value
var data = {jelszó: ertek};
const senddata = JSON.stringify(data)
xhr.send(senddata);

  }


// async function proba_api() {
//     var url = "https://apa-alkalmazas.herokuapp.com/get-munkagepek";

// var xhr = new XMLHttpRequest();
// xhr.open("GET", url);

// xhr.onreadystatechange = function () {
//    if (xhr.readyState === 4) {
//       console.log(xhr.status);
//       data = JSON.parse(xhr.responseText)
//       for (const i in data) {
//         console.log(data[i].név);
//       }
      
//    }};

// xhr.send();
// }

//proba_api()

  