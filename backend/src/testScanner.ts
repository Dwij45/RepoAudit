import path from "path";
import { fileURLToPath } from "url";
import { scanFiles } from "./scanner/fileScanner.js";
import { runScan } from "./scanner/ruleEngine.js"; // Import the engine
import { types } from "util";

// 1. Point to your folder
const scan = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const TEST_FOLDER = path.join(__dirname, "../test_data");

    console.log(`Scanning folder: ${TEST_FOLDER}`);

    // 2. Get Files (The Eyes)
    const files = scanFiles(TEST_FOLDER);
    console.log(`Found ${files.length} files.`);

    // 3. Run Logic (The Brain)
    const violations = runScan(files, TEST_FOLDER);

    // 4. Print Report
    console.log(`\n VIOLATIONS FOUND: ${violations.length}`);
    console.log("------------------------------------------------");
    console.log(JSON.stringify(violations, null, 2));
    return violations;
};

export default scan;