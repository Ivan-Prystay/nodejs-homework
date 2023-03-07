const { NotFound } = require("http-errors");
const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { _id, subscription } = req.user;

  console.log("subscription: ", subscription);
  console.log("_id: ", _id);

  const subscriptionUpdated = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!subscriptionUpdated) {
    throw new NotFound(`User not found!`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { result: subscriptionUpdated },
  });
};

module.exports = updateSubscription;
