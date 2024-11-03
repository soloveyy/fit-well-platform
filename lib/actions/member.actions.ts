"use server"

import {ID, Query} from "node-appwrite";
import {parseStringify} from "@/lib/utils";
import {InputFile} from "node-appwrite/file";
import {
    NEXT_PUBLIC_BUCKET_ID,
    DATABASE_ID,
    ENDPOINT,
    PROJECT_ID,
    databases,
    storage,
    users,
    MEMBER_COLLECTION_ID,
} from "../appwrite.config";

export const createUser = async (user: CreateUserParams) => {
    try {
        console.log('test')
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );

        console.log(newUser)
        return parseStringify(newUser);
    } catch (error) {
        console.log(error)
        // // @ts-ignore
        // if(error && error?.code === 409) {
        //     const documents = await users.list([
        //         Query.equal('email', [user.email])
        //     ])
        //
        //     return documents?.users[0]
        // }
    }
}

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId)
        return parseStringify(user)
    } catch(error) {
        console.log(error)
    }
}

export const getMember = async (userId: string) => {
    try {
        const members = await databases.listDocuments(
            DATABASE_ID!,
            MEMBER_COLLECTION_ID!,
            [ Query.equal('userId', userId) ],
        )
        return parseStringify(members.documents[0])
    } catch(error) {
        console.log(error)
    }
}

export const registerMember = async({ identificationDocument, ...member }: RegisterUserParams) => {
    try {
        let file
        console.log('identificationDocument ', identificationDocument)

            const inputFile = InputFile.fromBuffer(
                identificationDocument?.get('blobFile') as Blob,
                identificationDocument?.get('name') as string,
            )

            file = await storage.createFile(NEXT_PUBLIC_BUCKET_ID!, ID.unique(), inputFile)

        const newMember = await databases.createDocument(
            DATABASE_ID!,
            MEMBER_COLLECTION_ID!,
            ID.unique(),
            {
                identificationDocumentId: file?.$id ? file.$id : null,
                identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${NEXT_PUBLIC_BUCKET_ID}
                /files/${file?.$id}/view?project=${PROJECT_ID}`,
                ...member
            }
        )

        return parseStringify(newMember)

    } catch (e) {
        console.log(e)
    }
}