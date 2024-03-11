import Header from "./components/main/Header";
import Home from "./components/main/Home";

import RecipeDetail from "./components/recipe/RecipeDetail";

import FoodList from "./components/food/FoodList";
import FoodDetail from "./components/food/FoodDetail";
import FoodFind from "./components/food/FoodFind";

// import {GoodsAll, GoodsBest, GoodsSpecial, GoodsNew} from "./components/goods";
import GoodsAll from "./components/goods/GoodsAll";
import GoodsBest from "./components/goods/GoodsBest";
import GoodsNew from "./components/goods/GoodsNew";
import GoodsSpecial from "./components/goods/GoodsSpecial";

import BoardList from "./components/board/BoardList";
import BoardInsert from "./components/board/BoardInsert";
import BoardDetail from "./components/board/BoardDetail";
import BoardUpdate from "./components/board/BoardUpdate";
import BoardDelete from "./components/board/BoardDelete";

import NewsList from "./components/news/NewsList";

import{BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
      // Router : 화면을 바꿔주는 역할
      <Router>
        <Header/>
        <div className={"container"}>
          <Routes>
            <Route exact path={"/"} element={<Home/>}/>
            <Route path={"/recipe/detail/:no"} element={<RecipeDetail/>}/>
            <Route path={"/food/list"} element={<FoodList/>}/>
            <Route path={"/food/detail/:fno"} element={<FoodDetail/>}/>
            <Route path={"/food/find"} element={<FoodFind/>}/>
            <Route path={"/goods/all"} element={<GoodsAll/>}/>
            <Route path={"/goods/best"} element={<GoodsBest/>}/>
            <Route path={"/goods/new"} element={<GoodsNew/>}/>
            <Route path={"/goods/special"} element={<GoodsSpecial/>}/>
            <Route path={"/board/list"} element={<BoardList/>}/>
            <Route path={"/board/insert"} element={<BoardInsert/>}/>
            <Route path={"/board/detail/:no"} element={<BoardDetail/>}/>
            <Route path={"/board/update/:no"} element={<BoardUpdate/>}/>
            <Route path={"/board/delete/:no"} element={<BoardDelete/>}/>
            <Route path={"/news/list"} element={<NewsList/>}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
