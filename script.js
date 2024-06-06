// script.js
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
        } else {
            categoryDropdown.style.display = "none";
            fetchAllProducts();
        }
    });

    // Event listener for category dropdown
    categoryOptions.addEventListener("change", function () {
        const categoryId = categoryOptions.value;
        fetchProductsByCategory(categoryId);
    });

    // Fetch all categories from the backend API
    function fetchCategories() {
        fetch("http://localhost:8081/api/categories")
            .then(response => response.json())
            .then(categories => {
                // Populate category dropdown
                categoryOptions.innerHTML = "<option value=''>Select Category...</option>";
                categories.forEach(category => {
                    categoryOptions.innerHTML += `<option value="${category.id}">${category.name}</option>`;
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
    function fetchProductsByCategory(categoryId) {
        fetch(`http://localhost:8081/api/products?categoryId=${categoryId}`)
            .then(response => response.json())
            .then(products => {
                // Display products
                renderProducts(products);
            })
            .catch(error => console.error("Error fetching products by category:", error));
    }

    // Render products
    //function renderProducts(products) {
        //console.log(products)
        //productList.innerHTML = ""; // Clear 
        //products.forEach(product => {
           //productList.innerHTML += `
               // <div>
                   // <p>ID: ${product.productId}</p>
                    //<p>Name: ${product.productName}</p>
                    //<p>Price: $${product.unitPrice}</p>
                   // <a href="product-details.html?id=${product.id}">See Details</a>
               // </div>
           // `;
       // });
   // }
//});
// Render products
function renderProducts(products) {
    console.log(products);
    const productsByCategory = groupProductsByCategory(products);
    productList.innerHTML = ""; // Clear previous content
    Object.keys(productsByCategory).forEach(category => {
        productList.innerHTML += `<h2>${category}</h2>`;
        productsByCategory[category].forEach(product => {
            productList.innerHTML += `
                <div>
                    <p>ID: ${product.productId}</p>
                    <p>Name: ${product.productName}</p>
                    <p>Price: $${product.unitPrice}</p>
                    <a href="product-details.html?id=${product.id}">See Details</a>
                </div>
            `;
        });
    });
}

// Group products by category
function groupProductsByCategory(products) {
    const groupedProducts = {};
    products.forEach(product => {
        if (!groupedProducts[product.categoryName]) {
            groupedProducts[product.categoryName] = [];
        }
        groupedProducts[product.categoryName].push(product);
    });
    return groupedProducts;
}
});
