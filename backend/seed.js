const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./model/User');
const Product = require('./model/Product');
const Order = require('./model/Order');

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('Cleared existing data');

    // Create dummy users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = await User.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        role: 'user',
        verified: true
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword,
        role: 'user',
        verified: true
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        verified: true
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: hashedPassword,
        role: 'user',
        verified: false
      }
    ]);
    console.log(`✓ Created ${users.length} users`);

    // Create dummy products
    const products = await Product.insertMany([
      {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: '79.99',
        category: 'Electronics',
        stock: 50,
        imageUrl: 'https://via.placeholder.com/300?text=Wireless+Headphones',
        rating: 4.5,
        numberReviews: 128
      },
      {
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health tracking',
        price: '199.99',
        category: 'Electronics',
        stock: 30,
        imageUrl: 'https://via.placeholder.com/300?text=Smart+Watch',
        rating: 4.2,
        numberReviews: 95
      },
      {
        name: 'USB-C Cable',
        description: 'Durable USB-C charging and data cable',
        price: '12.99',
        category: 'Accessories',
        stock: 200,
        imageUrl: 'https://via.placeholder.com/300?text=USB-C+Cable',
        rating: 4.7,
        numberReviews: 342
      },
      {
        name: 'Portable Charger',
        description: '20000mAh portable power bank with fast charging',
        price: '34.99',
        category: 'Accessories',
        stock: 75,
        imageUrl: 'https://via.placeholder.com/300?text=Portable+Charger',
        rating: 4.3,
        numberReviews: 156
      },
      {
        name: 'Laptop Stand',
        description: 'Ergonomic aluminum laptop stand for better posture',
        price: '29.99',
        category: 'Office',
        stock: 45,
        imageUrl: 'https://via.placeholder.com/300?text=Laptop+Stand',
        rating: 4.6,
        numberReviews: 203
      },
      {
        name: 'Mechanical Keyboard',
        description: 'RGB backlit mechanical keyboard with Cherry MX switches',
        price: '119.99',
        category: 'Electronics',
        stock: 25,
        imageUrl: 'https://via.placeholder.com/300?text=Mechanical+Keyboard',
        rating: 4.8,
        numberReviews: 287
      },
      {
        name: 'Mouse Pad',
        description: 'Large extended mouse pad with non-slip base',
        price: '19.99',
        category: 'Office',
        stock: 100,
        imageUrl: 'https://via.placeholder.com/300?text=Mouse+Pad',
        rating: 4.4,
        numberReviews: 89
      },
      {
        name: 'Webcam 1080p',
        description: 'Clear 1080p HD webcam for video calls and streaming',
        price: '59.99',
        category: 'Electronics',
        stock: 40,
        imageUrl: 'https://via.placeholder.com/300?text=Webcam+1080p',
        rating: 4.5,
        numberReviews: 124
      }
    ]);
    console.log(`✓ Created ${products.length} products`);

    // Create dummy orders
    const orders = await Order.insertMany([
      {
        user: users[0]._id,
        items: [
          {
            productId: products[0]._id,
            quantity: 1,
            price: parseFloat(products[0].price)
          },
          {
            productId: products[2]._id,
            quantity: 2,
            price: parseFloat(products[2].price)
          }
        ],
        totalAmount: parseFloat(products[0].price) + (parseFloat(products[2].price) * 2),
        address: {
          fullName: 'John Doe',
          street: '123 Main Street',
          city: 'New York',
          postalCode: '10001',
          country: 'USA'
        },
        paymentId: 'pay_1234567890',
        status: 'delivered'
      },
      {
        user: users[1]._id,
        items: [
          {
            productId: products[1]._id,
            quantity: 1,
            price: parseFloat(products[1].price)
          }
        ],
        totalAmount: parseFloat(products[1].price),
        address: {
          fullName: 'Jane Smith',
          street: '456 Oak Avenue',
          city: 'Los Angeles',
          postalCode: '90001',
          country: 'USA'
        },
        paymentId: 'pay_0987654321',
        status: 'shipped'
      },
      {
        user: users[0]._id,
        items: [
          {
            productId: products[5]._id,
            quantity: 1,
            price: parseFloat(products[5].price)
          },
          {
            productId: products[6]._id,
            quantity: 1,
            price: parseFloat(products[6].price)
          }
        ],
        totalAmount: parseFloat(products[5].price) + parseFloat(products[6].price),
        address: {
          fullName: 'John Doe',
          street: '123 Main Street',
          city: 'New York',
          postalCode: '10001',
          country: 'USA'
        },
        paymentId: 'pay_1122334455',
        status: 'processing'
      },
      {
        user: users[3]._id,
        items: [
          {
            productId: products[3]._id,
            quantity: 1,
            price: parseFloat(products[3].price)
          }
        ],
        totalAmount: parseFloat(products[3].price),
        address: {
          fullName: 'Mike Johnson',
          street: '789 Pine Road',
          city: 'Chicago',
          postalCode: '60601',
          country: 'USA'
        },
        paymentId: 'pay_5566778899',
        status: 'pending'
      }
    ]);
    console.log(`✓ Created ${orders.length} orders`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`
Summary:
- Users: ${users.length}
- Products: ${products.length}
- Orders: ${orders.length}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 LOGIN CREDENTIALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 ADMIN ACCOUNT:
   Email: admin@example.com
   Password: password123

👤 USER ACCOUNT 1:
   Email: john@example.com
   Password: password123

👤 USER ACCOUNT 2:
   Email: jane@example.com
   Password: password123

👤 USER ACCOUNT 3 (Unverified):
   Email: mike@example.com
   Password: password123

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
