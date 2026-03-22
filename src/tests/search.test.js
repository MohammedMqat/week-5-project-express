import { app } from "../app.js";
import request from "supertest";
import { vi, test } from "vitest";
import onePieceSearchStub from "./stubs/search-one-piece.json";

// test("test request 200", () => {
//   return request(app).get("/api/search?q=naruto").expect(200);
// });

test("no query is provided", () => {
  return request(app).get("/api/search").expect(400);
});

test("search with valid query returns anime results", () => {
  vi.stubGlobal("fetch", () =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: {
            title: "Naruto",
            score: 8.5,
            images: { jpg: { image_url: "some-url" } },
          },
        }),
    }),
  );
  return request(app).get("/api/search?q=naruto").expect(200);
});

test("search returns results matching stub data", () => {
  vi.stubGlobal("fetch", () =>
    Promise.resolve({
      json: () => Promise.resolve(onePieceSearchStub),
    }),
  );
  return request(app).get("/api/search?q=onepiece").expect(200);
});
