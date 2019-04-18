import { Action } from '@ngrx/store';
import { Articles } from '../models/articles.model';

export const ADD_ARTICLES = '[ARTICLES]Add';
export const REMOVE_ARTICLES = '[ARTICLES]Remove';
export const CLEAR_ARTICLES = '[ARTICLES]Clear';
export const UPDATE_ARTICLES = '[ARTICLES]Update'
export const GET_ARTICLES = '[ARTICLES]Get'

export class AddArticles implements Action {
    readonly type = ADD_ARTICLES;

    constructor(public payload: Articles) {
        
    }
}

export class RemoveArticles implements Action {
    readonly type = REMOVE_ARTICLES;

    constructor(public payload: number) {

    }
}

export class ClearArticles implements Action {
    readonly type = CLEAR_ARTICLES;

    constructor() {

    }
}

export class UpdateArticles implements Action {
    readonly type = UPDATE_ARTICLES;

    constructor(public payload: number) {

    }
}

export class GetArticleById implements Action {
    readonly type = GET_ARTICLES;

    constructor(public payload: number) {

    }
}

export type Actions = AddArticles | RemoveArticles | ClearArticles | UpdateArticles | GetArticleById;