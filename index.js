let preloader = document.getElementById('preloader');
window.addEventListener('load', function () {
  preloader.style.display = 'none';
})
async function getCovidData() {
  var jsonData = await fetch('https://api.covid19india.org/data.json');
  // console.log(jsonData)

  var jsData = await jsonData.json();
  // console.log(jsData);
  // console.log(jsData.tested[516])

  var n = 1;
  let TableData = '';
  for (let i = 0; i <= 36; i++) {
    // dropDownData += `<li class="dropdown-item">${jsData.statewise[n].state}</li>`;
    TableData += `<tr class="table-info">
        <td >${jsData.statewise[n].state}</td>
        <td style="color:red" class="table-danger text-center">${jsData.statewise[n].confirmed}</td>
        <td style="color:blue" class="table-primary text-center">${jsData.statewise[n].active}</td>
        <td style="color:black" class="table-secondary text-center">${jsData.statewise[n].deaths}</td>
        <td style="color:green" class="table-success text-center">${jsData.statewise[n].recovered}</td>
      </tr>`
    n++;
  }
  let update = document.getElementById('updated');
  update.innerHTML = `<h6>Last Upadte at ${jsData.statewise[0].lastupdatedtime}</h6>`
  let tableData = document.getElementById('tableData');
  tableData.innerHTML = TableData;
  let InfBox = document.getElementById('InfoBox');


  InfoBx = `<div class="card" style="width: 14rem;">
                 <div class="card-body">
                 <h6 class="card-title">TOTAL CONFIRMED</h6>
                 <h4 class="card-title" style="color:red"> +${jsData.cases_time_series[557].dailyconfirmed}</h4>
                 <h5 class="card-title" style="color:red">${jsData.statewise[0].confirmed}</h5>
               </div>
             </div>
               <div class="card" style="width: 13rem;">
               <div class="card-body">
               <h6 class="card-title">TOTAL RECOVERED</h6>
               <h4 class="card-title" style="color:green"> +${jsData.cases_time_series[557].dailyrecovered}</h4>
               <h5 class="card-title" style="color:green">${jsData.statewise[0].recovered}</h5>
               </div>
               </div>
               <div class="card" style="width: 11rem;">
               <div class="card-body">
               <h6 class="card-title">TOTAL DEATHS</h6>
               <h4 class="card-title" style="color:red"> +${jsData.cases_time_series[557].dailydeceased}</h4>
               <h5 class="card-title" style="color:red">${jsData.statewise[0].deaths}</h5>
               </div>
             </div>
             <div class="card p-4" style="width: 11rem;>
               <div class="card-body">
               <h6 class="card-title">TOTAL ACTIVE</h6>
               <h4 class="card-title"style="color:blue">${jsData.statewise[0].active}</h4>
               </div>
               </div>
             <div class="card" style="width: 11rem;">
               <div class="card-body">
               <h6 class="card-title">TOTAL TESTING</h6>
                 <h3 class="card-title" style="color:green">${jsData.tested[516].totalsamplestested}</h3>
               </div>
             </div>
             <div class="card" style="width: 16rem;">
               <div class="card-body">
               <h6 class="card-title">PARTIALLY VACCINATED</h6>
                 <h3 class="card-title" style="color:blue">${jsData.tested[516].firstdoseadministered}</h3>
               </div>
             </div>
             <div class="card" style="width: 14rem;">
               <div class="card-body">
               <h6 class="card-title">FULLY VACCINATED</h6>
                 <h3 class="card-title" style="color:blue">${jsData.tested[516].seconddoseadministered}</h3>
               </div>
             </div>
             <div class="card" style="width: 14rem;">
               <div class="card-body">
               <h6 class="card-title">TOTAL DELTA CASE</h6>
                 <h3 class="card-title" style="color:red">${jsData.statewise[0].deltaconfirmed}</h3>
               </div>
             </div>`
  InfBox.innerHTML = InfoBx;

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Confirmed', 'Active', 'Recovered', 'Deaths'],
      datasets: [{
        label: 'CASES OF INDIA',
        data: [`${jsData.statewise[0].confirmed}`, `${jsData.statewise[0].active}`, `${jsData.statewise[0].recovered}`, `${jsData.statewise[0].deaths}`],
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
getCovidData();

function updateMap() {
  fetch('https://disease.sh/v3/covid-19/countries').then(response => response.json())
    .then(data => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZmFyaXNoMTIyMiIsImEiOiJja3M1amFxeTQyZ2kyMnFtcnB1bWxpbTF6In0.PHUtYjGv2zMBkuRk2a-zSA';
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [81, 23],
        zoom: 3
      });
      console.log(data);
    })
}

updateMap();


