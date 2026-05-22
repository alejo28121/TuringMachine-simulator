import {jwtDecode} from 'jwt-decode';
import '../assets/Dashboard.css';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard,
    CalendarDays,
    ListTodo,
    BookOpen,
    ClipboardCheck,
    Bell,
    Search,
    Sun,
    Moon,
    ChevronFirst,
    ChevronLast,
    Circle,
    GitBranch,
    Rows3,
    Play,
    BrainCog 
} from "lucide-react";

function Dashboard(){
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {
        if(token === null){
            navigate('/auth/login', {replace : true});
        }
    },[token, navigate])
    const dates = token ? jwtDecode(token) : null;
    const nameLetters = token
        ? dates.name
            .split(' ')
            .map(word => word[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
        : null;
    const [scrollState, setScrollState] = useState(false);
    const [isCollapsed, setColpasedState] = useState(false);
    const [hover, setHover] = useState(false);
    const location = useLocation();
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved) {
            setTheme(saved);
            document.documentElement.setAttribute("data-theme", saved);
        }
    }, []);

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    };
    const formatPath = (path) => {
        return path
            .split("/")
            .filter(Boolean)
            .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" / ")
            .toUpperCase();
    };
    const menuItems = [
        {
            name: "Inicio",
            route: "/dashboard/home",
            icon: LayoutDashboard
        },
        {
            name: "Estados",
            route: "/dashboard/states",
            icon: Circle
        },
        {
            name: "Transiciones",
            route: "/dashboard/transitions",
            icon: GitBranch
        },
        {
            name: "Cinta",
            route: "/dashboard/tape",
            icon: Rows3
        },
        {
            name: "Simulación",
            route: "/dashboard/simulation",
            icon: Play
        }
    ];
    return(
        <div className='Main-container-dashboard'>
            <div className={`Container-sidebar${isCollapsed ? '-collapsed' : ''}`}>
                <div className='Name-container'>
                    <BrainCog size={24} className='Icon-name'/>
                    <span className='Name' style={isCollapsed ? {display : 'none'} : {display : ''}}>
                        Turing
                    </span>
                    <div className='Chevrone-container' onClick={() => {
                        setColpasedState(!isCollapsed)
                        }}
                        style={{
                            display : `${isCollapsed ? 'none' : ''}`
                        }}>
                        <ChevronFirst className='Chevrone-icon' size={25}/>
                        <span className='Tag-chevrone'>{isCollapsed ? 'Abrir menú' : 'Cerrar menú'}</span>
                    </div>
                </div>
                <div className={`Side-components-container${isCollapsed ? '-collapsed' : ''}`}>
                    <div className='Chevrone-container' onClick={() => {
                        setColpasedState(!isCollapsed)
                        }}
                        style={{
                            display : `${isCollapsed ? '' : 'none'}`
                        }}>
                        <ChevronLast className='Chevrone-icon' size={25}/>
                        <span className='Tag-chevrone'>{isCollapsed ? 'Abrir menú' : 'Cerrar menú'}</span>
                    </div>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.route} className="item-wrapper">
                                <div className={`item-border-top${
                                        isCollapsed ? '-collapsed' : ''} ${
                                        location.pathname === item.route ? 'active' : ''
                                    }`}></div>
                                <div 
                                    className={`list-sidebar${
                                        isCollapsed ? '-collapsed' : ''}
                                        ${
                                        location.pathname === item.route ? 'active' : ''
                                        }`}
                                        onClick={() => navigate(item.route)}
                                    >
                                    <div className={`icon-container ${
                                        location.pathname === item.route ? 'active' : ''}`}>
                                        <span className='Tag' style={{
                                        display: `${isCollapsed ? '' : 'none'}`
                                        }}>{item.name}</span>
                                        <Icon size={24} className='Icon-list'/>
                                    </div>
                                    <span className="text-list" style={{
                                        display: `${isCollapsed ? 'none' : ''}`
                                    }}>{item.name}</span>
                                </div>
                                <div className={`item-border-bottom${
                                        isCollapsed ? '-collapsed' : ''} ${
                                        location.pathname === item.route ? 'active' : ''
                                    }`}></div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='Main-container-sidebar'>
                <div className={`Container-navbar${scrollState ? '-scrolled' : ' '}`}>
                    <div className='Header-text-container'>
                        <span>{formatPath(location.pathname)}</span>
                    </div>
                    <div className='Container-components'>
                        <Search size={20} />
                        <input className='Input-search' placeholder='Search...'></input>
                        <Sun className='Icon-ligth' style={theme === 'light' ? {display : 'none'} : {display: ''}} onClick={toggleTheme}/>
                        <Moon className='Icon-ligth' style={theme === 'dark' ? {display : 'none'} : {display: ''}} onClick={toggleTheme}/>
                        <div className='Circle-user'>
                            <span>{nameLetters}</span>
                        </div>
                    </div>
                </div>
                <div className='Container-tools' onScroll={(e) => {
                    setScrollState(e.target.scrollTop > 36);
                }}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;