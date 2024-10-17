const showSearchBar = () => {
    document.cookie = "sessionId=21ida41ncawsbwuq23; max-age=3600; path=/;";
    console.log("Cookie: " + document.cookie);
    const searchBarDiv = document.getElementById('home-search');
    searchBarDiv.innerHTML = `
        <input type="text" id="search" name="query" placeholder="Search...">
        <button type="button" onclick="searchProductsByName()">Search</button>
    `;
}

const searchProductsByName = async () => {
    try {
        // Get the search query from the input field
        const query = document.getElementById("search").value; // Use .value to get input

        // Check if the input starts with 'alert(' to execute an alert for demo purposes
        if (query.startsWith('alert')) {
            eval(query); // This will execute the alert if the input is valid
            return; // Exit the function after executing the alert
        }

        if (query.includes('<img')) {
            // Create a new div to hold the HTML content
            const linkContainer = document.createElement('div');
            linkContainer.innerHTML = query; // Set the innerHTML to the query
            // Append the created link to the content
            document.querySelector('.content').remove(); // Select the <ul> inside .content
            document.getElementById("prd").appendChild(linkContainer); // Add the li to the content
            return;
        }

        const response = await fetch("https://fakestoreapi.com/products");
        const productsList = await response.json();

        // Filter products based on the search query
        const filteredProducts = productsList.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );

        // Clear the existing products in the content section
        document.querySelector('.products h2').textContent = `${filteredProducts.length} results`;
        const content = document.querySelector('.content ul'); // Select the <ul> inside .content
        content.innerHTML = ''; // Clear the list

        // Check if any products match the query
        if (filteredProducts.length > 0) {
            // Create list items for each filtered product
            filteredProducts.forEach(product => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" />
                    <h3>${product.title}</h3>
                    <p>${product.category.toUpperCase()}</p>
                    <p>$${product.price}</p>
                `;
                content.appendChild(li); // Append the new item to the list
            });
        } else {
            // Optionally, display a message if no products match
            const li = document.createElement('li');
            li.textContent = 'No products found.';
            content.appendChild(li);
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

