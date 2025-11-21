import { Router } from "express";
import { Link } from "../models/link";

const router = Router();

router.get("/:code", async (req, res) => {
  const { code } = req.params;

  if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
    return res.status(404).send("Not found");
  }

  const link = await Link.findOne({ code, deleted: false });
  if (!link) return res.status(404).send("Not found");

  link.clicks += 1;
  link.last_clicked = new Date();
  await link.save();

  return res.redirect(302, link.url);
});

export default router;
