import { searchAnime } from "./controllers/anime-search.js";

import express from "express";
export const router = express.Router();

router.get("/api/search", searchAnime);
