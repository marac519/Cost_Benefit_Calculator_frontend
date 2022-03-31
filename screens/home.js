

async function load_day_data() {

let munkaszam_szuro_ref = document.getElementById('munkaszam-szuro')

   var url = "https://apa-alkalmazas.herokuapp.com/get-munkaszamok";
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url);
   xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);
   xhr.setRequestHeader("link", "osszesito")
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

   document.getElementById('napi-munkák-lista').innerHTML = '<div class="loader" id="összesítő-loader" style="position: absolute; top: 40%; left: 49%;"></div>'

   console.log(munkaszam_szuro_ref.value)
   
   var url = "https://apa-alkalmazas.herokuapp.com/get-munkanapok";
   
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
   
            lista.innerHTML += `<div class="card" id="${data[i].id}" style="max-height: 242px; width: 10rem; margin-right: 30px; margin-top:20px; background-color: black; border: 1px solid #C5EBC3;">
            <div class="card-img-top" style="height: 50px; background-color: #C5EBC3; display: flex; justify-content:center; align-items: center">
               <p style="margin: 0px; font-size: x-large">${data[i].munkaszám}</p>
            </div>
            <div class="card-body" style="margin-right:20px">
            <h5 class="card-title" style="color: #C5EBC3">${nap}, ${hónap} ${hanyadika}</h5>
            <p class="card-text" style="color: #C5EBC3">Napi Költség: ${numberWithCommas(data[i].napi_koltseg)} Ft</p>
            <a href="/screens/megnezem.html" class="btn btn-success megnezem">Megnézem</a>
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


async function get_alvallalkozoi_szerzodes() {
   var url = "https://apa-alkalmazas.herokuapp.com/get-alvallalkozoi_szerzodes";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);
xhr.setRequestHeader("id", "")

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
     console.log(xhr.status);
     console.log(xhr.responseText);
     data = JSON.parse(xhr.responseText)
     data = data.sort((idA, idB) => idA.id - idB.id,)
     //const lista = document.getElementById('emberek-lista-get')
     
     let html_string
     for (const i in data) {
       html_string += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].munkaszám}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].kivitelező}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].szerződéses_ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].pótmunka}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].százalékos_készültség}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].forint_készültség}</td>
     </tr>`
     }

     const lista = document.getElementById('beton-lista-get')
     console.log(html_string.slice(0, 9))
     if (html_string.slice(0, 9) == "undefined"){
     lista.innerHTML = html_string.slice(9, -1)
     } else {
        lista.innerHTML = html_string
     }
     document.getElementsByClassName("loader")[0].style.display = "None"
     setTimeout(function(){
        window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
     },1000)
  }};
  
  setTimeout(function(){
     xhr.send();
  },1000)

}
async function post_alvallalkozoi_szerzodes() {
   has_eventlistener = false
   edit_gomb_has_eventlistener = false

   document.getElementById("beton-plus-gomb").addEventListener("click", function() {
      //console.log("hello")
      const lista = document.getElementById('beton-lista-get')
      const van_elso_sor = document.getElementById("beton_típus_add_1")
      if (van_elso_sor == null) {
         lista.innerHTML += `<tr>
         <td></td>
         <td style="padding-left: 80px"><input id="beton_típus_add_1" style="width: 90px"></input></td>
         <td style="padding-left: 80px"><input id="beton_ár_add_1" style="width: 150px"></input></td>
         <td style="padding-left: 80px"><input id="beton_kedvezményes_ár_add_1" style="width: 130px"></input></td>
         <td style="padding-left: 80px"><input id="beton_gyártó_add_1" style="width: 90px"></input></td>
         <td style="padding-left: 80px"><input id="beton_pótmunka_add_1" style="width: 80px"></input></td>
         <td style="padding-left: 80px"><input id="beton_%_add_1" style="width: 60px"></input></td>
         <td style="padding-left: 80px"><input id="beton_ft_add_1" style="width: 60px"></input></td>
         </tr>`
         const mentés_gomb_wrapper = document.getElementById("beton-lista-wrapper")
         const mentés_gomb = document.getElementById("mentés_gomb")
         console.log(mentés_gomb)
         if (mentés_gomb == null) {
            mentés_gomb_wrapper.innerHTML += `<div id="" style="display: flex; flex-direction: column-reverse; align-items: center; padding-top: 100px; padding-bottom: 0px;">
            <button id="mentés_gomb" class="mentés_gomb" style="width: 200px;">Adatok Mentése</button>
            </div>`
         }
      } else {
         has_eventlistener = true
         lista.appendChild(document.getElementById("beton-lista-get").lastChild.cloneNode(true))

         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         
         document.getElementById("beton-lista-get").lastChild.children[1].children[0].id = `beton_típus_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[2].children[0].id = `beton_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[3].children[0].id = `beton_kedvezményes_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[4].children[0].id = `beton_gyártó_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[5].children[0].id = `beton_pótmunka_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[6].children[0].id = `beton_%_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[7].children[0].id = `beton_ft_add_${len}`

         //console.log(document.getElementById("beton-lista-get").lastChild.children[0].children[0].id)
         //console.log(document.getElementById("beton-lista-get").lastChild.children[1].children[0])
         //console.log(document.getElementById("beton-lista-get").lastChild.children[2].children[0])
         
      }
    window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
    //console.log(document.getElementById("mentés_gomb"))


    //------------------------------------MENTÉS GOMB----------------------------------------------------------
    if (has_eventlistener == false) {
      document.getElementById("mentés_gomb").addEventListener("click", function() {
         const lista = document.getElementById('beton-lista-get')
         has_eventlistener = true
         
         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         //--------------------------adatok tényleges posztolása--------------------------
         VEGLEGES_ADATOK = []
         for (let i = 1; i <= len; i++) {
            console.log(i)
            let típus = document.getElementById(`beton_típus_add_${i}`).value
            let ár = document.getElementById(`beton_ár_add_${i}`).value
            let kedvezményes_ár = document.getElementById(`beton_kedvezményes_ár_add_${i}`).value
            let gyártó = document.getElementById(`beton_gyártó_add_${i}`).value
            let pótmunka = document.getElementById(`beton_pótmunka_add_${i}`).value
            let szazalek = document.getElementById(`beton_%_add_${i}`).value
            let ft = document.getElementById(`beton_ft_add_${i}`).value

            beton = [típus, ár, kedvezményes_ár, gyártó, pótmunka, szazalek, ft]
            VEGLEGES_ADATOK.push(beton)
            //console.log(beton)

            document.getElementById(`beton_típus_add_${i}`).remove()
            document.getElementById(`beton_ár_add_${i}`).remove()
            document.getElementById(`beton_kedvezményes_ár_add_${i}`).remove()
            document.getElementById(`beton_gyártó_add_${i}`).remove()
            document.getElementById(`beton_pótmunka_add_${i}`).remove()
            document.getElementById(`beton_%_add_${i}`).remove()
            document.getElementById(`beton_ft_add_${i}`).remove()
         }
         document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<div class="loader"></div>`
         console.log(JSON.stringify(VEGLEGES_ADATOK))

         var url = "https://apa-alkalmazas.herokuapp.com/post-alvallalkozoi_szerzodes";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);

               console.log(xhr.status)
               if(xhr.status == 200) {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Adatok mentve!</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               } else {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Hiba történt! :(</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               }

               setTimeout(function(){
                  window.location.reload()
                  //document.getElementById("beton-lista-get").innerHTML = ""
                  //document.getElementById("mentés_gomb").remove()
                  },5000)
            }};

         var data = JSON.stringify(VEGLEGES_ADATOK);

         xhr.send(data);
      })

   }

   })

   //-------------------------------mentett adatok szerkesztése-------------------------
   document.getElementById("beton-edit-gomb").addEventListener("click", function() {
      
      document.getElementsByClassName("cím_hogy_melyik_tablat_nézed_szerzodes")[0].style.display = "None"
      document.getElementsByTagName("table")[0].style.width = "1400px"
      document.getElementById("beton-edit-gomb").style.left = '96%'

      document.getElementById("beton-plus-gomb").style.visibility = "hidden";
      
      console.log(document.getElementsByTagName("body"))
            document.getElementsByTagName("body")[0].innerHTML += `<div id="beállítások_módosítása_zöld_pipa_gomb" class="plus-gomb" style="position: fixed; top: 360px; left: 96%;">
            <i style="font-size: 20px; color: cornsilk; margin-left: 0px; margin-top: 2px" class="fas fa-check"></i>
          </div>`
      document.getElementById("beállítások_módosítása_zöld_pipa_gomb").addEventListener("click", function() {
         //console.log("hello")

         beton_adatok = []
         beton_adatok_UPDATE_VÉGLEGES = []
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[1].innerHTML.slice(0, 6))
            if (lista.children[i].children[1].innerHTML.slice(0, 6) == '<input') {
               console.log(lista.children[i].children[0].innerText)
               console.log(lista.children[i].children[1].children[0].value)
               console.log(lista.children[i].children[2].children[0].value)
               console.log(lista.children[i].children[3].children[0].value)
               console.log(lista.children[i].children[4].children[0].value)
               console.log(lista.children[i].children[5].children[0].value)
               console.log(lista.children[i].children[6].children[0].value)
               console.log(lista.children[i].children[7].children[0].value)
               //console.log("hello")

               let id = lista.children[i].children[0].innerText
               let típus = lista.children[i].children[1].children[0].value
               let ár = lista.children[i].children[2].children[0].value
               let kedvezményes_ár = lista.children[i].children[3].children[0].value
               let gyártó = lista.children[i].children[4].children[0].value
               let pótmunka = lista.children[i].children[5].children[0].value
               let szazalek = lista.children[i].children[6].children[0].value
               let ft = lista.children[i].children[7].children[0].value

               beton_adatok.push(id, típus, ár, kedvezményes_ár, gyártó, pótmunka, szazalek, ft)
               beton_adatok_UPDATE_VÉGLEGES.push(beton_adatok)
               beton_adatok = []
            }
         }
         console.log(JSON.stringify(beton_adatok_UPDATE_VÉGLEGES))
         document.getElementById("beton-lista-get").innerHTML = `<div class="loader" style="position: absolute; left: 45%; top: 150%"></div>`

         //------------------adatok frissítése hívás-------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-alvallalkozoi_szerzodes";

         var xhr = new XMLHttpRequest();
         xhr.open("PUT", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_UPDATE_VÉGLEGES);

         xhr.send(data);


         //------------------adatok törlése hívás------------------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-alvallalkozoi_szerzodes";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_DELETE_VÉGLEGES);

         xhr.send(data);

         setTimeout(function(){
            window.location.reload()
         }, 5000)
      })

      const lista = document.getElementById('beton-lista-get')
      if(edit_gomb_has_eventlistener == false) {
      for (const i in lista.children) {
      //   lista.innerHTML += `<tr style="border-bottom: 2px solid;
      //   border-color: aliceblue;">
      //   <td style="padding-top: 13px">${data[i].id}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
      // </tr>`
         //console.log(lista.children)
         lista.children[i].innerHTML += `<td style="padding-top: 15px;">
            <div class="sor_edit_gomb" style="background-color: green; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; padding-left: 2px; padding-bottom: 2px; margin-right: 20px; cursor: pointer"><i style="font-size: 18px" class="far fa-edit"></i></div>
            </td>
            <td style="padding-top: 15px;">
            <div class="sor_delete_gomb" style="background-color: red; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; cursor: pointer"><i style="font-size: 18px" class="far fa-trash-alt"></i></div>
            </td>`
      }
      edit_gomb_has_eventlistener = true
      }

      let sor_edit_gomb = document.getElementsByClassName("sor_edit_gomb")
      for(let i = 0; i < sor_edit_gomb.length; i++) {
         sor_edit_gomb[i].addEventListener("click", function() {
            console.log(`${i+1} Edit Clicked`)

            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)
            console.log(lista.children[i].children[5].innerText)
            console.log(lista.children[i].children[6].innerText)
            console.log(lista.children[i].children[7].innerText)

            let típus = lista.children[i].children[1].innerText
            let ár = lista.children[i].children[2].innerText
            let kedvezményes_ár = lista.children[i].children[3].innerText
            let gyártó = lista.children[i].children[4].innerText
            let pótmunka = lista.children[i].children[5].innerText
            let szazalek = lista.children[i].children[6].innerText
            let ft = lista.children[i].children[7].innerText

            lista.children[i].children[1].innerHTML = `<td><input value="${típus}" style="width: 130px"></input></td>`
            lista.children[i].children[2].innerHTML = `<td><input value="${ár}" style="width: 150px"></input></td>`
            lista.children[i].children[3].innerHTML = `<td><input value="${kedvezményes_ár}"  style="width: 100px"></input></td>`
            lista.children[i].children[4].innerHTML = `<td><input value="${gyártó}"  style="width: 100px"></input></td>`
            lista.children[i].children[5].innerHTML = `<td><input value="${pótmunka}"  style="width: 100px"></input></td>`
            lista.children[i].children[6].innerHTML = `<td><input value="${szazalek}"  style="width: 100px"></input></td>`
            lista.children[i].children[7].innerHTML = `<td><input value="${ft}"  style="width: 100px"></input></td>`
            

         })
      }
      
      let sor_delete_gomb = document.getElementsByClassName("sor_delete_gomb")
      beton_adatok = []
      beton_adatok_DELETE_VÉGLEGES = []

      document.getElementById("beton_delete_popup").style.width = '1300px'
      document.getElementById("beton_delete_popup").style.paddingLeft = '30px'
      document.getElementById("beton_delete_popup").style.paddingRight = '5px'
      for (let i = 0; i < sor_delete_gomb.length; i++) {
         sor_delete_gomb[i].addEventListener("click", function() {
            console.log(lista.children[i].children[0].innerText)
            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)
            console.log(lista.children[i].children[5].innerText)
            console.log(lista.children[i].children[6].innerText)
            console.log(lista.children[i].children[7].innerText)
            //let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            //console.log(scrollTop)
            //document.getElementById("beton_delete_popup").style.top = `250%`
            //document.getElementsByTagName("body").style.backgroundColor = "rgba(255, 255, 255)"
            document.getElementById("ide_kell_az_beton_delete_tábla").innerHTML = `
            <table style="margin-bottom: 40px">
              <thead>
                <tr>
                  <th>Id</th>
                  <th style="padding-left: 80px;">Munkaszám</th>
                  <th style="padding-left: 80px;">Kivitelező</th>
                  <th style="padding-left: 80px;">Tevékenység</th>
                  <th style="padding-left: 80px;">Szerződéses Ár</th>
                  <th style="padding-left: 80px;">Pótmunka</th>
                  <th style="padding-left: 80px;">Százalékos Készültség</th>
                  <th style="padding-left: 80px;">Forintos Készültség</th>
                </tr>
              </thead>
              <tbody id="popup-táblázat">
               <td>${lista.children[i].children[0].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[1].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[2].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[3].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[4].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[5].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[6].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[7].innerText}</td>
              </tbody>
            </table>`
            document.getElementById("beton_delete_popup").style.visibility = 'visible'
            document.getElementById("popup_háttér").style.visibility = 'visible'
            document.body.style.overflow = "hidden";

            
         })
      }

      document.getElementById("beton_popup_nem").addEventListener("click", function() {
         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";
      })

      document.getElementById("beton_popup_igen").addEventListener("click", function() {
         // console.log(document.getElementById("popup-táblázat").children[0].children[0].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[1].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[2].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[3].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[4].innerText)

         let id = document.getElementById("popup-táblázat").children[0].children[0].innerText
         let típus = document.getElementById("popup-táblázat").children[0].children[1].innerText
         let ár = document.getElementById("popup-táblázat").children[0].children[2].innerText
         let kedvezményes_ár = document.getElementById("popup-táblázat").children[0].children[3].innerText
         let gyártó = document.getElementById("popup-táblázat").children[0].children[4].innerText
         let pótmunka = document.getElementById("popup-táblázat").children[0].children[5].innerText
         let szazalek = document.getElementById("popup-táblázat").children[0].children[6].innerText
         let ft = document.getElementById("popup-táblázat").children[0].children[7].innerText

         beton_adatok = [id, típus, ár, kedvezményes_ár, gyártó, pótmunka, szazalek, ft]
         beton_adatok_DELETE_VÉGLEGES.push(beton_adatok)
         beton_adatok = []
         console.log(JSON.stringify(beton_adatok_DELETE_VÉGLEGES)) 

         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";

         for (let i = 0; i < lista.children.length; i++) {
            if (lista.children[i].children[0].innerText == id && lista.children[i].children[1].innerText == típus && lista.children[i].children[2].innerText == ár && lista.children[i].children[3].innerText == kedvezményes_ár) {
               //console.log(lista.children[i])

               //lista.children[i].remove()
               lista.children[i].style.visibility = "hidden"
            }

         // console.log(lista.children[i].children[0].innerText)
         // console.log(lista.children[i].children[1].innerText)
         // console.log(lista.children[i].children[2].innerText)
         // console.log(lista.children[i].children[3].innerText)
         // console.log(lista.children[i].children[4].innerText)
         }

      })

   })
   
   
}

async function get_sajat_szerzodes() {
   var url = "https://apa-alkalmazas.herokuapp.com/get-sajat_szerzodes";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
     console.log(xhr.status);
     console.log(xhr.responseText);
     data = JSON.parse(xhr.responseText)
     data = data.sort((idA, idB) => idA.id - idB.id,)
     //const lista = document.getElementById('emberek-lista-get')
     
     let html_string
     for (const i in data) {
       html_string += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].munkaszám}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].megrendelő}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].szerződéses_ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].pótmunka}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].százalékos_készültség}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].forint_készültség}</td>
     </tr>`
     }

     const lista = document.getElementById('beton-lista-get')
     console.log(html_string.slice(0, 9))
     if (html_string.slice(0, 9) == "undefined"){
     lista.innerHTML = html_string.slice(9, -1)
     } else {
        lista.innerHTML = html_string
     }
     document.getElementsByClassName("loader")[0].style.display = "None"
     setTimeout(function(){
        window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
     },1000)
  }};
  
  setTimeout(function(){
     xhr.send();
  },1000)

}
async function post_sajat_szerzodes() {
   has_eventlistener = false
   edit_gomb_has_eventlistener = false

   document.getElementById("beton-plus-gomb").addEventListener("click", function() {
      //console.log("hello")
      const lista = document.getElementById('beton-lista-get')
      const van_elso_sor = document.getElementById("beton_típus_add_1")
      if (van_elso_sor == null) {
         lista.innerHTML += `<tr>
         <td></td>
         <td style="padding-left: 80px"><input id="beton_típus_add_1" style="width: 90px"></input></td>
         <td style="padding-left: 80px"><input id="beton_ár_add_1" style="width: 150px"></input></td>
         <td style="padding-left: 80px"><input id="beton_kedvezményes_ár_add_1" style="width: 130px"></input></td>
         <td style="padding-left: 80px"><input id="beton_gyártó_add_1" style="width: 90px"></input></td>
         <td style="padding-left: 80px"><input id="beton_pótmunka_add_1" style="width: 80px"></input></td>
         <td style="padding-left: 80px"><input id="beton_%_add_1" style="width: 60px"></input></td>
         <td style="padding-left: 80px"><input id="beton_ft_add_1" style="width: 60px"></input></td>
         </tr>`
         const mentés_gomb_wrapper = document.getElementById("beton-lista-wrapper")
         const mentés_gomb = document.getElementById("mentés_gomb")
         console.log(mentés_gomb)
         if (mentés_gomb == null) {
            mentés_gomb_wrapper.innerHTML += `<div id="" style="display: flex; flex-direction: column-reverse; align-items: center; padding-top: 100px; padding-bottom: 0px;">
            <button id="mentés_gomb" class="mentés_gomb" style="width: 200px;">Adatok Mentése</button>
            </div>`
         }
      } else {
         has_eventlistener = true
         lista.appendChild(document.getElementById("beton-lista-get").lastChild.cloneNode(true))

         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         
         document.getElementById("beton-lista-get").lastChild.children[1].children[0].id = `beton_típus_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[2].children[0].id = `beton_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[3].children[0].id = `beton_kedvezményes_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[4].children[0].id = `beton_gyártó_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[5].children[0].id = `beton_pótmunka_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[6].children[0].id = `beton_%_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[7].children[0].id = `beton_ft_add_${len}`

         //console.log(document.getElementById("beton-lista-get").lastChild.children[0].children[0].id)
         //console.log(document.getElementById("beton-lista-get").lastChild.children[1].children[0])
         //console.log(document.getElementById("beton-lista-get").lastChild.children[2].children[0])
         
      }
    window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
    //console.log(document.getElementById("mentés_gomb"))


    //------------------------------------MENTÉS GOMB----------------------------------------------------------
    if (has_eventlistener == false) {
      document.getElementById("mentés_gomb").addEventListener("click", function() {
         const lista = document.getElementById('beton-lista-get')
         has_eventlistener = true
         
         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         //--------------------------adatok tényleges posztolása--------------------------
         VEGLEGES_ADATOK = []
         for (let i = 1; i <= len; i++) {
            console.log(i)
            let típus = document.getElementById(`beton_típus_add_${i}`).value
            let ár = document.getElementById(`beton_ár_add_${i}`).value
            let kedvezményes_ár = document.getElementById(`beton_kedvezményes_ár_add_${i}`).value
            let gyártó = document.getElementById(`beton_gyártó_add_${i}`).value
            let pótmunka = document.getElementById(`beton_pótmunka_add_${i}`).value
            let szazalek = document.getElementById(`beton_%_add_${i}`).value
            let ft = document.getElementById(`beton_ft_add_${i}`).value

            beton = [típus, ár, kedvezményes_ár, gyártó, pótmunka, szazalek, ft]
            VEGLEGES_ADATOK.push(beton)
            //console.log(beton)

            document.getElementById(`beton_típus_add_${i}`).remove()
            document.getElementById(`beton_ár_add_${i}`).remove()
            document.getElementById(`beton_kedvezményes_ár_add_${i}`).remove()
            document.getElementById(`beton_gyártó_add_${i}`).remove()
            document.getElementById(`beton_pótmunka_add_${i}`).remove()
            document.getElementById(`beton_%_add_${i}`).remove()
            document.getElementById(`beton_ft_add_${i}`).remove()
         }
         document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<div class="loader"></div>`
         console.log(JSON.stringify(VEGLEGES_ADATOK))

         var url = "https://apa-alkalmazas.herokuapp.com/post-sajat_szerzodes";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);

               console.log(xhr.status)
               if(xhr.status == 200) {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Adatok mentve!</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               } else {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Hiba történt! :(</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               }

               setTimeout(function(){
                  window.location.reload()
                  //document.getElementById("beton-lista-get").innerHTML = ""
                  //document.getElementById("mentés_gomb").remove()
                  },5000)
            }};

         var data = JSON.stringify(VEGLEGES_ADATOK);

         xhr.send(data);
      })

   }

   })

   //-------------------------------mentett adatok szerkesztése-------------------------
   document.getElementById("beton-edit-gomb").addEventListener("click", function() {
      
      document.getElementsByClassName("cím_hogy_melyik_tablat_nézed_szerzodes")[0].style.display = "None"
      document.getElementsByTagName("table")[0].style.width = "1400px"
      document.getElementById("beton-edit-gomb").style.left = '96%'

      document.getElementById("beton-plus-gomb").style.visibility = "hidden";
      
      console.log(document.getElementsByTagName("body"))
            document.getElementsByTagName("body")[0].innerHTML += `<div id="beállítások_módosítása_zöld_pipa_gomb" class="plus-gomb" style="position: fixed; top: 360px; left: 96%;">
            <i style="font-size: 20px; color: cornsilk; margin-left: 0px; margin-top: 2px" class="fas fa-check"></i>
          </div>`
      document.getElementById("beállítások_módosítása_zöld_pipa_gomb").addEventListener("click", function() {
         //console.log("hello")

         beton_adatok = []
         beton_adatok_UPDATE_VÉGLEGES = []
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[1].innerHTML.slice(0, 6))
            if (lista.children[i].children[1].innerHTML.slice(0, 6) == '<input') {
               console.log(lista.children[i].children[0].innerText)
               console.log(lista.children[i].children[1].children[0].value)
               console.log(lista.children[i].children[2].children[0].value)
               console.log(lista.children[i].children[3].children[0].value)
               console.log(lista.children[i].children[4].children[0].value)
               console.log(lista.children[i].children[5].children[0].value)
               console.log(lista.children[i].children[6].children[0].value)
               console.log(lista.children[i].children[7].children[0].value)
               //console.log("hello")

               let id = lista.children[i].children[0].innerText
               let típus = lista.children[i].children[1].children[0].value
               let ár = lista.children[i].children[2].children[0].value
               let kedvezményes_ár = lista.children[i].children[3].children[0].value
               let gyártó = lista.children[i].children[4].children[0].value
               let pótmunka = lista.children[i].children[5].children[0].value
               let szazalek = lista.children[i].children[6].children[0].value
               let ft = lista.children[i].children[7].children[0].value

               beton_adatok.push(id, típus, ár, kedvezményes_ár, gyártó, pótmunka, szazalek, ft)
               beton_adatok_UPDATE_VÉGLEGES.push(beton_adatok)
               beton_adatok = []
            }
         }
         console.log(JSON.stringify(beton_adatok_UPDATE_VÉGLEGES))
         document.getElementById("beton-lista-get").innerHTML = `<div class="loader" style="position: absolute; left: 45%; top: 150%"></div>`

         //------------------adatok frissítése hívás-------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-sajat_szerzodes";

         var xhr = new XMLHttpRequest();
         xhr.open("PUT", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_UPDATE_VÉGLEGES);

         xhr.send(data);


         //------------------adatok törlése hívás------------------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-sajat_szerzodes";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_DELETE_VÉGLEGES);

         xhr.send(data);

         setTimeout(function(){
            window.location.reload()
         }, 5000)
      })

      const lista = document.getElementById('beton-lista-get')
      if(edit_gomb_has_eventlistener == false) {
      for (const i in lista.children) {
      //   lista.innerHTML += `<tr style="border-bottom: 2px solid;
      //   border-color: aliceblue;">
      //   <td style="padding-top: 13px">${data[i].id}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
      // </tr>`
         //console.log(lista.children)
         lista.children[i].innerHTML += `<td style="padding-top: 15px;">
            <div class="sor_edit_gomb" style="background-color: green; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; padding-left: 2px; padding-bottom: 2px; margin-right: 20px; cursor: pointer"><i style="font-size: 18px" class="far fa-edit"></i></div>
            </td>
            <td style="padding-top: 15px;">
            <div class="sor_delete_gomb" style="background-color: red; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; cursor: pointer"><i style="font-size: 18px" class="far fa-trash-alt"></i></div>
            </td>`
      }
      edit_gomb_has_eventlistener = true
      }

      let sor_edit_gomb = document.getElementsByClassName("sor_edit_gomb")
      for(let i = 0; i < sor_edit_gomb.length; i++) {
         sor_edit_gomb[i].addEventListener("click", function() {
            console.log(`${i+1} Edit Clicked`)

            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)
            console.log(lista.children[i].children[5].innerText)
            console.log(lista.children[i].children[6].innerText)
            console.log(lista.children[i].children[7].innerText)

            let típus = lista.children[i].children[1].innerText
            let ár = lista.children[i].children[2].innerText
            let kedvezményes_ár = lista.children[i].children[3].innerText
            let gyártó = lista.children[i].children[4].innerText
            let pótmunka = lista.children[i].children[5].innerText
            let szazalek = lista.children[i].children[6].innerText
            let ft = lista.children[i].children[7].innerText

            lista.children[i].children[1].innerHTML = `<td><input value="${típus}" style="width: 130px"></input></td>`
            lista.children[i].children[2].innerHTML = `<td><input value="${ár}" style="width: 150px"></input></td>`
            lista.children[i].children[3].innerHTML = `<td><input value="${kedvezményes_ár}"  style="width: 100px"></input></td>`
            lista.children[i].children[4].innerHTML = `<td><input value="${gyártó}"  style="width: 100px"></input></td>`
            lista.children[i].children[5].innerHTML = `<td><input value="${pótmunka}"  style="width: 100px"></input></td>`
            lista.children[i].children[6].innerHTML = `<td><input value="${szazalek}"  style="width: 100px"></input></td>`
            lista.children[i].children[7].innerHTML = `<td><input value="${ft}"  style="width: 100px"></input></td>`
            

         })
      }
      
      let sor_delete_gomb = document.getElementsByClassName("sor_delete_gomb")
      beton_adatok = []
      beton_adatok_DELETE_VÉGLEGES = []

      document.getElementById("beton_delete_popup").style.width = '1300px'
      document.getElementById("beton_delete_popup").style.paddingLeft = '30px'
      document.getElementById("beton_delete_popup").style.paddingRight = '5px'
      for (let i = 0; i < sor_delete_gomb.length; i++) {
         sor_delete_gomb[i].addEventListener("click", function() {
            console.log(lista.children[i].children[0].innerText)
            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)
            console.log(lista.children[i].children[5].innerText)
            console.log(lista.children[i].children[6].innerText)
            console.log(lista.children[i].children[7].innerText)
            //let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            //console.log(scrollTop)
            //document.getElementById("beton_delete_popup").style.top = `250%`
            //document.getElementsByTagName("body").style.backgroundColor = "rgba(255, 255, 255)"
            document.getElementById("ide_kell_az_beton_delete_tábla").innerHTML = `
            <table style="margin-bottom: 40px">
              <thead>
                <tr>
                  <th>Id</th>
                  <th style="padding-left: 80px;">Munkaszám</th>
                  <th style="padding-left: 80px;">Kivitelező</th>
                  <th style="padding-left: 80px;">Tevékenység</th>
                  <th style="padding-left: 80px;">Szerződéses Ár</th>
                  <th style="padding-left: 80px;">Pótmunka</th>
                  <th style="padding-left: 80px;">Százalékos Készültség</th>
                  <th style="padding-left: 80px;">Forintos Készültség</th>
                </tr>
              </thead>
              <tbody id="popup-táblázat">
               <td>${lista.children[i].children[0].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[1].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[2].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[3].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[4].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[5].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[6].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[7].innerText}</td>
              </tbody>
            </table>`
            document.getElementById("beton_delete_popup").style.visibility = 'visible'
            document.getElementById("popup_háttér").style.visibility = 'visible'
            document.body.style.overflow = "hidden";

            
         })
      }

      document.getElementById("beton_popup_nem").addEventListener("click", function() {
         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";
      })

      document.getElementById("beton_popup_igen").addEventListener("click", function() {
         // console.log(document.getElementById("popup-táblázat").children[0].children[0].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[1].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[2].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[3].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[4].innerText)

         let id = document.getElementById("popup-táblázat").children[0].children[0].innerText
         let típus = document.getElementById("popup-táblázat").children[0].children[1].innerText
         let ár = document.getElementById("popup-táblázat").children[0].children[2].innerText
         let kedvezményes_ár = document.getElementById("popup-táblázat").children[0].children[3].innerText
         let gyártó = document.getElementById("popup-táblázat").children[0].children[4].innerText
         let pótmunka = document.getElementById("popup-táblázat").children[0].children[5].innerText
         let szazalek = document.getElementById("popup-táblázat").children[0].children[6].innerText
         let ft = document.getElementById("popup-táblázat").children[0].children[7].innerText

         beton_adatok = [id, típus, ár, kedvezményes_ár, gyártó, pótmunka, szazalek, ft]
         beton_adatok_DELETE_VÉGLEGES.push(beton_adatok)
         beton_adatok = []
         console.log(JSON.stringify(beton_adatok_DELETE_VÉGLEGES)) 

         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";

         for (let i = 0; i < lista.children.length; i++) {
            if (lista.children[i].children[0].innerText == id && lista.children[i].children[1].innerText == típus && lista.children[i].children[2].innerText == ár && lista.children[i].children[3].innerText == kedvezményes_ár) {
               //console.log(lista.children[i])

               //lista.children[i].remove()
               lista.children[i].style.visibility = "hidden"
            }

         // console.log(lista.children[i].children[0].innerText)
         // console.log(lista.children[i].children[1].innerText)
         // console.log(lista.children[i].children[2].innerText)
         // console.log(lista.children[i].children[3].innerText)
         // console.log(lista.children[i].children[4].innerText)
         }

      })

   })
   
   
}

async function get_emberek() {
    var url = "https://apa-alkalmazas.herokuapp.com/get-emberek";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
      data = JSON.parse(xhr.responseText)
      data = data.sort((idA, idB) => idA.id - idB.id,)
      //const lista = document.getElementById('emberek-lista-get')
      
      let html_string
      for (const i in data) {
        html_string += `<tr style="border-bottom: 2px solid;
        border-color: aliceblue;">
        <td style="padding-top: 13px">${data[i].id}</td>
        <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
        <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
        <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
      </tr>`
      }

      const lista = document.getElementById('emberek-lista-get')
      console.log(html_string.slice(0, 9))
      if (html_string.slice(0, 9) == "undefined"){
      lista.innerHTML = html_string.slice(9, -1)
      } else {
         lista.innerHTML = html_string
      }
      document.getElementsByClassName("loader")[0].style.display = "None"
      setTimeout(function(){
         window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
      },1000)
   }};
   
   setTimeout(function(){
      xhr.send();
   },1000)

}
async function post_emberek() {
   has_eventlistener = false
   edit_gomb_has_eventlistener = false

   document.getElementById("emberek-plus-gomb").addEventListener("click", function() {
      //console.log("hello")
      const lista = document.getElementById('emberek-lista-get')
      const van_elso_sor = document.getElementById("emberek_cég_add_1")
      if (van_elso_sor == null) {
         lista.innerHTML += `<tr>
         <td></td>
         <td style="padding-left: 80px"><input id="emberek_cég_add_1" style="width: 160px"></input></td>
         <td style="padding-left: 80px"><input id="emberek_tevékenység_add_1" style="width: 150px"></input></td>
         <td style="padding-left: 80px"><input id="emberek_ár_add_1" style="width: 80px"></input></td>
         </tr>`
         const mentés_gomb_wrapper = document.getElementById("emberek-lista-wrapper")
         const mentés_gomb = document.getElementById("mentés_gomb")
         if (mentés_gomb == null) {
            mentés_gomb_wrapper.innerHTML += `<div id="" style="display: flex; flex-direction: column-reverse; align-items: center; padding-top: 100px; padding-bottom: 0px;">
            <button id="mentés_gomb" class="mentés_gomb" style="width: 200px;">Adatok Mentése</button>
            </div>`
         }
      } else {
         has_eventlistener = true
         lista.appendChild(document.getElementById("emberek-lista-get").lastChild.cloneNode(true))

         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         
         document.getElementById("emberek-lista-get").lastChild.children[1].children[0].id = `emberek_cég_add_${len}`
         document.getElementById("emberek-lista-get").lastChild.children[2].children[0].id = `emberek_tevékenység_add_${len}`
         document.getElementById("emberek-lista-get").lastChild.children[3].children[0].id = `emberek_ár_add_${len}`

         //console.log(document.getElementById("emberek-lista-get").lastChild.children[0].children[0].id)
         //console.log(document.getElementById("emberek-lista-get").lastChild.children[1].children[0])
         //console.log(document.getElementById("emberek-lista-get").lastChild.children[2].children[0])
         
      }
    window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
    //console.log(document.getElementById("mentés_gomb"))


    //------------------------------------MENTÉS GOMB----------------------------------------------------------
    if (has_eventlistener == false) {
      document.getElementById("mentés_gomb").addEventListener("click", function() {
         const lista = document.getElementById('emberek-lista-get')
         has_eventlistener = true
         
         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         //--------------------------adatok tényleges posztolása--------------------------
         VEGLEGES_ADATOK = []
         for (let i = 1; i <= len; i++) {
            console.log(i)
            let cég = document.getElementById(`emberek_cég_add_${i}`).value
            let tevékenység = document.getElementById(`emberek_tevékenység_add_${i}`).value
            let ár = document.getElementById(`emberek_ár_add_${i}`).value

            emberek = [cég, tevékenység, ár]
            VEGLEGES_ADATOK.push(emberek)
            //console.log(emberek)

            document.getElementById(`emberek_cég_add_${i}`).remove()
            document.getElementById(`emberek_tevékenység_add_${i}`).remove()
            document.getElementById(`emberek_ár_add_${i}`).remove()
         }
         document.getElementById("emberek-lista-wrapper").children[1].innerHTML = `<div class="loader"></div>`
         console.log(JSON.stringify(VEGLEGES_ADATOK))

         var url = "https://apa-alkalmazas.herokuapp.com/post-emberek";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);

               console.log(xhr.status)
               if(xhr.status == 200) {
               document.getElementById("emberek-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Adatok mentve!</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               } else {
               document.getElementById("emberek-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Hiba történt! :(</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               }

               setTimeout(function(){
                  window.location.reload()
                  //document.getElementById("emberek-lista-get").innerHTML = ""
                  //document.getElementById("mentés_gomb").remove()
                  },5000)
            }};

         var data = JSON.stringify(VEGLEGES_ADATOK);

         xhr.send(data);
      })

   }

   })

   //-------------------------------mentett adatok szerkesztése-------------------------
   document.getElementById("emberek-edit-gomb").addEventListener("click", function() {
      //console.log("hello")

      document.getElementById("emberek-plus-gomb").style.visibility = "hidden";
      
      console.log(document.getElementsByTagName("body"))
            document.getElementsByTagName("body")[0].innerHTML += `<div id="beállítások_módosítása_zöld_pipa_gomb" class="plus-gomb" style="position: fixed; top: 360px; left: 90%;">
            <i style="font-size: 20px; color: cornsilk; margin-left: 0px; margin-top: 2px" class="fas fa-check"></i>
          </div>`
      document.getElementById("beállítások_módosítása_zöld_pipa_gomb").addEventListener("click", function() {
         //console.log("hello")

         emberek_adatok = []
         emberek_adatok_UPDATE_VÉGLEGES = []
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[1].innerHTML.slice(0, 6))
            if (lista.children[i].children[1].innerHTML.slice(0, 6) == '<input') {
               console.log(lista.children[i].children[0].innerText)
               console.log(lista.children[i].children[1].children[0].value)
               console.log(lista.children[i].children[2].children[0].value)
               console.log(lista.children[i].children[3].children[0].value)
               //console.log("hello")

               let id= lista.children[i].children[0].innerText
               let cég = lista.children[i].children[1].children[0].value
               let tevékenység = lista.children[i].children[2].children[0].value
               let ár = lista.children[i].children[3].children[0].value
               emberek_adatok.push(id, cég, tevékenység, ár)
               emberek_adatok_UPDATE_VÉGLEGES.push(emberek_adatok)
               emberek_adatok = []
            }
         }
         console.log(JSON.stringify(emberek_adatok_UPDATE_VÉGLEGES))
         document.getElementById("emberek-lista-get").innerHTML = `<div class="loader" style="position: absolute; left: 45%; top: 150%"></div>`

         //------------------adatok frissítése hívás-------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-emberek";

         var xhr = new XMLHttpRequest();
         xhr.open("PUT", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(emberek_adatok_UPDATE_VÉGLEGES);

         xhr.send(data);


         //------------------adatok törlése hívás------------------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-emberek";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(emberek_adatok_DELETE_VÉGLEGES);

         xhr.send(data);

         setTimeout(function(){
            window.location.reload()
         }, 5000)
      })

      const lista = document.getElementById('emberek-lista-get')
      if(edit_gomb_has_eventlistener == false) {
      for (const i in lista.children) {
      //   lista.innerHTML += `<tr style="border-bottom: 2px solid;
      //   border-color: aliceblue;">
      //   <td style="padding-top: 13px">${data[i].id}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
      // </tr>`
         //console.log(lista.children)
         lista.children[i].innerHTML += `<td style="padding-top: 15px;">
            <div class="sor_edit_gomb" style="background-color: green; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; padding-left: 2px; padding-bottom: 2px; margin-right: 20px; cursor: pointer"><i style="font-size: 18px" class="far fa-edit"></i></div>
            </td>
            <td style="padding-top: 15px;">
            <div class="sor_delete_gomb" style="background-color: red; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; cursor: pointer"><i style="font-size: 18px" class="far fa-trash-alt"></i></div>
            </td>`
      }
      edit_gomb_has_eventlistener = true
      }

      let sor_edit_gomb = document.getElementsByClassName("sor_edit_gomb")
      for(let i = 0; i < sor_edit_gomb.length; i++) {
         sor_edit_gomb[i].addEventListener("click", function() {
            console.log(`${i+1} Edit Clicked`)

            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)

            let cég = lista.children[i].children[1].innerText
            let tevékenység = lista.children[i].children[2].innerText
            let ár = lista.children[i].children[3].innerText

            lista.children[i].children[1].innerHTML = `<td><input value="${cég}" style="width: 130px"></input></td>`
            lista.children[i].children[2].innerHTML = `<td><input value="${tevékenység}" style="width: 150px"></input></td>`
            lista.children[i].children[3].innerHTML = `<td><input value="${ár}"  style="width: 100px"></input></td>`
            

         })
      }
      
      let sor_delete_gomb = document.getElementsByClassName("sor_delete_gomb")
      emberek_adatok = []
      emberek_adatok_DELETE_VÉGLEGES = []
      for (let i = 0; i < sor_delete_gomb.length; i++) {
         sor_delete_gomb[i].addEventListener("click", function() {
            console.log(lista.children[i].children[0].innerText)
            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            //let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            //console.log(scrollTop)
            //document.getElementById("emberek_delete_popup").style.top = `250%`
            //document.getElementsByTagName("body").style.backgroundColor = "rgba(255, 255, 255)"
            document.getElementById("ide_kell_az_emberek_delete_tábla").innerHTML = `
            <table style="margin-bottom: 40px">
              <thead>
                <tr>
                  <th>Id</th>
                  <th style="padding-left: 80px;">Cég</th>
                  <th style="padding-left: 80px;">Tevékenység</th>
                  <th style="padding-left: 80px;">Ár</th>
                </tr>
              </thead>
              <tbody id="popup-táblázat">
               <td>${lista.children[i].children[0].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[1].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[2].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[3].innerText}</td>
              </tbody>
            </table>`
            document.getElementById("emberek_delete_popup").style.visibility = 'visible'
            document.getElementById("popup_háttér").style.visibility = 'visible'
            document.body.style.overflow = "hidden";

            
         })
      }

      document.getElementById("emberek_popup_nem").addEventListener("click", function() {
         document.getElementById("emberek_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";
      })

      document.getElementById("emberek_popup_igen").addEventListener("click", function() {
         // console.log(document.getElementById("popup-táblázat").children[0].children[0].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[1].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[2].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[3].innerText)

         let id = document.getElementById("popup-táblázat").children[0].children[0].innerText
         let cég = document.getElementById("popup-táblázat").children[0].children[1].innerText
         let tevékenység = document.getElementById("popup-táblázat").children[0].children[2].innerText
         let ár = document.getElementById("popup-táblázat").children[0].children[3].innerText

         emberek_adatok = [id, cég, tevékenység, ár]
         emberek_adatok_DELETE_VÉGLEGES.push(emberek_adatok)
         emberek_adatok = []
         console.log(JSON.stringify(emberek_adatok_DELETE_VÉGLEGES)) 

         document.getElementById("emberek_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";

         for (let i = 0; i < lista.children.length; i++) {
            if (lista.children[i].children[0].innerText == id && lista.children[i].children[1].innerText == cég && lista.children[i].children[2].innerText == tevékenység && lista.children[i].children[3].innerText == ár) {
               //console.log(lista.children[i])

               //lista.children[i].remove()
               lista.children[i].style.visibility = "hidden"
            }

         // console.log(lista.children[i].children[0].innerText)
         // console.log(lista.children[i].children[1].innerText)
         // console.log(lista.children[i].children[2].innerText)
         // console.log(lista.children[i].children[3].innerText)
         }

      })

   })
   
   
}


async function get_munkagepek() {
   var url = "https://apa-alkalmazas.herokuapp.com/get-munkagepek";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
     console.log(xhr.status);
     console.log(xhr.responseText);
     data = JSON.parse(xhr.responseText)
     data = data.sort((idA, idB) => idA.id - idB.id,)
     //const lista = document.getElementById('munkagépek-lista-get')
     
     let html_string
     for (const i in data) {
       html_string += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].típus}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].rendszám}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].óradíj}</td>
     </tr>`
     }

     const lista = document.getElementById('munkagépek-lista-get')
      console.log(html_string.slice(0, 9))
      if (html_string.slice(0, 9) == "undefined"){
      lista.innerHTML = html_string.slice(9, -1)
      } else {
         lista.innerHTML = html_string
      }
      document.getElementsByClassName("loader")[0].style.display = "None"
      setTimeout(function(){
        window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
      },1000)
  }};
  
setTimeout(function(){
  xhr.send();
},1000)



}
async function post_munkagepek() {
   has_eventlistener = false
   edit_gomb_has_eventlistener = false

   document.getElementById("munkagepek-plus-gomb").addEventListener("click", function() {
      //console.log("hello")
      const lista = document.getElementById('munkagépek-lista-get')
      const van_elso_sor = document.getElementById("munkagepek_cég_add_1")
      if (van_elso_sor == null) {
         lista.innerHTML += `<tr>
         <td></td>
         <td style="padding-left: 80px"><input id="munkagepek_típus_add_1" style="width: 160px"></input></td>
         <td style="padding-left: 80px"><input id="munkagepek_rendszám_add_1" style="width: 150px"></input></td>
         <td style="padding-left: 80px"><input id="munkagepek_cég_add_1" style="width: 80px"></input></td>
         <td style="padding-left: 80px"><input id="munkagepek_ár_add_1" style="width: 80px"></input></td>
         <td style="padding-left: 80px"><input id="munkagepek_óradíj_add_1" style="width: 80px"></input></td>
         </tr>`
         const mentés_gomb_wrapper = document.getElementById("munkagepek-lista-wrapper")
         const mentés_gomb = document.getElementById("mentés_gomb")
         if (mentés_gomb == null) {
            mentés_gomb_wrapper.innerHTML += `<div id="" style="display: flex; flex-direction: column-reverse; align-items: center; padding-top: 100px; padding-bottom: 0px;">
            <button id="mentés_gomb" class="mentés_gomb" style="width: 200px;">Adatok Mentése</button>
            </div>`
         }
      } else {
         has_eventlistener = true
         lista.appendChild(document.getElementById("munkagépek-lista-get").lastChild.cloneNode(true))

         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         
         document.getElementById("munkagépek-lista-get").lastChild.children[1].children[0].id = `munkagepek_típus_add_${len}`
         document.getElementById("munkagépek-lista-get").lastChild.children[2].children[0].id = `munkagepek_rendszám_add_${len}`
         document.getElementById("munkagépek-lista-get").lastChild.children[3].children[0].id = `munkagepek_cég_add_${len}`
         document.getElementById("munkagépek-lista-get").lastChild.children[4].children[0].id = `munkagepek_ár_add_${len}`
         document.getElementById("munkagépek-lista-get").lastChild.children[5].children[0].id = `munkagepek_óradíj_add_${len}`

         //console.log(document.getElementById("emberek-lista-get").lastChild.children[0].children[0].id)
         //console.log(document.getElementById("emberek-lista-get").lastChild.children[1].children[0])
         //console.log(document.getElementById("emberek-lista-get").lastChild.children[2].children[0])
         
      }
    window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
    //console.log(document.getElementById("mentés_gomb"))


    //------------------------------------MENTÉS GOMB----------------------------------------------------------
    if (has_eventlistener == false) {
      document.getElementById("mentés_gomb").addEventListener("click", function() {
         const lista = document.getElementById('munkagépek-lista-get')
         has_eventlistener = true
         
         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         //--------------------------adatok tényleges posztolása--------------------------
         VEGLEGES_ADATOK = []
         for (let i = 1; i <= len; i++) {
            console.log(i)
            let típus = document.getElementById(`munkagepek_típus_add_${i}`).value
            let rendszám = document.getElementById(`munkagepek_rendszám_add_${i}`).value
            let cég = document.getElementById(`munkagepek_cég_add_${i}`).value
            let ár = document.getElementById(`munkagepek_ár_add_${i}`).value
            let óradíj = document.getElementById(`munkagepek_óradíj_add_${i}`).value
            

            munkagepek = [típus, rendszám, cég, ár, óradíj]
            VEGLEGES_ADATOK.push(munkagepek)
            //console.log(munkagepek)

            document.getElementById(`munkagepek_típus_add_${i}`).remove()
            document.getElementById(`munkagepek_rendszám_add_${i}`).remove()
            document.getElementById(`munkagepek_cég_add_${i}`).remove()
            document.getElementById(`munkagepek_ár_add_${i}`).remove()
            document.getElementById(`munkagepek_óradíj_add_${i}`).remove()
         }
         document.getElementById("munkagepek-lista-wrapper").children[1].innerHTML = `<div class="loader"></div>`
         console.log(JSON.stringify(VEGLEGES_ADATOK))

         var url = "https://apa-alkalmazas.herokuapp.com/post-munkagepek";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);

               console.log(xhr.status)
               if(xhr.status == 200) {
               document.getElementById("munkagepek-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Adatok mentve!</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               } else {
               document.getElementById("munkagepek-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Hiba történt! :(</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               }

               setTimeout(function(){
                  window.location.reload()
                  //document.getElementById("munkagépek-lista-get").innerHTML = ""
                  //document.getElementById("mentés_gomb").remove()
                  },5000)
            }};

         var data = JSON.stringify(VEGLEGES_ADATOK);

         xhr.send(data);
      })

   }

   })

   //-------------------------------mentett adatok szerkesztése-------------------------
   document.getElementById("munkagepek-edit-gomb").addEventListener("click", function() {
      //console.log("hello")

      document.getElementById("munkagepek-plus-gomb").style.visibility = "hidden";
      
      console.log(document.getElementsByTagName("body"))
            document.getElementsByTagName("body")[0].innerHTML += `<div id="beállítások_módosítása_zöld_pipa_gomb" class="plus-gomb" style="position: fixed; top: 360px; left: 90%;">
            <i style="font-size: 20px; color: cornsilk; margin-left: 0px; margin-top: 2px" class="fas fa-check"></i>
          </div>`
      document.getElementById("beállítások_módosítása_zöld_pipa_gomb").addEventListener("click", function() {
         //console.log("hello")

         munkagepek_adatok = []
         munkagepek_adatok_UPDATE_VÉGLEGES = []
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[1].innerHTML.slice(0, 6))
            if (lista.children[i].children[1].innerHTML.slice(0, 6) == '<input') {
               console.log(lista.children[i].children[0].innerText)
               console.log(lista.children[i].children[1].children[0].value)
               console.log(lista.children[i].children[2].children[0].value)
               console.log(lista.children[i].children[3].children[0].value)
               console.log(lista.children[i].children[4].children[0].value)
               console.log(lista.children[i].children[5].children[0].value)
               //console.log("hello")

               let id= lista.children[i].children[0].innerText
               let típus = lista.children[i].children[1].children[0].value
               let rendszám = lista.children[i].children[2].children[0].value
               let cég = lista.children[i].children[3].children[0].value
               let ár = lista.children[i].children[4].children[0].value
               let óradíj = lista.children[i].children[5].children[0].value
               munkagepek_adatok.push(id, típus, rendszám, cég, ár, óradíj)
               munkagepek_adatok_UPDATE_VÉGLEGES.push(munkagepek_adatok)
               munkagepek_adatok = []
            }
         }
         console.log(JSON.stringify(munkagepek_adatok_UPDATE_VÉGLEGES))
         document.getElementById("munkagépek-lista-get").innerHTML = `<div class="loader" style="position: absolute; left: 45%; top: 150%"></div>`

         //------------------adatok frissítése hívás-------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-munkagepek";

         var xhr = new XMLHttpRequest();
         xhr.open("PUT", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(munkagepek_adatok_UPDATE_VÉGLEGES);

         xhr.send(data);


         //------------------adatok törlése hívás------------------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-munkagepek";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(munkagepek_adatok_DELETE_VÉGLEGES);

         xhr.send(data);

         setTimeout(function(){
            window.location.reload()
         }, 5000)
      })

      const lista = document.getElementById('munkagépek-lista-get')
      if(edit_gomb_has_eventlistener == false) {
      for (const i in lista.children) {
      //   lista.innerHTML += `<tr style="border-bottom: 2px solid;
      //   border-color: aliceblue;">
      //   <td style="padding-top: 13px">${data[i].id}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
      // </tr>`
         //console.log(lista.children)
         lista.children[i].innerHTML += `<td style="padding-top: 15px;">
            <div class="sor_edit_gomb" style="background-color: green; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; padding-left: 2px; padding-bottom: 2px; margin-right: 20px; cursor: pointer"><i style="font-size: 18px" class="far fa-edit"></i></div>
            </td>
            <td style="padding-top: 15px;">
            <div class="sor_delete_gomb" style="background-color: red; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; cursor: pointer"><i style="font-size: 18px" class="far fa-trash-alt"></i></div>
            </td>`
      }
      edit_gomb_has_eventlistener = true
      }

      let sor_edit_gomb = document.getElementsByClassName("sor_edit_gomb")
      for(let i = 0; i < sor_edit_gomb.length; i++) {
         sor_edit_gomb[i].addEventListener("click", function() {
            console.log(`${i+1} Edit Clicked`)

            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)
            console.log(lista.children[i].children[5].innerText)

            let típus = lista.children[i].children[1].innerText
            let rendszám = lista.children[i].children[2].innerText
            let cég = lista.children[i].children[3].innerText
            let ár = lista.children[i].children[4].innerText
            let óradíj = lista.children[i].children[5].innerText

            lista.children[i].children[1].innerHTML = `<td><input value="${típus}" style="width: 130px"></input></td>`
            lista.children[i].children[2].innerHTML = `<td><input value="${rendszám}" style="width: 150px"></input></td>`
            lista.children[i].children[3].innerHTML = `<td><input value="${cég}"  style="width: 100px"></input></td>`
            lista.children[i].children[4].innerHTML = `<td><input value="${ár}"  style="width: 100px"></input></td>`
            lista.children[i].children[5].innerHTML = `<td><input value="${óradíj}"  style="width: 100px"></input></td>`
            

         })
      }
      
      let sor_delete_gomb = document.getElementsByClassName("sor_delete_gomb")
      munkagepek_adatok = []
      munkagepek_adatok_DELETE_VÉGLEGES = []
      for (let i = 0; i < sor_delete_gomb.length; i++) {
         sor_delete_gomb[i].addEventListener("click", function() {
            console.log(lista.children[i].children[0].innerText)
            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)
            console.log(lista.children[i].children[5].innerText)
            //let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            //console.log(scrollTop)
            //document.getElementById("munkagepek_delete_popup").style.top = `250%`
            //document.getElementsByTagName("body").style.backgroundColor = "rgba(255, 255, 255)"
            document.getElementById("ide_kell_az_munkagepek_delete_tábla").innerHTML = `
            <table style="margin-bottom: 40px">
              <thead>
                <tr>
                  <th>Id</th>
                  <th style="padding-left: 80px;">Típus</th>
                  <th style="padding-left: 80px;">Rendszám</th>
                  <th style="padding-left: 80px;">Cég</th>
                  <th style="padding-left: 80px;">Ár</th>
                  <th style="padding-left: 80px;">Óradíj</th>
                </tr>
              </thead>
              <tbody id="popup-táblázat">
               <td>${lista.children[i].children[0].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[1].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[2].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[3].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[4].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[5].innerText}</td>
              </tbody>
            </table>`
            document.getElementById("munkagepek_delete_popup").style.visibility = 'visible'
            document.getElementById("popup_háttér").style.visibility = 'visible'
            document.body.style.overflow = "hidden";

            
         })
      }

      document.getElementById("munkagepek_popup_nem").addEventListener("click", function() {
         document.getElementById("munkagepek_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";
      })

      document.getElementById("munkagepek_popup_igen").addEventListener("click", function() {
         // console.log(document.getElementById("popup-táblázat").children[0].children[0].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[1].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[2].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[3].innerText)

         let id = document.getElementById("popup-táblázat").children[0].children[0].innerText
         let típus = document.getElementById("popup-táblázat").children[0].children[1].innerText
         let rendszám = document.getElementById("popup-táblázat").children[0].children[2].innerText
         let cég = document.getElementById("popup-táblázat").children[0].children[3].innerText
         let ár = document.getElementById("popup-táblázat").children[0].children[4].innerText
         let óradíj = document.getElementById("popup-táblázat").children[0].children[5].innerText

         munkagepek_adatok = [id, típus, rendszám, cég, ár, óradíj]
         munkagepek_adatok_DELETE_VÉGLEGES.push(munkagepek_adatok)
         munkagepek_adatok = []
         console.log(JSON.stringify(munkagepek_adatok_DELETE_VÉGLEGES)) 

         document.getElementById("munkagepek_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";

         for (let i = 0; i < lista.children.length; i++) {
            if (lista.children[i].children[0].innerText == id && lista.children[i].children[1].innerText == típus && lista.children[i].children[2].innerText == rendszám && lista.children[i].children[3].innerText == cég) {
               //console.log(lista.children[i])

               //lista.children[i].remove()
               lista.children[i].style.visibility = "hidden"
            }

         // console.log(lista.children[i].children[0].innerText)
         // console.log(lista.children[i].children[1].innerText)
         // console.log(lista.children[i].children[2].innerText)
         // console.log(lista.children[i].children[3].innerText)
         }

      })

   })
   
   
}


async function get_beton() {
   var url = "https://apa-alkalmazas.herokuapp.com/get-beton";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
     console.log(xhr.status);
     console.log(xhr.responseText);
     data = JSON.parse(xhr.responseText)
     data = data.sort((idA, idB) => idA.id - idB.id,)
     //const lista = document.getElementById('beton-lista-get')
     
     let html_string
     for (const i in data) {
       html_string += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].típus}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].kedvezményes_ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].gyártó}</td>
     </tr>`
     }

     const lista = document.getElementById('beton-lista-get')
      console.log(html_string.slice(0, 9))
      if (html_string.slice(0, 9) == "undefined"){
      lista.innerHTML = html_string.slice(9, -1)
      } else {
         lista.innerHTML = html_string
      }
      document.getElementsByClassName("loader")[0].style.display = "None"
      setTimeout(function(){
        window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
      },1000)
  }};
  
setTimeout(function(){
  xhr.send();
},1000)



}
async function post_beton() {
   has_eventlistener = false
   edit_gomb_has_eventlistener = false

   document.getElementById("beton-plus-gomb").addEventListener("click", function() {
      //console.log("hello")
      const lista = document.getElementById('beton-lista-get')
      const van_elso_sor = document.getElementById("beton_típus_add_1")
      if (van_elso_sor == null) {
         lista.innerHTML += `<tr>
         <td></td>
         <td style="padding-left: 80px"><input id="beton_típus_add_1" style="width: 160px"></input></td>
         <td style="padding-left: 80px"><input id="beton_ár_add_1" style="width: 150px"></input></td>
         <td style="padding-left: 80px"><input id="beton_kedvezményes_ár_add_1" style="width: 80px"></input></td>
         <td style="padding-left: 80px"><input id="beton_gyártó_add_1" style="width: 80px"></input></td>
         </tr>`
         const mentés_gomb_wrapper = document.getElementById("beton-lista-wrapper")
         const mentés_gomb = document.getElementById("mentés_gomb")
         console.log(mentés_gomb)
         if (mentés_gomb == null) {
            mentés_gomb_wrapper.innerHTML += `<div id="" style="display: flex; flex-direction: column-reverse; align-items: center; padding-top: 100px; padding-bottom: 0px;">
            <button id="mentés_gomb" class="mentés_gomb" style="width: 200px;">Adatok Mentése</button>
            </div>`
         }
      } else {
         has_eventlistener = true
         lista.appendChild(document.getElementById("beton-lista-get").lastChild.cloneNode(true))

         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         
         document.getElementById("beton-lista-get").lastChild.children[1].children[0].id = `beton_típus_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[2].children[0].id = `beton_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[3].children[0].id = `beton_kedvezményes_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[4].children[0].id = `beton_gyártó_add_${len}`

         //console.log(document.getElementById("beton-lista-get").lastChild.children[0].children[0].id)
         //console.log(document.getElementById("beton-lista-get").lastChild.children[1].children[0])
         //console.log(document.getElementById("beton-lista-get").lastChild.children[2].children[0])
         
      }
    window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
    //console.log(document.getElementById("mentés_gomb"))


    //------------------------------------MENTÉS GOMB----------------------------------------------------------
    if (has_eventlistener == false) {
      document.getElementById("mentés_gomb").addEventListener("click", function() {
         const lista = document.getElementById('beton-lista-get')
         has_eventlistener = true
         
         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         //--------------------------adatok tényleges posztolása--------------------------
         VEGLEGES_ADATOK = []
         for (let i = 1; i <= len; i++) {
            console.log(i)
            let típus = document.getElementById(`beton_típus_add_${i}`).value
            let ár = document.getElementById(`beton_ár_add_${i}`).value
            let kedvezményes_ár = document.getElementById(`beton_kedvezményes_ár_add_${i}`).value
            let gyártó = document.getElementById(`beton_gyártó_add_${i}`).value

            beton = [típus, ár, kedvezményes_ár, gyártó]
            VEGLEGES_ADATOK.push(beton)
            //console.log(beton)

            document.getElementById(`beton_típus_add_${i}`).remove()
            document.getElementById(`beton_ár_add_${i}`).remove()
            document.getElementById(`beton_kedvezményes_ár_add_${i}`).remove()
            document.getElementById(`beton_gyártó_add_${i}`).remove()
         }
         document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<div class="loader"></div>`
         console.log(JSON.stringify(VEGLEGES_ADATOK))

         var url = "https://apa-alkalmazas.herokuapp.com/post-beton";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);

               console.log(xhr.status)
               if(xhr.status == 200) {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Adatok mentve!</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               } else {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Hiba történt! :(</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               }

               setTimeout(function(){
                  window.location.reload()
                  //document.getElementById("beton-lista-get").innerHTML = ""
                  //document.getElementById("mentés_gomb").remove()
                  },5000)
            }};

         var data = JSON.stringify(VEGLEGES_ADATOK);

         xhr.send(data);
      })

   }

   })

   //-------------------------------mentett adatok szerkesztése-------------------------
   document.getElementById("beton-edit-gomb").addEventListener("click", function() {
      //console.log("hello")

      document.getElementById("beton-plus-gomb").style.visibility = "hidden";
      
      console.log(document.getElementsByTagName("body"))
            document.getElementsByTagName("body")[0].innerHTML += `<div id="beállítások_módosítása_zöld_pipa_gomb" class="plus-gomb" style="position: fixed; top: 360px; left: 90%;">
            <i style="font-size: 20px; color: cornsilk; margin-left: 0px; margin-top: 2px" class="fas fa-check"></i>
          </div>`
      document.getElementById("beállítások_módosítása_zöld_pipa_gomb").addEventListener("click", function() {
         //console.log("hello")

         beton_adatok = []
         beton_adatok_UPDATE_VÉGLEGES = []
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[1].innerHTML.slice(0, 6))
            if (lista.children[i].children[1].innerHTML.slice(0, 6) == '<input') {
               console.log(lista.children[i].children[0].innerText)
               console.log(lista.children[i].children[1].children[0].value)
               console.log(lista.children[i].children[2].children[0].value)
               console.log(lista.children[i].children[3].children[0].value)
               console.log(lista.children[i].children[4].children[0].value)
               //console.log("hello")

               let id = lista.children[i].children[0].innerText
               let típus = lista.children[i].children[1].children[0].value
               let ár = lista.children[i].children[2].children[0].value
               let kedvezményes_ár = lista.children[i].children[3].children[0].value
               let gyártó = lista.children[i].children[4].children[0].value
               beton_adatok.push(id, típus, ár, kedvezményes_ár, gyártó)
               beton_adatok_UPDATE_VÉGLEGES.push(beton_adatok)
               beton_adatok = []
            }
         }
         console.log(JSON.stringify(beton_adatok_UPDATE_VÉGLEGES))
         document.getElementById("beton-lista-get").innerHTML = `<div class="loader" style="position: absolute; left: 45%; top: 150%"></div>`

         //------------------adatok frissítése hívás-------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-beton";

         var xhr = new XMLHttpRequest();
         xhr.open("PUT", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_UPDATE_VÉGLEGES);

         xhr.send(data);


         //------------------adatok törlése hívás------------------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-beton";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_DELETE_VÉGLEGES);

         xhr.send(data);

         setTimeout(function(){
            window.location.reload()
         }, 5000)
      })

      const lista = document.getElementById('beton-lista-get')
      if(edit_gomb_has_eventlistener == false) {
      for (const i in lista.children) {
      //   lista.innerHTML += `<tr style="border-bottom: 2px solid;
      //   border-color: aliceblue;">
      //   <td style="padding-top: 13px">${data[i].id}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
      // </tr>`
         //console.log(lista.children)
         lista.children[i].innerHTML += `<td style="padding-top: 15px;">
            <div class="sor_edit_gomb" style="background-color: green; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; padding-left: 2px; padding-bottom: 2px; margin-right: 20px; cursor: pointer"><i style="font-size: 18px" class="far fa-edit"></i></div>
            </td>
            <td style="padding-top: 15px;">
            <div class="sor_delete_gomb" style="background-color: red; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; cursor: pointer"><i style="font-size: 18px" class="far fa-trash-alt"></i></div>
            </td>`
      }
      edit_gomb_has_eventlistener = true
      }

      let sor_edit_gomb = document.getElementsByClassName("sor_edit_gomb")
      for(let i = 0; i < sor_edit_gomb.length; i++) {
         sor_edit_gomb[i].addEventListener("click", function() {
            console.log(`${i+1} Edit Clicked`)

            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)

            let típus = lista.children[i].children[1].innerText
            let ár = lista.children[i].children[2].innerText
            let kedvezményes_ár = lista.children[i].children[3].innerText
            let gyártó = lista.children[i].children[4].innerText

            lista.children[i].children[1].innerHTML = `<td><input value="${típus}" style="width: 130px"></input></td>`
            lista.children[i].children[2].innerHTML = `<td><input value="${ár}" style="width: 150px"></input></td>`
            lista.children[i].children[3].innerHTML = `<td><input value="${kedvezményes_ár}"  style="width: 100px"></input></td>`
            lista.children[i].children[4].innerHTML = `<td><input value="${gyártó}"  style="width: 100px"></input></td>`
            

         })
      }
      
      let sor_delete_gomb = document.getElementsByClassName("sor_delete_gomb")
      beton_adatok = []
      beton_adatok_DELETE_VÉGLEGES = []
      for (let i = 0; i < sor_delete_gomb.length; i++) {
         sor_delete_gomb[i].addEventListener("click", function() {
            console.log(lista.children[i].children[0].innerText)
            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)
            //let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            //console.log(scrollTop)
            //document.getElementById("beton_delete_popup").style.top = `250%`
            //document.getElementsByTagName("body").style.backgroundColor = "rgba(255, 255, 255)"
            document.getElementById("ide_kell_az_beton_delete_tábla").innerHTML = `
            <table style="margin-bottom: 40px">
              <thead>
                <tr>
                  <th>Id</th>
                  <th style="padding-left: 80px;">Típus</th>
                  <th style="padding-left: 80px;">Ár</th>
                  <th style="padding-left: 80px;">Kedvezményes Ár</th>
                  <th style="padding-left: 80px;">Gyártó</th>
                </tr>
              </thead>
              <tbody id="popup-táblázat">
               <td>${lista.children[i].children[0].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[1].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[2].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[3].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[4].innerText}</td>
              </tbody>
            </table>`
            document.getElementById("beton_delete_popup").style.visibility = 'visible'
            document.getElementById("popup_háttér").style.visibility = 'visible'
            document.body.style.overflow = "hidden";

            
         })
      }

      document.getElementById("beton_popup_nem").addEventListener("click", function() {
         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";
      })

      document.getElementById("beton_popup_igen").addEventListener("click", function() {
         // console.log(document.getElementById("popup-táblázat").children[0].children[0].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[1].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[2].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[3].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[4].innerText)

         let id = document.getElementById("popup-táblázat").children[0].children[0].innerText
         let típus = document.getElementById("popup-táblázat").children[0].children[1].innerText
         let ár = document.getElementById("popup-táblázat").children[0].children[2].innerText
         let kedvezményes_ár = document.getElementById("popup-táblázat").children[0].children[3].innerText
         let gyártó = document.getElementById("popup-táblázat").children[0].children[4].innerText

         beton_adatok = [id, típus, ár, kedvezményes_ár, gyártó]
         beton_adatok_DELETE_VÉGLEGES.push(beton_adatok)
         beton_adatok = []
         console.log(JSON.stringify(beton_adatok_DELETE_VÉGLEGES)) 

         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";

         for (let i = 0; i < lista.children.length; i++) {
            if (lista.children[i].children[0].innerText == id && lista.children[i].children[1].innerText == típus && lista.children[i].children[2].innerText == ár && lista.children[i].children[3].innerText == kedvezményes_ár) {
               //console.log(lista.children[i])

               //lista.children[i].remove()
               lista.children[i].style.visibility = "hidden"
            }

         // console.log(lista.children[i].children[0].innerText)
         // console.log(lista.children[i].children[1].innerText)
         // console.log(lista.children[i].children[2].innerText)
         // console.log(lista.children[i].children[3].innerText)
         // console.log(lista.children[i].children[4].innerText)
         }

      })

   })
   
   
}

async function get_teherautok() {
   var url = "https://apa-alkalmazas.herokuapp.com/get-teherautok";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
     console.log(xhr.status);
     console.log(xhr.responseText);
     data = JSON.parse(xhr.responseText)
     data = data.sort((idA, idB) => idA.id - idB.id,)
     //const lista = document.getElementById('teherautok-lista-get')
     
     let html_string
     for (const i in data) {
       html_string += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].típus}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].rendszám}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].óradíj}</td>
     </tr>`
     }

     const lista = document.getElementById('teherautok-lista-get')
      console.log(html_string.slice(0, 9))
      if (html_string.slice(0, 9) == "undefined"){
      lista.innerHTML = html_string.slice(9, -1)
      } else {
         lista.innerHTML = html_string
      }
      document.getElementsByClassName("loader")[0].style.display = "None"
      setTimeout(function(){
        window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
      },1000)
  }};
  
setTimeout(function(){
  xhr.send();
},1000)



}
async function post_teherautok() {
   has_eventlistener = false
   edit_gomb_has_eventlistener = false

   document.getElementById("teherautok-plus-gomb").addEventListener("click", function() {
      //console.log("hello")
      const lista = document.getElementById('teherautok-lista-get')
      const van_elso_sor = document.getElementById("teherautok_cég_add_1")
      if (van_elso_sor == null) {
         lista.innerHTML += `<tr>
         <td></td>
         <td style="padding-left: 80px"><input id="teherautok_típus_add_1" style="width: 160px"></input></td>
         <td style="padding-left: 80px"><input id="teherautok_rendszám_add_1" style="width: 150px"></input></td>
         <td style="padding-left: 80px"><input id="teherautok_cég_add_1" style="width: 80px"></input></td>
         <td style="padding-left: 80px"><input id="teherautok_ár_add_1" style="width: 80px"></input></td>
         <td style="padding-left: 80px"><input id="teherautok_óradíj_add_1" style="width: 80px"></input></td>
         </tr>`
         const mentés_gomb_wrapper = document.getElementById("teherautok-lista-wrapper")
         const mentés_gomb = document.getElementById("mentés_gomb")
         if (mentés_gomb == null) {
            mentés_gomb_wrapper.innerHTML += `<div id="" style="display: flex; flex-direction: column-reverse; align-items: center; padding-top: 100px; padding-bottom: 0px;">
            <button id="mentés_gomb" class="mentés_gomb" style="width: 200px;">Adatok Mentése</button>
            </div>`
         }
      } else {
         has_eventlistener = true
         lista.appendChild(document.getElementById("teherautok-lista-get").lastChild.cloneNode(true))

         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         
         document.getElementById("teherautok-lista-get").lastChild.children[1].children[0].id = `teherautok_típus_add_${len}`
         document.getElementById("teherautok-lista-get").lastChild.children[2].children[0].id = `teherautok_rendszám_add_${len}`
         document.getElementById("teherautok-lista-get").lastChild.children[3].children[0].id = `teherautok_cég_add_${len}`
         document.getElementById("teherautok-lista-get").lastChild.children[4].children[0].id = `teherautok_ár_add_${len}`
         document.getElementById("teherautok-lista-get").lastChild.children[5].children[0].id = `teherautok_óradíj_add_${len}`

         //console.log(document.getElementById("emberek-lista-get").lastChild.children[0].children[0].id)
         //console.log(document.getElementById("emberek-lista-get").lastChild.children[1].children[0])
         //console.log(document.getElementById("emberek-lista-get").lastChild.children[2].children[0])
         
      }
    window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
    //console.log(document.getElementById("mentés_gomb"))


    //------------------------------------MENTÉS GOMB----------------------------------------------------------
    if (has_eventlistener == false) {
      document.getElementById("mentés_gomb").addEventListener("click", function() {
         const lista = document.getElementById('teherautok-lista-get')
         has_eventlistener = true
         
         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         //--------------------------adatok tényleges posztolása--------------------------
         VEGLEGES_ADATOK = []
         for (let i = 1; i <= len; i++) {
            console.log(i)
            let típus = document.getElementById(`teherautok_típus_add_${i}`).value
            let rendszám = document.getElementById(`teherautok_rendszám_add_${i}`).value
            let cég = document.getElementById(`teherautok_cég_add_${i}`).value
            let ár = document.getElementById(`teherautok_ár_add_${i}`).value
            let óradíj = document.getElementById(`teherautok_óradíj_add_${i}`).value
            

            teherautok = [típus, rendszám, cég, ár, óradíj]
            VEGLEGES_ADATOK.push(teherautok)
            //console.log(teherautok)

            document.getElementById(`teherautok_típus_add_${i}`).remove()
            document.getElementById(`teherautok_rendszám_add_${i}`).remove()
            document.getElementById(`teherautok_cég_add_${i}`).remove()
            document.getElementById(`teherautok_ár_add_${i}`).remove()
            document.getElementById(`teherautok_óradíj_add_${i}`).remove()
         }
         document.getElementById("teherautok-lista-wrapper").children[1].innerHTML = `<div class="loader"></div>`
         console.log(JSON.stringify(VEGLEGES_ADATOK))

         var url = "https://apa-alkalmazas.herokuapp.com/post-teherautok";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);

               console.log(xhr.status)
               if(xhr.status == 200) {
               document.getElementById("teherautok-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Adatok mentve!</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               } else {
               document.getElementById("teherautok-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Hiba történt! :(</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               }

               setTimeout(function(){
                  window.location.reload()
                  //document.getElementById("teherautok-lista-get").innerHTML = ""
                  //document.getElementById("mentés_gomb").remove()
                  },5000)
            }};

         var data = JSON.stringify(VEGLEGES_ADATOK);

         xhr.send(data);
      })

   }

   })

   //-------------------------------mentett adatok szerkesztése-------------------------
   document.getElementById("teherautok-edit-gomb").addEventListener("click", function() {
      //console.log("hello")

      document.getElementById("teherautok-plus-gomb").style.visibility = "hidden";
      
      console.log(document.getElementsByTagName("body"))
            document.getElementsByTagName("body")[0].innerHTML += `<div id="beállítások_módosítása_zöld_pipa_gomb" class="plus-gomb" style="position: fixed; top: 360px; left: 90%;">
            <i style="font-size: 20px; color: cornsilk; margin-left: 0px; margin-top: 2px" class="fas fa-check"></i>
          </div>`
      document.getElementById("beállítások_módosítása_zöld_pipa_gomb").addEventListener("click", function() {
         //console.log("hello")

         teherautok_adatok = []
         teherautok_adatok_UPDATE_VÉGLEGES = []
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[1].innerHTML.slice(0, 6))
            if (lista.children[i].children[1].innerHTML.slice(0, 6) == '<input') {
               console.log(lista.children[i].children[0].innerText)
               console.log(lista.children[i].children[1].children[0].value)
               console.log(lista.children[i].children[2].children[0].value)
               console.log(lista.children[i].children[3].children[0].value)
               console.log(lista.children[i].children[4].children[0].value)
               console.log(lista.children[i].children[5].children[0].value)
               //console.log("hello")

               let id= lista.children[i].children[0].innerText
               let típus = lista.children[i].children[1].children[0].value
               let rendszám = lista.children[i].children[2].children[0].value
               let cég = lista.children[i].children[3].children[0].value
               let ár = lista.children[i].children[4].children[0].value
               let óradíj = lista.children[i].children[5].children[0].value
               teherautok_adatok.push(id, típus, rendszám, cég, ár, óradíj)
               teherautok_adatok_UPDATE_VÉGLEGES.push(teherautok_adatok)
               teherautok_adatok = []
            }
         }
         console.log(JSON.stringify(teherautok_adatok_UPDATE_VÉGLEGES))
         document.getElementById("teherautok-lista-get").innerHTML = `<div class="loader" style="position: absolute; left: 45%; top: 150%"></div>`

         //------------------adatok frissítése hívás-------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-teherautok";

         var xhr = new XMLHttpRequest();
         xhr.open("PUT", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(teherautok_adatok_UPDATE_VÉGLEGES);

         xhr.send(data);


         //------------------adatok törlése hívás------------------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-teherautok";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(teherautok_adatok_DELETE_VÉGLEGES);

         xhr.send(data);

         setTimeout(function(){
            window.location.reload()
         }, 5000)
      })

      const lista = document.getElementById('teherautok-lista-get')
      if(edit_gomb_has_eventlistener == false) {
      for (const i in lista.children) {
      //   lista.innerHTML += `<tr style="border-bottom: 2px solid;
      //   border-color: aliceblue;">
      //   <td style="padding-top: 13px">${data[i].id}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
      // </tr>`
         //console.log(lista.children)
         lista.children[i].innerHTML += `<td style="padding-top: 15px;">
            <div class="sor_edit_gomb" style="background-color: green; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; padding-left: 2px; padding-bottom: 2px; margin-right: 20px; cursor: pointer"><i style="font-size: 18px" class="far fa-edit"></i></div>
            </td>
            <td style="padding-top: 15px;">
            <div class="sor_delete_gomb" style="background-color: red; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; cursor: pointer"><i style="font-size: 18px" class="far fa-trash-alt"></i></div>
            </td>`
      }
      edit_gomb_has_eventlistener = true
      }

      let sor_edit_gomb = document.getElementsByClassName("sor_edit_gomb")
      for(let i = 0; i < sor_edit_gomb.length; i++) {
         sor_edit_gomb[i].addEventListener("click", function() {
            console.log(`${i+1} Edit Clicked`)

            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)
            console.log(lista.children[i].children[5].innerText)

            let típus = lista.children[i].children[1].innerText
            let rendszám = lista.children[i].children[2].innerText
            let cég = lista.children[i].children[3].innerText
            let ár = lista.children[i].children[4].innerText
            let óradíj = lista.children[i].children[5].innerText

            lista.children[i].children[1].innerHTML = `<td><input value="${típus}" style="width: 130px"></input></td>`
            lista.children[i].children[2].innerHTML = `<td><input value="${rendszám}" style="width: 150px"></input></td>`
            lista.children[i].children[3].innerHTML = `<td><input value="${cég}"  style="width: 100px"></input></td>`
            lista.children[i].children[4].innerHTML = `<td><input value="${ár}"  style="width: 100px"></input></td>`
            lista.children[i].children[5].innerHTML = `<td><input value="${óradíj}"  style="width: 100px"></input></td>`
            

         })
      }
      
      let sor_delete_gomb = document.getElementsByClassName("sor_delete_gomb")
      teherautok_adatok = []
      teherautok_adatok_DELETE_VÉGLEGES = []
      for (let i = 0; i < sor_delete_gomb.length; i++) {
         sor_delete_gomb[i].addEventListener("click", function() {
            console.log(lista.children[i].children[0].innerText)
            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)
            console.log(lista.children[i].children[5].innerText)
            //let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            //console.log(scrollTop)
            //document.getElementById("teherautok_delete_popup").style.top = `250%`
            //document.getElementsByTagName("body").style.backgroundColor = "rgba(255, 255, 255)"
            document.getElementById("ide_kell_az_teherautok_delete_tábla").innerHTML = `
            <table style="margin-bottom: 40px">
              <thead>
                <tr>
                  <th>Id</th>
                  <th style="padding-left: 80px;">Típus</th>
                  <th style="padding-left: 80px;">Rendszám</th>
                  <th style="padding-left: 80px;">Cég</th>
                  <th style="padding-left: 80px;">Ár</th>
                  <th style="padding-left: 80px;">Óradíj</th>
                </tr>
              </thead>
              <tbody id="popup-táblázat">
               <td>${lista.children[i].children[0].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[1].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[2].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[3].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[4].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[5].innerText}</td>
              </tbody>
            </table>`
            document.getElementById("teherautok_delete_popup").style.visibility = 'visible'
            document.getElementById("popup_háttér").style.visibility = 'visible'
            document.body.style.overflow = "hidden";

            
         })
      }

      document.getElementById("teherautok_popup_nem").addEventListener("click", function() {
         document.getElementById("teherautok_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";
      })

      document.getElementById("teherautok_popup_igen").addEventListener("click", function() {
         // console.log(document.getElementById("popup-táblázat").children[0].children[0].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[1].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[2].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[3].innerText)

         let id = document.getElementById("popup-táblázat").children[0].children[0].innerText
         let típus = document.getElementById("popup-táblázat").children[0].children[1].innerText
         let rendszám = document.getElementById("popup-táblázat").children[0].children[2].innerText
         let cég = document.getElementById("popup-táblázat").children[0].children[3].innerText
         let ár = document.getElementById("popup-táblázat").children[0].children[4].innerText
         let óradíj = document.getElementById("popup-táblázat").children[0].children[5].innerText

         teherautok_adatok = [id, típus, rendszám, cég, ár, óradíj]
         teherautok_adatok_DELETE_VÉGLEGES.push(teherautok_adatok)
         teherautok_adatok = []
         console.log(JSON.stringify(teherautok_adatok_DELETE_VÉGLEGES)) 

         document.getElementById("teherautok_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";

         for (let i = 0; i < lista.children.length; i++) {
            if (lista.children[i].children[0].innerText == id && lista.children[i].children[1].innerText == típus && lista.children[i].children[2].innerText == rendszám && lista.children[i].children[3].innerText == cég) {
               //console.log(lista.children[i])

               //lista.children[i].remove()
               lista.children[i].style.visibility = "hidden"
            }

         // console.log(lista.children[i].children[0].innerText)
         // console.log(lista.children[i].children[1].innerText)
         // console.log(lista.children[i].children[2].innerText)
         // console.log(lista.children[i].children[3].innerText)
         }

      })

   })
   
   
}

async function get_szorodo() {
   var url = "https://apa-alkalmazas.herokuapp.com/get-szorodo";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
     console.log(xhr.status);
     console.log(xhr.responseText);
     data = JSON.parse(xhr.responseText)
     data = data.sort((idA, idB) => idA.id - idB.id,)
     
     let html_string
     for (const i in data) {
       html_string += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].típus}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].kedvezményes_ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].gyártó}</td>
     </tr>`
     }

     const lista = document.getElementById('beton-lista-get')
      console.log(html_string.slice(0, 9))
      if (html_string.slice(0, 9) == "undefined"){
      lista.innerHTML = html_string.slice(9, -1)
      } else {
         lista.innerHTML = html_string
      }
      document.getElementsByClassName("loader")[0].style.display = "None"
      setTimeout(function(){
        window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
      },1000)
  }};
  
setTimeout(function(){
  xhr.send();
},1000)



}
async function post_szorodo() {
   has_eventlistener = false
   edit_gomb_has_eventlistener = false

   document.getElementById("beton-plus-gomb").addEventListener("click", function() {
      //console.log("hello")
      const lista = document.getElementById('beton-lista-get')
      const van_elso_sor = document.getElementById("beton_típus_add_1")
      if (van_elso_sor == null) {
         lista.innerHTML += `<tr>
         <td></td>
         <td style="padding-left: 80px"><input id="beton_típus_add_1" style="width: 160px"></input></td>
         <td style="padding-left: 80px"><input id="beton_ár_add_1" style="width: 150px"></input></td>
         <td style="padding-left: 80px"><input id="beton_kedvezményes_ár_add_1" style="width: 80px"></input></td>
         <td style="padding-left: 80px"><input id="beton_gyártó_add_1" style="width: 80px"></input></td>
         </tr>`
         const mentés_gomb_wrapper = document.getElementById("beton-lista-wrapper")
         const mentés_gomb = document.getElementById("mentés_gomb")
         console.log(mentés_gomb)
         if (mentés_gomb == null) {
            mentés_gomb_wrapper.innerHTML += `<div id="" style="display: flex; flex-direction: column-reverse; align-items: center; padding-top: 100px; padding-bottom: 0px;">
            <button id="mentés_gomb" class="mentés_gomb" style="width: 200px;">Adatok Mentése</button>
            </div>`
         }
      } else {
         has_eventlistener = true
         lista.appendChild(document.getElementById("beton-lista-get").lastChild.cloneNode(true))

         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         
         document.getElementById("beton-lista-get").lastChild.children[1].children[0].id = `beton_típus_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[2].children[0].id = `beton_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[3].children[0].id = `beton_kedvezményes_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[4].children[0].id = `beton_gyártó_add_${len}`

         //console.log(document.getElementById("beton-lista-get").lastChild.children[0].children[0].id)
         //console.log(document.getElementById("beton-lista-get").lastChild.children[1].children[0])
         //console.log(document.getElementById("beton-lista-get").lastChild.children[2].children[0])
         
      }
    window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
    //console.log(document.getElementById("mentés_gomb"))


    //------------------------------------MENTÉS GOMB----------------------------------------------------------
    if (has_eventlistener == false) {
      document.getElementById("mentés_gomb").addEventListener("click", function() {
         const lista = document.getElementById('beton-lista-get')
         has_eventlistener = true
         
         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         //--------------------------adatok tényleges posztolása--------------------------
         VEGLEGES_ADATOK = []
         for (let i = 1; i <= len; i++) {
            console.log(i)
            let típus = document.getElementById(`beton_típus_add_${i}`).value
            let ár = document.getElementById(`beton_ár_add_${i}`).value
            let kedvezményes_ár = document.getElementById(`beton_kedvezményes_ár_add_${i}`).value
            let gyártó = document.getElementById(`beton_gyártó_add_${i}`).value

            beton = [típus, ár, kedvezményes_ár, gyártó]
            VEGLEGES_ADATOK.push(beton)
            //console.log(beton)

            document.getElementById(`beton_típus_add_${i}`).remove()
            document.getElementById(`beton_ár_add_${i}`).remove()
            document.getElementById(`beton_kedvezményes_ár_add_${i}`).remove()
            document.getElementById(`beton_gyártó_add_${i}`).remove()
         }
         document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<div class="loader"></div>`
         console.log(JSON.stringify(VEGLEGES_ADATOK))

         var url = "https://apa-alkalmazas.herokuapp.com/post-szorodo";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);

               console.log(xhr.status)
               if(xhr.status == 200) {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Adatok mentve!</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               } else {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Hiba történt! :(</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               }

               setTimeout(function(){
                  window.location.reload()
                  //document.getElementById("beton-lista-get").innerHTML = ""
                  //document.getElementById("mentés_gomb").remove()
                  },5000)
            }};

         var data = JSON.stringify(VEGLEGES_ADATOK);

         xhr.send(data);
      })

   }

   })

   //-------------------------------mentett adatok szerkesztése-------------------------
   document.getElementById("beton-edit-gomb").addEventListener("click", function() {
      //console.log("hello")

      document.getElementById("beton-plus-gomb").style.visibility = "hidden";
      
      console.log(document.getElementsByTagName("body"))
            document.getElementsByTagName("body")[0].innerHTML += `<div id="beállítások_módosítása_zöld_pipa_gomb" class="plus-gomb" style="position: fixed; top: 360px; left: 90%;">
            <i style="font-size: 20px; color: cornsilk; margin-left: 0px; margin-top: 2px" class="fas fa-check"></i>
          </div>`
      document.getElementById("beállítások_módosítása_zöld_pipa_gomb").addEventListener("click", function() {
         //console.log("hello")

         beton_adatok = []
         beton_adatok_UPDATE_VÉGLEGES = []
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[1].innerHTML.slice(0, 6))
            if (lista.children[i].children[1].innerHTML.slice(0, 6) == '<input') {
               console.log(lista.children[i].children[0].innerText)
               console.log(lista.children[i].children[1].children[0].value)
               console.log(lista.children[i].children[2].children[0].value)
               console.log(lista.children[i].children[3].children[0].value)
               console.log(lista.children[i].children[4].children[0].value)
               //console.log("hello")

               let id = lista.children[i].children[0].innerText
               let típus = lista.children[i].children[1].children[0].value
               let ár = lista.children[i].children[2].children[0].value
               let kedvezményes_ár = lista.children[i].children[3].children[0].value
               let gyártó = lista.children[i].children[4].children[0].value
               beton_adatok.push(id, típus, ár, kedvezményes_ár, gyártó)
               beton_adatok_UPDATE_VÉGLEGES.push(beton_adatok)
               beton_adatok = []
            }
         }
         console.log(JSON.stringify(beton_adatok_UPDATE_VÉGLEGES))
         document.getElementById("beton-lista-get").innerHTML = `<div class="loader" style="position: absolute; left: 45%; top: 150%"></div>`

         //------------------adatok frissítése hívás-------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-szorodo";

         var xhr = new XMLHttpRequest();
         xhr.open("PUT", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_UPDATE_VÉGLEGES);

         xhr.send(data);


         //------------------adatok törlése hívás------------------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-szorodo";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_DELETE_VÉGLEGES);

         xhr.send(data);

         setTimeout(function(){
            window.location.reload()
         }, 5000)
      })

      const lista = document.getElementById('beton-lista-get')
      if(edit_gomb_has_eventlistener == false) {
      for (const i in lista.children) {
      //   lista.innerHTML += `<tr style="border-bottom: 2px solid;
      //   border-color: aliceblue;">
      //   <td style="padding-top: 13px">${data[i].id}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
      // </tr>`
         //console.log(lista.children)
         lista.children[i].innerHTML += `<td style="padding-top: 15px;">
            <div class="sor_edit_gomb" style="background-color: green; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; padding-left: 2px; padding-bottom: 2px; margin-right: 20px; cursor: pointer"><i style="font-size: 18px" class="far fa-edit"></i></div>
            </td>
            <td style="padding-top: 15px;">
            <div class="sor_delete_gomb" style="background-color: red; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; cursor: pointer"><i style="font-size: 18px" class="far fa-trash-alt"></i></div>
            </td>`
      }
      edit_gomb_has_eventlistener = true
      }

      let sor_edit_gomb = document.getElementsByClassName("sor_edit_gomb")
      for(let i = 0; i < sor_edit_gomb.length; i++) {
         sor_edit_gomb[i].addEventListener("click", function() {
            console.log(`${i+1} Edit Clicked`)

            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)

            let típus = lista.children[i].children[1].innerText
            let ár = lista.children[i].children[2].innerText
            let kedvezményes_ár = lista.children[i].children[3].innerText
            let gyártó = lista.children[i].children[4].innerText

            lista.children[i].children[1].innerHTML = `<td><input value="${típus}" style="width: 130px"></input></td>`
            lista.children[i].children[2].innerHTML = `<td><input value="${ár}" style="width: 150px"></input></td>`
            lista.children[i].children[3].innerHTML = `<td><input value="${kedvezményes_ár}"  style="width: 100px"></input></td>`
            lista.children[i].children[4].innerHTML = `<td><input value="${gyártó}"  style="width: 100px"></input></td>`
            

         })
      }
      
      let sor_delete_gomb = document.getElementsByClassName("sor_delete_gomb")
      beton_adatok = []
      beton_adatok_DELETE_VÉGLEGES = []
      for (let i = 0; i < sor_delete_gomb.length; i++) {
         sor_delete_gomb[i].addEventListener("click", function() {
            console.log(lista.children[i].children[0].innerText)
            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)
            //let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            //console.log(scrollTop)
            //document.getElementById("beton_delete_popup").style.top = `250%`
            //document.getElementsByTagName("body").style.backgroundColor = "rgba(255, 255, 255)"
            document.getElementById("ide_kell_az_beton_delete_tábla").innerHTML = `
            <table style="margin-bottom: 40px">
              <thead>
                <tr>
                  <th>Id</th>
                  <th style="padding-left: 80px;">Típus</th>
                  <th style="padding-left: 80px;">Ár</th>
                  <th style="padding-left: 80px;">Kedvezményes Ár</th>
                  <th style="padding-left: 80px;">Gyártó</th>
                </tr>
              </thead>
              <tbody id="popup-táblázat">
               <td>${lista.children[i].children[0].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[1].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[2].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[3].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[4].innerText}</td>
              </tbody>
            </table>`
            document.getElementById("beton_delete_popup").style.visibility = 'visible'
            document.getElementById("popup_háttér").style.visibility = 'visible'
            document.body.style.overflow = "hidden";

            
         })
      }

      document.getElementById("beton_popup_nem").addEventListener("click", function() {
         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";
      })

      document.getElementById("beton_popup_igen").addEventListener("click", function() {
         // console.log(document.getElementById("popup-táblázat").children[0].children[0].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[1].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[2].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[3].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[4].innerText)

         let id = document.getElementById("popup-táblázat").children[0].children[0].innerText
         let típus = document.getElementById("popup-táblázat").children[0].children[1].innerText
         let ár = document.getElementById("popup-táblázat").children[0].children[2].innerText
         let kedvezményes_ár = document.getElementById("popup-táblázat").children[0].children[3].innerText
         let gyártó = document.getElementById("popup-táblázat").children[0].children[4].innerText

         beton_adatok = [id, típus, ár, kedvezményes_ár, gyártó]
         beton_adatok_DELETE_VÉGLEGES.push(beton_adatok)
         beton_adatok = []
         console.log(JSON.stringify(beton_adatok_DELETE_VÉGLEGES)) 

         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";

         for (let i = 0; i < lista.children.length; i++) {
            if (lista.children[i].children[0].innerText == id && lista.children[i].children[1].innerText == típus && lista.children[i].children[2].innerText == ár && lista.children[i].children[3].innerText == kedvezményes_ár) {
               //console.log(lista.children[i])

               //lista.children[i].remove()
               lista.children[i].style.visibility = "hidden"
            }

         // console.log(lista.children[i].children[0].innerText)
         // console.log(lista.children[i].children[1].innerText)
         // console.log(lista.children[i].children[2].innerText)
         // console.log(lista.children[i].children[3].innerText)
         // console.log(lista.children[i].children[4].innerText)
         }

      })

   })
   
   
}

async function get_terko() {
   var url = "https://apa-alkalmazas.herokuapp.com/get-terko";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
     console.log(xhr.status);
     console.log(xhr.responseText);
     data = JSON.parse(xhr.responseText)
     data = data.sort((idA, idB) => idA.id - idB.id,)
     
     let html_string
     for (const i in data) {
       html_string += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].típus}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].kedvezményes_ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].gyártó}</td>
     </tr>`
     }

     const lista = document.getElementById('beton-lista-get')
      console.log(html_string.slice(0, 9))
      if (html_string.slice(0, 9) == "undefined"){
      lista.innerHTML = html_string.slice(9, -1)
      } else {
         lista.innerHTML = html_string
      }
      document.getElementsByClassName("loader")[0].style.display = "None"
      setTimeout(function(){
        window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
      },1000)
  }};
  
setTimeout(function(){
  xhr.send();
},1000)



}
async function post_terko() {
   has_eventlistener = false
   edit_gomb_has_eventlistener = false

   document.getElementById("beton-plus-gomb").addEventListener("click", function() {
      //console.log("hello")
      const lista = document.getElementById('beton-lista-get')
      const van_elso_sor = document.getElementById("beton_típus_add_1")
      if (van_elso_sor == null) {
         lista.innerHTML += `<tr>
         <td></td>
         <td style="padding-left: 80px"><input id="beton_típus_add_1" style="width: 160px"></input></td>
         <td style="padding-left: 80px"><input id="beton_ár_add_1" style="width: 150px"></input></td>
         <td style="padding-left: 80px"><input id="beton_kedvezményes_ár_add_1" style="width: 80px"></input></td>
         <td style="padding-left: 80px"><input id="beton_gyártó_add_1" style="width: 80px"></input></td>
         </tr>`
         const mentés_gomb_wrapper = document.getElementById("beton-lista-wrapper")
         const mentés_gomb = document.getElementById("mentés_gomb")
         console.log(mentés_gomb)
         if (mentés_gomb == null) {
            mentés_gomb_wrapper.innerHTML += `<div id="" style="display: flex; flex-direction: column-reverse; align-items: center; padding-top: 100px; padding-bottom: 0px;">
            <button id="mentés_gomb" class="mentés_gomb" style="width: 200px;">Adatok Mentése</button>
            </div>`
         }
      } else {
         has_eventlistener = true
         lista.appendChild(document.getElementById("beton-lista-get").lastChild.cloneNode(true))

         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         
         document.getElementById("beton-lista-get").lastChild.children[1].children[0].id = `beton_típus_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[2].children[0].id = `beton_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[3].children[0].id = `beton_kedvezményes_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[4].children[0].id = `beton_gyártó_add_${len}`

         //console.log(document.getElementById("beton-lista-get").lastChild.children[0].children[0].id)
         //console.log(document.getElementById("beton-lista-get").lastChild.children[1].children[0])
         //console.log(document.getElementById("beton-lista-get").lastChild.children[2].children[0])
         
      }
    window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
    //console.log(document.getElementById("mentés_gomb"))


    //------------------------------------MENTÉS GOMB----------------------------------------------------------
    if (has_eventlistener == false) {
      document.getElementById("mentés_gomb").addEventListener("click", function() {
         const lista = document.getElementById('beton-lista-get')
         has_eventlistener = true
         
         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         //--------------------------adatok tényleges posztolása--------------------------
         VEGLEGES_ADATOK = []
         for (let i = 1; i <= len; i++) {
            console.log(i)
            let típus = document.getElementById(`beton_típus_add_${i}`).value
            let ár = document.getElementById(`beton_ár_add_${i}`).value
            let kedvezményes_ár = document.getElementById(`beton_kedvezményes_ár_add_${i}`).value
            let gyártó = document.getElementById(`beton_gyártó_add_${i}`).value

            beton = [típus, ár, kedvezményes_ár, gyártó]
            VEGLEGES_ADATOK.push(beton)
            //console.log(beton)

            document.getElementById(`beton_típus_add_${i}`).remove()
            document.getElementById(`beton_ár_add_${i}`).remove()
            document.getElementById(`beton_kedvezményes_ár_add_${i}`).remove()
            document.getElementById(`beton_gyártó_add_${i}`).remove()
         }
         document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<div class="loader"></div>`
         console.log(JSON.stringify(VEGLEGES_ADATOK))

         var url = "https://apa-alkalmazas.herokuapp.com/post-terko";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);

               console.log(xhr.status)
               if(xhr.status == 200) {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Adatok mentve!</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               } else {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Hiba történt! :(</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               }

               setTimeout(function(){
                  window.location.reload()
                  //document.getElementById("beton-lista-get").innerHTML = ""
                  //document.getElementById("mentés_gomb").remove()
                  },5000)
            }};

         var data = JSON.stringify(VEGLEGES_ADATOK);

         xhr.send(data);
      })

   }

   })

   //-------------------------------mentett adatok szerkesztése-------------------------
   document.getElementById("beton-edit-gomb").addEventListener("click", function() {
      //console.log("hello")

      document.getElementById("beton-plus-gomb").style.visibility = "hidden";
      
      console.log(document.getElementsByTagName("body"))
            document.getElementsByTagName("body")[0].innerHTML += `<div id="beállítások_módosítása_zöld_pipa_gomb" class="plus-gomb" style="position: fixed; top: 360px; left: 90%;">
            <i style="font-size: 20px; color: cornsilk; margin-left: 0px; margin-top: 2px" class="fas fa-check"></i>
          </div>`
      document.getElementById("beállítások_módosítása_zöld_pipa_gomb").addEventListener("click", function() {
         //console.log("hello")

         beton_adatok = []
         beton_adatok_UPDATE_VÉGLEGES = []
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[1].innerHTML.slice(0, 6))
            if (lista.children[i].children[1].innerHTML.slice(0, 6) == '<input') {
               console.log(lista.children[i].children[0].innerText)
               console.log(lista.children[i].children[1].children[0].value)
               console.log(lista.children[i].children[2].children[0].value)
               console.log(lista.children[i].children[3].children[0].value)
               console.log(lista.children[i].children[4].children[0].value)
               //console.log("hello")

               let id = lista.children[i].children[0].innerText
               let típus = lista.children[i].children[1].children[0].value
               let ár = lista.children[i].children[2].children[0].value
               let kedvezményes_ár = lista.children[i].children[3].children[0].value
               let gyártó = lista.children[i].children[4].children[0].value
               beton_adatok.push(id, típus, ár, kedvezményes_ár, gyártó)
               beton_adatok_UPDATE_VÉGLEGES.push(beton_adatok)
               beton_adatok = []
            }
         }
         console.log(JSON.stringify(beton_adatok_UPDATE_VÉGLEGES))
         document.getElementById("beton-lista-get").innerHTML = `<div class="loader" style="position: absolute; left: 45%; top: 150%"></div>`

         //------------------adatok frissítése hívás-------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-terko";

         var xhr = new XMLHttpRequest();
         xhr.open("PUT", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_UPDATE_VÉGLEGES);

         xhr.send(data);


         //------------------adatok törlése hívás------------------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-terko";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_DELETE_VÉGLEGES);

         xhr.send(data);

         setTimeout(function(){
            window.location.reload()
         }, 5000)
      })

      const lista = document.getElementById('beton-lista-get')
      if(edit_gomb_has_eventlistener == false) {
      for (const i in lista.children) {
      //   lista.innerHTML += `<tr style="border-bottom: 2px solid;
      //   border-color: aliceblue;">
      //   <td style="padding-top: 13px">${data[i].id}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
      // </tr>`
         //console.log(lista.children)
         lista.children[i].innerHTML += `<td style="padding-top: 15px;">
            <div class="sor_edit_gomb" style="background-color: green; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; padding-left: 2px; padding-bottom: 2px; margin-right: 20px; cursor: pointer"><i style="font-size: 18px" class="far fa-edit"></i></div>
            </td>
            <td style="padding-top: 15px;">
            <div class="sor_delete_gomb" style="background-color: red; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; cursor: pointer"><i style="font-size: 18px" class="far fa-trash-alt"></i></div>
            </td>`
      }
      edit_gomb_has_eventlistener = true
      }

      let sor_edit_gomb = document.getElementsByClassName("sor_edit_gomb")
      for(let i = 0; i < sor_edit_gomb.length; i++) {
         sor_edit_gomb[i].addEventListener("click", function() {
            console.log(`${i+1} Edit Clicked`)

            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)

            let típus = lista.children[i].children[1].innerText
            let ár = lista.children[i].children[2].innerText
            let kedvezményes_ár = lista.children[i].children[3].innerText
            let gyártó = lista.children[i].children[4].innerText

            lista.children[i].children[1].innerHTML = `<td><input value="${típus}" style="width: 130px"></input></td>`
            lista.children[i].children[2].innerHTML = `<td><input value="${ár}" style="width: 150px"></input></td>`
            lista.children[i].children[3].innerHTML = `<td><input value="${kedvezményes_ár}"  style="width: 100px"></input></td>`
            lista.children[i].children[4].innerHTML = `<td><input value="${gyártó}"  style="width: 100px"></input></td>`
            

         })
      }
      
      let sor_delete_gomb = document.getElementsByClassName("sor_delete_gomb")
      beton_adatok = []
      beton_adatok_DELETE_VÉGLEGES = []
      for (let i = 0; i < sor_delete_gomb.length; i++) {
         sor_delete_gomb[i].addEventListener("click", function() {
            console.log(lista.children[i].children[0].innerText)
            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)
            //let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            //console.log(scrollTop)
            //document.getElementById("beton_delete_popup").style.top = `250%`
            //document.getElementsByTagName("body").style.backgroundColor = "rgba(255, 255, 255)"
            document.getElementById("ide_kell_az_beton_delete_tábla").innerHTML = `
            <table style="margin-bottom: 40px">
              <thead>
                <tr>
                  <th>Id</th>
                  <th style="padding-left: 80px;">Típus</th>
                  <th style="padding-left: 80px;">Ár</th>
                  <th style="padding-left: 80px;">Kedvezményes Ár</th>
                  <th style="padding-left: 80px;">Gyártó</th>
                </tr>
              </thead>
              <tbody id="popup-táblázat">
               <td>${lista.children[i].children[0].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[1].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[2].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[3].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[4].innerText}</td>
              </tbody>
            </table>`
            document.getElementById("beton_delete_popup").style.visibility = 'visible'
            document.getElementById("popup_háttér").style.visibility = 'visible'
            document.body.style.overflow = "hidden";

            
         })
      }

      document.getElementById("beton_popup_nem").addEventListener("click", function() {
         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";
      })

      document.getElementById("beton_popup_igen").addEventListener("click", function() {
         // console.log(document.getElementById("popup-táblázat").children[0].children[0].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[1].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[2].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[3].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[4].innerText)

         let id = document.getElementById("popup-táblázat").children[0].children[0].innerText
         let típus = document.getElementById("popup-táblázat").children[0].children[1].innerText
         let ár = document.getElementById("popup-táblázat").children[0].children[2].innerText
         let kedvezményes_ár = document.getElementById("popup-táblázat").children[0].children[3].innerText
         let gyártó = document.getElementById("popup-táblázat").children[0].children[4].innerText

         beton_adatok = [id, típus, ár, kedvezményes_ár, gyártó]
         beton_adatok_DELETE_VÉGLEGES.push(beton_adatok)
         beton_adatok = []
         console.log(JSON.stringify(beton_adatok_DELETE_VÉGLEGES)) 

         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";

         for (let i = 0; i < lista.children.length; i++) {
            if (lista.children[i].children[0].innerText == id && lista.children[i].children[1].innerText == típus && lista.children[i].children[2].innerText == ár && lista.children[i].children[3].innerText == kedvezményes_ár) {
               //console.log(lista.children[i])

               //lista.children[i].remove()
               lista.children[i].style.visibility = "hidden"
            }

         // console.log(lista.children[i].children[0].innerText)
         // console.log(lista.children[i].children[1].innerText)
         // console.log(lista.children[i].children[2].innerText)
         // console.log(lista.children[i].children[3].innerText)
         // console.log(lista.children[i].children[4].innerText)
         }

      })

   })
   
   
}

async function get_szegely() {
   var url = "https://apa-alkalmazas.herokuapp.com/get-szegely";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
     console.log(xhr.status);
     console.log(xhr.responseText);
     data = JSON.parse(xhr.responseText)
     data = data.sort((idA, idB) => idA.id - idB.id,)
     
     let html_string
     for (const i in data) {
       html_string += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].típus}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].kedvezményes_ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].gyártó}</td>
     </tr>`
     }

     const lista = document.getElementById('beton-lista-get')
      console.log(html_string.slice(0, 9))
      if (html_string.slice(0, 9) == "undefined"){
      lista.innerHTML = html_string.slice(9, -1)
      } else {
         lista.innerHTML = html_string
      }
      document.getElementsByClassName("loader")[0].style.display = "None"
      setTimeout(function(){
        window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
      },1000)
  }};
  
setTimeout(function(){
  xhr.send();
},1000)



}
async function post_szegely() {
   has_eventlistener = false
   edit_gomb_has_eventlistener = false

   document.getElementById("beton-plus-gomb").addEventListener("click", function() {
      //console.log("hello")
      const lista = document.getElementById('beton-lista-get')
      const van_elso_sor = document.getElementById("beton_típus_add_1")
      if (van_elso_sor == null) {
         lista.innerHTML += `<tr>
         <td></td>
         <td style="padding-left: 80px"><input id="beton_típus_add_1" style="width: 160px"></input></td>
         <td style="padding-left: 80px"><input id="beton_ár_add_1" style="width: 150px"></input></td>
         <td style="padding-left: 80px"><input id="beton_kedvezményes_ár_add_1" style="width: 80px"></input></td>
         <td style="padding-left: 80px"><input id="beton_gyártó_add_1" style="width: 80px"></input></td>
         </tr>`
         const mentés_gomb_wrapper = document.getElementById("beton-lista-wrapper")
         const mentés_gomb = document.getElementById("mentés_gomb")
         console.log(mentés_gomb)
         if (mentés_gomb == null) {
            mentés_gomb_wrapper.innerHTML += `<div id="" style="display: flex; flex-direction: column-reverse; align-items: center; padding-top: 100px; padding-bottom: 0px;">
            <button id="mentés_gomb" class="mentés_gomb" style="width: 200px;">Adatok Mentése</button>
            </div>`
         }
      } else {
         has_eventlistener = true
         lista.appendChild(document.getElementById("beton-lista-get").lastChild.cloneNode(true))

         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         
         document.getElementById("beton-lista-get").lastChild.children[1].children[0].id = `beton_típus_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[2].children[0].id = `beton_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[3].children[0].id = `beton_kedvezményes_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[4].children[0].id = `beton_gyártó_add_${len}`

         //console.log(document.getElementById("beton-lista-get").lastChild.children[0].children[0].id)
         //console.log(document.getElementById("beton-lista-get").lastChild.children[1].children[0])
         //console.log(document.getElementById("beton-lista-get").lastChild.children[2].children[0])
         
      }
    window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
    //console.log(document.getElementById("mentés_gomb"))


    //------------------------------------MENTÉS GOMB----------------------------------------------------------
    if (has_eventlistener == false) {
      document.getElementById("mentés_gomb").addEventListener("click", function() {
         const lista = document.getElementById('beton-lista-get')
         has_eventlistener = true
         
         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         //--------------------------adatok tényleges posztolása--------------------------
         VEGLEGES_ADATOK = []
         for (let i = 1; i <= len; i++) {
            console.log(i)
            let típus = document.getElementById(`beton_típus_add_${i}`).value
            let ár = document.getElementById(`beton_ár_add_${i}`).value
            let kedvezményes_ár = document.getElementById(`beton_kedvezményes_ár_add_${i}`).value
            let gyártó = document.getElementById(`beton_gyártó_add_${i}`).value

            beton = [típus, ár, kedvezményes_ár, gyártó]
            VEGLEGES_ADATOK.push(beton)
            //console.log(beton)

            document.getElementById(`beton_típus_add_${i}`).remove()
            document.getElementById(`beton_ár_add_${i}`).remove()
            document.getElementById(`beton_kedvezményes_ár_add_${i}`).remove()
            document.getElementById(`beton_gyártó_add_${i}`).remove()
         }
         document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<div class="loader"></div>`
         console.log(JSON.stringify(VEGLEGES_ADATOK))

         var url = "https://apa-alkalmazas.herokuapp.com/post-szegely";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);

               console.log(xhr.status)
               if(xhr.status == 200) {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Adatok mentve!</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               } else {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Hiba történt! :(</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               }

               setTimeout(function(){
                  window.location.reload()
                  //document.getElementById("beton-lista-get").innerHTML = ""
                  //document.getElementById("mentés_gomb").remove()
                  },5000)
            }};

         var data = JSON.stringify(VEGLEGES_ADATOK);

         xhr.send(data);
      })

   }

   })

   //-------------------------------mentett adatok szerkesztése-------------------------
   document.getElementById("beton-edit-gomb").addEventListener("click", function() {
      //console.log("hello")

      document.getElementById("beton-plus-gomb").style.visibility = "hidden";
      
      console.log(document.getElementsByTagName("body"))
            document.getElementsByTagName("body")[0].innerHTML += `<div id="beállítások_módosítása_zöld_pipa_gomb" class="plus-gomb" style="position: fixed; top: 360px; left: 90%;">
            <i style="font-size: 20px; color: cornsilk; margin-left: 0px; margin-top: 2px" class="fas fa-check"></i>
          </div>`
      document.getElementById("beállítások_módosítása_zöld_pipa_gomb").addEventListener("click", function() {
         //console.log("hello")

         beton_adatok = []
         beton_adatok_UPDATE_VÉGLEGES = []
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[1].innerHTML.slice(0, 6))
            if (lista.children[i].children[1].innerHTML.slice(0, 6) == '<input') {
               console.log(lista.children[i].children[0].innerText)
               console.log(lista.children[i].children[1].children[0].value)
               console.log(lista.children[i].children[2].children[0].value)
               console.log(lista.children[i].children[3].children[0].value)
               console.log(lista.children[i].children[4].children[0].value)
               //console.log("hello")

               let id = lista.children[i].children[0].innerText
               let típus = lista.children[i].children[1].children[0].value
               let ár = lista.children[i].children[2].children[0].value
               let kedvezményes_ár = lista.children[i].children[3].children[0].value
               let gyártó = lista.children[i].children[4].children[0].value
               beton_adatok.push(id, típus, ár, kedvezményes_ár, gyártó)
               beton_adatok_UPDATE_VÉGLEGES.push(beton_adatok)
               beton_adatok = []
            }
         }
         console.log(JSON.stringify(beton_adatok_UPDATE_VÉGLEGES))
         document.getElementById("beton-lista-get").innerHTML = `<div class="loader" style="position: absolute; left: 45%; top: 150%"></div>`

         //------------------adatok frissítése hívás-------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-szegely";

         var xhr = new XMLHttpRequest();
         xhr.open("PUT", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_UPDATE_VÉGLEGES);

         xhr.send(data);


         //------------------adatok törlése hívás------------------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-szegely";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_DELETE_VÉGLEGES);

         xhr.send(data);

         setTimeout(function(){
            window.location.reload()
         }, 5000)
      })

      const lista = document.getElementById('beton-lista-get')
      if(edit_gomb_has_eventlistener == false) {
      for (const i in lista.children) {
      //   lista.innerHTML += `<tr style="border-bottom: 2px solid;
      //   border-color: aliceblue;">
      //   <td style="padding-top: 13px">${data[i].id}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
      // </tr>`
         //console.log(lista.children)
         lista.children[i].innerHTML += `<td style="padding-top: 15px;">
            <div class="sor_edit_gomb" style="background-color: green; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; padding-left: 2px; padding-bottom: 2px; margin-right: 20px; cursor: pointer"><i style="font-size: 18px" class="far fa-edit"></i></div>
            </td>
            <td style="padding-top: 15px;">
            <div class="sor_delete_gomb" style="background-color: red; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; cursor: pointer"><i style="font-size: 18px" class="far fa-trash-alt"></i></div>
            </td>`
      }
      edit_gomb_has_eventlistener = true
      }

      let sor_edit_gomb = document.getElementsByClassName("sor_edit_gomb")
      for(let i = 0; i < sor_edit_gomb.length; i++) {
         sor_edit_gomb[i].addEventListener("click", function() {
            console.log(`${i+1} Edit Clicked`)

            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)

            let típus = lista.children[i].children[1].innerText
            let ár = lista.children[i].children[2].innerText
            let kedvezményes_ár = lista.children[i].children[3].innerText
            let gyártó = lista.children[i].children[4].innerText

            lista.children[i].children[1].innerHTML = `<td><input value="${típus}" style="width: 130px"></input></td>`
            lista.children[i].children[2].innerHTML = `<td><input value="${ár}" style="width: 150px"></input></td>`
            lista.children[i].children[3].innerHTML = `<td><input value="${kedvezményes_ár}"  style="width: 100px"></input></td>`
            lista.children[i].children[4].innerHTML = `<td><input value="${gyártó}"  style="width: 100px"></input></td>`
            

         })
      }
      
      let sor_delete_gomb = document.getElementsByClassName("sor_delete_gomb")
      beton_adatok = []
      beton_adatok_DELETE_VÉGLEGES = []
      for (let i = 0; i < sor_delete_gomb.length; i++) {
         sor_delete_gomb[i].addEventListener("click", function() {
            console.log(lista.children[i].children[0].innerText)
            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)
            //let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            //console.log(scrollTop)
            //document.getElementById("beton_delete_popup").style.top = `250%`
            //document.getElementsByTagName("body").style.backgroundColor = "rgba(255, 255, 255)"
            document.getElementById("ide_kell_az_beton_delete_tábla").innerHTML = `
            <table style="margin-bottom: 40px">
              <thead>
                <tr>
                  <th>Id</th>
                  <th style="padding-left: 80px;">Típus</th>
                  <th style="padding-left: 80px;">Ár</th>
                  <th style="padding-left: 80px;">Kedvezményes Ár</th>
                  <th style="padding-left: 80px;">Gyártó</th>
                </tr>
              </thead>
              <tbody id="popup-táblázat">
               <td>${lista.children[i].children[0].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[1].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[2].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[3].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[4].innerText}</td>
              </tbody>
            </table>`
            document.getElementById("beton_delete_popup").style.visibility = 'visible'
            document.getElementById("popup_háttér").style.visibility = 'visible'
            document.body.style.overflow = "hidden";

            
         })
      }

      document.getElementById("beton_popup_nem").addEventListener("click", function() {
         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";
      })

      document.getElementById("beton_popup_igen").addEventListener("click", function() {
         // console.log(document.getElementById("popup-táblázat").children[0].children[0].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[1].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[2].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[3].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[4].innerText)

         let id = document.getElementById("popup-táblázat").children[0].children[0].innerText
         let típus = document.getElementById("popup-táblázat").children[0].children[1].innerText
         let ár = document.getElementById("popup-táblázat").children[0].children[2].innerText
         let kedvezményes_ár = document.getElementById("popup-táblázat").children[0].children[3].innerText
         let gyártó = document.getElementById("popup-táblázat").children[0].children[4].innerText

         beton_adatok = [id, típus, ár, kedvezményes_ár, gyártó]
         beton_adatok_DELETE_VÉGLEGES.push(beton_adatok)
         beton_adatok = []
         console.log(JSON.stringify(beton_adatok_DELETE_VÉGLEGES)) 

         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";

         for (let i = 0; i < lista.children.length; i++) {
            if (lista.children[i].children[0].innerText == id && lista.children[i].children[1].innerText == típus && lista.children[i].children[2].innerText == ár && lista.children[i].children[3].innerText == kedvezményes_ár) {
               //console.log(lista.children[i])

               //lista.children[i].remove()
               lista.children[i].style.visibility = "hidden"
            }

         // console.log(lista.children[i].children[0].innerText)
         // console.log(lista.children[i].children[1].innerText)
         // console.log(lista.children[i].children[2].innerText)
         // console.log(lista.children[i].children[3].innerText)
         // console.log(lista.children[i].children[4].innerText)
         }

      })

   })
   
   
}

async function get_aszfalt() {
   var url = "https://apa-alkalmazas.herokuapp.com/get-aszfalt";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
     console.log(xhr.status);
     console.log(xhr.responseText);
     data = JSON.parse(xhr.responseText)
     data = data.sort((idA, idB) => idA.id - idB.id,)
     
     let html_string

     for (const i in data) {
       html_string += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].típus}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].kedvezményes_ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].gyártó}</td>
     </tr>`
     }

     const lista = document.getElementById('beton-lista-get')
      console.log(html_string.slice(0, 9))
      if (html_string.slice(0, 9) == "undefined"){
      lista.innerHTML = html_string.slice(9, -1)
      } else {
         lista.innerHTML = html_string
      }
      document.getElementsByClassName("loader")[0].style.display = "None"
      setTimeout(function(){
        window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
      },1000)
  }};
  
setTimeout(function(){
  xhr.send();
},1000)



}
async function post_aszfalt() {
   has_eventlistener = false
   edit_gomb_has_eventlistener = false

   document.getElementById("beton-plus-gomb").addEventListener("click", function() {
      //console.log("hello")
      const lista = document.getElementById('beton-lista-get')
      const van_elso_sor = document.getElementById("beton_típus_add_1")
      if (van_elso_sor == null) {
         lista.innerHTML += `<tr>
         <td></td>
         <td style="padding-left: 80px"><input id="beton_típus_add_1" style="width: 160px"></input></td>
         <td style="padding-left: 80px"><input id="beton_ár_add_1" style="width: 150px"></input></td>
         <td style="padding-left: 80px"><input id="beton_kedvezményes_ár_add_1" style="width: 80px"></input></td>
         <td style="padding-left: 80px"><input id="beton_gyártó_add_1" style="width: 80px"></input></td>
         </tr>`
         const mentés_gomb_wrapper = document.getElementById("beton-lista-wrapper")
         const mentés_gomb = document.getElementById("mentés_gomb")
         console.log(mentés_gomb)
         if (mentés_gomb == null) {
            mentés_gomb_wrapper.innerHTML += `<div id="" style="display: flex; flex-direction: column-reverse; align-items: center; padding-top: 100px; padding-bottom: 0px;">
            <button id="mentés_gomb" class="mentés_gomb" style="width: 200px;">Adatok Mentése</button>
            </div>`
         }
      } else {
         has_eventlistener = true
         lista.appendChild(document.getElementById("beton-lista-get").lastChild.cloneNode(true))

         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         
         document.getElementById("beton-lista-get").lastChild.children[1].children[0].id = `beton_típus_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[2].children[0].id = `beton_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[3].children[0].id = `beton_kedvezményes_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[4].children[0].id = `beton_gyártó_add_${len}`

         //console.log(document.getElementById("beton-lista-get").lastChild.children[0].children[0].id)
         //console.log(document.getElementById("beton-lista-get").lastChild.children[1].children[0])
         //console.log(document.getElementById("beton-lista-get").lastChild.children[2].children[0])
         
      }
    window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
    //console.log(document.getElementById("mentés_gomb"))


    //------------------------------------MENTÉS GOMB----------------------------------------------------------
    if (has_eventlistener == false) {
      document.getElementById("mentés_gomb").addEventListener("click", function() {
         const lista = document.getElementById('beton-lista-get')
         has_eventlistener = true
         
         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         //--------------------------adatok tényleges posztolása--------------------------
         VEGLEGES_ADATOK = []
         for (let i = 1; i <= len; i++) {
            console.log(i)
            let típus = document.getElementById(`beton_típus_add_${i}`).value
            let ár = document.getElementById(`beton_ár_add_${i}`).value
            let kedvezményes_ár = document.getElementById(`beton_kedvezményes_ár_add_${i}`).value
            let gyártó = document.getElementById(`beton_gyártó_add_${i}`).value

            beton = [típus, ár, kedvezményes_ár, gyártó]
            VEGLEGES_ADATOK.push(beton)
            //console.log(beton)

            document.getElementById(`beton_típus_add_${i}`).remove()
            document.getElementById(`beton_ár_add_${i}`).remove()
            document.getElementById(`beton_kedvezményes_ár_add_${i}`).remove()
            document.getElementById(`beton_gyártó_add_${i}`).remove()
         }
         document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<div class="loader"></div>`
         console.log(JSON.stringify(VEGLEGES_ADATOK))

         var url = "https://apa-alkalmazas.herokuapp.com/post-aszfalt";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);

               console.log(xhr.status)
               if(xhr.status == 200) {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Adatok mentve!</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               } else {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Hiba történt! :(</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               }

               setTimeout(function(){
                  window.location.reload()
                  //document.getElementById("beton-lista-get").innerHTML = ""
                  //document.getElementById("mentés_gomb").remove()
                  },5000)
            }};

         var data = JSON.stringify(VEGLEGES_ADATOK);

         xhr.send(data);
      })

   }

   })

   //-------------------------------mentett adatok szerkesztése-------------------------
   document.getElementById("beton-edit-gomb").addEventListener("click", function() {
      //console.log("hello")

      document.getElementById("beton-plus-gomb").style.visibility = "hidden";
      
      console.log(document.getElementsByTagName("body"))
            document.getElementsByTagName("body")[0].innerHTML += `<div id="beállítások_módosítása_zöld_pipa_gomb" class="plus-gomb" style="position: fixed; top: 360px; left: 90%;">
            <i style="font-size: 20px; color: cornsilk; margin-left: 0px; margin-top: 2px" class="fas fa-check"></i>
          </div>`
      document.getElementById("beállítások_módosítása_zöld_pipa_gomb").addEventListener("click", function() {
         //console.log("hello")

         beton_adatok = []
         beton_adatok_UPDATE_VÉGLEGES = []
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[1].innerHTML.slice(0, 6))
            if (lista.children[i].children[1].innerHTML.slice(0, 6) == '<input') {
               console.log(lista.children[i].children[0].innerText)
               console.log(lista.children[i].children[1].children[0].value)
               console.log(lista.children[i].children[2].children[0].value)
               console.log(lista.children[i].children[3].children[0].value)
               console.log(lista.children[i].children[4].children[0].value)
               //console.log("hello")

               let id = lista.children[i].children[0].innerText
               let típus = lista.children[i].children[1].children[0].value
               let ár = lista.children[i].children[2].children[0].value
               let kedvezményes_ár = lista.children[i].children[3].children[0].value
               let gyártó = lista.children[i].children[4].children[0].value
               beton_adatok.push(id, típus, ár, kedvezményes_ár, gyártó)
               beton_adatok_UPDATE_VÉGLEGES.push(beton_adatok)
               beton_adatok = []
            }
         }
         console.log(JSON.stringify(beton_adatok_UPDATE_VÉGLEGES))
         document.getElementById("beton-lista-get").innerHTML = `<div class="loader" style="position: absolute; left: 45%; top: 150%"></div>`

         //------------------adatok frissítése hívás-------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-aszfalt";

         var xhr = new XMLHttpRequest();
         xhr.open("PUT", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_UPDATE_VÉGLEGES);

         xhr.send(data);


         //------------------adatok törlése hívás------------------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-aszfalt";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_DELETE_VÉGLEGES);

         xhr.send(data);

         setTimeout(function(){
            window.location.reload()
         }, 5000)
      })

      const lista = document.getElementById('beton-lista-get')
      if(edit_gomb_has_eventlistener == false) {
      for (const i in lista.children) {
      //   lista.innerHTML += `<tr style="border-bottom: 2px solid;
      //   border-color: aliceblue;">
      //   <td style="padding-top: 13px">${data[i].id}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
      // </tr>`
         //console.log(lista.children)
         lista.children[i].innerHTML += `<td style="padding-top: 15px;">
            <div class="sor_edit_gomb" style="background-color: green; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; padding-left: 2px; padding-bottom: 2px; margin-right: 20px; cursor: pointer"><i style="font-size: 18px" class="far fa-edit"></i></div>
            </td>
            <td style="padding-top: 15px;">
            <div class="sor_delete_gomb" style="background-color: red; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; cursor: pointer"><i style="font-size: 18px" class="far fa-trash-alt"></i></div>
            </td>`
      }
      edit_gomb_has_eventlistener = true
      }

      let sor_edit_gomb = document.getElementsByClassName("sor_edit_gomb")
      for(let i = 0; i < sor_edit_gomb.length; i++) {
         sor_edit_gomb[i].addEventListener("click", function() {
            console.log(`${i+1} Edit Clicked`)

            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)

            let típus = lista.children[i].children[1].innerText
            let ár = lista.children[i].children[2].innerText
            let kedvezményes_ár = lista.children[i].children[3].innerText
            let gyártó = lista.children[i].children[4].innerText

            lista.children[i].children[1].innerHTML = `<td><input value="${típus}" style="width: 130px"></input></td>`
            lista.children[i].children[2].innerHTML = `<td><input value="${ár}" style="width: 150px"></input></td>`
            lista.children[i].children[3].innerHTML = `<td><input value="${kedvezményes_ár}"  style="width: 100px"></input></td>`
            lista.children[i].children[4].innerHTML = `<td><input value="${gyártó}"  style="width: 100px"></input></td>`
            

         })
      }
      
      let sor_delete_gomb = document.getElementsByClassName("sor_delete_gomb")
      beton_adatok = []
      beton_adatok_DELETE_VÉGLEGES = []
      for (let i = 0; i < sor_delete_gomb.length; i++) {
         sor_delete_gomb[i].addEventListener("click", function() {
            console.log(lista.children[i].children[0].innerText)
            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)
            //let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            //console.log(scrollTop)
            //document.getElementById("beton_delete_popup").style.top = `250%`
            //document.getElementsByTagName("body").style.backgroundColor = "rgba(255, 255, 255)"
            document.getElementById("ide_kell_az_beton_delete_tábla").innerHTML = `
            <table style="margin-bottom: 40px">
              <thead>
                <tr>
                  <th>Id</th>
                  <th style="padding-left: 80px;">Típus</th>
                  <th style="padding-left: 80px;">Ár</th>
                  <th style="padding-left: 80px;">Kedvezményes Ár</th>
                  <th style="padding-left: 80px;">Gyártó</th>
                </tr>
              </thead>
              <tbody id="popup-táblázat">
               <td>${lista.children[i].children[0].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[1].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[2].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[3].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[4].innerText}</td>
              </tbody>
            </table>`
            document.getElementById("beton_delete_popup").style.visibility = 'visible'
            document.getElementById("popup_háttér").style.visibility = 'visible'
            document.body.style.overflow = "hidden";

            
         })
      }

      document.getElementById("beton_popup_nem").addEventListener("click", function() {
         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";
      })

      document.getElementById("beton_popup_igen").addEventListener("click", function() {
         // console.log(document.getElementById("popup-táblázat").children[0].children[0].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[1].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[2].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[3].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[4].innerText)

         let id = document.getElementById("popup-táblázat").children[0].children[0].innerText
         let típus = document.getElementById("popup-táblázat").children[0].children[1].innerText
         let ár = document.getElementById("popup-táblázat").children[0].children[2].innerText
         let kedvezményes_ár = document.getElementById("popup-táblázat").children[0].children[3].innerText
         let gyártó = document.getElementById("popup-táblázat").children[0].children[4].innerText

         beton_adatok = [id, típus, ár, kedvezményes_ár, gyártó]
         beton_adatok_DELETE_VÉGLEGES.push(beton_adatok)
         beton_adatok = []
         console.log(JSON.stringify(beton_adatok_DELETE_VÉGLEGES)) 

         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";

         for (let i = 0; i < lista.children.length; i++) {
            if (lista.children[i].children[0].innerText == id && lista.children[i].children[1].innerText == típus && lista.children[i].children[2].innerText == ár && lista.children[i].children[3].innerText == kedvezményes_ár) {
               //console.log(lista.children[i])

               //lista.children[i].remove()
               lista.children[i].style.visibility = "hidden"
            }

         // console.log(lista.children[i].children[0].innerText)
         // console.log(lista.children[i].children[1].innerText)
         // console.log(lista.children[i].children[2].innerText)
         // console.log(lista.children[i].children[3].innerText)
         // console.log(lista.children[i].children[4].innerText)
         }

      })

   })
   
   
}

async function get_kis_szolgaltatok() {
   var url = "https://apa-alkalmazas.herokuapp.com/get-kis-szolgaltatok";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
     console.log(xhr.status);
     console.log(xhr.responseText);
     data = JSON.parse(xhr.responseText)
     data = data.sort((idA, idB) => idA.id - idB.id,)
     
     let html_string

     for (const i in data) {
       html_string += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].óradíj}</td>
     </tr>`
     }

     const lista = document.getElementById('beton-lista-get')
      console.log(html_string.slice(0, 9))
      if (html_string.slice(0, 9) == "undefined"){
      lista.innerHTML = html_string.slice(9, -1)
      } else {
         lista.innerHTML = html_string
      }
      document.getElementsByClassName("loader")[0].style.display = "None"
      setTimeout(function(){
        window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
      },1000)
  }};
  
setTimeout(function(){
  xhr.send();
},1000)



}
async function post_kis_szolgaltatok() {
   has_eventlistener = false
   edit_gomb_has_eventlistener = false

   document.getElementById("beton-plus-gomb").addEventListener("click", function() {
      //console.log("hello")
      const lista = document.getElementById('beton-lista-get')
      const van_elso_sor = document.getElementById("beton_típus_add_1")
      if (van_elso_sor == null) {
         lista.innerHTML += `<tr>
         <td></td>
         <td style="padding-left: 80px"><input id="beton_típus_add_1" style="width: 160px"></input></td>
         <td style="padding-left: 80px"><input id="beton_ár_add_1" style="width: 150px"></input></td>
         <td style="padding-left: 80px"><input id="beton_kedvezményes_ár_add_1" style="width: 80px"></input></td>
         <td style="padding-left: 80px"><input id="beton_gyártó_add_1" style="width: 80px"></input></td>
         </tr>`
         const mentés_gomb_wrapper = document.getElementById("beton-lista-wrapper")
         const mentés_gomb = document.getElementById("mentés_gomb")
         console.log(mentés_gomb)
         if (mentés_gomb == null) {
            mentés_gomb_wrapper.innerHTML += `<div id="" style="display: flex; flex-direction: column-reverse; align-items: center; padding-top: 100px; padding-bottom: 0px;">
            <button id="mentés_gomb" class="mentés_gomb" style="width: 200px;">Adatok Mentése</button>
            </div>`
         }
      } else {
         has_eventlistener = true
         lista.appendChild(document.getElementById("beton-lista-get").lastChild.cloneNode(true))

         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         
         document.getElementById("beton-lista-get").lastChild.children[1].children[0].id = `beton_típus_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[2].children[0].id = `beton_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[3].children[0].id = `beton_kedvezményes_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[4].children[0].id = `beton_gyártó_add_${len}`

         //console.log(document.getElementById("beton-lista-get").lastChild.children[0].children[0].id)
         //console.log(document.getElementById("beton-lista-get").lastChild.children[1].children[0])
         //console.log(document.getElementById("beton-lista-get").lastChild.children[2].children[0])
         
      }
    window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
    //console.log(document.getElementById("mentés_gomb"))


    //------------------------------------MENTÉS GOMB----------------------------------------------------------
    if (has_eventlistener == false) {
      document.getElementById("mentés_gomb").addEventListener("click", function() {
         const lista = document.getElementById('beton-lista-get')
         has_eventlistener = true
         
         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         //--------------------------adatok tényleges posztolása--------------------------
         VEGLEGES_ADATOK = []
         for (let i = 1; i <= len; i++) {
            console.log(i)
            let típus = document.getElementById(`beton_típus_add_${i}`).value
            let ár = document.getElementById(`beton_ár_add_${i}`).value
            let kedvezményes_ár = document.getElementById(`beton_kedvezményes_ár_add_${i}`).value
            let gyártó = document.getElementById(`beton_gyártó_add_${i}`).value

            beton = [típus, ár, kedvezményes_ár, gyártó]
            VEGLEGES_ADATOK.push(beton)
            //console.log(beton)

            document.getElementById(`beton_típus_add_${i}`).remove()
            document.getElementById(`beton_ár_add_${i}`).remove()
            document.getElementById(`beton_kedvezményes_ár_add_${i}`).remove()
            document.getElementById(`beton_gyártó_add_${i}`).remove()
         }
         document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<div class="loader"></div>`
         console.log(JSON.stringify(VEGLEGES_ADATOK))

         var url = "https://apa-alkalmazas.herokuapp.com/post-kis-szolgaltatok";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);

               console.log(xhr.status)
               if(xhr.status == 200) {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Adatok mentve!</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               } else {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Hiba történt! :(</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               }

               setTimeout(function(){
                  window.location.reload()
                  //document.getElementById("beton-lista-get").innerHTML = ""
                  //document.getElementById("mentés_gomb").remove()
                  },5000)
            }};

         var data = JSON.stringify(VEGLEGES_ADATOK);

         xhr.send(data);
      })

   }

   })

   //-------------------------------mentett adatok szerkesztése-------------------------
   document.getElementById("beton-edit-gomb").addEventListener("click", function() {
      //console.log("hello")

      document.getElementById("beton-plus-gomb").style.visibility = "hidden";
      
      console.log(document.getElementsByTagName("body"))
            document.getElementsByTagName("body")[0].innerHTML += `<div id="beállítások_módosítása_zöld_pipa_gomb" class="plus-gomb" style="position: fixed; top: 360px; left: 90%;">
            <i style="font-size: 20px; color: cornsilk; margin-left: 0px; margin-top: 2px" class="fas fa-check"></i>
          </div>`
      document.getElementById("beállítások_módosítása_zöld_pipa_gomb").addEventListener("click", function() {
         //console.log("hello")

         beton_adatok = []
         beton_adatok_UPDATE_VÉGLEGES = []
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[1].innerHTML.slice(0, 6))
            if (lista.children[i].children[1].innerHTML.slice(0, 6) == '<input') {
               console.log(lista.children[i].children[0].innerText)
               console.log(lista.children[i].children[1].children[0].value)
               console.log(lista.children[i].children[2].children[0].value)
               console.log(lista.children[i].children[3].children[0].value)
               console.log(lista.children[i].children[4].children[0].value)
               //console.log("hello")

               let id = lista.children[i].children[0].innerText
               let típus = lista.children[i].children[1].children[0].value
               let ár = lista.children[i].children[2].children[0].value
               let kedvezményes_ár = lista.children[i].children[3].children[0].value
               let gyártó = lista.children[i].children[4].children[0].value
               beton_adatok.push(id, típus, ár, kedvezményes_ár, gyártó)
               beton_adatok_UPDATE_VÉGLEGES.push(beton_adatok)
               beton_adatok = []
            }
         }
         console.log(JSON.stringify(beton_adatok_UPDATE_VÉGLEGES))
         document.getElementById("beton-lista-get").innerHTML = `<div class="loader" style="position: absolute; left: 45%; top: 150%"></div>`

         //------------------adatok frissítése hívás-------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-kis-szolgaltatok";

         var xhr = new XMLHttpRequest();
         xhr.open("PUT", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_UPDATE_VÉGLEGES);

         xhr.send(data);


         //------------------adatok törlése hívás------------------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-kis-szolgaltatok";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_DELETE_VÉGLEGES);

         xhr.send(data);

         setTimeout(function(){
            window.location.reload()
         }, 5000)
      })

      const lista = document.getElementById('beton-lista-get')
      if(edit_gomb_has_eventlistener == false) {
      for (const i in lista.children) {
      //   lista.innerHTML += `<tr style="border-bottom: 2px solid;
      //   border-color: aliceblue;">
      //   <td style="padding-top: 13px">${data[i].id}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
      // </tr>`
         //console.log(lista.children)
         lista.children[i].innerHTML += `<td style="padding-top: 15px;">
            <div class="sor_edit_gomb" style="background-color: green; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; padding-left: 2px; padding-bottom: 2px; margin-right: 20px; cursor: pointer"><i style="font-size: 18px" class="far fa-edit"></i></div>
            </td>
            <td style="padding-top: 15px;">
            <div class="sor_delete_gomb" style="background-color: red; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; cursor: pointer"><i style="font-size: 18px" class="far fa-trash-alt"></i></div>
            </td>`
      }
      edit_gomb_has_eventlistener = true
      }

      let sor_edit_gomb = document.getElementsByClassName("sor_edit_gomb")
      for(let i = 0; i < sor_edit_gomb.length; i++) {
         sor_edit_gomb[i].addEventListener("click", function() {
            console.log(`${i+1} Edit Clicked`)

            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)

            let típus = lista.children[i].children[1].innerText
            let ár = lista.children[i].children[2].innerText
            let kedvezményes_ár = lista.children[i].children[3].innerText
            let gyártó = lista.children[i].children[4].innerText

            lista.children[i].children[1].innerHTML = `<td><input value="${típus}" style="width: 130px"></input></td>`
            lista.children[i].children[2].innerHTML = `<td><input value="${ár}" style="width: 150px"></input></td>`
            lista.children[i].children[3].innerHTML = `<td><input value="${kedvezményes_ár}"  style="width: 100px"></input></td>`
            lista.children[i].children[4].innerHTML = `<td><input value="${gyártó}"  style="width: 100px"></input></td>`
            

         })
      }
      
      let sor_delete_gomb = document.getElementsByClassName("sor_delete_gomb")
      beton_adatok = []
      beton_adatok_DELETE_VÉGLEGES = []
      for (let i = 0; i < sor_delete_gomb.length; i++) {
         sor_delete_gomb[i].addEventListener("click", function() {
            console.log(lista.children[i].children[0].innerText)
            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)
            //let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            //console.log(scrollTop)
            //document.getElementById("beton_delete_popup").style.top = `250%`
            //document.getElementsByTagName("body").style.backgroundColor = "rgba(255, 255, 255)"
            document.getElementById("ide_kell_az_beton_delete_tábla").innerHTML = `
            <table style="margin-bottom: 40px">
              <thead>
                <tr>
                  <th>Id</th>
                  <th style="padding-left: 80px;">Cég</th>
                  <th style="padding-left: 80px;">Tevékenység</th>
                  <th style="padding-left: 80px;">Ár</th>
                  <th style="padding-left: 80px;">Óradíj?</th>
                </tr>
              </thead>
              <tbody id="popup-táblázat">
               <td>${lista.children[i].children[0].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[1].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[2].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[3].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[4].innerText}</td>
              </tbody>
            </table>`
            document.getElementById("beton_delete_popup").style.visibility = 'visible'
            document.getElementById("popup_háttér").style.visibility = 'visible'
            document.body.style.overflow = "hidden";

            
         })
      }

      document.getElementById("beton_popup_nem").addEventListener("click", function() {
         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";
      })

      document.getElementById("beton_popup_igen").addEventListener("click", function() {
         // console.log(document.getElementById("popup-táblázat").children[0].children[0].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[1].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[2].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[3].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[4].innerText)

         let id = document.getElementById("popup-táblázat").children[0].children[0].innerText
         let típus = document.getElementById("popup-táblázat").children[0].children[1].innerText
         let ár = document.getElementById("popup-táblázat").children[0].children[2].innerText
         let kedvezményes_ár = document.getElementById("popup-táblázat").children[0].children[3].innerText
         let gyártó = document.getElementById("popup-táblázat").children[0].children[4].innerText

         beton_adatok = [id, típus, ár, kedvezményes_ár, gyártó]
         beton_adatok_DELETE_VÉGLEGES.push(beton_adatok)
         beton_adatok = []
         console.log(JSON.stringify(beton_adatok_DELETE_VÉGLEGES)) 

         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";

         for (let i = 0; i < lista.children.length; i++) {
            if (lista.children[i].children[0].innerText == id && lista.children[i].children[1].innerText == típus && lista.children[i].children[2].innerText == ár && lista.children[i].children[3].innerText == kedvezményes_ár) {
               //console.log(lista.children[i])

               //lista.children[i].remove()
               lista.children[i].style.visibility = "hidden"
            }

         // console.log(lista.children[i].children[0].innerText)
         // console.log(lista.children[i].children[1].innerText)
         // console.log(lista.children[i].children[2].innerText)
         // console.log(lista.children[i].children[3].innerText)
         // console.log(lista.children[i].children[4].innerText)
         }

      })

   })
   
   
}

async function get_nagy_szolgaltatok() {
   var url = "https://apa-alkalmazas.herokuapp.com/get-nagy-szolgaltatok";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
     console.log(xhr.status);
     console.log(xhr.responseText);
     data = JSON.parse(xhr.responseText)
     data = data.sort((idA, idB) => idA.id - idB.id,)
     
   let html_string

     for (const i in data) {
       html_string += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].szerződéses_ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].mértékegység}</td>
       
     </tr>`
     }

     const lista = document.getElementById('beton-lista-get')
      console.log(html_string.slice(0, 9))
      if (html_string.slice(0, 9) == "undefined"){
      lista.innerHTML = html_string.slice(9, -1)
      } else {
         lista.innerHTML = html_string
      }
      document.getElementsByClassName("loader")[0].style.display = "None"
      setTimeout(function(){
        window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
      },1000)
  }};
  
   setTimeout(function(){
   xhr.send();
   },1000)

}
async function post_nagy_szolgaltatok() {
   has_eventlistener = false
   edit_gomb_has_eventlistener = false

   document.getElementById("beton-plus-gomb").addEventListener("click", function() {
      //console.log("hello")
      const lista = document.getElementById('beton-lista-get')
      const van_elso_sor = document.getElementById("beton_típus_add_1")
      if (van_elso_sor == null) {
         lista.innerHTML += `<tr>
         <td></td>
         <td style="padding-left: 80px"><input id="beton_típus_add_1" style="width: 160px"></input></td>
         <td style="padding-left: 80px"><input id="beton_ár_add_1" style="width: 150px"></input></td>
         <td style="padding-left: 80px"><input id="beton_kedvezményes_ár_add_1" style="width: 80px"></input></td>
         <td style="padding-left: 80px"><input id="beton_mennyiség_add_1" style="width: 80px"></input></td>
         
         </tr>`
         const mentés_gomb_wrapper = document.getElementById("beton-lista-wrapper")
         const mentés_gomb = document.getElementById("mentés_gomb")
         console.log(mentés_gomb)
         if (mentés_gomb == null) {
            mentés_gomb_wrapper.innerHTML += `<div id="" style="display: flex; flex-direction: column-reverse; align-items: center; padding-top: 100px; padding-bottom: 0px;">
            <button id="mentés_gomb" class="mentés_gomb" style="width: 200px;">Adatok Mentése</button>
            </div>`
         }
      } else {
         has_eventlistener = true
         lista.appendChild(document.getElementById("beton-lista-get").lastChild.cloneNode(true))

         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         
         document.getElementById("beton-lista-get").lastChild.children[1].children[0].id = `beton_típus_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[2].children[0].id = `beton_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[3].children[0].id = `beton_kedvezményes_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[3].children[0].id = `beton_mennyiség_add_${len}`
         //document.getElementById("beton-lista-get").lastChild.children[4].children[0].id = `beton_gyártó_add_${len}`

         //console.log(document.getElementById("beton-lista-get").lastChild.children[0].children[0].id)
         //console.log(document.getElementById("beton-lista-get").lastChild.children[1].children[0])
         //console.log(document.getElementById("beton-lista-get").lastChild.children[2].children[0])
         
      }
    window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
    //console.log(document.getElementById("mentés_gomb"))


    //------------------------------------MENTÉS GOMB----------------------------------------------------------
    if (has_eventlistener == false) {
      document.getElementById("mentés_gomb").addEventListener("click", function() {
         const lista = document.getElementById('beton-lista-get')
         has_eventlistener = true
         
         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         //--------------------------adatok tényleges posztolása--------------------------
         VEGLEGES_ADATOK = []
         for (let i = 1; i <= len; i++) {
            console.log(i)
            let típus = document.getElementById(`beton_típus_add_${i}`).value
            let ár = document.getElementById(`beton_ár_add_${i}`).value
            let kedvezményes_ár = document.getElementById(`beton_kedvezményes_ár_add_${i}`).value
            let mennyiség = document.getElementById(`beton_mennyiség_add_${i}`).value
            //let gyártó = document.getElementById(`beton_gyártó_add_${i}`).value

            beton = [típus, ár, kedvezményes_ár, mennyiség]
            VEGLEGES_ADATOK.push(beton)
            //console.log(beton)

            document.getElementById(`beton_típus_add_${i}`).remove()
            document.getElementById(`beton_ár_add_${i}`).remove()
            document.getElementById(`beton_kedvezményes_ár_add_${i}`).remove()
            document.getElementById(`beton_mennyiség_add_${i}`).remove()
            //document.getElementById(`beton_gyártó_add_${i}`).remove()
         }
         document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<div class="loader"></div>`
         console.log(JSON.stringify(VEGLEGES_ADATOK))

         var url = "https://apa-alkalmazas.herokuapp.com/post-nagy-szolgaltatok";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);

               console.log(xhr.status)
               if(xhr.status == 200) {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Adatok mentve!</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               } else {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Hiba történt! :(</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               }

               setTimeout(function(){
                  window.location.reload()
                  //document.getElementById("beton-lista-get").innerHTML = ""
                  //document.getElementById("mentés_gomb").remove()
                  },5000)
            }};

         var data = JSON.stringify(VEGLEGES_ADATOK);

         xhr.send(data);
      })

   }

   })

   //-------------------------------mentett adatok szerkesztése-------------------------
   document.getElementById("beton-edit-gomb").addEventListener("click", function() {
      //console.log("hello")

      document.getElementById("beton-plus-gomb").style.visibility = "hidden";
      
      console.log(document.getElementsByTagName("body"))
            document.getElementsByTagName("body")[0].innerHTML += `<div id="beállítások_módosítása_zöld_pipa_gomb" class="plus-gomb" style="position: fixed; top: 360px; left: 90%;">
            <i style="font-size: 20px; color: cornsilk; margin-left: 0px; margin-top: 2px" class="fas fa-check"></i>
          </div>`
      document.getElementById("beállítások_módosítása_zöld_pipa_gomb").addEventListener("click", function() {
         //console.log("hello")

         beton_adatok = []
         beton_adatok_UPDATE_VÉGLEGES = []
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[1].innerHTML.slice(0, 6))
            if (lista.children[i].children[1].innerHTML.slice(0, 6) == '<input') {
               console.log(lista.children[i].children[0].innerText)
               console.log(lista.children[i].children[1].children[0].value)
               console.log(lista.children[i].children[2].children[0].value)
               console.log(lista.children[i].children[3].children[0].value)
               console.log(lista.children[i].children[4].children[0].value)
               //console.log("hello")

               let id = lista.children[i].children[0].innerText
               let típus = lista.children[i].children[1].children[0].value
               let ár = lista.children[i].children[2].children[0].value
               let kedvezményes_ár = lista.children[i].children[3].children[0].value
               let gyártó = lista.children[i].children[4].children[0].value
               beton_adatok.push(id, típus, ár, kedvezményes_ár, gyártó)
               beton_adatok_UPDATE_VÉGLEGES.push(beton_adatok)
               beton_adatok = []
            }
         }
         console.log(JSON.stringify(beton_adatok_UPDATE_VÉGLEGES))
         document.getElementById("beton-lista-get").innerHTML = `<div class="loader" style="position: absolute; left: 45%; top: 150%"></div>`

         //------------------adatok frissítése hívás-------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-nagy-szolgaltatok";

         var xhr = new XMLHttpRequest();
         xhr.open("PUT", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_UPDATE_VÉGLEGES);

         xhr.send(data);


         //------------------adatok törlése hívás------------------------
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-nagy-szolgaltatok";

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_DELETE_VÉGLEGES);

         xhr.send(data);

         setTimeout(function(){
            window.location.reload()
         }, 5000)
      })

      const lista = document.getElementById('beton-lista-get')
      if(edit_gomb_has_eventlistener == false) {
      for (const i in lista.children) {
      //   lista.innerHTML += `<tr style="border-bottom: 2px solid;
      //   border-color: aliceblue;">
      //   <td style="padding-top: 13px">${data[i].id}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
      // </tr>`
         //console.log(lista.children)
         lista.children[i].innerHTML += `<td style="padding-top: 15px;">
            <div class="sor_edit_gomb" style="background-color: green; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; padding-left: 2px; padding-bottom: 2px; margin-right: 20px; cursor: pointer"><i style="font-size: 18px" class="far fa-edit"></i></div>
            </td>
            <td style="padding-top: 15px;">
            <div class="sor_delete_gomb" style="background-color: red; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; cursor: pointer"><i style="font-size: 18px" class="far fa-trash-alt"></i></div>
            </td>`
      }
      edit_gomb_has_eventlistener = true
      }

      let sor_edit_gomb = document.getElementsByClassName("sor_edit_gomb")
      for(let i = 0; i < sor_edit_gomb.length; i++) {
         sor_edit_gomb[i].addEventListener("click", function() {
            console.log(`${i+1} Edit Clicked`)

            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)

            let típus = lista.children[i].children[1].innerText
            let ár = lista.children[i].children[2].innerText
            let kedvezményes_ár = lista.children[i].children[3].innerText
            let mennyiség = lista.children[i].children[4].innerText
            //let gyártó = lista.children[i].children[4].innerText

            lista.children[i].children[1].innerHTML = `<td><input value="${típus}" style="width: 130px"></input></td>`
            lista.children[i].children[2].innerHTML = `<td><input value="${ár}" style="width: 150px"></input></td>`
            lista.children[i].children[3].innerHTML = `<td><input value="${kedvezményes_ár}"  style="width: 100px"></input></td>`
            lista.children[i].children[4].innerHTML = `<td><input value="${mennyiség}"  style="width: 100px"></input></td>`
            //lista.children[i].children[4].innerHTML = `<td><input value="${gyártó}"  style="width: 100px"></input></td>`
            

         })
      }
      
      let sor_delete_gomb = document.getElementsByClassName("sor_delete_gomb")
      beton_adatok = []
      beton_adatok_DELETE_VÉGLEGES = []
      for (let i = 0; i < sor_delete_gomb.length; i++) {
         sor_delete_gomb[i].addEventListener("click", function() {
            console.log(lista.children[i].children[0].innerText)
            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)
            //let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            //console.log(scrollTop)
            //document.getElementById("beton_delete_popup").style.top = `250%`
            //document.getElementsByTagName("body").style.backgroundColor = "rgba(255, 255, 255)"
            document.getElementById("ide_kell_az_beton_delete_tábla").innerHTML = `
            <table style="margin-bottom: 40px">
              <thead>
                <tr>
                  <th>Id</th>
                  <th style="padding-left: 80px;">Cég</th>
                  <th style="padding-left: 80px;">Tevékenység</th>
                  <th style="padding-left: 80px;">Szerződéses Ár</th>
                  <th style="padding-left: 80px;">Mennyiség</th>
                  
                </tr>
              </thead>
              <tbody id="popup-táblázat">
               <td>${lista.children[i].children[0].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[1].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[2].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[3].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[4].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[5].innerText}</td>
              </tbody>
            </table>`
            document.getElementById("beton_delete_popup").style.visibility = 'visible'
            document.getElementById("popup_háttér").style.visibility = 'visible'
            document.body.style.overflow = "hidden";

            
         })
      }

      document.getElementById("beton_popup_nem").addEventListener("click", function() {
         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";
      })

      document.getElementById("beton_popup_igen").addEventListener("click", function() {
         // console.log(document.getElementById("popup-táblázat").children[0].children[0].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[1].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[2].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[3].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[4].innerText)

         let id = document.getElementById("popup-táblázat").children[0].children[0].innerText
         let típus = document.getElementById("popup-táblázat").children[0].children[1].innerText
         let ár = document.getElementById("popup-táblázat").children[0].children[2].innerText
         let kedvezményes_ár = document.getElementById("popup-táblázat").children[0].children[3].innerText
         let gyártó = document.getElementById("popup-táblázat").children[0].children[4].innerText

         beton_adatok = [id, típus, ár, kedvezményes_ár, gyártó]
         beton_adatok_DELETE_VÉGLEGES.push(beton_adatok)
         beton_adatok = []
         console.log(JSON.stringify(beton_adatok_DELETE_VÉGLEGES)) 

         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";

         for (let i = 0; i < lista.children.length; i++) {
            if (lista.children[i].children[0].innerText == id && lista.children[i].children[1].innerText == típus && lista.children[i].children[2].innerText == ár && lista.children[i].children[3].innerText == kedvezményes_ár) {
               //console.log(lista.children[i])

               //lista.children[i].remove()
               lista.children[i].style.visibility = "hidden"
            }

         // console.log(lista.children[i].children[0].innerText)
         // console.log(lista.children[i].children[1].innerText)
         // console.log(lista.children[i].children[2].innerText)
         // console.log(lista.children[i].children[3].innerText)
         // console.log(lista.children[i].children[4].innerText)
         }

      })

   })
   
   
}

async function get_kandelaber() {
   beton_séma_get(endpoint_neve='kandelaber')
}
async function post_kandelaber() {
   beton_séma_post(endpoint_neve='kandelaber')
}

async function get_utcabutor() {
   beton_séma_get(endpoint_neve='utcabutor')
}
async function post_utcabutor() {
   beton_séma_post(endpoint_neve='utcabutor')
}

async function get_beton_akna() {
   beton_séma_get(endpoint_neve='beton_akna')
}
async function post_beton_akna() {
   beton_séma_post(endpoint_neve='beton_akna')
}

async function get_csatorna_cso() {
   beton_séma_get(endpoint_neve='csatorna_cso')
}
async function post_csatorna_cso() {
   beton_séma_post(endpoint_neve='csatorna_cso')
}

async function get_nyomo_cso() {
   beton_séma_get(endpoint_neve='nyomo_cso')
}
async function post_nyomo_cso() {
   beton_séma_post(endpoint_neve='nyomo_cso')
}

async function get_kerteszet() {
   beton_séma_get(endpoint_neve='kerteszet')
}
async function post_kerteszet() {
   beton_séma_post(endpoint_neve='kerteszet')
}

async function get_termeszetes_ko() {
   beton_séma_get(endpoint_neve='termeszetes_ko')
}
async function post_termeszetes_ko() {
   beton_séma_post(endpoint_neve='termeszetes_ko')
}



async function beton_séma_get(endpoint_neve) {
   console.log('séma futott')
   var url = `https://apa-alkalmazas.herokuapp.com/get-${endpoint_neve}`;
   
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url);
   
   xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

   
   xhr.onreadystatechange = function () {
     if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
        data = JSON.parse(xhr.responseText)
        data = data.sort((idA, idB) => idA.id - idB.id,)

        let html_string
        
        for (const i in data) {
           html_string += `<tr style="border-bottom: 2px solid;
           border-color: aliceblue;">
           <td style="padding-top: 13px">${data[i].id}</td>
           <td style="padding-left: 80px; padding-top: 13px">${data[i].típus}</td>
          <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
          <td style="padding-left: 80px; padding-top: 13px">${data[i].kedvezményes_ár}</td>
          <td style="padding-left: 80px; padding-top: 13px">${data[i].gyártó}</td>
          </tr>`
        }

        const lista = document.getElementById('beton-lista-get')
        console.log(html_string.slice(0, 9))
        if (html_string.slice(0, 9) == "undefined"){
         lista.innerHTML = html_string.slice(9, -1)
        } else {
           lista.innerHTML = html_string
        }
        document.getElementsByClassName("loader")[0].style.display = "None"
        setTimeout(function(){
         window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
         },1000)
      }};
     
   setTimeout(function(){
     xhr.send();
   },1000)
   
}
async function beton_séma_post(endpoint_neve) {
   has_eventlistener = false
   edit_gomb_has_eventlistener = false

   document.getElementById("beton-plus-gomb").addEventListener("click", function() {
      //console.log("hello")
      const lista = document.getElementById('beton-lista-get')
      const van_elso_sor = document.getElementById("beton_típus_add_1")
      if (van_elso_sor == null) {
         lista.innerHTML += `<tr>
         <td></td>
         <td style="padding-left: 80px"><input id="beton_típus_add_1" style="width: 160px"></input></td>
         <td style="padding-left: 80px"><input id="beton_ár_add_1" style="width: 150px"></input></td>
         <td style="padding-left: 80px"><input id="beton_kedvezményes_ár_add_1" style="width: 80px"></input></td>
         <td style="padding-left: 80px"><input id="beton_gyártó_add_1" style="width: 80px"></input></td>
         </tr>`
         const mentés_gomb_wrapper = document.getElementById("beton-lista-wrapper")
         const mentés_gomb = document.getElementById("mentés_gomb")
         console.log(mentés_gomb)
         if (mentés_gomb == null) {
            mentés_gomb_wrapper.innerHTML += `<div id="" style="display: flex; flex-direction: column-reverse; align-items: center; padding-top: 100px; padding-bottom: 0px;">
            <button id="mentés_gomb" class="mentés_gomb" style="width: 200px;">Adatok Mentése</button>
            </div>`
         }
      } else {
         has_eventlistener = true
         lista.appendChild(document.getElementById("beton-lista-get").lastChild.cloneNode(true))

         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         
         document.getElementById("beton-lista-get").lastChild.children[1].children[0].id = `beton_típus_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[2].children[0].id = `beton_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[3].children[0].id = `beton_kedvezményes_ár_add_${len}`
         document.getElementById("beton-lista-get").lastChild.children[4].children[0].id = `beton_gyártó_add_${len}`

         //console.log(document.getElementById("beton-lista-get").lastChild.children[0].children[0].id)
         //console.log(document.getElementById("beton-lista-get").lastChild.children[1].children[0])
         //console.log(document.getElementById("beton-lista-get").lastChild.children[2].children[0])
         
      }
    window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
    //console.log(document.getElementById("mentés_gomb"))


    //------------------------------------MENTÉS GOMB----------------------------------------------------------
    if (has_eventlistener == false) {
      document.getElementById("mentés_gomb").addEventListener("click", function() {
         const lista = document.getElementById('beton-lista-get')
         has_eventlistener = true
         
         let len = 0
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[0].innerText)
            if (lista.children[i].children[0].innerText == "") {
               len += 1
            }
         }
         console.log(len)
         //--------------------------adatok tényleges posztolása--------------------------
         VEGLEGES_ADATOK = []
         for (let i = 1; i <= len; i++) {
            console.log(i)
            let típus = document.getElementById(`beton_típus_add_${i}`).value
            let ár = document.getElementById(`beton_ár_add_${i}`).value
            let kedvezményes_ár = document.getElementById(`beton_kedvezményes_ár_add_${i}`).value
            let gyártó = document.getElementById(`beton_gyártó_add_${i}`).value

            beton = [típus, ár, kedvezményes_ár, gyártó]
            VEGLEGES_ADATOK.push(beton)
            //console.log(beton)

            document.getElementById(`beton_típus_add_${i}`).remove()
            document.getElementById(`beton_ár_add_${i}`).remove()
            document.getElementById(`beton_kedvezményes_ár_add_${i}`).remove()
            document.getElementById(`beton_gyártó_add_${i}`).remove()
         }
         document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<div class="loader"></div>`
         console.log(JSON.stringify(VEGLEGES_ADATOK))

         var url = `https://apa-alkalmazas.herokuapp.com/post-${endpoint_neve}`;

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);

               console.log(xhr.status)
               if(xhr.status == 200) {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Adatok mentve!</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               } else {
               document.getElementById("beton-lista-wrapper").children[1].innerHTML = `<h3 style="color: white">Hiba történt! :(</h3>
               <h6 style="color: white">Frissítés 5mp múlva</h6>`
               }

               setTimeout(function(){
                  window.location.reload()
                  //document.getElementById("beton-lista-get").innerHTML = ""
                  //document.getElementById("mentés_gomb").remove()
                  },5000)
            }};

         var data = JSON.stringify(VEGLEGES_ADATOK);

         xhr.send(data);
      })

   }

   })

   //-------------------------------mentett adatok szerkesztése-------------------------
   document.getElementById("beton-edit-gomb").addEventListener("click", function() {
      //console.log("hello")

      document.getElementById("beton-plus-gomb").style.visibility = "hidden";
      
      console.log(document.getElementsByTagName("body"))
            document.getElementsByTagName("body")[0].innerHTML += `<div id="beállítások_módosítása_zöld_pipa_gomb" class="plus-gomb" style="position: fixed; top: 360px; left: 90%;">
            <i style="font-size: 20px; color: cornsilk; margin-left: 0px; margin-top: 2px" class="fas fa-check"></i>
          </div>`
      document.getElementById("beállítások_módosítása_zöld_pipa_gomb").addEventListener("click", function() {
         //console.log("hello")

         beton_adatok = []
         beton_adatok_UPDATE_VÉGLEGES = []
         for (let i = 0; i < lista.children.length; i++) {
            //console.log(lista.children[i].children[1].innerHTML.slice(0, 6))
            if (lista.children[i].children[1].innerHTML.slice(0, 6) == '<input') {
               console.log(lista.children[i].children[0].innerText)
               console.log(lista.children[i].children[1].children[0].value)
               console.log(lista.children[i].children[2].children[0].value)
               console.log(lista.children[i].children[3].children[0].value)
               console.log(lista.children[i].children[4].children[0].value)
               //console.log("hello")

               let id = lista.children[i].children[0].innerText
               let típus = lista.children[i].children[1].children[0].value
               let ár = lista.children[i].children[2].children[0].value
               let kedvezményes_ár = lista.children[i].children[3].children[0].value
               let gyártó = lista.children[i].children[4].children[0].value
               beton_adatok.push(id, típus, ár, kedvezményes_ár, gyártó)
               beton_adatok_UPDATE_VÉGLEGES.push(beton_adatok)
               beton_adatok = []
            }
         }
         console.log(JSON.stringify(beton_adatok_UPDATE_VÉGLEGES))
         document.getElementById("beton-lista-get").innerHTML = `<div class="loader" style="position: absolute; left: 45%; top: 150%"></div>`

         //------------------adatok frissítése hívás-------------
         var url = `https://apa-alkalmazas.herokuapp.com/update-delete-${endpoint_neve}`;

         var xhr = new XMLHttpRequest();
         xhr.open("PUT", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_UPDATE_VÉGLEGES);

         xhr.send(data);


         //------------------adatok törlése hívás------------------------
         var url = `https://apa-alkalmazas.herokuapp.com/update-delete-${endpoint_neve}`;

         var xhr = new XMLHttpRequest();
         xhr.open("POST", url);

         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
            }};

         var data = JSON.stringify(beton_adatok_DELETE_VÉGLEGES);

         xhr.send(data);

         setTimeout(function(){
            window.location.reload()
         }, 5000)
      })

      const lista = document.getElementById('beton-lista-get')
      if(edit_gomb_has_eventlistener == false) {
      for (const i in lista.children) {
      //   lista.innerHTML += `<tr style="border-bottom: 2px solid;
      //   border-color: aliceblue;">
      //   <td style="padding-top: 13px">${data[i].id}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
      //   <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
      // </tr>`
         //console.log(lista.children)
         lista.children[i].innerHTML += `<td style="padding-top: 15px;">
            <div class="sor_edit_gomb" style="background-color: green; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; padding-left: 2px; padding-bottom: 2px; margin-right: 20px; cursor: pointer"><i style="font-size: 18px" class="far fa-edit"></i></div>
            </td>
            <td style="padding-top: 15px;">
            <div class="sor_delete_gomb" style="background-color: red; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; cursor: pointer"><i style="font-size: 18px" class="far fa-trash-alt"></i></div>
            </td>`
      }
      edit_gomb_has_eventlistener = true
      }

      let sor_edit_gomb = document.getElementsByClassName("sor_edit_gomb")
      for(let i = 0; i < sor_edit_gomb.length; i++) {
         sor_edit_gomb[i].addEventListener("click", function() {
            console.log(`${i+1} Edit Clicked`)

            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)

            let típus = lista.children[i].children[1].innerText
            let ár = lista.children[i].children[2].innerText
            let kedvezményes_ár = lista.children[i].children[3].innerText
            let gyártó = lista.children[i].children[4].innerText

            lista.children[i].children[1].innerHTML = `<td><input value="${típus}" style="width: 130px"></input></td>`
            lista.children[i].children[2].innerHTML = `<td><input value="${ár}" style="width: 150px"></input></td>`
            lista.children[i].children[3].innerHTML = `<td><input value="${kedvezményes_ár}"  style="width: 100px"></input></td>`
            lista.children[i].children[4].innerHTML = `<td><input value="${gyártó}"  style="width: 100px"></input></td>`
            

         })
      }
      
      let sor_delete_gomb = document.getElementsByClassName("sor_delete_gomb")
      beton_adatok = []
      beton_adatok_DELETE_VÉGLEGES = []
      for (let i = 0; i < sor_delete_gomb.length; i++) {
         sor_delete_gomb[i].addEventListener("click", function() {
            console.log(lista.children[i].children[0].innerText)
            console.log(lista.children[i].children[1].innerText)
            console.log(lista.children[i].children[2].innerText)
            console.log(lista.children[i].children[3].innerText)
            console.log(lista.children[i].children[4].innerText)
            //let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            //console.log(scrollTop)
            //document.getElementById("beton_delete_popup").style.top = `250%`
            //document.getElementsByTagName("body").style.backgroundColor = "rgba(255, 255, 255)"
            document.getElementById("ide_kell_az_beton_delete_tábla").innerHTML = `
            <table style="margin-bottom: 40px">
              <thead>
                <tr>
                  <th>Id</th>
                  <th style="padding-left: 80px;">Típus</th>
                  <th style="padding-left: 80px;">Ár</th>
                  <th style="padding-left: 80px;">Kedvezményes Ár</th>
                  <th style="padding-left: 80px;">Gyártó</th>
                </tr>
              </thead>
              <tbody id="popup-táblázat">
               <td>${lista.children[i].children[0].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[1].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[2].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[3].innerText}</td>
               <td style="padding-left: 80px;">${lista.children[i].children[4].innerText}</td>
              </tbody>
            </table>`
            document.getElementById("beton_delete_popup").style.visibility = 'visible'
            document.getElementById("popup_háttér").style.visibility = 'visible'
            document.body.style.overflow = "hidden";

            
         })
      }

      document.getElementById("beton_popup_nem").addEventListener("click", function() {
         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";
      })

      document.getElementById("beton_popup_igen").addEventListener("click", function() {
         // console.log(document.getElementById("popup-táblázat").children[0].children[0].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[1].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[2].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[3].innerText)
         // console.log(document.getElementById("popup-táblázat").children[0].children[4].innerText)

         let id = document.getElementById("popup-táblázat").children[0].children[0].innerText
         let típus = document.getElementById("popup-táblázat").children[0].children[1].innerText
         let ár = document.getElementById("popup-táblázat").children[0].children[2].innerText
         let kedvezményes_ár = document.getElementById("popup-táblázat").children[0].children[3].innerText
         let gyártó = document.getElementById("popup-táblázat").children[0].children[4].innerText

         beton_adatok = [id, típus, ár, kedvezményes_ár, gyártó]
         beton_adatok_DELETE_VÉGLEGES.push(beton_adatok)
         beton_adatok = []
         console.log(JSON.stringify(beton_adatok_DELETE_VÉGLEGES)) 

         document.getElementById("beton_delete_popup").style.visibility = 'hidden'
         document.getElementById("popup_háttér").style.visibility = 'hidden'
         document.body.style.overflow = "visible";

         for (let i = 0; i < lista.children.length; i++) {
            if (lista.children[i].children[0].innerText == id && lista.children[i].children[1].innerText == típus && lista.children[i].children[2].innerText == ár && lista.children[i].children[3].innerText == kedvezményes_ár) {
               //console.log(lista.children[i])

               //lista.children[i].remove()
               lista.children[i].style.visibility = "hidden"
            }

         // console.log(lista.children[i].children[0].innerText)
         // console.log(lista.children[i].children[1].innerText)
         // console.log(lista.children[i].children[2].innerText)
         // console.log(lista.children[i].children[3].innerText)
         // console.log(lista.children[i].children[4].innerText)
         }

      })

   })
   
   
}



async function sign_in_check() {
   const body = document.getElementsByTagName("body")
   const localstorage_data = await localStorage.getItem("signed_in")
   if (localstorage_data != "true" && window.location != '/index.html') {
      window.location.href = '/index.html'
      console.log(localstorage_data)
      //body.innerHTML = '<div style="position:absolute; background-color:brown; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; z-index: 1000;"><h1 style="color:whitesmoke;">Hozzáférés megtagadva! Jelentkezz be!</h1></div>'

   }
}
sign_in_check()




async function load_data_new_day_emberek() {

   var url = "https://apa-alkalmazas.herokuapp.com/get-emberek";

   var xhr = new XMLHttpRequest();
   xhr.open("GET", url);
   
   xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

   xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
         console.log(xhr.status);
         const emberek_data = JSON.parse(xhr.responseText);
         console.log(emberek_data)

         //-----------------cégek--------------------------
         let cégek_group = emberek_data.reduce((r, a) => {
            //console.log("a", a);
            //console.log('r', r);
            r[a.cég] = [...r[a.cég] || [], a];
            return r;
           }, {});

           const munkaerő_cég = document.getElementById('munkaerő_cég')
           for (const i in cégek_group) {
              //var cég = object.keys(group[i])
              const cég_object = cégek_group[i]
              const cég = cég_object[0].cég //fogalmam sincs miért működik,de működik
              munkaerő_cég.innerHTML += `<option value="${cég}">${cég}</option>`
           }
           console.log(cégek_group);


         //-----------------------tevékenységek-------------------
         let tevékenységek_group = emberek_data.reduce((r, a) => {
         //console.log("a", a);
         //console.log('r', r);
         r[a.tevékenység] = [...r[a.tevékenység] || [], a];
         return r;
         }, {});

         const munkaerő_tevékenység = document.getElementById('munkaerő_tevékenység')
         for (const i in tevékenységek_group) {
            //var cég = object.keys(group[i])
            const tevékenységek_object = tevékenységek_group[i]
            const tevékenység = tevékenységek_object[0].tevékenység //fogalmam sincs miért működik,de működik
            munkaerő_tevékenység.innerHTML += `<option value="${tevékenység}">${tevékenység}</option>`
         }
         console.log(tevékenységek_group);





         //const munkaerő_cég = document.getElementById("munkaerő_cég")
         //const munkaerő_tevékenység = document.getElementById("munkaerő_tevékenység")
         const munkaerő_létszám = document.getElementById("munkaerő_létszám")
         const munkaerő_egység_óra = document.getElementById("munkaerő_egység_óra")
         const new_day_form_munkaerő_emberek = document.getElementById("new-day-form-munkaerő-emberek")

         munkaerő_cég.onchange=function() {
            emberek_számolás()
            vegosszeg_kiszamitasa()
         }
         munkaerő_tevékenység.onchange=function() {
         emberek_számolás()  
         munkaerő_összeadás()
         vegosszeg_kiszamitasa()
         }
         munkaerő_létszám.oninput=function() {
            emberek_számolás()
            munkaerő_összeadás()
            vegosszeg_kiszamitasa()
         }
         munkaerő_egység_óra.oninput=function() {
            emberek_számolás()
            munkaerő_összeadás()
            vegosszeg_kiszamitasa()
         }

         let eredmény_container = document.createElement(`eredmény_container_munkaerő`)
         let pff = new_day_form_munkaerő_emberek.appendChild(eredmény_container)

      function emberek_számolás() {
         if (munkaerő_cég.value != "" && munkaerő_tevékenység.value != "" && munkaerő_létszám.value != "") {
            let van_találat = false
            //console.log("while-ból érkeztem")
            for (const i in emberek_data) {
               if (emberek_data[i].cég == munkaerő_cég.value && emberek_data[i].tevékenység == munkaerő_tevékenység.value) {
                  van_találat = true
                  let ár = emberek_data[i].ár
                  let óra = munkaerő_egység_óra.value
                  let létszám = munkaerő_létszám.value
                  let eredmény = ár*óra*létszám
                  console.log(eredmény)
                  pff.innerHTML = `<h4 style="color:#C5EBC3; margin-top: 32px">${numberWithCommas(eredmény)} Ft</h4>`

               }
            }
            if (van_találat == false) {
               pff.innerHTML = `<h4 style="color:#C5EBC3; margin-top: 32px">Nincs találat!</h4>`
            }
      }
      
      }

      const munkaerő_plus_gomb = document.getElementById("munkaerő_plus_gomb")
      const munkaerő_cég_container = document.getElementById("munkaerő_cég_container")
      const munkaerő_tevékenység_container = document.getElementById("munkaerő_tevékenység_container")
      const munkaerő_egység_óra_container = document.getElementById("munkaerő_egység_óra_container")
      const munkaerő_létszám_container = document.getElementById("munkaerő_létszám_container")

      munkaerő_plus_gomb.addEventListener("click", function() {
         let új_munkaerő_cég = munkaerő_cég_container.appendChild(munkaerő_cég.cloneNode(true))
         új_munkaerő_cég.style.marginTop = "20px"
         const div_elemek_munkaerő_cég = document.getElementById("munkaerő_cég_container").children
         let szám1 = div_elemek_munkaerő_cég.length-1
         új_munkaerő_cég.id = `munkaerő_cég${szám1}`


         const új_munkaerő_tevékenység = munkaerő_tevékenység_container.appendChild(munkaerő_tevékenység.cloneNode(true))
         új_munkaerő_tevékenység.style.marginTop = "20px"
         const div_elemek_munkaerő_tevékenység = document.getElementById("munkaerő_tevékenység_container").children
         let szám2 = div_elemek_munkaerő_tevékenység.length-1
         új_munkaerő_tevékenység.id = `munkaerő_tevékenység${szám2}`


         const új_munkaerő_egység_óra = munkaerő_egység_óra_container.appendChild(munkaerő_egység_óra.cloneNode(true))
         új_munkaerő_egység_óra.style.marginTop = "20px"
         const div_elemek_munkaerő_egység_óra = document.getElementById("munkaerő_egység_óra_container").children
         let szám3 = div_elemek_munkaerő_egység_óra.length-1
         új_munkaerő_egység_óra.id = `munkaerő_egység_óra${szám3}`


         const új_munkaerő_létszám = munkaerő_létszám_container.appendChild(munkaerő_létszám.cloneNode(true))
         új_munkaerő_létszám.style.marginTop = "20px"
         const div_elemek_munkaerő_létszám = document.getElementById("munkaerő_létszám_container").children
         let szám4 = div_elemek_munkaerő_létszám.length-1
         új_munkaerő_létszám.id = `munkaerő_létszám${szám4}`

         const page_content_new_day = document.getElementById("page-content-new-day")
         
         function add_math(sorszám) {
            const munkaerő_cég = document.getElementById(`munkaerő_cég${sorszám}`)
            const munkaerő_tevékenység = document.getElementById(`munkaerő_tevékenység${sorszám}`)
            const munkaerő_létszám = document.getElementById(`munkaerő_létszám${sorszám}`)
            const munkaerő_egység_óra = document.getElementById(`munkaerő_egység_óra${sorszám}`)
            const new_day_form_munkaerő_emberek = document.getElementById("new-day-form-munkaerő-emberek")

            munkaerő_cég.onchange=function() {
               emberek_számolás()
               vegosszeg_kiszamitasa()
            }
            munkaerő_tevékenység.onchange=function() {
            emberek_számolás()  
            munkaerő_összeadás()
            vegosszeg_kiszamitasa()
            }
            munkaerő_létszám.oninput=function() {
               emberek_számolás()
               munkaerő_összeadás()
               vegosszeg_kiszamitasa()
            }
            munkaerő_egység_óra.oninput=function() {
               emberek_számolás()
               munkaerő_összeadás()
               vegosszeg_kiszamitasa()
            }


            let eredmény_container = document.createElement(`eredmény_container_munkaerő`)
            let pff = new_day_form_munkaerő_emberek.appendChild(eredmény_container)

         function emberek_számolás() {
            if (munkaerő_cég.value != "" && munkaerő_tevékenység.value != "" && munkaerő_létszám.value != "") {
               let van_találat = false
               //console.log("while-ból érkeztem")
               for (const i in emberek_data) {
                  if (emberek_data[i].cég == munkaerő_cég.value && emberek_data[i].tevékenység == munkaerő_tevékenység.value) {
                     van_találat = true
                     let ár = emberek_data[i].ár
                     let óra = munkaerő_egység_óra.value
                     let létszám = munkaerő_létszám.value
                     let eredmény = ár*óra*létszám
                     console.log(eredmény)
                     
                     pff.innerHTML = `<h4 style="color:#C5EBC3; margin-top: 32px">${numberWithCommas(eredmény)} Ft</h4>`

                  }
               }
               if (van_találat == false) {
                  pff.innerHTML = `<h4 style="color:#C5EBC3; margin-top: 32px">Nincs találat!</h4>`
               }
         }

         }


         }
         add_math(szám1)

      })

      document.getElementById("munkaerő_minus_gomb").addEventListener("click", function() {
         if (document.getElementById("munkaerő_cég_container").children.length > 2) {
            torolni_valo = document.getElementById("munkaerő_cég_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("munkaerő_tevékenység_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("munkaerő_egység_óra_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("munkaerő_létszám_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("new-day-form-munkaerő-emberek")
            torolni_valo.removeChild(torolni_valo.lastChild);
            munkaerő_összeadás()
            vegosszeg_kiszamitasa()
         }
      })

      }};
   xhr.send();

   // beállítja az összesen pozícióját
   let összesen = document.getElementById("összesen-wrapper-munkaerő")
   let méret_ami_kell = document.getElementById("new-day-form-munkaerő-inputs").clientWidth
   méret_ami_kell -= 28
   összesen.style.marginLeft = `${méret_ami_kell}px`


   function munkaerő_összeadás() {
   let összeadás_elemek_száma = document.getElementsByTagName("eredmény_container_munkaerő")
   let végösszeg = 0
   console.log(összeadás_elemek_száma.length)
   for (let i = 0; i < összeadás_elemek_száma.length; i++) {
      if (munkaerő_létszám.value !== "" && összeadás_elemek_száma[i] !== "") {
      let munkaerő_összeg = összeadás_elemek_száma[i].children[0].innerHTML
      munkaerő_összeg = commasToNumber(munkaerő_összeg.slice(0, -3))
      végösszeg += +munkaerő_összeg
      console.log(végösszeg)
   }
   for (let i = 2; i <= összeadás_elemek_száma.length; i++) {
      munkaerő_létszám = document.getElementById(`munkaerő_létszám${i}`)
   }
}
   console.log(végösszeg)
   document.getElementById("összesen-szám-munkaerő").innerHTML = `<h4>${numberWithCommas(végösszeg)} Ft</h4>`
   
}
   

}
async function load_data_new_day_munkagepek() {

   var url = "https://apa-alkalmazas.herokuapp.com/get-munkagepek";

   var xhr = new XMLHttpRequest();
   xhr.open("GET", url);
   
   xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

   xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
         console.log(xhr.status);
         const munkagepek_data = JSON.parse(xhr.responseText);
         console.log(munkagepek_data)

         //------------------cégek----------------------------
         let cégek_group = munkagepek_data.reduce((r, a) => {
            //console.log("a", a);
            //console.log('r', r);
            r[a.cég] = [...r[a.cég] || [], a];
            return r;
           }, {});

           const munkagepek_cég = document.getElementById("munkagepek_cég")
           for (const i in cégek_group) {
              //var cég = object.keys(group[i])
              const cégek_object = cégek_group[i]
              const cég = cégek_object[0].cég //fogalmam sincs miért működik,de működik
              munkagepek_cég.innerHTML += `<option value="${cég}">${cég}</option>`
           }
           console.log(cégek_group);


           //------------------------típusok----------------------
           let típusok_group = munkagepek_data.reduce((r, a) => {
            //console.log("a", a);
            //console.log('r', r);
            r[a.típus] = [...r[a.típus] || [], a];
            return r;
           }, {});

           const munkagepek_típus = document.getElementById('munkagepek_típus')
           for (const i in típusok_group) {
              //var cég = object.keys(group[i])
              const típusok_object = típusok_group[i]
              const típus = típusok_object[0].típus //fogalmam sincs miért működik,de működik
              munkagepek_típus.innerHTML += `<option value="${típus}">${típus}</option>`
           }
           console.log(típusok_group);

         
           //-------------------------rendszámok---------------------
           let rendszámok_group = munkagepek_data.reduce((r, a) => {
            //console.log("a", a);
            //console.log('r', r);
            r[a.rendszám] = [...r[a.rendszám] || [], a];
            return r;
           }, {});

           const munkagepek_rendszám = document.getElementById('munkagepek_rendszám')
           for (const i in rendszámok_group) {
              //var cég = object.keys(group[i])
              const rendszámok_object = rendszámok_group[i]
              const rendszám = rendszámok_object[0].rendszám //fogalmam sincs miért működik,de működik
              munkagepek_rendszám.innerHTML += `<option value="${rendszám}">${rendszám}</option>`
           }
           console.log(rendszámok_group);






           //const munkaerő_cég = document.getElementById("munkaerő_cég")
         //const munkaerő_tevékenység = document.getElementById("munkaerő_tevékenység")
         const munkagépek_óradíj = document.getElementById("munkagépek_óradíj")
         const munkagépek_órák_száma = document.getElementById("munkagépek_órák_száma")
         const new_day_form_munkagépek = document.getElementById("new-day-form-munkagépek")

         munkagepek_cég.onchange=function() { 
            munkagépek_ármegjelenítés()
            vegosszeg_kiszamitasa()
         }
         munkagepek_típus.onchange=function() {

            munkagepek_rendszám.innerHTML = `<option value=""></option>`
            for (const i in munkagepek_data) {
               if (munkagepek_típus.value == munkagepek_data[i].típus) {
                  let rendszám = munkagepek_data[i].rendszám
                  munkagepek_rendszám.innerHTML += `<option value="${rendszám}">${rendszám}</option>`
               }
            }

            munkagépek_ármegjelenítés()
            vegosszeg_kiszamitasa()
         }
         munkagepek_rendszám.onchange=function() {

            munkagepek_cég.innerHTML = ``
            for (const i in munkagepek_data) {
               if (munkagepek_típus.value == munkagepek_data[i].típus && munkagepek_rendszám.value == munkagepek_data[i].rendszám) {
                  let cég = munkagepek_data[i].cég
                  munkagepek_cég.innerHTML += `<option value="${cég}">${cég}</option>`
               }
            }

            munkagépek_ármegjelenítés()
            munkagépek_összeadás()
            vegosszeg_kiszamitasa()
         }
         munkagépek_óradíj.oninput=function() {
            munkagépek_számolás()
            munkagépek_összeadás()
            vegosszeg_kiszamitasa()
         }

         munkagépek_órák_száma.oninput=function() {
            munkagépek_számolás()
            munkagépek_összeadás()
            vegosszeg_kiszamitasa()
         }

         let eredmény_container = document.createElement(`eredmény_container_munkagepek`)
         let pff = new_day_form_munkagépek.appendChild(eredmény_container)

      function munkagépek_ármegjelenítés() {
         if (munkagepek_cég.value != "" && munkagepek_típus.value != "" && munkagepek_rendszám.value != "") {

            //console.log("while-ból érkeztem")
            for (const i in munkagepek_data) {
               if (munkagepek_data[i].cég == munkagepek_cég.value && munkagepek_data[i].típus == munkagepek_típus.value && munkagepek_data[i].rendszám == munkagepek_rendszám.value) {
                  munkagépek_óradíj.value = munkagepek_data[i].ár
                  munkagépek_számolás()
               }
            }
      }
      }

      function munkagépek_számolás() {
         for (const i in munkagepek_data) {
            if (munkagepek_data[i].cég == munkagepek_cég.value && munkagepek_data[i].típus == munkagepek_típus.value && munkagepek_data[i].rendszám == munkagepek_rendszám.value) {
               const óradíj_vagy_napidíj = munkagepek_data[i].óradíj
               console.log(óradíj_vagy_napidíj)
               let óradíj = munkagépek_óradíj.value
               let órák_száma = munkagépek_órák_száma.value
               if (óradíj_vagy_napidíj == 'false' || óradíj_vagy_napidíj == 'False') {
                  munkagépek_órák_száma.classList.add("hidden")
                  document.getElementById("munkagépek_órák_száma").value = 1
                  pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(óradíj)} Ft</h4>`
               } else {
                  munkagépek_órák_száma.classList.remove("hidden")

                  eredmény = óradíj*órák_száma
                  pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(eredmény)} Ft</h4>`

               }
         }
      }

   }


      const munkagepek_plus_gomb = document.getElementById("munkagepek_plus_gomb")
      const munkagepek_típus_container = document.getElementById("munkagepek_típus_container")
      const munkagepek_rendszám_container = document.getElementById("munkagepek_rendszám_container")
      const munkagepek_cég_container = document.getElementById("munkagepek_cég_container")
      const munkagépek_óradíj_container = document.getElementById("munkagépek_óradíj_container")
      const munkagépek_órák_container = document.getElementById("munkagépek_órák_container")

      munkagepek_plus_gomb.addEventListener("click", function() {
         let új_munkagepek_cég = munkagepek_cég_container.appendChild(munkagepek_cég.cloneNode(true))
         új_munkagepek_cég.style.marginTop = "20px"
         const div_elemek_munkagepek_cég = document.getElementById("munkagepek_cég_container").children
         let szám1 = div_elemek_munkagepek_cég.length-1
         új_munkagepek_cég.id = `munkagépek_cég${szám1}`


         const új_munkagepek_típus = munkagepek_típus_container.appendChild(munkagepek_típus.cloneNode(true))
         új_munkagepek_típus.style.marginTop = "20px"
         const div_elemek_munkagepek_típus = document.getElementById("munkagepek_típus_container").children
         let szám2 = div_elemek_munkagepek_típus.length-1
         új_munkagepek_típus.id = `munkagépek_típus${szám2}`


         const új_munkagep_rendszám = munkagepek_rendszám_container.appendChild(munkagepek_rendszám.cloneNode(true))
         új_munkagep_rendszám.style.marginTop = "20px"
         const div_elemek_munkagepek_rendszám = document.getElementById("munkagepek_rendszám_container").children
         let szám3 = div_elemek_munkagepek_rendszám.length-1
         új_munkagep_rendszám.id = `munkagépek_rendszám${szám3}`


         const új_munkagep_óradíj = munkagépek_óradíj_container.appendChild(munkagépek_óradíj.cloneNode(true))
         új_munkagep_óradíj.style.marginTop = "20px"
         const div_elemek_munkagepek_óradíj = document.getElementById("munkagépek_óradíj_container").children
         let szám4 = div_elemek_munkagepek_óradíj.length-1
         új_munkagep_óradíj.id = `munkagépek_óradíj${szám4}`


         const új_munkagep_órák = munkagépek_órák_container.appendChild(munkagépek_órák_száma.cloneNode(true))
         új_munkagep_órák.style.marginTop = "20px"
         const div_elemek_munkagepek_órák = document.getElementById("munkagépek_órák_container").children
         let szám5 = div_elemek_munkagepek_órák.length-1
         új_munkagep_órák.id = `munkagépek_órák${szám5}`

         const page_content_new_day = document.getElementById("page-content-new-day")
         
         function add_math(sorszám) {
            const munkagepek_cég = document.getElementById(`munkagépek_cég${sorszám}`)
            const munkagepek_típus = document.getElementById(`munkagépek_típus${sorszám}`)
            const munkagepek_rendszám = document.getElementById(`munkagépek_rendszám${sorszám}`)
            const munkagépek_óradíj = document.getElementById(`munkagépek_óradíj${sorszám}`)
            const munkagépek_órák_száma = document.getElementById(`munkagépek_órák${sorszám}`)

            const new_day_form_munkagépek = document.getElementById("new-day-form-munkagépek")




            munkagepek_cég.onchange=function() { 
               munkagépek_ármegjelenítés()
               vegosszeg_kiszamitasa()
            }
            munkagepek_típus.onchange=function() {
   
               munkagepek_rendszám.innerHTML = `<option value=""></option>`
               for (const i in munkagepek_data) {
                  if (munkagepek_típus.value == munkagepek_data[i].típus) {
                     let rendszám = munkagepek_data[i].rendszám
                     munkagepek_rendszám.innerHTML += `<option value="${rendszám}">${rendszám}</option>`
                  }
               }
   
               munkagépek_ármegjelenítés()  
               vegosszeg_kiszamitasa()
            }
            munkagepek_rendszám.onchange=function() {
   
               munkagepek_cég.innerHTML = ``
               for (const i in munkagepek_data) {
                  if (munkagepek_típus.value == munkagepek_data[i].típus && munkagepek_rendszám.value == munkagepek_data[i].rendszám) {
                     let cég = munkagepek_data[i].cég
                     munkagepek_cég.innerHTML += `<option value="${cég}">${cég}</option>`
                  }
               }
   
               munkagépek_ármegjelenítés()
               munkagépek_összeadás()
               vegosszeg_kiszamitasa()
            }
            munkagépek_óradíj.oninput=function() {
               munkagépek_számolás()
               munkagépek_összeadás()
               vegosszeg_kiszamitasa()
            }
   
            munkagépek_órák_száma.oninput=function() {
               munkagépek_számolás()
               munkagépek_összeadás()
               vegosszeg_kiszamitasa()
            }


            
            let eredmény_container = document.createElement(`eredmény_container_munkagepek`)
            let pff = new_day_form_munkagépek.appendChild(eredmény_container)

            function munkagépek_ármegjelenítés() {
               if (munkagepek_cég.value != "" && munkagepek_típus.value != "" && munkagepek_rendszám.value != "") {
      
                  //console.log("while-ból érkeztem")
                  for (const i in munkagepek_data) {
                     if (munkagepek_data[i].cég == munkagepek_cég.value && munkagepek_data[i].típus == munkagepek_típus.value && munkagepek_data[i].rendszám == munkagepek_rendszám.value) {
                        munkagépek_óradíj.value = munkagepek_data[i].ár
                        munkagépek_számolás()
                     }
                  }
            }
            }
      
            function munkagépek_számolás() {
               for (const i in munkagepek_data) {
                  if (munkagepek_data[i].cég == munkagepek_cég.value && munkagepek_data[i].típus == munkagepek_típus.value && munkagepek_data[i].rendszám == munkagepek_rendszám.value) {
                     const óradíj_vagy_napidíj = munkagepek_data[i].óradíj
                     console.log(óradíj_vagy_napidíj)
                     let óradíj = munkagépek_óradíj.value
                     let órák_száma = munkagépek_órák_száma.value
                     console.log(+i+2)
                     if (óradíj_vagy_napidíj == 'false' || óradíj_vagy_napidíj == 'False') {
                        munkagépek_órák_száma.classList.add("hidden")
                        //document.getElementById(`munkagépek_órák${+i+2}`).value = 1
                        pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(óradíj)} Ft</h4>`
                     } else {
                        munkagépek_órák_száma.classList.remove("hidden")
      
                        eredmény = óradíj*órák_száma
                        pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(eredmény)} Ft</h4>`
      
                     }
               }
            }
            
         }

         }
         add_math(szám1)
   
      })
      document.getElementById("munkagepek_minus_gomb").addEventListener("click", function() {
         if (document.getElementById("munkagepek_típus_container").children.length > 2) {
            torolni_valo = document.getElementById("munkagepek_típus_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("munkagepek_rendszám_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("munkagepek_cég_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("munkagépek_óradíj_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("munkagépek_órák_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("new-day-form-munkagépek")
            torolni_valo.removeChild(torolni_valo.lastChild);
            munkagépek_összeadás()
            vegosszeg_kiszamitasa()
         }
      })

      }};
   
      

   xhr.send();

   // beállítja az összesen pozícióját
   let összesen = document.getElementById("összesen-wrapper-munkagép")
   let méret_ami_kell = document.getElementById("new-day-form-munkagépek-inputs").clientWidth*1
   //méret_ami_kell = 1019
   console.log(méret_ami_kell)
   méret_ami_kell -= 0
   összesen.style.width = `${méret_ami_kell}px`


   function munkagépek_összeadás() {

      let összesen = document.getElementById("összesen-wrapper-munkagép")
      let méret_ami_kell = 0
      méret_ami_kell = document.getElementById("new-day-form-munkagépek-inputs").clientWidth
      console.log(méret_ami_kell)
      összesen.style.width = `${méret_ami_kell}px`

      let összeadás_elemek_száma = document.getElementsByTagName("eredmény_container_munkagepek")
      let végösszeg = 0
      console.log(összeadás_elemek_száma.length)
      for (let i = 0; i < összeadás_elemek_száma.length; i++) {
         if (munkagepek_rendszám.value !== "" && összeadás_elemek_száma[i] !== "") {
         let munkagép_összeg = összeadás_elemek_száma[i].children[0].innerHTML
         munkagép_összeg = commasToNumber(munkagép_összeg.slice(0, -3))
         végösszeg += +munkagép_összeg
         console.log(végösszeg)
      }
      for (let i = 2; i <= összeadás_elemek_száma.length; i++) {
         munkagép_rendszám = document.getElementById(`munkagepek_rendszám${i}`)
      }
   }
      console.log(végösszeg)
      document.getElementById("összesen-szám-munkagépek").innerHTML = `<h4>${numberWithCommas(végösszeg)} Ft</h4>`
      
   }

   
}
async function load_data_new_day_teherautók() {
   
   var url = "https://apa-alkalmazas.herokuapp.com/get-teherautok";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
      const teherautók_data = JSON.parse(xhr.responseText);
      console.log(teherautók_data)

      //------------------cégek----------------------------
      let cégek_group = teherautók_data.reduce((r, a) => {
         //console.log("a", a);
         //console.log('r', r);
         r[a.cég] = [...r[a.cég] || [], a];
         return r;
        }, {});

        const teherautók_cég = document.getElementById('teherautók_cég')
        for (const i in cégek_group) {
           //var cég = object.keys(group[i])
           const cégek_object = cégek_group[i]
           const cég = cégek_object[0].cég //fogalmam sincs miért működik,de működik
           teherautók_cég.innerHTML += `<option value="${cég}">${cég}</option>`
        }
        console.log(cégek_group);

        //------------------------típusok----------------------
        let típusok_group = teherautók_data.reduce((r, a) => {
         //console.log("a", a);
         //console.log('r', r);
         r[a.típus] = [...r[a.típus] || [], a];
         return r;
        }, {});

        const teherautók_típus = document.getElementById('teherautók_típus')
        for (const i in típusok_group) {
           //var cég = object.keys(group[i])
           const típusok_object = típusok_group[i]
           const típus = típusok_object[0].típus //fogalmam sincs miért működik,de működik
           teherautók_típus.innerHTML += `<option value="${típus}">${típus}</option>`
        }
        console.log(típusok_group);

        //-------------------------rendszámok---------------------
        let rendszámok_group = teherautók_data.reduce((r, a) => {
         //console.log("a", a);
         //console.log('r', r);
         r[a.rendszám] = [...r[a.rendszám] || [], a];
         return r;
        }, {});

        const teherautók_rendszám = document.getElementById('teherautók_rendszám')
        for (const i in rendszámok_group) {
           //var cég = object.keys(group[i])
           const rendszámok_object = rendszámok_group[i]
           const rendszám = rendszámok_object[0].rendszám //fogalmam sincs miért működik,de működik
           teherautók_rendszám.innerHTML += `<option value="${rendszám}">${rendszám}</option>`
        }
        console.log(rendszámok_group);





          //const munkaerő_cég = document.getElementById("munkaerő_cég")
         //const munkaerő_tevékenység = document.getElementById("munkaerő_tevékenység")
         const teherautók_óradíj = document.getElementById("teherautók_óradíj")
         const teherautók_órák_száma = document.getElementById("teherautók_órák_száma")
         const new_day_form_teherautók = document.getElementById("new-day-form-teherautók")

         teherautók_cég.onchange=function() {
            teherautók_ármegjelenítés()
            vegosszeg_kiszamitasa()
         }
         teherautók_típus.onchange=function() {

            teherautók_rendszám.innerHTML = `<option value=""></option>`
            for (const i in teherautók_data) {
               if (teherautók_típus.value == teherautók_data[i].típus) {
                  let rendszám = teherautók_data[i].rendszám
                  teherautók_rendszám.innerHTML += `<option value="${rendszám}">${rendszám}</option>`
               }
            }

            teherautók_ármegjelenítés() 
            vegosszeg_kiszamitasa() 
         }
         teherautók_rendszám.onchange=function() {

            teherautók_cég.innerHTML = ``
            for (const i in teherautók_data) {
               if (teherautók_típus.value == teherautók_data[i].típus && teherautók_rendszám.value == teherautók_data[i].rendszám) {
                  let cég = teherautók_data[i].cég
                  teherautók_cég.innerHTML += `<option value="${cég}">${cég}</option>`
               }
            }

            teherautók_ármegjelenítés()
            teherautók_összeadás()
            vegosszeg_kiszamitasa()
         }
         teherautók_óradíj.oninput=function() {
            teherautók_számolás()
            teherautók_összeadás()
            vegosszeg_kiszamitasa()
         }

         teherautók_órák_száma.oninput=function() {
            teherautók_számolás()
            teherautók_összeadás()
            vegosszeg_kiszamitasa()
         }


         let eredmény_container = document.createElement(`eredmény_container_teherautók`)
         let pff = new_day_form_teherautók.appendChild(eredmény_container)

      function teherautók_ármegjelenítés() {
         if (teherautók_cég.value != "" && teherautók_típus.value != "" && teherautók_rendszám.value != "") {
            //console.log("while-ból érkeztem")
            for (const i in teherautók_data) {
               if (teherautók_data[i].cég == teherautók_cég.value && teherautók_data[i].típus == teherautók_típus.value && teherautók_data[i].rendszám == teherautók_rendszám.value) {
                  teherautók_óradíj.value = teherautók_data[i].ár
                  teherautók_számolás()
               }
            }
      }
      }

      function teherautók_számolás() {
         for (const i in teherautók_data) {
            if (teherautók_data[i].cég == teherautók_cég.value && teherautók_data[i].típus == teherautók_típus.value && teherautók_data[i].rendszám == teherautók_rendszám.value) {
               const óradíj_vagy_napidíj = teherautók_data[i].óradíj
               console.log(óradíj_vagy_napidíj)
               let óradíj = teherautók_óradíj.value
               let órák_száma = teherautók_órák_száma.value
               if (óradíj_vagy_napidíj == 'false' || óradíj_vagy_napidíj == 'False') {
                  teherautók_órák_száma.classList.add("hidden")
                  document.getElementById("teherautók_órák_száma").value = 1
                  pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(óradíj)} Ft</h4>`
               } else {
                  teherautók_órák_száma.classList.remove("hidden")

                  eredmény = óradíj*órák_száma
                  console.log(órák_száma)
                  pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(eredmény)} Ft</h4>`

               }
         }
      }
   
   }
      
      const teherautók_plus_gomb = document.getElementById("teherautók_plus_gomb")
      const teherautók_típus_container = document.getElementById("teherautók_típus_container")
      const teherautók_rendszám_container = document.getElementById("teherautók_rendszám_container")
      const teherautók_cég_container = document.getElementById("teherautók_cég_container")
      const teherautók_óradíj_container = document.getElementById("teherautók_óradíj_container")
      const teherautók_órák_container = document.getElementById("teherautók_órák_száma_container")

      teherautók_plus_gomb.addEventListener("click", function() {
         let új_teherautók_cég = teherautók_cég_container.appendChild(teherautók_cég.cloneNode(true))
         új_teherautók_cég.style.marginTop = "20px"
         const div_elemek_teherautók_cég = document.getElementById("teherautók_cég_container").children
         let szám1 = div_elemek_teherautók_cég.length-1
         új_teherautók_cég.id = `teherautók_cég${szám1}`


         const új_teherautók_típus = teherautók_típus_container.appendChild(teherautók_típus.cloneNode(true))
         új_teherautók_típus.style.marginTop = "20px"
         const div_elemek_teherautók_típus = document.getElementById("teherautók_típus_container").children
         let szám2 = div_elemek_teherautók_típus.length-1
         új_teherautók_típus.id = `teherautók_típus${szám2}`


         const új_teherautó_rendszám = teherautók_rendszám_container.appendChild(teherautók_rendszám.cloneNode(true))
         új_teherautó_rendszám.style.marginTop = "20px"
         const div_elemek_teherautók_rendszám = document.getElementById("teherautók_rendszám_container").children
         let szám3 = div_elemek_teherautók_rendszám.length-1
         új_teherautó_rendszám.id = `teherautók_rendszám${szám3}`


         const új_teherautó_óradíj = teherautók_óradíj_container.appendChild(teherautók_óradíj.cloneNode(true))
         új_teherautó_óradíj.style.marginTop = "20px"
         const div_elemek_teherautók_óradíj = document.getElementById("teherautók_óradíj_container").children
         let szám4 = div_elemek_teherautók_óradíj.length-1
         új_teherautó_óradíj.id = `teherautók_óradíj${szám4}`


         const új_teherautó_órák = teherautók_órák_container.appendChild(teherautók_órák_száma.cloneNode(true))
         új_teherautó_órák.style.marginTop = "20px"
         const div_elemek_teherautók_órák = document.getElementById("teherautók_órák_száma_container").children
         let szám5 = div_elemek_teherautók_órák.length-1
         új_teherautó_órák.id = `teherautók_órák${szám5}`

         const page_content_new_day = document.getElementById("page-content-new-day")
         
         function add_math(sorszám) {
            const teherautók_cég = document.getElementById(`teherautók_cég${sorszám}`)
            const teherautók_típus = document.getElementById(`teherautók_típus${sorszám}`)
            const teherautók_rendszám = document.getElementById(`teherautók_rendszám${sorszám}`)
            const teherautók_óradíj = document.getElementById(`teherautók_óradíj${sorszám}`)
            const teherautók_órák_száma = document.getElementById(`teherautók_órák${sorszám}`)

            const new_day_form_teherautók = document.getElementById("new-day-form-teherautók")




            teherautók_cég.onchange=function() { 
               teherautók_ármegjelenítés()
               vegosszeg_kiszamitasa()
            }
            teherautók_típus.onchange=function() {
   
               teherautók_rendszám.innerHTML = `<option value=""></option>`
               for (const i in teherautók_data) {
                  if (teherautók_típus.value == teherautók_data[i].típus) {
                     let rendszám = teherautók_data[i].rendszám
                     teherautók_rendszám.innerHTML += `<option value="${rendszám}">${rendszám}</option>`
                  }
               }
   
               teherautók_ármegjelenítés()  
               vegosszeg_kiszamitasa()
            }
            teherautók_rendszám.onchange=function() {
   
               teherautók_cég.innerHTML = ``
               for (const i in teherautók_data) {
                  if (teherautók_típus.value == teherautók_data[i].típus && teherautók_rendszám.value == teherautók_data[i].rendszám) {
                     let cég = teherautók_data[i].cég
                     teherautók_cég.innerHTML += `<option value="${cég}">${cég}</option>`
                  }
               }
   
               teherautók_ármegjelenítés()
               teherautók_összeadás()
               vegosszeg_kiszamitasa()
            }
            teherautók_óradíj.oninput=function() {
               teherautók_számolás()
               teherautók_összeadás()
               vegosszeg_kiszamitasa()
            }
   
            teherautók_órák_száma.oninput=function() {
               teherautók_számolás()
               teherautók_összeadás()
               vegosszeg_kiszamitasa()
            }


            
            let eredmény_container = document.createElement(`eredmény_container_teherautók`)
            let pff = new_day_form_teherautók.appendChild(eredmény_container)

            function teherautók_ármegjelenítés() {
               if (teherautók_cég.value != "" && teherautók_típus.value != "" && teherautók_rendszám.value != "") {
      
                  //console.log("while-ból érkeztem")
                  for (const i in teherautók_data) {
                     if (teherautók_data[i].cég == teherautók_cég.value && teherautók_data[i].típus == teherautók_típus.value && teherautók_data[i].rendszám == teherautók_rendszám.value) {
                        teherautók_óradíj.value = teherautók_data[i].ár
                        teherautók_számolás()
                     }
                  }
            }
            }
      
            function teherautók_számolás() {
               for (const i in teherautók_data) {
                  //console.log(+i)
                  if (teherautók_data[i].cég == teherautók_cég.value && teherautók_data[i].típus == teherautók_típus.value && teherautók_data[i].rendszám == teherautók_rendszám.value) {
                     const óradíj_vagy_napidíj = teherautók_data[i].óradíj
                     console.log(óradíj_vagy_napidíj)
                     let óradíj = teherautók_óradíj.value
                     let órák_száma = teherautók_órák_száma.value
                     if (óradíj_vagy_napidíj == 'false' || óradíj_vagy_napidíj == 'False') {
                        teherautók_órák_száma.classList.add("hidden")
                        //document.getElementById(`teherautók_órák${+i-4}`).value = 1
                        pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(óradíj)} Ft</h4>`
                     } else {
                        teherautók_órák_száma.classList.remove("hidden")
      
                        eredmény = óradíj*órák_száma
                        pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(eredmény)} Ft</h4>`
      
                     }
               }
            }
           
         }


         }
         add_math(szám1)

      })

      document.getElementById("teherautók_minus_gomb").addEventListener("click", function() {
         if (document.getElementById("teherautók_típus_container").children.length > 2) {
            torolni_valo = document.getElementById("teherautók_típus_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("teherautók_rendszám_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("teherautók_cég_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("teherautók_óradíj_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("teherautók_órák_száma_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("new-day-form-teherautók")
            torolni_valo.removeChild(torolni_valo.lastChild);
            teherautók_összeadás()
            vegosszeg_kiszamitasa()
         }
      })

   }};

xhr.send();


   let összesen = document.getElementById("összesen-wrapper-teherautók")
   let méret_ami_kell = document.getElementById("new-day-form-teherautók-inputs").clientWidth*1
   console.log(méret_ami_kell)
   méret_ami_kell -= 0
   összesen.style.width = `${méret_ami_kell}px`

   function teherautók_összeadás() {

      let összesen = document.getElementById("összesen-wrapper-teherautók")
      let méret_ami_kell = 0
      méret_ami_kell = document.getElementById("new-day-form-teherautók-inputs").clientWidth
      console.log(méret_ami_kell)
      összesen.style.width = `${méret_ami_kell}px`

      let összeadás_elemek_száma = document.getElementsByTagName("eredmény_container_teherautók")
      let végösszeg = 0
      console.log(összeadás_elemek_száma.length)
      for (let i = 0; i < összeadás_elemek_száma.length; i++) {
         if (teherautók_rendszám.value !== "" && összeadás_elemek_száma[i] !== "") {
         let teherautók_összeg = összeadás_elemek_száma[i].children[0].innerHTML
         teherautók_összeg = commasToNumber(teherautók_összeg.slice(0, -3))
         végösszeg += +teherautók_összeg
         console.log(végösszeg)
      }
      for (let i = 2; i <= összeadás_elemek_száma.length; i++) {
         teherautók_rendszám = document.getElementById(`teherautók_rendszám${i}`)
      }
   }
      console.log(végösszeg)
      document.getElementById("összesen-szám-teherautók").innerHTML = `<h4>${numberWithCommas(végösszeg)} Ft</h4>`
      
   }

}
async function load_data_new_day_beton() {

   var url = "https://apa-alkalmazas.herokuapp.com/get-beton";

   var xhr = new XMLHttpRequest();
   xhr.open("GET", url);

   xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

   xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
      const beton_data = JSON.parse(xhr.responseText);
      console.log(beton_data)

      //------------------gyártók----------------------------
      let gyártó_group = beton_data.reduce((r, a) => {
         //console.log("a", a);
         //console.log('r', r);
         r[a.gyártó] = [...r[a.gyártó] || [], a];
         return r;
        }, {});

        const beton_gyártó = document.getElementById('beton-gyártó')
        for (const i in gyártó_group) {
           //var cég = object.keys(group[i])
           const gyártó_object = gyártó_group[i]
           const gyártó = gyártó_object[0].gyártó //fogalmam sincs miért működik,de működik
           beton_gyártó.innerHTML += `<option value="${gyártó}">${gyártó}</option>`
        }
        console.log(gyártó_group);

        //------------------------típusok----------------------
        let típusok_group = beton_data.reduce((r, a) => {
         //console.log("a", a);
         //console.log('r', r);
         r[a.típus] = [...r[a.típus] || [], a];
         return r;
        }, {});

        const beton_típus = document.getElementById('beton_típus')
        for (const i in típusok_group) {
           //var cég = object.keys(group[i])
           const típusok_object = típusok_group[i]
           const típus = típusok_object[0].típus //fogalmam sincs miért működik,de működik
           beton_típus.innerHTML += `<option value="${típus}">${típus}</option>`
        }
        console.log(típusok_group);



        //const munkaerő_cég = document.getElementById("munkaerő_cég")
         //const munkaerő_tevékenység = document.getElementById("munkaerő_tevékenység")
         const beton_ár = document.getElementById("beton_ár")
         const beton_mennyiség = document.getElementById("beton_mennyiség")
         const new_day_form_beton = document.getElementById("new-day-form-beton")

         beton_gyártó.onchange=function() {
            beton_ármegjelenítés()
            vegosszeg_kiszamitasa()
         }
         beton_típus.onchange=function() {
            beton_ármegjelenítés()
            beton_összeadás()  
            vegosszeg_kiszamitasa()
         }
         beton_ár.oninput=function() {
            beton_számolás()
            beton_összeadás()
            vegosszeg_kiszamitasa()
         }
         beton_mennyiség.oninput=function() {
            beton_számolás()
            beton_összeadás()
            vegosszeg_kiszamitasa()
         }


         let eredmény_container = document.createElement(`eredmény_container_beton`)
         let pff = new_day_form_beton.appendChild(eredmény_container)

         function beton_ármegjelenítés() {
            let van_találat = false
            if (beton_gyártó.value != "" && beton_típus.value != "") {
               //console.log("while-ból érkeztem")
               for (const i in beton_data) {
                  if (beton_data[i].gyártó == beton_gyártó.value && beton_data[i].típus == beton_típus.value) {
                     van_találat = true
                     console.log(beton_data[i].ár)
                     console.log(beton_data[i].kedvezményes_ár)
                     
                     if (beton_data[i].kedvezményes_ár == null || beton_data[i].kedvezményes_ár == "" || beton_data[i].kedvezményes_ár == "null" || beton_data[i].kedvezményes_ár == "0") {
                        beton_ár.value = beton_data[i].ár
                     } else {
                        beton_ár.value = beton_data[i].kedvezményes_ár
                        console.log(beton_data[i].kedvezményes_ár)
                     }

                     beton_számolás()
                  }
               }
               if (van_találat == false) {
                  beton_ár.value = ""
               }
            }
            
         }

         function beton_számolás() {
            if (beton_ár != "" && beton_mennyiség != "") {
               let ár = beton_ár.value
               let mennyiség = beton_mennyiség.value
               eredmény = ár*mennyiség
               pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(eredmény)} Ft</h4>`
            }   
         }


      const beton_plus_gomb = document.getElementById("beton_plus_gomb")
      const beton_gyártó_container = document.getElementById("beton-gyártó_container")
      const beton_típus_container = document.getElementById("beton_típus_container")
      const beton_ár_container = document.getElementById("beton_ár_container")
      const beton_mennyiség_container = document.getElementById("beton_mennyiség_container")

      beton_plus_gomb.addEventListener("click", function() {
         let új_beton_gyártó = beton_gyártó_container.appendChild(beton_gyártó.cloneNode(true))
         új_beton_gyártó.style.marginTop = "20px"
         const div_elemek_beton_gyártó = document.getElementById("beton-gyártó_container").children
         let szám1 = div_elemek_beton_gyártó.length-1
         új_beton_gyártó.id = `beton_gyártó${szám1}`


         const új_beton_típus = beton_típus_container.appendChild(beton_típus.cloneNode(true))
         új_beton_típus.style.marginTop = "20px"
         const div_elemek_beton_típus = document.getElementById("beton_típus_container").children
         let szám2 = div_elemek_beton_típus.length-1
         új_beton_típus.id = `beton_típus${szám2}`


         const új_beton_ár = beton_ár_container.appendChild(beton_ár.cloneNode(true))
         új_beton_ár.style.marginTop = "20px"
         const div_elemek_beton_ár = document.getElementById("beton_ár_container").children
         let szám3 = div_elemek_beton_ár.length-1
         új_beton_ár.id = `beton_ár${szám3}`


         const új_beton_mennyiség = beton_mennyiség_container.appendChild(beton_mennyiség.cloneNode(true))
         új_beton_mennyiség.style.marginTop = "20px"
         const div_elemek_beton_mennyiség = document.getElementById("beton_mennyiség_container").children
         let szám4 = div_elemek_beton_mennyiség.length-1
         új_beton_mennyiség.id = `beton_mennyiség${szám4}`

         const page_content_new_day = document.getElementById("page-content-new-day")
         
         function add_math(sorszám) {
            const beton_gyártó = document.getElementById(`beton_gyártó${sorszám}`)
            const beton_típus = document.getElementById(`beton_típus${sorszám}`)
            const beton_ár = document.getElementById(`beton_ár${sorszám}`)
            const beton_mennyiség = document.getElementById(`beton_mennyiség${sorszám}`)
            const new_day_form_beton = document.getElementById("new-day-form-beton")

            beton_gyártó.onchange=function() {
               beton_ármegjelenítés()
               vegosszeg_kiszamitasa()
            }
            beton_típus.onchange=function() {
               beton_ármegjelenítés()
               beton_összeadás()
               vegosszeg_kiszamitasa()
            }
            beton_ár.oninput=function() {
               beton_számolás()
               beton_összeadás()
               vegosszeg_kiszamitasa()
            }
            beton_mennyiség.oninput=function() {
               beton_számolás()
               beton_összeadás()
               vegosszeg_kiszamitasa()
            }

            let eredmény_container = document.createElement(`eredmény_container_beton`)
            let pff = new_day_form_beton.appendChild(eredmény_container)

            function beton_ármegjelenítés() {
               let van_találat = false
               if (beton_gyártó.value != "" && beton_típus.value != "") {
                  //console.log("while-ból érkeztem")
                  for (const i in beton_data) {
                     if (beton_data[i].gyártó == beton_gyártó.value && beton_data[i].típus == beton_típus.value) {
                        van_találat = true
                        //console.log(beton_data[i].ár)
                        beton_ár.value = beton_data[i].ár
                        if (beton_data[i].kedvezményes_ár == null || beton_data[i].kedvezményes_ár == "" || beton_data[i].kedvezményes_ár == "null" || beton_data[i].kedvezményes_ár == "0") {
                           beton_ár.value = beton_data[i].ár
                        } else {
                           beton_ár.value = beton_data[i].kedvezményes_ár
                           console.log(beton_data[i].kedvezményes_ár)
                        }
                        beton_számolás()
                     } 
                  }
                  if (van_találat == false) {
                     beton_ár.value = ""
                  }
            }
            
            }
   
            function beton_számolás() {
               if (beton_ár != "" && beton_mennyiség != "") {
                  let ár = beton_ár.value
                  let mennyiség = beton_mennyiség.value
                  eredmény = ár*mennyiség
                  pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(eredmény)} Ft</h4>`
               }   
            }


         }
         add_math(szám1)

      })

      document.getElementById("beton_minus_gomb").addEventListener("click", function() {
         if (document.getElementById("beton-gyártó_container").children.length > 2) {
            torolni_valo = document.getElementById("beton-gyártó_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("beton_típus_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("beton_ár_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("beton_mennyiség_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("new-day-form-beton")
            torolni_valo.removeChild(torolni_valo.lastChild);
            beton_összeadás()
            vegosszeg_kiszamitasa()
         }
      })

   }};

xhr.send();


   let összesen = document.getElementById("összesen-wrapper-beton")
   let méret_ami_kell = document.getElementById("new-day-form-beton-inputs").clientWidth*1
   console.log(méret_ami_kell)
   méret_ami_kell -= 100
   összesen.style.marginLeft = `${méret_ami_kell}px`


   function beton_összeadás() {
      let összeadás_elemek_száma = document.getElementsByTagName("eredmény_container_beton")
      let végösszeg = 0
      console.log(összeadás_elemek_száma.length)
      for (let i = 0; i < összeadás_elemek_száma.length; i++) {
         if (beton_típus.value !== "" && összeadás_elemek_száma[i] !== "") {
         let beton_összeg = összeadás_elemek_száma[i].children[0].innerHTML
         beton_összeg = commasToNumber(beton_összeg.slice(0, -3))
         végösszeg += +beton_összeg
         console.log(végösszeg)
      }
      for (let i = 2; i <= összeadás_elemek_száma.length; i++) {
         beton_típus = document.getElementById(`beton_típus${i}`)
      }
   }
      console.log(végösszeg)
      document.getElementById("összesen-szám-beton").innerHTML = `<h4>${numberWithCommas(végösszeg)} Ft</h4>`
      
   }

}
async function load_data_new_day_kis_szolgaltatok() {
   
   var url = "https://apa-alkalmazas.herokuapp.com/get-kis-szolgaltatok";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
      const kis_szolgaltatok_data = JSON.parse(xhr.responseText);
      console.log(kis_szolgaltatok_data)

      //------------------cégek----------------------------
      let cégek_group = kis_szolgaltatok_data.reduce((r, a) => {
         //console.log("a", a);
         //console.log('r', r);
         r[a.cég] = [...r[a.cég] || [], a];
         return r;
        }, {});

        const kis_szolgaltatok_cég = document.getElementById('kis-szolgaltatok_cég')
        for (const i in cégek_group) {
           //var cég = object.keys(group[i])
           const cégek_object = cégek_group[i]
           const cég = cégek_object[0].cég //fogalmam sincs miért működik,de működik
           kis_szolgaltatok_cég.innerHTML += `<option value="${cég}">${cég}</option>`
        }
        console.log(cégek_group);

        //------------------------tevékenység----------------------
        let tevékenység_group = kis_szolgaltatok_data.reduce((r, a) => {
         //console.log("a", a);
         //console.log('r', r);
         r[a.tevékenység] = [...r[a.tevékenység] || [], a];
         return r;
        }, {});

        const kis_szolgaltatok_tevékenység = document.getElementById('kis-szolgaltatok_tevékenység')
        for (const i in tevékenység_group) {
           //var cég = object.keys(group[i])
           const tevékenység_object = tevékenység_group[i]
           const tevékenység = tevékenység_object[0].tevékenység //fogalmam sincs miért működik,de működik
           kis_szolgaltatok_tevékenység.innerHTML += `<option value="${tevékenység}">${tevékenység}</option>`
        }
        console.log('TEVÉEKNYSÉG GROUP:',tevékenység_group);



          //const munkaerő_cég = document.getElementById("munkaerő_cég")
         //const munkaerő_tevékenység = document.getElementById("munkaerő_tevékenység")
         const kis_szolgaltatok_óradíj = document.getElementById("kis-szolgaltatok_óradíj")
         const kis_szolgaltatok_órák_száma = document.getElementById("kis-szolgaltatok_órák_száma")
         const new_day_form_kis_szolgaltatok = document.getElementById("new-day-form-kis-szolgaltatok")

         kis_szolgaltatok_cég.onchange=function() {
            kis_szolgaltatok_ármegjelenítés()
            vegosszeg_kiszamitasa()
         }
         kis_szolgaltatok_tevékenység.onchange=function() {
            kis_szolgaltatok_ármegjelenítés() 
            kis_szolgaltatok_számolás()
            kis_szolgaltatok_összeadás()
            vegosszeg_kiszamitasa() 
         }

         kis_szolgaltatok_óradíj.oninput=function() {
            kis_szolgaltatok_számolás()
            kis_szolgaltatok_összeadás()
            vegosszeg_kiszamitasa()
         }

         kis_szolgaltatok_órák_száma.oninput=function() {
            kis_szolgaltatok_számolás()
            kis_szolgaltatok_összeadás()
            vegosszeg_kiszamitasa()
         }


         let eredmény_container = document.createElement(`eredmény_container_kis-szolgaltatok`)
         let pff = new_day_form_kis_szolgaltatok.appendChild(eredmény_container)

      function kis_szolgaltatok_ármegjelenítés() {
         if (kis_szolgaltatok_cég.value != "" && kis_szolgaltatok_tevékenység.value != "") {
            //console.log("while-ból érkeztem")
            for (const i in kis_szolgaltatok_data) {
               if (kis_szolgaltatok_data[i].cég == kis_szolgaltatok_cég.value && kis_szolgaltatok_data[i].tevékenység == kis_szolgaltatok_tevékenység.value) {
                  //console.log('IF LEFUTOTT')
                  kis_szolgaltatok_óradíj.value = kis_szolgaltatok_data[i].ár
                  kis_szolgaltatok_számolás()
                  break
               } else {
                  //console.log('ELSE LEFUTOTT')
                  kis_szolgaltatok_óradíj.value = ''
                  pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">0 Ft</h4>`
                  kis_szolgaltatok_számolás()
               }
            }
      }
      }

      function kis_szolgaltatok_számolás() {
         for (const i in kis_szolgaltatok_data) {
            if (kis_szolgaltatok_data[i].cég == kis_szolgaltatok_cég.value && kis_szolgaltatok_data[i].tevékenység == kis_szolgaltatok_tevékenység.value) {
               const óradíj_vagy_napidíj = kis_szolgaltatok_data[i].óradíj
               console.log('LEFUTE VAGY NEM')
               console.log('óradíj vagy napidíj', óradíj_vagy_napidíj)
               let óradíj = kis_szolgaltatok_óradíj.value
               let órák_száma = kis_szolgaltatok_órák_száma.value
               if (óradíj_vagy_napidíj == 'false' || óradíj_vagy_napidíj == 'False') {
                  kis_szolgaltatok_órák_száma.classList.add("hidden")
                  //document.getElementById("kis_szolgaltatok_órák_száma").value = 1
                  pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(óradíj)} Ft</h4>`
               } else {
                  kis_szolgaltatok_órák_száma.classList.remove("hidden")

                  eredmény = óradíj*órák_száma
                  console.log(órák_száma)
                  pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(eredmény)} Ft</h4>`

               }
         } else {
            let óradíj = kis_szolgaltatok_óradíj.value
            let órák_száma = kis_szolgaltatok_órák_száma.value
            kis_szolgaltatok_órák_száma.classList.remove("hidden")

            eredmény = óradíj*órák_száma
            console.log(órák_száma)
            pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(eredmény)} Ft</h4>`
         }
      }
   
   }
      
      const kis_szolgaltatok_plus_gomb = document.getElementById("kis-szolgaltatok_plus_gomb")
      const kis_szolgaltatok_cég_container = document.getElementById("kis-szolgaltatok_cég_container")
      const kis_szolgaltatok_tevékenység_container = document.getElementById("kis-szolgaltatok_tevékenység_container")
      const kis_szolgaltatok_óradíj_container = document.getElementById("kis-szolgaltatok_óradíj_container")
      const kis_szolgaltatok_órák_container = document.getElementById("kis-szolgaltatok_órák_száma_container")

      kis_szolgaltatok_plus_gomb.addEventListener("click", function() {
         let új_kis_szolgaltatok_cég = kis_szolgaltatok_cég_container.appendChild(kis_szolgaltatok_cég.cloneNode(true))
         új_kis_szolgaltatok_cég.style.marginTop = "20px"
         const div_elemek_kis_szolgaltatok_cég = document.getElementById("kis-szolgaltatok_cég_container").children
         let szám1 = div_elemek_kis_szolgaltatok_cég.length-1
         console.log('SZÁM 1:', szám1)
         új_kis_szolgaltatok_cég.id = `kis_szolgaltatok_cég${szám1}`


         const új_kis_szolgaltatok_tevékenység = kis_szolgaltatok_tevékenység_container.appendChild(kis_szolgaltatok_tevékenység.cloneNode(true))
         új_kis_szolgaltatok_tevékenység.style.marginTop = "20px"
         const div_elemek_kis_szolgaltatok_tevékenység = document.getElementById("kis-szolgaltatok_tevékenység_container").children
         let szám2 = div_elemek_kis_szolgaltatok_tevékenység.length-1
         új_kis_szolgaltatok_tevékenység.id = `kis_szolgaltatok_tevékenység${szám2}`


         const új_teherautó_óradíj = kis_szolgaltatok_óradíj_container.appendChild(kis_szolgaltatok_óradíj.cloneNode(true))
         új_teherautó_óradíj.style.marginTop = "20px"
         const div_elemek_kis_szolgaltatok_óradíj = document.getElementById("kis-szolgaltatok_óradíj_container").children
         let szám4 = div_elemek_kis_szolgaltatok_óradíj.length-1
         új_teherautó_óradíj.id = `kis_szolgaltatok_óradíj${szám4}`


         const új_teherautó_órák = kis_szolgaltatok_órák_container.appendChild(kis_szolgaltatok_órák_száma.cloneNode(true))
         új_teherautó_órák.style.marginTop = "20px"
         const div_elemek_kis_szolgaltatok_órák = document.getElementById("kis-szolgaltatok_órák_száma_container").children
         let szám5 = div_elemek_kis_szolgaltatok_órák.length-1
         új_teherautó_órák.id = `kis_szolgaltatok_órák${szám5}`

         const page_content_new_day = document.getElementById("page-content-new-day")
         
         function add_math(sorszám) {
            const kis_szolgaltatok_cég = document.getElementById(`kis_szolgaltatok_cég${sorszám}`)
            const kis_szolgaltatok_tevékenység = document.getElementById(`kis_szolgaltatok_tevékenység${sorszám}`)
            const kis_szolgaltatok_óradíj = document.getElementById(`kis_szolgaltatok_óradíj${sorszám}`)
            const kis_szolgaltatok_órák_száma = document.getElementById(`kis_szolgaltatok_órák${sorszám}`)

            const new_day_form_kis_szolgaltatok = document.getElementById("new-day-form-kis-szolgaltatok")



            //console.log('SORSZÁM:',sorszám)
            //console.log('KIS_SZOLGATATOK_CÉG:', document.getElementById(`kis_szolgaltatok_cég${sorszám}`))
            
            kis_szolgaltatok_cég.onchange=function() { 
               kis_szolgaltatok_ármegjelenítés()
               vegosszeg_kiszamitasa()
            }
            kis_szolgaltatok_tevékenység.onchange=function() {   
               kis_szolgaltatok_ármegjelenítés() 
               kis_szolgaltatok_számolás() 
               kis_szolgaltatok_összeadás()
               vegosszeg_kiszamitasa()
            }
            
            kis_szolgaltatok_óradíj.oninput=function() {
               kis_szolgaltatok_számolás()
               kis_szolgaltatok_összeadás()
               vegosszeg_kiszamitasa()
            }
   
            kis_szolgaltatok_órák_száma.oninput=function() {
               kis_szolgaltatok_számolás()
               kis_szolgaltatok_összeadás()
               vegosszeg_kiszamitasa()
            }


            
            let eredmény_container = document.createElement(`eredmény_container_kis-szolgaltatok`)
            let pff = new_day_form_kis_szolgaltatok.appendChild(eredmény_container)

            function kis_szolgaltatok_ármegjelenítés() {
               if (kis_szolgaltatok_cég.value != "" && kis_szolgaltatok_tevékenység.value != "") {
      
                  //console.log("while-ból érkeztem")
                  for (const i in kis_szolgaltatok_data) {
                     if (kis_szolgaltatok_data[i].cég == kis_szolgaltatok_cég.value && kis_szolgaltatok_data[i].tevékenység == kis_szolgaltatok_tevékenység.value) {
                        kis_szolgaltatok_óradíj.value = kis_szolgaltatok_data[i].ár
                        kis_szolgaltatok_számolás()
                        break
                     } else {
                        //console.log('ELSE LEFUTOTT')
                        kis_szolgaltatok_óradíj.value = ''
                        pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">0 Ft</h4>`
                        kis_szolgaltatok_számolás()
                     }
                  }
            }
            }
      
            function kis_szolgaltatok_számolás() {
               for (const i in kis_szolgaltatok_data) {
                  //console.log(+i)
                  if (kis_szolgaltatok_data[i].cég == kis_szolgaltatok_cég.value && kis_szolgaltatok_data[i].tevékenység == kis_szolgaltatok_tevékenység.value) {
                     const óradíj_vagy_napidíj = kis_szolgaltatok_data[i].óradíj
                     console.log(óradíj_vagy_napidíj)
                     let óradíj = kis_szolgaltatok_óradíj.value
                     let órák_száma = kis_szolgaltatok_órák_száma.value
                     if (óradíj_vagy_napidíj == 'false' || óradíj_vagy_napidíj == 'False') {
                        kis_szolgaltatok_órák_száma.classList.add("hidden")
                        //document.getElementById(`kis_szolgaltatok_órák${+i-4}`).value = 1
                        pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(óradíj)} Ft</h4>`
                     } else {
                        kis_szolgaltatok_órák_száma.classList.remove("hidden")
      
                        eredmény = óradíj*órák_száma
                        pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(eredmény)} Ft</h4>`
      
                     }
               } else {
                  let óradíj = kis_szolgaltatok_óradíj.value
                  let órák_száma = kis_szolgaltatok_órák_száma.value
                  kis_szolgaltatok_órák_száma.classList.remove("hidden")
      
                  eredmény = óradíj*órák_száma
                  console.log(órák_száma)
                  pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(eredmény)} Ft</h4>`
               }
            }
           
         }


         }
         add_math(szám1)

      })

      document.getElementById("kis-szolgaltatok_minus_gomb").addEventListener("click", function() {
         if (document.getElementById("kis-szolgaltatok_tevékenység_container").children.length > 2) {
            torolni_valo = document.getElementById("kis-szolgaltatok_tevékenység_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("kis-szolgaltatok_cég_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("kis-szolgaltatok_óradíj_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("kis-szolgaltatok_órák_száma_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("new-day-form-kis-szolgaltatok")
            torolni_valo.removeChild(torolni_valo.lastChild);
            kis_szolgaltatok_összeadás()
            vegosszeg_kiszamitasa()
         }
      })

   }};

xhr.send();


   let összesen = document.getElementById("összesen-wrapper-kis-szolgaltatok")
   let méret_ami_kell = document.getElementById("new-day-form-kis-szolgaltatok-inputs").clientWidth*1
   console.log(méret_ami_kell)
   méret_ami_kell -= 100
   összesen.style.width = `${méret_ami_kell}px`

   function kis_szolgaltatok_összeadás() {

      let összesen = document.getElementById("összesen-wrapper-kis-szolgaltatok")
      let méret_ami_kell = 0
      méret_ami_kell = document.getElementById("new-day-form-kis-szolgaltatok-inputs").clientWidth
      console.log(méret_ami_kell)
      összesen.style.width = `${méret_ami_kell - 400}px`

      let összeadás_elemek_száma = document.getElementsByTagName("eredmény_container_kis-szolgaltatok")
      let végösszeg = 0
      console.log(összeadás_elemek_száma.length)
      for (let i = 0; i < összeadás_elemek_száma.length; i++) {
         if (összeadás_elemek_száma[i] !== "") {
         let kis_szolgaltatok_összeg = összeadás_elemek_száma[i].children[0].innerHTML
         //console.log('KIS SZOLGÁLTATÓK SOR ÖSSZEG', kis_szolgaltatok_összeg)
         kis_szolgaltatok_összeg = commasToNumber(kis_szolgaltatok_összeg.slice(0, -3))
         végösszeg += +kis_szolgaltatok_összeg
         console.log(végösszeg)
      }
      for (let i = 2; i <= összeadás_elemek_száma.length; i++) {
         kis_szolgaltatok_rendszám = document.getElementById(`kis-szolgaltatok_tevékenység${i}`)
      }
   }
      console.log(végösszeg)
      document.getElementById("összesen-szám-kis-szolgaltatok").innerHTML = `<h4>${numberWithCommas(végösszeg)} Ft</h4>`
      
   }

}
async function load_data_new_day_nagy_szolgaltatok() {
   
   var url = "https://apa-alkalmazas.herokuapp.com/get-nagy-szolgaltatok";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
      const nagy_szolgaltatok_data = JSON.parse(xhr.responseText);
      console.log(nagy_szolgaltatok_data)

      //------------------cégek----------------------------
      let cégek_group = nagy_szolgaltatok_data.reduce((r, a) => {
         //console.log("a", a);
         //console.log('r', r);
         r[a.cég] = [...r[a.cég] || [], a];
         return r;
        }, {});

        const nagy_szolgaltatok_cég = document.getElementById('nagy_szolgaltatok_cég')
        for (const i in cégek_group) {
           //var cég = object.keys(group[i])
           const cégek_object = cégek_group[i]
           const cég = cégek_object[0].cég //fogalmam sincs miért működik,de működik
           nagy_szolgaltatok_cég.innerHTML += `<option value="${cég}">${cég}</option>`
        }
        console.log(cégek_group);

        //------------------------tevékenység----------------------
        let tevékenység_group = nagy_szolgaltatok_data.reduce((r, a) => {
         //console.log("a", a);
         //console.log('r', r);
         r[a.tevékenység] = [...r[a.tevékenység] || [], a];
         return r;
        }, {});

        const nagy_szolgaltatok_tevékenység = document.getElementById('nagy_szolgaltatok_tevékenység')
        for (const i in tevékenység_group) {
           //var cég = object.keys(group[i])
           const tevékenység_object = tevékenység_group[i]
           const tevékenység = tevékenység_object[0].tevékenység //fogalmam sincs miért működik,de működik
           nagy_szolgaltatok_tevékenység.innerHTML += `<option value="${tevékenység}">${tevékenység}</option>`
        }
        console.log('TEVÉEKNYSÉG GROUP:',tevékenység_group);

        //-------------------------mértékegység---------------------
        let mértékegység_group = nagy_szolgaltatok_data.reduce((r, a) => {
         //console.log("a", a);
         //console.log('r', r);
         r[a.mértékegység] = [...r[a.mértékegység] || [], a];
         return r;
        }, {});

        const nagy_szolgaltatok_mértékegység = document.getElementById('nagy_szolgaltatok_mértékegység')
        for (const i in mértékegység_group) {
           //var cég = object.keys(group[i])
           const mértékegység_object = mértékegység_group[i]
           const mértékegység = mértékegység_object[0].mértékegység //fogalmam sincs miért működik,de működik
           nagy_szolgaltatok_mértékegység.innerHTML += `<option value="${mértékegység}">${mértékegység}</option>`
        }
        console.log(mértékegység_group);





          //const munkaerő_cég = document.getElementById("munkaerő_cég")
         //const munkaerő_tevékenység = document.getElementById("munkaerő_tevékenység")
         const nagy_szolgaltatok_óradíj = document.getElementById("nagy_szolgaltatok_óradíj")
         const nagy_szolgaltatok_órák_száma = document.getElementById("nagy_szolgaltatok_órák_száma")
         const new_day_form_nagy_szolgaltatok = document.getElementById("new-day-form-nagy_szolgaltatok")

         nagy_szolgaltatok_cég.onchange=function() {

            nagy_szolgaltatok_mértékegység.innerHTML = `<option value=""></option>`
            let MEG_VAN = false
            for (const i in nagy_szolgaltatok_data) {
               if (nagy_szolgaltatok_cég.value == nagy_szolgaltatok_data[i].cég && nagy_szolgaltatok_tevékenység.value == nagy_szolgaltatok_data[i].tevékenység) {
                  let mértékegység = nagy_szolgaltatok_data[i].mértékegység
                  nagy_szolgaltatok_mértékegység.innerHTML += `<option value="${mértékegység}">${mértékegység}</option>`
                  MEG_VAN = true
                  break
               }
            }
            if (MEG_VAN == false) {
               document.getElementById('nagy_szolgaltatok_mértékegység').innerHTML = `<option value=""></option>`
               let mértékegység_group = nagy_szolgaltatok_data.reduce((r, a) => {
                  //console.log("a", a);
                  //console.log('r', r);
                  r[a.mértékegység] = [...r[a.mértékegység] || [], a];
                  return r;
                  }, {});
         
                  const nagy_szolgaltatok_mértékegység = document.getElementById('nagy_szolgaltatok_mértékegység')
                  for (const i in mértékegység_group) {
                     //var cég = object.keys(group[i])
                     const mértékegység_object = mértékegység_group[i]
                     const mértékegység = mértékegység_object[0].mértékegység //fogalmam sincs miért működik,de működik
                     nagy_szolgaltatok_mértékegység.innerHTML += `<option value="${mértékegység}">${mértékegység}</option>`
                  }
         }

            nagy_szolgaltatok_ármegjelenítés()
            vegosszeg_kiszamitasa()
         }
         nagy_szolgaltatok_tevékenység.onchange=function() {

            nagy_szolgaltatok_mértékegység.innerHTML = `<option value=""></option>`
            let MEG_VAN = false
            for (const i in nagy_szolgaltatok_data) {
               if (nagy_szolgaltatok_cég.value == nagy_szolgaltatok_data[i].cég && nagy_szolgaltatok_tevékenység.value == nagy_szolgaltatok_data[i].tevékenység) {
                  let mértékegység = nagy_szolgaltatok_data[i].mértékegység
                  nagy_szolgaltatok_mértékegység.innerHTML += `<option value="${mértékegység}">${mértékegység}</option>`
                  MEG_VAN = true
                  
               }
            }
            if (MEG_VAN == false) {
               document.getElementById('nagy_szolgaltatok_mértékegység').innerHTML = `<option value=""></option>`
               let mértékegység_group = nagy_szolgaltatok_data.reduce((r, a) => {
                  //console.log("a", a);
                  //console.log('r', r);
                  r[a.mértékegység] = [...r[a.mértékegység] || [], a];
                  return r;
                  }, {});
         
                  const nagy_szolgaltatok_mértékegység = document.getElementById('nagy_szolgaltatok_mértékegység')
                  for (const i in mértékegység_group) {
                     //var cég = object.keys(group[i])
                     const mértékegység_object = mértékegység_group[i]
                     const mértékegység = mértékegység_object[0].mértékegység //fogalmam sincs miért működik,de működik
                     nagy_szolgaltatok_mértékegység.innerHTML += `<option value="${mértékegység}">${mértékegység}</option>`
                  }
         }

            nagy_szolgaltatok_ármegjelenítés() 
            vegosszeg_kiszamitasa() 
         }
         nagy_szolgaltatok_mértékegység.onchange=function() {
            nagy_szolgaltatok_ármegjelenítés()
            nagy_szolgaltatok_összeadás()
            vegosszeg_kiszamitasa()
         }
         nagy_szolgaltatok_óradíj.oninput=function() {
            nagy_szolgaltatok_számolás()
            nagy_szolgaltatok_összeadás()
            vegosszeg_kiszamitasa()
         }

         nagy_szolgaltatok_órák_száma.oninput=function() {
            nagy_szolgaltatok_számolás()
            nagy_szolgaltatok_összeadás()
            vegosszeg_kiszamitasa()
         }


         let eredmény_container = document.createElement(`eredmény_container_nagy_szolgaltatok`)
         let pff = new_day_form_nagy_szolgaltatok.appendChild(eredmény_container)

      function nagy_szolgaltatok_ármegjelenítés() {
         if (nagy_szolgaltatok_cég.value != "" && nagy_szolgaltatok_tevékenység.value != "" && nagy_szolgaltatok_mértékegység.value != "") {
            //console.log("while-ból érkeztem")
            let megvan = false
            for (const i in nagy_szolgaltatok_data) {
               if (nagy_szolgaltatok_data[i].cég == nagy_szolgaltatok_cég.value && nagy_szolgaltatok_data[i].tevékenység == nagy_szolgaltatok_tevékenység.value && nagy_szolgaltatok_data[i].mértékegység == nagy_szolgaltatok_mértékegység.value) {
                  nagy_szolgaltatok_óradíj.value = nagy_szolgaltatok_data[i].szerződéses_ár
                  nagy_szolgaltatok_számolás()
                  megvan = true
               }
            }
            if (megvan == false) {  //ha ezt így hagyom akkor nem találja meg a tételt az összes mértékegység variációban, de ha kitörköm akkor pedig nem nulláza ki az ár rublikát ha olyan tételt választok ki ami nem létezik
               console.log('MEGVAN FALSE LEFUTOTT')
               nagy_szolgaltatok_óradíj.value = '' 
               pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">0 Ft</h4>`
               nagy_szolgaltatok_számolás()
            }
      }
      }

      function nagy_szolgaltatok_számolás() {
         for (const i in nagy_szolgaltatok_data) {
            if (nagy_szolgaltatok_data[i].cég == nagy_szolgaltatok_cég.value && nagy_szolgaltatok_data[i].tevékenység == nagy_szolgaltatok_tevékenység.value && nagy_szolgaltatok_data[i].mértékegység == nagy_szolgaltatok_mértékegység.value) {
               const óradíj_vagy_napidíj = nagy_szolgaltatok_data[i].óradíj
               console.log(óradíj_vagy_napidíj)
               let óradíj = nagy_szolgaltatok_óradíj.value
               let órák_száma = nagy_szolgaltatok_órák_száma.value
               if (óradíj_vagy_napidíj == false) {
                  nagy_szolgaltatok_órák_száma.classList.add("hidden")
                  //document.getElementById("nagy_szolgaltatok_órák_száma").value = 1
                  pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(óradíj)} Ft</h4>`
               } else {
                  nagy_szolgaltatok_órák_száma.classList.remove("hidden")

                  eredmény = óradíj*órák_száma
                  console.log(órák_száma)
                  pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(eredmény)} Ft</h4>`

               }
         } else {
            let óradíj = nagy_szolgaltatok_óradíj.value
            let órák_száma = nagy_szolgaltatok_órák_száma.value
            nagy_szolgaltatok_órák_száma.classList.remove("hidden")

            eredmény = óradíj*órák_száma
            console.log(órák_száma)
            pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(eredmény)} Ft</h4>`
         }
      }
   
   }
      
      const nagy_szolgaltatok_plus_gomb = document.getElementById("nagy_szolgaltatok_plus_gomb")
      const nagy_szolgaltatok_tevékenység_container = document.getElementById("nagy_szolgaltatok_tevékenység_container")
      const nagy_szolgaltatok_mértékegység_container = document.getElementById("nagy_szolgaltatok_mértékegység_container")
      const nagy_szolgaltatok_cég_container = document.getElementById("nagy_szolgaltatok_cég_container")
      const nagy_szolgaltatok_óradíj_container = document.getElementById("nagy_szolgaltatok_óradíj_container")
      const nagy_szolgaltatok_órák_container = document.getElementById("nagy_szolgaltatok_órák_száma_container")

      nagy_szolgaltatok_plus_gomb.addEventListener("click", function() {
         let új_nagy_szolgaltatok_cég = nagy_szolgaltatok_cég_container.appendChild(nagy_szolgaltatok_cég.cloneNode(true))
         új_nagy_szolgaltatok_cég.style.marginTop = "20px"
         const div_elemek_nagy_szolgaltatok_cég = document.getElementById("nagy_szolgaltatok_cég_container").children
         let szám1 = div_elemek_nagy_szolgaltatok_cég.length-1
         új_nagy_szolgaltatok_cég.id = `nagy_szolgaltatok_cég${szám1}`


         const új_nagy_szolgaltatok_tevékenység = nagy_szolgaltatok_tevékenység_container.appendChild(nagy_szolgaltatok_tevékenység.cloneNode(true))
         új_nagy_szolgaltatok_tevékenység.style.marginTop = "20px"
         const div_elemek_nagy_szolgaltatok_tevékenység = document.getElementById("nagy_szolgaltatok_tevékenység_container").children
         let szám2 = div_elemek_nagy_szolgaltatok_tevékenység.length-1
         új_nagy_szolgaltatok_tevékenység.id = `nagy_szolgaltatok_tevékenység${szám2}`


         const új_nagy_szolgaltatok_mértékegység = nagy_szolgaltatok_mértékegység_container.appendChild(nagy_szolgaltatok_mértékegység.cloneNode(true))
         új_nagy_szolgaltatok_mértékegység.style.marginTop = "20px"
         const div_elemek_nagy_szolgaltatok_mértékegység = document.getElementById("nagy_szolgaltatok_mértékegység_container").children
         let szám3 = div_elemek_nagy_szolgaltatok_mértékegység.length-1
         új_nagy_szolgaltatok_mértékegység.id = `nagy_szolgaltatok_mértékegység${szám3}`


         const új_nagy_szolgaltatok_óradíj = nagy_szolgaltatok_óradíj_container.appendChild(nagy_szolgaltatok_óradíj.cloneNode(true))
         új_nagy_szolgaltatok_óradíj.style.marginTop = "20px"
         const div_elemek_nagy_szolgaltatok_óradíj = document.getElementById("nagy_szolgaltatok_óradíj_container").children
         let szám4 = div_elemek_nagy_szolgaltatok_óradíj.length-1
         új_nagy_szolgaltatok_óradíj.id = `nagy_szolgaltatok_óradíj${szám4}`


         const új_nagy_szolgaltatok_órák = nagy_szolgaltatok_órák_container.appendChild(nagy_szolgaltatok_órák_száma.cloneNode(true))
         új_nagy_szolgaltatok_órák.style.marginTop = "20px"
         const div_elemek_nagy_szolgaltatok_órák = document.getElementById("nagy_szolgaltatok_órák_száma_container").children
         let szám5 = div_elemek_nagy_szolgaltatok_órák.length-1
         új_nagy_szolgaltatok_órák.id = `nagy_szolgaltatok_órák${szám5}`

         const page_content_new_day = document.getElementById("page-content-new-day")
         
         function add_math(sorszám) {
            const nagy_szolgaltatok_cég = document.getElementById(`nagy_szolgaltatok_cég${sorszám}`)
            const nagy_szolgaltatok_tevékenység = document.getElementById(`nagy_szolgaltatok_tevékenység${sorszám}`)
            const nagy_szolgaltatok_mértékegység = document.getElementById(`nagy_szolgaltatok_mértékegység${sorszám}`)
            const nagy_szolgaltatok_óradíj = document.getElementById(`nagy_szolgaltatok_óradíj${sorszám}`)
            const nagy_szolgaltatok_órák_száma = document.getElementById(`nagy_szolgaltatok_órák${sorszám}`)

            const new_day_form_nagy_szolgaltatok = document.getElementById("new-day-form-nagy_szolgaltatok")




            nagy_szolgaltatok_cég.onchange=function() {

               nagy_szolgaltatok_mértékegység.innerHTML = `<option value=""></option>`
            let MEG_VAN = false
            for (const i in nagy_szolgaltatok_data) {
               if (nagy_szolgaltatok_cég.value == nagy_szolgaltatok_data[i].cég && nagy_szolgaltatok_tevékenység.value == nagy_szolgaltatok_data[i].tevékenység) {
                  let mértékegység = nagy_szolgaltatok_data[i].mértékegység
                  nagy_szolgaltatok_mértékegység.innerHTML += `<option value="${mértékegység}">${mértékegység}</option>`
                  MEG_VAN = true
                  
               }
            }
            if (MEG_VAN == false) {
               nagy_szolgaltatok_mértékegység.innerHTML = `<option value=""></option>`
               let mértékegység_group = nagy_szolgaltatok_data.reduce((r, a) => {
                  //console.log("a", a);
                  //console.log('r', r);
                  r[a.mértékegység] = [...r[a.mértékegység] || [], a];
                  return r;
                  }, {});
         
                  //const nagy_szolgaltatok_mértékegység = document.getElementById('nagy_szolgaltatok_mértékegység')
                  for (const i in mértékegység_group) {
                     //var cég = object.keys(group[i])
                     const mértékegység_object = mértékegység_group[i]
                     const mértékegység = mértékegység_object[0].mértékegység //fogalmam sincs miért működik,de működik
                     nagy_szolgaltatok_mértékegység.innerHTML += `<option value="${mértékegység}">${mértékegység}</option>`
                  }
            }

               nagy_szolgaltatok_ármegjelenítés()
               vegosszeg_kiszamitasa()
            }
            nagy_szolgaltatok_tevékenység.onchange=function() {
   
               nagy_szolgaltatok_mértékegység.innerHTML = `<option value=""></option>`
            let MEG_VAN = false
            for (const i in nagy_szolgaltatok_data) {
               if (nagy_szolgaltatok_cég.value == nagy_szolgaltatok_data[i].cég && nagy_szolgaltatok_tevékenység.value == nagy_szolgaltatok_data[i].tevékenység) {
                  let mértékegység = nagy_szolgaltatok_data[i].mértékegység
                  nagy_szolgaltatok_mértékegység.innerHTML += `<option value="${mértékegység}">${mértékegység}</option>`
                  MEG_VAN = true
               }
            }
            if (MEG_VAN == false) {
               nagy_szolgaltatok_mértékegység.innerHTML = `<option value=""></option>`
               let mértékegység_group = nagy_szolgaltatok_data.reduce((r, a) => {
                  //console.log("a", a);
                  //console.log('r', r);
                  r[a.mértékegység] = [...r[a.mértékegység] || [], a];
                  return r;
                  }, {});
         
                  //const nagy_szolgaltatok_mértékegység = document.getElementById('nagy_szolgaltatok_mértékegység')
                  for (const i in mértékegység_group) {
                     //var cég = object.keys(group[i])
                     const mértékegység_object = mértékegység_group[i]
                     const mértékegység = mértékegység_object[0].mértékegység //fogalmam sincs miért működik,de működik
                     nagy_szolgaltatok_mértékegység.innerHTML += `<option value="${mértékegység}">${mértékegység}</option>`
                  }
            }
   
               nagy_szolgaltatok_ármegjelenítés()  
               vegosszeg_kiszamitasa()
            }
            nagy_szolgaltatok_mértékegység.onchange=function() {
               nagy_szolgaltatok_ármegjelenítés()
               nagy_szolgaltatok_összeadás()
               vegosszeg_kiszamitasa()
            }
            nagy_szolgaltatok_óradíj.oninput=function() {
               nagy_szolgaltatok_számolás()
               nagy_szolgaltatok_összeadás()
               vegosszeg_kiszamitasa()
            }
   
            nagy_szolgaltatok_órák_száma.oninput=function() {
               nagy_szolgaltatok_számolás()
               nagy_szolgaltatok_összeadás()
               vegosszeg_kiszamitasa()
            }


            
            let eredmény_container = document.createElement(`eredmény_container_nagy_szolgaltatok`)
            let pff = new_day_form_nagy_szolgaltatok.appendChild(eredmény_container)

            function nagy_szolgaltatok_ármegjelenítés() {
               if (nagy_szolgaltatok_cég.value != "" && nagy_szolgaltatok_tevékenység.value != "" && nagy_szolgaltatok_mértékegység.value != "") {
      
                  //console.log("while-ból érkeztem")
                  let megvan = false
                  for (const i in nagy_szolgaltatok_data) {
                     if (nagy_szolgaltatok_data[i].cég == nagy_szolgaltatok_cég.value && nagy_szolgaltatok_data[i].tevékenység == nagy_szolgaltatok_tevékenység.value && nagy_szolgaltatok_data[i].mértékegység == nagy_szolgaltatok_mértékegység.value) {
                        nagy_szolgaltatok_óradíj.value = nagy_szolgaltatok_data[i].szerződéses_ár
                        nagy_szolgaltatok_számolás()
                        console.log('IF Csuk LEFUTOTT')
                        megvan = true
                        
                     }
                  }
                  if (megvan == false) {
                     console.log('ELSE csuk LEFUTOTT')
                     nagy_szolgaltatok_óradíj.value = ''
                     pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">0 Ft</h4>`
                     nagy_szolgaltatok_számolás()
                  }
            }
            }
      
            function nagy_szolgaltatok_számolás() {
               for (const i in nagy_szolgaltatok_data) {
                  //console.log(+i)
                  if (nagy_szolgaltatok_data[i].cég == nagy_szolgaltatok_cég.value && nagy_szolgaltatok_data[i].tevékenység == nagy_szolgaltatok_tevékenység.value && nagy_szolgaltatok_data[i].mértékegység == nagy_szolgaltatok_mértékegység.value) {
                     const óradíj_vagy_napidíj = nagy_szolgaltatok_data[i].óradíj
                     console.log(óradíj_vagy_napidíj)
                     let óradíj = nagy_szolgaltatok_óradíj.value
                     let órák_száma = nagy_szolgaltatok_órák_száma.value
                     if (óradíj_vagy_napidíj == false) {
                        nagy_szolgaltatok_órák_száma.classList.add("hidden")
                        //document.getElementById(`nagy_szolgaltatok_órák${+i-4}`).value = 1
                        pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(óradíj)} Ft</h4>`
                     } else {
                        nagy_szolgaltatok_órák_száma.classList.remove("hidden")
      
                        eredmény = óradíj*órák_száma
                        pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(eredmény)} Ft</h4>`
      
                     }
               } else {
                  let óradíj = nagy_szolgaltatok_óradíj.value
                  let órák_száma = nagy_szolgaltatok_órák_száma.value
                  nagy_szolgaltatok_órák_száma.classList.remove("hidden")
      
                  eredmény = óradíj*órák_száma
                  console.log(órák_száma)
                  pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(eredmény)} Ft</h4>`
               }
            }
           
         }


         }
         add_math(szám1)

      })

      document.getElementById("nagy_szolgaltatok_minus_gomb").addEventListener("click", function() {
         if (document.getElementById("nagy_szolgaltatok_tevékenység_container").children.length > 2) {
            torolni_valo = document.getElementById("nagy_szolgaltatok_tevékenység_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("nagy_szolgaltatok_mértékegység_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("nagy_szolgaltatok_cég_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("nagy_szolgaltatok_óradíj_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("nagy_szolgaltatok_órák_száma_container")
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById("new-day-form-nagy_szolgaltatok")
            torolni_valo.removeChild(torolni_valo.lastChild);
            nagy_szolgaltatok_összeadás()
            vegosszeg_kiszamitasa()
         }
      })

   }};

xhr.send();


   let összesen = document.getElementById("összesen-wrapper-nagy_szolgaltatok")
   let méret_ami_kell = document.getElementById("new-day-form-nagy_szolgaltatok-inputs").clientWidth*1
   console.log(méret_ami_kell)
   méret_ami_kell -= 0
   összesen.style.width = `${méret_ami_kell}px`

   function nagy_szolgaltatok_összeadás() {

      let összesen = document.getElementById("összesen-wrapper-nagy_szolgaltatok")
      let méret_ami_kell = 0
      méret_ami_kell = document.getElementById("new-day-form-nagy_szolgaltatok-inputs").clientWidth
      console.log(méret_ami_kell)
      összesen.style.width = `${méret_ami_kell}px`

      let összeadás_elemek_száma = document.getElementsByTagName("eredmény_container_nagy_szolgaltatok")
      let végösszeg = 0
      console.log(összeadás_elemek_száma.length)
      for (let i = 0; i < összeadás_elemek_száma.length; i++) {
         if (nagy_szolgaltatok_mértékegység.value !== "" && összeadás_elemek_száma[i] !== "") {
         let nagy_szolgaltatok_összeg = összeadás_elemek_száma[i].children[0].innerHTML
         nagy_szolgaltatok_összeg = commasToNumber(nagy_szolgaltatok_összeg.slice(0, -3))
         végösszeg += +nagy_szolgaltatok_összeg
         console.log(végösszeg)
         }
      for (let i = 2; i <= összeadás_elemek_száma.length; i++) {
         nagy_szolgaltatok_rendszám = document.getElementById(`nagy_szolgaltatok_mértékegység${i}`)
      }
      }
      console.log(végösszeg)
      document.getElementById("összesen-szám-nagy_szolgaltatok").innerHTML = `<h4>${numberWithCommas(végösszeg)} Ft</h4>`
      
   }

}

function load_data_alvallalkozoi_szerzodes(){
   document.getElementById("new-day-form").innerHTML += `<div class="new-day-form-wrapper" style="">
   <div style="display:flex; flex-direction: row;">
   <h3>Alvállalkozói Projekt Szerződések</h3>
   <a id="szerzodes_plus_gomb" class="new_day_hozzaad_gomb" style="text-decoration: none;">
      <div id="new-day-plus-gomb">
         <p style="font-size: 40px; color: #198754; margin-top: 8px; margin-left: 1px;">+</p>
      </div>
   </a>
   <a id="szerzodes_minus_gomb" class="new_day_torles_gomb" style="text-decoration: none;">
      <div id="new-day-plus-gomb">
         <p style="font-size: 40px; color: #198754; margin-top: 8px; margin-left: 0px;">-</p>
      </div>
   </a>
   </div>

   <div id="new-day-form-szerzodes-inputs" style="display: flex; justify-content: flex-start; align-items: flex-start;margin-left: 80px; margin-top: 40px;">
      
      <div id="szerzodes_kivitelezo_container">
         <h6>Kivitelező</h6>
         <input id="szerzodes_kivitelezo" class="szerzodes_kivitelezo" style="margin-right: 75px; margin-bottom: 30px; display: flex; flex-direction: row;">
         </input>
      </div>
      
      <div id="szerzodes_tevekenyseg_container">
         <h6>Tevékenység (rövid megnevezés)</h6>
         <input id="szerzodes_tevekenyseg" class="szerzodes_tevekenyseg" style="margin-right: 150px; margin-bottom: 30px; display: flex; flex-direction: row;">
         </input>
      </div>

      <div id="szerzodes_ár_container"  style="margin-right: 75px; display: flex; flex-direction: column;">
         <h6>Szerződéses Ár</h6>
         <input id="szerzodes_ár" class="szerzodes_ár" style="margin-bottom: 30px;">
      </div>
      <div id="new-day-form-termeszetes_ko">
   </div>
   </div>
   <div id="összesen-wrapper-szerzodes" style="display: flex; flex-direction: row; justify-content: flex-start; margin-left: 60%;">
      <div class="összesen-szöveg">
         <h4>Összesen:</h4>
      </div>
      <div id="összesen-szám-szerzodes" style="color: #C5EBC3;">
         
      </div>
   </div>

   </div>`

   function calculateÖsszeg(){
      let sum = 0

      for (let q = 0; q < document.getElementsByClassName("szerzodes_ár").length; q++) {
          sum += parseInt(document.getElementsByClassName("szerzodes_ár")[q].value)
      }
      //console.log(sum)
      if (isNaN(sum)) {
         document.getElementById("összesen-szám-szerzodes").innerHTML = ""
         document.getElementById("összesen-szám-szerzodes").innerHTML += `<h4>0 Ft</h4>`
      } else {
         document.getElementById("összesen-szám-szerzodes").innerHTML = ""
         document.getElementById("összesen-szám-szerzodes").innerHTML += `<h4>${numberWithCommas(sum.toString())} Ft</h4>`
      }

      vegosszeg_kiszamitasa()
   }

   function sorok_számának_megállapítása(){
      let len = document.getElementsByClassName("szerzodes_kivitelezo").length
      console.log(len)
      for (let q = 0; q < len; q++){
         //console.log(q)
         document.getElementsByClassName("szerzodes_kivitelezo")[q].oninput = function(){
            calculateÖsszeg()
         }
         document.getElementsByClassName("szerzodes_tevekenyseg")[q].oninput = function(){
            calculateÖsszeg()
         }
         document.getElementsByClassName("szerzodes_ár")[q].oninput = function(){
            calculateÖsszeg()
         }
      }
   }
   sorok_számának_megállapítása()

   let plus = document.getElementById("szerzodes_plus_gomb")
   plus.onclick = function() {
      const kivitelezo = document.getElementById("szerzodes_kivitelezo_container").children[document.getElementById("szerzodes_kivitelezo_container").children.length - 1]
      const tevekenyseg = document.getElementById("szerzodes_tevekenyseg_container").children[document.getElementById("szerzodes_tevekenyseg_container").children.length - 1]
      const szerzodes = document.getElementById("szerzodes_ár_container").children[document.getElementById("szerzodes_ár_container").children.length - 1]

      const kivitelezoClone = kivitelezo.cloneNode(true)
      const tevekenysegClone = tevekenyseg.cloneNode(true)
      const szerzodesClone = szerzodes.cloneNode(true)

      document.getElementById("szerzodes_kivitelezo_container").appendChild(kivitelezoClone)
      document.getElementById("szerzodes_tevekenyseg_container").appendChild(tevekenysegClone)
      document.getElementById("szerzodes_ár_container").appendChild(szerzodesClone) 

      setTimeout(() => {
         sorok_számának_megállapítása()
         calculateÖsszeg()
      }, 50);
   }

   let minus = document.getElementById("szerzodes_minus_gomb")
   minus.onclick = function() {
      if (document.getElementById("szerzodes_kivitelezo_container").children.length > 2){
         document.getElementById("szerzodes_kivitelezo_container").children[document.getElementById("szerzodes_kivitelezo_container").children.length - 1].remove()
         document.getElementById("szerzodes_tevekenyseg_container").children[document.getElementById("szerzodes_tevekenyseg_container").children.length - 1].remove()
         document.getElementById("szerzodes_ár_container").children[document.getElementById("szerzodes_ár_container").children.length - 1].remove()
         
         setTimeout(() => {
            sorok_számának_megállapítása()
            calculateÖsszeg()
         }, 50);
      }
   }  
}


function load_data_new_day_beton_SÉMA(endpoint_neve) {

   var url = `https://apa-alkalmazas.herokuapp.com/get-${endpoint_neve}`;

   var xhr = new XMLHttpRequest();
   xhr.open("GET", url);

   xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

   xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
      const beton_data = JSON.parse(xhr.responseText);
      console.log(beton_data)

      //------------------gyártók----------------------------
      let gyártó_group = beton_data.reduce((r, a) => {
         //console.log("a", a);
         //console.log('r', r);
         r[a.gyártó] = [...r[a.gyártó] || [], a];
         return r;
         }, {});

         const beton_gyártó = document.getElementById(`${endpoint_neve}-gyártó`)
         for (const i in gyártó_group) {
            //var cég = object.keys(group[i])
            const gyártó_object = gyártó_group[i]
            const gyártó = gyártó_object[0].gyártó //fogalmam sincs miért működik,de működik
            beton_gyártó.innerHTML += `<option value="${gyártó}">${gyártó}</option>`
         }
         console.log(gyártó_group);

         //------------------------típusok----------------------
         let típusok_group = beton_data.reduce((r, a) => {
         //console.log("a", a);
         //console.log('r', r);
         r[a.típus] = [...r[a.típus] || [], a];
         return r;
         }, {});

         const beton_típus = document.getElementById(`${endpoint_neve}_típus`)
         for (const i in típusok_group) {
            //var cég = object.keys(group[i])
            const típusok_object = típusok_group[i]
            const típus = típusok_object[0].típus //fogalmam sincs miért működik,de működik
            beton_típus.innerHTML += `<option value="${típus}">${típus}</option>`
         }
         console.log(típusok_group);



         //const munkaerő_cég = document.getElementById("munkaerő_cég")
         //const munkaerő_tevékenység = document.getElementById("munkaerő_tevékenység")
         const beton_ár = document.getElementById(`${endpoint_neve}_ár`)
         const beton_mennyiség = document.getElementById(`${endpoint_neve}_mennyiség`)
         const new_day_form_beton = document.getElementById(`new-day-form-${endpoint_neve}`)

         beton_gyártó.onchange=function() {
            beton_ármegjelenítés()
            vegosszeg_kiszamitasa()
         }
         beton_típus.onchange=function() {
            beton_ármegjelenítés()
            beton_összeadás()  
            vegosszeg_kiszamitasa()
         }
         beton_ár.oninput=function() {
            beton_számolás()
            beton_összeadás()
            vegosszeg_kiszamitasa()
         }
         beton_mennyiség.oninput=function() {
            beton_számolás()
            beton_összeadás()
            vegosszeg_kiszamitasa()
         }


         let eredmény_container = document.createElement(`eredmény_container_${endpoint_neve}`)
         let pff = new_day_form_beton.appendChild(eredmény_container)

         function beton_ármegjelenítés() {
            let van_találat = false
            if (beton_gyártó.value != "" && beton_típus.value != "") {
               //console.log("while-ból érkeztem")
               for (const i in beton_data) {
                  if (beton_data[i].gyártó == beton_gyártó.value && beton_data[i].típus == beton_típus.value) {
                     van_találat = true
                     console.log(beton_data[i].ár)
                     console.log(beton_data[i].kedvezményes_ár)
                     
                     if (beton_data[i].kedvezményes_ár == null || beton_data[i].kedvezményes_ár == "" || beton_data[i].kedvezményes_ár == "null" || beton_data[i].kedvezményes_ár == "0") {
                        beton_ár.value = beton_data[i].ár
                     } else {
                        beton_ár.value = beton_data[i].kedvezményes_ár
                        console.log(beton_data[i].kedvezményes_ár)
                     }

                     beton_számolás()
                  }
               }
               if (van_találat == false) {
                  beton_ár.value = ""
               }
            }
            
         }

         function beton_számolás() {
            if (beton_ár != "" && beton_mennyiség != "") {
               let ár = beton_ár.value
               let mennyiség = beton_mennyiség.value
               eredmény = ár*mennyiség
               pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(eredmény)} Ft</h4>`
            }   
         }


      const beton_plus_gomb = document.getElementById(`${endpoint_neve}_plus_gomb`)
      const beton_gyártó_container = document.getElementById(`${endpoint_neve}-gyártó_container`)
      const beton_típus_container = document.getElementById(`${endpoint_neve}_típus_container`)
      const beton_ár_container = document.getElementById(`${endpoint_neve}_ár_container`)
      const beton_mennyiség_container = document.getElementById(`${endpoint_neve}_mennyiség_container`)

      beton_plus_gomb.addEventListener("click", function() {
         let új_beton_gyártó = beton_gyártó_container.appendChild(beton_gyártó.cloneNode(true))
         új_beton_gyártó.style.marginTop = "20px"
         const div_elemek_beton_gyártó = document.getElementById(`${endpoint_neve}-gyártó_container`).children
         let szám1 = div_elemek_beton_gyártó.length-1
         új_beton_gyártó.id = `${endpoint_neve}_gyártó${szám1}`


         const új_beton_típus = beton_típus_container.appendChild(beton_típus.cloneNode(true))
         új_beton_típus.style.marginTop = "20px"
         const div_elemek_beton_típus = document.getElementById(`${endpoint_neve}_típus_container`).children
         let szám2 = div_elemek_beton_típus.length-1
         új_beton_típus.id = `${endpoint_neve}_típus${szám2}`


         const új_beton_ár = beton_ár_container.appendChild(beton_ár.cloneNode(true))
         új_beton_ár.style.marginTop = "20px"
         const div_elemek_beton_ár = document.getElementById(`${endpoint_neve}_ár_container`).children
         let szám3 = div_elemek_beton_ár.length-1
         új_beton_ár.id = `${endpoint_neve}_ár${szám3}`


         const új_beton_mennyiség = beton_mennyiség_container.appendChild(beton_mennyiség.cloneNode(true))
         új_beton_mennyiség.style.marginTop = "20px"
         const div_elemek_beton_mennyiség = document.getElementById(`${endpoint_neve}_mennyiség_container`).children
         let szám4 = div_elemek_beton_mennyiség.length-1
         új_beton_mennyiség.id = `${endpoint_neve}_mennyiség${szám4}`

         const page_content_new_day = document.getElementById("page-content-new-day")
         
         function add_math(sorszám) {
            const beton_gyártó = document.getElementById(`${endpoint_neve}_gyártó${sorszám}`)
            const beton_típus = document.getElementById(`${endpoint_neve}_típus${sorszám}`)
            const beton_ár = document.getElementById(`${endpoint_neve}_ár${sorszám}`)
            const beton_mennyiség = document.getElementById(`${endpoint_neve}_mennyiség${sorszám}`)
            const new_day_form_beton = document.getElementById(`new-day-form-${endpoint_neve}`)

            beton_gyártó.onchange=function() {
               beton_ármegjelenítés()
               vegosszeg_kiszamitasa()
            }
            beton_típus.onchange=function() {
               beton_ármegjelenítés()
               beton_összeadás()
               vegosszeg_kiszamitasa()
            }
            beton_ár.oninput=function() {
               beton_számolás()
               beton_összeadás()
               vegosszeg_kiszamitasa()
            }
            beton_mennyiség.oninput=function() {
               beton_számolás()
               beton_összeadás()
               vegosszeg_kiszamitasa()
            }

            let eredmény_container = document.createElement(`eredmény_container_${endpoint_neve}`)
            let pff = new_day_form_beton.appendChild(eredmény_container)

            function beton_ármegjelenítés() {
               let van_találat = false
               if (beton_gyártó.value != "" && beton_típus.value != "") {
                  //console.log("while-ból érkeztem")
                  for (const i in beton_data) {
                     if (beton_data[i].gyártó == beton_gyártó.value && beton_data[i].típus == beton_típus.value) {
                        van_találat = true
                        //console.log(beton_data[i].ár)
                        beton_ár.value = beton_data[i].ár
                        if (beton_data[i].kedvezményes_ár == null || beton_data[i].kedvezményes_ár == "" || beton_data[i].kedvezményes_ár == "null" || beton_data[i].kedvezményes_ár == "0") {
                           beton_ár.value = beton_data[i].ár
                        } else {
                           beton_ár.value = beton_data[i].kedvezményes_ár
                           console.log(beton_data[i].kedvezményes_ár)
                        }
                        beton_számolás()
                     } 
                  }
                  if (van_találat == false) {
                     beton_ár.value = ""
                  }
            }
            
            }
   
            function beton_számolás() {
               if (beton_ár != "" && beton_mennyiség != "") {
                  let ár = beton_ár.value
                  let mennyiség = beton_mennyiség.value
                  eredmény = ár*mennyiség
                  pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${numberWithCommas(eredmény)} Ft</h4>`
               }   
            }


         }
         add_math(szám1)

      })

      document.getElementById(`${endpoint_neve}_minus_gomb`).addEventListener("click", function() {
         if (document.getElementById(`${endpoint_neve}-gyártó_container`).children.length > 2) {
            torolni_valo = document.getElementById(`${endpoint_neve}-gyártó_container`)
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById(`${endpoint_neve}_típus_container`)
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById(`${endpoint_neve}_ár_container`)
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById(`${endpoint_neve}_mennyiség_container`)
            torolni_valo.removeChild(torolni_valo.lastChild);

            torolni_valo = document.getElementById(`new-day-form-${endpoint_neve}`)
            torolni_valo.removeChild(torolni_valo.lastChild);
            beton_összeadás()
            vegosszeg_kiszamitasa()
         }
      })

   }};

xhr.send();


   let összesen = document.getElementById(`összesen-wrapper-${endpoint_neve}`)
   let méret_ami_kell = document.getElementById(`new-day-form-${endpoint_neve}-inputs`).clientWidth*1
   console.log(méret_ami_kell)
   méret_ami_kell -= 100
   összesen.style.marginLeft = `${méret_ami_kell}px`


   function beton_összeadás() {
      let összeadás_elemek_száma = document.getElementsByTagName(`eredmény_container_${endpoint_neve}`)
      let végösszeg = 0
      console.log('ÖSSZEADÁS ELEMEK SZÁMA:',összeadás_elemek_száma.length)
      for (let i = 0; i < összeadás_elemek_száma.length; i++) {
         console.log('CHILDREN:',összeadás_elemek_száma[i].children[0].innerHTML)
         //if (beton_típus.value !== "" && összeadás_elemek_száma[i] !== "") {
         let beton_összeg = összeadás_elemek_száma[i].children[0].innerHTML
         beton_összeg = commasToNumber(beton_összeg.slice(0, -3))
         végösszeg += +beton_összeg
         console.log('VÉGÖSSZEG:',végösszeg)
      //}
      for (let i = 2; i <= összeadás_elemek_száma.length; i++) {
            beton_típus = document.getElementById(`${endpoint_neve}_típus`)
      }
   }
      console.log(végösszeg)
      document.getElementById(`összesen-szám-${endpoint_neve}`).innerHTML = `<h4>${numberWithCommas(végösszeg)} Ft</h4>`
      
   }

}

//-----------------------------------adatok posztolása a szerverre----------------------------------------------
function post_data_new_day() {


   document.getElementById("mentés_gomb").addEventListener("click", function() {

   if (document.referrer == "http://127.0.0.1:5500/screens/tervezett.html" || document.referrer == "http://127.0.0.1:5500/screens/tervezett" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett.html" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett" || localStorage.getItem("tervmod") == "true"){
      document.getElementById("adatok_mentése_wrapper").innerHTML = `
      <div class="loader-yellow"></div>`
   } else {
      document.getElementById("adatok_mentése_wrapper").innerHTML = `
      <div class="loader"></div>`
   }

   const munkaszám = document.getElementById("munkaszám").value
   const év = document.getElementById("év").value
   const hónap = document.getElementById("hónap").value
   const nap = document.getElementById("nap").value
   

   const MENTÉS_GOMB = document.getElementsByClassName("mentés_gomb")
   const munkaerő_elemek_száma = document.getElementById("munkaerő_cég_container").children.length-1
   const munkagépek_elemek_száma = document.getElementById("munkagepek_típus_container").children.length-1
   const teherautók_elemek_száma = document.getElementById("teherautók_típus_container").children.length-1
   const kis_szolgaltatok_elemek_száma = document.getElementById("kis-szolgaltatok_cég_container").children.length-1
   const nagy_szolgaltatok_elemek_száma = document.getElementById("nagy_szolgaltatok_cég_container").children.length-1
   const beton_elemek_száma = document.getElementById("beton-gyártó_container").children.length-1
   const terko_elemek_száma = document.getElementById("terko-gyártó_container").children.length-1
   const szorodo_elemek_száma = document.getElementById("szorodo-gyártó_container").children.length-1
   const aszfalt_elemek_száma = document.getElementById("aszfalt-gyártó_container").children.length-1
   const szegely_elemek_száma = document.getElementById("szegely-gyártó_container").children.length-1
   const kandelaber_elemek_száma = document.getElementById("kandelaber-gyártó_container").children.length-1
   const utcabutor_elemek_száma = document.getElementById("utcabutor-gyártó_container").children.length-1
   const beton_akna_elemek_száma = document.getElementById("beton_akna-gyártó_container").children.length-1
   const csatorna_cso_elemek_száma = document.getElementById("csatorna_cso-gyártó_container").children.length-1
   const nyomo_cso_elemek_száma = document.getElementById("nyomo_cso-gyártó_container").children.length-1
   const kerteszet_elemek_száma = document.getElementById("kerteszet-gyártó_container").children.length-1
   const termeszetes_ko_elemek_száma = document.getElementById("termeszetes_ko-gyártó_container").children.length-1
   console.log(munkaerő_elemek_száma)
   let ADATOK = []

   let munkaerő_adatok = []
   let munkaerő_adatok_végleges = []
   for (let i = 0; i <= munkaerő_elemek_száma; i++) {
      if (i == 1) {
         let munkaerő_cég = document.getElementById(`munkaerő_cég`).value
         let munkaerő_tevékenység = document.getElementById(`munkaerő_tevékenység`).value
         let munkaerő_egység_óra = document.getElementById(`munkaerő_egység_óra`).value
         let munkaerő_létszám = document.getElementById(`munkaerő_létszám`).value
         try {
            let ft_összeg = document.getElementsByTagName("eredmény_container_munkaerő")[i-1].children[0].innerText
            munkaerő_adatok.push(munkaerő_cég, munkaerő_tevékenység, munkaerő_egység_óra, munkaerő_létszám, ft_összeg)
         } catch {
            munkaerő_adatok.push(munkaerő_cég, munkaerő_tevékenység, munkaerő_egység_óra, munkaerő_létszám)
         }
         munkaerő_adatok_végleges.push(munkaerő_adatok)
         //munkaerő_adatok_végleges = []
         //console.log(munkaerő_adatok)
      }
      if (i >= 2) {
         munkaerő_adatok = []

         let munkaerő_cég = document.getElementById(`munkaerő_cég${i}`).value
         let munkaerő_tevékenység = document.getElementById(`munkaerő_tevékenység${i}`).value
         let munkaerő_egység_óra = document.getElementById(`munkaerő_egység_óra${i}`).value
         let munkaerő_létszám = document.getElementById(`munkaerő_létszám${i}`).value
         try {
            let ft_összeg = document.getElementsByTagName("eredmény_container_munkaerő")[i-1].children[0].innerText
            munkaerő_adatok.push(munkaerő_cég, munkaerő_tevékenység, munkaerő_egység_óra, munkaerő_létszám, ft_összeg)
         } catch {
            munkaerő_adatok.push(munkaerő_cég, munkaerő_tevékenység, munkaerő_egység_óra, munkaerő_létszám)
         }
         munkaerő_adatok_végleges.push(munkaerő_adatok)
         //munkaerő_adatok_végleges = []
         //console.log(munkaerő_adatok)
      }
   }

   let munkagépek_adatok = []
   let munkagépek_adatok_végleges = []
   for (let i = 0; i <= munkagépek_elemek_száma; i++) {
      if (i == 1) {
         let munkagepek_típus = document.getElementById(`munkagepek_típus`).value
         let munkagepek_rendszám = document.getElementById(`munkagepek_rendszám`).value
         let munkagepek_cég = document.getElementById(`munkagepek_cég`).value
         let munkagépek_óradíj = document.getElementById(`munkagépek_óradíj`).value
         let munkagépek_órák_száma = document.getElementById(`munkagépek_órák_száma`).value
         try {
            let ft_összeg = document.getElementsByTagName("eredmény_container_munkagepek")[i-1].children[0].innerText
            munkagépek_adatok.push(munkagepek_típus, munkagepek_rendszám, munkagepek_cég, munkagépek_óradíj, munkagépek_órák_száma, ft_összeg)
         } catch {
            munkagépek_adatok.push(munkagepek_típus, munkagepek_rendszám, munkagepek_cég, munkagépek_óradíj, munkagépek_órák_száma)
         }
         munkagépek_adatok_végleges.push(munkagépek_adatok)
         //console.log(munkaerő_adatok)
      }
      if (i >= 2) {
         munkagépek_adatok = []

         let munkagepek_típus = document.getElementById(`munkagépek_típus${i}`).value
         let munkagepek_rendszám = document.getElementById(`munkagépek_rendszám${i}`).value
         let munkagepek_cég = document.getElementById(`munkagépek_cég${i}`).value
         let munkagépek_óradíj = document.getElementById(`munkagépek_óradíj${i}`).value
         let munkagépek_órák_száma = document.getElementById(`munkagépek_órák${i}`).value
         try {
            let ft_összeg = document.getElementsByTagName("eredmény_container_munkagepek")[i-1].children[0].innerText
            munkagépek_adatok.push(munkagepek_típus, munkagepek_rendszám, munkagepek_cég, munkagépek_óradíj, munkagépek_órák_száma, ft_összeg)
         } catch {
            munkagépek_adatok.push(munkagepek_típus, munkagepek_rendszám, munkagepek_cég, munkagépek_óradíj, munkagépek_órák_száma)
         }
         munkagépek_adatok_végleges.push(munkagépek_adatok)
         //console.log(munkaerő_adatok)
      }
   }

   let teherautók_adatok = []
   let teherautók_adatok_végleges = []
   for (let i = 0; i <= teherautók_elemek_száma; i++) {
      if (i == 1) {
         let teherautók_típus = document.getElementById(`teherautók_típus`).value
         let teherautók_rendszám = document.getElementById(`teherautók_rendszám`).value
         let teherautók_cég = document.getElementById(`teherautók_cég`).value
         let teherautók_óradíj = document.getElementById(`teherautók_óradíj`).value
         let teherautók_órák_száma = document.getElementById(`teherautók_órák_száma`).value
         try {
            let ft_összeg = document.getElementsByTagName("eredmény_container_teherautók")[i-1].children[0].innerText
            teherautók_adatok.push(teherautók_típus, teherautók_rendszám, teherautók_cég, teherautók_óradíj, teherautók_órák_száma, ft_összeg)
         } catch {
            teherautók_adatok.push(teherautók_típus, teherautók_rendszám, teherautók_cég, teherautók_óradíj, teherautók_órák_száma)
         }
         teherautók_adatok_végleges.push(teherautók_adatok)
         //console.log(munkaerő_adatok)
      }
      if (i >= 2) {
         teherautók_adatok = []

         let teherautók_típus = document.getElementById(`teherautók_típus${i}`).value
         let teherautók_rendszám = document.getElementById(`teherautók_rendszám${i}`).value
         let teherautók_cég = document.getElementById(`teherautók_cég${i}`).value
         let teherautók_óradíj = document.getElementById(`teherautók_óradíj${i}`).value
         let teherautók_órák_száma = document.getElementById(`teherautók_órák${i}`).value
         try {
            let ft_összeg = document.getElementsByTagName("eredmény_container_teherautók")[i-1].children[0].innerText
            teherautók_adatok.push(teherautók_típus, teherautók_rendszám, teherautók_cég, teherautók_óradíj, teherautók_órák_száma, ft_összeg)
         } catch {
            teherautók_adatok.push(teherautók_típus, teherautók_rendszám, teherautók_cég, teherautók_óradíj, teherautók_órák_száma)
         }
         teherautók_adatok_végleges.push(teherautók_adatok)
         //console.log(munkaerő_adatok)
      }
   }

   let beton_adatok = []
   let beton_adatok_végleges = []
   for (let i = 0; i <= beton_elemek_száma; i++) {
      if (i == 1) {
         let beton_gyártó = document.getElementById(`beton-gyártó`).value
         let beton_típus = document.getElementById(`beton_típus`).value
         let beton_ár = document.getElementById(`beton_ár`).value
         let beton_mennyiség = document.getElementById(`beton_mennyiség`).value
         try {
            let ft_összeg = document.getElementsByTagName("eredmény_container_beton")[i-1].children[0].innerText
            beton_adatok.push(beton_gyártó, beton_típus, beton_ár, beton_mennyiség, ft_összeg)
         } catch {
            beton_adatok.push(beton_gyártó, beton_típus, beton_ár, beton_mennyiség)
         }
         beton_adatok_végleges.push(beton_adatok)
         //console.log(munkaerő_adatok)
      }
      if (i >= 2) {
         beton_adatok = []

         let beton_gyártó = document.getElementById(`beton_gyártó${i}`).value
         let beton_típus = document.getElementById(`beton_típus${i}`).value
         let beton_ár = document.getElementById(`beton_ár${i}`).value
         let beton_mennyiség = document.getElementById(`beton_mennyiség${i}`).value
         try {
            let ft_összeg = document.getElementsByTagName("eredmény_container_beton")[i-1].children[0].innerText
            beton_adatok.push(beton_gyártó, beton_típus, beton_ár, beton_mennyiség, ft_összeg)
         } catch {
            beton_adatok.push(beton_gyártó, beton_típus, beton_ár, beton_mennyiség)
         }
         beton_adatok_végleges.push(beton_adatok)
         //console.log(munkaerő_adatok)
      }
   }

   let kis_szolgaltatok_adatok = []
   let kis_szolgaltatok_adatok_végleges = []
   for (let i = 0; i <= kis_szolgaltatok_elemek_száma; i++) {
      if (i == 1) {
         let kis_szolgaltatok_cég = document.getElementById(`kis-szolgaltatok_cég`).value
         let kis_szolgaltatok_tevékenység = document.getElementById(`kis-szolgaltatok_tevékenység`).value
         let kis_szolgaltatok_óradíj = document.getElementById(`kis-szolgaltatok_óradíj`).value
         let kis_szolgaltatok_létszám = document.getElementById(`kis-szolgaltatok_órák_száma`).value
         try {
            let ft_összeg = document.getElementsByTagName("eredmény_container_kis-szolgaltatok")[i-1].children[0].innerText
            kis_szolgaltatok_adatok.push(kis_szolgaltatok_cég, kis_szolgaltatok_tevékenység, kis_szolgaltatok_óradíj, kis_szolgaltatok_létszám, ft_összeg)
         } catch {
            kis_szolgaltatok_adatok.push(kis_szolgaltatok_cég, kis_szolgaltatok_tevékenység, kis_szolgaltatok_óradíj, kis_szolgaltatok_létszám)
         }
         kis_szolgaltatok_adatok_végleges.push(kis_szolgaltatok_adatok)
         //munkaerő_adatok_végleges = []
         //console.log(munkaerő_adatok)
      }
      if (i >= 2) {
         kis_szolgaltatok_adatok = []

         let kis_szolgaltatok_cég = document.getElementById(`kis_szolgaltatok_cég${i}`).value
         let kis_szolgaltatok_tevékenység = document.getElementById(`kis_szolgaltatok_tevékenység${i}`).value
         let kis_szolgaltatok_óradíj = document.getElementById(`kis_szolgaltatok_óradíj${i}`).value
         let kis_szolgaltatok_létszám = document.getElementById(`kis_szolgaltatok_órák${i}`).value
         try {
            let ft_összeg = document.getElementsByTagName("eredmény_container_kis-szolgaltatok")[i-1].children[0].innerText
            kis_szolgaltatok_adatok.push(kis_szolgaltatok_cég, kis_szolgaltatok_tevékenység, kis_szolgaltatok_óradíj, kis_szolgaltatok_létszám, ft_összeg)
         } catch {
            kis_szolgaltatok_adatok.push(kis_szolgaltatok_cég, kis_szolgaltatok_tevékenység, kis_szolgaltatok_óradíj, kis_szolgaltatok_létszám)
         }
         kis_szolgaltatok_adatok_végleges.push(kis_szolgaltatok_adatok)
         //munkaerő_adatok_végleges = []
         //console.log(munkaerő_adatok)
      }
   }

   let nagy_szolgaltatok_adatok = []
   let nagy_szolgaltatok_adatok_végleges = []
   for (let i = 0; i <= nagy_szolgaltatok_elemek_száma; i++) {
      if (i == 1) {
         let nagy_szolgaltatok_cég = document.getElementById(`nagy_szolgaltatok_cég`).value
         let nagy_szolgaltatok_tevékenység = document.getElementById(`nagy_szolgaltatok_tevékenység`).value
         let nagy_szolgaltatok_mértékegység = document.getElementById(`nagy_szolgaltatok_mértékegység`).value
         let nagy_szolgaltatok_óradíj = document.getElementById(`nagy_szolgaltatok_óradíj`).value
         let nagy_szolgaltatok_órák_száma = document.getElementById(`nagy_szolgaltatok_órák_száma`).value
         try {
            let ft_összeg = document.getElementsByTagName("eredmény_container_nagy_szolgaltatok")[i-1].children[0].innerText
            console.log('TRY LEFUTOTT A NAGY SZOLG.-NÁL')
            nagy_szolgaltatok_adatok.push(nagy_szolgaltatok_cég, nagy_szolgaltatok_tevékenység, nagy_szolgaltatok_mértékegység, nagy_szolgaltatok_óradíj, nagy_szolgaltatok_órák_száma, ft_összeg)
         } catch {
            console.log('catch LEFUTOTT A NAGY SZOLG.-NÁL')
            nagy_szolgaltatok_adatok.push(nagy_szolgaltatok_cég, nagy_szolgaltatok_tevékenység, nagy_szolgaltatok_mértékegység, nagy_szolgaltatok_óradíj, nagy_szolgaltatok_órák_száma)
         }
         nagy_szolgaltatok_adatok_végleges.push(nagy_szolgaltatok_adatok)
         //munkaerő_adatok_végleges = []
         //console.log(munkaerő_adatok)
      }
      if (i >= 2) {
         nagy_szolgaltatok_adatok = []

         let nagy_szolgaltatok_cég = document.getElementById(`nagy_szolgaltatok_cég${i}`).value
         let nagy_szolgaltatok_tevékenység = document.getElementById(`nagy_szolgaltatok_tevékenység${i}`).value
         let nagy_szolgaltatok_mértékegység = document.getElementById(`nagy_szolgaltatok_mértékegység${i}`).value
         let nagy_szolgaltatok_óradíj = document.getElementById(`nagy_szolgaltatok_óradíj${i}`).value
         let nagy_szolgaltatok_órák_száma = document.getElementById(`nagy_szolgaltatok_órák${i}`).value
         try {
            let ft_összeg = document.getElementsByTagName("eredmény_container_nagy_szolgaltatok")[i-1].children[0].innerText
            nagy_szolgaltatok_adatok.push(nagy_szolgaltatok_cég, nagy_szolgaltatok_tevékenység, nagy_szolgaltatok_mértékegység, nagy_szolgaltatok_óradíj, nagy_szolgaltatok_órák_száma, ft_összeg)
         } catch {
            nagy_szolgaltatok_adatok.push(nagy_szolgaltatok_cég, nagy_szolgaltatok_tevékenység, nagy_szolgaltatok_mértékegység, nagy_szolgaltatok_óradíj, nagy_szolgaltatok_órák_száma)
         }
         nagy_szolgaltatok_adatok_végleges.push(nagy_szolgaltatok_adatok)
         //munkaerő_adatok_végleges = []
         //console.log(munkaerő_adatok)
      }
   }

   if (document.referrer == "http://127.0.0.1:5500/screens/tervezett.html" || document.referrer == "http://127.0.0.1:5500/screens/tervezett" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett.html" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett" || localStorage.getItem("tervmod") == "true"){
      let alvallalkozoi_adatok = [document.getElementById("munkaszám").value]
      let alvallalkozoi_adatok_VÉGLEGES = []

      //let munkaszám = document.getElementById("munkaszám").value

      for (let b = 0; b < document.getElementsByClassName("szerzodes_kivitelezo").length; b++){
         //console.log('apuci', document.getElementsByClassName("szerzodes_kivitelezo")[b])
         let kivitelezo = document.getElementsByClassName("szerzodes_kivitelezo")[b].value
         let tevekenyseg = document.getElementsByClassName("szerzodes_tevekenyseg")[b].value
         let szerzodeses_ar = document.getElementsByClassName("szerzodes_ár")[b].value

         alvallalkozoi_adatok.push(kivitelezo, tevekenyseg, szerzodeses_ar)
         alvallalkozoi_adatok.push(0)
         alvallalkozoi_adatok.push(0)
         alvallalkozoi_adatok.push(0)
         alvallalkozoi_adatok_VÉGLEGES.push(alvallalkozoi_adatok)
         alvallalkozoi_adatok = [document.getElementById("munkaszám").value]
      }
      console.log('alvallalkozoi_adatok_VÉGLEGES',alvallalkozoi_adatok_VÉGLEGES)

      var url = "https://apa-alkalmazas.herokuapp.com/post-alvallalkozoi_szerzodes";

      var xhr = new XMLHttpRequest();
      xhr.open("POST", url);

      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

      xhr.onreadystatechange = function () {
         if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);

            if (xhr.responseText == "") {
               document.getElementById("alvallalkozoi_error").innerHTML = '<h3 style="margin-bottom: 30px">Hiba Történt az Alvállalkozói Szerződések Mentésében!</h3>'
            }
         }};

      xhr.send(JSON.stringify(alvallalkozoi_adatok_VÉGLEGES));
   }


   function beton_post_SÉMA(tábla) {
      let adatok = []
      let adatok_végleges = []
      let elemek_száma = document.getElementById(`${tábla}-gyártó_container`).children.length-1
      console.log('Ennyi sor van:', elemek_száma)
      for (let i = 0; i <= elemek_száma; i++) { //beton_elemek_száma a baj!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         if (i == 1) {
            let beton_gyártó = document.getElementById(`${tábla}-gyártó`).value
            let beton_típus = document.getElementById(`${tábla}_típus`).value
            let beton_ár = document.getElementById(`${tábla}_ár`).value
            let beton_mennyiség = document.getElementById(`${tábla}_mennyiség`).value
            try {
               let ft_összeg = document.getElementsByTagName(`eredmény_container_${tábla}`)[i-1].children[0].innerText
               adatok.push(beton_gyártó, beton_típus, beton_ár, beton_mennyiség, ft_összeg)
            } catch {
               adatok.push(beton_gyártó, beton_típus, beton_ár, beton_mennyiség)
            }
            adatok_végleges.push(adatok)
            //console.log(munkaerő_adatok)
         }
         if (i >= 2) {
            adatok = []

            let beton_gyártó = document.getElementById(`${tábla}_gyártó${i}`).value
            let beton_típus = document.getElementById(`${tábla}_típus${i}`).value
            let beton_ár = document.getElementById(`${tábla}_ár${i}`).value
            let beton_mennyiség = document.getElementById(`${tábla}_mennyiség${i}`).value
            try {
               let ft_összeg = document.getElementsByTagName(`eredmény_container_${tábla}`)[i-1].children[0].innerText
               adatok.push(beton_gyártó, beton_típus, beton_ár, beton_mennyiség, ft_összeg)
            } catch {
               adatok.push(beton_gyártó, beton_típus, beton_ár, beton_mennyiség)
            }
            adatok_végleges.push(adatok)
            //console.log(munkaerő_adatok)
         }
      }
      return adatok_végleges
   }


   ADATOK.push(munkaerő_adatok_végleges,
               munkagépek_adatok_végleges, 
               teherautók_adatok_végleges, 
               beton_adatok_végleges, 
               kis_szolgaltatok_adatok_végleges, 
               nagy_szolgaltatok_adatok_végleges, 
               beton_post_SÉMA(tábla="terko"),
               beton_post_SÉMA(tábla="szorodo"),
               beton_post_SÉMA(tábla="aszfalt"),
               beton_post_SÉMA(tábla="szegely"),
               beton_post_SÉMA(tábla="kandelaber"),
               beton_post_SÉMA(tábla="utcabutor"),
               beton_post_SÉMA(tábla="beton_akna"),
               beton_post_SÉMA(tábla="csatorna_cso"),
               beton_post_SÉMA(tábla="nyomo_cso"),
               beton_post_SÉMA(tábla="kerteszet"),
               beton_post_SÉMA(tábla="termeszetes_ko"),)
   console.log('ELKÜLDENI KÍVÁNT ADATOK:',JSON.stringify(ADATOK), "+ az alvállalkozói project szerződések ha a sárga oldalon vagy")


   if (document.referrer == "http://127.0.0.1:5500/screens/tervezett.html" || document.referrer == "http://127.0.0.1:5500/screens/tervezett" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett.html" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett" || localStorage.getItem("tervmod") == "true"){
      var url = "https://apa-alkalmazas.herokuapp.com/post-tervezett";
   } else {
      var url = "https://apa-alkalmazas.herokuapp.com/post-munkanapok";
   }

   var xhr = new XMLHttpRequest();
   xhr.open("POST", url);

   xhr.setRequestHeader("Content-Type", "application/json");
   xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);
   xhr.setRequestHeader("Munkaszam", `${munkaszám}`);
   xhr.setRequestHeader("Ev", `${év}`);
   xhr.setRequestHeader("Honap", `${hónap}`);
   xhr.setRequestHeader("Nap", `${nap}`);

   xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
      response = xhr.responseText

      if (response == 'Sikeres hozzáadás') {
         document.getElementById("adatok_mentése_wrapper").innerHTML = `
         <h3 style="margin-bottom: 30px">Adatok mentve!</h3>
         `
         //<button id="mentés_gomb" class="mentés_gomb" style="width: 200px;">Adatok Mentése</button> csak adjál neki addeventlistenert is meg így simán nincs funkcionalitása
      }
      if (response == "") {
         if (document.referrer == "http://127.0.0.1:5500/screens/tervezett.html" || document.referrer == "http://127.0.0.1:5500/screens/tervezett" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett.html" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett" || localStorage.getItem("tervmod") == "true"){
            document.getElementById("adatok_mentése_wrapper").innerHTML = `
            <button id="mentés_gomb" class="mentés_gomb_sárga" style="width: 200px;">Adatok Mentése</button>
            <h3 style="margin-bottom: 30px">Hiba történt!</h3>`
         } else {
            document.getElementById("adatok_mentése_wrapper").innerHTML = `
            <button id="mentés_gomb" class="mentés_gomb" style="width: 200px;">Adatok Mentése</button>
            <h3 style="margin-bottom: 30px">Hiba történt! A mentés sikertelen</h3>`
         }

         
         setTimeout(() => {
            document.getElementById("mentés_gomb").onclick = post_data_new_day()
         }, 1000);
      }

   }};

   var data = JSON.stringify(ADATOK);

   xhr.send(data);

   

});
}



function load_data_new_day() {

   //oldalsó nav bar
   const oldalso_elemek = document.getElementsByClassName("egy_navigalo_elem")
   console.log('OLDALSÓ ELEMEK',oldalso_elemek)
   let görgetési_táv = 0
   for (const r in oldalso_elemek) {
      oldalso_elemek[r].onclick = function() {
         console.log(r)
         window.scroll({
            top: 380 + 319.6 * parseInt(r),
            left: 0,
            behavior: 'smooth'
          });
      }
   }

   load_data_new_day_emberek()
   load_data_new_day_munkagepek()
   load_data_new_day_teherautók()
   load_data_new_day_beton()
   load_data_new_day_kis_szolgaltatok()
   load_data_new_day_nagy_szolgaltatok()
   post_data_new_day()

   //azért kellenek a settimeout-ok mert kulonben annyi request érkezik a szerverre amit az adatbázis nem képes feldolgozni
   setTimeout(() => {
      load_data_new_day_beton_SÉMA(endpoint_neve="terko")
   }, 500)
   setTimeout(() => {
      load_data_new_day_beton_SÉMA(endpoint_neve="szorodo")
   }, 1000)
   setTimeout(() => {
      load_data_new_day_beton_SÉMA(endpoint_neve="aszfalt")
   }, 1500)
   setTimeout(() => {
      load_data_new_day_beton_SÉMA(endpoint_neve="szegely")
   }, 2000)
   setTimeout(() => {
      load_data_new_day_beton_SÉMA(endpoint_neve="kandelaber")
   }, 2500)
   setTimeout(() => {
      load_data_new_day_beton_SÉMA(endpoint_neve="utcabutor")
   }, 3000)
   setTimeout(() => {
      load_data_new_day_beton_SÉMA(endpoint_neve="beton_akna")
   }, 3500)
   setTimeout(() => {
      load_data_new_day_beton_SÉMA(endpoint_neve="csatorna_cso")
   }, 4000)
   setTimeout(() => {
      load_data_new_day_beton_SÉMA(endpoint_neve="nyomo_cso")
   }, 4500)
   setTimeout(() => {
      load_data_new_day_beton_SÉMA(endpoint_neve="kerteszet")
   }, 5000)
   setTimeout(() => {
      load_data_new_day_beton_SÉMA(endpoint_neve="termeszetes_ko")
   }, 5500)

   //loading eltuntetése a lépernyőről
   setTimeout(() => {
      console.log("loading:",document.getElementsByClassName("new-day-loading")[0])
      document.getElementsByClassName("new-day-loading")[0].remove()
   }, 6000)

   //tervezett munkaszámai a munkaszám mezőbe
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
                document.getElementById('munkaszám').innerHTML += `<option value="${adat[q].munkaszám}">${adat[q].munkaszám}</option>`
                //console.log(adat[q].munkaszám)
             }
          }};
       xhr.send();
}



function numberWithCommas(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function commasToNumber(y) {
   return parseInt(y.toString().replace(/ /g, ''));
}



function vegosszeg_kiszamitasa() {
   
   function calculateVégösszeg(bemenet) {
      try {
         function_bemenet = commasToNumber(document.getElementById(`összesen-szám-${bemenet}`).children[0].innerText.slice(0, -3))
         //console.log("TRY LEFUTOTT")
      } catch {
         function_bemenet = 0
         //console.log("CATCH LEFUTOTT")
      }
      function_bemenet = parseInt(function_bemenet)
      console.log("FUNCTION BEMENET",function_bemenet)
      return function_bemenet
   }

   // let munkaerő = calculateVégösszeg(bemenet='munkaerő')
   // let munkagépek = calculateVégösszeg(bemenet='munkagépek')
   // let teherautók = calculateVégösszeg(bemenet='teherautók')
   // let beton = calculateVégösszeg(bemenet='beton')
   // let munkaerő = document.getElementById("összesen-szám-munkaerő")
   // try {
   //    munkaerő = commasToNumber(munkaerő.children[0].innerText.slice(0, -3))
   // } catch {
   //    munkaerő = 0
   // }

   // let munkagépek = document.getElementById("összesen-szám-munkagépek")
   // try {
   //    munkagépek = commasToNumber(munkagépek.children[0].innerText.slice(0, -3))
   // } catch {
   //    munkagépek = 0
   // }

   // let teherautók = document.getElementById("összesen-szám-teherautók")
   // try {
   //    teherautók = commasToNumber(teherautók.children[0].innerText.slice(0, -3))
   // } catch {
   //    teherautók = 0
   // }

   // let beton = document.getElementById("összesen-szám-beton")
   // try {
   //    beton = commasToNumber(beton.children[0].innerText.slice(0, -3))
   // } catch {
   //    beton = 0
   // }
   //console.log(calculateVégösszeg(bemenet='munkaerő') +calculateVégösszeg(bemenet='munkagépek') + calculateVégösszeg(bemenet='teherautók') +   calculateVégösszeg(bemenet='kis-szolgaltatok') +calculateVégösszeg(bemenet='nagy-szolgaltatok'))
   
   vegosszeg = calculateVégösszeg(bemenet='munkaerő') +
               calculateVégösszeg(bemenet='munkagépek') +
               calculateVégösszeg(bemenet='teherautók') +
               calculateVégösszeg(bemenet='kis-szolgaltatok') +
               calculateVégösszeg(bemenet='nagy_szolgaltatok') +
               calculateVégösszeg(bemenet='beton') +
               calculateVégösszeg(bemenet='terko') +
               calculateVégösszeg(bemenet='szorodo') +
               calculateVégösszeg(bemenet='aszfalt') +
               calculateVégösszeg(bemenet='szegely') +
               calculateVégösszeg(bemenet='kandelaber') +
               calculateVégösszeg(bemenet='utcabutor') +
               calculateVégösszeg(bemenet='beton_akna') +
               calculateVégösszeg(bemenet='csatorna_cso') +
               calculateVégösszeg(bemenet='nyomo_cso') + 
               calculateVégösszeg(bemenet='kerteszet') +
               calculateVégösszeg(bemenet='termeszetes_ko') +
               calculateVégösszeg(bemenet='szerzodes')

   console.log("Ennyi a munkaerő: " + `${vegosszeg}`)
   document.getElementById("vegosszeg").innerText = `Mindösszesen: ${numberWithCommas(vegosszeg)} Ft`

}

if (location.href.match("/screens/new-day.html")) {
   
   if (document.referrer == "http://127.0.0.1:5500/screens/tervezett.html" || document.referrer == "http://127.0.0.1:5500/screens/tervezett" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett.html" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett" || localStorage.getItem("tervmod") == "true"){
      load_data_alvallalkozoi_szerzodes()
      
      document.getElementsByTagName("body")[0].style.backgroundColor = "rgb(17, 17, 11)"
      document.getElementById("new-day-header").children[0].innerText = "Project Költség Tervező"
      document.getElementsByClassName("new-day-loading")[0].children[0].className = "loader-yellow"
      document.getElementById("mentés_gomb").className = "mentés_gomb_sárga"
      

      document.getElementById("munkaszám").outerHTML = '<input id="munkaszám" style="margin-right: 200px; min-width: 130px;"></input>'
      
      let len
      len = document.getElementsByTagName("input")
      for (let i = 0; i < len.length; i++){
         len[i].style.backgroundColor = "#F2E86D"
      }
      len = document.getElementsByTagName("select")
      for (let i = 0; i < len.length; i++){
         len[i].style.backgroundColor = "#F2E86D"
      }
      len = document.getElementsByClassName("rounded")
      for (let i = 0; i < len.length; i++){
         len[i].style.borderColor  = "#F2E86D"
      }
      
      len = document.getElementsByClassName("egy_navigalo_elem")
      for (let i = 0; i < len.length; i++){
         len[i].style.filter = "sepia(100%)";
      }

      
   }

   load_data_new_day()
}

if (location.href.match("/sajat_szerzodesek.html")) {
   get_sajat_szerzodes()
   post_sajat_szerzodes()
}
if (location.href.match("/alvallalkozoi_szerzodesek.html")) {
   get_alvallalkozoi_szerzodes()
   post_alvallalkozoi_szerzodes()
}
if (location.href.match("/screens/adatbazis_oldalak/emberek.html")) {
    get_emberek()
    post_emberek()
}
if (location.href.match("/screens/adatbazis_oldalak/munkagepek.html")) {
    get_munkagepek()
    post_munkagepek()
}
if (location.href.match("/screens/adatbazis_oldalak/beton.html")) {
    get_beton()
    post_beton()
}
if (location.href.match("/screens/adatbazis_oldalak/teherautok.html")) {
    get_teherautok()
    post_teherautok()
}
if (location.href.match("/screens/adatbazis_oldalak/szorodo.html")) {
    get_szorodo()
    post_szorodo()
}
if (location.href.match("/screens/adatbazis_oldalak/terko.html")) {
    get_terko()
    post_terko()
}
if (location.href.match("/screens/adatbazis_oldalak/szegely.html")) {
    get_szegely()
    post_szegely()
}
if (location.href.match("/screens/adatbazis_oldalak/aszfalt.html")) {
    get_aszfalt()
    post_aszfalt()
}
if (location.href.match("/screens/adatbazis_oldalak/kis-szolgaltatok.html")) {
    get_kis_szolgaltatok()
    post_kis_szolgaltatok()
}
if (location.href.match("/screens/adatbazis_oldalak/nagy-szolgaltatok.html")) {
    get_nagy_szolgaltatok()
    post_nagy_szolgaltatok()
}

if (location.href.match("/screens/adatbazis_oldalak/kandelaber.html")) {
   get_kandelaber()
   post_kandelaber()
}
if (location.href.match("/screens/adatbazis_oldalak/utcabutor.html")) {
   get_utcabutor()
   post_utcabutor()
}
if (location.href.match("/screens/adatbazis_oldalak/beton_akna.html")) {
   get_beton_akna()
   post_beton_akna()
}
if (location.href.match("/screens/adatbazis_oldalak/csatorna_cso.html")) {
   get_csatorna_cso()
   post_csatorna_cso()
}
if (location.href.match("/screens/adatbazis_oldalak/nyomo_cso.html")) {
   get_nyomo_cso()
   post_nyomo_cso()
}
if (location.href.match("/screens/adatbazis_oldalak/kerteszet.html")) {
   get_kerteszet()
   post_kerteszet()
}
if (location.href.match("/screens/adatbazis_oldalak/termeszetes_ko.html")) {
   get_termeszetes_ko()
   post_termeszetes_ko()
}

if (location.href.match("/screens/%C3%B6sszes%C3%ADt%C5%91k.html")) {
   localStorage.setItem("tervmod", "false")
   if(performance.navigation.type == 2){
      location.reload(true);
   }
      load_day_data()
}
