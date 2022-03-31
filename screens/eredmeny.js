async function calculate_eredmeny() {

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
     
        document.getElementById('napi-munkák-lista').innerHTML = '<div class="loader-white" id="összesítő-loader" style="position: absolute; top: 40%; left: 49%;"></div>'
     
        console.log(munkaszam_szuro_ref.value)

        let tervezett_költség
        let napi_költség
        let összes_költség

        var url = "https://apa-alkalmazas.herokuapp.com/get-munkanapok";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);
        xhr.setRequestHeader("munkaszam", `${munkaszam_szuro_ref.value}`);
        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            //console.log(xhr.responseText);

            napi_költség = JSON.parse(xhr.responseText)
        }};
        xhr.send(); 

        let data
        setTimeout(() => {
            var url = "https://apa-alkalmazas.herokuapp.com/get-tervezett";
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);
            xhr.setRequestHeader("munkaszam", `${munkaszam_szuro_ref.value}`);
            localStorage.setItem("munkaszam", `${munkaszam_szuro_ref.value}`)
            xhr.onreadystatechange = function () {
               if (xhr.readyState === 4) {
                  console.log(xhr.status);
                  //console.log(xhr.responseText);
                  data = JSON.parse(xhr.responseText)
                  localStorage.setItem("munkanapok_adatok", `${xhr.responseText}`)
                  
                  data = data.sort((idA, idB) => idB.id - idA.id,)
                  
                  document.getElementById('napi-munkák-lista').innerHTML = ''
                  végsőCalculate()
               }};
            
            xhr.send();
        }, 1000)



        function végsőCalculate(){
            let tervezett_data = data
            let összes_tervezett_költség = 0
            let összes_napi_költség = 0


            for (const i in tervezett_data) {
               //console.log(tervezett_data[i])
               //console.log(tervezett_data[i].napi_koltseg)
               összes_tervezett_költség += parseInt(tervezett_data[i].napi_koltseg) 
               //console.log(napi_költség)
            }
            console.log(összes_tervezett_költség)


            for (const b in napi_költség) {
                //console.log('napikoöltség[b]',napi_költség[b].napi_koltseg)
                összes_napi_költség += parseInt(napi_költség[b].napi_koltseg)
            }
            console.log(összes_napi_költség)


            let százalék = összes_napi_költség/összes_tervezett_költség*100
            százalék = százalék.toString().slice(0, 5)

            const lista = document.getElementById('napi-munkák-lista')
            lista.innerHTML += `<div class="card" style="max-height: 300px; width: 25rem; margin-right: 30px; margin-top:20px; background-color: black; border: 1px solid honeydew;">
                <div class="card-img-top" style="height: 50px; background-color: honeydew; display: flex; justify-content:center; align-items: center">
                   <p style="margin: 0px; font-size: x-large">${munkaszam_szuro_ref.value}</p>
                </div>
                <div class="card-body" style="margin-right:20px">
                <p class="card-text" style="color: white">Tervezett költség: ${numberWithCommas(összes_tervezett_költség)} Ft</p>
                <p class="card-text" style="color: white">Eddigi költség mindösszesen: ${numberWithCommas(összes_napi_költség)} Ft</p>

                <p class="szazalek" style="color: #198754; font-size: 24px; font-weight: bold;">${százalék} %</p>
                <progress style="width: 100%; margin-bottom: 30px" class="szazalek_bar" value="${százalék}" max="100"> ${százalék}% </progress>
                </div>
                </div>`

            if (munkaszam_szuro_ref.value == "ÖSSZES") {
                let tervezett_data = data
                const lista = document.getElementById('napi-munkák-lista')
                lista.innerHTML = ""
                
                let összes_tervezett_költség = 0
                for (const i in tervezett_data) {
                    let összes_napi_költség = 0

                    összes_tervezett_költség += parseInt(tervezett_data[i].napi_koltseg) 

                    for (const b in napi_költség) {
                        //console.log('napikoöltség[b]',napi_költség[b].napi_koltseg)
                        if (tervezett_data[i].munkaszám == napi_költség[b].munkaszám){
                            összes_napi_költség += parseInt(napi_költség[b].napi_koltseg)
                        }
                    }

                    let százalék = összes_napi_költség/összes_tervezett_költség*100
                    százalék = százalék.toString().slice(0, 5)

                    lista.innerHTML += `<div class="card" style="max-height: 300px; width: 25rem; margin-right: 30px; margin-top:20px; background-color: black; border: 1px solid honeydew;">
                    <div class="card-img-top" style="height: 50px; background-color: honeydew; display: flex; justify-content:center; align-items: center">
                    <p style="margin: 0px; font-size: x-large">${tervezett_data[i].munkaszám}</p>
                    </div>
                    <div class="card-body" style="margin-right:20px">
                    <p class="card-text" style="color: white">Tervezett költség: ${numberWithCommas(összes_tervezett_költség)} Ft</p>
                    <p class="card-text" style="color: white">Eddigi költség mindösszesen: ${numberWithCommas(összes_napi_költség)} Ft</p>

                    <p class="szazalek" style="color: #198754; font-size: 24px; font-weight: bold;">${százalék} %</p>
                    <progress style="width: 100%; margin-bottom: 30px" class="szazalek_bar" value="${százalék}" max="100"> ${százalék}% </progress>
                    </div>
                    </div>`

                    
                    százalék = összes_napi_költség/összes_tervezett_költség*100
                    if (parseInt(százalék) > 100) {
                        document.getElementsByClassName("szazalek_bar")[i].classList.toggle("progress_100_szazalek_felett")
                        document.getElementsByClassName("szazalek")[i].style.color = "red"
                    }
                    összes_tervezett_költség = 0
                    százalék = 0
                 }
            }

            százalék = összes_napi_költség/összes_tervezett_költség*100
            if (parseInt(százalék) > 100) {
                document.getElementsByClassName("szazalek_bar")[0].classList.toggle("progress_100_szazalek_felett")
                document.getElementsByClassName("szazalek")[0].style.color = "red"
            }
            try {
               document.getElementById("összesítő-loader").remove()
            } catch {}
        }



        }
     
        if (munkaszam_szuro_ref.value == ""){
           //console.log(data)
           document.getElementById('napi-munkák-lista').innerHTML = '<h4 style="color: honeydew; margin: auto; padding-bottom: 40px;">Kérlek válassz munkaszámot!</h4>'
        }
     
        }
     }
 calculate_eredmeny()
 
 function numberWithCommas(x) {
     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  
  function commasToNumber(y) {
     return parseInt(y.toString().replace(/ /g, ''));
  }