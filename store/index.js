import axios from 'axios';

export const state = () => ({
  sitesLoaded: [],
});

export const mutations = {
  setSites(state, sites) {
    state.sitesLoaded = sites;
  },
  addSite(state, site) {
    console.log(site);
    state.sitesLoaded.push(site);
  },
};

export const actions = {
  nuxtServerInit({ commit }, contex) {
    return axios
      .get('https://owqsp-nuxt.firebaseio.com/sites.json') //'https://owqsp-nuxt.firebaseio.com/sites.json'
      .then(res => {
        const sitesArray = [];
        for (let key in res.data) {
          sitesArray.push({ ...res.data[key], id: key });
        }
        console.log('sitesArray', sitesArray);
        commit('setSites', sitesArray);
      })
      .catch(e => console.log(e));
  },
  addSite({ commit }, site) {
    return axios
      .post('https://owqsp-nuxt.firebaseio.com/sites.json', site) //'https://owqsp-nuxt.firebaseio.com/sites.json', site
      .then(res => {
        commit('addSite', { ...site, id: res.data.name });
      })
      .catch(e => console.log(e));
  },
};

export const getters = {
  getSitesLoaded(state) {
    const sites = state.sitesLoaded;
    return sites;
  },
};
