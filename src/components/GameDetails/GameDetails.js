import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as gameService from '../../services/gameService';

const GameDetails = ({
    addComment
}) => {

    const [game, setGame] = useState({})
    const [comment, setComment] = useState({
        username: '',
        comment: ''
    })
    const { gameId } = useParams();

    useEffect(() => {
        gameService.getOne(gameId)
            .then(result => {
                setGame(result)
            })
    }, [])

    const addCommentHandler = (e) => {
        e.preventDefault();
        const finalComment = `${comment.username}: ${comment.comment}`;
        addComment(gameId, finalComment);


    }

    const onChange = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">
                    {game.summary}
                </p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {game.comments?.map(x =>
                            <li key={x._id} className="comment">
                                <p>{x}</p>
                            </li>
                        )}
                    </ul>
                    {!game.comments &&
                        <p className="no-comment">No comments.</p>
                    }
                </div>



                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                <div className="buttons">
                    <Link to={`/games/${game._id}/edit`} className="button">
                        Edit
                    </Link>
                    <Link to={`/games/${game._id}/edit`} className="button">
                        Delete
                    </Link>
                </div>
            </div>
            {/* Bonus */}
            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <input
                        type="text"
                        name="username"
                        placeholder="John Doe"
                        onChange={onChange}
                        value={comment.username}
                    />

                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        onChange={onChange}
                        value={comment.comment}
                    />
                    <input
                        className="btn submit"
                        type="submit"
                        defaultValue="Add Comment"
                    />
                </form>
            </article>
        </section>
    )
}
export default GameDetails;