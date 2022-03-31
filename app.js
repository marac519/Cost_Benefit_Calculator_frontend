document.getElementById("input-mező").focus(); //focus módba teszi az input mező hogy ne kelljen belekattintani!
document.getElementById("belepes").addEventListener("click", function(){
    login()
})
document.getElementById("input-mező").addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    login()
  }
});


async function login() {

  const belepes_container = document.getElementsByClassName("belepes-container")
  belepes_container[0].innerHTML = '<div class="loader"></div>'

  var url = " https://apa-alkalmazas.herokuapp.com/check";

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  await fetch("https://api.ipify.org/?format=json")
    .then(results => results.json())
    .then(data => localStorage.setItem("ip", data.ip));

  //console.log(localStorage.getItem("ip"))
  xhr.setRequestHeader("ip", localStorage.getItem("ip"));
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
            hiba.innerHTML = '<h6>Üres jelszót adtál meg!</h6> <style>#container h6 {margin-top:30px}</style>'
            
            const belepes_container = document.getElementsByClassName("belepes-container")
            belepes_container[0].innerHTML = '<button type="button" class="btn btn-warning" id="belepes">Belépés</button>'
            
            document.getElementById("belepes").addEventListener("click", function(){
              login()
              hiba.innerHTML = ''
            })
        }
        else if (data.category === 'Lejart a probalkozasaid szama!') {
          const hiba = document.getElementById('container-error')
          hiba.innerHTML = '<h6>Lejárt a probálkozásaid száma!</h6> <style>#container h6 {margin-top:30px}</style>'
          
          const belepes_container = document.getElementById("input")
          belepes_container.innerHTML = ''
        }
        else {
          const hiba = document.getElementById('container-error')
          hiba.innerHTML = "<h6>Rossz jelszó! Don't try to hack me!</h6> <style>#container h6 {margin-top:30px}</style>"
          
          const belepes_container = document.getElementsByClassName("belepes-container")
          belepes_container[0].innerHTML = '<button type="button" class="btn btn-warning" id="belepes">Belépés</button>'
          
          document.getElementById("belepes").addEventListener("click", function(){
            login()
            hiba.innerHTML = ''
          })
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

  