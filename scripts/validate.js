const fs = require("fs").promises;
const path = require("path");
const matter = require("gray-matter");

async function validateProjects() {
  const projectsDir = path.join(__dirname, "..", "projects");
  let hasErrors = false;

  async function validateProject(projectPath) {
    const readmePath = path.join(projectPath, "README.md");

    try {
      // Validate README.md exists
      const content = await fs.readFile(readmePath, "utf8");
      const { data } = matter(content);

      // Required fields
      const requiredFields = [
        "title",
        "description",
        "type",
        "status",
        "startDate",
        "tags",
        "slug",
        "visibility",
      ];

      for (const field of requiredFields) {
        if (!data[field]) {
          console.error(
            `Error: Missing required field '${field}' in ${readmePath}`
          );
          hasErrors = true;
        }
      }

      // Validate type
      if (data.type && !["personal", "work"].includes(data.type)) {
        console.error(
          `Error: Invalid type '${data.type}' in ${readmePath}. Must be 'personal' or 'work'`
        );
        hasErrors = true;
      }

      // Validate status
      if (
        data.status &&
        !["planned", "in-progress", "completed"].includes(data.status)
      ) {
        console.error(
          `Error: Invalid status '${data.status}' in ${readmePath}. Must be 'planned', 'in-progress', or 'completed'`
        );
        hasErrors = true;
      }

      // Validate visibility
      if (data.visibility && !["public", "private"].includes(data.visibility)) {
        console.error(
          `Error: Invalid visibility '${data.visibility}' in ${readmePath}. Must be 'public' or 'private'`
        );
        hasErrors = true;
      }

      // Validate dates
      if (data.startDate && isNaN(new Date(data.startDate).getTime())) {
        console.error(
          `Error: Invalid startDate '${data.startDate}' in ${readmePath}`
        );
        hasErrors = true;
      }

      if (data.endDate && isNaN(new Date(data.endDate).getTime())) {
        console.error(
          `Error: Invalid endDate '${data.endDate}' in ${readmePath}`
        );
        hasErrors = true;
      }

      // Validate tags
      if (data.tags && !Array.isArray(data.tags)) {
        console.error(`Error: Tags must be an array in ${readmePath}`);
        hasErrors = true;
      }

      // Validate docs structure
      const docsDir = path.join(projectPath, "docs");
      try {
        await fs.access(docsDir);
        const indexPath = path.join(docsDir, "index.json");
        try {
          const indexContent = await fs.readFile(indexPath, "utf8");
          JSON.parse(indexContent); // Validate JSON syntax
        } catch (error) {
          console.error(
            `Error: Invalid or missing docs/index.json in ${projectPath}`
          );
          hasErrors = true;
        }
      } catch (error) {
        console.warn(`Warning: No docs directory found in ${projectPath}`);
      }
    } catch (error) {
      console.error(`Error processing ${projectPath}: ${error.message}`);
      hasErrors = true;
    }
  }

  try {
    const entries = await fs.readdir(projectsDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        await validateProject(path.join(projectsDir, entry.name));
      }
    }

    if (hasErrors) {
      process.exit(1);
    }
  } catch (error) {
    console.error("Error reading projects directory:", error);
    process.exit(1);
  }
}

validateProjects().catch((error) => {
  console.error("Validation failed:", error);
  process.exit(1);
});
