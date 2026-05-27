import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("69c6a790003e172ffcfd");

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
