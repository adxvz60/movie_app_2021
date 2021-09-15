# 유호철 201840221
[ 9월 15일 ]
학습내용
props - 컴포넌트를 전달하는 데이터
    여러개의 데이터도 가능하다

1.App.js에 potato컴포넌트를 Food로 수정

2.App 컴포넌트에 Food함수 추가
    Food에 console함수를 넣어서 props가 제대로 작동하는지 확인
    문자열이면 대괄호 문자열이 아니면 중괄호를 사용한다
3.App.js파일에 h1태그의 potato를 {props.fav}로 수정
    App컴포넌트의 fav값을 받아와서 화면에 출력한다

4.Food(props)를 Food({fav})로 수정, h1태그의 {props.fav}를 {fav}로 수정후 출력확인
    {props.fav}의 받아오는 값과 {fav}의 받는 값이 같으므로 출력값이 같다

5.const
    const값을 사용하여 여러개의 데이터를 출력할수 있다

6.const foodILike를 사용
    foodILike의 값에 여러개의 데이터를 받기위함

7.App.js에 foodILike.map에 Food컴포넌트 추가 추가
    map함수를 사용하여 배열에 있는 값을 하나씩 가져다 사용할수 있다

8.Food괄호에 picture를 추가 및 map함수에 picture를 추가 후 출력확인

9.renderFood 함수 추가
    앞글자를 소문자로 사용하였기에 컴포넌트가 아니라 함수개념으로 사용

10.foodILike.map에 Food 컴포넌트를 renderFood 추가
    길고 복잡한 코드를 rederFood를 상용함으로소 간소화



[ 9월 08일 ]
학습내용
1.Powershell에서 movie_app_2021파일 생성
    npx create-react-app movie_app_2021

2.파일 생성, 열기후 npm으로 서버 실행 확인
    npm start

3.movie파일에서 불필요한 파일제거
    App.css
    App.test.js
    index.css
    logo.svg
    reportWebVital.js
    setupTest.js
    package-lock.js

4.index.js파일에서 불필요한 문장 삭제
    import './index.css';
    import reportWebVitals from './reportWebVitals';
    <React.StrictMode>
    </React.StrictMode>
    reportWebVitals();

5.App.js 파일에 root를 potato로 수정
    index.js 와 index.html에 있는 id = 'root'에 있는 값을 potato 수정 후 정상 작용하기 위한 확인
    index.js에서 app.js의 리턴값을 가져와 index.html에 전달해주는것을 확인
    이후 다시 potato값을 root값으로 복구

컴포넌트
    funtion으로 정의 내린곳을 컴포넌트라고 부른다

    index.js 파일에서의, < App />부분을 확인하면
    <App>을 ReactDOM.render()함수의 첫 번째 인자로 전달하고 App 컴포넌트가 가져오는 것들을 화면에 보여줄수있다
    App 컴포넌트가 보여질 위치는 ReatDOM.render()함수의 두 번째 인자로 전달한다
    리액트는 컴포넌트와 함께 동작하고, 리액트 앱은 컴포넌트로 구성된다.

6.scr폴더에 Potato.js파일을 생성 후 funtion 을 입력

10.index.js에 potato파일을 import한 후 <Apps />옆에 <Potato />입력후 오류를 확인한다.
    오류가 발생하는 이유는 리엑트는 한개의 컴포넌트를 보여주는데 두개의 컴포넌트를 보여줘야 하기때문에 발생하는것
    오류 해결방법은 potato컴포넌트를 app컴포넌트 안에 넣어준다

11.index.js파일에 있는 <Potato />를 지우고 App.js에 import를 넣어주고 div안에 Potato를 입력한다

12.파일들을 간소화 하기위해 Potato파일의 컴포넌트를 복사후 App.js 파일에 컴포넌트를 붙여넣는후 Potato파일을 삭제한다

[ 9월 01일 ]
학습내용