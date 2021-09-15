const foodILike = [
  {
    name: 'chikin', image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fhealth.chosun.com%2Fsite%2Fdata%2Fimg_dir%2F2021%2F03%2F31%2F2021033102448_0.jpg&imgrefurl=https%3A%2F%2Fhealth.chosun.com%2Fsite%2Fdata%2Fhtml_dir%2F2021%2F03%2F31%2F2021033102457.html&tbnid=nXkUiwW512BaKM&vet=12ahUKEwjt8NaF_P_yAhVENqYKHfJADb0QMygDegUIARDOAQ..i&docid=Lg4EA0I-XVw0bM&w=640&h=426&q=%EC%9D%8C%EC%8B%9D&ved=2ahUKEwjt8NaF_P_yAhVENqYKHfJADb0QMygDegUIARDOAQ'
  },
  {
    name: 'takoyaki', image: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fd20aeo683mqd6t.cloudfront.net%2Fko%2Farticles%2Ftitle_images%2F000%2F039%2F436%2Fmedium%2FIMG_5542_s.jpg%3F2019&imgrefurl=https%3A%2F%2Fwww.tsunagujapan.com%2Fko%2Fosaka-takoyaki-restaurant-best-5%2F&tbnid=g5EGmOhBcE0cBM&vet=12ahUKEwizxu6x_P_yAhVENqYKHfJADb0QMygAegUIARC6AQ..i&docid=Q99_02P9F9BJIM&w=750&h=563&q=%ED%83%80%EC%BD%94%EC%95%BC%ED%82%A4&ved=2ahUKEwizxu6x_P_yAhVENqYKHfJADb0QMygAegUIARC6AQ'
  }
]

function App() {
  return (
    <div className="App">
      <h1>Hello react!!!!!!!!</h1>
      <Food fav = "Kimchi"  />
    </div>
  );
}

function Food({fav}){
  //console.log(props);
  return(
  <h3>I love {fav}</h3>
  );
}

export default App
