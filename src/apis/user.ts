import axios from 'axios';

const URL = 'http://192.168.0.104:3422/';

export async function register(data: any) {
    try {
        const result = await axios.post(URL + 'signup', data);
        console.log(result);
        return result.data;
    } catch (error) {
        return {
            error: error.message,
        }
    }
}

export async function login(data: any) {
    try {
        const result = await axios.post(URL + 'login', data);
        const mydata = "userInfo";
        //console.log(result);
        window.localStorage;
        localStorage.setItem(mydata, JSON.stringify(result.data.userDetails));
        const userDetails = localStorage.getItem(mydata);
        //console.log("uwuuuuuuu"+uname);


        return result.data;

    } catch (error) {
        return {
            error: error.message,
        }
    }
}

let userDetails: any | null = null;

export async function getPP() {
    if (userDetails !== null) {
        const result = await axios.get(URL + 'user-profile-picture', {
            headers: {
                "Authorization": userDetails.token,
            },
            responseType: "blob"
        });
        return result;
    }
    return null;
}
export function getUserDetails(): any | null {
    const data = localStorage.getItem("userInfo");
    if (data) {
        userDetails = JSON.parse(data)
    } else {
        return null;
    }
    return userDetails;
}

export function setUserDetails(value: string): any | null {
    localStorage.setItem("userInfo", value);
    userDetails = null;
}