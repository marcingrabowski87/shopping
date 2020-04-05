class ValidationInput {
    isEmptyInput(value) {
        const thisValidationInput = this;
        if (value === '') return true
        return false
    }
    ShowErrorEmptyField() {
        const thisValidationInput = this;
        thisValidationInput.product.error.textContent = "Field should be not";
    }
    RemoveErrorMesage() {
        const thisValidationInput = this;
        thisValidationInput.product.error.textContent = "";
    }
    isWriteNumber(value) {
        const validText = /[0-9]/;
        return validText.test(value)
    }
    ShowErrorNumber() {
        const thisValidationInput = this;
        thisValidationInput.product.error.textContent = "Should be only letters";
    }
    ShowErrorLetter() {
        const thisValidationInput = this;
        thisValidationInput.product.errorQuantity.textContent = "Should be only Numbers";
    }
    StartValidation() {
        const thisValidationInput = this;
        if (thisValidationInput.isEmptyInput(thisValidationInput.product.writeProduct.value)) {
            thisValidationInput.ShowErrorEmptyField();
            return false
        }
        else if (thisValidationInput.isWriteNumber(thisValidationInput.product.writeProduct.value)) {
            thisValidationInput.ShowErrorNumber();
            return false
        }
        else if (!thisValidationInput.isWriteNumber(thisValidationInput.product.btnQuantity.value)) {
            thisValidationInput.ShowErrorLetter();
            thisValidationInput.RemoveErrorMesage()
        }
        else {
            thisValidationInput.RemoveErrorMesage();
            return true
        }
    }
    constructor(product) {
        const thisValidationInput = this;
        thisValidationInput.product = product;
        thisValidationInput.StartValidation();
    }
}
export default ValidationInput;