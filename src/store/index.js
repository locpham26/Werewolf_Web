import { createStore } from 'vuex';
import friendInfoModule from './modules/friendInfo';

export default createStore({
  modules: {
    friendInfo: friendInfoModule,
  },
});
