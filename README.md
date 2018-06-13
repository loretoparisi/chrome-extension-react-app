# Chrome Extension React App Modifier
This is a chrome extension that uses React and ReactDOM to modify Components elements.

## How it Works
The app uses the library [TextOverlay](https://github.com/yuku/textoverlay) to apply a overlay on a text node. The library has been modified to support Range matching (i.e. character positions) and React / ReacDOM integration. See [here](https://github.com/yuku/textoverlay/issues/20) for more info. It is using the [HTMLReactParser](https://github.com/remarkablemark/html-react-parser/issues) that transforms HTML to React Component in order to get the DOO element `outerHTML` contents and turn it into a React Element.

## The Issue
The code is able to bypass the React protections for Component modifications, but there is some issues in applying the changes correctly to the DOM elements. I have posted more info on [this](https://stackoverflow.com/questions/50813685/modify-react-app-in-chrome-extension) SF issue.

## Example
This is an example of a Chrome Web app
<img width="975" alt="schermata 2018-06-12 alle 11 18 25" src="https://user-images.githubusercontent.com/163333/41281741-78507528-6e32-11e8-977a-5c7e74054676.png">

When the Chrome app extension has been loaded the a text overlay is applied to the paragraph over a range

<img width="1026" alt="schermata 2018-06-12 alle 11 18 34" src="https://user-images.githubusercontent.com/163333/41281780-958e7892-6e32-11e8-9376-402872f59365.png">








