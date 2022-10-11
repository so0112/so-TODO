import axios from "axios";

export function getTodos(TODO_GET_URL, setState) {
  axios.get(BOARD_URL, {}).then((res) => {
    setState(res.data.boards);
  });
}

export const handleTodo = async (TODO_CREATE_URL, todo, setTodo) => {
  try {
    const res = await axios.post(
      TODO_CREATE_URL,
      {
        todo,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("res : ", res);
    setTodo("");
  } catch (error) {
    console.log("error", error);
    setTodo("");
  }
};

export default handleTodo;
