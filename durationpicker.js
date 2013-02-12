$.widget("radiatq.DurationPicker", $.ui.spinner, {
    options: {
    //Value in minutes.
        step:30
    },
    TimeSapanWithDay: /^(\d.\d{2}:\d{2}:\d{2})$/,
    TimeSapanWithoutday: /^(\d{2}:\d{2}:\d{2})$/,
    _create: function () {
        var self = this;
        this.element.addClass("radiatq.DurationPicker");
        $.ui.spinner.prototype._create.apply(this, arguments);

    },
    _parse: function (value) {
        if (typeof value === "string") {
            if (this.TimeSapanWithDay.test(value) || this.TimeSapanWithoutday.test(value)) {
                return RQTimeSpan.parse(value);
            }
        }
        return value;
    },
    _increment: function (val, i) {
        var value = val.addMinutes(this.options.step * i);
        return value;
    },
    _value: function (value, allowAny) {
        var parsed;
        if (value !== "") {
            parsed = this._parse(value);
            if (parsed !== null) {
                value = this._format(parsed);
            }
        }
        this.element.val(value);
        this._refresh();
    },
    GetDuration: function () {
        this._parse(this.element.val());
    },
    _spin: function (step, event) {
        var value = this.value() || 0;

        if (!this.counter) {
            this.counter = 1;
        }

        value = this._increment(value, step);

        if (!this.spinning || this._trigger("spin", event,
                {
                    value: value
                }) !== false) {
            this._value(value, true);
            this.counter++;
        }
    },
    _events: {
        keydown: function (event) {
            if (this._start(event) && this._keydown(event)) {
                event.preventDefault();
            }
        },
        keyup: "_stop",
        focus: function () {
            this.uiSpinner.addClass("ui-state-active");
            this.previous = this.element.val();
        },
        blur: function (event) {
            this._refresh();
            this.uiSpinner.removeClass("ui-state-active");
            var value = this.element.val();
            var isValid = false;

            if (this.TimeSapanWithDay.test(value) == true && this.TimeSapanWithoutday.test(value) == false) {
                isValid = true;
            }

            else if (this.TimeSapanWithDay.test(value) == false && this.TimeSapanWithoutday.test(value) == true) {
                isValid = true;
            }

            if (isValid == false)
                this.element.val(this.previous);

            if (this.previous !== value) {
                this._trigger("change", event);
            }
        },
        mousewheel: function (event, delta) {
            if (!delta) {
                return;
            }
            if (!this.spinning && !this._start(event)) {
                return false;
            }

            this._spin((delta > 0 ? 1 : -1) * this.options.step, event);
            clearTimeout(this.mousewheelTimer);
            this.mousewheelTimer = this._delay(function () {
                if (this.spinning) {
                    this._stop(event);
                }
            }, 100);
            event.preventDefault();
        },
        "mousedown .ui-spinner-button": function (event) {
            // ensure focus is on (or stays on) the text field
            event.preventDefault();
            if (this.document[0].activeElement !== this.element[0]) {
                this.element.focus();
            }

            if (this._start(event) === false) {
                return;
            }

            this._repeat(null, $(event.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, event);
        },
        "mouseup .ui-spinner-button": "_stop",
        "mouseenter .ui-spinner-button": function (event) {
            // button will add ui-state-active if mouse was down while mouseleave and kept down
            if (!$(event.currentTarget).hasClass("ui-state-active")) {
                return;
            }

            if (this._start(event) === false) {
                return false;
            }
            this._repeat(null, $(event.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, event);
        },
        // TODO: do we really want to consider this a stop?
        // shouldn't we just stop the repeater and wait until mouseup before
        // we trigger the stop event?
        "mouseleave .ui-spinner-button": "_stop"
    },
    _format: function (value) {
        return value.toString();
    }
});
