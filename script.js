document.addEventListener("DOMContentLoaded", function () {
    const searchOptions = document.getElementById("searchOptions");
    const categoryDropdown = document.getElementById("categoryDropdown");
    const categoryOptions = document.getElementById("categoryOptions");
    const productList = document.getElementById("productList");

    // Event listener for search options dropdown
    searchOptions.addEventListener("change", function () {
        if (searchOptions.value === "searchByCategory") {
            categoryDropdown.style.display = "inline";
            fetchCategories();
        } else if (searchOptions.value === "viewAll") {
            categoryDropdown.style.display = "none";
            fetchAllProducts();
        }
    });

    // Event listener for category dropdown
    categoryOptions.addEventListener("change", function () {
        const categoryName = categoryOptions.value;
        if (categoryName) {
            fetchProductsByCategory(categoryName);
        } else {
            fetchAllProducts();
        }
    });

    // Fetch all categories from the backend API
    function fetchCategories() {
        fetch("http://localhost:8081/api/categories")
            .then(response => response.json())
            .then(categories => {
                // Sort categories by categoryId
                categories.sort((a, b) => a.categoryId - b.categoryId);

                // Populate category dropdown
                categoryOptions.innerHTML = "<option value=''>Select Category...</option>";
                categories.forEach(category => {
                    categoryOptions.innerHTML += `<option value="${category.name}">${category.name}</option>`;
                });
            })
            .catch(error => console.error("Error fetching categories:", error));
    }

    // Fetch all products 
    function fetchAllProducts() {
        fetch("http://localhost:8081/api/products")
            .then(response => response.json())
            .then(products => {
                // Display products
                renderProducts(products);
            })
            .catch(error => console.error("Error fetching products:", error));
    }

    // Fetch products by category 
    function fetchProductsByCategory(categoryName) {
        fetch("http://localhost:8081/api/products")
            .then(response => response.json())
            .then(products => {
                const filteredProducts = products.filter(product => product.categoryName === categoryName);
                renderProducts(filteredProducts);
            })
            .catch(error => console.error("Error fetching products by category:", error));
    }

    // Render products
    function renderProducts(products) {
        productList.innerHTML = ""; // Clear previous content
        products.forEach(product => {
            productList.innerHTML += `
                <div>
                    <p>ID: ${product.productId}</p>
                    <p>Name: ${product.productName}</p>
                    <p>Price: $${product.unitPrice}</p>
                    <p>Category ID: ${product.categoryId}</p>
                    <a href="product-details.html?id=${product.productId}">See Details</a>
                </div>
            `;
        });
    }
    
    // Initial fetch of all products when the page loads
    fetchAllProducts();
});