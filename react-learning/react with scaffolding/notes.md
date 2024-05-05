# JSX: a javascript syntax extension created by Facebook

## JSX is just an expression, which will compile into plain javascript via `React.createElement()`, this is done by Babel

`<h1>hello world <span>span</span></h1>`

this is compiled into:

`React.createElement("h1", {}, "hello world", React.createElement("span", {}, "span"));`

## All JSX expressions can only have one root element element

if in any case we need a piece of JSX which contains multiple root elements, we can wrap everything in a fragment (empty JSX containers) `<React.Fragment> </React.Fragment>`, or `<> </>`

Fragments will not be created in the real DOM, they are purely wrappers for JSX.

## All JSX expressions must have a closing tag (following the XML specifications)

For example, there are void elements in HTML (like `img` or `input`). In JSX, they must have a corresponding closing tag.

`<img src="">` Not allowed, should be: `<img src=""></img>` or `<img src="" />`

## JSX can embed javascript expressions

```jsx
const div = <div>
    {a} * {b} = {a * b}
</div>
```

But why?

because this is what it gets compiled into:

```js
const div = React.createElement("div", {}, `${a} * ${b} = ${a * b}`);
```

### embedded JS expressions which resolve to null, undefined, or false, will not be rendered

## comments in JSX must be JS comments, not HTML comments

`<!-- -->` is wrong, `{/* */}` is correct

## regular JS objects cannot be children of a JSX expression

## JS arrays of primitive types or React elements may be children of a React expression - the primitives will be added as text nodes.

## arrays of JSX which get rendered must contain a `key` property.

## JSX attribute values can be javascript expressions

## JSX/HTML classes must be specified using `className` instead of `class`.

## for security purposes, JSX will automatically escape the result of your embedded javascript expressions

### `dangerouslySetInnerHTML` is a property you can add to JSX elements if you are really really really wanting to add html as a JS expression

```jsx
const content = "<h1>sadflkasdjf</h1>";
const div = <div dangerouslySetInnerHTML={{
    __html: content
}}>
</div>
```

## JSX objects, once created, are immutable

## the class components' `setState()` function *may* be asynchronous. but when?

it is only async if the `setState()` call is inside the event listener of an html element. OTHERWISE it is synchronous.

if inside some event handler, and it's required to get the most updated version of the state, use the function method.

for any asynchronous `setState()` handling, React will merge all the `setState()`, and then update the real `state`, finally it will call `render()`

best practice:
1. treat all `setState()` calls as asynchronous
2. never trust the value of the state after any `setState()` calls
3. if needing to access the value after calling `setState()`, use the second function parameter
4. if needing to set the state based on the current state's value, use the first function parameter
