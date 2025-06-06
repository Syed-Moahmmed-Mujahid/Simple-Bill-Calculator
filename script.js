// Retrieve saved bill items from localStorage, or initialize an empty array if none exist
let items = JSON.parse(localStorage.getItem('billItems')) || [];

// Save current items array to localStorage as a JSON string
function saveToLocal() {
    localStorage.setItem('billItems', JSON.stringify(items));
}

// Function to add a new item to the bill
function addItem() {
    // Get input values from the form fields
    const name = document.getElementById('itemName').value.trim();
    const priceStr = document.getElementById('itemPrice').value.trim();
    const qtyStr = document.getElementById('itemQty').value.trim();

    // Convert input strings to appropriate number types
    const price = parseFloat(priceStr);
    const quantity = parseInt(qtyStr);

    // Validate the inputs: name is not empty, price and quantity are valid numbers and > 0
    if (name && !isNaN(price) && price > 0 && !isNaN(quantity) && quantity > 0) {
        // Add the new item to the items array
        items.push({ name, price, quantity });

        // Save updated items to localStorage
        saveToLocal();

        // Clear input fields after successful addition
        document.getElementById('itemName').value = '';
        document.getElementById('itemPrice').value = '';
        document.getElementById('itemQty').value = '1';

        // Update the bill display
        updateBill();

        // Hide the final bill section (if previously shown)
        document.getElementById('finalBill').style.display = 'none';
    } else {
        // Show error message if validation fails
        alert('Please enter a valid item name, price, and quantity.');
    }
}

// Function to delete an item from the bill by index
function deleteItem(index) {
    // Remove the item from the array
    items.splice(index, 1);

    // Save updated array to localStorage
    saveToLocal();

    // Refresh the bill display
    updateBill();

    // Hide the final bill section
    document.getElementById('finalBill').style.display = 'none';
}

// Function to update the displayed bill item list and total amount
function updateBill() {
    const billItems = document.getElementById('billItems');
    
    // Clear the current list
    billItems.innerHTML = '';

    let total = 0; // To calculate the total amount

    // Loop through each item and create a list element with details and a delete button
    items.forEach((item, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ₹${item.price.toFixed(2)} × ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}
            <button class="delete-btn" onclick="deleteItem(${idx})">Delete</button>`;

        billItems.appendChild(li);

        // Accumulate total price
        total += item.price * item.quantity;
    });

    // Update the total amount display
    document.getElementById('totalAmount').textContent = `Total: ₹${total.toFixed(2)}`;
}

// Function to display the final bill summary
function showBill() {
    // Check if there are items to show
    if (items.length === 0) {
        alert('No items to show in the bill!');
        return;
    }

    let billHTML = '<strong>Final Bill</strong><ul>';
    let total = 0;

    // Loop through items and create bill summary in HTML format
    items.forEach(item => {
        billHTML += `<li>${item.name} - ₹${item.price.toFixed(2)} × ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}</li>`;
        total += item.price * item.quantity;
    });

    // Add total to the HTML
    billHTML += `</ul><strong>Total: ₹${total.toFixed(2)}</strong>`;

    // Set the content and make it visible
    const finalBill = document.getElementById('finalBill');
    finalBill.innerHTML = billHTML;
    finalBill.style.display = 'block';
}

// Function to reset the bill and clear all items
function resetBill() {
    // Ask for user confirmation before clearing
    if (confirm('Are you sure you want to reset the bill?')) {
        // Clear items array
        items = [];

        // Save empty list to localStorage
        saveToLocal();

        // Refresh the displayed list
        updateBill();

        // Hide the final bill section
        document.getElementById('finalBill').style.display = 'none';
    }
}

// Initialize the bill display on page load
updateBill();
