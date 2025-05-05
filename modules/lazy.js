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
    document.querySelectorAll("*[lsrc]").forEach((e)=>{
        fetch(e.lsrc).then()
    })
}())