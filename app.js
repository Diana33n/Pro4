/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=0843a1397d70f0db7cdeab7c0bc003aa'; 

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(baseURL, zipCode, apiKey)
    .then(function(data){
        // Add data to POST request
        postData('/add', {date: newDate, temp: data.main.temp, content: feelings})
        .then(function() {
            updateUI()
        })
    })
}

const getWeather = async (baseURL, zip, key)=>{
    const res = await fetch(baseURL+zip+key);
    try {
        const data = await res.json();
        return data;
    }  catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),         
    });

    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
        console.log("error", error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp} degrees`;
        document.getElementById('content').innerHTML = `Feelings: ${allData.content}`;
    }catch(error){
        console.log("error", error);
    }
}
