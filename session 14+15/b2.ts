class Product {
    id: number;
    name: string;
    price: number;
    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
class CartProduct extends Product {
    quantity: number;
    constructor(id: number, name: string, price: number, quantity: number) {
        super(id, name, price);
        this.quantity = quantity;
    }
    calculatePrice(): number {
        return this.price * this.quantity;
    }
    increaseQuantity(): void {
        this.quantity++;
    }
    decreaseQuantity(): void {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }
}
class ShopProduct extends Product {
    stock: number;
    constructor(id: number, name: string, price: number, stock: number) {
        super(id, name, price);
        this.stock = stock;
    }
}
class Cart {
    items: CartProduct[];
    constructor() {
        this.items = [];
    }
    addItem(product: ShopProduct, quantity: number): void {
        if (quantity <= product.stock) {
            let cartProduct = new CartProduct(product.id, product.name, product.price, quantity);
            this.items.push(cartProduct);
            product.stock -= quantity;
        } else {
            console.log(`Số lượng cần mua vượt quá số lượng trong kho.`);
        }
    }
    removeItem(cartProduct: CartProduct): void {
        let index = this.items.indexOf(cartProduct);
        if (index !== -1) {
            let removedProduct = this.items.splice(index, 1)[0];
            let shopProduct = new ShopProduct(removedProduct.id, removedProduct.name, removedProduct.price, removedProduct.quantity);
            shopProduct.stock += removedProduct.quantity;
        }
    }
    getTotal(): number {
        let total = 0;
        for (let cartProduct of this.items) {
            total += cartProduct.calculatePrice();
        }
        return total;
    }
}
let shopProducts: ShopProduct[] = [
    new ShopProduct(1, "iphone11 1", 10, 5),
    new ShopProduct(2, "samsung XS 2", 20, 3),
    new ShopProduct(3, " xiaomi 3", 30, 7)
];
let cart = new Cart();
cart.addItem(shopProducts[0], 2);
cart.addItem(shopProducts[1], 1);
console.log("Total after adding items:", cart.getTotal());
cart.removeItem(cart.items[0]);
console.log("Total after removing an item:", cart.getTotal());
