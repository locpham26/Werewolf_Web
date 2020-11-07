import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state() {
    return {
      friendList: [
        { name: 'Meo Meo' },
        { name: 'WoffWoff' },
        { name: 'Doggie' },
        { name: '16Typh' },
        { name: 'ThanhDraw' },
        { name: 'GDucky' },
        { name: 'Tez' },
        { name: 'MCK' },
        { name: 'RIC' },
        { name: 'YunoBigboy' },
        { name: 'Gil' },
        { name: 'Yang' },
        { name: 'AK49' },
        { name: 'RTee' },
        { name: 'HanhOr' },
        { name: 'Gonzo' },
        { name: 'FFF' },
        { name: 'DuyAndy' },
        { name: 'MacJunior' },
        { name: 'LilCell' },
        { name: 'LOR' },
      ],
    };
  },
  getters,
  actions,
  mutations,
};
