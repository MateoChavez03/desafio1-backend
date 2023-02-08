const socket = io();

// New product
const newProduct = document.getElementById('newProduct');
newProduct.addEventListener('submit', event => {
  event.preventDefault();
  let name = document.getElementById('name').value;
  let price = document.getElementById('price').value;
  let src = document.getElementById('src').value;
  socket.emit('new_product', {
    name : name,
    price : price,
    src : src
  });
  newProduct.reset();
})

// Update products
socket.on('update_products', products => {
  fetch('http://localhost:8080/views/products-render.hbs')
    .then(response => {
      return response.text();
    })
    .then(productsTemplate => {
      let template = Handlebars.compile(productsTemplate);
      let html = template({products})
      document.getElementById('products').innerHTML = html;
    })
})

// New message
const newMessage = document.getElementById('messageForm');
newMessage.addEventListener('submit', event => {
  event.preventDefault();
  let mail = document.getElementById('email').value;
  let firstname = document.getElementById('firstname').value;
  let lastname = document.getElementById('lastname').value;
  let age = document.getElementById('age').value;
  let nickname = document.getElementById('nickname').value;
  let msg = document.getElementById('msg').value;
  socket.emit('new_message', {
    author: {
      id: mail,
      firstname,
      lastname,
      age,
      nickname
    },
    msg
  });
  newMessage.reset();
});

// Update message
socket.on('update_messages', messages => {
  fetch('http://localhost:8080/views/messages-render.hbs')
    .then(response => {
      return response.text();
    })
    .then(messagesTemplate => {
      let template = Handlebars.compile(messagesTemplate);
      let html = template({messages});
      document.getElementById('messageDisplay').innerHTML = html;
    })
})