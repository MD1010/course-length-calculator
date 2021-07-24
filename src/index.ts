import fs from "fs";
import path from "path";

const baseFolderName = "D:\\OneDrive\\courses\\Micro Services";

const getFolderInfo = async (dir: string) => {
  // const foldersInside = await fs.promises.readdir(path);
  const isDirectory = await (await fs.promises.stat(dir)).isDirectory();
  if (!isDirectory) {
    return console.log(dir);
  } else {
    const directoryContent = await fs.promises.readdir(dir);
    for (const folder of directoryContent) {
      const innerDirectoryPath = path.join(dir, folder);
      getFolderInfo(innerDirectoryPath);
    }
  }

  // for (const folder of foldersInside) {
  //   console.log("folder", folder);

  //   // const stat = await fs.promises.lstat(folder);
  //   // console.log("stat", stat);

  //   // if(stat.isDirectory()){
  //   //   console.log("inside directory " + stat.)
  //   // }
  // }
};
getFolderInfo(baseFolderName);
