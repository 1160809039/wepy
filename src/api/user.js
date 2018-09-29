import wepy from 'wepy'

import {DOMAIN} from '../config/common';

export const getOpenId=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'getOpenId',
            data: param,
            method:'POST',
            header: {
              'content-type': 'application/json'
              }
        }).then(
            res=>resolve(res)
        ).catch(
            res=>reject(res)
        );
    }) 
}


export const login=function(param){
    return new Promise((resolve,reject)=>{
        return wepy.request({
            url: DOMAIN+'login',
            data: param,
            method:'POST',
            header: {
              'content-type': 'application/json'
              }
        }).then(
            res=>resolve(res)
        ).catch(
            res=>reject(res)
        );
    }) 
}
export const selectUser=function(param){
    return new Promise((resolve,reject)=>{
        return wepy.request({
            url: DOMAIN+'selectUser',
            data: param,
            method:'POST',
            header: {
              'content-type': 'application/json'
              }
        }).then(
            res=>resolve(res)
        ).catch(
            res=>reject(res)
        );
    }) 
}
