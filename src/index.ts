import fs from "fs";
import path from "path";
import { getVideoDurationInSeconds } from "get-video-duration";
import moment from "moment";

const baseFolderName = "D:\\OneDrive\\courses\\JavaScript";

function walk(directory: string, mp4s: string[] = []) {
  console.log("SEARCHING FOR MP4...");

  const files = fs.readdirSync(directory);
  for (let filename of files) {
    const filepath = path.join(directory, filename);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, mp4s);
    } else if (path.extname(filename) === ".mp4") {
      mp4s.push(filepath);

      // durations[filepath.split("\\")[4]] = (durations[filepath.split("\\")[4]] || 0) + duration;
    }
  }

  return mp4s;
}

// console.log(walk(baseFolderName));

const main = async () => {
  const durations: any = {};
  for (const x of walk(baseFolderName)) {
    const duration = await getVideoDurationInSeconds(x);
    durations[x.split("\\")[4]] = (durations[x.split("\\")[4]] || 0) + duration;
  }
  for (const [key, val] of Object.entries(durations)) {
    durations[key] = moment()
      .startOf("day")
      .seconds(val as number)
      .format("H:mm:ss");
  }
  console.log(durations);
};
main();
