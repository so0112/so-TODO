import { instance } from './api';

const TODO_URL = '/todos';

export const getTodos = async ({ setDatas }) => {
  await instance
    .get(TODO_URL)
    .then(res => setDatas(res.data))
    .catch(err => {});
};

export const postTodo = async ({ todo, setTodo, datas, setDatas }) => {
  await instance
    .post(TODO_URL, {
      todo,
    })
    .then(res => {
      setDatas([
        ...datas,
        {
          id: res.data.id,
          todo: res.data.todo,
          isCompleted: res.data.isCompleted,
          userId: res.data.userId,
        },
      ]);
      setTodo('');
    })
    .catch(err => {});
};

export const deleteTodo = async ({ id, setDatas }) => {
  await instance
    .delete(`${TODO_URL}/${id}`)
    .then(res => getTodos({ setDatas }))
    .catch(err => {});
};

export const postTodoCheck = async ({ id, todo, isCompleted, setDatas }) => {
  await instance
    .put(`${TODO_URL}/${id}`, {
      todo,
      isCompleted: !isCompleted,
    })
    .then(res => getTodos({ setDatas }))
    .catch(err => console.error(err));
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
  await instance
    .put(`${TODO_URL}/${id}`, {
      todo: modifyTodo,
      isCompleted,
    })
    .then(res => {
      setIsModifying();
      setModifyTodo('');
      getTodos({ setDatas });
    })
    .catch(err => console.error(err));
};
