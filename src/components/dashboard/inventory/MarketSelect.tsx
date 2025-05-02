// src/components/MarketSelect.tsx

import React from "react";

interface MarketSelectProps {
  market: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MarketSelect: React.FC<MarketSelectProps> = ({ market, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium">Market</label>
      <div className="flex items-center space-x-4">
        <label>
          <input
            type="radio"
            name="market"
            value="domestic"
            checked={market === "domestic"}
            onChange={onChange}
            className="mr-2"
          />
          Domestic
        </label>
        <label>
          <input
            type="radio"
            name="market"
            value="global"
            checked={market === "global"}
            onChange={onChange}
            className="mr-2"
          />
          Global
        </label>
      </div>
    </div>
  );
};

export default MarketSelect;
