// Try to load the items array from localStorage, or start with an empty array if nothing is saved yet
let items = JSON.parse(localStorage.getItem('billItems')) || [];

// Save the current items array to localStorage as a string
function saveToLocal() {
    localStorage.setItem('billItems', JSON.stringify(items));
}

// Add a new item to the bill
function addItem() {
    // Get the item name and price from the input fields
    const name = document.getElementById('itemName').value.trim();
    const priceStr = document.getElementById('itemPrice').value.trim();
    const price = parseFloat(priceStr); // Convert the price to a number

    // Check if name is not empty, price is a number, and price is greater than 0
    if (name && !isNaN(price) && price > 0) {
        // Add the new item to the array
        items.push({ name, price });
        saveToLocal(); // Save the updated array to localStorage

        // Clear the input fields for the next entry
        document.getElementById('itemName').value = '';
        document.getElementById('itemPrice').value = '';

        updateBill(); // Update the displayed bill
        document.getElementById('finalBill').style.display = 'none'; // Hide the final bill if it was shown
    } else {
        // Show an alert if the input is invalid
        alert('Please enter a valid item name and price.');
    }
}

// Delete an item from the bill by its index
function deleteItem(index) {
    items.splice(index, 1); // Remove the item at the given index
    saveToLocal(); // Save the updated array to localStorage
    updateBill(); // Update the displayed bill
    document.getElementById('finalBill').style.display = 'none'; // Hide the final bill if it was shown
}

// Update the bill display on the page
function updateBill() {
    const billItems = document.getElementById('billItems');
    billItems.innerHTML = ''; // Clear the current list

    let total = 0; // To keep track of the total amount

    // Loop through all items and create a list item for each
    items.forEach((item, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ₹${item.price.toFixed(2)}
            <button class="delete-btn" onclick="deleteItem(${idx})">Delete</button>`;
        billItems.appendChild(li); // Add the list item to the bill
        total += item.price; // Add to the total
    });

    // Show the total amount
    document.getElementById('totalAmount').textContent = `Total: ₹${total.toFixed(2)}`;
}

// Show the final bill in a summary box
function showBill() {
    // If there are no items, alert the user
    if (items.length === 0) {
        alert('No items to show in the bill!');
        return;
    }

    // Build the HTML for the final bill
    let billHTML = '<strong>Final Bill</strong><ul>';
    let total = 0;
    items.forEach(item => {
        billHTML += `<li>${item.name} - ₹${item.price.toFixed(2)}</li>`;
        total += item.price;
    });
    billHTML += `</ul><strong>Total: ₹${total.toFixed(2)}</strong>`;

    // Display the final bill
    const finalBill = document.getElementById('finalBill');
    finalBill.innerHTML = billHTML;
    finalBill.style.display = 'block';
}

// Reset the bill and clear everything from localStorage
function resetBill() {
    // Ask the user to confirm before resetting
    if (confirm('Are you sure you want to reset the bill?')) {
        items = []; // Clear the items array
        saveToLocal(); // Clear localStorage
        updateBill(); // Update the displayed bill
        document.getElementById('finalBill').style.display = 'none'; // Hide the final bill
    }
}

// When the page loads, display the bill (with any saved items)
updateBill();
