import { Router } from "express";
import { Link } from "../models/link";
import { z } from "zod";
import { generateRandomCode } from "../utils/generatecode";

const router = Router();

const CodeSchema = z.string().regex(/^[A-Za-z0-9]{6,8}$/);
const CreateSchema = z.object({
  url: z.string().url(),
  code: CodeSchema.optional()
});

// CREATE LINK
router.post("/", async (req, res) => {
  const parsed = CreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });

  const { url, code } = parsed.data;
  const finalCode = code || generateRandomCode(6);

  // Check if code exists
  const exists = await Link.findOne({ code: finalCode });
  if (exists) return res.status(409).json({ error: "Code already exists" });

  const link = await Link.create({ code: finalCode, url });
  res.status(201).json(link);
});

// LIST LINKS
router.get("/", async (_, res) => {
  const links = await Link.find({ deleted: false }).sort({ created_at: -1 });
  res.json(links);
});

// GET STATS
router.get("/:code", async (req, res) => {
  const { code } = req.params;
  if (!/^[A-Za-z0-9]{6,8}$/.test(code))
    return res.status(400).json({ error: "Invalid code" });

  const link = await Link.findOne({ code, deleted: false });
  if (!link) return res.status(404).json({ error: "Not found" });

  res.json(link);
});

// DELETE
router.delete("/:code", async (req, res) => {
  const { code } = req.params;

  const updated = await Link.findOneAndUpdate(
    { code },
    { deleted: true },
    { new: true }
  );

  if (!updated) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
});

export default router;
