import express from 'express';
import { addMobile, getAllMobiles, getMobileById } from '../controllers/mobile-controller';
const mobileRouter = express.Router();
mobileRouter.get("/",getAllMobiles);
mobileRouter.get("/:id",getMobileById);
mobileRouter.post("/",addMobile);

export default mobileRouter;
