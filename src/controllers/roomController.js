import Room from "../models/Room";
import Group from "../models/Group";

export const createRoom = async (req, res) => {
  const {
    session: {
      teacher: { _id },
    },
    body: { name, group_id, col, row },
  } = req;

  const group = await Group.findById(group_id);
  if (!group) {
    return res.sendStatus(400);
  }

  try {
    const room = await Room.create({
      name,
      col,
      row,
      createdBy: _id,
      group: group_id,
    });
    group.rooms.push(room._id);
    await group.save();

    return res.redirect(`/groups/${group_id}`);
  } catch (error) {
    console.log(error);
    return res.status(400).render("group");
  }
};

export const roomHome = async (req, res) => {
  const {
    params: { id },
    query: { date },
  } = req;

  const room = await Room.findById(id).populate("createdBy").populate("group");
  if (!room) {
    return res
      .status(404)
      .render("error", { errorMessage: "룸을 찾을 수 없습니다." });
  }

  return res.render("room", {
    room,
    pageTitle: `${room.name} 룸`,
    back: {
      title: `${room.group.name} 그룹`,
      link: `/groups/${room.group._id}`,
    },
  });
};

export const deleteRoom = async (req, res) => {
  const {
    params: { id },
  } = req;

  const room = await Room.findById(id);
  if (!room) {
    return res
      .status(404)
      .render("error", { errorMessage: "룸을 찾을 수 없습니다." });
  }

  const group = await Group.findById(room.group);

  const filteredRooms = group.rooms.filter(
    (room_id) => String(room_id) !== String(id)
  );
  await Group.findByIdAndUpdate(room.group, { rooms: filteredRooms });
  await Room.findByIdAndDelete(id);

  return res.redirect(`/groups/${String(room.group)}`);
};

export const setSeats = async (req, res) => {
  const {
    params: { id },
    body: { name: nameList },
  } = req;

  await Room.findByIdAndUpdate(id, { seats: nameList });

  return res.redirect(`/rooms/${id}`);
};
