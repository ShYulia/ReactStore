import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState } from 'react';
import db from '../firebase';
import { addDoc, collection, doc, updateDoc, getDoc} from 'firebase/firestore';

const AddProduct = ({customerId}) =>{
    const [showProducts, setShowProducts] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');
    const products = useSelector((state) => state.products);

    const addProducts = () => () => {
        setShowProducts(!showProducts);
    };
    
    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };
    
    const handleSave = async () => {
        if (!selectedProduct) {
            alert('Please select a product')
            console.error('Please select a product');
            return;
        }
    
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2,'0');
        const month = String(currentDate.getMonth() +1).padStart(2,'0');
        const year = currentDate.getFullYear();
        const today = `${day}/${month}/${year}`;
     
        try {
            const productReference = collection(db,`products`);
            const customerReference = collection(db,`customers`);
            await addDoc(collection(db,'purchases'), {
                date: today,
                productID: doc(productReference, selectedProduct),
                customerID: doc(customerReference, customerId)
            });
        const docRef = doc(db,'products',selectedProduct)
        const docSnap = await getDoc(docRef)
        console.log('addProduct ' )
         if (docSnap.exists() && docSnap.data().quantity > 0){
            const quantity = docSnap.data().quantity - 1 
            await updateDoc(docRef,{
                quantity:quantity
            })
            console.log('New purchase added');
            setShowProducts(!showProducts);
         } else alert('Error adding product')
       
           
        } catch (error) {
            console.error('Error adding purchase:', error);
        }
    };

    return(
        <div className="mt-4">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type='button'
                onClick={addProducts()}
            >
                Add Product
            </button>
            {showProducts && (
                <div className="mt-4">
                    <select
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        value={selectedProduct}
                        onChange={handleProductChange}
                    >
                        <option value=''>Select Product</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                    <button
                        className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddProduct;
