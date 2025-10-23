import { updateUserInfor } from "../model/userModel.js";

export const updateInfor = async (req, res) => {
  const { full_name, address } = req.body;
  const accessToken = req.accessToken;
  const userId = req.user.id;

  try {
    const updated = await updateUserInfor(
      userId,
      full_name,
      address,
      accessToken
    );
    console.log("data after update infor of user : ", updated);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//userController
