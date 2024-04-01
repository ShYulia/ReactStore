import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import List from './List';
import Total from './Total';




const Products = () => {
  const products = useSelector((state) => state.products);
  if (!products || !products.length) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="mb-4">
        <Total />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border-2 border-green-500 p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">
              <Link to={`/editProduct/${product.id}`} className="text-blue-500 hover:underline">
                {product.name}
              </Link>
              <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
            </h2>
            <p className="mb-2"><span className="font-bold">Price:</span> ${product.price}</p>
            <List  showAddProducts= {true} elementId={product.id} showProducts={false}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
