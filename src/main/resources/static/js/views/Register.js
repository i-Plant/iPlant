import CreateView from "../createView.js"
import {getUser} from "../auth.js";

export default function Register(props) {
    let user = getUser();
    console.log(user.userName);
    return `
    
`;
}

export function RegisterEvent(){

}