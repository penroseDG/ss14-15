class MenuItem {
    id: number;
    name: string;
    price: number;
    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
class Table {
    id: number;
    capacity: number;
    available: boolean;
    constructor(id: number, capacity: number) {
        this.id = id;
        this.capacity = capacity;
        this.available = true;
    }
}
class Reservation {
    id: number;
    customerName: string;
    tableId: number;
    constructor(id: number, customerName: string, tableId: number) {
        this.id = id;
        this.customerName = customerName;
        this.tableId = tableId;
    }
}
class Order {
    id: number;
    tableId: number;
    items: MenuItem[];
    constructor(id: number, tableId: number) {
        this.id = id;
        this.tableId = tableId;
        this.items = [];
    }
    getTotal(): number {
        let total = 0;
        for (let item of this.items) {
            total += item.price;
        }
        return total;
    }
}
class Restaurant {
    menu: MenuItem[];
    tables: Table[];
    reservations: Reservation[];
    orders: Order[];
    constructor() {
        this.menu = [];
        this.tables = [];
        this.reservations = [];
        this.orders = [];
    }
    addMenuItem(item: MenuItem): void {
        this.menu.push(item);
    }
    addTable(table: Table): void {
        this.tables.push(table);
    }
    makeReservation(id: number, customerName: string, tableId: number): void {
        let table = this.tables.find(table => table.id === tableId);
        if (table) {
            if (table.available) {
                table.available = false;
                let reservation = new Reservation(id, customerName, tableId);
                this.reservations.push(reservation);
                console.log(`Bàn ${tableId} đã được đặt cho ${customerName}`);
            } else {
                console.log(`Bàn ${tableId} đã có người đặt trước.`);
            }
        } else {
            console.log(`Không tìm thấy bàn có id ${tableId}.`);
        }
    }
    placeOrder(id: number, tableId: number, items: MenuItem[]): void {
        let order = new Order(id, tableId);
        order.items = items;
        this.orders.push(order);
    }
    generateBill(tableId: number): void {
        let order = this.orders.find(order => order.tableId === tableId);
        if (order) {
            console.log(`Tổng tiền của bàn ${tableId}: ${order.getTotal()} đ`);
            let table = this.tables.find(table => table.id === tableId);
            if (table) {
                table.available = true;
            }
        } else {
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
