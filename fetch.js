var icon = L.icon({
    iconUrl: 'icon3.png',
     iconSize: [50,50],
     iconAnchor:[25,25]
})

let url = 'https://api.wheretheiss.at/v1/satellites/25544'


let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let spanEL = document.querySelector('#DateHolder')

let issMarker
let update = 10000 //10 seconds
let map = L.map('iss-map').setView([0,0],1)


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 7,
id: 'mapbox.streets',
accessToken: 'pk.eyJ1IjoibW9oYW1tYWQ3NyIsImEiOiJjazZsaXBwMXIwZmlrM25wYjdlbnZoaGo5In0.wcvi8DMV3iTMcgRNiDmVVQ'
}).addTo(map)

iss()  //initial call to function
setInterval(iss, update) // call the iss function every update seconds

function iss() {
fetch(url)
.then( response => response.json() )
.then( issData => {
    console.log(issData)
    let lat = issData.latitude
    let long = issData.longitude
    issLat.innerHTML = lat
    issLong.innerHTML = long
    
    let date = Date()
    spanEL.innerHTML = date

      
    if (!issMarker) {
        
        issMarker = L.marker([lat,long],{icon:icon}).addTo(map) //Creat the marker
    } else {
        issMarker.setLatlng([lat,long])//Already exists - move to new location
    
    }

})


    
.catch( err => {
    console.log(err)
})
}