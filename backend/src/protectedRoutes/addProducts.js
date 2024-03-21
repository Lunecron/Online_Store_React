import { getDbConnection } from "../db";
import { upload } from "../multerConfig";

export const addProducts = {
    path: "/api/product",
    method: "post",
    handler: async (req,res) => {
        // At this point, multer has processed the upload
        
        
        upload.single("productImage")(req, res, async function(err) {
            if (err) {
                // Handle multer upload error
                console.error("Multer error:", err);
                return res.status(400).send("File upload failed");
            }

            const { title , price ,altTitle,availability,} = req.body;
            const imageSource = req.file.filename;

            if(!title || !price || imageSource === "" || !altTitle || !availability) return res.sendStatus(400);

            const creationDate = Date.now();
            const db = getDbConnection("ecommerce");

            const result = await db.collection("products").insertOne({title,altTitle, imageSource,price ,availability,creationDate});

            if(!result) return res.sendStatus(500);

            return res.sendStatus(200);
        });
    },
};