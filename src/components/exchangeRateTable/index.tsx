import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../api/api";
import Input from "./TableInput";
import { ExchangeRateItem } from "../../pages/Converter";

interface ExchangeRateTableProps {
  data: ExchangeRateItem[];
  onChange: (newData: ExchangeRateItem[]) => void;
}

const ExchangeRateTable: React.FC<ExchangeRateTableProps> = ({
  data,
  onChange,
}) => {
  const [recentValue, setRecentValue] = useState("");
  const { data: initialData } = useSWR(
    process.env.REACT_APP_BACKEND_URL || "",
    fetcher,
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    ccy: string,
  ) => {
    const newArray = data.map((item) => {
      if (ccy === item.ccy) {
        return { ...item, [e.currentTarget.name]: e.target.value };
      } else return item;
    });
    onChange(newArray);
  };

  const handleInputFocus = (
    e: React.ChangeEvent<HTMLInputElement>,
    ccy: string,
  ) => {
    setRecentValue(e.target.value);
    const newArray = data.map((item) => {
      if (ccy === item.ccy) {
        return { ...item, [e.currentTarget.name]: "" };
      } else return item;
    });
    onChange(newArray);
  };

  const handleInputBlur = (
    e: React.ChangeEvent<HTMLInputElement>,
    ccy: string,
    isCorrectValue: boolean,
  ) => {
    if (!e.target.value || !isCorrectValue) {
      const newArray = data.map((item) => {
        if (ccy === item.ccy) {
          return {
            ...item,
            [e.currentTarget.name]: recentValue,
          };
        } else return item;
      });
      onChange(newArray);
    }
  };

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-3">Currency</th>
          <th className="border border-gray-300 p-3">Buy Rate</th>
          <th className="border border-gray-300 p-3">Sale Rate</th>
        </tr>
      </thead>
      <tbody>
        {!!data &&
          data?.map((rate) => (
            <tr key={rate?.ccy} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-3">
                {rate?.ccy}/ {rate?.base_ccy}
              </td>
              <td className="border border-gray-300 p-3">
                <Input
                  value={rate?.buy?.slice(0, 5)}
                  name="buy"
                  onChange={(e) => handleInputChange(e, rate?.ccy)}
                  onFocus={(e) => handleInputFocus(e, rate?.ccy)}
                  onBlur={(
                    e: React.ChangeEvent<HTMLInputElement>,
                    isCorrectValue: boolean,
                  ) => handleInputBlur(e, rate?.ccy, isCorrectValue)}
                  initial={initialData.exchangeRate?.find(
                    (init: ExchangeRateItem) => init.ccy === rate.ccy,
                  )}
                />
              </td>
              <td className="border border-gray-300 p-3">
                <Input
                  value={rate?.sale.slice(0, 5)}
                  name="sale"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e, rate?.ccy)
                  }
                  onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                    handleInputFocus(e, rate?.ccy)
                  }
                  onBlur={(
                    e: React.ChangeEvent<HTMLInputElement>,
                    isCorrectValue: boolean,
                  ) => handleInputBlur(e, rate?.ccy, isCorrectValue)}
                  initial={initialData.exchangeRate?.find(
                    (init: ExchangeRateItem) => init.ccy === rate.ccy,
                  )}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ExchangeRateTable;
