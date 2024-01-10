const fs = require("fs");
const specMarkdown = require("spec-md");
const html = specMarkdown.html("./spec/Fusion.md");
fs.writeFile("./SPECIFICATION.html", html, () => {});
