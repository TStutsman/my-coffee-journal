function snakeToCamel(str) {
    const output = [];
    for(let i = 0; i < str.length - 1; i++) {
        if(str[i] === '_'){
            output.push(str[i+1].toUpperCase());
            i++;
        } else {
            output.push(str[i]);
        }
    }
    output.push(str[str.length - 1]);
    return output.join("");
}

function formatObject(obj) {
    const output = {}
    for(const key in obj) {
        const newKey = snakeToCamel(key);
        const val = obj[key];
        if(val?.constructor === Object) {
            output[newKey] = formatObject(obj[key]);
            continue;
        }
        output[newKey] = obj[key]
    }
    return output;
}

export { snakeToCamel, formatObject };