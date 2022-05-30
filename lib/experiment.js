import fs from "fs";
import path from "path";
import matter from "gray-matter";

const experimentPath = path.join(process.cwd(), "experiment");

export default function AllData() {
  const fileList = fs.readdirSync(experimentPath);
  const allData = fileList?.map((file, index) => {
    const fileName = file.replace(/\.md$/, "");
    const filePath = path.join(experimentPath, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data = matter(fileContent);
    return {
      fileName,
      ...data.data,
    };
  });
  return allData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
