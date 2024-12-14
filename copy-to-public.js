const fs = require('fs');
const path = require('path');

// Define source and target directories
const sourceDir = path.join(process.cwd(), 'src/components/registry');
const targetDir = path.join(process.cwd(), 'public/registry');

function copyComponentFiles(src, dest) {
  // Ensure the destination directory exists
  fs.mkdirSync(dest, { recursive: true });

  // Get all directories in the source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  entries.forEach(entry => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy files from subdirectories
      copyComponentFiles(srcPath, destPath);
    } else if (entry.isFile() && ['component.tsx', 'demo.tsx'].includes(entry.name)) {
      // Copy component.tsx and demo.tsx files
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Execute the file copying
copyComponentFiles(sourceDir, targetDir);

console.log('Component files copied to public directory.');