// import bcrypt from "bcrypt";

// async function hashPassword(password: string) {
//   return await bcrypt.hash(password, 10);
// }

// // async function main() {
// //   console.log("🌱 Seeding started...");

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// // Fungsi untuk membuat session baru
// export async function createSession(data: {
//   accountId: string;
//   refreshToken: string;
//   userAgent?: string;
//   ipAddress?: string;
//   expiresAt: Date;
// }) {
//   try {
//     const session = await prisma.session.create({
//       data,
//     });
//     return session;
//   } catch (error) {
//     console.error('Error creating session:', error);
//     throw error;
//   }
// }

// // Contoh penggunaan fungsi createSession
// const sessionData = await prisma.session.create({
//     data: {
//     accountId: 'acc_01hxyzabc123',
//     refreshToken: 'refreshtoken_abc123',
//     userAgent: 'Mozilla/5.0',
//     ipAddress: '192.168.1.1',
//     expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 jam ke depan
//   },
// });

// // Contoh penggunaan fungsi createSessionActivity
// const activityData = await prisma.sessionActivity.create({
//     data: {
//     accountId: 'acc_01hxyzabc123',
//     activity: 'LOGIN_SUCCESS',
//     ipAddress: '192.168.1.1',
//     userAgent: 'Mozilla/5.0'
//   },
// });
// const actionData = await prisma.accountAction.create({
//     data: {
//     accountId: 'acc_01hxyzabc123',
//     action: 'UPDATED_PASSWORD'
//   },
// });

//   const errorLogData = await prisma.errorLog.create({
//     data: {
//     message: 'Unhandled exception in payment flow',
//     stack: 'ReferenceError: x is not defined\n    at Payment.js:23:10',
//     context: 'PaymentController'
//   },
// });

//   const loginAttemptData = await prisma.loginAttempt.create({
//     data: {
//     email: 'user@example.com',
//     success: false,
//     ipAddress: '192.168.1.1',
//     userAgent: 'Mozilla/5.0',
//     accountId: 'acc_01hxyzabc123' // optional
//   },
// });

// // 1. Users

// const account = await prisma.account.create({
//   data: {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     password: "hashed_password", // Simulasikan password yang sudah di-hash
//     phone: "+6281234567890",
//     address: "Jl. Mawar No. 12, Bogor",
//     profileImage: "https://example.com/avatar.jpg",
//     role: "SELLER",
//     isVerified: true,
//     city: "Kota Bogor",
//     country: "Indonesia",
//     province: "Jawa Barat",
//     wallet_balance: 250000.0,
//     referralCode: "REF12345",
//   },
// })

// // const [account1, account2] = await Promise.all([
// //   prisma.account.create({
// //     data: {
// //       name: "John Doe",
// //       email: "john@example.com",
// //       password: await hashPassword("password123"),
// //       role: Role.BUYER,
// //       phone: "0811111111",
// //       address: "123 Ocean Ave",
// //       profileImage: "https://example.com/john.jpg",
// //       isVerified: true,
// //       emailVerifiedAt: new Date(),
// //     },
// //   }),
// //   prisma.account.create({
// //     data: {
// //       name: "Jane Smith",
// //       email: "jane@example.com",
// //       password: await hashPassword("password456"),
// //       role: Role.CONSUMER,
// //       phone: "0822222222",
// //       address: "456 Bay St",
// //       profileImage: "https://example.com/jane.jpg",
// //       isVerified: true,
// //       emailVerifiedAt: new Date(),
// //     },
// //   }),
// // ]);
// console.log("✅ Users created");

// // 2. Sellers
// const [seller1, seller2] = await Promise.all([
//   prisma.account.create({
//     data: {
//       name: "EcoFarm",
//       email: "eco@farm.com",
//       password: await hashPassword("eco123"),
//       phone: "0833333333",
//       address: "Green Valley",
//       isVerified: true,
//       emailVerifiedAt: new Date(),
//     },
//   }),
//   prisma.account.create({
//     data: {
//       name: "NatureMarket",
//       email: "nature@market.com",
//       password: await hashPassword("nature123"),
//       phone: "0844444444",
//       address: "Nature Road",
//       isVerified: true,
//       emailVerifiedAt: new Date(),
//     },
//   }),
// ]);
// console.log("✅ Sellers created");

// //   // 3. Market
// const Market1 = await prisma.market.create({
//   data: {
//     id: 'market_123', // Ganti dengan ID market yang valid
//     name: 'Jakarta Fresh Market',
//     description: 'Pasar modern dengan produk segar dan lokal',
//     location: 'Jakarta, Indonesia',
//     revenue: 5000000,
//     marketType: 'Grocery',
//     joinDate: '2023-01-01',
//     productCount: 120,
//     rating: 4,
//     verified: true,
//     currency: {
//       connect: {
//         code: 'IDR', // Pastikan Currency dengan code IDR sudah ada
//       },
//     },
//     // Optional: relasi geografis jika data City/Region/SubRegion tersedia
//     // city: { connect: { id: 1 } },
//     // region: { connect: { id: 1 } },
//     // subRegion: { connect: { id: 1 } },
//   },
// })

// console.log('Market created:', Market1)

//     const BrandWithProducts = await prisma.brand.create ({
//         data: {
//             name: 'Urban Style Co.',
//             description: 'Brand streetwear anak muda.',
//             label: 'Best Seller',
//             products: {
//             connect: [
//                 { id: 'prod_abc123' },
//                 { id: 'prod_def456' }
//             ]
//             }
//         }
//         });

//         console.log('Brand created:', BrandWithProducts);

//     const TagWithProducts = await prisma.tag.create({
//         data: {
//             name: 'Limited Edition',
//             products: {
//             connect: [
//                 { id: 'prod_abc123' },
//                 { id: 'prod_xyz789' }
//             ]
//             }
//         }
//         });

//     const createLabelWithProducts = await prisma.label.create({
//         data: {
//             name: 'New Arrival',
//             products: {
//             connect: [
//                 { id: 'prod_mno321' },
//                 { id: 'prod_xyz789' }
//             ]
//             }
//         }
//         });

// const brand = await prisma.brand.create({
//   data: {
//     name: "All Fresh",
//     description: "Hydrophonic Vegetables",
//     sellers: {
//       connect: [{ id: seller1.id }, { id: seller2.id }],
//     },
//   },
// });
// console.log("✅ Brand created");
// // Safely add brand relation if it exists
// // if (brand) {
// //   productData.brand = { connect: { id: brand.id } };
// // }
// console.log("✅ Market created");

// // 4. Categories & Tags
// const [catFruit, catVeg] = await Promise.all([
//   prisma.category.create({ data: { name: "Fruits" } }),
//   prisma.category.create({ data: { name: "Vegetables" } }),
// ]);

//   const [tagOrganic, tagFresh] = await Promise.all([
//     prisma.tag.create({ data: { name: "Organic" } }),
//     prisma.tag.create({ data: { name: "Fresh" } }),
//   ]);
//   console.log("✅ Categories and Tags created");

// // 1. Buat Region
// const region = await prisma.region.create({
//   data: {
//     name: 'Jawa Barat',
//     description: 'Provinsi di Pulau Jawa bagian barat',
//   },
// })

// // 2. Buat SubRegion dan relasikan ke Region
// const subRegion = await prisma.subRegion.create({
//   data: {
//     name: 'Bogor Raya',
//     description: 'Wilayah sekitar Kota dan Kabupaten Bogor',
//     region: {
//       connect: { id: region.id },
//     },
//   },
// })

// // 3. Buat City dan relasikan ke SubRegion
// const city = await prisma.city.create({
//   data: {
//     name: 'Kota Bogor',
//     description: 'Kota hujan di Jawa Barat',
//     subRegion: {
//       connect: { id: subRegion.id },
//     },
//   },
// })

// console.log({ region, subRegion, city })

// const Currency1 = await prisma.currency.create({
//   data: {
//     name: 'Amerika Dollar',
//     description: 'Official currency of america',
//     code: 'USD',
//     accountId: 'account_123', // Ganti dengan ID akun yang valid
//   },
// })

// const Currency2 = await prisma.currency.create({
//   data: {
//     name: 'Indonesian Rupiah',
//     description: 'Official currency of Indonesia',
//     code: 'IDR',
//     accountId: 'account_123', // Ganti dengan ID akun yang valid
//   },
// })

// console.log('Currency created:', Currency1, Currency2)

// // 5. Products

// const newProduct = await prisma.product.create({
//   data: {
//     name: 'Organic Green Tea',
//     description: 'Fresh and natural green tea from certified organic farms.',
//     price: 8.99,
//     originalPrice: 12.00,
//     image: 'https://example.com/images/greentea.jpg',
//     stock: 100,
//     soldCount: 25,
//     unit: 'box',
//     ecoCertifications: 'USDA Organic',
//     origin: 'Japan',
//     sku: 'GT-JP-001',
//     isActive: true,
//     isNewArrival: true,
//     isBestSeller: false,
//     isOnSale: true,
//     isFeatured: false,
//     duration: 30, // in days, for example
//     accountId: seller1.id, // ganti dengan ID akun valid
//     marketId: Market1,   // ganti dengan ID market valid
//     brandId: brand.id,     // optional, bisa null jika tidak ada
//     categories: {
//       connect: [{ id: 'category_abc' }] // ganti dengan ID kategori yang valid
//     },
//     labels: {
//       connect: [{ id: 'label_def' }] // ganti dengan ID label jika ada
//     },
//     tags: {
//       connect: [{ id: 'tag_ghi' }] // ganti dengan ID tag jika ada
//     }
//   },
// })

// console.log('Product created:', newProduct)

// const product1 = await prisma.product.create({
//   data: {
//     name: "Organic Apple",
//     description: "Fresh organic apples",
//     price: 49000,
//     originalPrice: 55000,
//     stock: 100,
//     soldCount: 10,
//     unit: "kg",
//     categoryId: catFruit.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "APL-001",
//     ecoCertifications: "USDA Organic",
//     origin: "Bandung",
//     image: "https://images.unsplash.com/photo-1513677785800-9df79ae4b10b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1598170845055-806a9e9f3f72?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1599907617275-3e69f1adfcf0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     // Removed imageArray as it is not a valid property
//     isBestSeller: true,
//     isOnSale: true,
//     isFeatured: true,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "Best Sellers" },
//           create: { name: "Best Sellers" },
//         },
//       ],
//     },
//   },
// });

// const product2 = await prisma.product.create({
//   data: {
//     name: "Carrot",
//     description: "Crunchy carrots",
//     price: 15000,
//     originalPrice: 18000,
//     stock: 50,
//     soldCount: 5,
//     unit: "kg",
//     categoryId: catVeg.id,
//     accountId: seller2.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "CRT-002",
//     origin: "Bogor",
//     image: "https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1582515073490-39981397c445?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1633380110125-f6e685676160?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: false,
//     isOnSale: true,
//     isFeatured: false,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "New Arrivals" },
//           create: { name: "New Arrivals" },
//         },
//       ],
//     },
//   },
// });

// const product3 = await prisma.product.create({
//   data: {
//     name: "Tomato",
//     description: "Fresh juicy tomatoes",
//     price: 24000,
//     originalPrice: 28000,
//     stock: 80,
//     soldCount: 20,
//     unit: "kg",
//     category: { connect: { id: catVeg.id } },
//     account: { connect: { id: seller1.id } },
//     market: { connect: { id: Market1 } },
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "TOM-003",
//     origin: "Bandung",
//     image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1561136594-7f68413baa99?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: false,
//     isOnSale: true,
//     isFeatured: true,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "On Sale" },
//           create: { name: "On Sale" },
//         },
//       ],
//     },
//   },
// });

// const product4 = await prisma.product.create({
//   data: {
//     name: "Organic Banana",
//     description: "Sweet and ripe organic bananas",
//     price: 24000,
//     originalPrice: 28000,
//     stock: 120,
//     soldCount: 15,
//     unit: "kg",
//     categoryId: catFruit.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "BAN-001",
//     ecoCertifications: "Fair Trade",
//     origin: "Lampung",
//     image: "https://images.unsplash.com/photo-1668762924635-a3683caf32bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://plus.unsplash.com/premium_photo-1724250081106-4bb1be9bf950?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1744659753302-9f4fc320f085?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1729332185302-e80ec9e483a7?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: true,
//     isOnSale: false,
//     isFeatured: true,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "Top Rated" },
//           create: { name: "Top Rated" },
//         },
//       ],
//     },
//   },
// });

// const product5 = await prisma.product.create({
//   data: {
//     name: "Fresh Mango",
//     description: "Juicy and fragrant mangoes",
//     price: 57000,
//     originalPrice: 60000,
//     stock: 80,
//     soldCount: 20,
//     unit: "kg",
//     categoryId: catFruit.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "MNG-001",
//     ecoCertifications: "Local Farm Certified",
//     origin: "Cirebon",
//     image: "https://images.unsplash.com/photo-1669207334420-66d0e3450283?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1501746877-14782df58970?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1519096845289-95806ee03a1a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: false,
//     isOnSale: true,
//     isFeatured: true,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "Seasonal" },
//           create: { name: "Seasonal" },
//         },
//       ],
//     },
//   },
// });

// const product6 = await prisma.product.create({
//   data: {
//     name: "Red Grapes",
//     description: "Seedless red grapes",
//     price: 82000,
//     originalPrice: 90000,
//     stock: 60,
//     soldCount: 25,
//     unit: "kg",
//     categoryId: catFruit.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "GRP-001",
//     ecoCertifications: "Eco Friendly",
//     origin: "Bali",
//     image: "https://images.unsplash.com/photo-1635843116188-b67a2f1ef23f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1596380862374-ad7fa9407822?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1571663716920-9fd87840c9ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1641317113966-a1669ce77c96?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: true,
//     isOnSale: true,
//     isFeatured: false,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "Best Sellers" },
//           create: { name: "Best Sellers" },
//         },
//       ],
//     },
//   },
// });
// const product7 = await prisma.product.create({
//   data: {
//     name: "Watermelon",
//     description: "Large and juicy watermelon",
//     price: 90000,
//     originalPrice: 115000,
//     stock: 40,
//     soldCount: 30,
//     unit: "each",
//     categoryId: catFruit.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "WTM-001",
//     ecoCertifications: "Water Efficient Farming",
//     origin: "Surabaya",
//     image: "https://images.unsplash.com/photo-1621961048737-a9993789e1ad?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1622208489373-1fe93e2c6720?q=80&w=2070 auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: false,
//     isOnSale: true,
//     isFeatured: false,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "Featured" },
//           create: { name: "Featured" },
//         },
//       ],
//     },
//   },
// });

// const product8 = await prisma.product.create({
//   data: {
//     name: "Pineapple",
//     description: "Sweet tropical pineapples",
//     price: 65000,
//     originalPrice: 82000,
//     stock: 70,
//     soldCount: 18,
//     unit: "each",
//     categoryId: catFruit.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "PNP-001",
//     ecoCertifications: "USDA Organic",
//     origin: "Medan",
//     image: "https://images.unsplash.com/photo-1550828520-4cb496926fc9?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1562522513-a22a63a0e21e?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1614963366795-973eb8748ebb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: true,
//     isOnSale: false,
//     isFeatured: true,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "Top Rated" },
//           create: { name: "Top Rated" },
//         },
//       ],
//     },
//   },
// });

// const product9 = await prisma.product.create({
//   data: {
//     name: "Strawberries",
//     description: "Fresh and juicy strawberries",
//     price: 100000,
//     originalPrice: 123000,
//     stock: 30,
//     soldCount: 12,
//     unit: "box",
//     categoryId: catFruit.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "STB-001",
//     ecoCertifications: "Rainforest Alliance",
//     origin: "Lembang",
//     image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://plus.unsplash.com/premium_photo-1690291012436-6600ce6ffdbe?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1549007953-2f2dc0b24019?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1543158181-e6f9f6712055?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D,https://images.unsplash.com/photo-1610725664338-2be2cb450798?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: true,
//     isOnSale: true,
//     isFeatured: true,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "Limited Edition" },
//           create: { name: "Limited Edition" },
//         },
//       ],
//     },
//   },
// });

// const product10 = await prisma.product.create({
//   data: {
//     name: "Papaya",
//     description: "Tropical and healthy papaya",
//     price: 41000,
//     originalPrice: 50000,
//     stock: 90,
//     soldCount: 22,
//     unit: "each",
//     categoryId: catFruit.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "PAP-001",
//     ecoCertifications: "Organic Indonesia",
//     origin: "Bekasi",
//     image: "https://images.unsplash.com/photo-1541472596887-494ee5c0fe30?q=80&w=1567&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://plus.unsplash.com/premium_photo-1675639895212-696149c275f9?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1617112848923-cc2234396a8d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: false,
//     isOnSale: true,
//     isFeatured: false,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "Healthy Choice" },
//           create: { name: "Healthy Choice" },
//         },
//       ],
//     },
//   },
// });

// const product11 = await prisma.product.create({
//   data: {
//     name: "Kiwi",
//     description: "Imported kiwi fruits",
//     price: 100000,
//     originalPrice: 105000,
//     stock: 50,
//     soldCount: 19,
//     unit: "box",
//     categoryId: catFruit.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "KIW-001",
//     ecoCertifications: "Non-GMO",
//     origin: "New Zealand",
//     image: "https://images.unsplash.com/photo-1616684000067-36952fde56ec?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1609889132698-1625aefc7f6b?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1572565638061-ecff52429d86?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1610917040803-1fccf9623064?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: false,
//     isOnSale: false,
//     isFeatured: true,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "Imported" },
//           create: { name: "Imported" },
//         },
//       ],
//     },
//   },
// });

// const product12 = await prisma.product.create({
//   data: {
//     name: "Avocado",
//     description: "Creamy organic avocados",
//     price: 70000,
//     originalPrice: 82000,
//     stock: 65,
//     soldCount: 28,
//     unit: "kg",
//     categoryId: catFruit.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "AVC-001",
//     ecoCertifications: "USDA Organic",
//     origin: "Bogor",
//     image: "https://images.unsplash.com/photo-1583029901628-8039767c7ad0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1671624749229-7d37826013b5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1612506266679-606568a33215?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1601039641847-7857b994d704?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: true,
//     isOnSale: true,
//     isFeatured: true,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "Best Sellers" },
//           create: { name: "Best Sellers" },
//         },
//       ],
//     },
//   },
// });

// const product13 = await prisma.product.create({
//   data: {
//     name: "Spinach",
//     description: "Fresh green spinach leaves",
//     price: 17000,
//     originalPrice: 20000,
//     stock: 70,
//     soldCount: 15,
//     unit: "bunch",
//     categoryId: catVeg.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "SPI-002",
//     origin: "Lembang",
//     image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1578283326173-fbb0f83b59b2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1580910365203-91ea9115a319?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: false,
//     isOnSale: true,
//     isFeatured: false,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "New Arrivals" },
//           create: { name: "New Arrivals" },
//         },
//       ],
//     },
//   },
// });

// const product14 = await prisma.product.create({
//   data: {
//     name: "Potato",
//     description: "Fresh and starchy potatoes",
//     price: 17000,
//     originalPrice: 20000,
//     stock: 120,
//     soldCount: 40,
//     unit: "kg",
//     categoryId: catVeg.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "POT-002",
//     origin: "Cimahi",
//     image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1590165482129-1b8b27698780?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1603048719539-9ecb4aa395e3?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1578594640334-b71fbed2a406?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: true,
//     isOnSale: false,
//     isFeatured: false,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "Best Sellers" },
//           create: { name: "Best Sellers" },
//         },
//       ],
//     },
//   },
// });
// const product15 = await prisma.product.create({
//   data: {
//     name: "Cucumber",
//     description: "Crisp and refreshing cucumbers",
//     price: 17000,
//     originalPrice: 20000,
//     stock: 90,
//     soldCount: 18,
//     unit: "kg",
//     categoryId: catVeg.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "CUC-004",
//     origin: "Cianjur",
//     image: "https://images.unsplash.com/photo-1587411768638-ec71f8e33b78?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1604977042946-1eecc30f269e?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1611048661702-7b55eed346b4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1566486189376-d5f21e25aae4?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: true,
//     isOnSale: true,
//     isFeatured: false,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "Best Sellers" },
//           create: { name: "Best Sellers" },
//         },
//       ],
//     },
//   },
// });
// const product16 = await prisma.product.create({
//   data: {
//     name: "Broccoli",
//     description: "Nutritious green broccoli",
//     price: 41000,
//     originalPrice: 50000,
//     stock: 60,
//     soldCount: 25,
//     unit: "kg",
//     categoryId: catVeg.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "BRO-005",
//     origin: "Ciwidey",
//     image: "https://plus.unsplash.com/premium_photo-1702403157830-9df749dc6c1e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?q=80&w=1501&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1614336215203-05a588f74627?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1685504445355-0e7bdf90d415?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: false,
//     isOnSale: false,
//     isFeatured: true,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "New Arrivals" },
//           create: { name: "New Arrivals" },
//         },
//       ],
//     },
//   },
// });
// const product17 = await prisma.product.create({
//   data: {
//     name: "Cauliflower",
//     description: "Fresh white cauliflower",
//     price: 37000,
//     originalPrice: 37500,
//     stock: 55,
//     soldCount: 17,
//     unit: "kg",
//     categoryId: catVeg.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "CAU-006",
//     origin: "Pangalengan",
//     image: "https://images.unsplash.com/photo-1692956706779-576c151ec712?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1613743983303-b3e89f8a2b80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1613743990305-736d763f3d70?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1566842600175-97dca489844f?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: false,
//     isOnSale: false,
//     isFeatured: false,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "Best Sellers" },
//           create: { name: "Best Sellers" },
//         },
//       ],
//     },
//   },
// });
// const product18 = await prisma.product.create({
//   data: {
//     name: "Bell Pepper",
//     description: "Colorful bell peppers",
//     price: 32000,
//     originalPrice: 41000,
//     stock: 85,
//     soldCount: 22,
//     unit: "kg",
//     categoryId: catVeg.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "BEL-007",
//     origin: "Cimahi",
//     image: "https://images.unsplash.com/photo-1592548868664-f8b4e4b1cfb7?q=80&w=1382&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1608737637507-9aaeb9f4bf30?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1669863347362-1630fe821708?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: true,
//     isOnSale: true,
//     isFeatured: false,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "New Arrivals" },
//           create: { name: "New Arrivals" },
//         },
//       ],
//     },
//   },
// });
// const product19 = await prisma.product.create({
//   data: {
//     name: "Eggplant",
//     description: "Glossy purple eggplants",
//     price: 29000,
//     originalPrice: 36000,
//     stock: 65,
//     soldCount: 12,
//     unit: "kg",
//     categoryId: catVeg.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "EGG-007",
//     origin: "Subang",
//     image: "https://images.unsplash.com/photo-1683543122945-513029986574?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1528826007177-f38517ce9a8a?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1605197378540-10ebaf6999e5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1604321272882-07c73743be32?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: false,
//     isOnSale: true,
//     isFeatured: false,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "Best Sellers" },
//           create: { name: "Best Sellers" },
//         },
//       ],
//     },
//   },
// });
// const product20 = await prisma.product.create({
//   data: {
//     name: "Chili Pepper",
//     description: "Spicy red chili peppers",
//     price: 65000,
//     originalPrice: 73000,
//     stock: 40,
//     soldCount: 30,
//     unit: "kg",
//     categoryId: catVeg.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "CHL-008",
//     origin: "Majalengka",
//     image: "https://images.unsplash.com/photo-1546860255-95536c19724e?q=80&w=1416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://plus.unsplash.com/premium_photo-1668772703498-ab25f579f3cc?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1526346698789-22fd84314424?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: true,
//     isOnSale: false,
//     isFeatured: true,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "Best Sellers" },
//           create: { name: "Best Sellers" },
//         },
//       ],
//     },
//   },
// });
// const product21 = await prisma.product.create({
//   data: {
//     name: "Green Beans",
//     description: "Fresh green beans",
//     price: 31000,
//     originalPrice: 39000,
//     stock: 75,
//     soldCount: 10,
//     unit: "kg",
//     categoryId: catVeg.id,
//     accountId: seller1.id,
//     marketId: Market1,
//     tags: {
//       connect: [{ id: tagOrganic.id }, { id: tagFresh.id }],
//     },
//     sku: "GRB-009",
//     origin: "Sumedang",
//     image: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1603046918675-7bee81f7aa0d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1574963835594-61eede2070dc?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D, https://images.unsplash.com/photo-1693667660455-7ce865932e6a?q=80&w=1556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     isBestSeller: false,
//     isOnSale: true,
//     isFeatured: false,
//     labels: {
//       connectOrCreate: [
//         {
//           where: { name: "New Arrivals" },
//           create: { name: "New Arrivals" },
//         },
//       ],
//     },
//   },
// });

// console.log("✅ Products created");

// // 6. GiftCard
// const vouchers = await prisma.voucher.create({
//   data: {
//     code: "WELCOME10",
//     discount: 10,
//     type: "percentage",
//   },
// });

// const createVoucher = async (data: {
//     code: string;
//     discount?: number;
//     value?: number;
//     expiryDate?: Date;
//     type: string;
//     createdBy: string;
//   }) => {
//     try {
//       const voucher = await prisma.voucher.create({
//         data,
//       });
//       return voucher;
//     } catch (error) {
//       console.error('Failed to create voucher:', error);
//       throw error;
//     }
//   };

//   // Mendapatkan voucher berdasarkan kode
//   const getVoucherByCode = async (code: string) => {
//     try {
//       const voucher = await prisma.voucher.findUnique({
//         where: { code },
//         include: {
//           orders: true,
//           referrals: true,
//           redemptionLogs: true,
//         },
//       });
//       return voucher;
//     } catch (error) {
//       console.error('Failed to get voucher by code:', error);
//       throw error;
//     }
//   };

//   // Menebus (redeem) voucher
//   const redeemVoucher = async (code: string) => {
//     try {
//       const voucher = await prisma.voucher.update({
//         where: { code },
//         data: {
//           isRedeemed: true,
//           redeemedAt: new Date(),
//         },
//       });
//       return voucher;
//     } catch (error) {
//       console.error('Failed to redeem voucher:', error);
//       throw error;
//     }
//   };

//   // Menonaktifkan voucher
//   const deactivateVoucher = async (id: string) => {
//     try {
//       const voucher = await prisma.voucher.update({
//         where: { id },
//         data: {
//           isActive: false,
//         },
//       });
//       return voucher;
//     } catch (error) {
//       console.error('Failed to deactivate voucher:', error);
//       throw error;
//     }
//   };

//   export {
//     createVoucher,
//     getVoucherByCode,
//     redeemVoucher,
//     deactivateVoucher,
//   };

// console.log("✅ Gift Card created");

// const createOrderWithItems = await prisma.order.create({
//       data: {
//         buyerId: 'acc_buyer_123',
//         sellerId: 'acc_seller_456',
//         paymentMethod: 'credit_card',
//         shippingAddress: 'Jl. Contoh No. 123, Jakarta',
//         notes: 'Mohon dikirim sore hari',
//         totalPrice: 400000,
//         discountApplied: 50000,
//         paymentStatus: 'PAID',
//         status: 'CONFIRMED',
//         voucherId: 'voucher_001', // optional
//         items: {
//           productNotes: "contoh JSON", // if needed
//         },
//         orderItems: {
//           create: [
//             {
//               accountId: 'acc_buyer_123',
//               productId: 'prod_abc123',
//               quantity: 2,
//               price: 150000
//             },
//             {
//               accountId: 'acc_buyer_123',
//               productId: 'prod_xyz789',
//               quantity: 1,
//               price: 100000
//             }
//           ]
//         }
//       },
//       include: {
//         orderItems: true
//       }
//     });

// // // 7. Orders & Order Items
// // const order = await prisma.order.create({
// //   data: {
// //     buyerId: account1.id,
// //     status: OrderStatus.COMPLETED,
// //     paymentStatus: PaymentStatus.COMPLETED,
// //     paymentMethod: "Wallet",
// //     shippingAddress: "123 Ocean Ave",
// //     notes: "Please pack with care",
// //     totalPrice: 6.49,
// //     discountApplied: 1.0,
// //     voucherId: vouchers.id,
// //     shippedAt: new Date(),
// //     orderItems: {
// //       create: [
// //         {
// //           productId: product1.id,
// //           quantity: 1,
// //         },
// //         {
// //           productId: product2.id,
// //           quantity: 2,
// //         },
// //         {
// //           productId: product3.id,
// //           quantity: 1,
// //         },
// //       ],
// //     },
// //   },
// // });
// console.log("✅ Order and OrderItems created");

// //   // 8. Transaction

// const createTransaction = await prisma.transaction.create({
//       data: {
//         accountId: 'acc_buyer_123',
//         walletId: 1, // harus sesuai wallet yang sudah ada
//         type: 'DEBIT', // contoh: DEBIT atau CREDIT
//         amount: 250000,
//         method: 'wallet',
//         transactionId: 'TRX-20250507-001',
//         description: 'Pembayaran pesanan #ORD123',
//         status: 'PAID',
//         orderId: 'ord_abc123' // opsional, jika ada relasi order
//       }
//     });

//   const createEventLog = await prisma.eventLog.create({
//       data: {
//         event: 'PAYMENT_SUCCESS',
//         accountId: 'acc_buyer_123',
//         orderId: 'ord_abc123', // opsional
//         productId: null, // bisa diisi jika terkait produk
//         action: 'Pembayaran berhasil untuk pesanan ORD123'
//       }
//     });

//   console.log("✅ Transaction created");

//     const Wallet1 = await prisma.wallet.create({
//       data: {
//       accountId: 'user-1234', // pastikan id ini ada di tabel Account
//       balance: 100.0,
//       currency: 'USD',
//       },
//     })

//     const Wallet2 = await prisma.wallet.create({
//       data: {
//       accountId: 'user-1234', // pastikan id ini ada di tabel Account
//       balance: 100.0,
//       currency: 'IDR',
//       },
//     })

//     console.log('Wallet created:', Wallet1, Wallet2)

//     const newWalletLog = await prisma.walletTransactionLog.create({
//       data: {
//         walletId: 1, // ID wallet yang valid
//         action: 'UPDATE_BALANCE',
//         oldValue: { balance: 50.0 },
//         newValue: { balance: 100.0 },
//       },
//     })

//     console.log('WalletTransactionLog created:', newWalletLog)

//     console.log("✅ Wallet created");

//     const newReferral = await prisma.referral.create({
//       data: {
//         referrerId: 'acc-001',
//         referredId: 'acc-002',
//         voucherId: 'vchr-1234', // jika tidak ada voucher, bisa null
//         status: 'ACTIVE', // status referral
//         createdAt: new Date(), // tanggal pembuatan referral
//         updatedAt: new Date(), // tanggal pembaruan referral
//         redeemedAt: null, // jika belum ditebus, bisa null
//       },
//     })

//     console.log('Referral created:', newReferral)

//     const referrer = await prisma.account.findUnique({ where: { id: 'acc-001' } })
//     if (!referrer) {
//       throw new Error('Referrer account not found')
//     }

//     const newSale = await prisma.sales.create({
//       data: {
//         amount: 250.0,
//         date: new Date('2025-05-07'),
//         productId: 'prod-123', // harus ada di Product
//         accountId: 'acc-001',  // harus ada di Account
//         role: 'seller',
//       },
//     });

//     console.log('Sales created:', newSale)

//     const newActivity = await prisma.activity.create({
//       data: {
//         productId: 'prod-123',     // harus ada di Product
//         activityType: 'VIEW',      // contoh tipe aktivitas
//         date: new Date(),
//         accountId: 'acc-001',      // harus ada di Account
//         },
//     })

//     console.log('Activity created:', newActivity)

//     const newMessage = await prisma.message.create({
//       data: {
//         content: 'Hello, I am interested in your product.',
//         conversationId: 'conv-456', // harus ada di Conversation
//         senderId: 'acc-002',        // pengirim pesan
//         accountId: 'acc-001',       // pemilik pesan (penerima atau partisipan utama)
//         isRead: false,
//       },
//     })

//     console.log('Message created:', newMessage)

//     const newConversation = await prisma.conversation.create({
//       data: {
//         participants: {
//           connect: [
//             { id: 'acc-001' },
//             { id: 'acc-002' },
//           ],
//         },
//       },
//       include: { participants: true },
//     })

//     console.log('Conversation created:', newConversation)

//     const newWishlist = await prisma.wishlist.create({
//       data: {
//         accountId: 'acc-001',  // harus valid
//         productId: 'prod-123', // harus valid
//         marketId: 'mkt-001',   // harus valid
//       },
//     })

//     console.log('Wishlist item added:', newWishlist)

//     const newRedemptionLog = await prisma.voucherRedemptionLog.create({
//       data: {
//         voucherId: 'vchr-001',  // harus valid
//         accountId: 'acc-001',   // opsional jika nullable
//         status: 'SUCCESS',
//         reason: 'Voucher used at checkout',
//       },
//     })

//     console.log('Voucher redemption logged:', newRedemptionLog)

//     const newNotification = await prisma.notification.create({
//       data: {
//         accountId: 'acc-001',  // harus valid
//         title: 'New Message Received',
//         message: 'You have a new message from acc-002.',
//         type: 'message',
//         status: 'unread',
//         reason: 'user_activity',
//       },
//     })

//     console.log('Notification created:', newNotification)

//     const newPayment = await prisma.payment.create({
//       data: {
//         status: 'PENDING',
//         accountId: 'acc-001', // harus valid di Account
//         version: 1,
//       },
//     })

//     console.log('Payment created:', newPayment)

//     const newPaymentLog = await prisma.paymentLog.create({
//       data: {
//         paymentId: 1, // ID dari Payment yang valid
//         action: 'CREATE',
//         reason: 'Initial payment created',
//         status: 'PENDING',
//         description: 'Payment initiated via checkout',
//       },
//     })

//     console.log('PaymentLog created:', newPaymentLog)

//     const newAuditLog = await prisma.auditLog.create({
//       data: {
//         action: 'DELETE_ORDER',
//         orderId: 'ord-001',     // optional
//         accountId: 'acc-001',   // harus valid
//         reason: 'User cancelled the order',
//       },
//     })

//     console.log('AuditLog created:', newAuditLog)

//     const newCartItem = await prisma.cartItem.create({
//       data: {
//         accountId: 'acc-001',     // harus valid
//         productId: 'prod-123',    // harus valid
//         quantity: 2,
//       },
//     })

//     console.log('CartItem added:', newCartItem)

//     const newAnalyticsEvent = await prisma.analyticsEvent.create({
//       data: {
//         eventName: 'ProductViewed',
//         accountId: 'acc-001', // optional, bisa null
//         metadata: {
//           productId: 'prod-123',
//           referrer: 'homepage',
//         },
//       },
//     })

//     console.log('AnalyticsEvent logged:', newAnalyticsEvent)

//     const newCustomerMetric = await prisma.customerMetric.create({
//       data: {
//         date: new Date('2025-05-07'),
//         activeUsers: 120,
//         churnRate: 0.08,
//         acquisitionCost: 15.75,
//         newCustomers: 25,
//         lifetimeValue: 240.50,
//         retentionRate: 0.85,
//         newCustomerCount: 25,
//         returningCustomerCount: 30,
//         accountId: 'acc-001', // pastikan ID ini valid di Account
//       },
//     })

//     console.log('CustomerMetric created:', newCustomerMetric)

//     const newAttendance = await prisma.attendance.create({
//       data: {
//         date: new Date('2025-05-07'),
//         status: 'Present',
//         accountId: 'acc-001', // harus valid
//       },
//     })

//     console.log('Attendance created:', newAttendance)

//     const newPerformance = await prisma.performance.create({
//       data: {
//         score: 87.5,
//         reviewDate: new Date('2025-05-01'),
//         accountId: 'acc-001',
//       },
//     })

//     console.log('Performance record created:', newPerformance)

//     const newSatisfaction = await prisma.satisfaction.create({
//       data: {
//         satisfactionScore: 9,
//         surveyDate: new Date('2025-05-03'),
//         accountId: 'acc-001',
//       },
//     })

//     console.log('Satisfaction record created:', newSatisfaction)

//     const newPayroll = await prisma.payroll.create({
//       data: {
//         salary: 5000.0,
//         paymentDate: new Date('2025-04-30'),
//         accountId: 'acc-001',
//       },
//     })

//     console.log('Payroll created:', newPayroll)

//     const newTask = await prisma.task.create({
//       data: {
//         taskName: 'Prepare Quarterly Report',
//         dueDate: new Date('2025-05-15'),
//         accountId: 'acc-001', // harus valid
//         status: 'PENDING', // status bisa 'PENDING', 'IN_PROGRESS', 'COMPLETED'
//       },
//     })

//     console.log('Task assigned:', newTask)

//     const newCollaboration = await prisma.collaboration.create({
//       data: {
//         score: 8.5,
//         reviewDate: new Date('2025-05-01'),
//         accountId: 'acc-001',
//       },
//     })

//     console.log('Collaboration record created:', newCollaboration)

//     const newTraining = await prisma.training.create({
//       data: {
//         trainingCourse: 'Advanced Data Analysis',
//         completionStatus: 'Completed',
//         accountId: 'acc-001',
//       },
//     })

//     console.log('Training record created:', newTraining)

//     const newWorkingHours = await prisma.workingHours.create({
//       data: {
//         hoursWorked: 42.5,
//         weekStartDate: new Date('2025-05-05'),
//         accountId: 'acc-001',
//       },
//     })

//     console.log('WorkingHours record created:', newWorkingHours)

//     const newFinancialOverview = await prisma.financialOverview.create({
//       data: {
//         accountId: 'acc-001',
//         netProfit: 12000.5,
//         operatingExpenses: 3000,
//         profitMargin: 0.4,
//       },
//     })

//     console.log('FinancialOverview created:', newFinancialOverview)

//     const newAccountsPayable = await prisma.accountsPayable.create({
//       data: {
//         vendor: 'Vendor A',
//         amount: 2000,
//         dueDate: new Date('2025-05-15'),
//         status: 'UNPAID',
//         accountId: 'acc-001',
//         financialOverviewId: 1, // sesuaikan dengan ID dari FinancialOverview
//       },
//     })

//     console.log('AccountsPayable created:', newAccountsPayable)

//     const newAccountsReceivable = await prisma.accountsReceivable.create({
//       data: {
//         client: 'Client B',
//         dueDate: new Date('2025-05-20'),
//         amount: 5000,
//         status: 'PENDING', // pastikan ini cocok dengan enum ReceivableStatus
//         accountId: 'acc-001',
//         financialOverviewId: 1, // ID dari FinancialOverview
//       },
//     })

//     console.log('AccountsReceivable created:', newAccountsReceivable)

//     const newBudgetVsActual = await prisma.budgetVsActual.create({
//       data: {
//         month: 'April',
//         budget: 10000,
//         actual: 9500,
//         financialOverviewId: 1, // pastikan ID-nya benar
//       },
//     })

//     console.log('Budget vs Actual created:', newBudgetVsActual)

//     const newCashFlow = await prisma.cashFlow.create({
//       data: {
//         type: 'OPERATING', // pastikan sesuai enum CashFlowType
//         description: 'Monthly sales inflow',
//         amount: 8000,
//         financialOverviewId: 1,
//       },
//     })

//     console.log('CashFlow entry created:', newCashFlow)

//     const newEBITDA = await prisma.eBITDA.create({
//       data: {
//         month: 'April',
//         value: 6500,
//         year: 2025,
//         financialOverviewId: 1,
//       },
//     })

//     console.log('EBITDA record created:', newEBITDA)

//     const newFinancialRatio = await prisma.financialRatio.create({
//       data: {
//         label: 'Current Ratio',
//         value: 1.8,
//         financialOverviewId: 1,
//         currentRatioOverviewId: 1, // optional, sesuai relasi jika ingin menunjukkan ini adalah current ratio
//       },
//     })

//     console.log('FinancialRatio created:', newFinancialRatio)

//     const newMonthlyReport = await prisma.monthlyFinancialReport.create({
//       data: {
//         month: 'April',
//         revenue: 12000,
//         expenses: 3000,
//         year: 2025,
//         financialOverviewId: 1,
//       },
//     })

//     console.log('MonthlyFinancialReport created:', newMonthlyReport)

//     const newNetProfit = await prisma.netProfit.create({
//       data: {
//         revenue: 15000,
//         expenses: 5000,
//       },
//     })

//     console.log('NetProfit created:', newNetProfit)

//     const newOperatingExpense = await prisma.operatingExpense.create({
//       data: {
//         category: 'Marketing',
//         amount: 1200,
//       },
//     })

//     console.log('OperatingExpense created:', newOperatingExpense)

//     const newProfitMargin = await prisma.profitMargin.create({
//       data: {
//         revenue: 20000,
//         cost: 8000,
//       },
//     })

//     console.log('ProfitMargin created:', newProfitMargin)

//     const newRefundsReturn = await prisma.refundsReturn.create({
//       data: {
//         refunds: 300,
//         returns: 5,
//         financialOverviewId: 1, // pastikan ID-nya valid dan belum dipakai
//       },
//     })

//     console.log('RefundsReturn created:', newRefundsReturn)

//     const newRevenueBreakdown = await prisma.revenueBreakdown.create({
//       data: {
//         label: 'Online Sales',
//         amount: 10000,
//         financialOverviewId: 1,
//       },
//     })

//     console.log('RevenueBreakdown created:', newRevenueBreakdown)

//     const newTaxSummary = await prisma.taxSummary.create({
//       data: {
//         taxAmount: 2000,
//         taxRate: 10,
//         financialOverviewId: 1, // pastikan ID-nya valid
//       },
//     })

//     console.log('TaxSummary created:', newTaxSummary)

//     const newChatConversation = await prisma.chatConversation.create({
//       data: {
//         accountId: 'account_123', // ganti dengan ID yang valid
//         title: 'Customer Inquiry - May',
//         role: 'USER', // enum Role, pastikan valid
//       },
//     })

//     console.log('ChatConversation created:', newChatConversation)

//     const newChatMessage = await prisma.chatMessage.create({
//       data: {
//         content: 'Hello, I need help with my order.',
//         role: 'USER',
//         accountId: 'account_123',
//         conversationId: 'conversation_uuid', // ganti sesuai conversation yang dibuat
//       },
//     })

//     console.log('ChatMessage created:', newChatMessage)

// // 9. Reviews
// await prisma.review.createMany({
//   data: [
//     {
//       productId: product1.id,
//       accountId: account1.id,
//       rating: 5,
//       comment: "Amazing apples!",
//       sellerId: "",
//     },
//     {
//       productId: product2.id,
//       accountId: account2.id,
//       rating: 4,
//       comment: "Very fresh and tasty",
//       sellerId: "",
//     },
//     {
//       productId: product3.id,
//       accountId: account2.id,
//       rating: 2,
//       comment: "Very cheap but not fresh",
//       sellerId: "",
//     },
//     {
//       productId: product4.id,
//       accountId: account1.id,
//       rating: 3,
//       comment: "Good quality but expensive",
//       sellerId: "",
//     },
//     {
//       productId: product5.id,
//       accountId: account2.id,
//       rating: 5,
//       comment: "Best mangoes ever!",
//       sellerId: "",
//     },
//     {
//       productId: product6.id,
//       accountId: account1.id,
//       rating: 4,
//       comment: "Great grapes, will buy again",
//       sellerId: "",
//     },
//     {
//       productId: product7.id,
//       accountId: account2.id,
//       rating: 3,
//       comment: "Watermelon was a bit overripe",
//       sellerId: "",
//     },
//     {
//       productId: product8.id,
//       accountId: account1.id,
//       rating: 5,
//       comment: "Delicious pineapple!",
//       sellerId: "",
//     },
//     {
//       productId: product9.id,
//       accountId: account2.id,
//       rating: 4,
//       comment: "Fresh strawberries, loved them",
//       sellerId: "",
//     },
//     {
//       productId: product10.id,
//       accountId: account1.id,
//       rating: 2,
//       comment: "Papaya was not ripe enough",
//       sellerId: "",
//     },
//     {
//       productId: product11.id,
//       accountId: account2.id,
//       rating: 5,
//       comment: "Kiwi was sweet and juicy",
//       sellerId: "",
//     },
//     {
//       productId: product12.id,
//       accountId: account1.id,
//       rating: 4,
//       comment: "Avocado was creamy and fresh",
//       sellerId: "",
//     },
//     {
//       productId: product13.id,
//       accountId: account2.id,
//       rating: 3,
//       comment: "Zucchini was okay, not the best",
//       sellerId: "",
//     },
//     {
//       productId: product14.id,
//       accountId: account1.id,
//       rating: 5,
//       comment: "Carrot was crunchy and sweet",
//       sellerId: "",
//     },
//     {
//       productId: product15.id,
//       accountId: account2.id,
//       rating: 4,
//       comment: "Spinach was fresh and green",
//       sellerId: "",
//     },
//     {
//       productId: product16.id,
//       accountId: account1.id,
//       rating: 2,
//       comment: "Tomato was not fresh enough",
//       sellerId: "",
//     },
//     {
//       productId: product17.id,
//       accountId: account2.id,
//       rating: 5,
//       comment: "Potato was starchy and delicious",
//       sellerId: "",
//     },
//     {
//       productId: product18.id,
//       accountId: account1.id,
//       rating: 4,
//       comment: "Cucumber was crisp and refreshing",
//       sellerId: "",
//     },
//     {
//       productId: product19.id,
//       accountId: account2.id,
//       rating: 3,
//       comment: "Broccoli was okay, not the best",
//       sellerId: "",
//     },
//     {
//       productId: product20.id,
//       accountId: account1.id,
//       rating: 5,
//       comment: "Cauliflower was fresh and white",
//       sellerId: "",
//     },
//     {
//       productId: product21.id,
//       accountId: account2.id,
//       rating: 4,
//       comment: "Bell pepper was colorful and sweet",
//       sellerId: "",
//     },

//   ],
// });
// console.log("✅ Reviews created");

// // 10. Event Logs
// await prisma.eventLog.createMany({
//   data: [
//     {
//       event: "User login",
//       accountId: account1.id,
//       action: "login",
//     },
//     {
//       event: "Order placed",
//       orderId: order.id,
//       accountId: account1.id,
//       action: "create_order",
//     },
//     {
//       event: "Product updated",
//       productId: product1.id,
//       accountId: seller1.id,
//       action: "update_product",
//     },
//   ],
// });
// console.log("✅ Event Logs created");

// //   console.log("🌱 Seeding complete!");
// // }

// // main()
// //   .catch((e) => {
// //     console.error("❌ Seeding error:", e);
// //     process.exit(1);
// //   })
// //   .finally(async () => {
// //     await prisma.$disconnect();
// //   });
