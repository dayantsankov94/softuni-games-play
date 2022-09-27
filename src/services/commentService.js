import * as request from '../services/requester';

const baseUrl = 'http://localhost:3030/data/comments';

export const create = (gameId, comment) => {
    return request.post(baseUrl, {gameId, text: comment })
};

export const getByGameId = (gameId) => {
    const relations = encodeURIComponent(`user=_ownerId:users`);
    const search = encodeURIComponent(`gameId="${gameId}"`);

    return request.get(`${baseUrl}?where=${search}&load=${relations}`);
}