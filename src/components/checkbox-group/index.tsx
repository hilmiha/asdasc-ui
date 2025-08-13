import './styles.scss'
import * as ctrl from './controller';
import { useState } from 'react';
import CheckboxButton from '../checkbox-button';
import { PiCaretDownBold, PiCaretUpBold, PiCircleBold } from 'react-icons/pi';
import IconButton from '../icon-button';
import type { optionItemType } from '../_types';
import { useDeepCompareMemo } from '../../hook/useDeepCompareMemo';

const CheckboxGroup = ({ 
    options, 
    selectedList, 
    isDisabled,
    onChange
}:_CheckboxGroup) => {
    const checkedLeaves = new Set(selectedList);
    const [collapsed, setCollapsed] = useState<Set<string>>(new Set()); 

    const isTree = useDeepCompareMemo(()=>{
        return JSON.stringify(options).includes('childOption')
    },[options])

    const renderTree = (option: optionItemType) => {
        const state = ctrl.getNodeState(option, checkedLeaves);
        const isParent = option.childOption && option.childOption.length > 0;
        const isCollapsed = collapsed.has(option.id);

        if(option.type==='separator'){
            return null
        }

        return (
            <div className='checkbox-tree-box' key={option.id}>
                <div className='parent-box'>
                    {
                        (isParent) ? (
                            <IconButton
                                appearance='subtle'
                                className='collapse-button'
                                onClick={() => {
                                    ctrl.onCollapseButtonClick(option.id, setCollapsed)
                                }}
                                icon={isCollapsed ? <PiCaretDownBold className='global-icon' /> : <PiCaretUpBold className='global-icon' />}
                                txtLabel={isCollapsed ? 'Expand Option' : 'Collapse Option'}
                                isShowtooltip={false}
                            />
                        ) : (isTree) ? (
                            <PiCircleBold className='global-icon' color='transparent' style={{margin:'calc(var(--space-50) + 1px)'}}/> // spacer for child alignment
                        ):(
                            <></>
                        )
                    }
                    <CheckboxButton
                        isSelected={state.checked && !state.indeterminate}
                        isIndeterminate={state.indeterminate}
                        txtLabel={option.txtLabel}
                        txtSublabel={option.txtSublabel}
                        icon={option.icon}
                        onClick={(isCheck) => ctrl.onOptionItemClick(option, isCheck, checkedLeaves, onChange)}
                        isDisabled={isDisabled || option.isDisabled}
                    />
                </div>

                {
                    (isParent && !isCollapsed) && (
                        <div style={{marginLeft:'var(--space-400)'}}>
                            {option.childOption!.map(renderTree)}
                        </div>
                    )
                }
            </div>
        );
    };

    return (
        <div>
            {
                options.map(
                    (itmOption)=>{
                        return renderTree(itmOption)
                    }
                )
            }
        </div>
    );
};

export default CheckboxGroup;

interface _CheckboxGroup {
    options: optionItemType[];
    selectedList?: string[]; 
    isDisabled?: boolean;
    onChange?: (checkedLeafIds: string[]) => void;
}
