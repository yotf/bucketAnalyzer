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
//Endpoint to get a specific file in a specific bucket
app.get("/buckets/:bucketName/files/:fileName", async (c) => {
  const bucketName = c.req.param("bucketName");
  const fileName = c.req.param("fileName");
  const filePath = path.join(__dirname, "..", "AWS", bucketName, fileName);
  if (await fs.pathExists(filePath)) {
    const content = await fs.readFile(filePath, "utf-8");
    return c.json({ content });
  } else {
    return c.json({ error: "File not found" }, 404);
  }
});

app.post("/buckets", async (c) => {
  const { bucketName } = await c.req.json();
  const bucketDir = path.join(__dirname, "..", "AWS", bucketName);

  if (await fs.pathExists(bucketDir)) {
    return c.json({ error: "Bucket already exists" }, 400);
  }

  await fs.mkdir(bucketDir);
  return c.json({ message: "Bucket created successfully" });
});

app.post("/buckets/:bucketName/files", async (c) => {
  const bucketName = c.req.param("bucketName");
  const { fileName, content } = await c.req.json();
  const bucketDir = path.join(__dirname, "..", "AWS", bucketName);

  if (!(await fs.pathExists(bucketDir))) {
    return c.json({ error: "Bucket not found" }, 404);
  }

  const filePath = path.join(bucketDir, fileName);

  // Check if the file already exists
  if (await fs.pathExists(filePath)) {
    return c.json({ error: "File already exists" }, 409);
  }
  await fs.writeFile(filePath, content);
  return c.json({ message: "File created successfully" });
});

const port = 3001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
