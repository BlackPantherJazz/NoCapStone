import { describe, it, expect, vi } from "vitest";
import { protect } from "./auth.js";
import jwt from "jsonwebtoken";

describe("protect middleware", () => {
      it("lets a request through when the token is valid", () => {
    // ARRANGE
    const req = { headers: { authorization: "Bearer faketoken123" } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    // rig the scanner: jwt.verify returns a fake user instead of really checking
    vi.spyOn(jwt, "verify").mockReturnValue({ id: "abc123", role: "artist" });

    // ACT
    protect(req, res, next);

    // ASSERT
    expect(next).toHaveBeenCalled();          // door opened
    expect(req.user).toEqual({ id: "abc123", role: "artist" }); // wristband info stapled on
    expect(res.status).not.toHaveBeenCalledWith(401); // no denial
  });
  it("blocks a request that has no token", () => {
    // ARRANGE — build the three fakes
    const req = { headers: {} };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    // ACT — send the guest to the bouncer, once
    protect(req, res, next);

    // ASSERT — check what the bouncer said and did
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});