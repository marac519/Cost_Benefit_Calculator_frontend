async function megnezem_page() {
   
    //const datum_ertek = localStorage.getItem("dátum")
    //const munkaero_ertek = localStorage.getItem("emberek")
    //const munkagepek_ertek = localStorage.getItem("munkagépek")
 
    //console.log(localStorage.getItem("dátum"))
    //console.log(localStorage.getItem("emberek"))
    //console.log(localStorage.getItem("munkagépek"))

    

    //console.log(JSON.parse(localStorage.getItem("munkanapok_adatok"))[0].beton[0])
    let data = JSON.parse(localStorage.getItem("munkanapok_adatok"))
    console.log(data)
    console.log(localStorage.getItem("id"))

    for (const i in data) {
        //console.log(data[i])
        if (localStorage.getItem("id") == data[i].id) {
            //console.log(data[i].id)

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


            document.getElementById("dátum").innerText = `${nap}, ${hónap} ${hanyadika}`
           
            let emberek_összesen = 0
            for (const elemek in data[i].emberek) {
               if (data[i].emberek[elemek][0] != ""){
                  document.getElementById("munkaerő-table").innerHTML += `
                      <tr>
                          <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].emberek[elemek][0]}</td>
                          <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].emberek[elemek][1]}</td>
                          <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].emberek[elemek][2]}</td>
                          <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].emberek[elemek][3]}</td>
                          <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].emberek[elemek][4]}</td>
                      </tr>
                      `
                      try {
                         emberek_összesen += parseInt(commasToNumber(data[i].emberek[elemek][4].slice(0, -3)))
                      } catch {
                       emberek_összesen += 0
                      }
               }

            }
            document.getElementById("ide_kell_az_emberek_osszesen").innerText = `${numberWithCommas(emberek_összesen)} Ft`


            let munkagépek_összesen = 0
            for (const elemek in data[i].munkagépek) {
               if (data[i].munkagépek[elemek][0] != ""){
                document.getElementById("munkagépek-table").innerHTML += `
                    <tr>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].munkagépek[elemek][0]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].munkagépek[elemek][1]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].munkagépek[elemek][2]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].munkagépek[elemek][3]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].munkagépek[elemek][4]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].munkagépek[elemek][5]}</td>
                    </tr>
                    `
                  try {
                     munkagépek_összesen += parseInt(commasToNumber(data[i].munkagépek[elemek][5].slice(0, -3)))
                  } catch {
                     munkagépek_összesen += 0
                  }
                  
               }
            }
            document.getElementById("ide_kell_az_munkagepek_osszesen").innerText = `${numberWithCommas(munkagépek_összesen)} Ft`


            let teherautók_összesen = 0
            for (const elemek in data[i].teherautók) {
               if (data[i].teherautók[elemek][0] != ""){
                document.getElementById("teherautók-table").innerHTML += `
                    <tr>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].teherautók[elemek][0]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].teherautók[elemek][1]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].teherautók[elemek][2]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].teherautók[elemek][3]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].teherautók[elemek][4]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].teherautók[elemek][5]}</td>
                    </tr>
                    `
                    try {
                       teherautók_összesen += parseInt(commasToNumber(data[i].teherautók[elemek][5].slice(0, -3)))
                    } catch {
                     teherautók_összesen += 0
                    }
               }
            }
            document.getElementById("ide_kell_az_teherautok_osszesen").innerText = `${numberWithCommas(teherautók_összesen)} Ft`


            let beton_összesen = 0
            for (const elemek in data[i].beton) {
               if (data[i].beton[elemek][0] != ""){
                document.getElementById("beton-table").innerHTML += `
                    <tr>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].beton[elemek][0]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].beton[elemek][1]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].beton[elemek][2]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].beton[elemek][3]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].beton[elemek][4]}</td>
                    </tr>
                    `
                    try {
                       beton_összesen += parseInt(commasToNumber(data[i].beton[elemek][4].slice(0, -3)))
                    } catch {
                     beton_összesen += 0
                    }
               }
            }
            document.getElementById("ide_kell_az_beton_osszesen").innerText = `${numberWithCommas(beton_összesen)} Ft`



            let kis_szolgaltatok_összesen = 0
            for (const elemek in data[i].kis_szolgáltatók) {
               if (data[i].kis_szolgáltatók[elemek][0] != ""){
                  document.getElementById("kis_szolgaltatok-table").innerHTML += `
                      <tr>
                          <td style="padding-bottom: 20px; border:1px solid #C5EBC3; padding: 1px 1px 20px !important">${data[i].kis_szolgáltatók[elemek][0]}</td>
                          <td style="padding-bottom: 20px; border:1px solid #C5EBC3; padding: 1px 1px 20px !important">${data[i].kis_szolgáltatók[elemek][1]}</td>
                          <td style="padding-bottom: 20px; border:1px solid #C5EBC3; padding: 1px 1px 20px !important">${data[i].kis_szolgáltatók[elemek][2]}</td>
                          <td style="padding-bottom: 20px; border:1px solid #C5EBC3; padding: 1px 1px 20px !important">${data[i].kis_szolgáltatók[elemek][3]}</td>
                          <td style="padding-bottom: 20px; border:1px solid #C5EBC3; padding: 1px 1px 20px !important">${data[i].kis_szolgáltatók[elemek][4]}</td>
                      </tr>
                      `
                      try {
                         kis_szolgaltatok_összesen += parseInt(commasToNumber(data[i].kis_szolgáltatók[elemek][4].slice(0, -3)))
                      } catch {
                        kis_szolgaltatok_összesen += 0
                      }
               }

            }
            document.getElementById("ide_kell_az_kis_szolgaltatok_osszesen").innerText = `${numberWithCommas(kis_szolgaltatok_összesen)} Ft`

            let nagy_szolgaltatok_összesen = 0
            for (const elemek in data[i].nagy_szolgáltatók) {
               if (data[i].nagy_szolgáltatók[elemek][0] != ""){
                  document.getElementById("nagy_szolgaltatok-table").innerHTML += `
                      <tr>
                          <td style="padding-bottom: 20px; border:1px solid #C5EBC3; padding: 1px 1px 20px !important">${data[i].nagy_szolgáltatók[elemek][0]}</td>
                          <td style="padding-bottom: 20px; border:1px solid #C5EBC3; padding: 1px 1px 20px !important">${data[i].nagy_szolgáltatók[elemek][1]}</td>
                          <td style="padding-bottom: 20px; border:1px solid #C5EBC3; padding: 1px 1px 20px !important">${data[i].nagy_szolgáltatók[elemek][2]}</td>
                          <td style="padding-bottom: 20px; border:1px solid #C5EBC3; padding: 1px 1px 20px !important">${data[i].nagy_szolgáltatók[elemek][3]}</td>
                          <td style="padding-bottom: 20px; border:1px solid #C5EBC3; padding: 1px 1px 20px !important">${data[i].nagy_szolgáltatók[elemek][4]}</td>
                          <td style="padding-bottom: 20px; border:1px solid #C5EBC3; padding: 1px 1px 20px !important">${data[i].nagy_szolgáltatók[elemek][5]}</td>
                      </tr>
                      `
                      try {
                         nagy_szolgaltatok_összesen += parseInt(commasToNumber(data[i].nagy_szolgáltatók[elemek][5].slice(0, -3)))
                      } catch {
                        nagy_szolgaltatok_összesen += 0
                      }
               }

            }
            document.getElementById("ide_kell_az_nagy_szolgaltatok_osszesen").innerText = `${numberWithCommas(nagy_szolgaltatok_összesen)} Ft`

            function beton_sema(bemenet){
               let beton_összesen = 0
            for (const elemek in data[i][bemenet]) {
               if (data[i][bemenet][elemek][0] != ""){
                document.getElementById(`${bemenet}-table`).innerHTML += `
                    <tr>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i][bemenet][elemek][0]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i][bemenet][elemek][1]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i][bemenet][elemek][2]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i][bemenet][elemek][3]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i][bemenet][elemek][4]}</td>
                    </tr>
                    `
                    try {
                       beton_összesen += parseInt(commasToNumber(data[i][bemenet][elemek][4].slice(0, -3)))
                    } catch {
                     beton_összesen += 0
                    }
               }
            }
            document.getElementById(`ide_kell_az_${bemenet}_osszesen`).innerText = `${numberWithCommas(beton_összesen)} Ft`
            }

            beton_sema(bemenet="térkő")
            beton_sema(bemenet="szóródó_anyag")
            beton_sema(bemenet="aszfalt")
            beton_sema(bemenet="szegély")
            beton_sema(bemenet="kandeláber")
            beton_sema(bemenet="utcabútor")
            beton_sema(bemenet="beton_akna")
            beton_sema(bemenet="csatorna_cső")
            beton_sema(bemenet="nyomó_cső")
            beton_sema(bemenet="kertészet")
            beton_sema(bemenet="természetes_kő")

            //document.getElementById("munkaerő").innerText = `${data[i].emberek}`
            //console.log(data[i].emberek)
            //document.getElementById("munkagépek").innerText = `${data[i].munkagépek}`
            //document.getElementById("teherautók").innerText = `${data[i].teherautók}`
            //document.getElementById("beton").innerText = `${data[i].beton}`

        }
    }
    
 }
 megnezem_page()

 if (document.referrer == "http://127.0.0.1:5500/screens/tervezett.html" || document.referrer == "http://127.0.0.1:5500/screens/tervezett" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett.html" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett" || localStorage.getItem("tervmod") == "true"){
      document.getElementById("page-content-megnezem-wrapper").style.backgroundColor = "rgb(17, 17, 11)"

      len = document.getElementsByTagName("table")
      for (let i = 0; i < len.length; i++){
         len[i].style.borderColor = "#F2E86D"
      }
      len = document.getElementsByTagName("td")
      for (let i = 0; i < len.length; i++){
         len[i].style.borderColor = "#F2E86D"
      }

      var url = "https://apa-alkalmazas.herokuapp.com/get-alvallalkozoi_szerzodes";

      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);

      xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);
      xhr.setRequestHeader("id", `${localStorage.getItem("id")}`)

      let html_string = '<br><h3 style="margin-bottom: 20px;">Alvállalkozói Project Szerződések:</h3><br>'
      var alv_ár = 0

      let összesen_összesen = document.getElementById("összesen-összesen")
      összesen_összesen.remove()

      xhr.onreadystatechange = function () {
         if (xhr.readyState === 4) {
            console.log(xhr.status);
            //console.log(xhr.responseText);

            let data = JSON.parse(xhr.responseText)
            for (const s in data) {
               html_string += `<h5>Kivitelező: ${data[s].kivitelező}</h5>`
               html_string += `<h5>Tevékenység: ${data[s].tevékenység}</h5>`
               html_string += `<h5>Szerződéses Ár: ${numberWithCommas(data[s].szerződéses_ár)} Ft</h5>`
               html_string += `<br><br><br>`
               console.log(html_string)

               if(data[s].szerződéses_ár != ""){
                  alv_ár += parseInt(data[s].szerződéses_ár)
               }
            }
            console.log(html_string)
            console.log(alv_ár)
            localStorage.setItem("alv_ár", `${alv_ár}`)
            document.getElementById("page-content-megnezem").innerHTML += html_string
            document.getElementById("page-content-megnezem").innerHTML += összesen_összesen.outerHTML
         }};

      xhr.send();
}

 function vegosszeg_kiszamitasa() {
    function elem_hozzáadás(bemenet){
      let beton = document.getElementById(`ide_kell_az_${bemenet}_osszesen`)
      try {
         beton = commasToNumber(beton.innerText.slice(0, -3))
      } catch {
         beton = 0
      }
      return parseInt(beton)
    }
   // let munkaerő = document.getElementById("ide_kell_az_emberek_osszesen")
   // try {
   //    munkaerő = commasToNumber(munkaerő.innerText.slice(0, -3))
   // } catch {
   //    munkaerő = 0
   // }

   // let munkagépek = document.getElementById("ide_kell_az_munkagepek_osszesen")
   // try {
   //    munkagépek = commasToNumber(munkagépek.innerText.slice(0, -3))
   // } catch {
   //    munkagépek = 0
   // }

   // let teherautók = document.getElementById("ide_kell_az_teherautok_osszesen")
   // try {
   //    teherautók = commasToNumber(teherautók.innerText.slice(0, -3))
   // } catch {
   //    teherautók = 0
   // }

   // let beton = document.getElementById("ide_kell_az_beton_osszesen")
   // try {
   //    beton = commasToNumber(beton.innerText.slice(0, -3))
   // } catch {
   //    beton = 0
   // }
   

   setTimeout(() => {
      vegosszeg = elem_hozzáadás(bemenet="emberek") + 
                  elem_hozzáadás(bemenet="munkagepek") + 
                  elem_hozzáadás(bemenet="teherautok") + 
                  elem_hozzáadás(bemenet="beton") + 
                  elem_hozzáadás(bemenet="kis_szolgaltatok") + 
                  elem_hozzáadás(bemenet="nagy_szolgaltatok") + 
                  elem_hozzáadás(bemenet="térkő") + 
                  elem_hozzáadás(bemenet="szóródó_anyag") + 
                  elem_hozzáadás(bemenet="aszfalt") + 
                  elem_hozzáadás(bemenet="szegély") + 
                  elem_hozzáadás(bemenet="kandeláber") + 
                  elem_hozzáadás(bemenet="utcabútor") + 
                  elem_hozzáadás(bemenet="beton_akna") + 
                  elem_hozzáadás(bemenet="csatorna_cső") + 
                  elem_hozzáadás(bemenet="nyomó_cső") + 
                  elem_hozzáadás(bemenet="kertészet") + 
                  elem_hozzáadás(bemenet="természetes_kő") + parseInt(localStorage.getItem("alv_ár") || 0)
   
                  //console.log(localStorage.getItem("alv_ár"))
                  localStorage.removeItem("alv_ár")
                  document.getElementById("vegosszeg").innerText = `Mindösszesen: ${numberWithCommas(vegosszeg)} Ft`
   }, 1000);

}
vegosszeg_kiszamitasa()

document.getElementById("osszesito-torlese").addEventListener("click", function() {

   if (document.referrer == "http://127.0.0.1:5500/screens/tervezett.html" || document.referrer == "http://127.0.0.1:5500/screens/tervezett" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett.html" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett" || localStorage.getItem("tervmod") == "true"){
      document.getElementById("emberek_delete_popup").style.backgroundColor = "rgb(17, 17, 11)"
      document.getElementById("emberek_popup_igen").style.backgroundColor = "#F2E86D"
      document.getElementById("emberek_popup_igen").style.borderColor = "#F2E86D"
      document.getElementById("emberek_popup_nem").style.backgroundColor = "#F2E86D"
      document.getElementById("emberek_popup_nem").style.borderColor = "#F2E86D"
      document.getElementById("emberek_popup_nem").style.color = "rgb(17, 17, 11)"

      document.getElementsByClassName("popup_content")[0].children[1].innerText = "Biztosan szeretnéd törölni ezt a kalkulációt?"
   }

   document.getElementById("emberek_delete_popup").style.visibility = 'visible'
   document.getElementById("popup_háttér").style.visibility = 'visible'
   document.body.style.overflow = "hidden";

   document.getElementById("emberek_popup_nem").addEventListener("click", function() {
      document.getElementById("emberek_delete_popup").style.visibility = 'hidden'
      document.getElementById("popup_háttér").style.visibility = 'hidden'
      document.body.style.overflow = "visible";
   })
   document.getElementById("emberek_popup_igen").addEventListener("click", function() {
      document.getElementById("emberek_delete_popup").style.visibility = 'hidden'
      document.getElementById("popup_háttér").style.visibility = 'hidden'
      document.body.style.overflow = "hidden";
      document.getElementById("page-content-megnezem-wrapper").innerText = `A törlés megtörtént!`

      if (document.referrer == "http://127.0.0.1:5500/screens/tervezett.html" || document.referrer == "http://127.0.0.1:5500/screens/tervezett" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett.html" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett" || localStorage.getItem("tervmod") == "true"){
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-tervezett";
      } else {
         var url = "https://apa-alkalmazas.herokuapp.com/update-delete-munkanapok";
      }
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
         if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
         }};
      var data = `${localStorage.getItem('id')}`;
      xhr.send(data);

   })

})
document.getElementById("osszesito-update").addEventListener("click", async function() {
   const tbodyk = document.getElementsByTagName("tbody")
   //console.log(tbodyk)
   for (let i = 0; i < tbodyk.length; i++) {
      //console.log(tbodyk[i].children[0].children[tbodyk[i].children[0].children.length-1])
      //console.log(tbodyk[i].children[0].children[tbodyk[i].children[0].children.length-1].innerHTML == '<div class="sor_edit_gomb" style="background-color: green; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; padding-left: 2px; padding-bottom: 2px; margin-right: 20px; cursor: pointer"><i style="font-size: 18px" class="far fa-edit" aria-hidden="true"></i></div>')
         tbodyk[i].children[0].innerHTML += '<td class="szerk" style="padding-bottom: 0px; border:1px solid #C5EBC3;"><div class="sor_edit_gomb" style="background-color: green; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center; padding-left: 2px; padding-bottom: 2px; margin-right: 10px;  margin-left: 10px; cursor: pointer"><i style="font-size: 18px" class="far fa-edit"></i></div></td>'
         tbodyk[i].children[0].innerHTML += '<td class="szerk" style="padding-bottom: 0px; border:1px solid #C5EBC3;"><div class="sor_delete_gomb" style="background-color: red; height: 33px; width: 33px; border-radius: 10px; display: flex; justify-content: center; align-items: center;  margin-right: 10px;  margin-left: 10px; cursor: pointer";><i style="font-size: 18px" class="far fa-trash-alt"></i></div></td>'
         //console.log(document.getElementsByClassName("sor_edit_gomb"))
   }

   console.log(document.getElementsByClassName("sor_edit_gomb")[0].nodeName)



   let sor_edit_gomb = document.getElementsByClassName("sor_edit_gomb")
   let sor_delete_gomb = document.getElementsByClassName("sor_delete_gomb")
   console.log(sor_edit_gomb)

   let TORLES_ELEMEK = []
   let TORLES_ELEMEK_VEGLEGES = []

   let eredeti_adatok = []
   for (let i = 0; i < sor_edit_gomb.length; i++){
      // console.log(sor)
      // console.log(i)
      setTimeout(() => {
         sor_edit_gomb[i].addEventListener("click", function(){
            //alert(`${i+1} Edit Clicked`)
            //console.log("mukodik")

            // console.log(document.getElementsByTagName("tbody")[0].children[0].children[0])
            //console.log(document.getElementsByTagName("tbody")[0].children[0].children.length-3)
            let eredeti_adatok_egy_sor = []
            for (let y = 0; y < document.getElementsByTagName("tbody")[i].children[0].children.length-2; y++){
               // console.log(document.getElementsByTagName("tbody")[0].children[0].children[y].innerText)
               let érték = document.getElementsByTagName("tbody")[i].children[0].children[y].innerText
               document.getElementsByTagName("tbody")[i].children[0].children[y].innerHTML = `<input value="${érték}">`
               eredeti_adatok_egy_sor.push(érték)
            }
            eredeti_adatok.push(eredeti_adatok_egy_sor)
         })
         sor_delete_gomb[i].addEventListener("click", function(){
            if (document.referrer == "http://127.0.0.1:5500/screens/tervezett.html" || document.referrer == "http://127.0.0.1:5500/screens/tervezett" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett.html" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett" || localStorage.getItem("tervmod") == "true"){
               document.getElementById("emberek_delete_popup_sor_torles").style.backgroundColor = "rgb(17, 17, 11)"

               document.getElementById("emberek_popup_igen_sor_torles").style.backgroundColor = "#F2E86D"
               document.getElementById("emberek_popup_igen_sor_torles").style.borderColor = "#F2E86D"
               document.getElementById("emberek_popup_nem_sor_torles").style.backgroundColor = "#F2E86D"
               document.getElementById("emberek_popup_nem_sor_torles").style.borderColor = "#F2E86D"
               document.getElementById("emberek_popup_nem_sor_torles").style.color = "rgb(17, 17, 11)"
            }
            //alert(`${i+1} Delete Clicked`)
            //console.log("mukodik")
            //console.log(document.getElementById("ide_kell_az_emberek_delete_tábla"))
            document.getElementById("emberek_popup_igen_sor_torles").addEventListener("click", function(){
               //console.log("lefutottam")
               if (document.getElementsByTagName("tbody")[i].children[0].children[0].innerHTML != ""){
                  for (let y = 0; y < document.getElementsByTagName("tbody")[i].children[0].children.length-2; y++){
                     //console.log(document.getElementsByTagName("tbody")[i].children[0].children[y].innerHTML)
   
                     cella = document.getElementsByTagName("tbody")[i].children[0].children[y]
                     TORLES_ELEMEK.push(cella.innerHTML)
                     //console.log(TORLES_ELEMEK)
                  }
               }
               if (TORLES_ELEMEK != ''){
                  TORLES_ELEMEK_VEGLEGES.push(TORLES_ELEMEK)
                  TORLES_ELEMEK = []
               }
               
               
               //sor űrítése a képernyőn és hozzáadás a listához
               for (let y = 0; y < document.getElementsByTagName("tbody")[i].children[0].children.length; y++){
                  cella = document.getElementsByTagName("tbody")[i].children[0].children[y]
                  cella.innerHTML = ""
               }

               document.getElementById("emberek_delete_popup_sor_torles").style.visibility = 'hidden'
               document.getElementById("popup_háttér_sor_torles").style.visibility = 'hidden'
               document.body.style.overflow = "visible";

            })

            document.getElementById("emberek_popup_nem_sor_torles").addEventListener("click", function(){
               document.getElementById("emberek_delete_popup_sor_torles").style.visibility = 'hidden'
               document.getElementById("popup_háttér_sor_torles").style.visibility = 'hidden'
               document.body.style.overflow = "visible";
            })

            document.getElementById("emberek_delete_popup_sor_torles").style.visibility = 'visible'
            document.getElementById("popup_háttér_sor_torles").style.visibility = 'visible'
            document.body.style.overflow = "hidden";
            
         })


      }, 50) //kell ide a setTimeOut 50ms-re hogy működjön az addEventListener     
   }
   


   document.getElementById("osszesito-update").style.visibility = "hidden"
   document.getElementById("osszesito-torlese").style.display = "none"
   document.getElementById("page-content-megnezem-wrapper").innerHTML += `<div class="update-osszesito-container" style="position: absolute; top: 40px; right: 22%;">
                                           <button type="button" class="btn btn-outline-success" id="osszesito-save">
                                           <i class="fas fa-check" style="padding-right: 10px;"></i>Frissítés 
                                            </button>
                                            </div>`
                                            
   document.getElementById("osszesito-save").addEventListener("click", function() {
      
      //sorok szerkesztése
      let sorok_lista = []
      for (let i = 0; i < sor_edit_gomb.length; i++){
         let sor_lista = []
         let sorok = document.getElementsByTagName('tbody')[i].children[0].children
         for (const a in sorok) {
            try {
               //console.log(sorok[a].innerHTML.slice(0, 6))
               if (sorok[a].innerHTML.slice(0, 6) == '<input') {
                  sor_lista.push(sorok[a].children[0].value)
                  //console.log(sorok[a].children[0].value)
               }
            } catch {}
         }
         if (sor_lista != '') {
            sorok_lista.push(sor_lista)
            sor_lista = []
         }
         //console.log(sorok)
      }
      módosított_adatok_soronként = sorok_lista
      
      setTimeout(() => {
         if (módosított_adatok_soronként.length != 0){
            console.log('Sorok módosítása:', módosított_adatok_soronként)
            if (document.referrer == "http://127.0.0.1:5500/screens/tervezett.html" || document.referrer == "http://127.0.0.1:5500/screens/tervezett" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett.html" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett" || localStorage.getItem("tervmod") == "true"){
               var url = "https://apa-alkalmazas.herokuapp.com/update-delete-tervezett";
            } else {
               var url = "https://apa-alkalmazas.herokuapp.com/update-delete-munkanapok";
            }
            var xhr = new XMLHttpRequest();
            xhr.open("PUT", url);
            xhr.setRequestHeader("metodus", "sor_szerkesztes");
            xhr.setRequestHeader("id", `${localStorage.getItem("id")}`);
            xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
            xhr.setRequestHeader("Content-Type", "application/json");
            //xhr.setRequestHeader("modositott_adatok", módosított_adatok_soronként)
            xhr.onreadystatechange = function () {
               if (xhr.readyState === 4) {
                  console.log(xhr.status);
                  console.log(xhr.responseText);
               }};
               var data = JSON.stringify([eredeti_adatok, módosított_adatok_soronként]);
               console.log(eredeti_adatok)
               xhr.send(data);
         }         
      }, 2000);


      if (document.referrer == "http://127.0.0.1:5500/screens/tervezett.html" || document.referrer == "http://127.0.0.1:5500/screens/tervezett" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett.html" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett" || localStorage.getItem("tervmod") == "true"){
         document.getElementById("page-content-megnezem").innerHTML = `<div class="loader-yellow"></div>`
      } else {
         document.getElementById("page-content-megnezem").innerHTML = `<div class="loader"></div>`
      }
      document.getElementById("dátum").remove()
      document.getElementById("osszesito-save").remove()


      // sorok törlése
      setTimeout(() => {
         if (TORLES_ELEMEK_VEGLEGES.length != 0){
            if (document.referrer == "http://127.0.0.1:5500/screens/tervezett.html" || document.referrer == "http://127.0.0.1:5500/screens/tervezett" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett.html" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett" || localStorage.getItem("tervmod") == "true"){
               var url = "https://apa-alkalmazas.herokuapp.com/update-delete-tervezett";
            } else {
               var url = "https://apa-alkalmazas.herokuapp.com/update-delete-munkanapok";
            }
            var xhr = new XMLHttpRequest();
            xhr.open("PUT", url);
            xhr.setRequestHeader("metodus", "sor_torles");
            xhr.setRequestHeader("id", `${localStorage.getItem("id")}`);
            xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
               if (xhr.readyState === 4) {
                  console.log(xhr.status);
                  console.log(xhr.responseText);
               }};
               var data = JSON.stringify(TORLES_ELEMEK_VEGLEGES);
               xhr.send(data);
      
            console.log('Sorok törlése:', TORLES_ELEMEK_VEGLEGES)
         }         
      }, 1000);


      //localstorage-ban levő adatok frissítése
      setTimeout(() => {
         if (document.referrer == "http://127.0.0.1:5500/screens/tervezett.html" || document.referrer == "http://127.0.0.1:5500/screens/tervezett" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett.html" || document.referrer == "https://apa-alkalmazas.herokuapp.com/screens/tervezett" || localStorage.getItem("tervmod") == "true"){
            var url = "https://apa-alkalmazas.herokuapp.com/get-tervezett";
         } else {
            var url = "https://apa-alkalmazas.herokuapp.com/get-munkanapok";
         }
         var xhr = new XMLHttpRequest();
         xhr.open("GET", url);
         xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);
         xhr.setRequestHeader("munkaszam", `${localStorage.getItem('munkaszam')}`);
         xhr.setRequestHeader("link", "osszesito") // ez itt teljesen mindegy csak kell ide valami
         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               console.log(xhr.status);
               console.log(xhr.responseText);
               data = JSON.parse(xhr.responseText)
               localStorage.setItem("munkanapok_adatok", `${xhr.responseText}`)
   
               if(xhr.status == 200) {
                  document.getElementById("page-content-megnezem-wrapper").innerHTML = `<h3 style="color: white">Módosítás megtörtént!</h3>
                  <h6 style="color: white">Frissítés 5mp múlva</h6>`
                  } else {
                  document.getElementById("page-content-megnezem-wrapper").innerHTML = `<h3 style="color: white">Hiba történt! :(</h3>
                  <h6 style="color: white">Frissítés 5mp múlva</h6>`
                  }
   
            }};
         xhr.send();
      }, 4000)   

      setTimeout(() => {


         location.reload();
      }, 10000) //-------------------------------állítsd vissza 5 másodpercere!!!!!!!!!!!!!!!!!!!!!

      
   })


})

 function numberWithCommas(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
 function commasToNumber(y) {
   return parseInt(y.toString().replace(/ /g, ''));
}