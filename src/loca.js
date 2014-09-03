var loca = (function () {
    var dict, inputDict, currentLng = -1,
        varMap = {};

    /*
        Sets the current loca dictionary
     */
    function setDict(newDict) {
        dict = newDict;
    }

    /*
        Set the current loca dictionary for buttons
     */
    function setButtonDict(newDict) {
        inputDict = newDict;
    }

    /*
     returns the loca data for a specific text id
     @id: text id
     @langId: language id
     */
    function getLocaData(id, langId) {
        if (!langId) {
            langId = 0;
        }
        if (!dict || !dict[id]) {
            return null;
        }
        if (!dict[id][langId]) {
            return dict[id][0];
        }
        return dict[id][langId];
    }

    /*
     returns the loca date for a specific text id but processes (replacing contained variables)
     */

    function getProcessedLocaData(id, langId) {
        var locaData = getLocaData(id, langId),
                varKey, varData, regex;

        if (!locaData) {
            return null;
        }

        // does it contain variables?
        var entry = dict[id];
        var options = entry[entry.length - 1];
        if (!options.containsVariables) {
            return locaData;
        }

        // replace all the variables
        for(var prop in varMap) {
            if(varMap.hasOwnProperty(prop)) {
                varKey = prop;
                varData = varMap[varKey];
                regex = new RegExp(varKey, 'g');
                locaData = locaData.replace(regex, varData);
            }
        }
        return locaData;
    }

    /*
     Applies all loca keys to the texts
     */
    function applyLocalization(langId)
    {
        currentLng = langId;

        var textSpans = document.getElementsByTagName("span"),
            inputs, input,
            locaValue, i, locaId;

        if (!textSpans) {
            return;
        }
        for (i = textSpans.length - 1; i >= 0; i--) {
            locaValue = loca.getProcessedLocaData(textSpans[i].getAttribute('data-loca-id'), langId);
            if (locaValue !== null) {
                textSpans[i].innerHTML = locaValue;
            }
        }

        // create a list of all inputs and their respective text-id
        inputs = document.getElementsByTagName("input");
        if (!inputDict && dict) {
            inputDict = {};
            for (i = inputs.length - 1; i >= 0; i--) {
                input = inputs[i];
                locaValue = getProcessedLocaData(input.value, langId);
                if (locaValue !== null) {
                    inputDict[input.id] = input.value;
                }
            }
        }

        // update all inputs
        for (i = inputs.length - 1; i >= 0; i--) {
            input = inputs[i];
            locaId = inputDict[input.id];
            if (locaId && input.value) {
                input.value = getProcessedLocaData(locaId, langId);
            }
        }
    }

    /*
        Updates the text in specified object with variables
     */
    function updateVariables(objid, langId) {

        if (!objid) {
            if (currentLng >= 0) {
                applyLocalization(currentLng);
            } else {
                return;
            }
        }

        var obj = document.getElementById(objid), locaId;
        if (!obj) {
            return;
        }
        if (obj.tagName === 'SPAN') {
            obj.innerHTML = getProcessedLocaData(objid, langId);
        } else if (obj.tagName === 'INPUT') {
           locaId = inputDict[obj.id];
           obj.value = getProcessedLocaData(locaId, langId);
        }
    }

    /*
        Sets a loca-variable, that can later be replaces in a loca-entry
    */
    function setVariable(key, value) {
        varMap[key] = value;
    }

    return {
        setDict: setDict,
        setButtonDict:setButtonDict,
        applyLocalization: applyLocalization,
        setVariable: setVariable,
        getLocaData: getLocaData,
        getProcessedLocaData: getProcessedLocaData,
        updateVariables: updateVariables,
        getLanguage: function () { return currentLng; },
        getVariable: function (key) { return varMap[key]; }
    };
})();
