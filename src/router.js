import { searchAnime } from "./controllers/anime-search.js";
import express from "express";
import { TopAnime } from "./controllers/top-anime.js";
export const router = express.Router();

router.get("/api/TopAnime", TopAnime);
router.get("/api/search", searchAnime);
