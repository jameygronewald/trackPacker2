import * as express from "express";
const router = express.Router();
import checkToken from "../middleware/checkToken";
import db from "../models";

router.post("/", checkToken, async (req: any, res) => {
  const { name, status } = req.body;
  const { id: userId } = req.user;
  
  try {

    if (!name || !status) throw new Error('Unable to create new item.');

    const user = await db.User.findOne({ _id: userId});
    if (!user) throw new Error('Unable to create new item.');
    
    const newItem = new db.Item({ name, status });

    const item = await newItem.save();

    user.items.push(item._id);

    await user.save();

    res.status(200).json(item);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Server error.",
    });
  }
});

module.exports = router;
