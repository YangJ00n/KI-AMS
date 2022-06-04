import Group from "../models/Group";

export const home = async (_, res) => {
  const groups = await Group.find({}).sort({ createdAt: "desc" });
  return res.render("home", { groups });
};
export const createGroup = async (req, res) => {
  const {
    session: {
      teacher: { _id },
    },
    body: { name },
  } = req;

  try {
    await Group.create({ name, createdBy: _id });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("home");
  }
};
