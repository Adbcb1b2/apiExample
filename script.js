// Get button elements
const fetchUsersButton = document.getElementById('fetchUsersButton');
const fetchPostsButton = document.getElementById('fetchPostsButton');
const tableHead = document.getElementById('tableHead');
const tableBody = document.getElementById('tableBody');
const tableTitle = document.getElementById('tableHeading');

fetchUsersButton.addEventListener("click", async() => {
    const data = await fetchUsers();
    populateTable(data);
    tableTitle.innerHTML = `User Data`;
});

fetchPostsButton.addEventListener("click", async() => {
    const data = await fetchPosts();
    populateTable(data);
    tableTitle.innerHTML = `Post Data`;

});

async function fetchUsers() {
    try{
        let response = await fetch('https://jsonplaceholder.typicode.com/users');
        let data = await response.json();
        console.log(data); // Testing
        return data;
    }catch(error){
        console.log("Error fetching user data", error);
    }
}

async function fetchPosts() {
    try{
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        let data = await response.json();
        console.log(data); // Testing
        return data;
    }catch(error){
        console.log("Error fetching post data", error);
    }

}

function populateTable(data){
    // Check if there is data to populate the table
    if(!data){
        console.log("No data to populate table");
        return;
    }

    // Clear previous table content
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";

    // Dynamically generate table headers
    const headers = Object.keys(data[0]); // Get table the keys from the first object = table headers
    let headerRow = "<tr>";
    headers.forEach(header => {
        headerRow += `<th>${header}</th>`;
    });
    headerRow += "</tr>";
    // Insert the header row into the table
    tableHead.innerHTML = headerRow;

    // Dynamically generate table body
    let bodyContent = "";
    data.forEach(item => {
        let bodyRow = "<tr>";
        headers.forEach(header => {
            bodyRow += `<td>${item[header]}</td>`;
        });
        bodyRow += "</tr>";
        bodyContent += bodyRow;
    });

    // Insert the body content into the table
    tableBody.innerHTML = bodyContent;
    

    
}

