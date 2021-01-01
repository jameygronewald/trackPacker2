import * as express from "express";
import checkToken from "../middleware/checkToken";
const router = express.Router();
import createToken from "../utils/createToken";
import db from "../models";

// AUTHENTICATE A REQUEST
router.get("/", checkToken, async (req: any, res) => {
  try {
    const userId = req.user.id;
    const user = await db.User.findById(userId).select("-password");

    res.status(200).json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ msg: "Invalid jwt." });
  }
});

// LOGIN A USER
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ email });

    if (password !== user.password) throw new Error("Invalid Password.");

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = createToken(payload);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ msg: "Invalid credentials." });
  }
});

module.exports = router;
