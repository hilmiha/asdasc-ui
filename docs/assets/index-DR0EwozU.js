import{j as e,I as a,a7 as s,r as o,ao as h,at as u,s as f,B as j}from"./index-CdjMjSRI.js";import{u as d,b as c}from"./index-Ba7YnykJ.js";import{T as x,I as m,a as b}from"./index-CD83k7Aj.js";import{P as y}from"./preview-box-B-72PsAe.js";import"./index-BxH8xrSj.js";const g="icon-button",r={name:"Dropdown Menu",path:"/dropdown-menu"},p={name:"Input Date",path:"/input-date"},v=[{id:"preview",txtLabel:"Icon Button",isSub:!1},{id:"api_ref",txtLabel:"API Refrence",isSub:!1},{id:"api_ref_1",txtLabel:"IconButton",isSub:!0},{id:"example",txtLabel:"Example",isSub:!1},{id:"example_1",txtLabel:"Appearances",isSub:!0},{id:"example_2",txtLabel:"States",isSub:!0},{id:"keyboard",txtLabel:"Keyboard Interactions",isSub:!1}],F=[{key:"key",txtLable:"Key",size:{min:"100px",size:"1fr"}},{key:"description",txtLable:"Description",size:{min:"400px",size:"1fr"}}],L=[{id:"1",key:e.jsx(x,{txtLabel:"Space"}),description:e.jsxs("p",{children:["When focus is on an ",e.jsx("span",{className:"text-code",children:"Button"}),", press and do the ",e.jsx("span",{className:"text-code",children:"onClick"})," function."]})},{id:"2",key:e.jsx(x,{txtLabel:"Enter"}),description:e.jsxs("p",{children:["When focus is on an ",e.jsx("span",{className:"text-code",children:"Button"}),", press and do the ",e.jsx("span",{className:"text-code",children:"onClick"})," function."]})},{id:"3",key:e.jsx(x,{txtLabel:"Tab"}),description:e.jsx("p",{children:"Moves focus to the next focusable element."})}],B=[{key:"prop",txtLable:"Prop",size:{min:"140px",size:"0.5fr"}},{key:"type",txtLable:"Type",size:{min:"220px",size:"1fr"}},{key:"default",txtLable:"Default",size:{min:"100px",size:"0.3fr"}}],N=[{id:"1",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"ref"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"React.Ref<HTMLButtonElement>"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"2",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"id"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"3",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"className"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"4",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"style"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"iconButtonStyleType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"5",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"appearance"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"globalAppearanceType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:'"neutral"'})},{id:"6",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"shape"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"globalShapeType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"7",prop:e.jsxs("p",{style:{fontFamily:"monospace"},children:["icon",e.jsx("span",{style:{color:"var(--clr-danger-700)"},children:" *"})]}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"React.ReactNode"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"8",prop:e.jsxs("p",{style:{fontFamily:"monospace"},children:["txtLabel",e.jsx("span",{style:{color:"var(--clr-danger-700)"},children:" *"})]}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"9",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"isSelected"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"boolean"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"false"})},{id:"10",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"isDisabled"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"boolean"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"false"})},{id:"11",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"isLoading"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"boolean"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"false"})},{id:"12",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"isShowtooltip"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"boolean"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"true"})},{id:"13",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onClick"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function (event) => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})}],S=()=>e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-300)",alignItems:"center"},children:[e.jsx(y,{children:e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsx(a,{icon:e.jsx(s,{className:"global-icon"}),txtLabel:"Button",onClick:()=>{alert("Button Clicked")}})})}),e.jsx(m,{lang:"tsx",isDisabled:!0,value:I,style:{inputCode:{maxHeight:"50vh"}}})]}),I=`import { PiStarFourBold } from "react-icons/pi"
import IconButton from "src/components/ui/icon-button"

const IconButtonDemo = () =>{

    return(
        <IconButton 
            icon={<PiStarFourBold className="global-icon"/>}
            txtLabel={'Button'}
            onClick={()=>{alert("Button Clicked");}}
        />
    )
}`,C=()=>{const{setSectionRef:t}=d(),n=o.useMemo(()=>B,[]),l=o.useMemo(()=>N,[]);return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"api_ref",ref:t("api_ref"),children:e.jsx("p",{className:"text-title-xl",children:"API Reference"})}),e.jsxs("div",{id:"api_ref_1",ref:t("api_ref_1"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:e.jsx("span",{className:"text-title-lg text-code",children:"IconButton"})}),e.jsx("p",{children:"The button."}),e.jsx(b,{tableColumn:n,tableData:l})]})]})},k=()=>{const{setSectionRef:t}=d();return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"example",ref:t("example"),children:e.jsx("p",{className:"text-title-xl",children:"Example"})}),e.jsxs("div",{id:"example_1",ref:t("example_1"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:"Appearances"}),e.jsxs("p",{children:[e.jsx("span",{className:"text-code",children:"IconButton"})," have several appearances can be used for difrent type of context and function."]}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-100)",alignItems:"center"},children:[e.jsx(y,{children:e.jsxs("div",{style:{display:"flex",gap:"var(--space-100)",flexWrap:"wrap",justifyContent:"center"},children:[e.jsx(a,{icon:e.jsx(s,{className:"global-icon"}),txtLabel:"Neutral",appearance:"neutral"}),e.jsx(a,{icon:e.jsx(s,{className:"global-icon"}),txtLabel:"Primary",appearance:"primary"}),e.jsx(a,{icon:e.jsx(s,{className:"global-icon"}),txtLabel:"Danger",appearance:"danger"}),e.jsx(a,{icon:e.jsx(s,{className:"global-icon"}),txtLabel:"Warning",appearance:"warning"}),e.jsx(a,{icon:e.jsx(s,{className:"global-icon"}),txtLabel:"Success",appearance:"success"}),e.jsx(a,{icon:e.jsx(s,{className:"global-icon"}),txtLabel:"Subtle",appearance:"subtle"})]})}),e.jsx(m,{lang:"tsx",isDisabled:!0,value:P,style:{inputCode:{maxHeight:"50vh"}}})]})]}),e.jsxs("div",{id:"example_2",ref:t("example_2"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:"States"}),e.jsxs("p",{children:[e.jsx("span",{className:"text-code",children:"Button"})," alse have several states."]}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-100)",alignItems:"center"},children:[e.jsx(y,{children:e.jsxs("div",{style:{display:"flex",gap:"var(--space-100)",flexWrap:"wrap",justifyContent:"center"},children:[e.jsx(a,{icon:e.jsx(s,{className:"global-icon"}),txtLabel:"Loading",isLoading:!0}),e.jsx(a,{icon:e.jsx(s,{className:"global-icon"}),txtLabel:"Disabled",isDisabled:!0}),e.jsx(a,{icon:e.jsx(s,{className:"global-icon"}),txtLabel:"Selected",isSelected:!0})]})}),e.jsx(m,{lang:"tsx",isDisabled:!0,value:D,style:{inputCode:{maxHeight:"50vh"}}})]})]})]})},P=`<IconButton
    icon={<PiStarFourBold className="global-icon"/>}
    txtLabel={'Neutral'}
    appearance="neutral"
/>
<IconButton
    icon={<PiStarFourBold className="global-icon"/>}
    txtLabel={'Primary'}
    appearance="primary"
/>
<IconButton
    icon={<PiStarFourBold className="global-icon"/>}
    txtLabel={'Danger'}
    appearance="danger"
/>
<IconButton
    icon={<PiStarFourBold className="global-icon"/>}
    txtLabel={'Warning'}
    appearance="warning"
/>
<IconButton
    icon={<PiStarFourBold className="global-icon"/>}
    txtLabel={'Success'}
    appearance="success"
/>
<IconButton
    icon={<PiStarFourBold className="global-icon"/>}
    txtLabel={'Subtle'}
    appearance="subtle"
/>`,D=`<IconButton
    icon={<PiStarFourBold className="global-icon"/>} 
    txtLabel={'Loading'}
    isLoading={true}
/>
<IconButton
    icon={<PiStarFourBold className="global-icon"/>} 
    txtLabel={'Disabled'}
    isDisabled={true}
/>
<IconButton
    icon={<PiStarFourBold className="global-icon"/>} 
    txtLabel={'Selected'}
    isSelected={true}
/>`,_=()=>{const{setSectionRef:t}=d(),n=o.useMemo(()=>F,[]),l=o.useMemo(()=>L,[]);return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"keyboard",ref:t("keyboard"),children:e.jsx("p",{className:"text-title-xl",children:"Keyboard Interactions"})}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{children:"This component have several keyboard interaction for accesibility."}),e.jsx(b,{tableColumn:n,tableData:l})]})]})},A=()=>{const{setSectionList:t,setSectionRef:n,setPageOn:l}=d(),i=h();return o.useEffect(()=>{l(g),t(v)},[]),e.jsxs("div",{style:{display:"grid",gap:"var(--space-400)"},children:[e.jsxs("div",{id:"preview",ref:n("preview"),style:{display:"grid",gap:"var(--space-100)",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("p",{className:"text-title-xl",children:"Icon Button"}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-25)"},children:[e.jsx(a,{icon:e.jsx(u,{className:"global-icon"}),txtLabel:`to ${r.name}`,onClick:()=>{i(`${c}${r.path}`)}}),e.jsx(a,{icon:e.jsx(f,{className:"global-icon"}),txtLabel:`to ${p.name}`,onClick:()=>{i(`${c}${p.path}`)}})]})]}),e.jsx("p",{children:"A button with only icon that triggers an event or action."}),e.jsx(S,{})]}),e.jsx(C,{}),e.jsx(k,{}),e.jsx(_,{}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-25)",justifyContent:"space-between",marginTop:"var(--space-500)"},children:[e.jsx(j,{iconBefore:e.jsx(u,{className:"global-icon"}),txtLabel:`${r.name}`,onClick:()=>{i(`${c}${r.path}`)}}),e.jsx(j,{iconAfter:e.jsx(f,{className:"global-icon"}),txtLabel:`${p.name}`,onClick:()=>{i(`${c}${p.path}`)}})]})]})};export{A as default};
