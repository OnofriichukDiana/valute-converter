import React, { useEffect, useState } from "react";
import { ExchangeRateItem } from "../../pages/Converter";
import { BiTransfer } from "react-icons/bi";

interface CalculatorProps {
  data: ExchangeRateItem[];
}
interface StateData {
  value: string;
  currency?: string;
  availableCurrencies?: string[];
}
const Calculator: React.FC<CalculatorProps> = ({ data }) => {
  const [recentValue, setRecentValue] = useState("");
  const [resultData, setResultData] = useState<StateData>({ value: "" });
  const [toCalculateData, setToCalculateData] = useState<StateData>({
    currency: "UAH",
    value: "",
  });

  useEffect(() => {
    const availableCurrencies = data.map((item) => item.ccy);
    if (!!data) {
      setResultData({
        ...resultData,
        availableCurrencies: availableCurrencies,
        currency: availableCurrencies[0],
      });
      setToCalculateData({
        ...toCalculateData,
        availableCurrencies: ["UAH", availableCurrencies[0]],
      });
    }
  }, [data]);

  const onCalculateResult = () => {
    if (!!toCalculateData.value) {
      let currency = resultData.currency;
      if (resultData.currency === "UAH") {
        currency = toCalculateData.currency;
      }

      const rangeValue = data
        .find((item: ExchangeRateItem) => item.ccy === currency)
        ?.buy.slice(0, 5);
      if (rangeValue) {
        const value =
          toCalculateData.currency === "UAH"
            ? (+toCalculateData.value / +rangeValue).toFixed(2)
            : (+toCalculateData.value * +rangeValue).toFixed(2);
        setResultData({ ...resultData, value: value.toString() });
      }
    }
  };

  useEffect(() => {
    onCalculateResult();
  }, [
    toCalculateData.value,
    toCalculateData.currency,
    resultData.currency,
    data,
  ]);

  const onChangeValues = () => {
    const _toCalculateData = toCalculateData;
    const _resultData = resultData;
    setToCalculateData(_resultData);
    setResultData({
      ...resultData,
      currency: _toCalculateData.currency,
      availableCurrencies: _toCalculateData.availableCurrencies,
    });
  };

  const onChangeToCalculateCurrency = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const toCalculateDataAvailableCurrencies =
      toCalculateData.availableCurrencies;
    const resultDataAvailableCurrencies = resultData.availableCurrencies;
    setToCalculateData({
      ...toCalculateData,
      currency: e.target.value,
      availableCurrencies:
        toCalculateData.availableCurrencies?.length === 2
          ? resultDataAvailableCurrencies
          : toCalculateData.availableCurrencies,
    });
    if (
      e.target.value !== "UAH" &&
      toCalculateData.availableCurrencies?.length === 2
    ) {
      setResultData({
        ...resultData,
        currency: "UAH",
        availableCurrencies: toCalculateDataAvailableCurrencies,
      });
    } else if (
      e.target.value !== "UAH" &&
      toCalculateData.availableCurrencies?.length !== 2
    ) {
      setResultData({
        ...resultData,
        currency: "UAH",
        availableCurrencies: ["UAH", e.target.value],
      });
    }
  };

  const onChangeResultCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setResultData({ ...resultData, currency: e.target.value });

    if (e.target.value !== "UAH") {
      setToCalculateData({
        ...toCalculateData,
        currency: "UAH",
        availableCurrencies: ["UAH", e.target.value],
      });
    }
  };

  return (
    <div className="min-w-full mt-5 flex justify-between flex-wrap">
      <div className="flex items-end">
        <div className="flex flex-col mr-4">
          <label htmlFor="value">Change</label>
          <input
            onChange={(e) =>
              setToCalculateData({
                ...toCalculateData,
                value: e.currentTarget.value,
              })
            }
            id="value"
            type="number"
            value={toCalculateData.value}
            className="border p-2 w-40"
            onFocus={(e) => {
              setRecentValue(toCalculateData.value);
              setToCalculateData({ ...toCalculateData, value: "" });
            }}
            onBlur={(e) => {
              if (!e.target.value) {
                setToCalculateData({ ...toCalculateData, value: recentValue });
              }
            }}
          />
        </div>
        <div className="flex flex-col">
          <select
            onChange={onChangeToCalculateCurrency}
            value={toCalculateData.currency}
            className="border p-2 w-20"
          >
            {toCalculateData.availableCurrencies?.map((cur, index) => (
              <option key={index} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="button"
        className="bg-transparent p-0"
        onClick={onChangeValues}
      >
        <BiTransfer style={{ width: "80px", height: "20px" }} />
      </button>

      <div className="flex items-end">
        <div className="flex flex-col mr-4">
          <label htmlFor="value">Get</label>
          <input
            disabled
            id="value"
            type="number"
            value={resultData.value}
            className="border p-2 w-40"
          />
        </div>
        <div className="flex flex-col">
          <select
            onChange={onChangeResultCurrency}
            value={resultData.currency}
            className="border p-2 w-20"
          >
            {resultData.availableCurrencies?.map((cur, index) => (
              <option key={index} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
