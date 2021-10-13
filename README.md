# 유호철 201840221
## [ 10월 13일 ]
### 학습내용

> [오류]

    '''
    Typo in static class property declaration react/no-typos
    '''
    발생시 .PropTypes를 .propTypes로 변경 

<b>Moive컴포넌트</b>

    1.movie컴포넌트에 id,title,year,summary,poster props를 출력할 수 있도록 추가
    2.this.state있는 const에 movies값을 추가하고 'we are ready'의 출력을 movies.map()으로 변경
    3.movies.map에 화살표 함수를 추가하고 console값을 추가하여 아무것도 반환하지 않는지 console탭에서 확인해본다
    4.App.js에 Movie를 import하고 movies,map()에 전달된 함수가 Movie를 반환하도록 한다 (import Movie from './Movie' 상대경로 import)
    5.Movie컴포넌트에 props를 전달 받도록 작성
    '''
    return (
                            <Movie
                            key = {movie.id}
                            //id ={movie.id}
                            year={movie.year}
                            title={movie.title}
                            summary={movie.summary}
                            poster={movie.medium_cover_image}
                            genres={movie.genres}
                            />
                            )                   
    '''




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