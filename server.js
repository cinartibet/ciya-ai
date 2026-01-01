import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// frontend (public klasörü)
app.use(express.static(path.join(__dirname, "public")));

// API endpoint
app.get("/api/image", async (req, res) => {
    const query = req.query.q;
    if (!query) return res.json({ image: null });

    try {
        const r = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1`,
            {
                headers: {
                    Authorization: `Client-ID ${process.env.UNSPLASH_KEY}`
                }
            }
        );

        const d = await r.json();

        if (!d.results || d.results.length === 0) {
            return res.json({ image: null });
        }

        res.json({ image: d.results[0].urls.regular });
    } catch (e) {
        res.json({ image: null });
    }
});

app.listen(PORT, () => {
    console.log("✅ CIYA-AI backend çalışıyor");
});
