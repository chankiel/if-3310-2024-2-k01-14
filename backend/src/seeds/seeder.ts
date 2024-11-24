import { seedUser } from "./user-seeder";

async function main(){
    seedUser()
    console.log("Seeding successfull!")
}

main().catch((e)=>console.error(e));
