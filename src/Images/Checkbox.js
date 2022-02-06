import * as React from "react"

const Checkbox = (props) => {
    const collor = props.props === true ? "#ffffff" : '';
    return (
        <svg width="55" height="55" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 5C5.897 5 5 5.897 5 7V17C5 18.103 5.897 19 7 19H17C18.103 19 19 18.103 19 17V7C19 5.897 18.103 5 17 5H7ZM7 17V7H17L17.002 17H7Z"  fill="#ffffff"/>
        <path d="M10.996 12.556L9.7 11.285L8.3 12.715L11.004 15.362L15.703 10.711L14.297 9.289L10.996 12.556Z" fill={collor}/>
        </svg>
    )
};

export default Checkbox;