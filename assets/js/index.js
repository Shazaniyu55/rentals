console.log("Hello world");

var items = document.getElementById("Category");




fetch("http://localhost:2300/api/v2/get/categories")
.then((response) => response.json())
.then((data) => {
    items.innerHTML = "";
    const defaultOption = document.createElement('option');
    defaultOption.text = "Select Category";
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    items.appendChild(defaultOption);

    data.categories.forEach((category) => {
        console.log(category);
        const option = document.createElement('option');
        option.value =  category; // Adjust based on your API data structure
        option.text = category; // Adjust based on your API data structure
        items.appendChild(option);
    });
    //console.log("Data:", data.categories);
})
.catch((error) => {
    console.error("Error:", error);
});