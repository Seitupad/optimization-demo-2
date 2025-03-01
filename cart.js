import products from "./products.js";

const cart = () => {
  let listCartHTML = document.querySelector(".listCart");
  let iconCart = document.querySelector(".icon-cart");
  let iconCartSpan = iconCart.querySelector("span");
  let body = document.querySelector("body");
  let closeCart = document.querySelector(".close");
  let cart = [];
  let totalBalance = 10000; // Initial balance

  // You can update totalBalance manually in the script here
  const updateTotalBalance = (newBalance) => {
    totalBalance = newBalance;
    addCartToHTML(); // Update the cart to reflect the new balance
  };

  // open and close tab
  iconCart.addEventListener("click", () => {
    body.classList.toggle("activeTabCart");
  });
  closeCart.addEventListener("click", () => {
    body.classList.toggle("activeTabCart");
  });

  const setProductInCart = (idProduct, value) => {
    let positionThisProductInCart = cart.findIndex(
      (value) => value.product_id == idProduct
    );
    if (value <= 0) {
      cart.splice(positionThisProductInCart, 1);
    } else if (positionThisProductInCart < 0) {
      cart.push({
        product_id: idProduct,
        quantity: 1,
      });
    } else {
      cart[positionThisProductInCart].quantity = value;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    addCartToHTML();
  };

  const addCartToHTML = () => {
    listCartHTML.innerHTML = "";
    let totalQuantity = 0;
    let totalPrice = 0;
    let totalProfit = 0;

    if (cart.length > 0) {
      cart.forEach((item) => {
        totalQuantity += item.quantity;
        let newItem = document.createElement("div");
        newItem.classList.add("item");
        newItem.dataset.id = item.product_id;

        let positionProduct = products.findIndex(
          (value) => value.id == item.product_id
        );
        let info = products[positionProduct];

        // Calculate total price and total profit for each item in the cart
        let itemTotalPrice = info.price * item.quantity;
        let itemProfit = info.profit * item.quantity;
        totalPrice += itemTotalPrice;
        totalProfit += itemProfit;

        listCartHTML.appendChild(newItem);
        newItem.innerHTML = `
            <div class="image">
              <img src="${info.image}" />
            </div>
            <div class="name">
              ${info.name}
            </div>
            <div class="totalPrice">$${itemTotalPrice.toFixed(2)}</div>
            <div class="quantity">
            <div class="success">Done</div>
            </div>
          `;
      });
    }

    // Update the cart total price and profit
    document.getElementById("totalPrice").innerText = totalPrice.toFixed(2);
    document.getElementById("totalProfit").innerText = totalProfit.toFixed(2);
    document.getElementById("remainingBalance").innerText = (
      totalBalance - totalProfit
    ).toFixed(2);

    // Update cart item quantity count
    iconCartSpan.innerText = totalQuantity;
  };

  document.addEventListener("click", (event) => {
    let buttonClick = event.target;
    let idProduct = buttonClick.dataset.id;
    let quantity = null;
    let positionProductInCart = cart.findIndex(
      (value) => value.product_id == idProduct
    );
    switch (true) {
      case buttonClick.classList.contains("addCart"):
        quantity =
          positionProductInCart < 0
            ? 1
            : cart[positionProductInCart].quantity + 1;
        setProductInCart(idProduct, quantity);
        break;
      // case buttonClick.classList.contains("minus"):
      //   quantity = cart[positionProductInCart].quantity - 1;
      //   setProductInCart(idProduct, quantity);
      //   break;
      // case buttonClick.classList.contains("plus"):
      //   quantity = cart[positionProductInCart].quantity + 1;
      //   setProductInCart(idProduct, quantity);
      //   break;
      default:
        break;
    }
  });

  // Random Product Button functionality
  const randomProductBtn = document.getElementById("randomProductBtn");
  const contentTab = document.getElementById("contentTab");

  randomProductBtn.addEventListener("click", () => {
    // Pick a random product from the product list
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const productHTML = `
      <div class="random-product">
        <h2>Data Submission</h2>
        <img src="${randomProduct.image}" alt="${randomProduct.name}" />
        <h3>${randomProduct.name}</h3>
        <p>Price: $${randomProduct.price}</p>
        <p>profit: $${randomProduct.profit}</p>
        <button class="addCart" data-id="${randomProduct.id}">Data submission</button>
      </div>
    `;
    contentTab.style.display = "block";
    contentTab.innerHTML = productHTML;
  });

  const initApp = () => {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      addCartToHTML();
    }
  };
  initApp();

  // You can call the updateTotalBalance function to manually set the balance
  // Example: To set the balance to 15000
  updateTotalBalance(10000);
};

export default cart;
