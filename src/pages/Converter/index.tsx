import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../api/api";
import ExchangeRateTable from "../../components/exchangeRateTable";
import Calculator from "../../components/calculator";
import Loader from "../../components/loader";
import Error from "../../components/error";

export interface ExchangeRateItem {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

const Converter = () => {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRateItem[]>([]);

  const { data, error, isLoading } = useSWR(
    process.env.REACT_APP_BACKEND_URL || "",
    fetcher
  );

  useEffect(() => {
    if (!!data) {
      setExchangeRate(data?.exchangeRate);
    }
  }, [data]);

  return (
    <div className="card flex-1">
      {isLoading && <Loader />}
      {!error ? (
        <>
          <ExchangeRateTable
            data={exchangeRate}
            onChange={(newData: ExchangeRateItem[]) => setExchangeRate(newData)}
          />
          <Calculator data={exchangeRate} />{" "}
        </>
      ) : (
        <Error error={error} />
      )}
    </div>
  );
};

export default Converter;
