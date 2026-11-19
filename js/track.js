const input = document.querySelector("#token-input");
const button = document.querySelector("#check-btn");
const result = document.querySelector("#result");

function showMessage(text) {
    result.innerHTML = "";
    const p = document.createElement("p");
    p.className = "message";
    p.textContent = text;
    result.appendChild(p);
}

function showOrder(order) {
    result.innerHTML = `
        <h3>${order.token}</h3>
        <p>Pickup time: <strong>${order.pickupTime}</strong></p>
        <p>Prep estimate: <strong>${order.estimatedPrepMinutes} minutes</strong></p>
        <p>Status: <span class="status">${order.status}</span></p>
    `;
}

function checkStatus() {
    const token = input.value.trim().toUpperCase();

    if (token === "") {
        showMessage("Please enter an order token.");
        return;
    }

    const order = getOrders().find(saved => saved.token === token);

    if (!order) {
        showMessage("Order token not found.");
        return;
    }

    showOrder(order);
}

button.addEventListener("click", checkStatus);

// If the link is track.html?token=QL-001, fill the box and look up on load
const fromLink = new URLSearchParams(location.search).get("token");
if (fromLink) {
    input.value = fromLink;
    checkStatus();
}