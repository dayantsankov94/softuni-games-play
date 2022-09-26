import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import * as gameService from './services/gameService'
import { AuthContext } from './contexts/AuthContext'

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CreateGame from './components/CreateGame/CreateGame';
import Catalog from './components/Catalog/Catalog';
import GameDetails from './components/GameDetails/GameDetails';
import Logout from './components/Logout/Logout'
import { useLocalStorage } from './hooks/useLocalStorage'
import { GameContext } from './contexts/GameContext';
import './App.css';
import EditGame from './components/EditGame/EditGame';

function App() {

    const [games, setGames] = useState([]);
    const navigate = useNavigate();
    const [auth, setAuth] = useLocalStorage('auth', {})

    const userLogin = (authData) => {
        setAuth(authData);
    };

    const userLogout = () => {
        setAuth({});
    };

    const gameEdit = (gameId,gameData) => {
        setGames(state => state.map(x => x._id === gameId ? gameData : x));
    };

    const gameAdd = (gameData) => {
        setGames(state => [
            ...state,
            gameData,

        ]);
        navigate('/catalog');
    };

    const addComment = (gameId, comment) => {
        setGames(state => {
            const game = games.find(x => x._id == gameId);

            const comments = game.comments || [];
            comments.push(comment)
            return [
                ...state.filter(x => x._id !== gameId),
                { ...game, comments }
            ]
        });
    };

    useEffect(() => {
        gameService.getAll()
            .then(result => {

                setGames(result);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
            <div id="box">
                <Header />
                {/* Main Content */}
                <GameContext.Provider value={{games,gameAdd,gameEdit}}>
                    <main id="main-content">
                        <Routes>
                            <Route path="/" element={<Home games={games} />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/create" element={<CreateGame />} />
                            <Route path="/catalog" element={<Catalog games={games} />} />
                            <Route path="/catalog/:gameId/*" element={<GameDetails games={games} addComment={addComment} />} />
                            <Route path="/games/:gameId/edit" element={<EditGame />} />
                        </Routes>
                    </main>
                </GameContext.Provider>

                {/* Edit Page ( Only for the creator )*/}
                

            </div>
        </AuthContext.Provider>
    );
}

export default App;
