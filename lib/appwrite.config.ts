import * as sdk from 'node-appwrite'

export const {
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    MEMBER_COLLECTION_ID,
    ACTIVITY_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env

const client = new sdk.Client()

client
    .setEndpoint(ENDPOINT!)
    .setProject(PROJECT_ID!)
    .setKey(API_KEY!)

export const databases = new sdk.Databases(client)
export const storage = new sdk.Storage(client)
export const message = new sdk.Messaging(client)
export const users = new sdk.Users(client)