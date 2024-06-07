// details.js
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        window.location.href = 'index.html';
    } else {
        fetch(`/api/products/${productId}`)
            .then(response => response.json())
            .then(product => displayProductDetails(product))
            .catch(error => console.error('Error fetching product details:', error));
    }

    function displayProductDetails(product) {
        const productDetails = document.getElementById('productDetails');
        productDetails.innerHTML = `
            <p>Product ID: ${product.productId}</p>
            <p>Name: ${product.productName}</p>
            <p>Price: $${product.unitPrice}</p>
            <p>Units in Stock: ${product.unitsInStock}</p>
            <p>Category ID: ${product.categoryId}</p>
            <p>Supplier: ${product.supplier
