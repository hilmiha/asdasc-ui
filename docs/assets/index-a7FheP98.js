import{j as e,D as y,B as o,r as a,as as g,I as m,av as x,x as u}from"./index-B21eXWte.js";import{u as p,b as i}from"./index-C5UVEL-W.js";import{T as c,I as f,a as h}from"./index-CdK-XHV9.js";import{P as j}from"./preview-box-DT9sS-zz.js";import{p as b}from"./helper-D8J10eng.js";import"./index-BAOnR_za.js";const l={name:"Checkbox",path:"/checkbox"},r={name:"Dropdown Menu",path:"/dropdown-menu"},v=[{id:"preview",txtLabel:"Dropdown",isSub:!1},{id:"api_ref",txtLabel:"API Refrence",isSub:!1},{id:"api_ref_1",txtLabel:"Dropdown",isSub:!0},{id:"example",txtLabel:"Example",isSub:!1},{id:"example_1",txtLabel:"Custom trigger",isSub:!0},{id:"keyboard",txtLabel:"Keyboard Interactions",isSub:!1}],w=[{key:"key",txtLable:"Key",size:{min:"100px",size:"1fr"}},{key:"description",txtLable:"Description",size:{min:"400px",size:"1fr"}}],F=[{id:"1",key:e.jsx(c,{txtLabel:"Space"}),description:e.jsxs("p",{children:["When focus is on an ",e.jsx("span",{className:"text-code",children:"Button"}),", press and do the ",e.jsx("span",{className:"text-code",children:"onClick"})," function."]})},{id:"2",key:e.jsx(c,{txtLabel:"Enter"}),description:e.jsxs("p",{children:["When focus is on an ",e.jsx("span",{className:"text-code",children:"Button"}),", press and do the ",e.jsx("span",{className:"text-code",children:"onClick"})," function."]})},{id:"3",key:e.jsx(c,{txtLabel:"Tab"}),description:e.jsx("p",{children:"Moves focus to the next focusable element."})}],D=[{key:"prop",txtLable:"Prop",size:{min:"140px",size:"0.5fr"}},{key:"type",txtLable:"Type",size:{min:"220px",size:"1fr"}},{key:"default",txtLable:"Default",size:{min:"100px",size:"0.3fr"}}],L=[{id:"1",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"className"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"string"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"2",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"trigger"}),type:e.jsxs(e.Fragment,{children:[e.jsx("p",{style:{fontFamily:"monospace"},children:"JSX.Element | "}),e.jsxs("p",{style:{fontFamily:"monospace"},children:["funtion (triggerRef, getReferenceProps, isDropdownOpen, trigger) => JSX.Element"," "]})]}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"3",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"style"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"dropdownStyleType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"4",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"shape"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"globalShapeType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"5",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"isDisabled"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"boolean"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"6",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onOpen"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function () => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"7",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"onClose"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"function () => void"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"8",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"elementHeader"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"JSX.Element"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"9",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"elementFooter"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"JSX.Element"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"10",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"children"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"JSX.Element | JSX.Element[]"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"11",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"triggerClose"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"1|0"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})},{id:"12",prop:e.jsx("p",{style:{fontFamily:"monospace"},children:"floatingConfig"}),type:e.jsx("p",{style:{fontFamily:"monospace"},children:"dropdownFloatingConfigType"}),default:e.jsx("p",{style:{fontFamily:"monospace"},children:"undefined"})}],C=()=>e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-300)",alignItems:"center"},children:[e.jsx(j,{children:e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsx(y,{trigger:e.jsx(o,{txtLabel:"Show Dropdown"}),elementHeader:e.jsx("p",{className:"text-title-lg",children:"Header"}),elementFooter:e.jsxs("div",{style:{display:"flex",justifyContent:"end"},children:[e.jsx(o,{txtLabel:"Button"}),e.jsx(o,{txtLabel:"Button",appearance:"primary"})]}),children:e.jsx("p",{children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis, eius recusandae nam aliquid repudiandae accusantium? Dolor cupiditate autem voluptatum praesentium consectetur quisquam. Voluptates, tenetur? Maxime cum voluptatibus totam fugit natus!"})})})}),e.jsx(f,{lang:"tsx",isDisabled:!0,value:S,style:{inputCode:{maxHeight:"50vh"}}})]}),S=`import Button from "src/components/ui/button"
import Dropdown from "src/components/ui/dropdown"

const DropdownDemo = () =>{

    return(
        <Dropdown
            trigger={(
                <Button txtLabel={'Show Dropdown'}/>
            )}
            elementHeader={(
                <p className="text-title-lg">Header</p>
            )}
            elementFooter={(
                <div style={{display:'flex', justifyContent:'end'}}>
                    <Button txtLabel={'Button'}/>
                    <Button txtLabel={'Button'} appearance="primary"/>
                </div>
            )}
        >
            <p>Lorem ipsum dolor sit amet...</p>
        </Dropdown>
    )
}`,k=()=>{const{setSectionRef:n}=p(),s=a.useMemo(()=>D,[]),t=a.useMemo(()=>{const d=b(`
            className?:string;
            trigger:JSX.Element | ((
                triggerRef: React.RefCallback<HTMLElement>, 
                getReferenceProps: (userProps?: React.HTMLProps<Element>) => Record<string, unknown>,
                isDropdownOpen:boolean, 
                trigger:React.MutableRefObject<Element | null> | React.MutableRefObject<HTMLElement | null>,
            ) => JSX.Element);
            style?:dropdownStyleType;
            shape?:globalShapeType;
            isDisabled?:boolean;
            onOpen?: () => void;
            onClose?: () => void;
            elementHeader?:JSX.Element;
            elementFooter?:JSX.Element;
            children?:JSX.Element | JSX.Element[];
            triggerClose?:1|0;
            floatingConfig?:dropdownFloatingConfigType;
        `);return console.log(d),L},[]);return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"api_ref",ref:n("api_ref"),children:e.jsx("p",{className:"text-title-xl",children:"API Reference"})}),e.jsxs("div",{id:"api_ref_1",ref:n("api_ref_1"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:e.jsx("span",{className:"text-title-lg text-code",children:"Dropdown"})}),e.jsx("p",{children:"Dropdown component that contain trigger and content as the children."}),e.jsx(h,{tableColumn:s,tableData:t})]})]})},R=()=>{const{setSectionRef:n}=p();return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"example",ref:n("example"),children:e.jsx("p",{className:"text-title-xl",children:"Example"})}),e.jsxs("div",{id:"example_1",ref:n("example_1"),style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{className:"text-title-lg",children:"Custom trigger"}),e.jsxs("p",{children:["Use functional component to cerate a trigger for ",e.jsx("span",{className:"text-code",children:"Dropdown"}),"."]}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-100)",marginTop:"var(--space-100)",alignItems:"center"},children:[e.jsx(j,{children:e.jsx("div",{style:{display:"flex",gap:"var(--space-100)",flexWrap:"wrap",justifyContent:"center"},children:e.jsx(y,{trigger:(s,t,d)=>e.jsxs("div",{children:[e.jsx("p",{children:`isDropdownOpen: ${d}`}),e.jsx("input",{ref:s,...t(),placeholder:"Click to show dropdown..."})]}),elementHeader:e.jsx("p",{className:"text-title-lg",children:"Header"}),elementFooter:e.jsxs("div",{style:{display:"flex",justifyContent:"end"},children:[e.jsx(o,{txtLabel:"Button"}),e.jsx(o,{txtLabel:"Button",appearance:"primary"})]}),children:e.jsx("p",{children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis, eius recusandae nam aliquid repudiandae accusantium? Dolor cupiditate autem voluptatum praesentium consectetur quisquam. Voluptates, tenetur? Maxime cum voluptatibus totam fugit natus!"})})})}),e.jsx(f,{lang:"tsx",isDisabled:!0,value:B,style:{inputCode:{maxHeight:"50vh"}}})]})]})]})},B=`<Dropdown
    trigger={
        (triggerRef, getReferenceProps, isDropdownOpen)=>{
            return(
                <div>
                    <p>{\`isDropdownOpen: \${isDropdownOpen}\`}</p>
                    <input
                        ref={triggerRef}
                        {...getReferenceProps()}
                        placeholder="Click to open dropdown..."
                    />
                </div>
            )
        }
    }
    elementHeader={(
        <p className="text-title-lg">Header</p>
    )}
    elementFooter={(
        <div style={{display:'flex', justifyContent:'end'}}>
            <Button txtLabel={'Button'}/>
            <Button txtLabel={'Button'} appearance="primary"/>
        </div>
    )}
>
    <p>Lorem ipsum dolor sit amet...</p>
</Dropdown>`,E=()=>{const{setSectionRef:n}=p(),s=a.useMemo(()=>w,[]),t=a.useMemo(()=>F,[]);return e.jsxs(e.Fragment,{children:[e.jsx("div",{id:"keyboard",ref:n("keyboard"),children:e.jsx("p",{className:"text-title-xl",children:"Keyboard Interactions"})}),e.jsxs("div",{style:{display:"grid",gap:"var(--space-150)"},children:[e.jsx("p",{children:"This component have several keyboard interaction for accesibility."}),e.jsx(h,{tableColumn:s,tableData:t})]})]})},_=()=>{const{setSectionList:n,setSectionRef:s}=p(),t=g();return a.useEffect(()=>{n(v)},[]),e.jsxs("div",{style:{display:"grid",gap:"var(--space-400)"},children:[e.jsxs("div",{id:"preview",ref:s("preview"),style:{display:"grid",gap:"var(--space-100)",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("p",{className:"text-title-xl",children:"Dropdown"}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-25)"},children:[e.jsx(m,{icon:e.jsx(x,{className:"global-icon"}),txtLabel:`to ${l.name}`,onClick:()=>{t(`${i}${l.path}`)}}),e.jsx(m,{icon:e.jsx(u,{className:"global-icon"}),txtLabel:`to ${r.name}`,onClick:()=>{t(`${i}${r.path}`)}})]})]}),e.jsx("p",{children:"A dropdown that opens within a portal, triggered and anchored by its associated button."}),e.jsx(C,{})]}),e.jsx(k,{}),e.jsx(R,{}),e.jsx(E,{}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-25)",justifyContent:"space-between",marginTop:"var(--space-500)"},children:[e.jsx(o,{iconBefore:e.jsx(x,{className:"global-icon"}),txtLabel:`${l.name}`,onClick:()=>{t(`${i}${l.path}`)}}),e.jsx(o,{iconAfter:e.jsx(u,{className:"global-icon"}),txtLabel:`${r.name}`,onClick:()=>{t(`${i}${r.path}`)}})]})]})};export{_ as default};
