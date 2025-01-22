// this is rehman work here
const productForm = document.getElementById("productForm");
const productTable = document.getElementById("productTable");
const productQuantityInput = document.getElementById("productQuantity");
const quantityError = document.getElementById("quantityError");

const maxQuantity = 5000;
productQuantityInput.addEventListener("input", function () {
  const enteredQuantity = parseFloat(productQuantityInput.value);

  if (enteredQuantity > maxQuantity) {
    quantityError.style.display = "block";
  } else {
    quantityError.style.display = "none";
  }
});

productForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the selected product from the dropdown
  const productName = document.getElementById("productSelect").value;
  const productQuantity = parseFloat(
    document.getElementById("productQuantity").value
  );
  const productPrice = parseFloat(
    document.getElementById("productPrice").value
  );
  const discount = parseFloat(document.getElementById("discount").value) || 0;
  const tax = parseFloat(document.getElementById("tax").value) || 0;

  

  const totalCost = productQuantity * productPrice;
  const discountAmount = (totalCost * discount) / 100;
  const taxAmount = ((totalCost - discountAmount) * tax) / 100;
  const finalCost = totalCost - discountAmount + taxAmount;

  // Get the current date and time
  const currentDate = new Date();
  const dateAdded = currentDate.toLocaleString(); // Format: "MM/DD/YYYY, HH:MM:SS AM/PM"

  const row = document.createElement("tr");

  row.innerHTML = `
  <td>${productName}</td>
  <td>${productQuantity}</td>
  <td>${productPrice.toFixed(2)}</td>
  <td>${discount}%</td>
  <td>${tax}%</td>
  <td>${totalCost.toFixed(2)}</td>
  <td>${finalCost.toFixed(2)}</td>
  <td>${dateAdded}</td>
  <td><button class = "btn btn-danger btn-sm btn-delete">Delete</button></td>
`;


row.querySelector(".btn-delete").addEventListener("click", function () {
  row.remove()
})

  productTable.appendChild(row);

 
  function updateGrandTotal() {
    let total = 0;
    document.querySelectorAll("#productTable tr").forEach(function (row) {
      const finalCost = parseFloat(row.children[6].textContent) || 0;
      total = total + finalCost;
      

    });
    document.getElementById("grandTotal").textContent = total.toFixed(2);
  } 

 
  productForm.addEventListener("submit", updateGrandTotal);
 

  productForm.reset();
});
