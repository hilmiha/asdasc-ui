import type { optionItemType } from "../_types";

// Toggle collapse state
export const onCollapseButtonClick = (
    nodeId: string,
    setCollapsed: React.Dispatch<React.SetStateAction<Set<string>>>
) => {
    setCollapsed(prev => {
        const newSet = new Set(prev);

        if (newSet.has(nodeId)){
            newSet.delete(nodeId)
        }else{
            newSet.add(nodeId);
        }
        return newSet;
    });
};

// Get all leaf IDs under an option
export const getLeafIds = (option: optionItemType): string[] => {
    if (!option.childOption || option.childOption.length === 0) {
        return [option.id];
    }

    return option.childOption.flatMap(getLeafIds);
};

// Determine option state from its leaf children
export const getNodeState = (option: optionItemType, checkedLeaves:Set<string>) => {
    if (!option.childOption || option.childOption.length === 0) {
        const isChecked = checkedLeaves.has(option.id);

        return({ 
            checked: isChecked, 
            indeterminate: false 
        })
    }

    const leafIds = getLeafIds(option);
    const checkedCount = leafIds.filter((id) => checkedLeaves.has(id)).length;

    return {
        checked: checkedCount === leafIds.length,
        indeterminate: checkedCount > 0 && checkedCount < leafIds.length
    };
};

// On an option clicked
export const onOptionItemClick = (
    option: optionItemType, 
    isChecked: boolean, 
    checkedLeaves:Set<string>, 
    onChange?:(checkedLeafIds: string[]) => void
) => {
    const newValue = new Set(checkedLeaves);
    const leafIds = getLeafIds(option);

    leafIds.forEach((id) => {
        if (isChecked) {
            newValue.add(id);
        } else {
            newValue.delete(id);
        }
    });

    if(onChange){
        onChange([...newValue]);
    }
};

