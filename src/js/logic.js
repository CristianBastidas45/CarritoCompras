
import{printCart,printProducts,printTotals,} from'./ui.js';

export async function getApi(){
    const URL = 'https://ecommercebackend.fundamentos-29.repl.co/'
    try {
        const data = await fetch(URL);
        const res=await data.json();
        localStorage.setItem('products',JSON.stringify(res));
        return res;
    } catch (error) {
        console.log(error);
    }
}
export async function database(){
    const db ={
        products: JSON.parse(localStorage.getItem('products')) || await getApi(),
        cart: JSON.parse(localStorage.getItem('cart'))|| {},
    }
    return db;
}
export function addToCart(db){
    const add = document.querySelector('.content__modal');
    const viewAlert=document.querySelector('.view__alert');
    add.addEventListener('click',(event)=>{
        if(event.target.classList.contains('btn__add')){
            const id = +event.target.closest('.modal__product').id
            const article = db.products.find(element => element.id==id)
            if(article.quantity===0){
                return alert('Producto agotado')
            }
            if(article.id in db.cart){
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
                db.cart[article.id].amount++;
            }else{
                article.amount = 1;
                db.cart[article.id] = article;
            }
            localStorage.setItem('cart',JSON.stringify(db.cart))
            printCart(db.cart);
            printTotals(db)
        }   
    })
}
export function filterProducts(products){
    const list = document.querySelector('.header__list');
    const h2 =document.querySelector('.header__list h2');
    list.addEventListener('change',()=>{
        if(list[0].value==='products'){
            h2.innerHTML='Todos nuestros productos'
            printProducts(products); 
        }else if(list[0].value==='shirt'){
            const shirt = products.filter(element=>element.category==='shirt');
            h2.innerHTML='Nuestras camisas'
            printProducts(shirt); 
        }else if(list[0].value==='hoddie'){
            const hoddies = products.filter(element=>element.category==='hoddie');
            h2.innerHTML='Nuestros Hoddies'
            printProducts(hoddies); 
        }else if(list[0].value==='sweater'){
            const sweaters = products.filter(element=>element.category==='sweater');
            h2.innerHTML='Nuestros Sweaters'
            printProducts(sweaters); 
        }
    })
}
export function alertMsg(db){
    const viewAlert =document.querySelector('.view__alert');
    viewAlert.addEventListener('click',(event)=>{
        const cardId = document.querySelector('.view__alert__card');
        if(event.target.classList.contains('continue')){
            //comprar
            console.log(cardId.classList.contains('borrar'));
            if(cardId.classList.contains('comprar')){
                for (const key in db.cart) {
                    if(db.cart[key].id===db.products[key-1].id){
                        db.products[key-1].quantity -= db.cart[key].amount;
                    }
                    db.products[key-1].id
                }
                db.cart = {};
                localStorage.setItem('products',JSON.stringify(db.products));
                localStorage.setItem('cart',JSON.stringify(db.cart))
                printProducts(db.products);
                printCart(db.cart);
                printTotals(db);
                // alert('Gracias por su compra')
                viewAlert.classList.remove('active')
            }
            //borrar
            if(cardId.classList.contains('borrar')){
                delete db.cart[cardId.id]
                viewAlert.classList.remove('active')
                localStorage.setItem('cart',JSON.stringify(db.cart))
                printCart(db.cart);
                printTotals(db);
            }

        }
        if(event.target.classList.contains('cancel')){
            viewAlert.classList.remove('active')
        }
    })
}