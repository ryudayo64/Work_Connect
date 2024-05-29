import React from 'react';
import { Link, Route } from "react-router-dom";
import LoginModal from './account/students/LoginModal';
import PreSignModal from './account/students/PreSignModal';
import SignUp from './account/students/SignUp';

const Header = () => {
  return (
    <header>
        <dir className="logo">
            <h3>Work&Connect</h3>
        </dir>

        <nav>
            <ul>
                <li>
                    <span><LoginModal /></span>
                </li>
                <li>
                    <span><PreSignModal /></span>
                </li>
                <li>
                {/* <span><SignUp /></span> */}
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header