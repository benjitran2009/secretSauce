const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const inquirer = require("inquirer").default;
const cryptor = require("crypto");

// Ensure dist directory exists
const distDir = path.join(__dirname, "dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Function to list directories and files inside a folder
function getDirectoryContents(dir) {
  const items = fs.readdirSync(dir).map((file) => path.join(dir, file));
  const directories = items.filter((item) => fs.statSync(item).isDirectory());
  const files = items.filter((item) => item.endsWith(".js"));

  return { directories, files };
}

// Function to browse folders interactively
async function browseFolders(currentPath) {
  while (true) {
    const { directories, files } = getDirectoryContents(currentPath);
    let choices = [];

    if (currentPath !== __dirname) {
      choices.push({ name: "⬅️ Go Back", value: path.dirname(currentPath) });
    }

    choices = [
      ...choices,
      ...directories.map((dir) => ({ name: `📁 ${path.basename(dir)}`, value: dir })),
      ...files.map((file) => ({ name: `📜 ${path.basename(file)}`, value: file })),
    ];

    const { selectedPath } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedPath",
        message: `Browsing: ${currentPath}`,
        choices,
      },
    ]);

    if (fs.statSync(selectedPath).isDirectory()) {
      currentPath = selectedPath;
    } else {
      return selectedPath;
    }
  }
}

// Main function to compile the selected script
async function main() {
  console.log("📂 Use the file browser to navigate and select a script.");
  const selectedFile = await browseFolders(__dirname);

  console.log(`Compiling: ${selectedFile}`);

  // Extract filename and append a random value
  const originalFileName = path.basename(selectedFile, ".js");
  const randomString = cryptor.randomBytes(4).toString("hex");
  const compiledFolder = path.join(distDir, originalFileName);

  // Ensure the compiled script's folder exists
  if (!fs.existsSync(compiledFolder)) {
    fs.mkdirSync(compiledFolder, { recursive: true });
  }

  // Define output file paths
  const outputFile = path.join(compiledFolder, `${originalFileName}-${randomString}.prod.js`);
  const licenseFile = path.join(compiledFolder, `${originalFileName}-${randomString}.prod.js.LICENSE.txt`)
  const sourceMapFile = `${outputFile}.map`;

  // Run Google Closure Compiler
  const closureCmd = `npx google-closure-compiler --js="${selectedFile}" --js_output_file="${outputFile}" --create_source_map "${sourceMapFile}"`;

  exec(closureCmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error during compilation: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ Compiler warnings/errors: ${stderr}`);
    }
    const dater = new Date().toISOString()
    // Watermark with extra ***
    const watermark = `/******************************************************************************************
     ____             ____   _____          _           
    |  _ \\           |___ \\ / ____|        | |          
    | |_) | ___ _ __   __) | |     ___   __| | ___ _ __ 
    |  _ < / _ \\ '_ \\ |__ <| |    / _ \\ / _\` |/ _ \\ '__|
    | |_) |  __/ | | |___) | |___| (_) | (_| |  __/ |   
    |____/ \\___|_| |_|____/ \\_____\\___/ \\__,_|\\___|_|   
    Copyright (C) ben3coder.dev - For LICENSE information see ${originalFileName}-${randomString}.prod.js.LICENSE.txt
    Compiled ${dater}
    Original File: ${originalFileName}.js
******************************************************************************************/\n`;

    const license = `/*
    Copyright (C) ben3coder.dev - This code may include proprietery software for license/payment verification
    After payment, please contact the owner to remove this licensing/payment software for clean code/software
    License ID: ${btoa(dater)}      
*/`

    // Prepend watermark to compiled file
    const compiledCode = fs.readFileSync(outputFile, "utf8");
    fs.writeFileSync(outputFile, watermark + compiledCode + `//# sourceMappingURL=${path.basename(sourceMapFile)}`);
    fs.writeFileSync(licenseFile, license);

    console.log(`✅ Compilation successful! Output: ${outputFile}`);
  });
}

main();
