import express from "express";
import connectDB from "./config/db.js";
import { graphqlHTTP } from "express-graphql";
import resolvers from "./graphql/resolvers.js";
import schema from "./graphql/schema.js";
import cors from 'cors';
import dotenv from "dotenv";
import auth from "./middlewares/auth.js";


dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors({
  origin: `http://localhost:${port}`, 
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization'   
}));
app.use(express.json()); 
 
app.use('/graphql',   graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}));


connectDB(); 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
