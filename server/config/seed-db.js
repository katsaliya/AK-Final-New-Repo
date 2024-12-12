import { pool } from './database.js';
let placeData = [
    {
        name: "Gaggan Anand",
        address: "68 Sukhumvit Soi 31 Khlong Toei Nuea, Watthana,Bangkok 10110, Thailand",
        phone: "+66 98 883 1022",
        photo: "/images/places.png"
    },
    {
        name: "Gaggan Anand",
        address: "68 Sukhumvit Soi 31 Khlong Toei Nuea, Watthana,Bangkok 10110, Thailand",
        phone: "+66 98 883 1022",
        photo: "/images/places.png"
    },
    {
        name: "Gaggan Anand",
        address: "68 Sukhumvit Soi 31 Khlong Toei Nuea, Watthana,Bangkok 10110, Thailand",
        phone: "+66 98 883 1022",
        photo: "/images/places.png"
    },
    {
        name: "Gaggan Anand",
        address: "68 Sukhumvit Soi 31 Khlong Toei Nuea, Watthana,Bangkok 10110, Thailand",
        phone: "+66 98 883 1022",
        photo: "/images/places.png"
    },
    {
        name: "Gaggan Anand",
        address: "68 Sukhumvit Soi 31 Khlong Toei Nuea, Watthana,Bangkok 10110, Thailand",
        phone: "+66 98 883 1022",
        photo: "/images/places.png"
    }
];

const dropTables = async () => {
    try {
        await pool.query('DROP TABLE IF EXISTS places');
    } catch (error) {
        console.log(error)
    }
}
const createTables = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS places (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(20),
            address VARCHAR(255),
            photo VARCHAR(255)
        )
    `);
    console.log('Created tables');
};
const insertData = async () => {
    try {
        await pool.query(`
            INSERT INTO restaurants (name, phone, address, photo)
            VALUES
            ${restaurantData.map(r => `('${r.name}', '${r.phone}', '${r.address}', '${r.photo}')`).join(', ')}
        
        `);
  console.log('Inserted data');
    } catch (error) {
        console.log(error)
    }
}
const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
}

setup();