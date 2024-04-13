class dataValidator {
    constructor(object, reqBody) {
        this.object = object;
        this.reqBody = reqBody;
    }
    validate() {
        const errors = {};
        for (const key in this.object) {
            const rules = this.object[key];
            let value = this.reqBody[key];
            this.checkValidation(key, value, rules, errors);
        }
        if (Object.entries(errors).length)
            return errors;
        return null;
    }
    checkValidation(key, value, rules, errors) {
        if (rules.required && value === undefined) {
            errors[key] = key + " is required";
            return;
        }
        let originalValue = undefined;
        if (rules.type === "number" && isNaN(parseInt(value))) {
            errors[key] = key + " should be  number";
            return;
        }
        else if (rules.type === "number") {
            originalValue = parseInt(value.trim());
        }
        if (value&& originalValue === undefined)
            originalValue = value.trim();
        if (rules.customValidation) {
            let customCheck = rules.customValidation(originalValue);
            if (customCheck) {
                errors[key] = customCheck;
                return;
            }
        }
        if (rules.min) {
            let len = typeof originalValue === "string" ? originalValue.length : originalValue;
            if (rules.min && len < rules.min) {
                errors[key] = key + " should be greater than " + rules.min;
                return;
            }
        }
        if (rules.max) {
            let len = typeof originalValue === "string" ? originalValue.length : originalValue;
            if (rules.max && len > rules.max) {
                errors[key] = key + " should not be greater than " + rules.max;
                return;
            }
        }
        //checked email
        if (rules.isEmail && typeof originalValue === "string") {
            if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(originalValue)) {
                errors[key] = originalValue + " is not a valid email";
                return;
            }
        }
        //check password
        if (rules.hasLowerCharacter && typeof originalValue === "string") {
            if (!/[a-z]/.test(originalValue)) {
                errors[key] = key + " should have a lower character";
                return;
            }
        }
        if (rules.hasUpperCharacter && typeof originalValue === "string") {
            if (!/[A-Z]/.test(originalValue)) {
                errors[key] = key + " should have a upper character";
                return;
            }
        }
        if (rules.hasNumber && typeof originalValue === "string") {
            if (!/[0-9]/.test(originalValue)) {
                errors[key] = key + " should have a number";
                return;
            }
        }
        if (rules.hasSpecialCharacter && typeof originalValue === "string") {
            if (!/[!@#$%^&*]/.test(originalValue)) {
                errors[key] = key + " should have a special character";
                return;
            }
        }
    }
}
export default dataValidator;
