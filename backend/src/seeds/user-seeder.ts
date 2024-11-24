import { prismaClient } from "../application/database";
const bcrypt = require("bcrypt");

export async function seedUser(){
    const data = []
    for(let i=0;i<10;i++){
        data.push({
            username: "user"+i,
            full_name: "Budi The "+i,
            email: `user${i}@gmail.com`,
            password: await bcrypt.hash("TubesWBD123", 10),
            work_history: 'Saya sudah bekerja selama '+i+" tahun",
            skills: "Tidur"
        })
    }

    await prismaClient.user.createMany({
        data: data
    })

    console.log("Seeding Users finished")
}