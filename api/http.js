
import eventRead, { getToken, getUserId } from "./interceptors"
import getPhysiciansQuestions from "./interceptors"
import { getUser } from "@okta/okta-react-native";
import axios from 'axios';
import moment from 'moment';

export async function getUserEvents(){
    try {
        const res = await eventRead();
        return res
    } catch (error) {
        console.error(error)
    }
}

export async function getPhyQuestions(){
    try {
        const res = await axios.get('https://app.personicle.org/physician/questions', {
            headers: {
                'Authorization': `Bearer ${await getToken()}`
              }
        })
        // console.error(res)
        
        return res
    } catch (error) {
        console.error(error)
    }
}

export async function updateUserInfo(data) {
    console.error(data)
    try {
        const res = await axios.post('https://app.personicle.org/api/update/user', data, {
            headers: {
                'Authorization': `Bearer ${await getToken()}`
              }
        })
        return res
    } catch (error) {
        console.error(error)
    }
}

export async function getPhyName(phyId){
    try {
        const res = await axios.get(`https://app.personicle.org/api/physician/${phyId}`, {
            headers: {
                'Authorization': `Bearer ${await getToken()}`
              }
        })
        return res
    } catch (error) {
        console.error(error)        
    }
}

export async function sendPhysicianResponses (data_packet){
    console.error(data_packet)
    try {
        const res = await axios.post('https://staging.personicle.org/data/write/datastream/upload', data_packet, {
            headers: {
                'Authorization': `Bearer ${await getToken()}`
              }
        })

        // console.error(res)
        
        return res
    } catch (error) {
        console.error(error)
    }
}


export async function getDatastreams(datatype,dataSource=undefined,start=undefined, end=undefined){

    try {
        const token = await getToken();
        const userId = await getUserId();
   
        let params = {}
        const endTime = end === undefined ? moment().utc().format("YYYY-MM-DD HH:mm:ss.SSSSSS").toString() : end 
        const startTime = end === undefined ? moment().utc().subtract(3,'months').format("YYYY-MM-DD HH:mm:ss.SSSSSS").toString() : start 

        if (dataSource == undefined){
            params = {
                datatype: datatype,
                startTime: startTime,
                endTime: endTime,
                user_id: userId
            };
        }else {
            params = {
                datatype: datatype,
                source: dataSource,
                startTime: startTime,
                endTime: endTime,
                user_id: userId
            };
        }
       
        let config = {}
        config['params'] = params;
        config['headers'] = {
            'Authorization': `Bearer ${token}`
        }
        const res = await axios.get('https://api.personicle.org/data/read/datastreams', config)
        console.error("fsdfd")

        console.error(res)
        return res
    } catch (error) {
        console.error(error)
    }
}