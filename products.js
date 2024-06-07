// products.js
document.addEventListener('DOMContentLoaded', function() {
    const searchOption = document.getElementById('searchOption');
    const categoryDropdown = document.getElementById('categoryDropdown');
    const categorySelect = document.getElementById('category');
    const productList = document.getElementById('productList');

    searchOption.addEventListener('change', function() {
        if (searchOption.value === 'searchByCategory') {
            categoryDropdown.style.display = 'block';
            fetchCategories();
        } else {
            categoryDropdown.style.display = 'none';
            fetchAllProducts();
        }
    });

    categorySelect.addEventListener('change', function() {
        const categoryId = categorySelect.value;
        fetchProductsByCategory(categoryId);
    });

    function fetchCategories() {
        fetch('http://localhost:8081/api/categories')
            .then(response => response.json())
            .then(categories => {
                categorySelect.innerHTML = '<option value="">Select a category</option>';
                categories.forEach(category => {
                    categorySelect.innerHTML += `<option value="${category.categoryId}">${category.name}</option>`;
                });
            })
            .catch(error => console.error('Error fetching categories:', error));
    }

    function fetchAllProducts() {
        fetch('http://localhost:8081/api/products')
            .then(response => response.json())
            .then(products => displayProducts(products))
            .catch(error => console.error('Error fetching products:', error));
    }

    function fetchProductsByCategory(categoryId) {
        fetch(`http://localhost:8081/api/categories/${categoryId}`)
            .then(response => response.json())
            .then(category => fetch(`http://localhost:8081/api/products/categoryId=${category.categoryId}`))
            .then(response => response.json())
            .then(products => displayProducts(products))
            .catch(error => console.error('Error fetching products by category:', error));
    }

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.innerHTML = `
                <p>Product ID: ${product.productId}</p>
                <p>Name: ${product.productName}</p>
                <p>Price: $${product.unitPrice}</p>
                <a href="details.html?id=${product.productId}">See Details</a>
            `;
            productList.appendChild(productItem);
        });
    }
});
