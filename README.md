# FE 프리온보딩 1-1 과제설명 (10.26 18:04 작성완료)
원티드 프리온보딩 코스 사전과제 레포지토리입니다.<br />
TODO list를 javascript로 구현했습니다.

# 실행방법
아래 코드를 순차적으로 터미널에 입력시 프로젝트를 확인할 수 있습니다
1. 프로젝트 git 클론 <br />
`git clone git@github.com:so0112/so-TODO.git`
2. 클론 디렉토리로 이동 <br />
`cd so-Todo`
3. 패키지 install <br />
`npm install`
4. 프로젝트 실행 <br />
`npm start`
5. 로컬환경에서 실행 <br />
`http://localhost:3000`

# 디렉토리 구조
![image](https://user-images.githubusercontent.com/55952886/196024983-68086187-6a36-43dc-8d4a-895ddff16bde.png)

# ✅ 회원가입
## src/components/signup/Signup.js
### 📗 회원가입에 사용되는 변수와 state
```javascript
 // 회원가입 url
 const SIGNUP_URL = `https://pre-onboarding-selection-task.shop/auth/signup`;
  // 회원가입 state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // 유효성 검사 state
  const [isEmail, setIsEmail] = useState(false);
  const [ispassword, setIsPassword] = useState(false);
  const [isError, setIsError] = useState(false);
```
<hr />

### 📗 회원가입 이메일, 비밀번호 유효성 검사

```javascript
  useCheck(checkEmail, email, setIsEmail);
  useCheck(checkPassword, password, setIsPassword);
```

1. 유효성 검사 커스텀훅 `src/hooks/useCheck.js`
```javascript
/** 유효성 검사 커스텀 훅
 *
 * checkFunction : 유효성 검사 함수
 * checkedArg : checkFunction의 인자
 *
 * setIsState : 변경할 상태
 */
export default function useCheck(checkFunction, checkedArg, setIsState) {
  useEffect(() => {
    if (checkFunction(checkedArg) === true) {
      setIsState(true);
    } else if (checkFunction(checkedArg) === false) {
      setIsState(false);
    }
  }, [checkFunction, checkedArg, setIsState]);
}
```
2. 유효성 체크 함수 `src/function/checkSignup.js`
```javascript
/** 이메일 유효성 체크 함수
 *
 * `@` 포함되는지 확인
 */
export function checkEmail(email) {
  let emailReg = /^[a-zA-Z0-9._%+-]+@/g;
  return emailReg.test(email);
}
/** 비밀번호 유효성 체크 함수 
 * 
 * 8자리 넘는지 확인
*/
export function checkPassword(password) {
  return password.length >= 8;
}
```
<hr />

### 📗 회원가입 form
```javascript
// form 제출시 submitSignup 함수 호출
 <form onSubmit={submitSignup}>
        <h1>회원가입</h1>
        <InputGroup
          placeholder="이메일"
          value={email}
          setValue={setEmail}
          setIsError={setIsError}
        />
        <InputGroup
          placeholder="비밀번호"
          value={password}
          setValue={setPassword}
          type="password"
        />
       
	// isEmail, isPassword가 true일 경우에만 submit 가능
        {isEmail && isPassword ? (
          <button type="submit" className="allow-signup">
            가입하기
          </button>
        ) : (
          <button type="button" className="block-signup">
            가입하기
          </button>
        )}
      </form>
```
1. form 제출시 호출되는 `submitSignup` 함수
```javascript
/** 회원가입 axios 요청 버튼 */
  const submitSignup = (event) => {
    // 제출시 새로고침 방지
    event.preventDefault();
    // postSignup 함수 호출
    postSignup(SIGNUP_URL, email, password, setIsError);
  };
```
```javascript
export const postSignup = async (SIGNUP_URL, email, password, setErrors) => {
  await axios
    .post(
      SIGNUP_URL,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => window.location.replace("/"))
    .catch((error) => {
      console.log(error.response.status);
      setErrors(true);
    });
};
```
-  성공시 login url로 이동
    `.then((res) => window.location.replace("/"))`
- 실패시 에러 띄우기위해 error state 변경
`setErrors(true)`

2. 에러메세지
- 이메일 에러메세지
  * isError === true : 중복계정 에러
  * isEmail === true : 에러 없음
  * isEmail === false : 이메일 형식 에러
```javascript
 {isError === true ? (
          <ContentCheck>중복된 계정입니다.</ContentCheck>
        ) : isEmail === true ? (
          <></>
        ) : (
          <ContentCheck>
            올바른 형식의 이메일을 입력해주세요(@ 필수 포함)
          </ContentCheck>
        )}
```
- 비밀번호 에러메세지
  * isPassword === true : 에러 x
  * isPassword === false : 비밀번호 형식 에러
```javascript
 {isPassword === true ? (
          <></>
        ) : (
          <ContentCheck>8자 이상의 비밀번호를 입력해주세요</ContentCheck>
        )}
```



# ✅ 로그인
회원가입과 같은 로직으로 작성되었습니다.


# ✅ TODO
## Create
### 📗 `src/components/todo/Todo.js`
1.  todo form
```javascript
// enter 입력시 submitTodo 함수 호출
 <form onSubmit={submitTodo}>
        <h1>Todo List</h1>
        <div className="todo-input">
          <InputGroup
            className="post-input"
            placeholder="todo 생성하기"
            value={todo}
            setValue={setTodo}
          />
              
          // 버튼 클릭시 submitTodo 함수 호출
          <button type="button" className="post-button" onClick={submitTodo}>
            +
          </button>
        </div>
      </form>
```
2. todo form 제출시 실행되는 함수 
```javascript
const submitTodo = (event) => {
    event.preventDefault();
    // postTodo 호출
    postTodo({ todo, setTodo, datas, setDatas });
  };
```
```javascript
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
    // todolist에 사용되는 datas state 변경
      setDatas([
        // 기존에 존재하는 todo
        ...datas,
        // 추가되는 todo 값
        {
          id: res.data.id,
          todo: res.data.todo,
          isCompleted: res.data.isCompleted,
          userId: res.data.userId,
        },
      ]);
      // todo form에 input에 작성되어있는 값 초기화
      setTodo("");
    })
    .catch((err) => console.log());
};
```
## Read
### 📗 `src/components/todo/Todo.js`
useEffect로 화면이 새로고침될 때 getTodos호출
data state 받아온 후에 Todolist에 props로 내려줌

⚠️ todolist를 별로의 컴포넌트로 나눈 이유 <br />
todo 컴포넌트의 post 영역과 get 영역을 분리하고
코드의 가독성을 높이기 위해 분리했습니다.

```javascript
function Todo() {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    getTodos({ setDatas });
  }, []);
					(생략)
<TodoList
        datas={datas}
        setDatas={setDatas}
        todo={todo}
        setTodo={setTodo}
      />
  ```
## Update
### 📗 `src/components/todo/TodoList.js`
1.todo 값 변경, 수정에 사용되는 state
```javascript
// 수정중인 todo의 id를 담을 state
const [isModifying, setIsModifying] = useState();
// todo 수정값 state
const [modifyTodo, setModifyTodo] = useState("");
```
2. 수정 버튼 클릭시 startModify 함수 호출후 수정 시작
```javascript
<BsFillPencilFill className="modify-button" onClick={() => startModify(el)} />
```
```javascript
  const startModify = (el) => {
    // isModifyng state에 id값 할당
    setIsModifying(el.id);
    // modifyTodo에 수정전 todo값 할당
    setModifyTodo(el.todo);
  };
```
3. 수정중인 id에 해당되는 todo 값 input창 띄워줌
```javascript
{/* TODO PUT 수정중인 id는 input창 뜨도록 작성 */}
          {isModifying === el.id ? (
            <>
            // update putModify 요청
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  putModify({
                    id: el.id,
                    modifyTodo,
                    isCompleted: el.isCompleted,
                    setIsModifying,
                    setModifyTodo,
                    setDatas,
                  });
                }}>
                <InputGroup
                  placeholder=""
                  value={modifyTodo}
                  setValue={setModifyTodo}
                  className="todo-list"
                />
              </form>
              <div className="modify-button-area">
                <BsCheckLg
                  className="modify-post-button"
                  onClick={() =>
                    putModify({
                      id: el.id,
                      modifyTodo,
                      isCompleted: el.isCompleted,
                      setIsModifying,
                      setModifyTodo,
                      setDatas,
                    })
                  }
                />
				// 수정 취소 버튼
                <BsXLg className="modify-cancel-button" onClick={handleCancel} />
              </div>
            </>
```
4.  putModify 함수 `src/api/axiosTodo`
수정성공시 startModfiy, setModifyTodo 초기화
getTodos 호출 수정된 값 반영
```javascript
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
    .catch((err) => console.log());
};
```
5. 수정 취소시 hanldeCancel 함수 호출
```javascript
  const handleCancel = () => {
    setIsModifying();
  };
```
<hr />

### 📗 todo 진행중 / 완료 변경
1. 클릭시 postTodoCheck 함수 호출
```javascript
 <BsCircle
              onClick={() =>
                postTodoCheck({ id: el.id, todo: el.todo, isCompleted: el.isCompleted, setDatas })
              }
            />
```
2. postTodoCheck 함수 `src/api/axiosTodo`
isCompleted 값을 NOT 연산자 사용해서 현재 isCompleted 값 변경
성공시 getTodos 호출 변경된 값 반영
```javascript
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
    .catch((err) => console.log());
};
```
## Delete
### 📗 `src/components/todo/TodoList.js`
1. Delete 버튼 클릭시 deleteTodo 함수 호출
```javascript
 <BsFillTrashFill
	className="delete-button"
	onClick={() => deleteTodo({ id: el.id, setDatas })}
    />
```
2. deleteTodo 함수
성공시 해당 id Todo 삭제 후
getTodos 호출 삭제된 값 반영
```javascript
export const deleteTodo = async ({ id, setDatas }) => {
  await axios
    .delete(`${TODO_URL}/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => getTodos({ setDatas }))
    .catch((err) => console.log());
```
# ✅ 리다이렉트
페이지 렌더링 될 때 토큰 유무 확인후 리다이렉트
### 📗 로그인 페이지
```javascript
  const isLogin = Boolean(localStorage.getItem("token"));
  const navigate = useNavigate();
  // isLogin === true : todo url로 리다이렉트
  useEffect(() => {
    if (isLogin) {
      navigate("/todo");
    }
  }, [isLogin, navigate]);
```
### 📗 todo 페이지
```javascript
 const isLogin = Boolean(localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);
```
➡️ 리다이렉트 아쉬운 점 <br />
각 페이지마다 토큰 유무를 확인하고 리다이렉트가 이뤄지는데
토큰을 확인하는 페이지의 갯수가 많아질 경우 좋은 방법은 아닌 것 같다. <br />
App.js에서 토큰 유무를 확인하고 접근할 수 있는 페이지
접근이 불가능한 페이지를 나누는 방식으로 구현하면 더 좋을 것 같아보임

<hr />

<br />
<br />

# 원티드 프리온보딩 프론트엔드 과제 레포지토리
## 배포링크
원티드 온보딩 사전과제 배포링크 <br/>
https://so-todo.vercel.app
## 실행방법
1. 패키지 설치<br/>
`npm install`
2. 실행<br/>
`npm run start`
3. http://localhost:3000 이동<br />
`open http://localhost:3000`
## 구현기능
### :: 1. 로그인 / 회원가입
- 로그인 / 회원가입 기능 ✅
  - 페이지 안에 이메일 입력창, 비밀번호 입력창, 제출 버튼이 포함된 형태로 구성
  - 회원가입 `/signup` 경로로 분리
  - 회원가입 중복 계정일시 오류메시지 <br />
![image](https://user-images.githubusercontent.com/55952886/196025847-cfb5b7a9-f0f8-4c5d-8149-6ba035014a63.png)
  - 로그인 실패시 오류메시지<br/>
  ![image](https://user-images.githubusercontent.com/55952886/196025822-9003a55b-7899-4c6a-95a5-4a311169a579.png)
#### Assignment1
- 이메일과 비밀번호의 유효성 검사기능 ✅
  - 이메일 조건: `@` 포함
  - 비밀번호 조건: 8자 이상
  - 입력된 이메일과 비밀번호가 위 조건을 만족할 때만 버튼이 활성화
#### Assignment2
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 `/todo` 경로로 이동 ✅
  - 응답받은 JWT는 로컬 스토리지에 저장
#### Assignment3
- 로그인 여부에 따른 리다이렉트 처리 ✅
  - 로컬 스토리지에 토큰이 있는 상태로 `/` 페이지에 접속한다면 `/todo` 경로로 리다이렉트
  - 로컬 스토리지에 토큰이 없는 상태로 `/todo`페이지에 접속한다면 `/` 경로로 리다이렉트
---
### :: 2. 투두 리스트
#### Assignment4
- `/todo`경로에 접속하면 투두 리스트의 목록 확인가능 ✅
- 리스트 페이지에는 투두 리스트의 내용과 완료 여부가 표시
- 리스트 페이지에는 입력창과 추가 버튼이 있고, 추가 버튼을 누르면 입력창의 내용이 새로운 투두 리스트로 추가
#### Assignment5
- 투두 리스트의 수정, 삭제 기능 ✅
  - 투두 리스트의 개별 아이템 우측에 수정버튼이 존재하고 해당 버튼을 누르면 수정모드 활성화
  - 수정모드에서는 개별 아이템의 우측에 제출버튼과 취소버튼이 표시되며 해당 버튼을 통해서 수정 내용을 제출하거나 수정을 취소 가능
  - 투두 리스트의 개별 아이템 우측에 삭제버튼이 존재하고 해당 버튼을 누르면 투두 리스트 삭제
  
## 커밋 컨벤션
|Tag Name|Description|
|:-----:|:------|
|`Add`|새로운 파일 추가|
|`Feat`|새로운 기능 추가|
|`Fix`|버그 수정|
|`Docs`|문서 수정|
|`Style`|코드 formatting, 세미콜론 누락, 코드 변경이 없는 경우|
|`Design`|css 수정|
|`Rename`|파일 및 폴더 구조 변경|
|`Refactor`|코드 리팩토링|
|`Modify`|코드 단순 수정|
|`Test`|테스트 추가, 테스트 리팩토링|
|`Chore`|빌드 업무 수정, 패키지 매니저 수정|
