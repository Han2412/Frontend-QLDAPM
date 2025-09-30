import OrderCard from "../OrderPage/OrderCard";

const listorder = [
  {
    table: "B1",
    time: "10h30p",
    listItem: [
      {
        name: "tra daocam sã",
        SL: 2,
        note: "1 ít đá",
      },
      {
        name: "tra dao cam",
        SL: 2,
        note: "1 ít đá",
      },
      {
        name: "cafe sữa đã",
        SL: 2,
        note: "",
      },
    ],
    employee: "cường",
  },
  {
    table: "B1",
    time: "10h30p",
    listItem: [
      {
        name: "tra daocam sã",
        SL: 2,
        note: "1 ít đá",
      },
      {
        name: "tra dao cam",
        SL: 2,
        note: "1 ít đá",
      },
      {
        name: "cafe sữa đã",
        SL: 2,
        note: "",
      },
    ],
    employee: "hân",
  },
];

function ListOrder() {
  return (
    <div className="p-4 flex gap-4">
      {listorder.map((order, index) => (
        <OrderCard key={index} order={order} />
      ))}
    </div>
  );
}

export default ListOrder;
