import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpRoute = {
    path:"/api/signup",
    method: "post",
    handler: async (req,res) => {
        //Debug Log
        // console.log("Received a POST request on /api/signup");

        const {email,firstName, lastName, location, password} = req.body
        if(!email || !password || !firstName || !lastName || !location) return res.sendStatus(500);
        const db= getDbConnection(`ecommerce`);

        const user = await db.collection("users").findOne({email});

        //User with this email already exist
        if (user) return res.sendStatus(409);

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        //Debug Log
        //console.log(`Password: ${password}; Salt: ${salt} ; Hash: ${passwordHash}`)
        //console.log(`Email: ${email}, Password: ${password}`)

        
        const result = await db.collection("users").insertOne({
            email,
            passwordHash,
            firstName,
            lastName,
            location,
        });
        
        if(!result) return res.sendStatus(500);

        const {insertedId} = result;


        jwt.sign(
            {uid: insertedId, email , firstName, lastName,location},
            process.env.JWT_SECRET, 
            {expiresIn: "2d"},
            (error, token) => {
                if(error) {
                    console.log("Error generating jwt token:\n", error);
                    return res.status(500).send(error);
                }

            return res.status(200).json({token});
            }  
        );
    },
};