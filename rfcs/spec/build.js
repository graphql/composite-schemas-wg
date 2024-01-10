const fs = require("fs");
const specMarkdown = require("spec-md");
const html = specMarkdown.html("./spec/Spec.md");
fs.writeFile("./SPECIFICATION.html", html, () => {});
