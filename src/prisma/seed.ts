import { prisma } from './client.js';
import { generateSalt, hashPassword } from '@/utility';
    import { v4 as uuidv4 } from 'uuid';

 const restaurants = [
        {
            "name": "Le Petit Bistro",
            "ownerName": "Isabelle Dupont",
            "foodTypes": ["French", "Seafood"],
            "postalcode": "75001",
            "address": "10 Rue de la Roquette",
            "phone": "01 45 67 89 10",
            "email": "lepetitbistro@gmail.com",
            "password": "qwerty"
        },
        {
            "name": "La Brasserie Parisienne",
            "ownerName": "Pierre Martin",
            "foodTypes": ["French", "Brasserie"],
            "postalcode": "75002",
            "address": "30 Rue Montorgueil",
            "phone": "01 55 66 77 88",
            "email": "brasserieparisienne@gmail.com",
            "password": "qwerty"
        },
        {
            "name": "Chez Amélie",
            "ownerName": "Jacques Laurent",
            "foodTypes": ["Italian", "Mediterranean"],
            "postalcode": "75005",
            "address": "15 Rue Mouffetard",
            "phone": "01 34 56 78 90",
            "email": "chezamelie@gmail.com",
            "password": "qwerty"
        },
        {
            "name": "Sushi Fusion",
            "ownerName": "Yuki Tanaka",
            "foodTypes": ["Japanese", "Sushi"],
            "postalcode": "75010",
            "address": "5 Rue du Faubourg Saint-Denis",
            "phone": "01 23 45 67 89",
            "email": "sushifusion@gmail.com",
            "password": "qwerty"
        },
        {
            "name": "Le Gourmet Parisien",
            "ownerName": "Sophie Leclerc",
            "foodTypes": ["French", "Gourmet"],
            "postalcode": "75016",
            "address": "50 Avenue Victor Hugo",
            "phone": "01 12 34 56 78",
            "email": "gourmetparisien@gmail.com",
            "password": "qwerty"
        },
        {
            "name": "Burger World",
            "ownerName": "Mark Johnson",
            "foodTypes": ["American", "Burgers"],
            "postalcode": "75010",
            "address": "20 Rue de la République",
            "phone": "01 98 76 54 32",
            "email": "burgerworld@gmail.com",
            "password": "qwerty"
        },
        {
            "name": "Pasta Paradise",
            "ownerName": "Maria Rossi",
            "foodTypes": ["Italian", "Pasta"],
            "postalcode": "75010",
            "address": "15 Avenue de la Liberté",
            "phone": "01 76 54 32 10",
            "email": "pastaparadise@gmail.com",
            "password": "qwerty"
        }
    ];


    async function main() {
        for (let i = 0; i < restaurants.length; i++) {
            const restaurant = restaurants[i]
            const salt = await generateSalt()
            const hashedPassword = await hashPassword(restaurant.password, salt)
            const id = uuidv4()
            const serviceAvailable = i % 2 === 0 // un sur deux
            const rating = parseFloat((Math.random() * 10).toFixed(2)) // de 0 à 10

            await prisma.restaurant.create({
                data: {
                    id,
                    name: restaurant.name,
                    ownerName: restaurant.ownerName,
                    foodTypes: restaurant.foodTypes,
                    postalcode: restaurant.postalcode,
                    address: restaurant.address,
                    phone: restaurant.phone,
                    email: restaurant.email,
                    password: hashedPassword,
                    salt,
                    serviceAvailable,
                    rating,
                    foods: {
                        create: [
                            {
                                id: uuidv4(),
                                name: i === 6 ? "Pizza Regina" : "Plat Signature",
                                description: "Un plat maison incontournable",
                                category: "Plat principal",
                                foodType: restaurant.foodTypes[0],
                                readyTime: i % 2 === 0 ? 25 : 35,
                                price: 18.90,
                                images: [],
                            },
                            {
                                id: uuidv4(),
                                name: i === 3 ? "Pizza Margherita" : "Burger Maison",
                                description: "Délicieux et généreux",
                                category: "Plat principal",
                                foodType: restaurant.foodTypes[0],
                                readyTime: i % 2 === 0 ? 30 : 40,
                                price: 14.90,
                                images: [],
                            },
                            {
                                id: uuidv4(),
                                name: "Dessert du chef",
                                description: "Un dessert raffiné pour conclure",
                                category: "Dessert",
                                foodType: restaurant.foodTypes[0],
                                readyTime: 10,
                                price: 7.50,
                                images: [],
                            }
                        ]
                    }
                }
            })

            console.log(`Restaurant ${restaurant.name} et ses plats ajoutés.`)
        }
    }

    main()
        .catch((e) => {
            console.error(e)
            process.exit(1)
        })
        .finally(async () => {
            await prisma.$disconnect()
        })
    