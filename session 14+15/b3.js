"use strict";
class MenuItem {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
class Table {
    constructor(id, capacity) {
        this.id = id;
        this.capacity = capacity;
        this.available = true;
    }
}
class Reservation {
    constructor(id, customerName, tableId) {
        this.id = id;
        this.customerName = customerName;
        this.tableId = tableId;
    }
}
class Order {
    constructor(id, tableId) {
        this.id = id;
        this.tableId = tableId;
        this.items = [];
    }
    getTotal() {
        let total = 0;
        for (let item of this.items) {
            total += item.price;
        }
        return total;
    }
}
class Restaurant {
    constructor() {
        this.menu = [];
        this.tables = [];
        this.reservations = [];
        this.orders = [];
    }
    addMenuItem(item) {
        this.menu.push(item);
    }
    addTable(table) {
        this.tables.push(table);
    }
    makeReservation(id, customerName, tableId) {
        let table = this.tables.find(table => table.id === tableId);
        if (table) {
            if (table.available) {
                table.available = false;
                let reservation = new Reservation(id, customerName, tableId);
                this.reservations.push(reservation);
                console.log(`Bàn ${tableId} đã được đặt cho ${customerName}`);
            }
            else {
                console.log(`Bàn ${tableId} đã có người đặt trước.`);
            }
        }
        else {
            console.log(`Không tìm thấy bàn có id ${tableId}.`);
        }
    }
    placeOrder(id, tableId, items) {
        let order = new Order(id, tableId);
        order.items = items;
        this.orders.push(order);
    }
    generateBill(tableId) {
        let order = this.orders.find(order => order.tableId === tableId);
        if (order) {
            console.log(`Tổng tiền của bàn ${tableId}: ${order.getTotal()} đ`);
            let table = this.tables.find(table => table.id === tableId);
            if (table) {
                table.available = true;
            }
        }
        else {
            console.log(`Không tìm thấy đơn hàng của bàn ${tableId}.`);
        }
    }
}
let restaurant = new Restaurant();
restaurant.addMenuItem(new MenuItem(1, "Phở", 50000));
restaurant.addMenuItem(new MenuItem(2, "Bún chả", 60000));
restaurant.addMenuItem(new MenuItem(3, "Cà phê sữa đá", 25000));
restaurant.addTable(new Table(1, 4));
restaurant.addTable(new Table(2, 6));
restaurant.addTable(new Table(3, 2));
restaurant.makeReservation(1, "ducvip01", 1);
restaurant.makeReservation(2, "ducvip02", 2);
restaurant.makeReservation(3, "ducvip03", 1);
restaurant.placeOrder(1, 1, [restaurant.menu[0], restaurant.menu[2]]);
restaurant.placeOrder(2, 2, [restaurant.menu[1], restaurant.menu[2]]);
restaurant.generateBill(1);
restaurant.generateBill(2);
restaurant.generateBill(4);
