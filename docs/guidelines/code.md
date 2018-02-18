# guideline - code

### variables
We only use **let** and **const** variables. People who use **var** will automatically be kicked and banned for life.
```
let isRaining = true // re-assignable, although it wont change often in Sweden...
const kilometer = 1000.0 // not re-assignable
```
When in need of **global variables** use capitalised variables. Avoid if possible.
```
let CLIENTS = []
const PI = 3.14159265358979323846
```
