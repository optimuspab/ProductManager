const fs = require('fs');
const path = require('path');

class Product {
    constructor(id, title, description, price, code, stock, category, thumbnails = []) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.status = true;
        this.code = code;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
    }
}

class ProductManager {
    constructor() {
        this.products = [];
        this.currentId = 1;
        this.filePath = path.join(__dirname, '..', 'data', 'productos.json');
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                this.currentId = Math.max(...this.products.map(product => product.id)) + 1;
            }
        } catch (error) {
            console.log('No se encontraron datos existentes, comenzando con una lista de productos vacía.');
        }
    }

    saveProducts() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));
    }

    addProduct(title, description, price, code, stock, category, thumbnails = []) {
        if (!title || !description || !price || !code || !stock || !category) {
            const errorMsg = 'Todos los campos son obligatorios: title, description, price, code, stock y category.';
            return { success: false, message: errorMsg };
        }

        if (this.products.some(product => product.code === code)) {
            const errorMsg = `El producto con el código ${code} ya existe.`;
            return { success: false, message: errorMsg };
        }

        const newProduct = new Product(this.currentId++, title, description, price, code, stock, category, thumbnails);
        this.products.push(newProduct);
        this.saveProducts();
        const successMsg = `Producto agregado`;
        return { success: true, message: successMsg, newProduct };
    }

    getProducts(limit) {
        if (limit) {
            return this.products.slice(0, limit);
        }
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            const errorMsg = `No existe producto con el ID ${id}.`;
            return { success: false, message: errorMsg };
        }
        return { success: true, product };
    }  

    updateProduct(id, updatedInfo) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            const errorMsg = `El producto con el ID ${id} no se encuentra.`;
            return { success: false, message: errorMsg };
        }
        
        this.products[productIndex] = { ...this.products[productIndex], ...updatedInfo, id: this.products[productIndex].id };
        this.saveProducts();
        
        const successMsg = `Producto actualizado exitosamente.`;
        return { success: true, product: this.products[productIndex], message: successMsg };
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            console.log(`El producto con el ID ${id} no se encuentra.`);
            return false;
        }

        const removedProduct = this.products.splice(productIndex, 1);
        this.saveProducts();
        console.log('Producto eliminado:', removedProduct);
        return true;
    }
}

const productManager = new ProductManager();
module.exports = productManager; 