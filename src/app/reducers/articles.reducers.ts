import { Articles } from '../models/articles.model';
import * as ArticleActions from '../actions/articles.actions';
import { Action } from '@ngrx/store';


export const reducer = (state: Articles[] = [], action: ArticleActions.Actions) => {
    switch (action.type) {
        case ArticleActions.ADD_ARTICLES:
            return [...state, action.payload];
        case ArticleActions.REMOVE_ARTICLES:
            return state.filter(article => article !== state[action.payload]);
        case ArticleActions.CLEAR_ARTICLES:
            return state = undefined;
        case ArticleActions.GET_ARTICLES:
            return state.filter(article => article === state[action.payload])
        case ArticleActions.UPDATE_ARTICLES:
            return state.map(article => {
                if (article === state[action.payload]) {
                    article = {...article, isFavorite: !article.isFavorite}
                }
                return article
            });
        default:
            return state;
    }
};