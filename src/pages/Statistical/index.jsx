import { useMemo } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { useGetMonthlyStatisticQuery } from "../../store/Slices/statisticSlice";
import { usePredictRevenueMutation } from "../../store/Slices/predictRevenueSlice";

export default function Statistical() {
  const year = "2025";

  const { data: Statisticdata } = useGetMonthlyStatisticQuery(year);
  const [predictRevenue, { data: predictData, isLoading }] =
    usePredictRevenueMutation();

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // Doanh thu thực tế
  const actualData = useMemo(() => {
    if (!Statisticdata?.data) return Array(12).fill(0);
    return Statisticdata.data.map((item) => item.totalAmount);
  }, [Statisticdata]);

  // Doanh thu dự đoán
  const predictedData = useMemo(() => {
    if (!predictData?.predictions) return [];
    return predictData.predictions.map((item) => item.predictedAmount);
  }, [predictData]);

  const handlePredictRandom = async () => {
    if (!Statisticdata?.data?.length) return;

    const payload = {
      data: Statisticdata.data.map((item, index) => ({
        month: index + 1,
        totalAmount: item.totalAmount,
      })),
    };

    try {
      const res = await predictRevenue(payload).unwrap();
      console.log("✅ Predict result:", res);
    } catch (err) {
      console.error("❌ Predict error:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-center">
        <h2 className="text-[#4254FB] font-bold text-3xl pb-5">
          Doanh Thu Theo Tháng ({year})
        </h2>
      </div>

      <div className="flex justify-end mb-6">
        <button
          className="bg-[#4254FB] text-white rounded-2xl px-4 py-2"
          onClick={handlePredictRandom}
          disabled={isLoading}
        >
          {isLoading ? "Đang dự đoán..." : "Dự đoán doanh thu"}
        </button>
      </div>

      {/* Biểu đồ thực tế + dự đoán */}
      <LineChart
        xAxis={[{ data: months, label: "Tháng" }]}
        series={[
          {
            data: actualData,
            label: "Doanh thu thực tế",
            area: true,
            color: "#4254FB",
          },
          predictedData.length > 0 && {
            data: predictedData,
            label: "Dự đoán doanh thu",
            color: "#FB8C00",
            strokeDasharray: "5 5",
          },
        ].filter(Boolean)}
        height={400}
        grid={{ vertical: true, horizontal: true }}
      />

      {/* Biểu đồ phụ */}
      <div className="flex justify-center mt-10">
        <h2 className="text-[#4254FB] font-bold text-3xl pb-5">
          Doanh Thu Theo Món
        </h2>
      </div>

      <BarChart
        xAxis={[
          {
            data: ["Cà phê", "Trà sữa", "Bò kho"],
            label: "Món",
          },
        ]}
        series={[
          {
            data: [2, 5, 10],
            label: "Số lượng bán",
            color: "#4254FB",
          },
        ]}
        height={300}
      />
    </div>
  );
}
