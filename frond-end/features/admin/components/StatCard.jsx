// src/features/admin/components/StatCard.jsx
import React from "react";

export const StatCard = ({ title, value, trend }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <h3 className="stat-card-title">{title}</h3>
      </div>

      <p className="stat-card-value">{value}</p>

      {trend && (
        <div className={`stat-card-footer ${trend < 0 ? "negative" : ""}`}>
          {Math.abs(trend)}% so với tháng trước
        </div>
      )}
    </div>
  );
};
//StatCard
