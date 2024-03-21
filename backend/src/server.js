import express, {application} from "express";
import { initializeDBConnection } from "./db";
import { routes } from "./routes";
import { authMiddleware } from "./utils/authMiddleware";
import { protectedRoutes } from "./protectedRoutes";
import cors from "cors";
import { upload } from "./multerConfig";
import path from "path";

const PORT = process.env.PORT || 8080;


const app = express();
app.use(cors());
app.use(express.json());

app.get("/ping", (req,res)=>{
    // console.log("Recieved a ping... respond with a pong...")
    res.send("PONG back at you...");
} );

// Serve static files (including images)
app.use('/uploads', express.static('uploads'));

routes.map((route) => app[route.method](route.path, route.handler));

app.use("/", authMiddleware);

protectedRoutes.map((route)=> app[route.method](route.path,route.handler));

initializeDBConnection().then(()=> {
    app.listen(PORT, ()=> console.log(`MERN server is listening on port ${PORT}...`));

});
