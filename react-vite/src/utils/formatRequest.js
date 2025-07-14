function camelToSnake(str) {
    const output = [];
    const [A, Z] = [65, 90];
    for(let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        if(code >= A && code <= Z){
            output.push('_');
            output.push(str[i].toLowerCase());
            continue;
        }
        output.push(str[i]);
    }

    return output.join("");
}

function formatRequest(obj) {
    const output = {}
    for(const key in obj) {
        const newKey = camelToSnake(key);
        const val = obj[key];
        if(val?.constructor === Object) {
            output[newKey] = formatRequest(obj[key]);
            continue;
        }
        output[newKey] = obj[key]
    }
    return output;
}

export { camelToSnake, formatRequest }