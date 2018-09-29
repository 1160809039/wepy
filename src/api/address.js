import wepy from 'wepy'

import {DOMAIN} from '../config/common';

export const saveAddress=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'saveAddress',
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

export const addressList=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'addressList',
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

export const selectAddress=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'selectAddress',
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


export const editAddress=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'editAddress',
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
export const selectDefault=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'selectDefault',
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


export const deleteAddress=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'deleteAddress',
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
