"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const link_1 = require("../models/link");
const router = (0, express_1.Router)();
router.get("/:code", async (req, res) => {
    const { code } = req.params;
    if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
        return res.status(404).send("Not found");
    }
    const link = await link_1.Link.findOne({ code, deleted: false });
    if (!link)
        return res.status(404).send("Not found");
    link.clicks += 1;
    link.last_clicked = new Date();
    await link.save();
    return res.redirect(302, link.url);
});
exports.default = router;
