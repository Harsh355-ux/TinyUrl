"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("./db");
const link_1 = __importDefault(require("./routes/link"));
const redirect_1 = __importDefault(require("./routes/redirect"));
const health_1 = __importDefault(require("./routes/health"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/links", link_1.default);
app.use("/healthz", health_1.default);
app.use("/", redirect_1.default); // redirect must be last
const port = process.env.PORT || 4000;
(0, db_1.connectDB)().then(() => {
    app.listen(port, () => console.log(`🚀 Backend running on port ${port}`));
});
