import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import "./App.css";
import "normalize.css"; //こちらを新たに追加//
import HorizontalLinearStepper from "./components/stepbar.jsx";
import Header from "./components/Header";
import BlogPage from "./components/BlogPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ListOfWorks from "./ListPage/ListOfWorks.jsx";

const App = () => {
  const [value, setValue] = useState([]);

  // 先ほど作成したLaravelのAPIのURL
  // const url = "http://localhost:8000/list";

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await axios.get(url);
  //       setValue(res.data.post);
  //       return;
  //     } catch (e) {
  //       return e;
  //     }
  //   })();
  // }, []);

  return (
    <>
      <div className="App">
        <Header />
      </div>
      <BrowserRouter>
        <nav>
          <Link to="/list-of-works">作品一覧</Link>
        </nav>
        <Routes>
          <Route path="/list-of-works" element={<ListOfWorks />} />
        </Routes>
      </BrowserRouter>
      
      <div className="lowermostPlatform">
        <header></header>
        <main>
          <p>新規登録</p>
          <div className="test">
            <HorizontalLinearStepper />
          </div>
        </main>
        <div className="centering_parent">
          <div className="centering_item"></div>
        </div>
      </div>
    </>
  );
};

export default App;
