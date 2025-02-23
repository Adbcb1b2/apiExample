// Get button elements
const fetchUsersButton = document.getElementById('fetchUsersButton');
const fetchPostsButton = document.getElementById('fetchPostsButton');
const tableHead = document.getElementById('tableHead');
const tableBody = document.getElementById('tableBody');
const tableTitle = document.getElementById('tableHeading');

// Event listeners for buttons
fetchUsersButton.addEventListener("click", async () => {
    const data = await fetchData('https://jsonplaceholder.typicode.com/users');
    populateTable(data);
    tableTitle.innerHTML = 'User Data';
});

fetchPostsButton.addEventListener("click", async () => {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    populateTable(data);
    tableTitle.innerHTML = 'Post Data';
});

// Function to fetch data
async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data); // Testing
        return data;
    } catch (error) {
        console.log("Error fetching data", error);
        return null;  // Return null in case of an error
    }
}

// Function to populate the table
function populateTable(data) {
    // Check if there is data to populate the table
    if (!data) {
        console.log("No data to populate table");
        return;
    }

    // Clear previous table content
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";

    // Dynamically generate table headers
    const headers = Object.keys(data[0]); // Get table headers from the first object
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