
function RQTimeSpan(days, hours, minutes, seconds, milliseconds) {     
    this._hours = 0;
    Object.defineProperty(this, "hours", {
        get: function () {
            return this._hours;
        },
        set: function (value) {
            while (value >= 24) {
                this.days++;
                value -= 24;
            }
            this._hours = Math.round(value);
        }
    });
    this._minutes = 0;
    Object.defineProperty(this, "minutes", {
        get: function () {
            return this._minutes;
        },
        set: function (value) {
            while (value >= 60) {
                this.hours++;
                value -= 60;
            }
            this._minutes = Math.round(value);
        }
    });
    this._seconds = 0;
    Object.defineProperty(this, "seconds", {
        get: function () {
            return this._seconds;
        },
        set: function (value) {
            while (value >= 60) {
                this.minutes++;
                value -= 60;
            }
            this._seconds = Math.round(value);
        }
    });

    if (arguments.length == 1) {
        //this.base(days);
        var orient = (days < 0) ? -1 : +1;
        this.milliseconds = Math.abs(days);
        this.days = Math.floor(this.milliseconds / 86400000) * orient;
        this.milliseconds = this.milliseconds % 86400000;

        this.hours = Math.floor(this.milliseconds / 3600000) * orient;
        this.milliseconds = this.milliseconds % 3600000;

        this.minutes = Math.floor(this.milliseconds / 60000) * orient;
        this.milliseconds = this.milliseconds % 60000;

        this.seconds = Math.floor(this.milliseconds / 1000) * orient;
        this.milliseconds = (this.milliseconds % 1000);
    }
    else if (arguments.length == 4) {
        //this.base(days, hours, minutes, seconds);
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }
    else if (arguments.length == 5) {
        //this.base(days, hours, minutes, seconds, milliseconds);
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.milliseconds = milliseconds;
    }
    else
        this.milliseconds = 0;

    Object.defineProperty(this, "totalMilliseconds", {
        get: function () {
            return (this.days * 86400000) + (this._hours * 3600000) + (this._minutes * 60000) + (this._seconds * 1000);
        },
        set: function () { },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(this, "Ticks", {
        get: function () {
            return this.totalMilliseconds * 10000;
        },
        set: function () { },
        enumerable: true,
        configurable: true
    });
    
    return this;
}
RQTimeSpan.prototype.getTotalDays = function () {
    return (this.totalMilliseconds / 86400000);
}

RQTimeSpan.prototype.getTotalHours = function () {
    return (this.totalMilliseconds / 3600000);
}
RQTimeSpan.prototype.getTotalMinutes = function () {
    return (this.totalMilliseconds / 60000);
}
RQTimeSpan.prototype.getTotalSeconds = function () {
    return (this.totalMilliseconds / 1000);
}

RQTimeSpan.prototype.equals = function (time) {
    return (this.compareTo(time) === 0);
}

RQTimeSpan.prototype.add = function (time) {
    return (time === null) ? this : this.addSeconds(time.totalMilliseconds / 1000);
}

RQTimeSpan.prototype.subtract = function (time) {
    return (time === null) ? this : this.addSeconds(-time.totalMilliseconds / 1000);
}

RQTimeSpan.prototype.addDays = function (n) {
    return new RQTimeSpan(this.totalMilliseconds + (n * 86400000));
}

RQTimeSpan.prototype.addHours = function (n) {
    return new RQTimeSpan(this.totalMilliseconds + (n * 3600000));
}

RQTimeSpan.prototype.addMinutes = function (n) {
    return new RQTimeSpan(this.totalMilliseconds + (n * 60000));
}

RQTimeSpan.prototype.addSeconds = function (n) {
    return new RQTimeSpan(this.totalMilliseconds + (n * 1000));
}

RQTimeSpan.prototype.addMilliseconds = function (n) {
    return new RQTimeSpan(this.totalMilliseconds + n);
}

RQTimeSpan.prototype.getTotalHours = function () {
    return (this.totalMilliseconds / 3600000);
}
RQTimeSpan.prototype.getTotalMinutes = function () {
    return (this.totalMilliseconds / 60000);
}
RQTimeSpan.prototype.getTotalSeconds = function () {
    return (this.totalMilliseconds / 1000);
}

RQTimeSpan.prototype.get12HourHour = function () {
    return (this.hours > 12) ? this.hours - 12 : (this.hours === 0) ? 12 : this.hours;
}

RQTimeSpan.prototype.getDesignator = function () {
    return (this.hours < 12) ? Date.CultureInfo.amDesignator : Date.CultureInfo.pmDesignator;
}

RQTimeSpan.prototype.isGreaterThan = function (timespan) {
    if (this.totalMilliseconds > timespan.totalMilliseconds)
        return true;
    return false;
}
RQTimeSpan.prototype.isGreaterThanOrEqualTo = function (timespan) {
    if (this.totalMilliseconds >= timespan.totalMilliseconds)
        return true;
    return false;
}
RQTimeSpan.prototype.isLessThan = function (timespan) {
    if (this.totalMilliseconds < timespan.totalMilliseconds)
        return true;
    return false;
}
RQTimeSpan.prototype.compareTo = function (time) {
    if (!time)
        time = RQTimeSpan.Zero;
    if (this.isGreaterThan(time))
        return 1;
    else if (this.isLessThan(time))
        return -1;
    return 0;
}

RQTimeSpan.prototype.toString = function () {
    var hours = this.hours < 10 ? '0' + this.hours : this.hours,
         minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes,
         seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;
    if (this.days > 0)
        return "" + this.days + "." + hours + ":" + minutes + ":" + seconds + "";

    return "" + hours + ":" + minutes + ":" + seconds + "";
}
RQTimeSpan.fromTicks = function (ticks) {
    return new RQTimeSpan(ticks / 10000);
}
RQTimeSpan.parse = function (value) {
    var spanArray = value.split(".");
    if (spanArray.length == 2) {
        var days = parseInt(spanArray[0]);
        var times = spanArray[1].split(":");
        var hours = parseInt(times[0]);
        var minutes = parseInt(times[1]);
        var seconds = parseInt(times[2]);
        return new RQTimeSpan(days, hours, minutes, seconds, 0);
    }
    else {

        var times = spanArray[0].split(":");
        var hours = parseInt(times[0]);
        var minutes = parseInt(times[1]);
        var seconds = parseInt(times[2]);
        return new RQTimeSpan(0, hours, minutes, seconds, 0)
    }

}
RQTimeSpan.MaxValue = new RQTimeSpan(10675199, 02, 48, 05, 477);
RQTimeSpan.MinValue = new RQTimeSpan(-10675199, -02, -48, -05, -477);
RQTimeSpan.Zero = new RQTimeSpan(0);
