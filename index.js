// Order Processing System

let orders = [
    {
        id: 1,
        customerName: "Edelbert",
        items: [
            { name: "Laptop", quantity: 1, price: 999.99 },
            { name: "Mouse", quantity: 2, price: 25.50 }
        ],
        status: "completed"
    },
    {
        id: 2,
        customerName: "Mark Ace",
        items: [
            { name: "Smartphone", quantity: 1, price: 699.99 },
            { name: "Case", quantity: 1, price: 19.99 },
            { name: "Screen Protector", quantity: 2, price: 9.99 }
        ],
        status: "pending"
    },
    {
        id: 3,
        customerName: "Mark Labitag",
        items: [
            { name: "Tablet", quantity: 1, price: 399.99 },
            { name: "Keyboard", quantity: 1, price: 79.99 }
        ],
        status: "completed"
    },
    {
        id: 4,
        customerName: "Edelbert",
        items: [
            { name: "Monitor", quantity: 2, price: 199.99 },
            { name: "HDMI Cable", quantity: 3, price: 12.99 }
        ],
        status: "shipped"
    },
    {
        id: 5,
        customerName: "Justine",
        items: [
            { name: "Headphones", quantity: 1, price: 149.99 }
        ],
        status: "completed"
    }
];

// 1. Calculate total revenue from completed orders
function calculateTotalRevenue() {
    const completedOrders = orders.filter(order => order.status === "completed");
    
    const totalRevenue = completedOrders.reduce((total, order) => {
        const orderTotal = order.items.reduce((orderSum, item) => {
            return orderSum + (item.quantity * item.price);
        }, 0);
        return total + orderTotal;
    }, 0);
    
    return totalRevenue.toFixed(2);
}

// 2. Filter orders by status
function filterOrdersByStatus(status) {
    return orders.filter(order => order.status === status);
}

// 3. Find the largest order by value
function findLargestOrder() {
    if (orders.length === 0) return null;
    
    let largestOrder = orders[0];
    let largestValue = 0;
    
    orders.forEach(order => {
        const orderValue = order.items.reduce((total, item) => {
            return total + (item.quantity * item.price);
        }, 0);
        
        if (orderValue > largestValue) {
            largestValue = orderValue;
            largestOrder = order;
        }
    });
    
    return {
        order: largestOrder,
        totalValue: largestValue.toFixed(2)
    };
}

// 4. Group orders by customer
function groupOrdersByCustomer() {
    const grouped = {};
    
    orders.forEach(order => {
        const customer = order.customerName;
        if (!grouped[customer]) {
            grouped[customer] = [];
        }
        grouped[customer].push(order);
    });
    
    return grouped;
}

// 5. Calculate total value for a single order
function calculateOrderTotal(order) {
    return order.items.reduce((total, item) => {
        return total + (item.quantity * item.price);
    }, 0).toFixed(2);
}

// 6. Simulate fetching new orders asynchronously
function fetchNewOrders() {
    return new Promise((resolve) => {
        console.log("Fetching new orders...");
        
        setTimeout(() => {
            const newOrders = [
                {
                    id: orders.length + 1,
                    customerName: "Kurt",
                    items: [
                        { name: "Smart Watch", quantity: 1, price: 199.99 },
                        { name: "Charger", quantity: 1, price: 29.99 }
                    ],
                    status: "pending"
                },
                {
                    id: orders.length + 2,
                    customerName: "Rodel",
                    items: [
                        { name: "Camera", quantity: 1, price: 599.99 },
                        { name: "Memory Card", quantity: 2, price: 49.99 },
                        { name: "Camera Bag", quantity: 1, price: 79.99 }
                    ],
                    status: "completed"
                }
            ];
            
            orders.push(...newOrders);
            console.log("New orders fetched successfully!");
            resolve(newOrders);
        }, 2000);
    });
}

// 7. Display all orders in a formatted way
function displayAllOrders() {
    console.log("\n=== ALL ORDERS ===");
    orders.forEach(order => {
        const total = calculateOrderTotal(order);
        console.log(`Order #${order.id} - ${order.customerName}`);
        console.log(`Status: ${order.status}`);
        console.log(`Items: ${order.items.map(item => 
            `${item.name} (${item.quantity} x $${item.price})`
        ).join(', ')}`);
        console.log(`Total: $${total}`);
        console.log('---');
    });
}

// 8. Display orders grouped by customer
function displayOrdersByCustomer() {
    console.log("\n=== ORDERS GROUPED BY CUSTOMER ===");
    const grouped = groupOrdersByCustomer();
    
    Object.keys(grouped).forEach(customer => {
        console.log(`\nCustomer: ${customer}`);
        grouped[customer].forEach(order => {
            const total = calculateOrderTotal(order);
            console.log(`  Order #${order.id} - Status: ${order.status} - Total: $${total}`);
        });
    });
}

// 9. Display statistics
function displayStatistics() {
    console.log("\n=== ORDER STATISTICS ===");
    console.log(`Total Revenue (Completed Orders): $${calculateTotalRevenue()}`);
    
    const largestOrder = findLargestOrder();
    console.log(`Largest Order: #${largestOrder.order.id} by ${largestOrder.order.customerName} - $${largestOrder.totalValue}`);
    
    const statusCounts = {};
    orders.forEach(order => {
        statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
    });
    
    console.log("Orders by Status:");
    Object.keys(statusCounts).forEach(status => {
        console.log(`  ${status}: ${statusCounts[status]} orders`);
    });
}

// Demo function to showcase all features
async function demoOrderSystem() {
    console.log("🚀 ORDER PROCESSING SYSTEM DEMO\n");
    
    // Display initial orders
    displayAllOrders();
    
    // Display statistics
    displayStatistics();
    
    // Display grouped orders
    displayOrdersByCustomer();
    
    // Filter orders by status
    console.log("\n=== FILTERED ORDERS (COMPLETED) ===");
    const completedOrders = filterOrdersByStatus("completed");
    completedOrders.forEach(order => {
        const total = calculateOrderTotal(order);
        console.log(`Order #${order.id} - ${order.customerName} - $${total}`);
    });
    
    // Simulate fetching new orders
    console.log("\n=== FETCHING NEW ORDERS ===");
    try {
        const newOrders = await fetchNewOrders();
        console.log("New orders added:");
        newOrders.forEach(order => {
            const total = calculateOrderTotal(order);
            console.log(`  Order #${order.id} - ${order.customerName} - $${total}`);
        });
        
        // Display updated statistics
        console.log("\n=== UPDATED STATISTICS ===");
        displayStatistics();
        
    } catch (error) {
        console.error("Error fetching new orders:", error);
    }
}

// Additional utility functions

// Add a new order
function addOrder(customerName, items, status = "pending") {
    const newOrder = {
        id: orders.length + 1,
        customerName,
        items,
        status
    };
    orders.push(newOrder);
    return newOrder;
}

// Update order status
function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(order => order.id === orderId);
    if (order) {
        order.status = newStatus;
        return order;
    }
    return null;
}

// Get order by ID
function getOrderById(orderId) {
    return orders.find(order => order.id === orderId);
}

// Run the demo
demoOrderSystem();

// Export functions for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        orders,
        calculateTotalRevenue,
        filterOrdersByStatus,
        findLargestOrder,
        groupOrdersByCustomer,
        fetchNewOrders,
        addOrder,
        updateOrderStatus,
        getOrderById,
        calculateOrderTotal
    };
}