# reactvr-swapi


To run:
Open two terminal windows/tabs, one for running this example and one for running the star wars api graphql server locally.

Dependencies:


You need to have https://github.com/graphql/swapi-graphql installed and running
Also npm
and git

```javascript
# git clone https://github.com/graphql/swapi-graphql.git
# cd swapi-graphql
# npm i
# npm start 
```

Now in the 2nd window:

To run:

```javascript
# git clone https://github.com/ne8il/reactvr-swapi.git
# npm i
// In a code editor, take the port from the running swapi console and plug it into the PORT variable in index.vr.js
# npm start
```

now open a browser at open at http://localhost:8081/vr/

In index.vr.js you can swap out the MainSceneN files to see various stages I showed in the presentation.
- `MainScene1` has some cool camera movement if you're interested in getting that to work.
- In the final `MainScene5` you can hover on planets to see them in the overlay and click on them to make them bounce.

Links/Resources:
- https://stackoverflow.com/questions/45859098/how-do-i-keep-some-element-fixed-on-the-screen-in-react-vr
- https://gist.github.com/cidicles/b4e978d3f3e2de8b359bdc51b5fb3261
- https://facebook.github.io/react-vr/docs/vrheadmodel.html
- https://www.solarsystemscope.com/textures/
- https://medium.com/coding-artist/learn-react-vr-chapter-5-star-wars-modeling-74ebddbf96b8
