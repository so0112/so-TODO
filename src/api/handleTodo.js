import axios from "axios";

const TODO_CREATE_URL = `https://pre-onboarding-selection-task.shop/todos`;
const TODO_GET_URL = "https://pre-onboarding-selection-task.shop/todos";

const URL = "https://pre-onboarding-selection-task.shop/";

export const getTodos = async (URL, setDatas) => {
  try {
    await axios
      .get(URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setDatas(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const postTodo = async (URL, todo, setTodo, datas, setDatas) => {
  try {
    await axios
      .post(
        URL,
        {
          todo,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

export const handleComplete = async (TODO_CHECK_URL, todo, isCompleted) => {
  await axios
    .put(
      TODO_CHECK_URL,
      {
        todo: todo,
        isCompleted: !isCompleted,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => getTodos())
    .catch((err) => console.log(err));
};

export const handleTodoDelete = async (TODO_DEL_URL, datas, setDatas) => {
  await axios
    .delete(TODO_DEL_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => getTodos(TODO_GET_URL, setDatas))
    .catch((err) => console.log(err));
};

export const handleCompletedClick = async (id, todo, isCompleted) => {
  await axios
    .put(
      `${URL}/${id}`,
      {
        todo: todo,
        isCompleted: !isCompleted,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => getTodos())
    .catch((err) => console.log(err));
};

const handleCompleted = async (id, todo, isCompleted) => {
  await axios
    .put(
      `${URL}/${id}`,
      {
        // todo: todo,
        isCompleted: !isCompleted,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => getTodos())
    .catch((err) => console.log(err));
};

export const putModify = async (id, isCompleted) => {
  await axios
    .put(
      `${URL}/${id}`,
      {
        todo: isCompleted,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      console.log(res);
      // setIdNumber(null);
      // setModifyTodo("");
      getTodos();
    });
};
