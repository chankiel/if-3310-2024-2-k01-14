import { create } from "domain";
import { prismaClient } from "../application/database";
import bcrypt from "bcryptjs";

async function seedUser(){
    const data = [] 
    for(let i=0;i<20;i++){
        data.push({
            username: "user"+i,
            full_name: "Budi The "+i,
            email: `user${i}@gmail.com`,
            password: await bcrypt.hash("TubesWBD123", 10),
            work_history: 'Saya sudah bekerja selama '+i+" tahun",
            skills: "Tidur",
            profile_photo_path: "/images/perry-casino.webp",
        })
    }

    await prismaClient.user.createMany({
        data: data
    })

    console.log("Seeding Users finished")
}

async function seedConnectionAndRequests(){
    const connections = [], requests = [], roomChats = []
    for(let i=1;i<=20;i++){
        for(let j=i+1;j<=20;j++){
            if(j<=10){
                connections.push({
                    from_id: i,
                    to_id: j
                })
                connections.push({
                    from_id: j,
                    to_id: i,
                }),
                roomChats.push({
                    first_user_id: i,
                    second_user_id: j,
                })
            }else{
                requests.push({
                    from_id: i,
                    to_id: j,
                })
            }
        }
    } 

    await prismaClient.connection.createMany({
        data: connections,
    })

    await prismaClient.connectionRequest.createMany({
        data: requests
    })

    await prismaClient.roomChat.createMany({
        data: roomChats
    })
}

async function seedFeeds() {  
    const user = [] 
    user.push({
        username: "Budi",
        full_name: "Budi The feeder",
        email: `user@gmail.com`,
        password: await bcrypt.hash("123456", 10),
        work_history: "Saya sudah bekerja selama tahun",
        skills: "Tidur",
        profile_photo_path: "/images/perry-casino.webp",
    })
    await prismaClient.user.createMany({
        data: user
    })

    const date = new Date()
    

    const feed = []
    for (let index = 0; index < 20; index++) {
        feed.push({
            content : "Halo " + index,
            user_id : 21,
            updated_at : date
        })
    }
    await prismaClient.feed.createMany({
        data: feed
    })


}

async function restartDB() {
    await prismaClient.feed.deleteMany() 
    await prismaClient.roomChat.deleteMany()
    await prismaClient.connection.deleteMany()
    await prismaClient.connectionRequest.deleteMany()
    await prismaClient.user.deleteMany()
}

// async function 

async function main(){
    await restartDB()
    await seedUser()
    await seedConnectionAndRequests()
    await seedFeeds()
    console.log("Seeding successfull!")
}

main().catch((e)=>console.error(e));
