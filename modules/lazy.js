/**
 ******************************************************************************************************************************
 * WARNING: This code is proprietary and under copyright law should NOT be redistrbuted, sold, or modified without permission *
 ******************************************************************************************************************************
 * Copyright (C) Ben3Coder Software 2025, All Rights Reserved.
 * Name: Lazyload module for secretSauce Framework
 * Author(s): Ben3Coder
 * Description: An simple lazy loading module.
 **/
!(function () {
    function handler(selector, callback) {
        document.querySelectorAll(`${selector}[lsrc]`).forEach(element => {
            callback(element, element.getAttribute("lsrc"));
        });
    }
    document.addEventListener("DOMContentLoaded", () => {
        handler("img,picture,script", (ele, attr) => {
            fetch(attr).then(async (content) => {
                if (content.status == 200) {
                    ele.src = URL.createObjectURL(await content.blob());
                    URL.revokeObjectURL(ele.src);
                } else {
                    throw new Error(`[CS] [LL]: Failed to load: ${ele} with source of ${attr}.\nRecieved status code of ${content.status} ${content.statusText}, expecting 200 OK`);
                }
            }).catch((error) => {
                throw new Error(`[CS] [LL]: Failed to load: ${ele} with source of ${attr}.\n${error}`);
            })
        })
        handler("ext", (ele, attr) => {
            // TODO: What is EXT? EXT is a external format that can load multiple different types of content
            // For now, ltype and lsrc are neded to support this
            if (attr && ele.getAttribute("ltype")) {
                
            }
        })
        //handler("script", (ele,attr)=>{
        //    fetch(attr).then(async (content) => {
        //        ele.src = URL.createObjectURL(await content.blob());
        //    })
        //})
    })
    //handler("img", (ele, attr) => {
    //    fetch(attr || "https://http.cat/images/404.jpg").then(async (content) => {
    //        ele.src = URL.createObjectURL(await content.blob());
    //    })
    //})
    //document.addEventListener("DOMContentLoaded", () => {
    //    document.querySelectorAll("*[lsrc]").forEach((e) => {
    //        fetch(e.getAttribute("lsrc")).then(async (c) => {
    //            e.src = URL.createObjectURL(await c.blob());
    //        })
    //    })
    //})
}())