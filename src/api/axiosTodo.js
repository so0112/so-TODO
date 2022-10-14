import axios from "axios";

const TODO_URL = "https://pre-onboarding-selection-task.shop/todos";
const token = `Bearer ${localStorage.getItem("token")}`;

export const getTodos = async ({ setDatas }) => {
  try {
    await axios
      .get(TODO_URL, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => setDatas(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const postTodo = async ({ todo, setTodo, datas, setDatas }) => {
  await axios
    .post(
      TODO_URL,
      {
        todo,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
    .then((res) => {
      setDatas([
        ...datas,
        {
          id: res.data.id,
          todo: res.data.todo,
          isCompleted: res.data.isCompleted,
          userId: res.data.userId,
        },
      ]);
      setTodo("");
    })
    .catch((err) => console.log(err));
};

export const deleteTodo = async ({ id, setDatas }) => {
  await axios
    .delete(`${TODO_URL}/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => getTodos({ setDatas }))
    .catch((err) => console.log(err));
};

export const postTodoCheck = async ({ id, todo, isCompleted, setDatas }) => {
  await axios
    .put(
      `${TODO_URL}/${id}`,
      {
        todo,
        isCompleted: !isCompleted,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
    .then((res) => getTodos({ setDatas }))
    .catch((err) => console.log(err));
};

/**putModify({
 * id : todo id값,
 * modifyTodo : 수정할 todo 데이터,
 * isCompleted : todo 완료 여부,
 * setIsModifying: 데이터 상태 수정,
 * setModifyTodo,
 * setDatas,}) */
export const putModify = async ({
  id,
  modifyTodo,
  isCompleted,
  setIsModifying,
  setModifyTodo,
  setDatas,
}) => {
  await axios
    .put(
      `${TODO_URL}/${id}`,
      {
        todo: modifyTodo,
        isCompleted,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
    .then((res) => {
      setIsModifying();
      setModifyTodo("");
      getTodos({ setDatas });
    })
    .catch((err) => console.log(err));
};
