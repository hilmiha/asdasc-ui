import{j as e,B as d,r as i,as as g,I as c,av as m,x}from"./index-CxQ2u3Bm.js";import{u as p,b as s}from"./index-anh36pai.js";import{T as r,D as y,I as f,a as h}from"./index-B14zKffX.js";import{P as u}from"./preview-box-BxEGg51e.js";import"./index-CKX67OUb.js";const l={name:"Dropdown",path:"/dropdown"},a={name:"Icon Button",path:"/icon-button"},b=[{id:"preview",txtLabel:"Dropdown Menu",isSub:!1},{id:"api_ref",txtLabel:"API Refrence",isSub:!1},{id:"api_ref_1",txtLabel:"DropdownMenu",isSub:!0},{id:"example",txtLabel:"Example",isSub:!1},{id:"example_1",txtLabel:"Custom trigger",isSub:!0},{id:"keyboard",txtLabel:"Keyboard Interactions",isSub:!1}],v=[{key:"key",txtLable:"Key",size:{min:"100px",size:"1fr"}},{key:"description",txtLable:"Description",size:{min:"400px",size:"1fr"}}],w=[{id:"1",key:e.jsx(r,{txtLabel:"Space"}),description:e.jsxs("p",{children:["When focus is on an ",e.jsx("span",{className:"text-code",children:"Button"}),", press and do the ",e.jsx("span",{className:"text-code",children:"onClick"})," function."]})},{id:"2",key:e.jsx(r,{txtLabel:"Enter"}),description:e.jsxs("p",{children:["When focus is on an ",e.jsx("span",{className:"text-code",children:"Button"}),", press and do the ",e.jsx("span",{className:"text-code",children:"onClick"})," function."]})},{id:"3",key:e.jsx(r,{txtLabel:"Tab"}),description:e.jsx("p",{children:"Moves focus to the next focusable element."})}],F=[{key:"prop",txtLable:"Prop",size:{min:"195px",size:"0.5fr"}},{key:"type",txtLable:"Type",size:{min:"220px",size:"1fr"}},{key:"default",txtLable:"Default",size:{min:"100px",size:"0.3fr"}}],C=[{id:"1",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"className"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"2",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"trigger"}),type:e.jsxs(e.Fragment,{children:[e.jsx("p",{style:{fontFamily:"monospace"},children:"JSX.Element | "}),e.jsxs("p",{style:{fontFamily:"monospace"},children:["funtion (triggerRef, getReferenceProps, isDropdownOpen, trigger) => JSX.Element"," "]})]}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"3",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"style"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"dropdownMenuStyleType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"4",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"shape"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"globalShapeType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"5",prop:e.jsxs("p",{style:{fontFamily:"monospace"},children:["options",e.jsx("span",{style:{color:"var(--clr-danger-700)"},children:" *"})]}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"optionItemType[]"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"6",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"optionSelected"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string[]"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"7",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"optionSelectedAppearance"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"checkboxButtonAppearance"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"8",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"isDisabled"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"boolean"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"9",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onClick"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function (idOption, option, event) => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"10",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onOpen"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function () => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"11",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onClose"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function () => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"12",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"elementHeader"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"JSX.Element"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"13",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"elementFooter"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"JSX.Element"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"14",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"floatingConfig"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"dropdownFloatingConfigType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})}],L=()=>e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-300)",alignItems:"center"},children:[e.jsx(u,{children:e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsx(y,{trigger:e.jsx(d,{txtLabel:"Dropdown Menu"}),options:D,onClick:t=>{alert(`${t} clicked`)},floatingConfig:{isCloseOnItemClicked:!0}})})}),e.jsx(f,{lang:"tsx",isDisabled:!0,value:k,style:{inputCode:{maxHeight:"50vh"}}})]}),k=`import type { optionItemType } from "src/components/_types"
import Button from "src/components/ui/button"
import DropdownMenu from "src/components/ui/dropdown-menu"

const DropdownDemo = () =>{

    const option:optionItemType[] = [
        {id:'option-one', txtLabel:'Option One'},
        {id:'option-two', txtLabel:'Option Two'},
        {
            id:'option-three', 
            txtLabel:'Option Three',
            childOption:[
                {id:'option-three-1', txtLabel:'Option Three-1'},
                {id:'option-three-2', txtLabel:'Option Three-2'},
                {id:'option-three-3', txtLabel:'Option Three-3'}
            ]
        }
    ]

    return(
        <DropdownMenu
            trigger={
                <Button txtLabel={'Dropdown Menu'}/>
            }
            options={option}
            onClick={(id)=>{
                alert(\`\${id} clicked\`)
            }}
            floatingConfig={{
                isCloseOnItemClicked:true //close dropdown after menu item clicked
            }}
        />
    )
}`,D=[{id:"option-one",txtLabel:"Option One"},{id:"option-two",txtLabel:"Option Two"},{id:"option-three",txtLabel:"Option Three",childOption:[{id:"option-three-1",txtLabel:"Option Three-1"},{id:"option-three-2",txtLabel:"Option Three-2"},{id:"option-three-3",txtLabel:"Option Three-3"}]}],O=()=>{const{setSectionRef:t}=p(),o=i.useMemo(()=>F,[]),n=i.useMemo(()=>C,[]);return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"api_ref",ref:t("api_ref"),children:e.jsx("p",{className:"text-title-xl",children:"API Reference"})}),e.jsxs("div",{id:"api_ref_1",ref:t("api_ref_1"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:e.jsx("span",{className:"text-title-lg text-code",children:"DropdownMenu"})}),e.jsx("p",{children:"Dropdown component that contain trigger and menu list item."}),e.jsx(h,{tableColumn:o,tableData:n})]})]})},T=()=>{const{setSectionRef:t}=p();return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"example",ref:t("example"),children:e.jsx("p",{className:"text-title-xl",children:"Example"})}),e.jsxs("div",{id:"example_1",ref:t("example_1"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:"Custom trigger"}),e.jsxs("p",{children:["Use functional component to cerate a trigger for ",e.jsx("span",{className:"text-code",children:"Dropdown"}),"."]}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-100)",alignItems:"center"},children:[e.jsx(u,{children:e.jsx("div",{style:{display:"flex",gap:"var(--space-100)",flexWrap:"wrap",justifyContent:"center"},children:e.jsx(y,{trigger:(o,n,j)=>e.jsxs("div",{children:[e.jsx("p",{children:`isDropdownOpen: ${j}`}),e.jsx("input",{ref:o,...n?n():{},placeholder:"Click to show dropdown..."})]}),options:S,onClick:o=>{alert(`${o} clicked`)},floatingConfig:{isCloseOnItemClicked:!0}})})}),e.jsx(f,{lang:"tsx",isDisabled:!0,value:I,style:{inputCode:{maxHeight:"50vh"}}})]})]})]})},I=`<DropdownMenu
    trigger={
        (triggerRef, getReferenceProps, isDropdownOpen)=>{
            return(
                <div>
                    <p>{\`isDropdownOpen: \${isDropdownOpen}\`}</p>
                    <input
                        ref={triggerRef}
                        {...(getReferenceProps?(getReferenceProps()):({}))}
                        placeholder="Click to show dropdown..."
                    />
                </div>
            )
        }
    }
    options={option}
    onClick={(id)=>{
        alert(\`\${id} clicked\`)
    }}
    floatingConfig={{
        isCloseOnItemClicked:true //close dropdown after menu item clicked
    }}
/>`,S=[{id:"option-one",txtLabel:"Option One"},{id:"option-two",txtLabel:"Option Two"},{id:"option-three",txtLabel:"Option Three",childOption:[{id:"option-three-1",txtLabel:"Option Three-1"},{id:"option-three-2",txtLabel:"Option Three-2"},{id:"option-three-3",txtLabel:"Option Three-3"}]}],M=()=>{const{setSectionRef:t}=p(),o=i.useMemo(()=>v,[]),n=i.useMemo(()=>w,[]);return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"keyboard",ref:t("keyboard"),children:e.jsx("p",{className:"text-title-xl",children:"Keyboard Interactions"})}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{children:"This component have several keyboard interaction for accesibility."}),e.jsx(h,{tableColumn:o,tableData:n})]})]})},E=()=>{const{setSectionList:t,setSectionRef:o}=p(),n=g();return i.useEffect(()=>{t(b)},[]),e.jsxs("div",{style:{display:"grid",gap:"var(--space-400)"},children:[e.jsxs("div",{id:"preview",ref:o("preview"),style:{display:"grid",gap:"var(--space-100)",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("p",{className:"text-title-xl",children:"Dropdown Menu"}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-25)"},children:[e.jsx(c,{icon:e.jsx(m,{className:"global-icon"}),txtLabel:`to ${l.name}`,onClick:()=>{n(`${s}${l.path}`)}}),e.jsx(c,{icon:e.jsx(x,{className:"global-icon"}),txtLabel:`to ${a.name}`,onClick:()=>{n(`${s}${a.path}`)}})]})]}),e.jsxs("p",{children:["Extension of ",e.jsx("span",{className:"text-code",children:"Dropdown"})," specifically for showing menu items. It also provide menu items in ",e.jsx("span",{className:"text-code",children:"BottomSheet"})," on mobile view."]}),e.jsx(L,{})]}),e.jsx(O,{}),e.jsx(T,{}),e.jsx(M,{}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-25)",justifyContent:"space-between",marginTop:"var(--space-500)"},children:[e.jsx(d,{iconBefore:e.jsx(m,{className:"global-icon"}),txtLabel:`${l.name}`,onClick:()=>{n(`${s}${l.path}`)}}),e.jsx(d,{iconAfter:e.jsx(x,{className:"global-icon"}),txtLabel:`${a.name}`,onClick:()=>{n(`${s}${a.path}`)}})]})]})};export{E as default};
