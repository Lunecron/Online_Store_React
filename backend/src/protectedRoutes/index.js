import { getUserOrdersRoute } from "./getUserOrdersRoute";
import { placeOrderRoute } from "./placeOrderRoute";
import { testAuthRoute } from "./testAuthRoute";
import { addProducts } from "./addProducts";
export const protectedRoutes = [testAuthRoute,placeOrderRoute,getUserOrdersRoute,addProducts];
