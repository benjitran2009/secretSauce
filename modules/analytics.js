//intergrity:false;
/**
 ******************************************************************************************************************************
 * WARNING: This code is proprietary and under copyright law should NOT be redistrbuted, sold, or modified without permission *
 ******************************************************************************************************************************
 * Copyright (C) Ben3Coder Software 2025, All Rights Reserved.
 * Name: Analytics module for secretSauce Framework
 * Author(s): Ben3Coder
 * Description: An advanced analytics module that does analytics, error logging, all in one.
 **/
(() => {
    
    /** Analytics Configuration **/
    var Analytics$Configuration = {
        // Analytics Server URL - Must be setup with secretSauce Analytics v2+
        ServerURL: "https://analytics.example.com/api/v2/",
        // AnalyticsVersion - If you have a lower version it will activate polyfills
        Version: 2,
        // [DEVELOPMENT]: Experiment Overrides
        Buckets: [
            // 0 - BypassInterceptionOverride
            false,
            // 1 - UseDummyServerURLOverride
            false,
            // 2 - 
        ],
    }

    pBucket = function (id, def) {
        def(Analytics$Configuration.Buckets[id]);
    };

    pBucket(0, function(val){
        switch(val) {
            case true:

            break;
            case false:

            break;
            default:

            ;
        }
    })

    pBucket(1, function(val){
        switch(val) {
            case true:
                // TODO: add 
                Analytics$Configuration.ServerURL = `https://${Math.random().toString().substring(2)}-dummy.ben3coder.dev`;
            break;
            case false:
                
            break;
            default:
                
            ;
        }
    })

    var Analytics =
        window.Analytics && typeof window.Analytics == typeof {} ?
            (() => {
                console.warn(`[WARN]: window.Analytics is already used, this could either mean the following:
    1. window.Analytics is already taken.
    2. window.Analytics is being intercepted by an external source.
    3. window could not exist (are you on browser environment?))`);
                // Perform a interception test before continuing
                window.Analytics.pM({
                    [Math.random()]:(Math.ramdom())
                })
                return window.Analytics
            })() :
            null
            || {}
    
})();