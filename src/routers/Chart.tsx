import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
interface IChartProps {
  coinId: string;
}
interface IHistorical {
  close: number;
  high: number;
  low: number;
  market_cap: number;
  open: number;
  time_close: string;
  time_open: string;
  volume: number;
}

function Chart() {
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  console.log(data);
  return (
    <>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="line"
          series={[]}
          options={{
            chart: {
              height: 500,
              width: 500,
            },
            theme: {
              mode: "dark",
            },
          }}
        />
      )}
    </>
  );
}
export default Chart;
