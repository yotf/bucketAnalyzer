import { serve } from "@hono/node-server";
import { Hono } from "hono";
import path from "path";
import fs from "fs-extra";
import { cors } from "hono/cors";

const app = new Hono();
app.use("*", cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Endpoint to get all buckets
app.get("/buckets", async (c) => {
  const bucketsDir = path.join(__dirname, "..", "AWS");
  const buckets = await fs.readdir(bucketsDir);
  return c.json(buckets);
});

// Endpoint to get files in a specific bucket
app.get("/buckets/:bucketName/files", async (c) => {
  const bucketName = c.req.param("bucketName");
  const bucketDir = path.join(__dirname, "..", "AWS", bucketName);
  if (await fs.pathExists(bucketDir)) {
    const files = await fs.readdir(bucketDir);
    return c.json(files);
  } else {
    return c.json({ error: "Bucket not found" }, 404);
  }
});

const port = 3001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
