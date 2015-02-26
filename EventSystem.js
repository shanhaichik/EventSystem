(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.EventSystem = factory();
    }
}(this, function() {
    var self = this;

    self.queue = {};

    return {
        publish: function(event, data) {
            var actions = self.queue[event];

            if(!actions || !actions.length) return;

            actions.forEach(function(action, i){
                action.callback(data || {});
                if(action.flag) actions.splice(i,1);
            });
        },

        publishChain: function (events, args) {
            var actions = events.split(' ');

            actions.forEach(function(event, i){
                this.publish(event,args[i])
            }.bind(this));
        },

        subscribe: function(event, callback, once) {
           if (!self.queue[event]) self.queue[event] = [];

           var index = self.queue[event].push({
                flag: !!once,
                callback: callback
            });

            return {
                remove: function () {
                    delete self.queue[event][index];
                }
            }
        },

        clear: function () {
             self.queue = {};
        },

        list: function () {
            return Object.keys(self.queue).map(function(event){
                return {
                    name: event,
                    callbackCount:self.queue[event].length
                }
            });
        }
    }
}));
