import React from "react";

interface TaxDetails {
  taxType: string;
  amount: number;
}

interface TaxSummaryProps {
  taxData: TaxDetails[];
}

const TaxSummary: React.FC<TaxSummaryProps> = ({ taxData }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Tax Summary</h2>
      <table className="w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Tax Type
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Amount ($)
            </th>
          </tr>
        </thead>
        <tbody>
          {taxData.map((tax, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4">{tax.taxType}</td>
              <td className="px-6 py-4">${tax.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaxSummary;
