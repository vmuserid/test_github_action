function LoadContentPage(url) {
  fetch(url)
    .then (response => response.text())
    .then (html => document.getElementById("content").innerHTML = html)
    .catch (err => console.warn('Something went wrong.', err))
}

function LoadEnclosures(url){
  fetch(url)
    .then (response => response.json())
    .then (results => {
      let table = '<table class="table"><thead><tr><th class="left">ID</th><th class="left">Room</th><th class="left">Rack</th><th class="left">Vendor</th>';
      table += '<th class="left">Platform</th><th class="left">Link</th></tr></thead><tbody>';
      for (x in results) {
          table +='<tr><td class="left">'+ results[x].ID +'</td><td class="left">'+ results[x].Location_room +'</td>';
          table +='<td class="left">'+ results[x].Location_rack +'</td><td class="left">'+ results[x].Vendor +'</td>';
          table +='<td class="left">'+ results[x].Platform +'</td>';
          table +='<td class="left"><a href="https://' + results[x].MGMT_FQDN_1 + '/" target="_blank">'+ results[x].MGMT_FQDN_1 +'</a></td></tr>';
      }
      table +='</tbody></table>';
      document.getElementById("content").innerHTML = table;
    })
    .catch (err => console.warn('Something went wrong.', err))
}

function SearchVM() {
  console.log(event);
  event.preventDefault();
  let x = document.getElementById("vminput").value;
  let url = 'http://localhost:8080/api/vms?offset=0&limit=50&vmname=' + x ;
  fetch(url)
    .then (response => response.json())
    .then (results => {
      let table = '<table class="table"><thead><tr><th class="left">VMName</th><th class="left">vCenter</th><th class="left">Cluster</th>';
      table += '<th class="left">Guest OS</th><th class="left">PowerState</th></tr></thead><tbody>'
      for (x in results) {
          //
          table +='<tr><td class="left">'+ results[x].vm_cfg_name +'</td><td class="left">'+ results[x].vm_adm_vcenter +'</td>';
          table +='<td class="left">'+ results[x].vm_adm_cluster +'</td><td class="left">'+ results[x].vm_cfg_GuestFullName +'</td>';
          table +='<td class="left">'+ results[x].vm_run_powerstate +'</td></tr>';
      }
      table +='</tbody></table>';
      document.getElementById("ulDetailsVM").innerHTML = table;
    })
    .catch (err => console.warn('Something went wrong.', err))
}

window.onload = function Intialize() {
  LoadContentPage('vCenters.html');
  document.querySelectorAll('.nav-link').forEach(item => {
    item.addEventListener('click', event => {
      // handle click
      event.preventDefault();
      // Highlight correct Navlink
      for (var x of document.querySelectorAll('.nav-link')) {
          x.classList.remove('active');
      }
      item.classList.add('active');
      var selectedLink = event.target.id;
      switch (selectedLink)
      {
        case "vCenterLink":
          LoadContentPage('vCenters.html');
          break;
        case "EnclosureLink ASD":
          LoadEnclosures('http://localhost:8080/api/enclosures?location=Amsterdam');
          break;
        case "EnclosureLink RTD":
          LoadEnclosures('http://localhost:8080/api/enclosures?location=Rotterdam');
          break;
        case "EnclosureLink ARH":
          LoadEnclosures('http://localhost:8080/api/enclosures?location=Arnhem');
          break;
        case "EnclosureLink DHG":
          LoadEnclosures('http://localhost:8080/api/enclosures?location=Haag');
          break;
        case "EnclosureLink CCA":
          LoadEnclosures('http://localhost:8080/api/enclosures?location=Aalsmeer');
          break;
        case "EnclosureLink APD":
          LoadEnclosures('http://localhost:8080/api/enclosures?location=Apeldoorn');
          break;
        case "EnclosureLink HAA":
          LoadEnclosures('http://localhost:8080/api/enclosures?location=Haarlem');
          break;
        case "SearchLink":
          LoadContentPage('Search.html');
          break;
      }
    })
  })
}






