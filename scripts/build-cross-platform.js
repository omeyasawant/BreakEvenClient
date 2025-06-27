const { execSync } = require("child_process");
const path = require("path");
const os = require("os");
const isWin = os.platform() === "win32";

const installerDir = path.join(__dirname, "..");


async function runBuild() {

    const platform = process.platform;
    console.log("🖥️ Detected platform:", platform);

    let forgeCmd = "npx electron-forge make";

    if (platform === "win32") {
        forgeCmd += " --platform win32";
    } else if (platform === "darwin") {
        forgeCmd += " --platform darwin";
    } else if (platform === "linux") {
        forgeCmd += " --platform linux";
    }

    console.log("🚀 Running:", forgeCmd);
    try {
      execSync(forgeCmd, {
        cwd: installerDir,
        stdio: "inherit",
        shell: true,
      });
    } catch (err) {
      console.error("❌ electron-forge make failed:", err.message);
      process.exit(1);
    }



}

runBuild().catch(err => {
    console.error("❌ Build failed:", err.message);
    process.exit(1);
});
