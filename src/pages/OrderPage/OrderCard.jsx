function OrderCard({ order }) {
  console.log("🚀 ~ OrderCard ~ order:", order);
  return (
    <div className="border-4 rounded-2xl w-[20%] h-[500px] p-6 ">
      <div className="flex justify-between text-2xl font-bold pb-6 text-[#0bb783]">
        <h2>NV: {order.employee}</h2>
        <p>bàn:10</p>
      </div>
      <div className=" h-full w-full pb-12">
        <div className=" w-full h-full border-4  ">
          <ul>
            {order.listItem.map((item, index) => (
              <li className="p-4 text-gray-700">
                <div className="flex justify-between font-bold text-2xl">
                  <p>món: {item.name}</p>
                  <p>sl:{item.SL}</p>
                </div>
                <span>note: {item.note}</span>
              </li>
            ))}
          </ul>
          <div className="w-full flex justify-end px-2">
            <button className=" bg-[#0bb783] text-white font-bold rounded-xl p-2 ">
              xong
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
