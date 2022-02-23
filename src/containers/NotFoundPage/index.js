/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import withContainer from '../../pages/withContainer';

function NotFound() {
  return (
    <article>
      <h1>Page not found</h1>
    </article>
  );
}

export default withContainer(NotFound);
