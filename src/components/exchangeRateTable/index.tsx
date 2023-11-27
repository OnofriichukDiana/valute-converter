import React from "react";
import useSWR from "swr";
import { fetcher } from "../../api/api";
import Input from "./input";

interface ExchangeRateTableProps {
  data: any[];
  onChange: any;
}

const ExchangeRateTable: React.FC<ExchangeRateTableProps> = ({
  data,
  onChange,
}) => {
  const { data: initialData } = useSWR(
    process.env.REACT_APP_BACKEND_URL || "",
    fetcher
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newArray = data.map((item, i) => {
      if (i === index) {
        return { ...item, [e.currentTarget.name]: e.target.value };
      } else return item;
    });
    onChange(newArray);
  };

  const handleInputFocus = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newArray = data.map((item, i) => {
      if (i === index) {
        return { ...item, [e.currentTarget.name]: "  " };
      } else return item;
    });
    onChange(newArray);
  };

  const handleInputBlur = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (!e.target.value) {
      const newArray = data.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            [e.currentTarget.name]: initialData?.exchangeRate?.find(
              (initialItem: any) => initialItem.ccy === item.ccy
            )?.[e.currentTarget.name],
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
          <th className="border border-gray-300 p-2">Currency</th>
          <th className="border border-gray-300 p-2">Buy Rate</th>
          <th className="border border-gray-300 p-2">Sale Rate</th>
        </tr>
      </thead>
      <tbody>
        {!!data &&
          data?.map((rate, index) => (
            <tr key={rate?.ccy} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">
                {rate?.ccy}/ {rate?.base_ccy}
              </td>
              <td className="border border-gray-300 p-2">
                <Input
                  value={rate?.buy}
                  name="buy"
                  onChange={(e) => handleInputChange(e, index)}
                  onFocus={(e) => handleInputFocus(e, index)}
                  onBlur={(e) => handleInputBlur(e, index)}
                />
              </td>
              <td className="border border-gray-300 p-2">
                <Input
                  value={rate?.sale}
                  name="sale"
                  onChange={(e) => handleInputChange(e, index)}
                  onFocus={(e) => handleInputFocus(e, index)}
                  onBlur={(e) => handleInputBlur(e, index)}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ExchangeRateTable;
