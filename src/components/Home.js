import React from 'react';
import {Link} from 'react-router-dom';
import goofy from '../images/melon_guy.jpg';
import nerd from '../images/power_gamer.jpg';
const Home = (props) => {
    return(
        <div>
            <h1>Welcome to the world of tic-tac-toe!</h1>
            <h3>Choose your opponent: </h3>
            <ul>
                <li><Link to="/goofus"><img src={goofy} alt="Goofiest guy ever" /> Barney Derp</Link></li>
                <li><Link to="/nerdy"><img src={nerd} alt="Nerdiest of nerdiest" />Melvin Einstein</Link></li>
            </ul>
        </div>
    )
}

export default Home;