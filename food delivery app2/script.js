const menuItems = [
  {
    id: 1,
    name: "Cheeseburger",
    price: 150,
    image: "images/burger.jpg"
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    price: 200,
    image: "images/pizza.jpg"
  },
  {
    id: 3,
    name: "Creamy Pasta",
    price: 199,
    image: "images/pasta.jpg"
  },
  {
    id: 4,
    name: "Fresh Salad",
    price: 149,
    image: "images/salad.jpg"
  },
  {
    id: 5,
    name: "Crispy Fries",
    price: 99,
    image: "images/fries.jpg"
  },
];

const cart = [];
const members = [];
const memberOrders = {};

function renderMenu() {
  const menuDiv = document.getElementById("menu-list");
  menuDiv.innerHTML = "";

  menuItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="food-img" />
      <h3>${item.name}</h3>
      <p>Price: ₹${item.price}</p>
      <button onclick="addToCart(${item.id})">Add to Cart</button>
    `;
    menuDiv.appendChild(div);
  });
}

function addToCart(id) {
  const item = menuItems.find(m => m.id === id);
  cart.push(item);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("total");
  cartList.innerHTML = "";

  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    cartList.appendChild(li);
  });

  totalDisplay.textContent = `Total: ₹${total}`;
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Thank you for your order!");
  cart.length = 0;
  updateCart();
}

// ------------------ Group Order Features ------------------

function addMember() {
  const input = document.getElementById("member-name");
  const name = input.value.trim();

  if (name && !members.includes(name)) {
    members.push(name);
    memberOrders[name] = [];
    updateMemberList();
    input.value = "";
  } else {
    alert("Name is empty or already added!");
  }
}

function updateMemberList() {
  const list = document.getElementById("members-list");
  list.innerHTML = "";
  members.forEach(name => {
    const li = document.createElement("li");
    li.innerHTML = `${name} <button onclick="assignItemTo('${name}')">Assign Item</button>`;
    list.appendChild(li);
  });
}

function assignItemTo(name) {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const item = cart.pop(); // Assign the last item added
  memberOrders[name].push(item);
  updateCart(); // Refresh cart
  alert(`${item.name} assigned to ${name}`);
}

  function splitBill() {
    const resultsDiv = document.getElementById("split-results");
    resultsDiv.innerHTML = "<h3>Split Summary:</h3>";
  
    if (members.length === 0) {
      resultsDiv.innerHTML += "<p>No members added yet.</p>";
      return;
    }
  
    let grandTotal = 0;
  
    members.forEach(name => {
      const total = memberOrders[name].reduce((sum, item) => sum + item.price, 0);
      grandTotal += total;
      const formatted = total.toLocaleString("en-IN");
      resultsDiv.innerHTML += `<p>👤 ${name}: ₹${formatted}</p>`;
    });
  
    const formattedGrandTotal = grandTotal.toLocaleString("en-IN");
    resultsDiv.innerHTML += `<hr><p><strong>Total Group Bill: ₹${formattedGrandTotal}</strong></p>`;
  }
  


window.onload = renderMenu;
