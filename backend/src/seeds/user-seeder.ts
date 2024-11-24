import { prismaClient } from "../application/database";

export async function seedUser(){
    const data = []
    for(let i=0;i<10;i++){
        data.push({
            username: "user"+i,
            email: `user${i}@gmail.com`,
            password: "Tubes2WBD",
            description: 'Saya adalah user'+i
        })
    }

    await prismaClient.user.createMany({
        data: data
    })

    console.log("Seeding Users finished")
}