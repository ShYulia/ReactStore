import { v4 as uuidv4 } from 'uuid';

const initialState = {
  products: [
 
  ],
  customers: [
 
  ],
  purchases: [
    {}
  ]
};

const myStoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD-products': {
      return { ...state, products: action.payload };
    }
    case 'LOAD-customers': {
      return { ...state, customers: action.payload };
    }
    case 'LOAD-purchases': {
      return { ...state, purchases: action.payload};
    }
    case 'ADD': {
      return {
        ...state,
        products: [...state.products, { id: uuidv4(), ...action.payload }],
      };
    }
   case 'UPDATE-Customer':{
    const customers = [...state.customers]
    const index = customers.findIndex((customer) => customer.id === action.payload.id)

  if(index!==-1){
    console.log(action.payload)
    customers[index]=action.payload
  }
  return{...state, customers}
}
case 'UPDATE-Purchase':{
  const purchases = [...state.purchases]
  const index = purchases.findIndex((purchase) => purchase.customer.id === action.payload.id)

if(index!==-1){
  console.log(action.payload)
  purchases[index].customer=action.payload
}
return{...state, purchases}
}

case 'Delete-Product': {
      const products = state.products
      const index = products.findIndex((product) => product.id === action.payload.id)
      if(index!==-1){
     
        products.splice(index,1)
      }
      return { ...state, products };
    }
    case 'Delete-Purchase': {
      const purchases = state.purchases
      const newPurchases = purchases.filter((purchase) => purchase.product !== action.payload.id)
      
      return { ...state, newPurchases };
    }

    default:
      return state;
  }
};

export default myStoreReducer;
