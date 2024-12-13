const fs = require('fs');
const path = require('path');

// Define source and target directories
const sourceDir = path.join(process.cwd(), 'src/components/weirdui');
const targetDir = path.join(process.cwd(), 'public/weirdui');

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
    } else if (entry.isFile() && entry.name === 'component.tsx') {
      // Copy only files named 'component.tsx'
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Execute the file copying
copyComponentFiles(sourceDir, targetDir);

console.log('Component files copied to public directory.');