import { Nav } from './components/nav/nav.js';

new Nav('menu').init();

if (module.hot) {
  module.hot.accept();
}
