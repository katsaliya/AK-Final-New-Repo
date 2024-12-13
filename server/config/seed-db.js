import { pool } from './database.js';
let placeData = [
    {
        name: "Vesuvio Cafe",
        address: "255 Columbus Ave, San Francisco, CA 94133",
        phone: "+1 415-362-3370",
        photo: "/images/vesuvioCafe.png"
    },
    {
        name: "The Saloon",
        address: "1232 Grant Ave, San Francisco, CA 94133",
        phone: "+1 415-989-7666",
        photo: "/images/saloon.png"
    },
    {
        name: "The Internal at Long Now",
        address: "Fort Mason Center, 2 Marina Blvd, San Francisco, CA 94123",
        phone: "+1 415-561-6582",
        photo: "/images/internal.png"
    },
    {
        name: "Comet Club",
        address: "3111 Fillmore St, San Francisco, CA 94123",
        phone: "+1 415-567-5589",
        photo: "/images/cometclub.png"
    },
    {
        name: "Twin Peaks Tavern",
        address: "401 Castro St, San Francisco, CA 94114",
        phone: "+1 415-864-9470",
        photo: "/images/twinpeaks.png"
    },
    {
        name: "Beaux",
        address: "2344 Market St, San Francisco, CA 94114",
        phone: "+1 415-863-4027",
        photo: "/images/beaux.png"
    },
    {
        name: "Trick Dog",
        address: "3010 20th St, San Francisco, CA 94110",
        phone: "+1 415-471-2999",
        photo: "/images/TrickDog.png"
    },
    {
        name: "Public Works",
        address: "161 Erie St, San Francisco, CA 94103",
        phone: "+1 415-932-0955",
        photo: "/images/publicWorks.png"
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