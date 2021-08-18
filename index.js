let preloader = document.getElementById('preloader');
window.addEventListener('load', function () {
  preloader.style.display = 'none';
})
//https://api.covid19india.org/data.json
async function getCovidData() {
  var data = await fetch('https://disease.sh/v3/covid-19/countries');
  console.log(data)
  var countryData = await data.json();
  console.log(countryData);

  var n = 0;
  let TableData = '';
  for (let i = 0; i <= 220; i++) {
    // dropDownData += `<li class="dropdown-item">${countryData.statewise[n].state}</li>`;
    TableData += `<tr class="table-info">
        <td >${countryData[n].country}</td>
        <td style="color:red" class="table-danger text-center">${countryData[n].cases}</td>
        <td style="color:blue" class="table-primary text-center">${countryData[n].active}</td>
        <td style="color:black" class="table-secondary text-center">${countryData[n].deaths}</td>
        <td style="color:green" class="table-success text-center">${countryData[n].recovered}</td>
      </tr>`
    n++;
  }
  let update = document.getElementById('updated');
  let tableData = document.getElementById('tableData');
  tableData.innerHTML = TableData;
  let InfBox = document.getElementById('InfoBox');



  //Data of All Countries 
  async function getCountryData() {
    var jData = await fetch('https://disease.sh/v3/covid-19/all');
    console.log(jData)
    var worldwideData = await jData.json();
    console.log(worldwideData);
    InfoBx = `<div class="card" style="width: 14rem;">
                 <div class="card-body">
                 <h6 class="card-title">TOTAL CONFIRMED</h6>
                 <h6 class="card-title" style="color:red">+ ${worldwideData.todayCases}</h6>
                 <h5 class="card-title" style="color:red">${worldwideData.cases}</h5>
               </div>
             </div>
               <div class="card" style="width: 13rem;">
               <div class="card-body">
               <h6 class="card-title">TOTAL RECOVERED</h6>
               <h6 class="card-title" style="color:green">+ ${worldwideData.todayRecovered}</h6>
               <h5 class="card-title" style="color:green">${worldwideData.recovered}</h5>
               </div>
               </div>
               <div class="card" style="width: 11rem;">
               <div class="card-body">
               <h6 class="card-title">TOTAL DEATHS</h6>
               <h6 class="card-title" style="color:red">+ ${worldwideData.todayDeaths}</h6>
               <h5 class="card-title" style="color:red">${worldwideData.deaths}</h5>
               </div>
             </div>
             <div class="card p-3" style="width: 11rem;>
               <div class="card-body">
               <h6 class="card-title">TOTAL ACTIVE</h6>
               <h5 class="card-title"style="color:blue">${worldwideData.active}</h5>
               </div>
               </div>
             <div class="card" style="width: 11rem;">
               <div class="card-body">
               <h6 class="card-title">TOTAL TESTING</h6>
                 <h3 class="card-title" style="color:green">${worldwideData.tests}</h3>
               </div>
             </div>
             <div class="card" style="width: 16rem;">
               <div class="card-body">
               <h6 class="card-title">CRITICAL CASES</h6>
                 <h3 class="card-title" style="color:blue">${worldwideData.critical}</h3>
               </div>
             </div>
             <div class="card" style="width: 14rem;">
               <div class="card-body">
               <h6 class="card-title">TOTAl POPULATION</h6>
                 <h3 class="card-title" style="color:blue">${worldwideData.population}</h3>
               </div>
             </div>
             <div class="card" style="width: 14rem;">
               <div class="card-body">
               <h6 class="card-title">AFFECTED COUNTRIES</h6>
                 <h3 class="card-title" style="color:red">${worldwideData.affectedCountries}</h3>
               </div>
             </div>`
    InfBox.innerHTML = InfoBx;


    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Confirmed', 'Active', 'Recovered', 'Deaths'],
        datasets: [{
          label: 'CASES WORLDWIDE ',
          data: [`${worldwideData.cases}`, `${worldwideData.active}`, `${worldwideData.recovered}`, `${worldwideData.deaths}`],
          backgroundColor: [
            '#FD693E',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            '#FD693E',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }
  getCountryData();


}
getCovidData();

function updateMap() {
  let n = 0;
  fetch('https://disease.sh/v3/covid-19/countries').then(response => response.json())
    .then(data => {
      console.log(data[n]);
      for (let i = 0; i <= 200; i++) {
        // data.array.forEach(element => {
        latitude = data[n].countryInfo.lat;
        longitude = data[n].countryInfo.long;
        casesT = data[n].todayCases;
        casesW = data[n].cases;
        if (casesT > 255) {
          color = "rgb(255,0,0)"
        }
        else {
          color = `rgb(${casesT},0,0)`
        }
        // console.log(latitude, longitude)

        const marker = new mapboxgl.Marker({
          draggable: false,
          color: color
        })
          .setLngLat([longitude, latitude])
          .addTo(map);
        n++;
      };
    });

  mapboxgl.accessToken = 'pk.eyJ1IjoiZmFyaXNoMTIyMiIsImEiOiJja3M1amFxeTQyZ2kyMnFtcnB1bWxpbTF6In0.PHUtYjGv2zMBkuRk2a-zSA';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [81, 19],
    zoom: 2
  });
  map.on('load', () => {
    map.addSource('places', {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'properties': {
              'description':
                `<p>Cases here is ${casesW}</p>`
            },
            'geometry': {
              'type': 'Point',
              'coordinates': [latitude,longitude]
            }
          }
        ]
      }
    }
    )
  })
  map.addLayer({
    'id': 'places',
    'type': 'circle',
    'source': 'places',
    'paint': {
    'circle-color': '#4264fb',
    'circle-radius': 6,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#ffffff'
    }
    });
     
    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
    });
     
    map.on('mouseenter', 'places', (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';
     
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;
     
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
     
    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });
     
    map.on('mouseleave', 'places', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
    });    
}
updateMap();


