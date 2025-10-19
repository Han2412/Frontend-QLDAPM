import { useGetAllOrderQuery } from "../../store/Slices/orderSlice";
import OrderCard from "../OrderPage/OrderCard";

function ListOrder() {
  const { data } = useGetAllOrderQuery();
  console.log("🚀 ~ ListOrder ~ data:", data);

  return (
    <div className="p-4 flex-1 flex gap-4  ">
      {data?.length !== 0 ? (
        data?.map((order, index) => <OrderCard key={index} order={order} />)
      ) : (
        <div> chưa có order nào!</div>
      )}
    </div>
  );
}

export default ListOrder;
