import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import * as gameService from '../services/gameService'
import * as commentService from '../services/commentService';

export const GameContext = createContext()

export const GameProvider = ({
    children
}) => {
    const gameReducer = (state, action) => {
        switch (action.type) {
            case 'ADD_GAMES':
                return action.payload.map(x => ({ ...x, comments: [] }));
            case 'FETCH_GAME_DETAILS':
            case 'EDIT_GAME':
                return state.map(x => x._id === action.gameId ? action.payload : x);
            case 'ADD_GAME':
                return [...state, action.payload];
            case 'ADD_COMMENT':
                return state.map(x => x._id === action.gameId ? { ...x, comments: [...x.comments, `${action.owner}: ${action.payload}`] } : x);
            default:
                return state;
        }
    };

    const [games, dispatch] = useReducer(gameReducer, [])

    const navigate = useNavigate();

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                dispatch({
                    type: 'ADD_GAMES',
                    payload: result
                });
            });
    }, []);

    const gameEdit = (gameId, gameData) => {
        dispatch({
            type: 'EDIT_GAME',
            payload: gameData,
            gameId
        });
    };

    const fetchGameDetails = (gameId, gameData) => {
        dispatch({
            type: 'FETCH_GAME_DETAILS',
            payload: gameData,
            gameId
        })
    }

    const selectGame = (gameId) => {
        return games.find(x => x._id === gameId);
    };

    const gameAdd = (gameData) => {
        dispatch({
            type: 'ADD_GAME',
            payload: gameData
        });
        navigate('/catalog');
    };

    const addComment = (gameId, comment) => {
        commentService.getByGameId(gameId)
            .then(result => {
                const owner = result[0].user.email


                dispatch({
                    type: 'ADD_COMMENT',
                    payload: comment,
                    owner: owner,
                    gameId
                })
            })


    };

    return (
        <GameContext.Provider value={{ games, gameAdd, gameEdit, addComment, fetchGameDetails, selectGame }}>
            {children}
        </GameContext.Provider>
    )
}