import express from 'express'
import dotenv from 'dotenv'
import authRouters from './router/routes'
import { PrismaClient } from '@prisma/client';


dotenv.config()
const app = express()
const PORTA = process.env.PORT
const prisma = new PrismaClient();

app.use(express.json())
app.use('/api',authRouters)

async function main() {
    // Exemplo: Obter todos os usuários
    const users = await prisma.user.findMany();
    console.log(users);
  }
  
  main()
    .catch((e) => {
      console.error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

app.listen(PORTA,() =>{
    console.log(`Servidor executando na porta: ${PORTA}`)
})


