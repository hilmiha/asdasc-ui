import{j as e,D as f,B as c,r as s,ab as g,I as m,ag as x,e as y}from"./index-Bw5SDHRi.js";import{u as r,b as l}from"./index-DWIIQNJ3.js";import{a as d,I as h,T as u}from"./index-CQREFvNg.js";import{P as j}from"./preview-box-DTWTqvGV.js";import"./index-BYiuWcl5.js";const b="dropdown-menu",a={name:"Dropdown",path:"/dropdown"},p={name:"Icon Button",path:"/icon-button"},v=[{id:"preview",txtLabel:"Dropdown Menu",isSub:!1},{id:"api_ref",txtLabel:"API Refrence",isSub:!1},{id:"api_ref_1",txtLabel:"DropdownMenu",isSub:!0},{id:"example",txtLabel:"Example",isSub:!1},{id:"example_1",txtLabel:"Custom trigger",isSub:!0},{id:"keyboard",txtLabel:"Keyboard Interactions",isSub:!1}],w=[{key:"key",txtLable:"Key",size:{min:"100px",size:"1fr"}},{key:"description",txtLable:"Description",size:{min:"400px",size:"1fr"}}],F=[{id:"1",key:e.jsx(d,{txtLabel:"Space"}),description:e.jsxs("p",{children:["When focus is on an ",e.jsx("span",{className:"text-code",children:"Button"}),", press and do the ",e.jsx("span",{className:"text-code",children:"onClick"})," function."]})},{id:"2",key:e.jsx(d,{txtLabel:"Enter"}),description:e.jsxs("p",{children:["When focus is on an ",e.jsx("span",{className:"text-code",children:"Button"}),", press and do the ",e.jsx("span",{className:"text-code",children:"onClick"})," function."]})},{id:"3",key:e.jsx(d,{txtLabel:"Tab"}),description:e.jsx("p",{children:"Moves focus to the next focusable element."})}],C=[{key:"prop",txtLable:"Prop",size:{min:"195px",size:"0.5fr"}},{key:"type",txtLable:"Type",size:{min:"220px",size:"1fr"}},{key:"default",txtLable:"Default",size:{min:"100px",size:"0.3fr"}}],L=[{id:"1",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"className"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"2",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"trigger"}),type:e.jsxs(e.Fragment,{children:[e.jsx("p",{style:{fontFamily:"monospace"},children:"JSX.Element | "}),e.jsxs("p",{style:{fontFamily:"monospace"},children:["funtion (triggerRef, getReferenceProps, isDropdownOpen, trigger) => JSX.Element"," "]})]}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"3",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"style"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"dropdownMenuStyleType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"4",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"shape"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"globalShapeType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"5",prop:e.jsxs("p",{style:{fontFamily:"monospace"},children:["options",e.jsx("span",{style:{color:"var(--clr-danger-700)"},children:" *"})]}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"optionItemType[]"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"6",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"optionSelected"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string[]"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"7",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"optionSelectedAppearance"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"checkboxButtonAppearance"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"8",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"isDisabled"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"boolean"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"9",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onClick"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function (idOption, option, event) => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"10",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onOpen"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function () => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"11",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onClose"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function () => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"12",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"elementHeader"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"JSX.Element"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"13",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"elementFooter"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"JSX.Element"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"14",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"floatingConfig"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"dropdownFloatingConfigType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})}],k=()=>e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-300)",alignItems:"center"},children:[e.jsx(j,{children:e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsx(f,{trigger:e.jsx(c,{txtLabel:"Dropdown Menu"}),options:D,onClick:t=>{alert(`${t} clicked`)},floatingConfig:{isCloseOnItemClicked:!0}})})}),e.jsx(h,{lang:"tsx",isDisabled:!0,value:O,style:{inputCode:{maxHeight:"50vh"}}})]}),O=`import type { optionItemType } from "src/components/_types"
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
}`,D=[{id:"option-one",txtLabel:"Option One"},{id:"option-two",txtLabel:"Option Two"},{id:"option-three",txtLabel:"Option Three",childOption:[{id:"option-three-1",txtLabel:"Option Three-1"},{id:"option-three-2",txtLabel:"Option Three-2"},{id:"option-three-3",txtLabel:"Option Three-3"}]}],T=()=>{const{setSectionRef:t}=r(),n=s.useMemo(()=>C,[]),o=s.useMemo(()=>L,[]);return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"api_ref",ref:t("api_ref"),children:e.jsx("p",{className:"text-title-xl",children:"API Reference"})}),e.jsxs("div",{id:"api_ref_1",ref:t("api_ref_1"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:e.jsx("span",{className:"text-title-lg text-code",children:"DropdownMenu"})}),e.jsx("p",{children:"Dropdown component that contain trigger and menu list item."}),e.jsx(u,{tableColumn:n,tableData:o})]})]})},I=()=>{const{setSectionRef:t}=r();return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"example",ref:t("example"),children:e.jsx("p",{className:"text-title-xl",children:"Example"})}),e.jsxs("div",{id:"example_1",ref:t("example_1"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:"Custom trigger"}),e.jsxs("p",{children:["Use functional component to cerate a trigger for ",e.jsx("span",{className:"text-code",children:"Dropdown"}),"."]}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-100)",alignItems:"center"},children:[e.jsx(j,{children:e.jsx("div",{style:{display:"flex",gap:"var(--space-100)",flexWrap:"wrap",justifyContent:"center"},children:e.jsx(f,{trigger:(n,o,i)=>e.jsxs("div",{children:[e.jsx("p",{children:`isDropdownOpen: ${i}`}),e.jsx("input",{ref:n,...o?o():{},placeholder:"Click to show dropdown..."})]}),options:M,onClick:n=>{alert(`${n} clicked`)},floatingConfig:{isCloseOnItemClicked:!0}})})}),e.jsx(h,{lang:"tsx",isDisabled:!0,value:S,style:{inputCode:{maxHeight:"50vh"}}})]})]})]})},S=`<DropdownMenu
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
/>`,M=[{id:"option-one",txtLabel:"Option One"},{id:"option-two",txtLabel:"Option Two"},{id:"option-three",txtLabel:"Option Three",childOption:[{id:"option-three-1",txtLabel:"Option Three-1"},{id:"option-three-2",txtLabel:"Option Three-2"},{id:"option-three-3",txtLabel:"Option Three-3"}]}],N=()=>{const{setSectionRef:t}=r(),n=s.useMemo(()=>w,[]),o=s.useMemo(()=>F,[]);return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"keyboard",ref:t("keyboard"),children:e.jsx("p",{className:"text-title-xl",children:"Keyboard Interactions"})}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{children:"This component have several keyboard interaction for accesibility."}),e.jsx(u,{tableColumn:n,tableData:o})]})]})},E=()=>{const{setSectionList:t,setSectionRef:n,setPageOn:o}=r(),i=g();return s.useEffect(()=>{o(b),t(v)},[]),e.jsxs("div",{style:{display:"grid",gap:"var(--space-400)"},children:[e.jsxs("div",{id:"preview",ref:n("preview"),style:{display:"grid",gap:"var(--space-100)",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("p",{className:"text-title-xl",children:"Dropdown Menu"}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-25)"},children:[e.jsx(m,{icon:e.jsx(x,{className:"global-icon"}),txtLabel:`to ${a.name}`,onClick:()=>{i(`${l}${a.path}`)}}),e.jsx(m,{icon:e.jsx(y,{className:"global-icon"}),txtLabel:`to ${p.name}`,onClick:()=>{i(`${l}${p.path}`)}})]})]}),e.jsxs("p",{children:["Extension of ",e.jsx("span",{className:"text-code",children:"Dropdown"})," specifically for showing menu items. It also provide menu items in ",e.jsx("span",{className:"text-code",children:"BottomSheet"})," on mobile view."]}),e.jsx(k,{})]}),e.jsx(T,{}),e.jsx(I,{}),e.jsx(N,{}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-25)",justifyContent:"space-between",marginTop:"var(--space-500)"},children:[e.jsx(c,{iconBefore:e.jsx(x,{className:"global-icon"}),txtLabel:`${a.name}`,onClick:()=>{i(`${l}${a.path}`)}}),e.jsx(c,{iconAfter:e.jsx(y,{className:"global-icon"}),txtLabel:`${p.name}`,onClick:()=>{i(`${l}${p.path}`)}})]})]})};export{E as default};
