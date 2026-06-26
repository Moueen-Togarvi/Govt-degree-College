import { Client } from '@neondatabase/serverless';
import WebSocket from 'ws';

import { neonConfig } from '@neondatabase/serverless';
neonConfig.webSocketConstructor = WebSocket;

const client = new Client(process.env.DATABASE_URL);

async function resetDb() {
    console.log('Dropping public schema...');
    await client.connect();
    await client.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
    await client.end();
    console.log('Schema dropped successfully.');
}

resetDb().catch(console.error);
