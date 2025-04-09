import { Category } from "./Category";

export type ScreenParams<T> = {
    title?: string,
    params?: T
}

export type RootStackParamList = {
    'products-category': Category;
};