const fs = require("fs");
const path = require("path");

const contains = (content, fragment) => {
    if (!content) {
        return false;
    }
    return content.indexOf(fragment) !== -1;
};

const resolveImport = (content, root) => {

    if (!contains(content, "gulpInclude")) {
        return content;
    }

    let imports;

    try {
        imports = Array.from(
            content.match(/gulpInclude\s*\(.*?\)/g))
            .map(line => {
                let filepath = path.join(root, line.replace(/'/g, "\"")
                    .match(/(?<=").*?(?=")/)[0]);

                return {
                    command: line,
                    filepath
                };
            });
    } catch (e) {
        imports = [];
    }

    imports.forEach(({ command, filepath }) => {

        if (!path.extname(filepath)) {
            filepath += ".js";
        }

        let c;

        try {
            c = fs.readFileSync(filepath, "utf-8").trim();
        } catch (e) {
            console.log(e);
            c = undefined;
        }

        c = resolveImport(c, path.dirname(filepath));


        content = content.replace(command, c);
    });

    return content;
};


const transform = (content, filepath) => {

    if (!contains(content, "gulpInclude")) {
        return content;
    }


    return resolveImport(content, path.dirname(filepath));



};

/*
const content = `

gulpInclude("./app");


a = 432;
`;

let a = transform(content, __dirname + "/f.js");

console.log(a);
*/

module.exports = transform;
