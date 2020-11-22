import { createStore } from 'vuex';
import authModule from './modules/auth';
import socketModule from './modules/socket';
import friendInfoModule from './modules/friendInfo';

const store = createStore({
  modules: {
    auth: authModule,
    socket: socketModule,
    friendInfo: friendInfoModule,
  },
});

export default store;
