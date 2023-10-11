
import{printCart,printProducts,printTotals,} from'./ui.js';

export function handels () {
    // const btn = document.querySelector('.header__btn');
    // const list = document.querySelector('.header__list');
    const cart= document.querySelector('.cart__btn');
    const modal = document.querySelector('.cart__modal');

    // btn.addEventListener('click', function(){
    //     list.classList.toggle('active');
    // });
    // list.addEventListener('click', function(){
    //     list.classList.remove('active');
    // });

    cart.addEventListener('click', function(){
        modal.classList.toggle('active');
    });
    modal.addEventListener('click', (event)=>{
        if(event.target.classList.contains('close')){
            modal.classList.toggle('active');
        }
    });
}

export function handelCart(db){
    const cart = document.querySelector('.cart__products');
    const modal = document.querySelector('.cart__modal');
    const viewAlert=document.querySelector('.view__alert'); 
    cart.addEventListener('click',(event)=>{
        if(event.target.classList.contains('less')){
            const id = +event.target.closest('.cart__product').id;
            if(db.cart[id].amount ==1){
                let html=`<div class="view__alert__card">
                        <img src="./src/img/logo_nombre.png" alt="">
                        <p>No se puede comprar menos</p>
                        <ul class="view__alert__li">
                            <li class="cancel" >Aceptar</li>
                        </ul>
                    </div>`;
                viewAlert.innerHTML=html;
                viewAlert.classList.toggle('active');
                return 
            }
            db.cart[id].amount--;
            
        }
        if(event.target.classList.contains('plus')){
            const id = +event.target.closest('.cart__product').id;
            if(db.cart[id].amount==db.cart[id].quantity){
                let html=`<div class="view__alert__card">
                        <img src="./src/img/logo_nombre.png" alt="">
                        <p>No hay mas en bodega</p>
                        <ul class="view__alert__li">
                            <li class="cancel" >Aceptar</li>
                        </ul>
                    </div>`;
                viewAlert.innerHTML=html;
                viewAlert.classList.toggle('active');
                return
            }
            db.cart[id].amount++;
        }
        if(event.target.classList.contains('trash')){
            const id = +event.target.closest('.cart__product').id;
            let html=`<div class="view__alert__card borrar" id="${id}">
                    <img src="./src/img/logo_nombre.png" alt="">
                    <p>seguro que quieres borrar el producto?</p>
                    <ul class="view__alert__li">
                        <li class="continue" >Continuar</li>
                        <li class="cancel" >Cancelar</li>
                    </ul>
                </div>`;
            viewAlert.innerHTML=html;
            viewAlert.classList.toggle('active');
        }
        localStorage.setItem('cart',JSON.stringify(db.cart))
        printCart(db.cart);
        printTotals(db);
    })
    
}

export function handelTotals(db){
    const btnBuy = document.querySelector('.btn__buy');
    const viewAlert=document.querySelector('.view__alert') 
    btnBuy.addEventListener('click',()=>{
        if(!Object.values(db.cart).length){
            let html=`<div class="view__alert__card">
                    <img src="./src/img/logo_nombre.png" alt="">
                    <p>No hay productos para comprar</p>
                    <ul class="view__alert__li">
                        <li class="cancel" >Continuar</li>
                    </ul>
                </div>`;
            viewAlert.innerHTML=html;
            viewAlert.classList.toggle('active');
            return
        }
        let html=`<div class="view__alert__card comprar">
                    <img src="./src/img/logo_nombre.png" alt="">
                    <p>seguro que quieres comprar?</p>
                    <ul class="view__alert__li">
                        <li class="continue" >Continuar</li>
                        <li class="cancel" >Cancelar</li>
                    </ul>
                </div>`;
        viewAlert.innerHTML=html;
        viewAlert.classList.toggle('active');
    })
}

export function showDetails(products){
    const readBtn = document.querySelector('.products');
    const showModal = document.querySelector('.view__modal');
    const closeModal = document.querySelector('.close__modal');
    const contentModal = document.querySelector('.content__modal')
    readBtn.addEventListener('click',(event)=>{
        document.body.style.overflowY='hidden';
        const id = +event.target.closest('.product').id
        const article = products.find(element=>element.id===id)
        const{category, description, image, name,price}=article;
        const filterP = products.filter(element=>element.category===`${category}`);
        let htmlp = '';
        const idI=id;
        for (const item of filterP) {
            const {name,id,image,price,quantity } = item;
            if(id!=idI){
                htmlp += `
                    <div id="${idI}" class="related__product">
                        <figure class="related__product__img if${quantity}" >
                            <img src="${image}" alt="image product related">
                        </figure>
                            <p class="related__product__description">
                                <span></span> ${name}<br>

                            </p>
                            <div class="related__product__price">
                                <span></span> $${price}.00<br>
                            </div>
                    </div>
                `;
            }
        }
        let html = `
            <div class="modal__product" id="${id}">
                <figure class="modal__product__img">
                    <img src="${image}" alt="image product">
                </figure>
                <div class="modal__product__short">
                    <h2>${name}</h2>
                    <h2>$${price}.00</h2>
                    <p>${category}s oficiales de Academlo</p>
                    <fieldset class="modal__product__color">
                        <legend>Colores</legend>
                        <!-- TIPO RADIO  -->
                        <input type="img" class="color__op1" style="background: url(${image})no-repeat; background-size: contain;" id="yes" readonly>
                        <input type="img" class="color__op2" style="background: url(${image})no-repeat; background-size: contain;" id="yes" readonly>
                    </fieldset>
                    <div class="modal__product__btn">
                        <button class="btn__add">Añadir al carrito</button>
                    </div>
                    <h2> Productos relacionados</h2>
                </div>
                <div class="modal__related">
                    ${htmlp}
                </div>
            </div>
            
            `;
        contentModal.innerHTML=html;
        
        showModal.classList.add('active');
    })
    closeModal.addEventListener('click',()=>{
        showModal.classList.remove('active')
        document.body.style.overflowY='auto';
    })
}