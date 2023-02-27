import * as dotenv from "dotenv";
dotenv.config();


  export const PORT= process.env.PORT || 3001;
  export const USER= process.env.USER!
  export const PASSWORD= process.env.PASSWORD!
  export const DATABASE= process.env.DATABASE!
  export const HOST= process.env.HOST!
  export const DATABASE_PORT= process.env.DATABASE_PORT!
  export const saltRounds= process.env.saltRounds
  export const SECRET = process.env.SECRET;