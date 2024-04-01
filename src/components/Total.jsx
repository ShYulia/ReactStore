import { useSelector } from "react-redux/es/hooks/useSelector"
const Total = () =>{
    const purchases = useSelector((state) => state.purchases)

    return(
        <div className="bg-gray-100 p-4 rounded-md ">
       <p className="text-xl font-semibold"> Total Purchases : {purchases.length}</p>
        </div>
    )
}
export default Total