import { Client, Account, Databases } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite Cloud endpoint
  .setProject('6879ef820031fa4dd590'); // Replace with your Project ID

export const appwrite = {
  client,
  account: new Account(client),
  databases: new Databases(client),
};
