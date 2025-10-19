import { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { useGetRevenueByYearQuery } from "../../store/Slices/paymentSlide";

export default function Statistical() {
  const { data: Statistical = [] } = useGetRevenueByYearQuery("2025");

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // Dữ liệu gốc
  const revenues = months.map(
    (m) =>
      parseInt(Statistical.find((item) => item.month === m)?.totalAmount) || 0
  );

  // --- Dự đoán mượt mà ---
  const realData = Statistical.filter((d) => parseInt(d.totalAmount) > 0);
  const start_value = parseInt(realData[0]?.totalAmount || 0);
  const last_value = parseInt(realData[realData.length - 1]?.totalAmount || 0);
  const end_value = last_value * 1.5;
  const increment = (end_value - start_value) / 11;
  const predicted = Array.from(
    { length: 12 },
    (_, i) => start_value + increment * i
  );
  const predictedWithRandom = Array.from({ length: 12 }, (_, i) => {
    const noise = increment * (Math.random() * 0.2 - 0.1); // ±10%
    return Math.round(start_value + increment * i + noise);
  });

  // --- State để lưu dữ liệu hiển thị trên chart ---
  const [chartData, setChartData] = useState(revenues);

  // --- Handler khi click nút dự đoán ---
  const handlePredictRandom = () => {
    const predictedRandom = Array.from({ length: 12 }, (_, i) => {
      const noise = increment * (Math.random() * 1 - 0.1); // ±10%
      return Math.round(start_value + increment * i + noise);
    });
    setChartData(predictedRandom);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {/* --- Tiêu đề --- */}
      <div className="flex justify-center">
        <h2 className="text-[#4254FB] font-bold text-3xl pb-[20px]">
          Doanh Thu Theo Tháng (2025)
        </h2>
      </div>

      {/* --- Nút --- */}
      <div className="flex justify-end mb-6">
        <button
          className="bg-[#4254FB] text-white rounded-2xl px-4 py-2 active:bg-[#2439f7]"
          onClick={handlePredictRandom}
        >
          Dự đoán doanh thu
        </button>
      </div>

      {/* --- Biểu đồ đường --- */}
      <LineChart
        xAxis={[{ data: months, label: "Tháng" }]}
        series={[
          {
            data: chartData,
            label: "Doanh thu (VNĐ)",
            area: true,
            color: "#4254FB",
          },
        ]}
        height={400}
        grid={{ vertical: true, horizontal: true }}
      />

      {/* --- Biểu đồ cột phụ --- */}
      <div className="flex justify-center mt-10">
        <h2 className="text-[#4254FB] font-bold text-3xl pb-[20px]">
          Doanh Thu Theo Món
        </h2>
      </div>
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["Cà phê", "Trà sữa", "Bò kho"],
            label: "Món",
          },
        ]}
        series={[{ data: [2, 5, 10], label: "Số lượng bán", color: "#4254FB" }]}
        height={300}
      />
    </div>
  );
}
