document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        window.location.href = "index.html"; // Redirect to home page if product ID is not specified
    }

    fetchProductDetails(productId);

    function fetchProductDetails(productId) {
        fetch(`http://localhost:8081/api/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                renderProductDetails(product);
            })
            .catch(error => console.error("Error fetching product details:", error));
    }

    function renderProductDetails(product) {
        const productDetails = document.getElementById("productDetails");
        productDetails.innerHTML = `
            <p>ID: ${product.productId}</p>
            <p>Name: ${product.productName}</p>
            <p>Price: $${product.unitprice}</p>
            <p>Description: ${product.description}</p>
            <!-- Add more product details as needed -->
        `;
    }
});
