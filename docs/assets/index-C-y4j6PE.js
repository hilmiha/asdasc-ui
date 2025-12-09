import{j as e,r as s,K as g,I as f,Q as u,O as h,f as j}from"./index-BiVYdiuu.js";import{u as r,b as a}from"./index-fK5WIn3F.js";import{T as d}from"./index-CcH9sF55.js";import{I as x}from"./index-D9UCkygy.js";import{S as c}from"./index-DIxxRfyN.js";import{P as y}from"./preview-box-BkEhfTul.js";import{T as b}from"./index-CcPH6Cbu.js";import{p as v}from"./helper-D8J10eng.js";/* empty css               */const F="split-button",l={name:"Spinner",path:"/spinner"},p={name:"Switch",path:"/switch"},L=[{id:"preview",txtLabel:"Dropdown Menu",isSub:!1},{id:"api_ref",txtLabel:"API Refrence",isSub:!1},{id:"api_ref_1",txtLabel:"DropdownMenu",isSub:!0},{id:"example",txtLabel:"Example",isSub:!1},{id:"example_1",txtLabel:"Disabled states",isSub:!0},{id:"example_2",txtLabel:"Appearances",isSub:!0},{id:"keyboard",txtLabel:"Keyboard Interactions",isSub:!1}],S=[{key:"key",txtLabel:"Key",size:{min:"100px",size:"1fr"}},{key:"description",txtLabel:"Description",size:{min:"400px",size:"1fr"}}],C=[{id:"1",key:e.jsx(d,{txtLabel:"Space"}),description:e.jsxs("p",{children:["When focus is on an ",e.jsx("span",{className:"text-code",children:"Button"}),", press and do the ",e.jsx("span",{className:"text-code",children:"onClick"})," function."]})},{id:"2",key:e.jsx(d,{txtLabel:"Enter"}),description:e.jsxs("p",{children:["When focus is on an ",e.jsx("span",{className:"text-code",children:"Button"}),", press and do the ",e.jsx("span",{className:"text-code",children:"onClick"})," function."]})},{id:"3",key:e.jsx(d,{txtLabel:"Tab"}),description:e.jsx("p",{children:"Moves focus to the next focusable element."})}],k=[{key:"prop",txtLabel:"Prop",size:{min:"195px",size:"0.5fr"}},{key:"type",txtLabel:"Type",size:{min:"220px",size:"1fr"}},{key:"default",txtLabel:"Default",size:{min:"100px",size:"0.3fr"}}],T=[{id:"1",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"ref"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"React.Ref<HTMLDivElement>"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"2",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"id"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"3",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"className"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"4",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"style"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"splitButtonStyleType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"5",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"appearance"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"'neutral' | 'primary'"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"6",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"shape"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"globalShapeType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"7",prop:e.jsxs("p",{style:{fontFamily:"monospace"},children:["txtLabel",e.jsx("span",{style:{color:"var(--clr-danger-700)"},children:" *"})]}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"8",prop:e.jsxs("p",{style:{fontFamily:"monospace"},children:["options",e.jsx("span",{style:{color:"var(--clr-danger-700)"},children:" *"})]}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"optionItemType[]"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"9",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"optionSelected"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string[]"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"10",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"iconBefore"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"JSX.Element"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"11",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"iconAfter"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"JSX.Element"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"12",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"isDisabled"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"boolean"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"13",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onClick"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function (event) => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"14",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onOptionClick"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function (idButton, event) => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"15",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"floatingConfig"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"dropdownFloatingConfigType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})}],B=()=>e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-300)",alignItems:"center"},children:[e.jsx(y,{children:e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsx(c,{txtLabel:"Main Action",options:I,onClick:()=>{alert("Main Action clicked")},onOptionClick:t=>{alert(`${t} option clicked`)},floatingConfig:{isCloseOnItemClicked:!0,width:140}})})}),e.jsx(x,{lang:"tsx",isDisabled:!0,value:w,style:{inputCode:{maxHeight:"50vh"}}})]}),w=`import type { optionItemType } from "src/components/_types"
import SplitButton from "src/components/ui/split-button"

const SplitButtonDemo = () =>{

    const option:optionItemType[] = [
        {id:'action-one', txtLabel:'Action One'},
        {id:'action-two', txtLabel:'Action Two'},
    ]

    return(
        <SplitButton
            txtLabel="Main Action"
            options={option}
            onClick={()=>{
                alert(\`Main clicked\`)
            }}
            onOptionClick={(id)=>{
                alert(\`\${id} option clicked\`)
            }}

            //optional configuration for dropdown menu
            dropdownFloatingConfigType={{ 
                isCloseOnItemClicked:true,
                width:140,
            }}
        />
    )
}`,I=[{id:"action-one",txtLabel:"Action One"},{id:"action-two",txtLabel:"Action Two"}],N=()=>{const{setSectionRef:t}=r(),n=s.useMemo(()=>k,[]),i=s.useMemo(()=>(console.log(v(`
            ref?:React.Ref<HTMLDivElement>;
            id?:string;
            className?:string;
            style?:splitButtonStyleType;
            appearance?: 'neutral' | 'primary';
            shape?:globalShapeType;
            txtLabel:string;
            options:optionItemType[];
            optionSelected?:string[];
            iconBefore?:JSX.Element;
            iconAfter?:JSX.Element;
            isDisabled?:boolean;
            onClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void;
            onOptionClick?:(idButton:string, e:React.MouseEvent<HTMLButtonElement>)=>void;
            floatingConfig?:dropdownFloatingConfigType;
        `)),T),[]);return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"api_ref",ref:t("api_ref"),children:e.jsx("p",{className:"text-title-xl",children:"API Reference"})}),e.jsxs("div",{id:"api_ref_1",ref:t("api_ref_1"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:e.jsx("span",{className:"text-title-lg text-code",children:"SplitButton"})}),e.jsx("p",{children:"The main button and dropdown menu button."}),e.jsx(b,{tableColumn:n,tableData:i})]})]})},A=()=>{const{setSectionRef:t}=r();return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"example",ref:t("example"),children:e.jsx("p",{className:"text-title-xl",children:"Example"})}),e.jsxs("div",{id:"example_1",ref:t("example_1"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:"Disabled state"}),e.jsxs("p",{children:[e.jsx("span",{className:"text-code",children:"Split Button"})," can be disabled using ",e.jsx("span",{className:"text-code",children:"idDisabled"})," prop."]}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-100)",alignItems:"center"},children:[e.jsx(y,{children:e.jsx("div",{style:{display:"flex",gap:"var(--space-100)",flexWrap:"wrap",justifyContent:"center"},children:e.jsx(c,{txtLabel:"Main Action",isDisabled:!0,options:m})})}),e.jsx(x,{lang:"tsx",isDisabled:!0,value:M,style:{inputCode:{maxHeight:"50vh"}}})]})]}),e.jsxs("div",{id:"example_2",ref:t("example_2"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:"Appearances"}),e.jsxs("p",{children:[e.jsx("span",{className:"text-code",children:"Split Button"})," have several appearances can be used for difrent type of context and function."]}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-100)",alignItems:"center"},children:[e.jsx(y,{children:e.jsxs("div",{style:{display:"flex",gap:"var(--space-100)",flexWrap:"wrap",justifyContent:"center"},children:[e.jsx(c,{txtLabel:"Neutral Looks Action",appearance:"neutral",options:m}),e.jsx(c,{txtLabel:"Primary Looks Action",appearance:"primary",options:m})]})}),e.jsx(x,{lang:"tsx",isDisabled:!0,value:D,style:{inputCode:{maxHeight:"50vh"}}})]})]})]})},D=`<>
    <SplitButton
        txtLabel="Neutral Looks Action"
        appearance="neutral"
        options={option}
    />
    <SplitButton
        txtLabel="Primary Looks Action"
        appearance="primary"
        options={option}
    />
</>`,M=`<SplitButton
    txtLabel="Main Action"
    isDisabled={true}
    options={option}
/>`,m=[{id:"option-one",txtLabel:"Option One"},{id:"option-two",txtLabel:"Option Two"}],_=()=>{const{setSectionRef:t}=r(),n=s.useMemo(()=>S,[]),i=s.useMemo(()=>C,[]);return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"keyboard",ref:t("keyboard"),children:e.jsx("p",{className:"text-title-xl",children:"Keyboard Interactions"})}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{children:"This component have several keyboard interaction for accesibility."}),e.jsx(b,{tableColumn:n,tableData:i})]})]})},W=()=>{const{setSectionList:t,setSectionRef:n,setPageOn:i}=r(),o=g();return s.useEffect(()=>{i(F),t(L)},[]),e.jsxs("div",{style:{display:"grid",gap:"var(--space-400)"},children:[e.jsxs("div",{id:"preview",ref:n("preview"),style:{display:"grid",gap:"var(--space-100)",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("p",{className:"text-title-xl",children:"Split Button"}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-100)"},children:[e.jsx(f,{icon:e.jsx(u,{className:"global-icon"}),txtLabel:`to ${l.name}`,onClick:()=>{o(`${a}${l.path}`)}}),e.jsx(f,{icon:e.jsx(h,{className:"global-icon"}),txtLabel:`to ${p.name}`,onClick:()=>{o(`${a}${p.path}`)}})]})]}),e.jsx("p",{children:"Combination of button as action and dropdown menu as other action."}),e.jsx(B,{})]}),e.jsx(N,{}),e.jsx(A,{}),e.jsx(_,{}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-25)",justifyContent:"space-between",marginTop:"var(--space-500)"},children:[e.jsx(j,{iconBefore:e.jsx(u,{className:"global-icon"}),txtLabel:`${l.name}`,onClick:()=>{o(`${a}${l.path}`)}}),e.jsx(j,{iconAfter:e.jsx(h,{className:"global-icon"}),txtLabel:`${p.name}`,onClick:()=>{o(`${a}${p.path}`)}})]})]})};export{W as default};
