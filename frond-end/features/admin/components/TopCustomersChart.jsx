// src/features/admin/components/TopCustomersChart.jsx
export const TopCustomersChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="no-data">Không có dữ liệu khách hàng</div>;
  }

  return (
    <div className="top-customers-container">
      <h2 className="section-title">Top 5 Khách hàng Chi tiêu Nhiều Nhất</h2>
      <table className="top-customers-table">
        <thead>
          <tr>
            <th>Xếp hạng</th>
            <th>Khách hàng</th>
            <th>Tổng chi tiêu</th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer, index) => (
            <tr key={customer.email || index}>
              {" "}
              <td className="rank">#{index + 1}</td>
              <td className="customer-name">
                {customer.customer_name || customer.email || "N/A"}{" "}
              </td>
              <td className="spent-amount">
                {new Intl.NumberFormat("vi-VN").format(customer.total_spent)} ₫
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
