import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { GameContext } from '../../contexts/GameContext';
import * as gameService from '../../services/gameService';
import * as commentService from '../../services/commentService';

const GameDetails = () => {

    const { addComment, fetchGameDetails, selectGame } = useContext(GameContext);

    const { gameId } = useParams();

    const game = selectGame(gameId)

    useEffect(() => {
        (async () => {
            const gameDetails = await gameService.getOne(gameId);
            const gameComments = await commentService.getByGameId(gameId);
            fetchGameDetails(gameId, {...gameDetails, comments: gameComments.map(x => `${x.user.email}: ${x.text}`)});
        })();
    }, []);

    const addCommentHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const comment = formData.get('comment');

        commentService.create(gameId, comment)
            .then(result => {
                addComment(gameId, comment);
            });
    };

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
                            <li key={x} className="comment">
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

                    <textarea
                        name="comment"
                        placeholder="Comment......"
                    />
                    <input
                        className="btn submit"
                        type="submit"
                        defaultValue="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
};
export default GameDetails;