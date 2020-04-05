class SearchProduct {
    searchProduct() {
        const thisSearchProduct = this;
        let date;
        const seartchList = thisSearchProduct.product.querySelector('.form__write-product');
        if (localStorage.getItem("Element") === null) return
        date = (JSON.parse(localStorage.getItem("Element")));
        date = [...date];

        date = date.filter(item => {
            if (item.length > 1)
                return item
        });
        seartchList.textContent = '';
        if (thisSearchProduct.target.value === '') return
        date = date.filter(item => item.includes(thisSearchProduct.target.value.toLowerCase()));
        date.forEach(item => {
            let li = document.createElement('li');
            li.innerHTML = `<span class="pl-2 pt-3">&#10003;</span>${item}`;
            seartchList.appendChild(li);
        });
        const listLi = seartchList.querySelectorAll('li');
        for (let item of listLi) {
            item.addEventListener('click', function () {
                thisSearchProduct.target.value = item.textContent.slice(1);
            });
        }
    }
    constructor(product, e) {
        const thisSearchProduct = this;
        thisSearchProduct.product = product;
        thisSearchProduct.target = e.target;
        thisSearchProduct.searchProduct();
    }
}
export default SearchProduct;


