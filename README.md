# EventSystem
Simple EventEmitter binding components. For example ReactJS components, or any others.

## USING

#### Connection

1. Stardart `<script src="/path/EventSystem.min.js"></script>`
2. OR `var EventSystem = require('./EventSystem')`

#### Subscribe

Params:
* Event name (String)
* Callback (Function)
* Run once (Boolean, default:false)

```javascript
EventSystem.subscribe('hello.world', hello);

EventSystem.subscribe('hello.world', obj.hello, true);

EventSystem.subscribe('hello.world', console.log.bind(console));
```


#### Remove subscribe

```javascript
var hello = EventSystem.subscribe('hello.world', hello);

// some code

hello.remove();
```


#### Publish

Params:
* Event name (String). If use publishChain Events separated by spaces.
* Arguments

```javascript
EventSystem.publish('hello', [2,4,6]);

EventSystem.publishChain('world test hello', [args1, args2, args3]);
```

#### Register event list

```javascript
var list = EventSystem.list();

console.log(list);
```

Returns an array containing :
* Register event name
* Callbacks count



#### Clear all events 

```javascript
EventSystem.clear();
```