// Super amazing, cross browser property function, based on http://thewikies.com/
Object.addProperty = function (obj, name, attributes) {
    if (window.isDefinePropertyAvailable) {
        if (attributes.get && attributes.set) {
            Object.defineProperty(obj, name, {
                get: attributes.get,
                set: attributes.set,
                enumerable: attributes.enumerable,
                configurable: attributes.configurable
            });
        }
        else {
            Object.defineProperty(obj, name, {
                enumerable: attributes.enumerable,
                configurable: attributes.configurable
            });
        }
        return;
    }

    else if (!obj.isDOMObject && !obj.nodeName)
        return;

    var onGet = attributes.get;
    var onSet = attributes.set;

    // wrapper functions
    var
        oldValue = obj[name],
        getFn = function () {
            return onGet.apply(obj, [oldValue]);
        },

        setFn = function (newValue) {
            return oldValue = onSet.apply(obj, [newValue]);
        };

    // Modern browsers, IE9+, and IE8 (must be a DOM object),
    if (Object.defineProperty) {
        if (document.body)
            Object.defineProperty(obj, name, {
                get: attributes.get,
                set: attributes.set,
                //enumerable: attributes.enumerable,
                configurable: true
            });
        else {
            obj[name] = oldValue;
            $(document).ready(function () {
                var r = Object.getOwnPropertyDescriptor(obj, name);
                if (r.get)
                    return;
                else if (r.value != undefined) {
                    attributes.set.call(obj, r.value);
                }
                Object.defineProperty(obj, name, {
                    get: attributes.get,
                    set: attributes.set,
                    //enumerable: attributes.enumerable,
                    configurable: true
                });
            });
        }

        // Older Mozilla
    } else if (obj.__defineGetter__) {

        obj.__defineGetter__(name, getFn);
        obj.__defineSetter__(name, setFn);

        // IE6-7
        // must be a real DOM object (to have attachEvent) and must be attached to document (for onpropertychange to fire)
    } else {

        var onPropertyChange = function (e) {

            if (event.propertyName == name) {
                // temporarily remove the event so it doesn't fire again and create a loop
                obj.detachEvent("onpropertychange", onPropertyChange);

                // get the changed value, run it through the set function
                var newValue = setFn(obj[name]);

                // restore the get function
                obj[name] = getFn;
                //obj[name].toString = getFn;

                // restore the event
                obj.attachEvent("onpropertychange", onPropertyChange);
            }
        };

        obj[name] = getFn;
        //obj[name].toString = getFn;

        obj.attachEvent("onpropertychange", onPropertyChange);
    }
}

Object.getDOMObject = function (obj, prototypeObj) {
    if (window.isDefinePropertyAvailable)
        return obj;

    if (!obj)
        return document.createDocumentFragment();

    if (!obj.isDOMObject) {
        var newObj = document.createDocumentFragment();
        newObj.isDOMObject = true;

        if (document.body)
            document.body.appendChild(newObj);
        else {
            $(document).ready(function () {
                document.body.appendChild(newObj);
            });
        }

        if (prototypeObj)
            $.extend(true, newObj, prototypeObj);
        else
            $.extend(true, newObj, obj);

        return newObj;
    }
    return obj;
}

try {
    Object.defineProperty({}, "test", {
        get: function () { },
        set: function () { }
    });
    window.isDefinePropertyAvailable = true;
} catch (e) {
    window.isDefinePropertyAvailable = false;
}
