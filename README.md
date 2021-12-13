# 유호철 201840221
##  [ 12월 08일 ]
### 학습내용

<b>조건부 렌더링</b>
- React에서는 렌더링 하려는 엘리먼트를 변수에 저장할 수 있다.
- element란 리액트의 가장 작은 단위로 화면에 표시할 내용을 작성한다.  
버튼 클릭으로 state를 로그인과 로그아웃으로 토글하는 앱이다.
```jsx
lass LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```
- 먼저 버튼을 나타내는 두개의 컴포넌트를 작성한다.
- LoginButton과 LogoutButton컴포넌트는 props를 전달받아 버튼의 이름을 갱신한다.
- Main Component인 LoginControl은 stateful 컴포넌트로 만든다
>  stateful component: state를 사용하는 컴포넌트. class형 컴포넌트를 말한다.  
   stateless component: state를 사용하지 않는 컴포넌트. 함수형 컴포넌를 말한다.
- state의 현재 상태에 맞게 LoginButton 혹은 LogoutButton을 변수에 저장한다.
- button에 저장된 엘리먼트와 함께 첫 번째 예제에서 작성한 메시지를 함께 반환한다

<b>논리 연산자 &&를 이용해서 if를 인라인으로 표현하기</b>
- JSX안에는 중괄호를 이용해서 JS표현식을 포함 할 수 있다.
- 논리 연산자 &&를 사용하면 쉽게 엘리먼트를 조건부로 넣을 수 있다.  
메일 제목을 배열에 저장하고, 배열의 크기가 0보다 크면 읽지 않은
메시지가 있다고 출력하는 앱이다.
```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```
- [조건] && [엘리먼트] 의 형태로 작성하여 조건이 true일 때만 엘리먼트를 출력한다.
> 주의할 것은 문서의 예처럼 조건을 false로 넣으면 && 뒤의 표현식은 반환하
지 않지만 false 표현식이 반환 된다는 것이다.

<b>조건부 연산자로 if-else구문을 인라인으로 표현하기</b>
- 엘리먼트를 조건부로 렌더링하는 또 다른 방법은 조건부 연산자인 condition ? true:
false 를 사용하는 것이다.(삼항 연산자)
```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```
가독성은 좀 떨어지지만, 더 큰 표현식에도 이 구문을 사용할 수 있다.
> 조건이 너무 복잡해 졌다는 것은 컴포넌트를 분리해야 하는 시점이라고 생각하자.
```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```
<b>컴포넌트가 렌더링되는 것을 막기</b>
* 다른 컴포넌트에 의해 어떤 컴포넌트가 렌더링되는 것을 숨기고 싶을 때가 있을 수
있다.
* 이 때는 렌더링 결과를 출력하는 대신 null을 반환하면 해결할 수 있다.  

warning이 발생하면 warning메시지를 출력하고, 정상이면 아무 것도 출력하지 않는 앱이다.
```jsx
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```
* WarningBanner컴포넌트는 메인 컴포넌트인 Page로 부터 props를 전달받아, false이
면 null을 반환하고, true이면 엘리먼트를 반환한다.
*  page컴포넌트는 버튼이 클릭되면 handleToggleClick 헨들러를 통해 showWarning
state를 토글하고, 그 상태와 함께 버튼의 메시지를 WarningBanner컴포넌트에 전달한다.
> null을 반환하는 것은 생명주기 메서드 호출에 영향을 주지 않는다.

---

<b>리스트와 Key</b>
* 배열의 값을 반환할 때는 map()함수를 사용한다. 변환하여 반환하는 것도 가능하다.
```jsx
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```
>  react에서 배열을 리스트로 만드는 방식도 이와 유사하다,

1. 여러개의 엘리먼트 렌더링 하기
* 배열로 부터 항목을 꺼네 < li >엘리먼트에 넣어 저장하고, 이 것을 < ul >엘리
먼트 안에 포함시켜 DOM에 렌더링한다.
```jsx
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```
2. 기본 리스트 컴포넌트
* numbers 배열을 받아서 순서 없는 엘리먼트 리스트를 출력하는 컴포넌트로 리팩토링할 수 있습니다.
```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
* 이 예제를 실행하면 key를 넣어야 한다는 경고가 뜬다.
* key props를 넣어 주면된다.
* 꼭 스트링으로 변환해 줘야 하는 것은 아니다.

3. key 
* Key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕는다.
* key는 엘리먼트에 고유성을 부여하기 위해 배열 내부의 요소에 지정해야 한다
* 일반적으로 항목이 고정적일 경우는 배열의 index값을 사용한다.
* 다만 항목의 순서가 바뀔 수 있는 경우는 index사용을 권장하지 않는다
* 이 것 때문에 성능이 저하되거나 컴포넌트의 state와 관련된 문제가 발생할 수 있기
때문이다.

4. Key로 컴포넌트 추출하기
*  ListItem 안에 있는 <li> 엘리먼트가 아니라 분해하는 곳의 <ListItem /> 엘
리먼트가 key를 가져야 한다.
```jsx
function ListItem(props) {
  // 맞습니다! 여기에는 key를 지정할 필요가 없습니다.
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 맞습니다! 배열 안에 key를 지정해야 합니다.
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

5. Key는 배열내 요소 사이에서만 고유한 값이면 된다
* Key는 배열내의 요소 사이에서 고유 하면 되고, 전체 범위에서 고유할 필요는 없다.
* 당연히 두 개의 다른 배열을 사용할 때 동일한 key를 사용할 수 있다
* 첫 번째 예는 sidebar와 content가 같은 key값을 사용하는 것을 보여준다.
* 컴포넌트에 key로 사용할 prop을 전달 할 수는 있지만 key자체를 전달할 수는 없다
* 아래 코드에서는 Post컴포넌트에서 props.id는 읽을 수 있지만, props.key는 읽을 수 없다.
```jsx
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```
* key값은 key로만 사용되어야 한다

6. JSX에 map() 포함시키기
* 별도의 listItems 변수를 선언하고 이를 JSX에 포함시키기
```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```
* JSX를 사용하면 중괄호 안에 모든 표현식을 포함 시킬 수 있으므로 map() 함수의 결
과를 인라인으로 처리할 수 있다
```jsx
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```
* 이 방식을 사용하면 코드가 깔끔해 지지만 사용에 주의를 해야한다
* 사용전에 가독성이 좋지 않다면 변수로 추출하는 것이 나을 수도 있다.

<b>Form</b>

* HTML의 form 엘리먼트는 내부 state를 갖기 때문에 React의 다른 DOM 엘리먼트와
는 다르게 동작한다.
* 아래 코드가 예가 순수한 HTML이라면이 폼은 name을 입력 받고, 폼을 제출하면 새
로운 페이지로 이동한다.
```jsx
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```
* React에서도 동일한 동작을 원한다면 그대로 사용해도 동작된다.
* 일반적인 경우라면 JS함수로 폼의 제출을 처리하고, 사용자가 폼에 입력한
데이터에 접근하도록 하는 것이 편리하다.
* 표준 방식은 “제어 컴포넌트 (controlled components)“를 사용하는 것이다.

1. 제어 컴포넌트
* HTML에서는 form의 각 엘리먼트는 사용자의 입력을 기반으
로 자신의 state를 관리하고 업데이트 한다.
* React에서는 변경할 수 있는 state가 컴포넌트의 state 속성에 저장되며,
setState()함수를 이용해서 업데이트 한다.
* 폼에서 사용되는 값을 React의 state로 일원화 하면 관리를 편하게 할 수 있
다
* React의 state를 통해 값이 제어되는 입력 폼 엘리먼트를 “제어 컴포넌트 (controlled
component)“라고 한다.
```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
* value에 표시되는 값은 this.state.value가 된다
* 한 입력값의 업데이트는 handleChange의 setState를 통해 이루어 진다.

2. textarea 태그
* HTML에서 textarea 엘리먼트는 텍스트를 DOM상에서의 자식으로 정의한다.
* React에서 textarea는 value 속성을 사용한다.
* react의 textarea는 싱글 태그를 사용하여 작성한다
> 문서에는 "생성자에서 초기화하기 때문에 textarea는 일부 텍스트를 가진채 시작되
는 점을 주의해주세요."라고 쓰여 있지만 꼭 초기 값이 있어야 되는 것은 아니다

3. select 태그

* HTML에서 select는 드롭 다운 목록을 만든다.
* HTML에서는 option 태그의 속성으로 selected를 사용하고 있으나, react에서는
select 태그의 속성으로 지정한다
* select의 value에 option의 value 값을를 지정해서 selected를 대신한다.
* state의 관리는 textarea와 동일하다.
> select 태그에 multiple 옵션을 허용하면, value 속성에 배열을 전달할 수 있다.
```jsx
<select multiple={true} value={['B', 'C']}>
```

4. file input 태그 
* HTML에서 < input type="file"> 은 사용자가 하나 이상의 파일을 로컬에서 서버로
업로드하거나, File API를 통해 JavaScript로 조작할 수 있다.
* 값이 읽기 전용이기 때문에 React에서는 비제어 컴포넌트 (uncontrolled
components)이다

5. 다중 입력 제어하기
* 여러개의 input 엘리먼트를 제어해야 한다면 각 엘리먼트에 name 속성을 추가하고,
event.target.name 값을 통해 핸들러가 어떤 작업을 할 지 선택할 수 있게 해준다
* 주어진 input 태그의 name에 일치하는 state를 업데이트하기 위해 ES6의 computed
property name 구문을 사용한다.
* setState()는 자동적으로 현재 state에 일부 state만을 갱신하기 때문에 바뀐 부
분에 대해서만 호출하면 된다.

6. 제어되는 Input Null 값
* 제어 컴포넌트에 value prop을 지정하면 의도하지 않는 한 사용자가 변경할 수 없다.
* value를 설정했는데 여전히 수정할 수 있다면, 실수로 value를 undefined나 null로 설
정했을 수 있다

7. 제어 컴포넌트의 대안
* 데이터를 변경할 수 있는 모든 방법에 대해 이벤트 핸들러를 작성하고, React 컴포넌
트를 통해 모든 입력 상태를 연결해야 하기 때문에 때로는 제어 컴포넌트를 사용하
는 게 불편할 수도 있다
* 이럴경우에 입력 폼을 구현하기 위한 대체 기술인 비제어 컴포넌트 (uncontrolled
components)를 사용할 수 있다.
> 해결책: Formik 프레임워크 사용을 권장한다.

<b>sate를 parents component로 올리기</b>

* 때로는 동일한 데이터에 대한 변경사항을 여러 컴포넌트에 반영해야 할 필요가 있
다이럴 때는 가장 가깝고, 공통된 parents component로 state를 올리는 것이 좋다.  

주어진 온도에서 물의 끓는 여부를 추정하는 온도 계산기를 만들기.
* BoilingVerdict라는 이름의 컴포넌트를 만들고 섭씨온도를 의미하는 celsius prop를 받아서 이 온도가 물이 끓기에 충분한지 여부를 출력한다.
```jsx
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```
* Calculator라는 컴포넌트를 만들어보자. 이 컴포넌트는 온도를 입력할 수 있는 < input >을 렌더링하고 그 값을 this.state.temperature에 저장한다.
* 현재 입력값에 대한 BoilingVerdict 컴포넌트를 렌더링한다.
```jsx
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```
두 번째 Input 추가하기
* 섭씨 입력 필드뿐만 아니라 화씨 입력 필드를 추가하고 두 필드 간에 동기화 상태를 유지하도록 해보자.
* Calculator에서 TemperatureInput 컴포넌트를 빼내는 작업부터 시작해봅시다. 또한 "c" 또는 "f"의 값을 가질 수 있는 scale prop를 추가.
```jsx
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```
* Calculator가 분리된 두 개의 온도 입력 필드를 렌더링하도록 변경할 수 있다.
```jsx
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```
* 두 개의 입력 필드를 갖게 되었지만 둘 중 하나에 온도를 입력하더라도 다른 하나는 갱신되지 않는 문제가 있다.  두 입력 필드 간에 동기화 상태를 유지하고자 했던 원래 요구사항과는 맞지 않다.

변환 함수 작성하기
* 섭씨를 화씨로, 또는 그 반대로 변환해주는 함수를 작성해보자.
```jsx
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```
* 두 함수는 숫자를 변환한다.

올바르지 않은 temperature 값에 대해서는 빈 문자열을 반환하고 값을 소수점 세 번째 자리로 반올림하여 출력한다.
```jsx
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```
* tryConvert('abc', toCelsius)는 빈 문자열을 반환하고 tryConvert('10.22', toFahrenheit)는 '50.396'을 반환한다.

State 끌어올리기
* 두 TemperatureInput 컴포넌트가 각각의 입력값을 각자의 state에 독립적으로 저장하고 있습니다.
```jsx
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...
```
* 우리는 두 입력값이 서로 동기화된 상태로 있길 원한다. 섭씨온도 입력값을
변경할 경우 화씨온도 입력값 역시 변환된 온도를 반영할 수 있어야 하며, 그 반대의
경우에도 마찬가지여야 한다.
* React에서 state를 공유하는 일은 그 값을 필요로 하는 컴포넌트 간의 가장 가까운
공통 조상으로 state를 끌어올림으로써 구현할 수 있다. 이 방법을 “state 끌어올
리기”라고 부른다.
* 이제 TemperatureInput이 개별적으로 가지고 있던 지역 state를 지우는 대신
Calculator로 그 값을 옮기도록 한다.
* 부모인 Calculator가 공유될 state를 소유하고 있으면, 이 컴포넌트는 두 입력 필드의
현재 온도에 대한 state로 작동하게 된다.
* 이를 통해 두 입력 필드가 서로 간에 일관된 값을 유지하도록 만들 수 있다.
* TemperatureInput 컴포넌트의 props가 같은 부모인 Calculator로부터 전달되기
때문에, 두 입력 필드는 항상 동기화된 상태를 유지할 수 있게 된다

<b>합성 (Composition) vs 상속 (Inheritance)</b>

* React는 강력한 합성 모델을 갖고 있으며, 상속 대신 합성을 사용하여 컴포넌트 간에
코드를 재사용하는 것이 좋다.
* React를 처음 접한 개발자들이 종종 상속으로 인해 부딪히는 몇 가
지 문제들과 합성을 통해 이러한 문제를 해결하는 방법을 살펴본다.

1. 컴포넌트에 다른 컴포넌트 담기

* 컴포넌트들 중에는 어떤 자식 엘리먼트가 들어올 지 미리 예상할 수 없는 경우가 있
다.
* 범용적인 ‘박스’ 역할을 하는 Sidebar 혹은 Dialog와 같은 컴포넌트에서 특히 자주 볼
수 있다.
* 이러한 컴포넌트에서는 특수한 children prop을 사용하여 자식 엘리먼트를 출력에
그대로 전달하는 것이 좋다.
```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```
* 이러한 방식으로 다른 컴포넌트에서 JSX를 중첩하여 임의의 자식을 전달할 수 있다.
```jsx
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```
* < FancyBorder > JSX 태그 안에 있는 엘리먼트가 FancyBorder 컴포넌트의 children
prop으로 전달된다.
* FancyBorder는 {props.children}을 <div> 안에 렌더링하므로 전달된 엘리먼트들이
최종 출력된다.
* 흔하진 않지만 종종 컴포넌트에 여러 개의 “자리(holes)”가 필요할 수도 있습니다. 이
런 경우에는 children 대신 자신만의 고유한 방식을 적용할 수도 있다.
```jsx
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```
* < Contacts />와 < Chat />같은 React 엘리먼트는 단지 객체이기 때문에 다른 데이터
처럼 prop으로 전달할 수 있다.
* 이러한 접근은 다른 라이브러리의 “슬롯 (slots)“과 비슷해보이지만, React에서 prop
으로 전달할 수 있는 것에는 제한이 없다.

2. 특수화
* 경우에 따라 어떤 컴포넌트는 “특수한 경우”를 고려해야 하는 경우가 있습니다. 예를
들어, WelcomeDialog는 Dialog의 특수한 경우라고 할 수 있다.
* React에서는 합성을 통해 해결할 수 있다.
* 더 “구체적인” 컴포넌트가 “일반적인” 컴포넌트를 렌더링하고 props를 통해 내용을
구성한다
```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```
3. 상속은?

* Facebook에서는 수천 개의 React 컴포넌트를 사용하지만, 컴포넌트를 상속 계층 구
조로 작성을 권장할만한 사례를 아직 찾지 못했다.
* props와 합성은 명시적이고도 안전한 방법으로 컴포넌트의 모양과 동작을 커스터마
이징하는데 필요한 모든 유연성을 제공한다.
* 컴포넌트가 원시 타입의 값, React 엘리먼트 혹은 함수 등 어떠한 props도 받을 수 있
다는 것을 기억하자.
* UI가 아닌 기능을 여러 컴포넌트에서 재사용하기를 원한다면, 별도의 JavaScript 모
듈로 분리하는 것이 좋다.
* 컴포넌트에서 해당 함수, 객체, 클래스 등을 import 하여 사용할 수 있다
> 상속받을 필요가 없다.

<b>React로 사고하기</b>

* React는 JavaScript로 규모가 크고 빠른 웹 애플리케이션을 만드는 가장 좋은 방법이
다
* React는 Facebook과 Instagram을 통해 확장성을 입증했다.
* React의 가장 멋진 점 중 하나는 앱을 설계하는 방식이다.
*  React로 상품들을 검색할 수 있는 데이터 테이블을 만드는 과정을 함
께 생각해 보자

1. UI를 컴포넌트 계층 구조로 나누기
* 우리가 할 첫 번째 일은 하위 컴포넌트를 포함한 모든 컴포넌트의 주변에 박스를 그
리고 그 각각에 이름을 붙인다.
* 우리가 새로운 함수나 객체를 만들 때처럼 만들면 된다
* 한 가지 테크닉은 단일 책임 원칙이다.
* 이는 하나의 컴포넌트는 한 가지 일을 하는게 이상적이라는 원칙이다. 하나의 컴포넌트가 점점 커지게 된다면 보다 작은 하위 컴포넌트로 분리하는 것이
바람직하다.

2.  React로 정적인 버전 만들기
* 가장 쉬운 방법은 데이터 모델을 가지고 UI를 렌더링은 되지만 아무 동작도 없는 버
전을 만들어보는 것이다.
* 이처럼 과정을 나누는 것이 좋은데, 정적 버전을 만드는 것은 생각은 적게 필요하지
만 타이핑은 많이 필요로 하고, 상호작용을 만드는 것은 생각은 많이 해야 하지만 타
이핑은 적게 필요로 하기 때문이다.
* 데이터 모델을 렌더링하는 컴포넌트를 만들고 props 를 이용해 데이터를 전달해 준
다.
* props는 부모가 자식에게 데이터를 넘겨줄 때 사용할 수 있는 방법이다
* 정적 버전을 만들기 위해 state를 사용하지 말자
* state는 오직 상호작용을 위해, 즉 시간이 지남에 따라 데이터가 바뀌는 것에 사용한
다.
* 우리는 앱의 정적 버전을 만들고 있기 때문에 지금은 필요하지 않다

3. UI state에 대한 최소한의 (하지만 완전한) 표현 찾아내기
* UI를 상호작용하게 만들려면 기반 데이터 모델을 변경할 수 있는 방법이 있어야 한
다.
* React에서는 이를 state를 통해 변경한다.
* 애플리케이션을 올바르게 만들기 위해서는 애플리케이션에서 필요로 하는 변경 가
능한 state의 최소 집합을 생각해보아야 한다.
> 여기서 핵심은 중복배제원칙이다.
* 애플리케이션이 필요로 하는 가장 최소한의 state를 찾고 이를 통해 나머지 모든 것
들이 필요에 따라 그때그때 계산되도록 만드는 것이다
* 예를 들어 TODO 리스트를 만든다고 하면, TODO 아이템을 저장하는 배열만 유지하
고 TODO 아이템의 개수를 표현하는 state를 별도로 만들지 않는다. TODO 갯수를
렌더링해야한다면 TODO 아이템 배열의 길이를 가져오면 된다.

4. State가 어디에 있어야 할 지 찾기
* 앞서 최소한으로 필요한 state가 뭔지 찾아낸다.
* 다음으로는 어떤 컴포넌트가 state를 변경하거나 소유할지 찾아야 한다.
> React는 항상 컴포넌트 계층구조를 따라 아래로 내려가는 단방향 데이터 흐름을 따른다.
* 어떤 컴포넌트가 어떤 state를 가져야 하는 지 바로 결정하기 어려울 수도 있다.
* * <b>애플리케이션이 갖는 각각의 state에 대해서</b>
* * state를 기반으로 렌더링하는 모든 컴포넌트를 찾는다
* * 공통 소유 컴포넌트 (common owner component)를 찾는다
* * > 계층 구조 내에서 특정 state가 있어야 하는 모든 컴포넌트들의 상위에 있는 하나의
* * 공통 혹은 더 상위에 있는 컴포넌트가 state를 가져야 한다.
* * state를 소유할 적절한 컴포넌트를 찾지 못했다면, state를 소유하는 컴포넌트를 하
나 만들어서 공통 오너 컴포넌트의 상위 계층에 추가한다.

5. 역방향 데이터 흐름 추가하기
* 지금까지 우리는 계층 구조 아래로 흐르는 props와 state를 이용해서 앱을 만들었다
* 다른 방향의 데이터 흐름을 만들어볼 시간이다
* 계층 구조의 하단에 있는 폼 컴포넌트에서 FilterableProductTable의 state를 업데이
트할 수 있어야 한다.
* React는 전통적인 양방향 데이터 바인딩(two-way data binding)과 비교하면, 더 많
은 타이핑을 필요로 하지만 데이터 흐름을 명시적으로 보이게 만들어서 프로그램이 어떻게 동작하는지 파악할 수 있게 도와준다.

<b>Hook의 개요</b>

* Hook은 React 버전 16.8부터 React 요소로 새로 추가되었다.
* 기존 Class 바탕의 코드를 작성할 필요 없이 상태 값과 여러 React의 기능을 사용할 수 있다.
```jsx
import React, { useState } from 'react';

function Example() {
  // "count"라는 새로운 상태 값을 정의합니다.
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
> useState는 우리가 “Hook”에서 처음 배우게 될 함수다
* Hook의 특징

  1. 선택적 사용 기존의 코드를 다시 작성할 필요 없이 일부의 컴포넌트들 안에서 Hook을 사용할 수 있다.
  2. 100%이전버전과의 호환성 Hook은 호환성을 깨뜨리는 변화가 없다.
  3. 현재 사용 가능 Hook은 배포 v16.8.0 에서 사용할 수 있다.
## [ 12월 01일 ]
### 학습내용 

<b>컴포넌트 추출</b>
```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```
- 위 컴포넌트는  author(객체), text(문자열) 및 date(날짜)를 props로 받은후 소셜 미디어 웹 사이트의 코멘트를 나타낸다.
- 위 컴포넌트는 구성요소들이 모두 중첩 구조로 이루어져 있어 변경하기 어려울 수 있다. 
- 각 구성요소를 개별적으로 재사용하기도 힘들다. 

Avatar를 추출
```jsx
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```
- Avatar컴포넌트를 추출하여 props의 값을 user로 변경할 수 있다.
```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```
- Comment 컴포넌트의 UserInfo부분에 <Avatar user={props.author} />을 추가하여 단순화 시킬수 있다.

UserInfo 컴포넌트를 추출
```jsx
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

컴포넌트 최종 단순화
```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

<b>props는 읽기 전용이다</b>
- 함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안 된다.
- 아래 sum 함수를 살펴보자.
```jsx
function sum(a, b) {
  return a + b;
}
```
- 이런 함수들은 순수 함수라고 호칭한다. 입력값을 바꾸려 하지 않고 항상 동일한 입력값에 대해 동일한 결과를 반환하기 때문이다.
```jsx
function withdraw(account, amount) {
  account.total -= amount;
}
```
- 다음 함수는 자신의 입력값을 변경하기 때문에 순수 함수가 아니다.
- 모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 한다.

<b>State and Lifecycle</b>
- Clock 컴포넌트를 완전히 재사용하고 캡슐화하는 방법을 배워보자.  

첫번째 예제
```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```
두번째 예제
```jsx
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```
- 첫번째 예제와 두번째 예제의 큰 차이점은 없다.
- Clock이 스스로 업데이트하도록 하기위해 Clock 컴포넌트에 “state”를 추가해야 한다.
- State는 props와 유사하지만, 비공개이며 컴포넌트에 의해 완전히 제어된다.

함수에서 클래스로 변경하기
- React.Component를 확장하는 동일한 이름의 ES6 class를 생성한다.
- render()라고 불리는 빈 메서드를 추가한다.
- 함수의 내용을 render() 메서드 안으로 옮긴다.
- render() 내용 안에 있는 props를 this.props로 변경한다.
- 남아있는 빈 함수 선언을 삭제한다.
```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

클래스에 로컬 state 추가하기

1.render() 메서드 안에 있는 this.props.date를 this.state.date로 변경한다.
```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
2.초기 this.state를 지정하는 class constructor를 추가한다.
```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
- props를 기본 constructor에 전달하는지 유의한다.
- 클래스 컴포넌트는 항상 props로 기본 constructor를 호출해야 한다.  

3.< Clock /> 요소에서 date prop을 삭제한다.
```jsx
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
4.완성된 결과물
```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
- tick()메서드가 들어가지 않아 현재시간만 표시되고 시간에 따른 변화가 없다.

<b>생명주기 메서드를 클래스에 추가하기</b>
- Clock이 처음 DOM에 렌더링 될 때마다 타이머를 설정하려고 합니다. 이것은 React에서 “마운팅”이라고 한다.
- 또한 Clock에 의해 생성된 DOM이 삭제될 때마다 타이머를 해제하려고 합니다. 이것은 React에서 “언마운팅”이라고 한다.
```jsx
componentDidMount() {
}

componentWillUnmount() {
}
```
- 이러한 메서드들은 “생명주기 메서드”라고 불린다.
- componentDidMount() 메서드는 컴포넌트 출력물이 DOM에 렌더링 된 후에 실행됩니다. 이 장소가 타이머를 설정하기에 좋은 장소이다.  

- componentDidMount() 메서드
```jsx
componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```
- componentWillunmount() 메서드
```jsx
componentWillUnmount() {
  clearInterval(this.timerID);
}
```
- Clock 컴포넌트가 매초 작동하도록 하는 tick()이라는 메서드를 구현한다.
```jsx
tick() {
    this.setState({
      date: new Date()
    });
  }
```
- tick()이라는 메서드를 구현함으로써 시계가 매초 마다작동한다.
- 최종 결과물
```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
<b>메서드가 어떻게 호출되는지 순서대로 빠르게 요약</b>
1. < Clock />가 ReactDOM.render()로 전달되었을 때 React는 Clock 컴포넌트의 constructor를 호출하여 this.state를 초기화한다.
2. React는 Clock 컴포넌트의 render() 메서드를 호출하여 React는 화면에 표시되어야 할 내용을 알게 된후 Clock의 렌더링 출력값을 일치시키기 위해 DOM을 업데이트한다.
3. Clock 출력값이 DOM에 삽입되면, React는 componentDidMount() 생명주기 메서드를 호출 한후 Clock 컴포넌트는 매초 컴포넌트의 tick() 메서드를 호출하기 위한 타이머를 설정하도록 브라우저에 요청한다.
4. 매초 브라우저가 tick() 메서드를 호출하고 그 안에서 Clock 컴포넌트는 setState()에 현재 시각을 포함하는 객체를 호출하여 DOM을 업데이트한다.
5. Clock 컴포넌트가 DOM으로부터 한 번이라도 삭제된 적이 있다면 React는 타이머를 멈추기 위해 componentWillUnmount() 생명주기 메서드를 호출한다.

<b>State를 올바르게 사용하기</b>
- 직접 State를 수정하지 않기
> this.state를 지정할 수 있는 유일한 공간은 바로 constructor이다.
```jsx
// Wrong
this.state.comment = 'Hello';
// Correct
this.setState({comment: 'Hello'});
```
- State 업데이트는 비동기적일 수도 있다.
> React는 성능을 위해 여러 setState() 호출을 단일 업데이트로 한꺼번에 처리할 수 있다.  
this.props와 this.state가 비동기적으로 업데이트될 수 있기 때문에 다음 state를 계산할 때 해당 값에 의존해서는 안 된다.
```jsx
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
// Correct1
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
// Correct2
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```
- State 업데이트는 병합이된다.
> setState()를 호출할 때 React는 제공한 객체를 현재 state로 병합한다.  
병합은 얕게 이루어지기 때문에 this.setState({comments})는 this.state.posts에 영향을 주진 않지만 this.state.comments는 완전히 대체됩니다.


```jsx
constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```
- 데이터는 아래로 흐른다.
> 1. 부모 컴포넌트나 자식 컴포넌트 모두 특정 컴포넌트가 유상태인지 또는 무상태인지 알 수 없고, 그들이 함수나 클래스로 정의되었는지에 대해서 관심을 가질 필요가 없다.  
이 때문에 state는 종종 로컬 또는 캡슐화라고 불린다.  
state가 소유하고 설정한 컴포넌트 이외에는 어떠한 컴포넌트에도 접근할 수 없다.  
> 2. 컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달할 수 있습니다.
> 3.  이를 “하향식(top-down)” 또는 “단방향식” 데이터 흐름이라고 한다.
> 4. React 앱에서 컴포넌트가 유상태(stateful) 또는 무상태(stateless)에 대한 것은 시간이 지남에 따라 변경될 수 있는 구현 세부 사항으로 간주한다.
> 5. 유상태(stateful) 컴포넌트 안에서 무상태(stateless) 컴포넌트를 사용할 수 있으며, 그 반대 경우도 마찬가지로 사용할 수 있다.

<b>이벤트 처리</b>
- React 엘리먼트에서 이벤트를 처리하는 방식은 DOM 엘리먼트에서 이벤트를 처리하는 방식과 매우 유사하다.
- 몇가지 문법 차이점
> 1. React의 이벤트는 소문자 대신 캐멀 케이스(camelCase)를 사용합니다.
> 2. JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달합니다.
> 3. React에서는 false를 반환해도 기본 동작을 방지할 수 없으며, 반드시 preventDefault를 명시적으로 호출해야 한다.
> 4. React를 사용할 때 DOM 엘리먼트가 생성된 후 리스너를 추가하기 위해 addEventListener를 호출할 필요가 없다. 대신, 엘리먼트가 처음 렌더링될 때 리스너를 제공하면 된다.

## [ 11월 24일 ]
### 학습내용

<b>creat-react-app으로, Remarkable 사용하기</b>

  1.creat-react-app으로 markdown-editor 프로젝트를 생성한다.  
  2.정상적으로 잘 작동하는지 확인한다.  
  3.App.js에 필요없는 코드를 삭제후 React홈 문서의 코드를 복사한다.  
  4.component의 이릉을 App으로 수정한다.  
  5.rendering부분은 index.js에 위임한다.
  6.App.js에 React와 Remarkable을 import한다.  
  7.정상적으로 잘 작동하는지 확인한다.

<b>Markdown코드 예제</b>  
외부 컴포넌트를 사용하기 위해 생성자 내에 객체를 생성한다.
```
class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.md = new Remarkable();
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: 'Hello, **world**!' };
  }
```
state를 이용하여 Remarkable에 변환할 마크다운 문장을 제출한다.  
```
handleChange(e) {
    this.setState({ value: e.target.value });
  }
```
글이 입력되면 handleChange 이벤트를 사용하여 state의 value를 갱신한다.   
```
getRawMarkup() {
    return { __html: this.md.render(this.state.value) };
  }
```
getRawMarkup() 메소드를 통해 html을 반환 받는다.  
```
render() {
    return (
      <div className="MarkdownEditor">
        <h3>Input</h3>
        <label htmlFor="markdown-content">
          Enter some markdown
        </label>
        <textarea
          id="markdown-content"
          onChange={this.handleChange}
          defaultValue={this.state.value}
        />
        <h3>Output</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={this.getRawMarkup()}
        />
      </div>
    );
  }
}
```

<b>React 시작해보기</b>
- React는 점진적으로 적용 할수 있도록 설계되어있어 필요한 만큼의 React를 사용할수 있다.
- 온라인 코드 편집기를 사용할수 있다.
- 대규모 애플리케이션에 권장되는 여러 개의JavaScript 툴체인들이 있다.
- 각 툴 체인들은 많은 설정 없이 작동할 수 있고 풍부한 React 에코시스템을 최대한으로 사용할 수 있다

<b>React 개요</b>

  1.주요개념  
  2.고급개념  
  3.API참고  
  4.Hook

<b>React 주요 개념</b>

1.Hello world
- 가장 단순한 React예시
-  ```ReactDOM.render(<h1>Hello, world!</h1>,document.getElementById('root'));```
-  “Hello, world!”라는 제목을 보여주는 코드이다.

2.JSX소개
- 변수 ```const element = <h1>Hello, world!</h1>;```
- 위 희한한 태그 문법은 문자열도,HTML도 아니다
- JSX이며 JavaScript를 확장한 문법이다.
- UI가 어떻게 생겨야 하는지 설명하기 위해 React와 함께 사용할 것을 권장한다. 
- JSX라고 하면 템플릿 언어가 떠오를 수도 있지만, JavaScript의 모든 기능이 포함되어 있다.
- JSX는 React “엘리먼트(element)”를 생성한다.

3.JSX에 표현식 포함하기
- ```const name = 'Josh Perez';```, ```const element = <h1>Hello, {name}</h1>;```
- JSX의 중괄호 안에는 유효한 모든 JavaScript 표현식을 넣을 수 있다.
- 예를 들어 2 + 2, user.firstName 또는 formatName(user) 등은 모두 유효한 JavaScript 표현식이다.
```JSX
//JSX예시
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

3.엘리먼트 렌더링
- 엘리먼트는 React 앱의 가장 작은 단위이다.
```jsx
<div id="root"></div>
```
- React 엘리먼트를 루트 DOM 노드에 렌더링하려면 둘 다 ReactDOM.render()로 전달해야한다.

4.Components와 Props
- 개념적으로 컴포넌트는 JavaScript 함수와 유사하다. 
- “props”라고 하는 임의의 입력을 받은 후, 화면에 어떻게 표시되는지를 기술하는 React 엘리먼트를 반환한다.
```jsx
//함수 컴포넌트
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
//클래스 컴포넌트
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
- React의 관점에서 볼 때 위 두 가지 유형의 컴포넌트는 동일하다.

## [ 11월 17일 ]
### 학습내용
#### 17일 수업을 개인사정으로 인해 빠져서 내용이 부실할 수도 있는 점 양해 부탁드립니다

<b>상태를 가지는 컴포넌트</b>

- this.props를 이용해 입력데이터를 다루는것 외에도 내부적인 상태를 가질 수 있다.
이는 this.props로 접근 가능하다.
- 컴포넌트의 상태 데이터가 바뀌면 render()가 다시 호출되어 마크업이 갱신된다.

<b>애플리케이션</b>

- props와 state를 사용해서 간단한 Todo 애플리케이션을 만들 수 있습니다.
- 이벤트 핸들러들이 인라인으로 각각 존재하는 것처럼 보이지만, 실제로는 이벤트 위임을 통해 하나로 구현된다.

<b>Todo List 예제</b>  
Todoapp과 Todolist 두개의 컴포넌트로 구성  
handleChange는 모든 키보드 입력마다 React의 state를 갱신해서 보여준다.
> element요소에서 확인 가능하다

다음과 같은 시간순으로 동작한다.
> 유저입력 > handleChange > React의 state갱신 > form element가 React state를 참조

```jsx
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
      </div>
    )
  }
```
- render메소드에서 초기 렌더링을 실행한다.
- onChange에서 input에 입력되는 값으로 state상태 변경을 준비한다.
- 입력된 값은 state의 text:''에 입시로 저장된다.
- label의 htmlFor는 input과 연결을 위한 id 값이다.
> className처럼 html과 구분하기 위한 jsx키워드이다.
- button을 클릭하면 #뒤의 숫자를 증가시킨다.
- 리스트는 배열로 저장되기 때문에  item.length로 list의 수를 확인한다.
- input area의 이벤트가  발생하면 handleChange(e)가 동작하여 State의 text값을 변경한다.
```jsx
handleChange(e) {
    this.setState({ text: e.target.value });
  }
```
- “Add #x”을 클릭하면 리스트에 1을 더해서 버튼에 출력한다.
- 크롬 DevTool에서 stete가 변화하는것을 실시간으로 확인해본다.
```jsx
handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    }
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }))
  }
}
```
- handleSubmit은 버튼이 클릭될때 발생하는 event처리를 한다.
> handleSubmit(e)에서 e.preventDefault()메소드를 사용하는 이유
> >브라우저에서 양식을 제출할 때는 기본적으로 브라우저의 새로 고침이 발생하는데,
    React나 SPA(single page application)의 경우 필요 없는 동작임으로 필요없는 동작을 방지하기위해 사용한다.

<b>TodoList Component</b>
```jsx
class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    )
  }
}
```
- TodoList class를 생성한다
- ul 안에 추가된 task를 li로 출력한다
- 앞서 저장한 id값은 key props로 사용한다.
- ReactDOM으로 랜더링만 하면 끝난다
```jsx
ReactDOM.render(
  <TodoApp />,
  document.getElementById('todos-example')
);
```

<b>key props 역할 리마인드</b>
- key는 props의 안정적으로 사용할 수 있도록 고유성을 부여하기 위해 필요하다
- React가 어떤 props를 변경, 추가 또는 삭제할지 식별하는 것을 도와준다
- 반드시 date를 사용하지 않아도 되고 배열의 index값을 사용해도 된다
- 유일한 값이라면 그 값이 무엇이든 상관없다.

<b>외부 플러그인을 사용하는 컴포넌트</b>
- React는 유연하며 다른 라이브러리나 프레임 워크로 함께 사용할 수 있다.
- 이 예제에서는 외부 마크다운 라이브러리인 remarkable을 사용해 <textarea>의 값을 실시간으로 변환한다.

<b>Markdown 예제<b>
- 외부컴포넌트를 사용한 markdown에디터 이다
- 외부 플러그인은 Remarkable을 사용함으로 CDN으로 링크를 추가한다.
```jsx

    class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props);
        this.md = new Remarkable();
        this.handleChange = this.handleChange.bind(this);
        this.state = { value: 'Hello, **world**!' };
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    getRawMarkup() {
        return { __html: this.md.render(this.state.value) };
    }

    render() {
        return (
        <div className="MarkdownEditor">
            <h3>Input</h3>
            <label htmlFor="markdown-content">
            Enter some markdown
            </label>
            <textarea
            id="markdown-content"
            onChange={this.handleChange}
            defaultValue={this.state.value}
            />
            <h3>Output</h3>
            <div
            className="content"
            dangerouslySetInnerHTML={this.getRawMarkup()}
            />
        </div>
        );
    }
    }

    ReactDOM.render(
    <MarkdownEditor />,
    document.getElementById('markdown-example')
    )
```

## [ 11월 12일 ]
### 학습내용
<b>영화앱 상세 정보 기능 만들기</b>

    1.주소창에 localhost:3000를 입력하여 이동한 다음 console탭에서 history에 출력된 값을 확인한다.
    2.Detail을 컴포넌트로 변경후 location, history키를 구조 분해 할당한다.
    3.loaction이 undefined인 경우history.push("/")를 실행한다.
    4./movie-detail입력한후 Home으로 돌아가는지 확인한다.
    5.location.state.title을 출력하도록 교재와 같이 코드를 작성한다.
    6./movie-detail로 다시 들어가 확인한다.
    - TypeError. Cannot read property 'title' of undefined라는 오류가 발생한다.
    -render() -> componentDidMount()의 순서로 함수가 실행되기 때문이다
    7.location함수가 없으면 null을 반환하여 Home으로 돌아오도록 if문을 사용하여 수정한다.

<b>영화앱 배포하기</b>

    1.package.json에 homepage키와 키값을 browserslist 키 아래 추가한다.
    2.script에 키값명령어를 추가한다.
    3.git add ., git commit -m "",  git push origin master 명령어를 추가하여 깃허브에 업로드 한다
    4.npm install gh-pages로 gh-pages를 설치한다.
    5.git remote -v로 업로드한 깃허브 저장소의 주소를 확인한다.
    6.npm run build로 build파일을 생성한다.
    7.npm run deploy로 영화앱을 배포한다.
    8.https://계정.github.io/저장소 이름를 입력하여 영화앱을 확인한다.

<b>CDN: Content Delivery Network 혹은 Content Distribution Network</b>
    
    1. html파일을 새로만든다 
    2. minify파일 링크를 사용한다.
    3. crossorigin적용한다.
    4. babel을 CDN으로 적용한다.
    5. type을 text/babel로 설정한다.

<b>state가 포함된 component</b>

    1.동적인 데이터는 this.state로 접근 할 수 있다.
    2.state가 변하면 redner에서 다시 호출되어 화면이 갱신된다.
    3.화면이 켜져잇는 동안 초를 카운트 하는 앱은 timer이다.
    4.state를 0으로 출력하여 초기화 한다
    5.componentDidMount()로 1초에 한번씩tick()메소드를 호출한다.
    6.tick메서드는 setState()를 통해 1씩 증가시킨다.

## [ 11월 03일 ]
### 학습내용
<b>네비게이션 스타일링</b>

    1.App.js파일에 Navigation컴포넌트가 HashRouter바깥에 위치했는 확인후 바깥쪽에 있으면 안쪽으로 변경한다
    2.component파일에 Navigation.css파일을 추가하고 내용을 교제와 같이 작성한다.
    3.이후 Navigation.js에 css를 임포트후 div태그에 클래스를 추가한다

<b>영화 상세 정보 기능 만들기</b>

    1.about.js에 props를 추가하여 어떤 props가 넘어오는지 확인한다.
    2.Navigation.js에 /about으로 보내주는 Link컴포넌트의 to props를 수정한다
    - <Link to={{pathname:'/about', state:{fromNavigation:true}}}>About</Link>로 수정
    3./about으로 이동후 console탭에서 location을 확안해 state키에 보내준 값을 확인한다.
    4.Navigation컴포넌트를 원래대로 돌려 놓는다
    5.Movie컴포넌트에 Link컴포넌트를 임포트하고 Link컴포넌트에 props를 추가한다.
    -div태그 아래에 <Link to={{pathname:'/movie-detail', state:{year,title,summary,poster,genres},}}>를 추가한다.
    6.route폴더에 Detail.js추가하고 Detail 컴포넌트에 console을 추가하여 Movie 컴포넌트에서 Link 컴포넌트가 보내준 영화 데이터를 확인한다.
    7.App.js에 Detail컴포넌트를 임포트하고 Route컴포넌트에 Detail컴포넌트를 교제와 같이 추가한다.
    8.영화 카드를 클릭해서 /movie-detail주소를 확인하고 화면에 hello라는 Detail 컴포넌트가 출력되는지 확인한다.
    이후 console탭에서 location->state에 Movie 컴포넌트에서 Link를 통해 보내준 데이터를 확인한다.
    9.주소창에 /movie-detail로 바로 접속후 console탭에 영화 데이터가 들어있는지 확인한다.
    -영화의 데이터가 없어 state가 undefined으로 나온다.
## [ 10월 27일]
### 학습내용

<b>영화앱 다듬기</b>

    1.console탭에 오류는 key props추가하지 않아서 발생
    -genre는 li엘리먼트에 제공할 key값이 없으므로 map함수에 두번째 인자를 전달
    2.genres.map에 index값을 추가후 li엘리먼트에 key={index}추가
    -genres.map((genre, index)), <li key={index} className='movie-genres'>{genre}</li> 로 수정
    3.이후 console탭에 key props 오류가 있는지 확인

<b>영화앱 스타일링</b>

    1.App.css와 Movie.css를 교제와 같이 스타일링하기
    -https://github.com/easysIT/do_it_clonecoding_movieapp/tree/master/clone-starter-kit-07/src에서 css코드 확인후 해석 해보기
    2. 시놉시스에 글자수 제한두고 잘린부분은...으로 표현 위해 summary porps에 slice함수 추가
    -<p className ='movie-summary'>{summary.slice(0,180)}...</p> 로 수정
    3.브라우저 탭의 React App을 확인후 Moive App으로 바꾸기
    4.index.html파일에서 title엘리먼트 안에 React를 Moive로 변경후 크롬 탭 확인하기 
    -<title>Movie App</title>으로 수정

<b>영화앱 여러 기능 추가하기</b>

    1.화면 이동을 추가 하기위해 라우터 를 설치하기
    -npm install react-router-dom으로 설치후 package.json에서 설치 되엇는지 확인하기
    2.컴포넌트 역할에 맞게 파일 생성후 컴포넌트 분리하기
    -conponent에는 moive.css및.js를 routes폴더에는 Home.js및About.js파일 생성
    3.Home.js파일에 App.js내용을 복사하여 붙여놓은후 몇몇 소스 수정 및 추가 하기.
    -export default Home,import Movie from '../components/Movie',import './Home.css',class Home extends React.Component
    4.component폴더에 Home.css파일을 생성후 교제와 같이 파일 작성하기
    5.App.js를 초기화후 Home을 반환하도록 코드 수정후 실행화면 확인
    6.App에 HashRouter와Route 를 임포트 한후 HashRouter컴포넌트가 Route컴포넌트를 반환 하도록수정한다
    -주소창에 #/이 붙은걸을 확인하기
    7.About컴포넌트를 임포트후 Route컴포넌트에 path와component props전달하기
    -<Route path="/about"  component={About} />로 수정
    8.About.js를 교제와 같이 수정후 라우터 테스트 해보기
    -주소창에 /about을 추가하여 Route컴포넌트에 전달한 props확인하기
    9.App컴포넌트에 Home컴포넌트 임포트후 또 다른 Route컴포넌트 추가하기.
    -<Route path="/" component={Home}/> /를 넣은 이유는 기본으로 보여줄 컴포넌트가 Home이기때문이다
    10.영화앱 화면이랑 /about을 추가후 화면 확인해보기
    -/about으로 접속하면 About컴포넌트와 Moive컴포넌트와 같이 출력된다
    11.Route컴포넌트를 교제와 같이 추가후 라우터 테스트 해보기
    12.추가한 Route컴포넌트를 원래대로 돌려넣은후 path props가 /인 Route컴포넌트에 exact={ture}추가하기
    -<Route path="/" exact={true} component={Home}/>로 수정
    13.이후 /about에 접속하여 About컴포넌트만 보이는 확인
    14.routes폴더에 About.css추가후 교제와 같이 css작성하고 About.js에 임포트및 class지정하기

<b>내비게이션 만들기</b>

    1.component폴더에 Navigation.js추가후 a엘리먼트를 반환하도록 교제와 같이 작성
    2.App컴포넌트에 Navigation.js임포트 시킨후 <HashRouter></HashRouter>사이에 포함 시키기
    3.화면에 Home,about링크를 작동하는지 확인한다
    -링크를 누를 때마다 리액트가 죽고 새 페이지가 열리는 문제가 발생한다.
    4.Navigation.js에 Link컴포넌트를 임포트후 a엘리먼트를 Link엘리먼트로 변경해준다
    5.영화앱을 실행시켜 Home,about링크가 잘 작동 되는지 확인한다

## [ 10월 13일 ]
### 학습내용

> [오류]
    Typo in static class property declaration react/no-typos발생시 
    .PropTypes를 .propTypes로 변경 

<b>Moive컴포넌트</b>

    1.movie컴포넌트에 id,title,year,summary,poster props를 출력할 수 있도록 추가
    2.this.state있는 const에 movies값을 추가하고 'we are ready'의 출력을 movies.map()으로 변경
    3.movies.map에 화살표 함수를 추가하고 console값을 추가하여 아무것도 반환하지 않는지 console탭에서 확인해본다
    4.App.js에 Movie를 import하고 movies.map()에 전달된 함수가 Movie를 반환하도록 한다 (import Movie from './Movie' 상대경로 import)
    5.Movie컴포넌트에 props를 전달 받도록 작성
    6.console탭에 'Warning:Each child in a list should have a unique "key" prop' 오류를 확인
    - 해당오류는 key props 떄문에 발생한다
    7.key props를추가하여 오류해결을 console에서 확인 한다. key = {movie.id}

<b>Movie 스타일링<b>

    1.App컴포넌트 JSX의 바깥쪽을 <section class="container">로 Loding...을 <div class="loder">로 교제에
    나와있는데로 수정한다.
    2.Movie컴포넌트에 title,year,summary를 알맞는 HTML태그로 감싼다
    3.Movie컴포넡트에 전체를 감싸는 div태그를 추가하고 그아래에 img태그를 추가한후 title,year,summary를 감싸는
    div에 class="movie__data"를 추가한다.
    4.완성된 코드에서는 id props가 불필요하므로 제거한다.
    5.h3태그에 style 속성을 추가하고 backgroundColor:"red"속성을 추가하여 title색상이 변경되었는지 확인한다.
    6.src폴더에 App과 Movie의 css를 추가한후 App과Movie컴포넌트에 import한다.
    7.App.css파일에 배경색을 어둡게 변경시키고 적용을 확인하다.

<b>영화앱 다듬기</b>

    1.App.css의 내용을 전부 없앤다.
    2.영화의 장르를 보기위해 runtime아래에 genres를 추가해준다
    3.Movie컴포넌트에 genres props를 추가(genres는 문자배열 이므로 PropTypes.string.isRequired를 추가)하고 App컴포넌트에 넘겨준다. 이후 console에서 확인하면 두가지 waring이 발생한다.
    -Invalid DOM property 'class'. Did you mean 'className'?
    -Failed prop type: The prop 'genres' is marked as required in 'Movie', but its value is 'undefined'.
    를 확인한다.
    4.첫번째는 JSX에서 사용한 속성중 class속성이 className으로 되야한다는 내용이다.
    5.두번째는 genres props가 isRequired인데 undefined로 넘어 왔다는 내용이다.
    6.class속성은 className으로 변경하고, genre가 잘 넘어오도록 App에 Movie컴포넌트로 genres = {movie.genr-es}를 추가한
    7.추가한후 console로 경고메세지가 사라졌는지 확인한다.
    8.className과 비슷한 경우로 HTML의 label엘리먼트에 for라는 속성을 추가할 수 있지만 자바스크립트 에서 for문과
    겹출수 있으믈로 JSX에서는 <label for="name">이 아니라 <label htmlFor="name">로 작성해야 한다.
    9.Movie컴포넌트에서 genres props가 배열이므로 map()함수를 사용한다.
    10.genres props를 ul,li태그로 교제와 같이 감싼후 console탭에 waring을 확인한다.
    -Each child in a list should have a unique "key" prop.

## [ 10월 06일 ]
### 학습내용
<b>클래스형 컴포넌트 알아보기</b>

    1.constructor()함수를 선언후 console.log로 문장 출력
    2.componentDidMount()함수 선언후, console.log로 문장 출력 및 확인
    3.componentDidUpadate()함수 선언후, console.log로 문장 출력 확인
    4.componentWillUnmount()함수 선언후, console.log로 문장 출력 확인

<b>영화앱 맛보기</b>

    1.App.js새로 만든후 App컴포넌트 추가
    2.isLoading state를 추가, isLoading state는 컴포넌트가 마운트되면 true가 나오게 교제와 같이 작성
    3.isLoading state에 따라 'Loading','we are ready'출력
    4.setTime()함수를 사용하여 5초후 isLoading state를 false로 변경하도록 작성
    5.영화 데이터 자장할 곳 찾기
    6.movies state를 교제와 같이 만들기

<b>영화 api사용하기</b>

    1.axios설치(npm install axios)
    2.브라우저에 yts.lt/api에 들어간후 아래의 'https://yts.mx/api/v2/list_movies.json'주소 복사
    3.크롬 웹스토어에서 json viewer설치
    5.'https://github.com/serranoarevalo/yts-proxy'에 접속후 리드미에 있는 주소 확인
    4.'https://yts.mx/api/v2/list_movies.json'주소에 접속한후 코드 확인
    5.yts-proxy.now.sh/list_movies.json에 접속후 코드 확인
    6.'/movie_detail.jason'를 입력한후 코드확인
        -api가 movie_id라는 조건을 요구하기 때문에 아무것도 보이지 않는다
    7.yts.mx/api#movie_details에 접속하면 movie_details Endpoint는 movie_id가 필수 이다
    8.App.js에서 axios를 import한 뒤 componentDidMount()에서 axios로 api를 호출한다
    9.axios.get()함수에 url을 전달하여 api를 호출한다
    10.devTools(f12)에 [Network]탭에서 Name이라는 항목에 list_movies.json이라고 나온 부분을 확인한다
    11.getMovies()함수를 만들고, 그 함수 안에서 axios.get()이 실행되도록 작성
    12.getMovies()함수에 async와 await 붙이기 위해 교제와 같이 코드 작성
    13.시간이 필요하다를 알리기 위해서는 async, await 키워드가 필요하다.

<b>영화 데이터 화면에 출력</b>

    1.axios.get()으로 잡은 영화 데이터가 movies 변수 안에 있으므로 console.log를 통해 확인
    2.devTools에 data키를 열여서 movies 배열 확인하기
    3.교제와 같이 const코드를 작성후 console.log를 지우고 this.setState({movies:movies})를 추가
    4.{movies:movies}는 키와 대입할 변수의 이름이 같으므로 {movies}축약 가능하여 this.setState를 축약
    5.isLoading state를 false에서 true로 얻데이트 하기위해 교제와 같이 코드 작성

<b>Moive컴포넌트 추가</b>

    1.src폴더에서 Movie.js파일을 추가후 기본 코드작성
    2.movie컴포넌트는 state가 필요하지 않으므로 함수형 컴포넌트로 작성한다.
    3.movie에 넘어와야하는 영화 데이터를 정의하고 관리하기위해 prop-types를 사용
    4.yts-proxy.now.sh/list_movies.json에서 영화 데이터를 다시 확인한후 데이터중 필요한 것만 반영한다
    5.Movie.propTypes에 첫번째로 자료형이 number인 id를 추가하고 number이니 PropTypes.number.isRequired를 작성한다
    6. year도 자료형이 number 이므로 PropTypes.number.isRequired를 추가하고 title,summary,poster는 string이므로
    PropTypes.string.isRequired를 추가한다
    7.yts.It.api#list_movies에 접속한다음 Encoding Paramerters를 확인후 sort_by라는 Parameter본다
    8.sort_by Parameter를 사용하기 위해 Examples를 참고한다
    9.yts-proxy.now.sh/list_movies.json?sort_by=rating에서 rating을 확인
    10.axios.get()뒤에 ?sort_by=rating을 추가

## [ 9월 29일 ]
### 학습내용
<b>Master Branch를 Main Branch로 이름을 변경<b>

>변경 방법
- git config --global init.defaultBranch main
- 변경후 config를 확인한다. 우선순위는 Local>Global>System순, Local설정 파일이 제일 높다   
- System 설정 파일 확인 git config --system --list
- Global 설정 파일 확인 git config --global --list
- Local 설정 파일 확인 git config --local --list
- 모든 설정 확인 git config --list
- 기존에 것을 바꾸는법 git branch -m master main

>클론코드 만드는법
1. 깃허브 저장소에서 코드의 주소를 받아온다. 
2. git clone "주소이름"
3. 이후 복사된 프로젝트 폴더로 들어간다.
4. 터미널에서 노드모듈을 다시 받아준다
5. npm install 설치후
6. npm start로 실행을 확인한다


>이미지 상대경로 사용법
- 상대경로를 사용하면 코드가 길어져 코드가 복잡해진다
- public 폴더에 image폴더를 만든후
- 필요한 소스코드에 <img src= >형식으로 사용하면 된다

>map함수 반환값 보기
1. App컴포넌트에 console값을 넣어서 반환값 확인('console.log(foodILike.map(renderFood))')
2. console값은 map함수가 반환한 값을 보는것 이므로 원래대로 복구 시킨다
3. 리스트의 각 원소는 유일값을 가져야하는데 원소가 리스에 포함되어서 유일성이 사라져 오류 발생
4. 이를 해결하기위해 배열 원소에 id값을 추가
5. Food 컴포넌트에 key props를 추가('key={dish.id}')
6. img관련 메세지는 img엘리먼트에 alt속성 추가 ('alt={name}')

>prop-types도입하기
1. 음식 데이터에 rating값 추가하기('rating: n')
2. 터미널에서 npm install prop-types 설치
3. 터미널에서 npm install prop-types 입력
4. package.json에서 "dependencies"에서 "prop-types"가 추가 되어있으면 설치가 잘 된것이다.
5. Food.propTypes를 작성후 실행
6. rating 값은number인데 string값이 였기 때문에 오류 발생
7. rating:PrpTypes.string.isRequired을 rating: PropTypes.number.isRequired로 수정
8. Food컴포넌트의 picture props의 이름을 image로 변경
9. Food컴포넌트의 picture props가 아니라 image props를 전달했기에 에러발생


>state
- props는 정적인 데이터만 다를수 있지만
- state는 동적인 데이터를 다루기 위해 사용 할 수 있다.
- state는 class형 컴포넌트에서 사용가능하다.


>state로 숫자 증감 만들기1 
1. 클래스형 컴포넌트 작성 (import React, {Component} from 'react' 및 export default App 외 전부 삭제)
2. Component를 상속받은 App클래스 생성
3. 클래스형 컴포넌트가 되려면 App클래스가 Component를 상속받아야한다
4. render 함수를 사용해 교제 소스코드 작성
5. class안에 state를 정의한다('state={ }')
6. state에 count키와 키값을 추가하고 {this.state.count}를 사용하여 출력한다



>state로 숫자 증감 만들기2
1. <Add>버튼과 <Minus>버튼을 추가한다(JSX는 하나로 묶어야 함으로 <div>태그를 사용)
2. 화살표 함수를 사용하여 add와 minus를 눌렀을때 console에 출력되는지 확인
3. onClick속성을 사용하여 클릭시 함수가 호출되도록 console를 통해 확인한다
4. 리엑트는 state가 변경되면 render함수를 실행하여 화면을 갱신하지만
5. 지금처럼 state를 직접 변경하면 render함수가 다시 실행되지 않는다
6. setState함수를 사용하여 state값을 변경
7. 교재 이미지와 같이 수정하여 state의 값을 증가 또는 감소 시키기
8. add,minus()함수를 교재 이미지와 같이 개선


[ 9월 15일 ]
학습내용
props - 컴포넌트를 전달하는 데이터
    여러개의 데이터도 가능하다

1.App.js에 potato컴포넌트를 Food로 수정

2.App 컴포넌트에 Food함수 추가
> Food에 console함수를 넣어서 props가 제대로 작동하는지 확인
    문자열이면 대괄호 문자열이 아니면 중괄호를 사용한다
3.App.js파일에 h1태그의 potato를 {props.fav}로 수정
> App컴포넌트의 fav값을 받아와서 화면에 출력한다

4.Food(props)를 Food({fav})로 수정, h1태그의 {props.fav}를 {fav}로 수정후 출력확인
> {props.fav}의 받아오는 값과 {fav}의 받는 값이 같으므로 출력값이 같다

5.const
> const값을 사용하여 여러개의 데이터를 출력할수 있다

6.const foodILike를 사용
> foodILike의 값에 여러개의 데이터를 받기위함

7.App.js에 foodILike.map에 Food컴포넌트 추가 추가
    map함수를 사용하여 배열에 있는 값을 하나씩 가져다 사용할수 있다

8.Food괄호에 picture를 추가 및 map함수에 picture를 추가 후 출력확인

9.renderFood 함수 추가
    앞글자를 소문자로 사용하였기에 컴포넌트가 아니라 함수개념으로 사용

10.foodILike.map에 Food 컴포넌트를 renderFood 추가
    길고 복잡한 코드를 rederFood를 상용함으로소 간소화



## [ 9월 08일 ]
### 학습내용
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

## [ 9월 01일 ]
### 학습내용
