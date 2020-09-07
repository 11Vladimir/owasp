const setup = {
  serverAPI: String('http://185.79.117.244:4004'),
};

// enable plugins
export default function globalfunction({ app, redirect, $axios }, inject) {
  inject('serverAPI', setup.serverAPI);
}
