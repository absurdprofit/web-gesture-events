# Web Gesture Events
A library that brings high-level asynchronous gesture events to the web by extending the standard addEventListener interface. ☝🏾📱

[Demo](https://gesture.nxtetechnologies.com)

# [![version](https://img.shields.io/npm/v/web-gesture-events)](https://www.npmjs.com/package/web-gesture-events)  [![downloads](https://img.shields.io/npm/dm/web-gesture-events)](https://www.npmjs.com/package/web-gesture-events) [![license](https://img.shields.io/npm/l/web-gesture-events)](https://github.com/nxtexe/web-gesture-events/blob/main/LICENSE)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [Basic](#basic)
    - [Config Options](#config-options)
- [API Documentation](#api-documentation)
    - [Gesture Provider Config](#gesture-provider-config)
    - [Config Attributes](#config-attributes)
    - [GestureEvent](#gestureevent)
    - [LongPressEvent](#longpressevent)
    - [SwipeEvent](#swipeevent)
    - [PanEvent](#panevent)
    - [RotateEvent](#rotateevent)
    - [PinchEvent](#pinchevent)
- [Remarks](#remarks)
- [Credits](#credits)

## Installation
```
npm install web-gesture-events
```

## Usage
### Basic
Add event listeners as you would using the addEventListener interface. The GestureEvent interface passed as the argument to all gesture events is an extension of the TouchEvent interface. Which means all the properties you are used to are the same with the addition of a few properties.
*Rotation and Scale on iOS have been overwritten since they are not considered standard*
```
...
import 'web-gesture-events'; // top level import only side-effects
...

import {SwipeEvent} from 'web-gesture-events;

window.addEventListener('swipe', (ev) => {
    console.log(ev.direction, ev.velocity); // direction and instantaneous velocity
}
```

### Config Options
Config options can be set on the global GestureProvider interface available on the window or by specifying a ```data-```attribute on a DOM element.
```
window.gestureProvider.config.minPointers = 2;
// OR
<div data-minpointers="2"></div>
```

## API Documentation
### Gesture Provider Config
| Property | Type | Description |
| ------ | ------ | ------ |
| minPointers | number | Minimum number of touch points necessary before events are fired. |
| longPressDuration | number | Minimum duration in milliseconds for a touch to be persisted to fire a single LongPressEvent. |
| tapDelay | number | Maximum time in milliseconds that can pass between taps. |
| numberOfTaps | number | Number of taps required before tap events are fired.  |

### Config Attributes
Data- prefixed attributes recognised on DOM elements.
| Property | Type | Description |
| ------ | ------ | ------ |
| data-minpointers | string | Minimum number of touch points necessary before events are fired. |
| data-longpressduration | string | Minimum duration in milliseconds for a touch to be persisted to fire a single LongPressEvent. |
| data-tapdelay | string | Maximum time in milliseconds that can pass between taps. |
| data-numberoftaps | string | Number of taps required before tap events are fired. |

### GestureEvent
| Property | Type | Description |
| ------ | ------ | ------ |
| gestureTarget | EventTarget | The element that the primary pointer TouchStart event targeted. |
| x | number | Horizontal position of the primary pointer relative to the viewport. |
| y | number | Vertical position of the primary pointer relative to the viewport. |

### LongPressEvent
| Property | Type | Description |
| ------ | ------ | ------ |
| duration | number | Duration of the long press event. |

### SwipeEvent
| Property | Type | Description |
| ------ | ------ | ------ |
| types | "swipestart", "swipe", "swipeend" | Events fired over the lifecycle of a swipe. |
| velocity | number | Instantaneous velocity of user swipe. In case of swipeend velocity equals average velocity of swipe. |
| direction | "up", "down", "left" or "right" | Direction of the user swipe relative to the gesture origin. |

### PanEvent
| Property | Type | Description |
| ------ | ------ | ------ |
| types | "panstart", "pan", "panend" | Events fired over the lifecycle of a pan. |
| velocity | number | Instantaneous velocity of user pan. In case of panend velocity equals average velocity of swipe. |
| translation | Translation | Object that contains x and y movements of user gesture relative to gesture origin and viewport. |

### RotateEvent
| Property | Type | Description |
| ------ | ------ | ------ |
| types | "rotatestart", "rotate", "rotateend" | Events fired over the lifecycle of a rotation. |
| rotation | number | Rotation about the anchor (primary pointer) in radians. |
| rotationDeg | number | Rotation about the anchor (primary pointer) in degrees. |
| anchor | Anchor | Object that contains x and y positions of rotation anchor point relative to gesture origin and viewport. |

### PinchEvent
| Property | Type | Description |
| ------ | ------ | ------ |
| types | "pinchstart", "pinch", "pinchend" | Events fired over the lifecycle of a pinch. |
| scale | number | Scale factor relative to primary and secondary touch points' distance. |

## Remarks
There are a few potential drawbacks I haven't been able to overcome. For example the data-attribute config options might not work if a gesture event listener uses bubbling. Also even though these gesture events are asynchronous there is still the problem that the browser currently does not offer a way to query if event listeners exist on an element anywhere in the DOM tree. Meaning events are always fired regardless of if an event listener was detected or not. Also these events are not trusted events so do bare that in mind whenever using these events to accomplish things that require user interaction such as toggling fullscreen or resuming an audio context.
## Credits
1. [React Native Gesture Handler](https://github.com/software-mansion/react-native-gesture-handler)
2. [Introduction to events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
3. [Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)