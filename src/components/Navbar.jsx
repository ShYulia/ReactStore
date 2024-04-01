import { Link, Routes, Route } from 'react-router-dom';
import Products from './Products';
import Purchases from './Purchases';
import Customers from './Customers';
import EditProduct from './EditProduct';
import EditCustomer from './EditCustomer';
import Home from './Home'


const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-white text-lg font-semibold">
                  YS
                </Link>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link to="/products" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                    Products
                  </Link>
                  <Link to="/customers" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                    Customers
                  </Link>
                  <Link to="/purchases" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">
                    Purchases
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
          <Route path="/editCustomer/:id" element={<EditCustomer />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </div>
    </>
  );
};

export default Navbar;
