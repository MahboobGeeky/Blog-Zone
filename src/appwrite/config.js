import conf from '../conf/conf.js';
import { Client, ID, Permission, Query, Role, Storage, TablesDB } from 'appwrite';
// Databases is replaced with TableDB

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            })
        } catch (error) {
            console.log("Appwrite service:: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
           const data = {
                    title,
                    content,
                    status,
                }

            if(featuredImage) {
                data.featuredImage = featuredImage
            }

           return await this.databases.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data,
           })
        } catch (error) {
            console.log("Appwrite service:: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(slug){ // slug -> Id
        try {
            await this.databases.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
            })
            return true;
        } catch (error) {
            console.log("Appwrite service:: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
            })
        } catch (error) {
            console.log("Appwrite service:: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                queries,
            })
        } catch (error) {
            console.log("Appwrite service:: getPosts :: error", error);
            return false;
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file,
                permissions: [
                    Permission.read(Role.any()),
                    Permission.update(Role.users()),
                    Permission.delete(Role.users()),
                ],
            })
        } catch (error) {
            console.log("Appwrite service:: uploadFile :: error", error);
            throw error;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId,
            })
            return true;
        } catch (error) {
            console.log("Appwrite service:: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview({
            bucketId: conf.appwriteBucketId,
            fileId,
        })
    }

    getFileView(fileId){
        return this.bucket.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId,
        })
    }

    




}

const appwriteService = new Service()
export default appwriteService
