import { toastError } from "../toastMessage";


export const checkTitle = (title) => {
    if(!title) {
        toastError("Please enter a title");
        return false;
    }
    if(title && title.length > 100)  {
        toastError("Max 100 characters in title");
        return false;
    }
    return true;
}


export const checkDescription = (description) => {
    if(!description) {
        toastError("Please enter some description");
        return false;
    }
    return true;
}