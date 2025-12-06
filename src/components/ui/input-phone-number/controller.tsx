import type { optionItemType } from "src/components/_types";

export const getProcessedOption = (searchParam:string, option:optionItemType[]): optionItemType[] => {
    let tampOptions = [...option]

    if(searchParam){
        tampOptions = tampOptions.filter(i=>(`${i.txtLabel}${i.alias}`).toLowerCase().includes(searchParam.toLowerCase()))
    }

    return tampOptions
};