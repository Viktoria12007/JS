"use strict";

let totalAmountBasket = 120000;
let amountGoods = ['Смартфон', 'Холодильник', 'Телевизор', 'Стиральная машина', 'Посудомоечная машина', 'Пылесос', 'Фен', 'Утюг', 'Кофемашина', 'Блендер'];

function amountBasketAfterAllDiscount(totalAmountBasket, amountGoods, promoCode = null) {
    
    if (promoCode === 'ДАРИМЗОО' && totalAmountBasket >= 300) {
        totalAmountBasket -= 300;
    }
    if (promoCode === 'ДАРИМЗОО' && totalAmountBasket < 300) {
        totalAmountBasket = 0;
    }
    if (amountGoods.length >= 10) {
       let discount5 = totalAmountBasket/100 * 5;
       totalAmountBasket -= discount5;
    }
    if (totalAmountBasket > 50000) {
        let extraAmountBasket = totalAmountBasket - 50000;
        let discount20 = extraAmountBasket/100 * 20;
        totalAmountBasket -= discount20;
    }
    if (promoCode === 'СКИДКА15' && totalAmountBasket >= 20000) {
       let discount15 = totalAmountBasket/100 * 15;
       totalAmountBasket -= discount15;
    }
    return totalAmountBasket;
}

console.log(amountBasketAfterAllDiscount(totalAmountBasket, amountGoods, 'СКИДКА15'));

export default function amountBasketAfterAllDiscount() {
    
}






