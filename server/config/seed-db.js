import { pool } from './database.js';
let venueData = [
    {
        id: 0,
        name: "Vesuvio Cafe",
        address: "255 Columbus Ave, San Francisco, CA 94133",
        phone: "+1 415-362-3370",
        photo: "/images/vesuvioCafe.png"
    },
    {
        id: 1,
        name: "The Saloon",
        address: "1232 Grant Ave, San Francisco, CA 94133",
        phone: "+1 415-989-7666",
        photo: "/images/saloon.jpg"
    },
    {
        id: 2,
        name: "The Internal at Long Now",
        address: "Fort Mason Center, 2 Marina Blvd, San Francisco, CA 94123",
        phone: "+1 415-561-6582",
        photo: "/images/internal.jpg"
    },
    {
        id: 3,
        name: "Comet Club",
        address: "3111 Fillmore St, San Francisco, CA 94123",
        phone: "+1 415-567-5589",
        photo: "/images/cometclub.png"
    },
    {
        id: 4,
        name: "Twin Peaks Tavern",
        address: "401 Castro St, San Francisco, CA 94114",
        phone: "+1 415-864-9470",
        photo: "/images/twinpeaks.png"
    },
    {
        id: 5,
        name: "Beaux",
        address: "2344 Market St, San Francisco, CA 94114",
        phone: "+1 415-863-4027",
        photo: "/images/beaux.png"
    },
    {
        id: 6,
        name: "Trick Dog",
        address: "3010 20th St, San Francisco, CA 94110",
        phone: "+1 415-471-2999",
        photo: "/images/TrickDog.png"
    },
    {
        id: 8,
        name: "Public Works",
        address: "161 Erie St, San Francisco, CA 94103",
        phone: "+1 415-932-0955",
        photo: "/images/publicWorks.png"
    }
];

const dropTables = async () => {
    try {
        await pool.query('DROP TABLE IF EXISTS reviews');
        await pool.query('DROP TABLE IF EXISTS venues');
        await pool.query('DROP TABLE IF EXISTS users'); 
    } catch (error) {
        console.log(error)
    }
}
const createTables = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS venues (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(20),
            address VARCHAR(255),
            photo VARCHAR(255)
        )
    `);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            rating INTEGER NOT NULL,
            content TEXT,
            venue_id INTEGER REFERENCES venues(id) ON DELETE CASCADE
        )
    `);

    await pool.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        hashedPassword VARCHAR(255) NOT NULL
    )`);
    console.log('Created tables');
};
const insertData = async () => {
    try {
        await pool.query(`
            INSERT INTO venueData (id, name, phone, address, photo)
            VALUES
            ${venueData.map(r => `('${r.name}', '${r.phone}', '${r.address}', '${r.photo}')`).join(', ')}
        
        `);
        await pool.query(`
            INSERT INTO reviews (rating, content, venue_id) VALUES
            (5, 'Great food!', 1),
            (4, 'Good service.', 1),
            (3, 'Average experience.', 2),
            (2, 'Not so good.', 2)
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