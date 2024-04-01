import Navbar from "./components/Navbar"
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { collection, onSnapshot,getDoc } from 'firebase/firestore';
import db from './firebase';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      const fetchProducts = async () => {
          const productsQuery = collection(db, 'products');
          const unsubscribe = onSnapshot(productsQuery, (snapshot) => {
              const products = snapshot.docs.map((doc) => ({
                  id: doc.id,
                  status: 'UNCHANGED',
                  ...doc.data(),
              }));
              dispatch({ type: 'LOAD-products', payload: products });
          });

          
          return unsubscribe;
      };
  
      const fetchCustomers = async () => {
          const customersQuery = collection(db, 'customers');
          const unsubscribe = onSnapshot(customersQuery, (snapshot) => {
              const customers = snapshot.docs.map((doc) => ({
                  id: doc.id,
                  status: 'UNCHANGED',
                  ...doc.data(),
              }));
              dispatch({ type: 'LOAD-customers', payload: customers });
          });

      
          return unsubscribe;
      };
  
      const fetchPurchases = async () => {
          const purchasesQuery = collection(db, 'purchases');
          const unsubscribe = onSnapshot(purchasesQuery, async (snapshot) => {
            const purchases = await Promise.all(snapshot.docs.map(async (doc) => { 
              const custReference = doc.data().customerID;
              const prodReference = doc.data().productID;
              try {
                  const custReferencedDocSnapshot = await getDoc(custReference); 
                  const custReferencedDocData = custReferencedDocSnapshot.data();
                  const prodReferencedDocSnapshot = await getDoc(prodReference); 
                  const prodReferencedDocData = prodReferencedDocSnapshot.data();

                  const custId = custReferencedDocSnapshot.id;
                  const prodId = prodReferencedDocSnapshot.id;
                  return {
                      id: doc.id,
                      date: doc.data().date,
                      customer: { ...custReferencedDocData, id: custId },
                      product: { ...prodReferencedDocData, id: prodId }
                  };
              } catch (error) {
                  console.error('ERROR RETRIEVING REFERENCED DATA', error);
                  return null;
              }
          }));
          dispatch({ type: 'LOAD-purchases', payload: purchases.filter(Boolean) });
          });

          
          return unsubscribe;
      };
  
      fetchProducts();
      fetchCustomers();
      fetchPurchases();
    
  }, [dispatch]);

  return( 
    <div className="min-h-screen bg-gray-100">
  <Navbar />
 
</div>)
}
export default App;
