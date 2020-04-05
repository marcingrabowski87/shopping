import ValidationInput from './ValidationInput.js';
import localStorageDate from './LocalStorageDate.js';
import SearchProduct from './SearchProduct.js';
let fillArrow = [];
class Product {
    getElements() {
        const thisaddProduct = this;
        thisaddProduct.form = document.querySelector('.form');
        thisaddProduct.writeProduct = thisaddProduct.form.querySelector('.form__input');
        thisaddProduct.btnAdd = thisaddProduct.form.querySelector('.form__btn-add');
        thisaddProduct.btnQuantity = thisaddProduct.form.querySelector('.form__box__quantity');
        thisaddProduct.allList = thisaddProduct.form.querySelector('.form__list');
        thisaddProduct.error = thisaddProduct.form.querySelector('.form__error-product');
        thisaddProduct.errorQuantity = thisaddProduct.form.querySelector('.form__error-quantity');
        thisaddProduct.addQuantity = thisaddProduct.form.querySelector('.form__box__add');
        thisaddProduct.minusQuantity = thisaddProduct.form.querySelector('.form__box__minus');
        thisaddProduct.selectedUnit = thisaddProduct.form.querySelector('.form__selected-unit');
    }
    makeActiveBtn(btn) {
        btn.disabled = false;
    }
    makeUnActiveBtn(btn) {
        btn.disabled = true;
    }
    addToArray() {
        const thisaddProduct = this;
        fillArrow.push({ id: [thisaddProduct.writeProduct.value], name: thisaddProduct.writeProduct.value, quantity: thisaddProduct.btnQuantity.value, unit: thisaddProduct.selectedUnit.value });
        new localStorageDate(thisaddProduct.writeProduct.value);
    }
    isProductRepeat() {
        const thisaddProduct = this;
        for (let i = 0; i < fillArrow.length; i++) {
            if (!fillArrow[i].id[0].indexOf(thisaddProduct.writeProduct.value)) {
                return false
            }
        }
        return true
    }
    fillInput() {
        const thisaddProduct = this;
        thisaddProduct.writeProduct.addEventListener('input', function (e) {
            new SearchProduct(thisaddProduct.form, e);
        });
        thisaddProduct.btnAdd.addEventListener('click', function (e) {
            e.preventDefault();
            const validation = new ValidationInput(thisaddProduct);
            if (validation.StartValidation() && thisaddProduct.isProductRepeat()) {
                thisaddProduct.addToArray();
                thisaddProduct.showProducts();
                thisaddProduct.writeProduct.value = '';
                thisaddProduct.btnQuantity.value = 1;
                thisaddProduct.makeUnActiveBtn(thisaddProduct.minusQuantity);
            }
        })
    }
    quantity() {
        const thisaddProduct = this;
        thisaddProduct.addQuantity.addEventListener('click', function (e) {
            e.preventDefault();
            thisaddProduct.btnQuantity.value++;
            if (thisaddProduct.btnQuantity.value > 1) {
                thisaddProduct.makeActiveBtn(thisaddProduct.minusQuantity)
            }
        });
        thisaddProduct.minusQuantity.addEventListener('click', function (e) {
            e.preventDefault();
            thisaddProduct.btnQuantity.value--;
            if (thisaddProduct.btnQuantity.value < 2) {
                thisaddProduct.makeUnActiveBtn(thisaddProduct.minusQuantity);
            }
        });
    }
    removeProductForArrow(nameProduct) {
        for (let i = 0; i < fillArrow.length; i++) {
            if (!fillArrow[i].id[0].indexOf(nameProduct.textContent)) {
                fillArrow.splice(i, 1);
                break;
            }
        }
    }
    removeProduct() {
        const thisaddProduct = this;
        thisaddProduct.close = thisaddProduct.allList.querySelectorAll('.form__list__item__close');
        for (let item of thisaddProduct.close) {
            item.addEventListener('click', function (e) {
                thisaddProduct.removeProductForArrow(this.parentElement.querySelector('.form__list__item__field'));
                this.parentElement.remove();
            });
        }
    }
    showProducts() {
        const thisaddProduct = this;
        thisaddProduct.allList.innerHTML = '';
        for (let i = 0; i < fillArrow.length; i++) {
            let li = document.createElement('li');
            li.className = ("form__list__item")
            li.innerHTML = `<span>&#10003;</span><span class="form__list__item__field">${fillArrow[i].name}</span> <span class="form__list__item__field">${fillArrow[i].quantity}</span><span class="form__list__item__field">${fillArrow[i].unit}</span><span class="form__list__item__close"><i class="fa fa-times-circle"></i></span>`;
            thisaddProduct.allList.appendChild(li);
        }
        thisaddProduct.removeProduct();
    }
    constructor() {
        const thisaddProduct = this;
        thisaddProduct.getElements();
        thisaddProduct.fillInput();
        thisaddProduct.btnQuantity.value = 1;
        thisaddProduct.quantity();
    }
}
export default Product;