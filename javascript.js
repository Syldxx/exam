const productContainer = document.getElementById("productContainer");
const addProductButton = document.getElementById("addProduct");


let products = JSON.parse(localStorage.getItem("products")) || [];


function displayProducts() {
  productContainer.innerHTML = "";
  products.forEach((product, index) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-item");

    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div>
        <h3>${product.name}</h3>
        <p>${product.price}₮</p>
      </div>
      <div>
        <button class="delete-btn" onclick="deleteProduct(${index})">Устгах</button>
      </div>
    `;
    productContainer.appendChild(productDiv);
  });
}

addProductButton.addEventListener("click", () => {
  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value.trim();
  const image = document.getElementById("productImage").value.trim();

  if (name && price && image) {
    const product = { name, price, image };
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts(); 
    clearInputs();
  } else {
    alert("Бүх талбарыг бөглөнө үү!");
  }
});


function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products)); 
  displayProducts();
}


function viewDetails(index) {
  localStorage.setItem("selectedProduct", JSON.stringify(products[index])); 
  window.location.href = "details.html";
}


function clearInputs() {
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productImage").value = "";
}


if (window.location.pathname.includes("details.html")) {
  const productDetails = document.getElementById("productDetails");
  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

  if (selectedProduct) {
    productDetails.innerHTML = `
      <img src="${selectedProduct.image}" alt="${selectedProduct.name}" style="width: 300px;">
      <h3>${selectedProduct.name}</h3>
      <p>${selectedProduct.price}₮</p>
    `;
  }
}


if (productContainer) {
  displayProducts();
}