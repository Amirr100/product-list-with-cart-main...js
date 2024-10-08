let cart = [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const checkoutButton = document.getElementById('checkout-button'); 


document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const item = {
      name: this.parentNode.querySelector('span').innerText,
      price: parseFloat(this.parentNode.querySelector('.text-danger').innerText.replace('$', '')), 
      image: this.parentNode.querySelector('img').src 
    };
    
    cart.push(item);
    updateCart();
  });
});


function updateCart() {
  cartCount.innerText = cart.length;

  let total = 0; 

  if (cart.length === 0) {
    cartItems.innerHTML = '<img src="./images/illustration-empty-cart.svg" alt=""><p>Your added items will appear here</p>';
    checkoutButton.classList.add('d-none'); 
  } else {
    cartItems.innerHTML = '';
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');

      
      cartItem.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="${item.image}" alt="${item.name}" class="me-3" style="width: 50px; height: 50px;">
          <p class="m-0">${item.name} - $${item.price.toFixed(2)}</p>
        </div>
      `;
      cartItems.appendChild(cartItem);

      
      total += item.price;
    });

    
    const cartTotal = document.createElement('div');
    cartTotal.innerHTML = `<p class="fw-bold mt-3">Total: $${total.toFixed(2)}</p>`;
    cartItems.appendChild(cartTotal);

    
    checkoutButton.classList.remove('d-none');
  }
}


checkoutButton.addEventListener('click', function() {
    const orderItemsContainer = document.getElementById('order-items');
    orderItemsContainer.innerHTML = ''; 
    let total = 0;

    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('d-flex', 'align-items-center');
        orderItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="me-3" style="width: 50px; height: 50px;">
            <p class="m-0">${item.name} - $${item.price.toFixed(2)}</p>
        `;
        orderItemsContainer.appendChild(orderItem);
        total += item.price;
    });

    document.getElementById('order-total').innerText = `Total: $${total.toFixed(2)}`;
    
    const orderModal = new bootstrap.Modal(document.getElementById('order-modal'));
    orderModal.show(); 
});


document.getElementById('new-order-button').addEventListener('click', function() {
    cart = []; 
    updateCart();
    const orderModal = bootstrap.Modal.getInstance(document.getElementById('order-modal'));
    orderModal.hide(); 
});

