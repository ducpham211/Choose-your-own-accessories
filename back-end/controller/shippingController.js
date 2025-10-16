import { getStatusOrder, updateStatusOrder } from "../model/orderModel.js";
import {
  createShipping,
  updateStatus,
  deleteShippingById,
  getShippingByOrderId,
  getAllShippings,
} from "../model/shippingModel.js";
export const addShipping = async (req, res) => {
  const accessToken = req.accessToken;
  const { id } = req.params;
  console.log("id fetched from add shipping : ", id);
  try {
    const shipping = await createShipping(id, accessToken);
    console.log("shipping created : ", shipping);
    res.status(200).json(shipping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getShipping = async (req, res) => {
  const { id } = req.params;
  console.log("id from controller : ", id);
  try {
    const shipping = await getShippingByOrderId(id);
    console.log("get shipping by id : ", shipping);
    res.status(200).json(shipping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllShipping = async (req, res) => {
  try {
    const shipping = await getAllShippings();
    console.log("all shipping fetched : ", shipping);
    res.json(shipping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteShipping = async (req, res) => {
  const { orderId } = req.params;
  const accessToken = req.accessToken;
  try {
    await deleteShippingById(orderId, accessToken);
    res.status(200).json({ message: "shipping deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStatusShipping = async (req, res) => {
  const { id } = req.params;
  console.log("order id from update status shipping : ", id);
  const { newStatus } = req.body;
  console.log("new status : ", newStatus);
  const accessToken = req.accessToken;
  try {
    const shipping = await updateStatus(id, newStatus, accessToken);
    if (newStatus === "Đang Giao") {
      const statusOrder = await updateStatusOrder(
        id,
        "Đang Tiến Hành",
        accessToken
      );
      console.log(
        "status of order after update must be Đang tiến hành : ",
        statusOrder
      );
    } else {
      const statusOrder = await updateStatusOrder(
        id,
        "Hoàn Thành",
        accessToken
      );
      console.log(
        "status of order after update must be Hoàn Thành : ",
        statusOrder
      );
    }
    console.log("status shipping after update : ", shipping);
    res
      .status(200)
      .json({ message: "Cập nhật trạng thái đơn hàng thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//shippingController
