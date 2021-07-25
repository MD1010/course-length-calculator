import fs from "fs";
import path from "path";
import { getVideoDurationInSeconds } from "get-video-duration";
import moment from "moment";

const baseFolderName = "D:\\OneDrive\\courses\\System Design";

function walk(directory: string, mp4s: string[] = []) {
  const files = fs.readdirSync(directory);
  for (let filename of files) {
    const filepath = path.join(directory, filename);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, mp4s);
    } else if (path.extname(filename) === ".mp4") {
      mp4s.push(filepath);
    }
  }

  return mp4s;
}

// console.log(walk(baseFolderName));

const main = async () => {
  const durations: any = {};
  console.log("SEARCHING FOR MP4...");

  for (const x of walk(baseFolderName)) {
    const duration = await getVideoDurationInSeconds(x);
    durations[x.split("\\")[4]] = (durations[x.split("\\")[4]] || 0) + duration;
  }
  for (const [key, val] of Object.entries(durations)) {
    const seconds = val as number;
    const formatted =
      Math.floor(moment.duration(seconds, "seconds").asHours()) +
      ":" +
      moment.duration(seconds, "seconds").minutes() +
      ":" +
      moment.duration(seconds, "seconds").seconds();
    durations[key] = formatted;
  }
  console.log(durations);
};
main();
