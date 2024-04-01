import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import db from '../firebase';
import { doc, updateDoc, deleteDoc, collection, getDocs, } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import List from './List';

const EditProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [updatedProduct, setUpdatedProduct] = useState({});
    const product = useSelector((state) => state.products.find((p) => p.id === id));

    useEffect(() => {
        if (product) {
            setUpdatedProduct(product);
        }
    }, [product]);

    const handleInput = (e) => {
        let { name, value } = e.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const updateProduct = async () => {
        const docRef = doc(db, 'products', id);
        await updateDoc(docRef, updatedProduct);
        dispatch({ type: 'UPDATE-Customer', payload: updatedProduct }); 
        dispatch({ type: 'UPDATE-Purchase', payload: updatedProduct }); 
        window.history.back(); // Go back to the previous page
    };

    const deleteProduct = async () => {
        const docRef = doc(db, 'products', id);
        await deleteDoc(docRef); // Remove only the product document
    
        // Fetch all purchases
        const purchasesQuerySnapshot = await getDocs(collection(db, 'purchases'));
        
        // Filter purchases by productID
        const relatedPurchases = purchasesQuerySnapshot.docs.filter(doc => {
            const productRef = doc.data().productID.path;
            const docRefPath = docRef.path;
            return productRef === docRefPath;; // Compare document reference path
        });
    
        // Delete each related purchase document individually
        const deletePromises = relatedPurchases.map(async (doc) => {
            await deleteDoc(doc.ref);
        });
        await Promise.all(deletePromises);
    
        // Dispatch actions to update Redux state
        dispatch({ type: 'Delete-Product', payload: updatedProduct }); 
        dispatch({ type: 'Delete-Purchase', payload: updatedProduct }); 
    }
    
    
    return (
        <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-8">
                <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="id" className="block font-semibold">ID:</label>
                        <input type="text" id="id" name="id" value={updatedProduct.id || ''} onChange={handleInput} className="block w-full border rounded-md py-2 px-4" />
                    </div>
                    <div>
                        <label htmlFor="name" className="block font-semibold">Product Name:</label>
                        <input type="text" id="name" name="name" value={updatedProduct.name || ''} onChange={handleInput} className="block w-full border rounded-md py-2 px-4" />
                    </div>
                    <div>
                        <label htmlFor="price" className="block font-semibold">Price:</label>
                        <input type="text" id="price" name="price" value={updatedProduct.price || ''} onChange={handleInput} className="block w-full border rounded-md py-2 px-4" />
                    </div>
                    <div>
                        <label htmlFor="quantity" className="block font-semibold">Quantity:</label>
                        <input type="number" id="quantity" name="quantity" value={updatedProduct.quantity || ''} onChange={handleInput} className="block w-full border rounded-md py-2 px-4" />
                    </div>
                    <button type="button" onClick={updateProduct} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Update
                    </button> 
                    <button type="button" onClick={deleteProduct} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Delete
                </button>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-lg px-8 py-6">
                <h2 className="text-2xl font-bold mb-4">Customers List</h2>
                <List elementId={id} showAddProducts= {false} showProducts={false} />

            </div>
        </div>
    );
};

export default EditProduct;
