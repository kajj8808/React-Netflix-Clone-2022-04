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
  function fixedTwo(number: number) {
    return number.toFixed(2);
  }
  return (
    <>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data:
                data?.map((price) => ({
                  x: new Date(price.time_close),
                  y: [
                    fixedTwo(price.open),
                    fixedTwo(price.high),
                    fixedTwo(price.low),
                    fixedTwo(price.close),
                  ],
                })) ?? [],
            },
          ]}
          options={{
            chart: {
              height: 300,
              toolbar: {
                show: false,
              },
              type: "candlestick",
              background: "transparent",
            },
            grid: {
              show: false,
            },
            xaxis: {
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
              type: "datetime",
            },
            yaxis: { show: false },
            theme: {
              mode: "dark",
            },
            tooltip: {
              x: {
                format: "yyyy/MM/dd HH:mm",
              },
            },
          }}
        />
      )}
    </>
  );
}
export default Chart;
