import axios from "axios";

const TODO_URL = "https://pre-onboarding-selection-task.shop/todos";
const token = `Bearer ${localStorage.getItem("token")}`;

// Todo Get 요청
export const getTodos = async (URL, setDatas) => {
  try {
    await axios
      .get(URL, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => setDatas(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const postTodo = async (todo, setTodo, datas, setDatas) => {
  try {
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
  } catch (error) {
    console.log("error", error);
    setTodo("");
  }
};

export const deleteTodo = async (TODO_DEL_URL, datas, setDatas) => {
  await axios
    .delete(TODO_DEL_URL, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => getTodos(TODO_URL, setDatas))
    .catch((err) => console.log(err));
};

export const handleCheck = async (id, todo, isCompleted, setDatas) => {
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
    .then((res) => getTodos(TODO_URL, setDatas))
    .catch((err) => console.log(err));
};

export const putModify = async (
  id,
  modifyTodo,
  isCompleted,
  setIsModifying,
  setModifyTodo,
  setDatas
) => {
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
      console.log(res);
      setIsModifying();
      setModifyTodo("");
      getTodos(TODO_URL, setDatas);
    });
};

///////////////////////////////////////////////////////////////////
const handleCompleted = async (id, isCompleted) => {
  await axios
    .put(
      `${URL}/${id}`,
      {
        isCompleted: !isCompleted,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
    .then((res) => getTodos(TODO_URL))
    .catch((err) => console.log(err));
};
