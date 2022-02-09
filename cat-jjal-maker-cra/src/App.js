import React from 'react';
import './App.css';
import Title from './components/Title';
import Form from './components/Form';
import MainCard from './components/MainCard';
import Favorites from './components/Favorites';


const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};


const App = () => {
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";


  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("counter");
  });
  const [mainCat, setMaincat] = React.useState(CAT1);
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];   // null이면 빈 배열로
  });

  async function setInitialCat() {
    const newCat = await fetchCat('First Cat');
    setMaincat(newCat);
  }

  React.useEffect(() => {
    setInitialCat();
  }, [])


  async function updateMainCat(value) {    // '생성'을 눌렀을 때
    const newCat = await fetchCat(value);

    setMaincat(newCat);

    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem('counter', nextCounter);
      return nextCounter;
    })
  };

  const alreadyFavorite = favorites.includes(mainCat);

  function handleHeartClick() {
    if (alreadyFavorite) {
      const nextFavorites = favorites.filter(favorite => favorite !== mainCat);
      setFavorites(nextFavorites);
      jsonLocalStorage.setItem('favorites', nextFavorites);
      return;
    }
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem('favorites', nextFavorites);
  };

  function deleteFavorite(catImg) {
    const result = window.confirm("정말 삭제하시겠습니까?");
    if (result) {
      console.log(catImg);
      console.log(favorites[0])
      const nextFavorites = favorites.filter(favorite => favorite !== catImg);
      setFavorites(nextFavorites);
      jsonLocalStorage.setItem('favorites', nextFavorites);
    } else {
      return;
    }
  }

  const counterTitle = counter === null ? "" : counter + "번째 ";

  return (
    <div>
      <Title>{counterTitle}고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard img={mainCat} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite} />
      <Favorites favorites={favorites} deleteFavorite={deleteFavorite} />
    </div>
  );
}

export default App;
