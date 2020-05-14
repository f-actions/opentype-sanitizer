const core = require("@actions/core");
const exec = require("@actions/exec");
const glob = require("@actions/glob");

async function run() {
  const buildPath = core.getInput("path");
  const updatePip = core.getInput("update-pip");
  const otsVersion = core.getInput("version");

  try {
    // update pip
    if (updatePip === "true") {
      console.log("[*] Updating pip package...");
      await exec.exec("python -m pip install --upgrade pip");
    }

    // install opentype-sanitizer
    if (otsVersion === "latest") {
      await exec.exec("python -m pip install --upgrade opentype-sanitizer");
    } else {
      await exec.exec(
        `python -m pip install --upgrade opentype-sanitizer==${otsVersion}`
      );
    }

    // run opentype-sanitizer on font artifacts
    const globber = await glob.create(`${buildPath}`);
    console.log("");
    for await (const file of globber.globGenerator()) {
      console.log("");
      console.log(`[opentype-sanitizer] Checking ${file}...`);
      await exec.exec(
        `python -c 'import ots,sys;sys.exit(ots.sanitize("${file}").returncode)'`
      );
    }
  } catch (error) {
    core.setFailed(
      `ERROR: Action failed during execution with error: ${error.message}`
    );
  }
}

run();
