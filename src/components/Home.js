import React from 'react';
import {Link} from 'react-router-dom';
import goofy from '../images/melon_guy.jpg';
import nerd from '../images/power_gamer.jpg';
const Home = (props) => {
    return(
        <div>
            <h1>Welcome to the world of tic-tac-toe!</h1>
            <h3>Choose your opponent: </h3>
            <ul className="opponents">
                <li><Link className="goofus" to="/goofus"><div><img src={goofy} alt="Goofiest guy ever" /> <p>Barney Derp</p></div></Link></li>
                <li><Link className="nerdy" to="/nerdy"><div><img src={nerd} alt="Nerdiest of nerdiest" /><p>Melvin Einstein</p></div></Link></li>
            </ul>
        </div>
    )
}

export default Home;