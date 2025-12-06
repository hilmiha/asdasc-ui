import type { JSX } from "react";

export type globalThemeType = 'light'|'dark'
export type screenSizeType = 'mobile' | 'tablet' | 'laptop';
export type globalShapeType = 'rounded' | 'box' | 'circle';
export type globalAppearanceType = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'subtle';

export type fieldErrorType = {
    isError:true | false | null,
    errorMessage:string
}

export type optionItemType = {
    id:string,
    type?: 'option' | 'menu' | 'separator',
    txtLabel:string,
    txtSublabel?:string,
    alias?:string, 
    icon?:JSX.Element,
    isDisabled?:boolean,
    data?:{[key:string]:any},
    childOption?:optionItemType[]
};