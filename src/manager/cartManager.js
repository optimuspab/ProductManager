const fs = require('fs');
const path = require('path');

class Cart {
    constructor(id) {
        this.id = id;
        this.products = [];
    }
}

class CartManager {
    constructor() {
        this.carts = [];
        this.currentId = 1;
        this.filePath = path.join(__dirname, '..', 'data', 'carrito.json');
        this.loadCarts();
    }

    loadCarts() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            this.carts = JSON.parse(data);
            if (this.carts.length > 0) {
                this.currentId = Math.max(...this.carts.map(cart => cart.id)) + 1;
            }
        } catch (error) {
            console.log('No se encontraron datos existentes, comenzando con una lista de carritos vacía.');
        }
    }

    saveCarts() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.carts, null, 2));
    }

    createCart() {
        const newCart = new Cart(this.currentId++);
        this.carts.push(newCart);
        this.saveCarts();
        return newCart;
    }

    getCartById(id) {
        return this.carts.find(cart => cart.id === id);
    }

    addProductToCart(cartId, productId) {
        const cart = this.getCartById(cartId);
        if (!cart) {
            return { success: false, message: 'Carrito no encontrado' };
        }

        const productInCart = cart.products.find(p => p.product === productId);
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        this.saveCarts();
        return { success: true };
    }
}

const cartManager = new CartManager();
module.exports = cartManager;