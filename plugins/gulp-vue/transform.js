
const transform = (vuetemplate) => {


    let template_start_ind = null;
    let template_end_ind = null;

    let script_start_ind = null;
    let script_end_ind = null;

    let lines = vuetemplate.split("\n");

    lines.forEach((line, i) => {
        if (line.trim().startsWith("<template")) {
            template_start_ind = i;
        }

        if (line.trim().endsWith("</template>")) {
            template_end_ind = i;
        }

        if (line.trim().startsWith("<script")) {
            script_start_ind = i;
        }

        if (line.trim().endsWith("</script>")) {
            script_end_ind = i;
        }
    });

    let template = lines.slice(template_start_ind, template_end_ind + 1).join("\n")
        .replace(/<template.*?>/, "")
        .replace("</template>", "").trim();

    let script_template = lines.slice(script_start_ind, script_end_ind + 1).join("\n")
        .replace(/<script.*?>/, "")
        .replace("</script>", "").trim();

    let script_module = script_template.match(/module.exports\s*=\s*\{/)[0];

    script_template = script_template
        .replace(script_module, script_module + "\n    template,");

    let result = `const template = \`${template}\`;\n\n\n` + script_template;

    return result;
};


module.exports = transform;