// creates an empty object and initializes any fields passed to the arg object
export function createRecipe(obj = {}) {
    return {
        name: "",
        grinder: "",
        grindSize: "",
        dose: "",
        brewer: "",
        waterAmt: "",
        waterTemp: "",
        celsius: false,
        details: "",
        ...obj
    }
}