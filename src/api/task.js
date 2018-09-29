import wepy from 'wepy'

import {DOMAIN} from '../config/common';

export const taskList=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'tasklist',
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

export const saveTask=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'saveTask',
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
export const saveReceive=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'saveReceive',
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

export const selectReceive=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'selectReceive',
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
export const getTaskById=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'getTaskById',
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


export const updateReceiveDelete=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'updateReceiveDelete',
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
export const updateReceiveEnd=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'updateReceiveEnd',
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

export const selectTaskByOpenId=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'selectTaskByOpenId',
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

export const selectTaskConfirmed=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'selectTaskConfirmed',
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


export const deleteTaskById=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'deleteTaskById',
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


export const updateTask=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'updateTask',
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


export const selectTaskMineOver=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'selectTaskMineOver',
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

export const updateReceiveConfirmEnd=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'updateReceiveConfirmEnd',
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

export const selectTaskMinePublish=function(param){
    return new Promise((resolve,reject)=>{
        wepy.request({
            url: DOMAIN+'selectTaskMinePublish',
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

