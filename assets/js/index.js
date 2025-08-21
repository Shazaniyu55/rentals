var items = document.getElementById("Category");
var items2 = document.getElementById("State");

fetch("https://rentalsmvp.vercel.app/api/v2/get/categories")
.then((response) => response.json())
.then((data) => {
    items.innerHTML = "";
    const defaultOption = document.createElement('option');
    defaultOption.text = "Select Category";
    defaultOption.value = "";
    defaultOption.name = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    items.appendChild(defaultOption);

    data.categories.forEach((category) => {
        //console.log(category);
        const option = document.createElement('option');
        option.value =  category; // Adjust based on your API data structure
        option.text = category; // Adjust based on your API data structure
        option.name = category; 
        items.appendChild(option);
    });
})
.catch((error) => {
    console.error("Error:", error);
});


fetch("https://rentalsmvp.vercel.app/api/v2/get/states")
.then((response) => response.json())
.then((data) => {
    items2.innerHTML = "";
    const defaultOption = document.createElement('option');
    defaultOption.text = "Select State";
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    items2.appendChild(defaultOption);

    data.states.forEach((category) => {
        //console.log(category);
        const option = document.createElement('option');
        option.value =  category; // Adjust based on your API data structure
        option.text = category; // Adjust based on your API data structure
        items2.appendChild(option);
    });
})
.catch((error) => {
    console.log("Error:", error);
});


const API_URL = 'http://localhost:2300/api/v2/auth/register';

fetch('http://localhost:2300/api/v2/auth/register')
.then((response) => response.json())
.then((data) => {
    console.log(data)
    // document.getElementById('message').textContent = data.message;
    // document.getElementById('message').style.color = 'red';
})
.catch((error) => {
    console.error("Error:", error);
});

    
   