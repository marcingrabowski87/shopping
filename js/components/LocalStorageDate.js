class localStorageDate {
    createStorageObject(product) {
        localStorage.setItem("Element", JSON.stringify(product));
    }
    getStorageObject() {
        let dateStorage = (JSON.parse(localStorage.getItem("Element")));
        dateStorage = [...dateStorage];
        return dateStorage
    }
    localStorageElement() {
        const thislocalStorageDate = this;
        if (localStorage.getItem("Element") === null) {
            thislocalStorageDate.createStorageObject(thislocalStorageDate.addProduct);
        }
        else {
            const dateStorage = thislocalStorageDate.getStorageObject();
            const answearValue = dateStorage.indexOf(thislocalStorageDate.addProduct);
            if (answearValue === -1) {
                dateStorage.push(thislocalStorageDate.addProduct.toLowerCase());
                thislocalStorageDate.createStorageObject(dateStorage);
            }
        }
    }
    constructor(addProduct) {
        const thislocalStorageDate = this;
        thislocalStorageDate.addProduct = addProduct;
        thislocalStorageDate.localStorageElement();
    }
}
export default localStorageDate;