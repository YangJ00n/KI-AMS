import Group from "../models/Group";
import Room from "../models/Room";

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

export const groupHome = async (req, res) => {
  const {
    params: { id },
  } = req;

  const group = await Group.findById(id).populate("createdBy");
  if (!group) {
    return res
      .status(404)
      .render("error", { errorMessage: "그룹을 찾을 수 없습니다." });
  }

  const rooms = [];
  for (const room_id of group.rooms) {
    const room = await Room.findById(room_id).populate("createdBy");
    rooms.unshift(room);
  }

  return res.render("group", {
    group,
    pageTitle: `${group.name} 그룹`,
    rooms,
    back: {
      title: "홈으로",
      link: "/",
    },
  });
};
