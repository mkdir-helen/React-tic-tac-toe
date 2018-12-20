import React from 'react';
import {Link} from 'react-router-dom';
const Home = (props) => {
    return(
        <div>
            <h1>Welcome to the world of tic-tac-toe!</h1>
            <h3>Choose your opponent: </h3>
            <ul>
                <li><Link to="/goofus">Barney Derp</Link></li>
                <li><Link to="/nerdy">Melvin Einstein</Link></li>
            </ul>
        </div>
    )
}

export default Home;