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

            document.getElementById("dátum").innerText = `${data[i].dátum.slice(0, 16)}`

            for (const elemek in data[i].emberek) {
                document.getElementById("munkaerő-table").innerHTML += `
                    <tr>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].emberek[elemek][0]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].emberek[elemek][1]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].emberek[elemek][2]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].emberek[elemek][3]}</td>
                    </tr>
                    `

                console.log(data[i].emberek[elemek])
            }

            for (const elemek in data[i].munkagépek) {
                document.getElementById("munkagépek-table").innerHTML += `
                    <tr>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].munkagépek[elemek][0]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].munkagépek[elemek][1]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].munkagépek[elemek][2]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].munkagépek[elemek][3]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].munkagépek[elemek][4]}</td>
                    </tr>
                    `

                console.log(data[i].munkagépek[elemek])
            }

            for (const elemek in data[i].teherautók) {
                document.getElementById("teherautók-table").innerHTML += `
                    <tr>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].teherautók[elemek][0]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].teherautók[elemek][1]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].teherautók[elemek][2]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].teherautók[elemek][3]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].teherautók[elemek][4]}</td>
                    </tr>
                    `

                console.log(data[i].teherautók[elemek])
            }

            for (const elemek in data[i].beton) {
                document.getElementById("beton-table").innerHTML += `
                    <tr>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].beton[elemek][0]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].beton[elemek][1]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].beton[elemek][2]}</td>
                        <td style="padding-bottom: 20px; border:1px solid #C5EBC3;">${data[i].beton[elemek][3]}</td>
                    </tr>
                    `

                console.log(data[i].beton[elemek])
            }

            //document.getElementById("munkaerő").innerText = `${data[i].emberek}`
            console.log(data[i].emberek)
            //document.getElementById("munkagépek").innerText = `${data[i].munkagépek}`
            //document.getElementById("teherautók").innerText = `${data[i].teherautók}`
            //document.getElementById("beton").innerText = `${data[i].beton}`

        }
    }

    
    
 
 }
 megnezem_page()