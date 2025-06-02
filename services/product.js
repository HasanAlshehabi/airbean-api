import Product from '../models/product.js';

export async function isProductinDatabase(product) {
    try {
        const productExists = await Product.exists({ product : product});
        if(productExists) return true;
        else throw new Error('Product does not exists');
    } catch(error) {
        console.log(error.message);
        return false;
    }
}