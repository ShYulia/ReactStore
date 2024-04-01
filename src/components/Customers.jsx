import { useSelector } from 'react-redux';
import AddProduct from './AddProduct';
import List from './List'
import { Link } from 'react-router-dom';

const Customers = () => {
  const customers = useSelector((state) => state.customers );
  if (!customers || !customers.length) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Customers</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-grey-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap"> <Link to={`/editCustomer/${customer.id}`} className="text-lg font-semibold text-blue-600 hover:underline">
                {customer.lname} {customer.fname}
              </Link></td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <List showAddProducts= {false} elementId={customer.id} showProducts={true} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <AddProduct customerId={customer.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
