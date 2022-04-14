import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinHistory } from "./api";

const PriceContainer = styled.div`
  display: grid;
  gap: 5px;
`;
const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DayContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const DayBox = styled.div`
  width: 90px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`;

const StartDay = styled(DayBox)``;

const CloseDay = styled(DayBox)``;

const PriceText = styled.div``;
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

function Price() {
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(["price", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <>
      {isLoading ? (
        "isLoading.."
      ) : (
        <PriceContainer>
          {data?.map((history) => (
            <PriceItem key={history.time_open}>
              <DayContainer>
                <StartDay>
                  {new Date(`${history.time_open}`).toLocaleDateString()}
                </StartDay>{" "}
                ~
                <CloseDay>
                  {new Date(`${history.time_close}`).toLocaleDateString()}
                </CloseDay>
              </DayContainer>
              <PriceText>${history.close.toFixed(3)}</PriceText>
            </PriceItem>
          ))}
        </PriceContainer>
      )}
    </>
  );
}
export default Price;
