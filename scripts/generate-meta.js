const fs = require("fs").promises;
const path = require("path");
const matter = require("gray-matter");

async function generateMeta() {
  const projectsDir = path.join(__dirname, "..", "projects");
  const projects = [];

  async function processProjectDirectory(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Look for README.md in each project directory
        const readmePath = path.join(fullPath, "README.md");
        try {
          const content = await fs.readFile(readmePath, "utf8");
          const { data } = matter(content);

          // Check for required fields
          if (
            !data.title ||
            !data.description ||
            !data.startDate ||
            !data.slug ||
            !data.type ||
            !data.status
          ) {
            console.warn(
              `Warning: Missing required frontmatter in ${readmePath}`
            );
            continue;
          }

          // Validate status
          const validStatuses = ["planned", "in-progress", "completed"];
          if (!validStatuses.includes(data.status)) {
            console.warn(
              `Warning: Invalid status "${data.status}" in ${readmePath}`
            );
            continue;
          }

          // Validate type
          const validTypes = ["personal", "work"];
          if (!validTypes.includes(data.type)) {
            console.warn(
              `Warning: Invalid type "${data.type}" in ${readmePath}`
            );
            continue;
          }

          // Check if docs directory exists and has index.json
          const docsDir = path.join(fullPath, "docs");
          try {
            await fs.access(docsDir);
            const docsIndexPath = path.join(docsDir, "index.json");
            const docsIndexExists = await fs
              .access(docsIndexPath)
              .then(() => true)
              .catch(() => false);

            if (!docsIndexExists) {
              console.warn(`Warning: Missing docs/index.json in ${entry.name}`);
            }
          } catch (error) {
            console.warn(`Warning: No docs directory found in ${entry.name}`);
          }

          projects.push({
            ...data,
            path: path.relative(projectsDir, readmePath),
          });
        } catch (error) {
          if (error.code === "ENOENT") {
            console.warn(`Warning: No README.md found in ${fullPath}`);
          } else {
            console.error(`Error processing ${fullPath}:`, error);
          }
        }
      }
    }
  }

  await processProjectDirectory(projectsDir);

  // Sort by startDate, newest first
  projects.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  await fs.writeFile(
    path.join(__dirname, "..", "meta.json"),
    JSON.stringify({ projects }, null, 2)
  );

  console.log(
    `Successfully generated meta.json with ${projects.length} projects`
  );
}

generateMeta().catch(console.error);
