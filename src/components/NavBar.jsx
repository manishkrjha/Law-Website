import React from "react";
import { NavLink } from "react-router-dom";
import {AiFillFileAdd, AiOutlineHome} from "react-icons/ai";
// import {IoIosCreate} from "react-icons/io";

const NavItem = ({to, value, closed, Icon}) => {

    const commonClasses = "flex item-center space-x-2 w-full p-2 block whitespace-nowrap";
    const activeClass   = commonClasses + " bg-blue-500 text-white";
    const inActiveClass   = commonClasses + " text-gray-500";

    return (
        <NavLink to={to} className={({isActive}) => isActive ? activeClass : inActiveClass}> 
            {Icon}
            <span className={closed ? " w-0 transition-width overflow-hidden" : " w-full transition-width overflow-hidden"}> {value} </span>
        </NavLink>
    )
}

function Navbar({closed}) {
    return (
        <nav>
            {/* <div className="flex justify-center p-3">
                <img className="w-14" src="./public/logo.png" alt="address error" />
            </div> */}
            <ul>
                <li>
                    <NavItem closed={closed} to='/' value='Home' Icon={<AiOutlineHome size={25} />} />
                </li>
                <li>
                    <NavItem closed={closed} to='/create-post' value='Create Post' Icon={<AiFillFileAdd size={25} />} />
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;