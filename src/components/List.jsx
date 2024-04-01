import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddProduct from './AddProduct';

const List = ({ elementId, showAddProducts, showProducts }) => {
  const purchases = useSelector((state) => state.purchases);
  if (!purchases || !purchases.length) {
    return <div>Loading...</div>;
  }
  return (
    <ul className="divide-y divide-gray-200">
      {purchases.length !== 0 &&
        purchases
          .filter((p) => p.product && p.product.id === elementId || p.customer && p.customer.id === elementId)
          .map((p) => {
            const fullName = `${p.customer.lname} ${p.customer.fname}`;
            return (
              <li key={p.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    {!showProducts && (
                      <Link to={`/editCustomer/${p.customer.id}`} className="text-lg font-semibold text-blue-600 hover:underline">
                        {fullName}
                      </Link>)}
                    {showProducts && (
                      <Link to={`/editProduct/${p.product.id}`} className="text-lg font-semibold text-blue-600 hover:underline">
                        {p.product.name}
                      </Link>)}
                    <p className="text-sm text-gray-500">Purchase date: {p.date}</p>
                  </div>
                  {showAddProducts && (
                    <AddProduct customerId={p.customer.id} />
                  )}
                </div>
              </li>
            );
          })}
    </ul>
  );
};

export default List;

