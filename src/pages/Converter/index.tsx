import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../api/api";
import ExchangeRateTable from "../../components/exchangeRateTable";

const Converter = () => {
  const [exchangeRate, setExchangeRate] = useState([]);
  const [canBeEdited, setCanBeEdited] = useState(true);
  const [valutesValues, setValutesValues] = useState([]);

  const { data, error, isLoading } = useSWR(
    process.env.REACT_APP_BACKEND_URL || "",
    fetcher
  );

  useEffect(() => {
    if (!!data) {
      setExchangeRate(data?.exchangeRate);
    }
    console.log(data);
  }, [data]);

  return (
    <div className="card">
      <ExchangeRateTable
        data={exchangeRate}
        onChange={(newData: any) => setExchangeRate(newData)}
      />
      <div></div>
    </div>
  );
};

export default Converter;
