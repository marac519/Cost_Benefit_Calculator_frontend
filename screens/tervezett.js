async function load_day_data() {

   localStorage.setItem("tervmod", "true")

   if(performance.navigation.type == 2){
      location.reload(true);
   }

    let munkaszam_szuro_ref = document.getElementById('munkaszam-szuro')
    
       var url = "https://apa-alkalmazas.herokuapp.com/get-munkaszamok";
       var xhr = new XMLHttpRequest();
       xhr.open("GET", url);
       xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);
       xhr.setRequestHeader("link", "tervezett");
       xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
             console.log(xhr.status);
             console.log(xhr.responseText);
             let adat = JSON.parse(this.responseText)
             for (const q in adat){
                document.getElementById('munkaszam-szuro').innerHTML += `<option value="${adat[q].munkaszám}">${adat[q].munkaszám}</option>`
                console.log(adat[q].munkaszám)
             }
          }};
       xhr.send();
    
    munkaszam_szuro_ref.onchange = () => {
    
       if (munkaszam_szuro_ref.value != ""){
    
       document.getElementById('napi-munkák-lista').innerHTML = '<div class="loader-yellow" id="összesítő-loader" style="position: absolute; top: 40%; left: 49%;"></div>'
    
       console.log(munkaszam_szuro_ref.value)
       
       var url = "https://apa-alkalmazas.herokuapp.com/get-tervezett";
       
       var xhr = new XMLHttpRequest();
       xhr.open("GET", url);
       
       xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);
       xhr.setRequestHeader("munkaszam", `${munkaszam_szuro_ref.value}`);
       localStorage.setItem("munkaszam", `${munkaszam_szuro_ref.value}`)
       
       xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
             console.log(xhr.status);
             console.log(xhr.responseText);
             data = JSON.parse(xhr.responseText)
             localStorage.setItem("munkanapok_adatok", `${xhr.responseText}`)
             const lista = document.getElementById('napi-munkák-lista')
             data = data.sort((idA, idB) => idB.id - idA.id,)
             
             document.getElementById('napi-munkák-lista').innerHTML = ''
             for (const i in data) {
                 let datum = data[i].dátum
                 datum = datum.slice(0, 16)
                 let nap
                 let hónap
       
                 let hanyadika = datum.slice(5, 7)
       
                 if(datum.slice(0, 3) == 'Mon'){
                    nap = 'Hétfő'
                 }
                 if(datum.slice(0, 3) == 'Tue'){
                    nap = 'Kedd'
                 }
                 if(datum.slice(0, 3) == 'Wed'){
                   nap = 'Szerda'
                }
                if(datum.slice(0, 3) == 'Thu'){
                   nap = 'Csütörtök'
                }
                if(datum.slice(0, 3) == 'Fri'){
                   nap = 'Péntek'
                }
                if(datum.slice(0, 3) == 'Sat'){
                   nap = 'Szombat'
                }
                if(datum.slice(0, 3) == 'Sun'){
                   nap = 'Vasárnap'
                }
       
       
                if(datum.slice(8, 11) == 'Jan'){
                   hónap = 'Január'
                }
                if(datum.slice(8, 11) == 'Feb'){
                   hónap = 'Február'
                }
                if(datum.slice(8, 11) == 'Mar'){
                   hónap = 'Március'
                }
                if(datum.slice(8, 11) == 'Apr'){
                   hónap = 'Április'
                }
                if(datum.slice(8, 11) == 'May'){
                   hónap = 'Május'
                }
                if(datum.slice(8, 11) == 'Jun'){
                   hónap = 'Június'
                }
                if(datum.slice(8, 11) == 'Jul'){
                   hónap = 'Július'
                }
                if(datum.slice(8, 11) == 'Aug'){
                   hónap = 'Augusztus'
                }
                if(datum.slice(8, 11) == 'Sep'){
                   hónap = 'Szeptember'
                }
                if(datum.slice(8, 11) == 'Okt'){
                   hónap = 'Október'
                }
                if(datum.slice(8, 11) == 'Nov'){
                   hónap = 'November'
                }
                if(datum.slice(8, 11) == 'Dec'){
                   hónap = 'December'
                }
       
                console.log(i)
       
                lista.innerHTML += `<div class="card" id="${data[i].id}" style="max-height: 242px; width: 10rem; margin-right: 30px; margin-top:20px; background-color: black; border: 1px solid #F2E86D;">
                <div class="card-img-top" style="height: 50px; background-color: #F2E86D; display: flex; justify-content:center; align-items: center">
                   <p style="margin: 0px; font-size: x-large">${data[i].munkaszám}</p>
                </div>
                <div class="card-body" style="margin-right:20px">
                <h5 class="card-title" style="color: white">${nap}, ${hónap} ${hanyadika}</h5>
                <p class="card-text" style="color: white">Előkalkuláció: ${numberWithCommas(data[i].napi_koltseg)} Ft</p>
                <a href="/screens/megnezem.html" class="btn btn-success megnezem" style="background-color: #f2e76d7a !important; border: #F2E86D !important; color: white">Megnézem</a>
                </div>
                </div>`
             }
             try {
                document.getElementById("összesítő-loader").remove()
             } catch {}
       
       
             async function megnezem() {
       
                let szürke_dobozok = document.getElementsByClassName("megnezem")
                let napi_munkák_lista = document.getElementById("napi-munkák-lista").children
                console.log(szürke_dobozok)
                console.log(napi_munkák_lista.length)
                for (let i = 0; i < napi_munkák_lista.length; i++) {
                   napi_munkák_lista[i].addEventListener("click", function() {
                      //localStorage.setItem("dátum", `${napi_munkák_lista[i].children[1].children[0].outerText}`)
                      //localStorage.setItem("emberek", `${napi_munkák_lista[i].children[1].children[1].outerText}`)
                      //localStorage.setItem("munkagépek", `${napi_munkák_lista[i].children[1].children[2].outerText}`)
       
                      localStorage.setItem("id", `${napi_munkák_lista[i].id}`)
                      //console.log(localStorage.getItem("id"))
                         //console.log(napi_munkák_lista[i].id)
                      //console.log(localStorage.getItem("emberek"))
                      //console.log(localStorage.getItem("munkagépek"))
                   })
                }
             }
             megnezem()
          }};
       
       xhr.send();
       }
    
       if (munkaszam_szuro_ref.value == ""){
          //console.log(data)
          document.getElementById('napi-munkák-lista').innerHTML = '<h4 style="color: honeydew; margin: auto; padding-bottom: 40px;">Kérlek válassz munkaszámot!</h4>'
       }
    
       }
    }
load_day_data()

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
 }
 
 function commasToNumber(y) {
    return parseInt(y.toString().replace(/ /g, ''));
 }