import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from "./Header";
// exact prop name ensures only components with the xact route are shown.
// without this, then if the current address contains the path variable, then the component is shown.
// if we put anchor tags with links in our components, then everxytime one is clicked, the browser dumps and reloads
// the html file and all javascript, thus losing all our state.
// we instead use the Link component. Although this display an anchor tag on the page, react-router
// will stop the browser navigating to the new page. The url still changes, and history sends it to BrowserRouter
// BrowserRouter communicates the URL to Route components. Route components rerender
const App = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={ StreamList } />
          <Route path="/streams/new" exact component={ StreamCreate } />
          <Route path="/streams/edit" exact component={ StreamEdit } />
          <Route path="/streams/delete" exact component={ StreamDelete } />
          <Route path="/streams/show" exact component={ StreamShow } />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
