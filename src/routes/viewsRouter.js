import { Router } from 'express';
import { productDBManager } from '../dao/productDBManager.js';
import { cartDBManager } from '../dao/cartDBManager.js';
import { requireAdminLogin, requireLogin } from '../middleware/auth.js';



const router = Router();
const ProductService = new productDBManager();
const CartService = new cartDBManager(ProductService);


//VER QUE PODEMOS HACER DE INCIO
router.get('/',async(req,res)=>{
    res.send({message:'welcome'})
})
router.get('/api/sessions/login',async(req,res)=>{
    res.render('login')
})
router.get('/api/sessions/register',async(req,res)=>{
    res.render('register')
})
router.get('/api/sessions/logut',async(req,res)=>{
    res.render('home')
})

router.get('/privado',requireLogin,async(req,res)=>{
    res.status(200).json({payload:'Ruta requiere login'})
})
router.get('/superprivado',requireAdminLogin,async(req,res)=>{
    res.status(200).json({payload:'Ruta requiere Admin login'})
})

router.get('/products', async (req, res) => {
    const products = await ProductService.getAllProducts(req.query);

    res.render(
        'index',
        {
            title: 'Productos',
            style: 'index.css',
            products: JSON.parse(JSON.stringify(products.docs)),
            prevLink: {
                exist: products.prevLink ? true : false,
                link: products.prevLink
            },
            nextLink: {
                exist: products.nextLink ? true : false,
                link: products.nextLink
            }
        }
    )
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await ProductService.getAllProducts(req.query);
    res.render(
        'realTimeProducts',
        {
            title: 'Productos',
            style: 'index.css',
            products: JSON.parse(JSON.stringify(products.docs))
        }
    )
});

router.get('/cart/:cid', async (req, res) => {
    const response = await CartService.getProductsFromCartByID(req.params.cid);

    if (response.status === 'error') {
        return res.render(
            'notFound',
            {
                title: 'Not Found',
                style: 'index.css'
            }
        );
    }

    res.render(
        'cart',
        {
            title: 'Carrito',
            style: 'index.css',
            products: JSON.parse(JSON.stringify(response.products))
        }
    )
});


export default router;