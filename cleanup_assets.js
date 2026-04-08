const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'images', 'works');
const limit = 25 * 1024 * 1024; // 25 MiB

if (!fs.existsSync(dir)) {
    console.error("Directory not found:", dir);
    process.exit(1);
}

fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile() && stats.size > limit) {
        console.log(`Deleting ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MiB)`);
        fs.unlinkSync(filePath);
    }
});
console.log("Cleanup complete.");
