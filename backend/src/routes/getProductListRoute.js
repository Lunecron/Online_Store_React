import { getDbConnection } from "../db";

export const productListRoute = {
  path: "/api/productList",
  method: "get",
  handler: async (req, res) => {
    // Debug log
    //console.log("Received a get request on /api/productList");

    const { pageNumber } = req.query;
    const entiesPerPage = 10;

    // Calculate skip value based on page number
    const skip = (pageNumber - 1) * entiesPerPage;

    const db = getDbConnection("ecommerce");
    const products = await db.collection("products").find().skip(skip).limit(entiesPerPage).toArray();
    const totalPages = await db.collection("products").countDocuments();
    const totalPagesJson = { 'totalPages' : totalPages%entiesPerPage};
    const pagesAndProducts = [totalPagesJson,...products];
  
    if (!products) return res.sendStatus(500);

    return res.json(pagesAndProducts);
  },
};
