import { Route, Routes } from 'react-router-dom'

import { AuthProvider } from './contexts/AuthContext'

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CreateGame from './components/CreateGame/CreateGame';
import Catalog from './components/Catalog/Catalog';
import GameDetails from './components/GameDetails/GameDetails';
import Logout from './components/Logout/Logout'
import { GameProvider } from './contexts/GameContext';
import EditGame from './components/EditGame/EditGame';
import PrivateRoute from './components/common/PrivateRoute';
import PrivateGuard from './components/common/PrivateGuard';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <div id="box">
                <Header />
                {/* Main Content */}
                <GameProvider>
                    <main id="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/create" element={(
                                <PrivateRoute>
                                    <CreateGame />
                                </PrivateRoute>
                            )} />
                            <Route element={<PrivateGuard />}>
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/games/:gameId/edit" element={<EditGame />} />
                            </Route>
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/catalog/:gameId" element={<GameDetails />} />

                        </Routes>
                    </main>
                </GameProvider>

                {/* Edit Page ( Only for the creator )*/}


            </div>
        </AuthProvider>
    );
}

export default App;
