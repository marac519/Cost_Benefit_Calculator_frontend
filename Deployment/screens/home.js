

async function load_day_data() {
var url = "https://apa-alkalmazas.herokuapp.com/get-munkanapok";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      //console.log(xhr.responseText);
      data = JSON.parse(xhr.responseText)
      localStorage.setItem("munkanapok_adatok", `${xhr.responseText}`)
      const lista = document.getElementById('napi-munkák-lista')
      data = data.sort((idA, idB) => idB.id - idA.id,)
      
      for (const i in data) {
          let datum = data[i].dátum
          datum = datum.slice(0, 16)
          lista.innerHTML += `<div class="card" id="${data[i].id}" style="width: 18rem; margin-right: 30px; margin-top:20px; background-color: black; border: 1px solid #C5EBC3;">
          <div class="card-img-top" style="height: 150px; background-color: grey;"></div>
          <div class="card-body" style="margin-right:20px">
            <h5 class="card-title" style="color: #C5EBC3">${datum}</h5>
            <p class="card-text" style="color: #C5EBC3">${data[i].emberek}</p>
            <p class="card-text" style="color: #C5EBC3">${data[i].munkagépek.slice(0, 1)}</p>
            <a href="/screens/megnezem.html" class="btn btn-success megnezem">Megnézem</a>
          </div>
        </div>`
      }
      document.getElementById("összesítő-loader").remove()


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
      const lista = document.getElementById('emberek-lista-get')
      for (const i in data) {
        lista.innerHTML += `<tr style="border-bottom: 2px solid;
        border-color: aliceblue;">
        <td style="padding-top: 13px">${data[i].id}</td>
        <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
        <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
        <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
      </tr>`
      }
   }};
   
setTimeout(function(){
   xhr.send();
},1000)


setTimeout(function(){
   window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
},2000)

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
     const lista = document.getElementById('munkagépek-lista-get')
     for (const i in data) {
       lista.innerHTML += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].típus}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].rendszám}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].óradíj}</td>
     </tr>`
     }
  }};
  
setTimeout(function(){
  xhr.send();
},1000)


setTimeout(function(){
  window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
},2000)

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
     const lista = document.getElementById('beton-lista-get')
     for (const i in data) {
       lista.innerHTML += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].típus}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].kedvezményes_ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].gyártó}</td>
     </tr>`
     }
  }};
  
setTimeout(function(){
  xhr.send();
},1000)


setTimeout(function(){
  window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
},2000)

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
     const lista = document.getElementById('teherautok-lista-get')
     for (const i in data) {
       lista.innerHTML += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].típus}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].rendszám}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].óradíj}</td>
     </tr>`
     }
  }};
  
setTimeout(function(){
  xhr.send();
},1000)


setTimeout(function(){
  window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
},2000)

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
     const lista = document.getElementById('beton-lista-get')
     for (const i in data) {
       lista.innerHTML += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].típus}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].kedvezményes_ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].gyártó}</td>
     </tr>`
     }
  }};
  
setTimeout(function(){
  xhr.send();
},1000)


setTimeout(function(){
  window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
},2000)

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
     const lista = document.getElementById('beton-lista-get')
     for (const i in data) {
       lista.innerHTML += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].típus}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].kedvezményes_ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].gyártó}</td>
     </tr>`
     }
  }};
  
setTimeout(function(){
  xhr.send();
},1000)


setTimeout(function(){
  window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
},2000)

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
     const lista = document.getElementById('beton-lista-get')
     for (const i in data) {
       lista.innerHTML += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].típus}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].kedvezményes_ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].gyártó}</td>
     </tr>`
     }
  }};
  
setTimeout(function(){
  xhr.send();
},1000)


setTimeout(function(){
  window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
},2000)

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
     const lista = document.getElementById('beton-lista-get')
     for (const i in data) {
       lista.innerHTML += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].típus}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].kedvezményes_ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].gyártó}</td>
     </tr>`
     }
  }};
  
setTimeout(function(){
  xhr.send();
},1000)


setTimeout(function(){
  window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
},2000)

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
     const lista = document.getElementById('beton-lista-get')
     for (const i in data) {
       lista.innerHTML += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].ár}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].óradíj}</td>
     </tr>`
     }
  }};
  
setTimeout(function(){
  xhr.send();
},1000)


setTimeout(function(){
  window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
},2000)

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
     const lista = document.getElementById('beton-lista-get')
     for (const i in data) {
       lista.innerHTML += `<tr style="border-bottom: 2px solid;
       border-color: aliceblue;">
       <td style="padding-top: 13px">${data[i].id}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].cég}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].tevékenység}</td>
       <td style="padding-left: 80px; padding-top: 13px">${data[i].szerződéses_ár}</td>
       
     </tr>`
     }
  }};
  
setTimeout(function(){
  xhr.send();
},1000)


setTimeout(function(){
  window.scrollTo(0, document.body.scrollHeight+1000000000 || document.documentElement.scrollHeight+1000000000);
},2000)

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
            //let gyártó = document.getElementById(`beton_gyártó_add_${i}`).value

            beton = [típus, ár, kedvezményes_ár]
            VEGLEGES_ADATOK.push(beton)
            //console.log(beton)

            document.getElementById(`beton_típus_add_${i}`).remove()
            document.getElementById(`beton_ár_add_${i}`).remove()
            document.getElementById(`beton_kedvezményes_ár_add_${i}`).remove()
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
            //let gyártó = lista.children[i].children[4].innerText

            lista.children[i].children[1].innerHTML = `<td><input value="${típus}" style="width: 130px"></input></td>`
            lista.children[i].children[2].innerHTML = `<td><input value="${ár}" style="width: 150px"></input></td>`
            lista.children[i].children[3].innerHTML = `<td><input value="${kedvezményes_ár}"  style="width: 100px"></input></td>`
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
         }
         munkaerő_tevékenység.onchange=function() {
         emberek_számolás()  
         munkaerő_összeadás()
         }
         munkaerő_létszám.oninput=function() {
            emberek_számolás()
            munkaerő_összeadás()
         }
         munkaerő_egység_óra.onchange=function() {
            emberek_számolás()
            munkaerő_összeadás()
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
                  pff.innerHTML = `<h4 style="color:#C5EBC3; margin-top: 32px">${eredmény} Ft</h4>`

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
            }
            munkaerő_tevékenység.onchange=function() {
            emberek_számolás()  
            munkaerő_összeadás()
            }
            munkaerő_létszám.oninput=function() {
               emberek_számolás()
               munkaerő_összeadás()
            }
            munkaerő_egység_óra.onchange=function() {
               emberek_számolás()
               munkaerő_összeadás()
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
                     
                     pff.innerHTML = `<h4 style="color:#C5EBC3; margin-top: 32px">${eredmény} Ft</h4>`

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
      munkaerő_összeg = munkaerő_összeg.slice(0, -3)
      végösszeg += +munkaerő_összeg
      console.log(végösszeg)
   }
   for (let i = 2; i <= összeadás_elemek_száma.length; i++) {
      munkaerő_létszám = document.getElementById(`munkaerő_létszám${i}`)
   }
}
   console.log(végösszeg)
   document.getElementById("összesen-szám-munkaerő").innerHTML = `<h4>${végösszeg} Ft</h4>`
   
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
         }
         munkagépek_óradíj.oninput=function() {
            munkagépek_számolás()
            munkagépek_összeadás()
         }

         munkagépek_órák_száma.onchange=function() {
            munkagépek_számolás()
            munkagépek_összeadás()
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
               if (óradíj_vagy_napidíj == false) {
                  munkagépek_órák_száma.classList.add("hidden")
                  document.getElementById("munkagépek_órák_száma").value = 1
                  pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${óradíj} Ft</h4>`
               } else {
                  munkagépek_órák_száma.classList.remove("hidden")

                  eredmény = óradíj*órák_száma
                  pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${eredmény} Ft</h4>`

               }
         }
      }}


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
            }
            munkagépek_óradíj.oninput=function() {
               munkagépek_számolás()
               munkagépek_összeadás()
            }
   
            munkagépek_órák_száma.onchange=function() {
               munkagépek_számolás()
               munkagépek_összeadás()
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
                     if (óradíj_vagy_napidíj == false) {
                        munkagépek_órák_száma.classList.add("hidden")
                        document.getElementById(`munkagépek_órák${+i+2}`).value = 1
                        pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${óradíj} Ft</h4>`
                     } else {
                        munkagépek_órák_száma.classList.remove("hidden")
      
                        eredmény = óradíj*órák_száma
                        pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${eredmény} Ft</h4>`
      
                     }
               }
            }}

         }
         add_math(szám1)
   
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
         munkagép_összeg = munkagép_összeg.slice(0, -3)
         végösszeg += +munkagép_összeg
         console.log(végösszeg)
      }
      for (let i = 2; i <= összeadás_elemek_száma.length; i++) {
         munkagép_rendszám = document.getElementById(`munkagepek_rendszám${i}`)
      }
   }
      console.log(végösszeg)
      document.getElementById("összesen-szám-munkagépek").innerHTML = `<h4>${végösszeg} Ft</h4>`
      
   }

   
}
async function load_data_new_day_teherautók() {
   
   var url = "https://apa-alkalmazas.herokuapp.com/get-teherautók";

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
         }
         teherautók_óradíj.oninput=function() {
            teherautók_számolás()
            teherautók_összeadás()
         }

         teherautók_órák_száma.onchange=function() {
            teherautók_számolás()
            teherautók_összeadás()
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
               if (óradíj_vagy_napidíj == false) {
                  teherautók_órák_száma.classList.add("hidden")
                  document.getElementById("teherautók_órák_száma").value = 1
                  pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${óradíj} Ft</h4>`
               } else {
                  teherautók_órák_száma.classList.remove("hidden")

                  eredmény = óradíj*órák_száma
                  console.log(órák_száma)
                  pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${eredmény} Ft</h4>`

               }
         }
      }}
      
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
            }
            teherautók_óradíj.oninput=function() {
               teherautók_számolás()
               teherautók_összeadás()
            }
   
            teherautók_órák_száma.onchange=function() {
               teherautók_számolás()
               teherautók_összeadás()
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
                     if (óradíj_vagy_napidíj == false) {
                        teherautók_órák_száma.classList.add("hidden")
                        //document.getElementById(`teherautók_órák${+i-4}`).value = 1
                        pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${óradíj} Ft</h4>`
                     } else {
                        teherautók_órák_száma.classList.remove("hidden")
      
                        eredmény = óradíj*órák_száma
                        pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${eredmény} Ft</h4>`
      
                     }
               }
            }}


         }
         add_math(szám1)

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
         teherautók_összeg = teherautók_összeg.slice(0, -3)
         végösszeg += +teherautók_összeg
         console.log(végösszeg)
      }
      for (let i = 2; i <= összeadás_elemek_száma.length; i++) {
         teherautók_rendszám = document.getElementById(`teherautók_rendszám${i}`)
      }
   }
      console.log(végösszeg)
      document.getElementById("összesen-szám-teherautók").innerHTML = `<h4>${végösszeg} Ft</h4>`
      
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
         }
         beton_típus.onchange=function() {
            beton_ármegjelenítés()
            beton_összeadás()  
         }
         beton_ár.oninput=function() {
            beton_számolás()
            beton_összeadás()
         }
         beton_mennyiség.oninput=function() {
            beton_számolás()
            beton_összeadás()
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
               pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${eredmény} Ft</h4>`
            }   
         }


      const beton_plus_gomb = document.getElementById("beton_plus_gomb")
      const beton_gyártó_container = document.getElementById("beton-gyártó_container")
      const betpn_típus_container = document.getElementById("beton_típus_container")
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
            }
            beton_típus.onchange=function() {
               beton_ármegjelenítés()
               beton_összeadás()
            }
            beton_ár.oninput=function() {
               beton_számolás()
               beton_összeadás()
            }
            beton_mennyiség.oninput=function() {
               beton_számolás()
               beton_összeadás()
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
                  pff.innerHTML = `<h4 style="color: #C5EBC3; margin-top: 32px">${eredmény} Ft</h4>`
               }   
            }


         }
         add_math(szám1)

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
         beton_összeg = beton_összeg.slice(0, -3)
         végösszeg += +beton_összeg
         console.log(végösszeg)
      }
      for (let i = 2; i <= összeadás_elemek_száma.length; i++) {
         beton_típus = document.getElementById(`beton_típus${i}`)
      }
   }
      console.log(végösszeg)
      document.getElementById("összesen-szám-beton").innerHTML = `<h4>${végösszeg} Ft</h4>`
      
   }

}


//-----------------------------------adatok posztolása a szerverre----------------------------------------------
function post_data_new_day() {
document.getElementById("mentés_gomb").addEventListener("click", function() {
   document.getElementById("adatok_mentése_wrapper").innerHTML = `

   <div class="loader"></div>
   `
   const MENTÉS_GOMB = document.getElementsByClassName("mentés_gomb")
   const munkaerő_elemek_száma = document.getElementById("munkaerő_cég_container").children.length-1
   const munkagépek_elemek_száma = document.getElementById("munkagepek_típus_container").children.length-1
   const teherautók_elemek_száma = document.getElementById("teherautók_típus_container").children.length-1
   const beton_elemek_száma = document.getElementById("beton-gyártó_container").children.length-1
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
         munkaerő_adatok.push(munkaerő_cég, munkaerő_tevékenység, munkaerő_egység_óra, munkaerő_létszám)
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
         munkaerő_adatok.push(munkaerő_cég, munkaerő_tevékenység, munkaerő_egység_óra, munkaerő_létszám)
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
         munkagépek_adatok.push(munkagepek_típus, munkagepek_rendszám, munkagepek_cég, munkagépek_óradíj, munkagépek_órák_száma)
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
         munkagépek_adatok.push(munkagepek_típus, munkagepek_rendszám, munkagepek_cég, munkagépek_óradíj, munkagépek_órák_száma)
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
         teherautók_adatok.push(teherautók_típus, teherautók_rendszám, teherautók_cég, teherautók_óradíj, teherautók_órák_száma)
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
         teherautók_adatok.push(teherautók_típus, teherautók_rendszám, teherautók_cég, teherautók_óradíj, teherautók_órák_száma)
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
         beton_adatok.push(beton_gyártó, beton_típus, beton_ár, beton_mennyiség)
         beton_adatok_végleges.push(beton_adatok)
         //console.log(munkaerő_adatok)
      }
      if (i >= 2) {
         beton_adatok = []

         let beton_gyártó = document.getElementById(`beton_gyártó${i}`).value
         let beton_típus = document.getElementById(`beton_típus${i}`).value
         let beton_ár = document.getElementById(`beton_ár${i}`).value
         let beton_mennyiség = document.getElementById(`beton_mennyiség${i}`).value
         beton_adatok.push(beton_gyártó, beton_típus, beton_ár, beton_mennyiség)
         beton_adatok_végleges.push(beton_adatok)
         //console.log(munkaerő_adatok)
      }
   }
   ADATOK.push(munkaerő_adatok_végleges, munkagépek_adatok_végleges, teherautók_adatok_végleges, beton_adatok_végleges)
   console.log(JSON.stringify(ADATOK))


   var url = "https://apa-alkalmazas.herokuapp.com/post-munkanapok";

   var xhr = new XMLHttpRequest();
   xhr.open("POST", url);

   xhr.setRequestHeader("Content-Type", "application/json");
   xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);

   xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
      response = xhr.responseText

      if (response == 'Sikeres hozzáadás') {
         document.getElementById("adatok_mentése_wrapper").innerHTML = `
         <button id="mentés_gomb" style="width: 200px;">Adatok Mentése</button>
         <h3 style="margin-bottom: 30px">Adatok mentve!</h3>`
      }
      if (response == "") {
         document.getElementById("adatok_mentése_wrapper").innerHTML = `
         <button id="mentés_gomb" class="mentés_gomb" style="width: 200px;">Adatok Mentése</button>
         <h3 style="margin-bottom: 30px">Hiba történt!</h3>`
      }

   }};

   var data = JSON.stringify(ADATOK);

   xhr.send(data);

   

})
}



function load_data_new_day() {
   load_data_new_day_emberek()
   load_data_new_day_munkagepek()
   load_data_new_day_teherautók()
   load_data_new_day_beton()
   post_data_new_day()
}



if (location.href.match("/screens/new-day.html")) {
   load_data_new_day()
}

if (location.href.match("/screens/emberek.html")) {
    get_emberek()
    post_emberek()
}
if (location.href.match("/screens/munkagepek.html")) {
    get_munkagepek()
    post_munkagepek()
}
if (location.href.match("/screens/beton.html")) {
    get_beton()
    post_beton()
}
if (location.href.match("/screens/teherautok.html")) {
    get_teherautok()
    post_teherautok()
}
if (location.href.match("/screens/szorodo.html")) {
    get_szorodo()
    post_szorodo()
}
if (location.href.match("/screens/terko.html")) {
    get_terko()
    post_terko()
}
if (location.href.match("/screens/szegely.html")) {
    get_szegely()
    post_szegely()
}
if (location.href.match("/screens/aszfalt.html")) {
    get_aszfalt()
    post_aszfalt()
}
if (location.href.match("/screens/kis-szolgaltatok.html")) {
    get_kis_szolgaltatok()
    post_kis_szolgaltatok()
}
if (location.href.match("/screens/nagy-szolgaltatok.html")) {
    get_nagy_szolgaltatok()
    post_nagy_szolgaltatok()
}

if (location.href.match("/screens/%C3%B6sszes%C3%ADt%C5%91k.html")) {
   if(performance.navigation.type == 2){
      location.reload(true);
   }
      load_day_data()
}
