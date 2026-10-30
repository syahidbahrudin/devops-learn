import { describe, it } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app";

describe("Health API", () => {
  it("should return HTTP 200", async () => {
    const response = await request(app)
      .get("/health");

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "healthy");
  });
});