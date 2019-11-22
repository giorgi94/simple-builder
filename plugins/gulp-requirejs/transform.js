
const contains = (content, fragment) => {
    return content.indexOf(fragment) !== -1;
};

const transform = (content) => {

    if (
        contains(content, "require") ||
        contains(content, "exports") ||
        contains(content, "module")) {
        return `define(function (require, exports, module){${content}});`;
    }

};


module.exports = transform;