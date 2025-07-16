import React from "react";

interface LoadingRowProps {
  colCount: number;
}

const LoadingRow: React.FC<LoadingRowProps> = ({ colCount }) => (
  <tr className="animate-pulse">
    <td colSpan={colCount} className="py-4 px-2">
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
    </td>
  </tr>
);

export default LoadingRow;
