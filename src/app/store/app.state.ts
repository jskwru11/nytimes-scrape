import { Articles } from '../models/articles.model';

export interface AppState {
    readonly article: Articles[];
};
