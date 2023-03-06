import * as dotenv from "dotenv";
dotenv.config();


  export const PORT= process.env.PORT || 3001;
  export const saltRounds= process.env.saltRounds?parseInt(process.env.saltRounds) : 10
  export const DATABASE_URL= process.env.NODE_ENV === 'test' ?process.env.TEST_DATABASE_URL!: process.env.DATABASE_URL!
  export const SECRET = process.env.SECRET;