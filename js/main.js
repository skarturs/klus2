


async function raditNoliktavasDatus(tipsAtlase)
{
 
  let jsonVielas = Array();
  let jsonInventars = Array();

  if(tipsAtlase==undefined)
  {
    let vielasNoServera = await fetch('https://pytonc.eu.pythonanywhere.com/api/v1/vielas');
    jsonVielas = await vielasNoServera.json();
    //
    let inventarsNoServera = await fetch('https://pytonc.eu.pythonanywhere.com/api/v1/inventars');
    jsonInventars = await inventarsNoServera.json();
  }
  else if(tipsAtlase=='viela')
  {
    //jsonVielas = await iegutDatusNoApi('https://pytonc.eu.pythonanywhere.com/api/v1/vielas');
    let vielasNoServera = await fetch('https://pytonc.eu.pythonanywhere.com/api/v1/vielas');
    jsonVielas = await vielasNoServera.json();
  }
  else if(tipsAtlase=='aprikojums')
  {
    //jsonInventars = await iegutDatusNoApi('https://pytonc.eu.pythonanywhere.com/api/v1/inventars');
    let inventarsNoServera = await fetch('https://pytonc.eu.pythonanywhere.com/api/v1/inventars');
    jsonInventars = await inventarsNoServera.json();
  }


  let datiNoliktava = jsonVielas.concat(jsonInventars);
  console.log(datiNoliktava);

  let tabula = document.querySelector('#pub_data tbody');
  tabula.innerHTML = '';

  //datiNoliktava.length - saņemto ierakstu skaits
  //datiNoliktava['0'] - pirmais ieraksts
  //datiNoliktava['0']['Nosaukums'] - pirmā ieraksta nosaukums
  
  for (i = 0; i < datiNoliktava.length; i++)
  {

      tipsClass = datiNoliktava[i]['tips'];
      //tipsClass = tipsClass.toLowerCase();
      //tipsClass = tipsClass.replace('ī','i');


      tabula.innerHTML = tabula.innerHTML+`
      <tr class="`+tipsClass+`">
      <td> `+datiNoliktava[i]['id']+` </td>
      <td> `+datiNoliktava[i]['nosaukums']+` </td>
      <td> `+datiNoliktava[i]['tips']+` </td>
      <td> `+datiNoliktava[i]['apakstips']+` </td>
      <td> `+datiNoliktava[i]['skaits']+` </td>
      <td> `+datiNoliktava[i]['daudzums']+` </td>
      <td> `+datiNoliktava[i]['komentari']+` </td>
      <td onclick="dzestVieluAprikojumu(`+datiNoliktava[i]['id']+`)"> ❌ </td>
      </tr>`;
      


  }//loop beigas
  


}//beidzas raditNoliktavasDatus(dati)









async function pievienotVieluAprikojumu()
{

let requestBodyJson = {
              "apakstips": document.querySelector('#apakstips').value,
              "daudzums": parseInt(document.querySelector('#daudzums').value),
              "komentari": document.querySelector('#komentari').value,
              "mervienibas": document.querySelector('#mervienibas').value,
              "nosaukums": document.querySelector('#nosaukums').value,
              "skaits": parseInt(document.querySelector('#skaits').value),
              "tips": document.querySelector('#tips').value
              };
let requestBodyString = JSON.stringify(requestBodyJson);


let request = await fetch('https://pytonc.eu.pythonanywhere.com/api/v1/viela',
         		{
            method:"POST",
  					headers:
  					{
            'X-API-KEY': 'asdf',
            'Content-Type': 'application/json'
            },
            body:requestBodyString
        		});

let atbilde = await request.json();
//console.log(atbilde);
  
document.querySelector('#atbilde').innerHTML=JSON.stringify(atbilde);
  
}//beigas pievienotVieluAprikojumu();







async function dzestVieluAprikojumu(id)
{

  
  if (confirm('Dzēst?')) 
  {
    let request = await fetch('https://pytonc.eu.pythonanywhere.com/api/v1/viela/'+id+'/dzest',
                {
                method:"POST",
                headers: {
                'X-API-KEY': 'asdf',
                'Content-Type': 'application/json'
                }
            });
    
      let atbilde = await request.json();
			alert('Atbilde no servera: '+atbilde);
	}
  
}