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
                ele.src = URL.createObjectURL(await content.blob());
            })
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