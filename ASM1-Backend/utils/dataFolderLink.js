const fs = require("fs");
const path = require("path");

// đọc file json thành danh sách object
module.exports = getDataFromFile = (callback, fileName) => {
  const folderLink = path.join(
    path.dirname(require.main.filename),
    "data",
    fileName + ".json"
  );
  fs.readFile(folderLink, (err, fileContent) => {
    if (!err) {
      callback(JSON.parse(fileContent));
    } else {
      callback([]);
      console.log("err:", err);
    }
  });
};
