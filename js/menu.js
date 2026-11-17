// Food data: an array containing six objects.
var foods = [
    {
        id: "sandwich",
        name: "Chicken sandwich",
        price: 60,
        prepMinutes: 8,
        image: "images/sandwich.jpg"
    },
    {
        id: "rice",
        name: "Chicken rice bowl",
        price: 120,
        prepMinutes: 12,
        image: "images/rice.jpg"
    },
    {
        id: "burger",
        name: "Chicken burger",
        price: 90,
        prepMinutes: 10,
        image: "images/burger.jpg"
    },
    {
        id: "samosa",
        name: "Vegetable samosa",
        price: 20,
        prepMinutes: 3,
        image: "images/samosa.jpg"
    },
    {
        id: "tea",
        name: "Milk tea",
        price: 15,
        prepMinutes: 2,
        image: "images/tea.jpg"
    },
    {
        id: "juice",
        name: "Fresh orange juice",
        price: 50,
        prepMinutes: 3,
        image: "images/juice.jpg"
    }
];

// Find the selected quantity of a food.
function getQuantity(index) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === foods[index].id) {
            return cart[i].quantity;
        }
    }

    return 0;
}

// Create HTML for the quantity controls.
// locationName keeps menu and cart element IDs different.
function quantityControls(index, locationName) {
    var html = "";

    html += '<div class="quantity-controls">';

    html += '<button class="quantity-button"';
    html += ' onclick="changeQuantity(' + index + ', -1)"';
    html += ' aria-label="Remove one ' + foods[index].name + '">';
    html += '−</button>';

    html += '<span class="quantity-number"';
    html += ' id="' + locationName + '-quantity-' + index + '">';
    html += getQuantity(index);
    html += '</span>';

    html += '<button class="quantity-button"';
    html += ' onclick="changeQuantity(' + index + ', 1)"';
    html += ' aria-label="Add one ' + foods[index].name + '">';
    html += '+</button>';

    html += '</div>';

    return html;
}

// Display the six food cards.
function showMenu() {
    var html = "";

    for (var i = 0; i < foods.length; i++) {
        html += '<div class="food-card">';

        html += '<img class="food-image"';
        html += ' src="' + foods[i].image + '"';
        html += ' alt="' + foods[i].name + '">';

        html += '<div class="food-information">';

        html += '<h3>' + foods[i].name + '</h3>';

        html += '<p class="preparation-time">';
        html += foods[i].prepMinutes + ' min preparation';
        html += '</p>';

        html += '<strong class="food-price">';
        html += 'Tk ' + foods[i].price;
        html += '</strong>';

        html += quantityControls(i, "menu");

        html += '</div>';
        html += '</div>';
    }

    document.getElementById("food-list").innerHTML = html;
}

// Update menu quantities without rebuilding the food cards.
function updateMenuQuantities() {
    for (var i = 0; i < foods.length; i++) {
        document.getElementById("menu-quantity-" + i).innerHTML =
            getQuantity(i);
    }
}

// Change the quantity.
// change is 1 for adding and -1 for subtracting.
function changeQuantity(index, change) {
    var newQuantity = getQuantity(index) + change;

    // Quantities cannot be negative.
    if (newQuantity < 0) {
        return;
    }

    var updatedCart = [];

    // Copy the other foods into the updated cart.
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id !== foods[index].id) {
            updatedCart.push(cart[i]);
        }
    }

    // Add the selected food only if its quantity is positive.
    if (newQuantity > 0) {
        updatedCart.push({
            id: foods[index].id,
            name: foods[index].name,
            price: foods[index].price,
            prepMinutes: foods[index].prepMinutes,
            quantity: newQuantity
        });
    }

    cart = updatedCart;

    updateMenuQuantities();
    showCart();
}

// Remove every unit of a selected food.
function removeItem(index) {
    var quantity = getQuantity(index);

    changeQuantity(index, -quantity);
}


function showCart() {
    var html = "";
    var total = 0;
    var itemCount = 0;

    for (var i = 0; i < foods.length; i++) {
        var quantity = getQuantity(i);

        if (quantity > 0) {
            var subtotal = foods[i].price * quantity;

            total += subtotal;
            itemCount += quantity;

            html += '<div class="cart-item">';

            html += '<h3>' + foods[i].name + '</h3>';

            html += '<p>Tk ' + foods[i].price;
            html += ' × ' + quantity;
            html += ' = Tk ' + subtotal + '</p>';

            html += quantityControls(i, "cart");

            html += '<button class="remove-button"';
            html += ' onclick="removeItem(' + i + ')"';
            html += ' aria-label="Remove all ' + foods[i].name + '">';
            html += 'Remove</button>';

            html += '</div>';
        }
    }

    if (itemCount === 0) {
        html = '<div class="empty-cart">';
        html += '<strong>Your cart is empty.</strong>';
        html += '<p>Add something delicious from the menu.</p>';
        html += '</div>';

        document.getElementById("checkout-button").style.backgroundColor =
            "#ead8cb";

        document.getElementById("checkout-button").style.color =
            "#725e50";

        document.getElementById("checkout-button").style.cursor =
            "not-allowed";
    } else {
        document.getElementById("checkout-button").style.backgroundColor =
            "#b84c1d";

        document.getElementById("checkout-button").style.color =
            "white";

        document.getElementById("checkout-button").style.cursor =
            "pointer";
    }

    document.getElementById("cart-items").innerHTML = html;

    document.getElementById("cart-total").innerHTML =
        "Tk " + total;

    if (itemCount === 1) {
        document.getElementById("item-count").innerHTML =
            "1 item";
    } else {
        document.getElementById("item-count").innerHTML =
            itemCount + " items";
    }
}


function checkCart() {
    if (cart.length === 0) {
        alert("Please add food to your cart first.");
        return false;
    }

    return true;
}

// Run when the page loads.
showMenu();
showCart();