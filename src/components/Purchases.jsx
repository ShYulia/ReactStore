import { useSelector } from 'react-redux';
import { useState } from 'react';


const Purchases = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const purchases = useSelector((state) => state.purchases);
  const [showTable, setShowTable] = useState(false);
  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);
  
  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value);
  };

  const handleShowTable = () => {
    setShowTable(true);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <select
        className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-gray-500"
        value={selectedProduct}
        onChange={handleProductChange}
      >
        <option value=''>Select Product</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>{product.name}</option>
        ))}
      </select>
      
      <select
        className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-gray-500"
        value={selectedCustomer}
        onChange={handleCustomerChange}
      >
        <option value=''>Select Customer</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>{customer.lname} {customer.fname}</option>
        ))}
      </select>

      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" 
        onClick={handleShowTable}
      >
        Search
      </button>

      {showTable && (
        <div>
          <table className="w-full border-collapse border border-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-200 border border-gray-800">Customer Name</th>
                <th className="px-4 py-2 bg-gray-200 border border-gray-800">Product Name</th>
                <th className="px-4 py-2 bg-gray-200 border border-gray-800">Purchase Date</th>
              </tr>
            </thead>
            <tbody>
              {purchases
                .filter((purchase) => 
                  (selectedCustomer === '' || purchase.customer.id === selectedCustomer) && 
                  (selectedProduct === '' || purchase.product.id === selectedProduct)
                )
                .map((purchase) => (
                  <tr key={purchase.id}>
                    <td className="px-4 py-2 border border-gray-800">{purchase.customer.lname} {purchase.customer.fname}</td>
                    <td className="px-4 py-2 border border-gray-800">{purchase.product.name}</td>
                    <td className="px-4 py-2 border border-gray-800">{purchase.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Purchases;
