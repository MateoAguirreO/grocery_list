import express from "express";
import Item from "../models/item.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();
router.use(requireAuth);

router.get("/", async (req, res) => {
  res.json(await Item.find({ userId: req.userId }));
});

router.post("/", async (req, res) => {
  const item = await Item.create({ userId: req.userId, name: req.body.name });
  res.status(201).json(item);
});

router.delete("/:id", async (req, res) => {
  await Item.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.status(204).send();
});

router.patch("/:id/tag", async (req, res) => {
  const item = await Item.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { tagged: true },
    { new: true }
  );
  res.json(item);
});

router.patch("/:id/untag", async (req, res) => {
  const item = await Item.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { tagged: false },
    { new: true }
  );
  res.json(item);
});

export default router;
