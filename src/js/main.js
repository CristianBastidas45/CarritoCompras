//Shopipng car projects

import{handelCart,handelTotals,handels,showDetails} from'./handles.js';
import{addToCart,database,filterProducts,getApi,alertMsg} from'./logic.js';
import{printCart,printProducts,printTotals,} from'./ui.js';

async function main(){
    const db = await database()
    handels();
    printProducts(db.products);
    addToCart(db);
    printCart(db.cart);
    handelCart(db);
    printTotals(db);
    handelTotals(db);
    filterProducts(db.products);
    showDetails(db.products);
    alertMsg(db);
}

main();