import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import db from '../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import List from './List';


const EditCustomer = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [updatedCustomer, setUpdatedCustomer] = useState({});
    const customer = useSelector((state) => state.customers.find((p) => p.id === id));

    useEffect(() => {
        if (customer) {
            setUpdatedCustomer(customer);
        }
    }, [customer]);

    const handleInput = (e) => {
        let { name, value } = e.target;
        setUpdatedCustomer({ ...updatedCustomer, [name]: value });
    };

    const updateCustomer = async () => {
        const docRef = doc(db, 'customers', id);
        await updateDoc(docRef, updatedCustomer);
      dispatch({ type: 'UPDATE-Customer', payload: updatedCustomer }); 
      dispatch({ type: 'UPDATE-Purchase', payload: updatedCustomer }); 
      window.history.back();
        
    };
    const deleteCustomer = async () =>{}

    return (
        <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-8">
            <h1 className="text-2xl font-bold mb-4">Edit Customer</h1>
            <div className="space-y-4">
                <div>
                    <label htmlFor="id" className="block font-semibold">ID:</label>
                    <input type='text' id="id" name='id' value={updatedCustomer.id || ''} onChange={handleInput} className="block w-full border rounded-md py-2 px-4" />
                </div>
                <div>
                    <label htmlFor="lname" className="block font-semibold">Last Name:</label>
                    <input type='text' id="lname" name='lname' value={updatedCustomer.lname || ''} onChange={handleInput} className="block w-full border rounded-md py-2 px-4" />
                </div>
                <div>
                    <label htmlFor="fname" className="block font-semibold">First Name:</label>
                    <input type='text' id="fname" name='fname' value={updatedCustomer.fname || ''} onChange={handleInput} className="block w-full border rounded-md py-2 px-4" />
                </div>
                <button type='button' onClick={updateCustomer} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</button>
            
            <button type="button" onClick={deleteCustomer} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Delete
        </button>
        </div>
        </div>
        <div className='bg-white shadow-md rounded-lg px-8 py-6'>
        <h2 className='text-2xl font-bold mb-4'>Products List</h2>
        <List elementId={id} showProducts={true} showAddProducts={false}/>
        </div>
        </div>
    );
};

export default EditCustomer;
