
export function printProducts(products){
    const print = document.querySelector('.products');
    let html = '';
    for (const item of products) {
        const {name,id,image,price,quantity } = item;
        html += `
        <div id="${id}" class="product">
            <figure class="product__img if${quantity}" >
                <img src="${image}" alt="image product">
            </figure>
                <p class="product__description">
                    <span></span> ${name}<br>

                </p>
                <div class="product__price">
                    <span></span> $${price}.00<br>
                </div>
        </div>
        `;
    }
    print.innerHTML=html;
}

export function printCart(products){
    const print = document.querySelector('.cart__products');
    let html='';
    for (const key in products) {
        const {amount,category,id,image,price,quantity}= products[key]
        html += `
        <div id="${id}" class="cart__product">
            <figure class="cart__product__img">
                <img src="${image}" alt="image product">
            </figure>
            <div class="cart__product__container">
                <p class="cart__product__description">
                    <span>Categoria:</span> ${category}<br>
                    <span>precio:</span> $${price} USD<br>
                    <span>Cantidad:</span> ${quantity} Units<br>
                </p>
                <div class="cart__product__buttons">
                    <ion-icon class="less" name="remove-circle-outline"></ion-icon>
                    <span>${amount}</span>
                    <ion-icon class="plus" name="add-circle-outline"></ion-icon>
                    <ion-icon class="trash" name="trash-outline"></ion-icon>
                </div>
            </div>
        </div>
        `;
    }
    print.innerHTML=html;
}

export function printTotals(db){
    const cardTotal = document.querySelector('.cart__totals div');
    const cardIcon = document.querySelector('.cart__btn span');
    let cantidad =0;
    let totales=0;
    for (const key in db.cart) {
        const {amount, price}=db.cart[key];
        cantidad += amount;
        totales += amount * price;
    }
    let html = `
        <p><span>Cantidad:</span> ${cantidad}</p>
        <p><span>Total:</span> $${totales} USD</p>
    `;
    cardTotal.innerHTML=html;
    cardIcon.innerHTML=cantidad;
}