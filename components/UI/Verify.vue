<template>
  <section class="verify">
    <div>
      <h1>Подтверждение прав владения сайтом {{ site.title }}</h1>
      <p>
        Прежде, чем получить возможность сканирования сайта на уязвимости, Вам необходимо подтвердить, что вы владеете
        данным сайтом. Мы можем предложить два способа подтверждения.
      </p>

      <div class="row">
        <div class="column column-6">
          <a-card class="radius">
            <div class="container2">
              <div>
                <a-icon type="check-circle" slot="icon" class="icon" :theme="iconsColor1" />
              </div>
              <p>Первый способ</p>
              <br />
              <p>
                Добавьте TXT запись в DNS <br />
                IN TXT "{{ site.key }}"
              </p>
              <br />
              <div v-if="verefity1">
                <p class="onVerifity">Права владения сайтом подтверждены!</p>
              </div>
              <div v-else>
                <a-button type="primary" v-on:click="verifyDns()">Подтвердить</a-button>
              </div>
            </div>
          </a-card>
        </div>
        <div class="column column-6">
          <a-card class="radius">
            <div class="container2">
              <div>
                <a-icon type="check-circle" slot="icon" class="icon" :theme="iconsColor2" />
              </div>
              <p>Второй способ</p>
              <br />
              <p>
                Создайте файл в каталоге веб-сервера <br />
                /verify/{{ site.key }}.html
              </p>
              <br />
              <div v-if="verefity2">
                <p class="onVerifity">Права владения сайтом подтверждены!</p>
              </div>
              <div v-else>
                <a-button type="primary" v-on:click="verifyWeb()">Подтвердить</a-button>
              </div>
            </div>
          </a-card>
        </div>
      </div>

      <nuxt-link to="/">Вернуться назад</nuxt-link>
    </div>
  </section>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        site: {},
        verefity1: false,
        verefity2: false,
        iconsColor1: 'outlined',
        iconsColor2: 'outlined',
      };
    },

    methods: {
      getSite() {
        return axios
          .get(`https://owqsp-nuxt.firebaseio.com/sites/${this.$router.history.current.params.id}.json`)
          .then(res => {
            this.site = { ...res.data, id: res.data.id };
            return;
          })
          .catch(e => console.log(e));
      },

      putSite() {
        axios
          .put(`https://owqsp-nuxt.firebaseio.com/sites/${this.$router.history.current.params.id}/status.json`, {
            status: true,
          })
          .then(res => {
            console.log('putSite', res);
          })
          .catch(e => console.log(e));
      },

      // getSite(contex) {
      //   return axios
      //     .get(`https://owqsp-nuxt.firebaseio.com/sites/${contex.params.id}.json`)
      //     .then(res => {
      //       console.log('from verify id', res);
      //       return {
      //         site: { ...res.data, id: contex.params.id },
      //       };
      //     })
      //     .catch(e => contex.error(e));
      // },
      // Подученние данных сайта
      //   async getSite() {
      //     try {
      //       const url = 'http://185.79.117.244:4004/api/modules/scanner/info';
      //       const payload = {
      //         target: '5f564a191a7387279572cea7', // сделать динамическую переменную
      //       };
      //       const answer = await this.$axios({
      //         url,
      //         method: 'POST',
      //         data: payload,
      //         validateStatus: false,
      //       });
      //       console.log('getSite answer', answer);
      //       const { data } = answer;
      //       if (data.statusCode !== 200 && data.statusCode !== 201) throw new Error(data.serverAnswer);
      //       const result = data.serverAnswer;
      //       this.site = result;
      //       console.log('getSite result', result);
      //       return result;
      //     } catch (err) {
      //       console.error(`❌ [ERROR] ${err}`);
      //       return err;
      //     }
      //   },

      // Проверка по HTML
      async verifyWeb() {
        try {
          const url = '/api/modules/scanner/exist-url';
          const payload = {
            www: `${this.site.url}/verify/${this.site.key}.html`, //http://u91212.test-handyhost.ru/verify/cc0c1b00-7927-4bfe-894d-faa708b6f588.html
          };
          const answer = await this.$axios({
            url: `${this.$serverAPI}${url}`,
            method: 'POST',
            data: payload,
            validateStatus: false,
          });
          console.log('verifyWeb answer', answer);
          const { data } = answer;
          if (data.statusCode == 200) {
            this.verefity2 = true;
            this.iconsColor2 = 'twoTone';
            return this.iconsColor2;
          }
          if (data.statusCode !== 200 && data.statusCode !== 201) throw new Error(data.serverAnswer);
          const result = data.serverAnswer;
          console.log('verifyWeb result', result);
          return result;
        } catch (err) {
          console.error(`❌ [ERROR] ${err}`);
          return err;
        }
      },
      //   // Изменение данных сайта с подтвержденными правами
      //   async verifyData() {
      //     if (this.verefity1 == false || this.verefity2 == false) {
      //       console.log(222);
      //       try {
      //         const url = 'http://185.79.117.244:4004/api/modules/scanner/update';
      //         const payload = {
      //           target: '5f46a2d7db855f065ccd8dc6', // сделать динамическую переменную
      //           scanReports: 0,
      //           status: true,
      //         };
      //         const answer = await this.$axios({
      //           url,
      //           method: 'PATCH',
      //           data: payload,
      //           validateStatus: false,
      //         });
      //         console.log('verifyData answer', answer);
      //         const { data } = answer;
      //         if (data.statusCode !== 200 && data.statusCode !== 201) throw new Error(data.serverAnswer);
      //         const result = data.serverAnswer;
      //         console.log('verifyData result', result);
      //         const id = this.idArray.push(result);
      //         console.log(this.idArray);
      //         console.log(id);
      //         return result;
      //       } catch (err) {
      //         console.error(`❌ [ERROR] ${err}`);
      //         return err;
      //       }
      //     }
      //   },
    },

    watch: {
      verefity1: function (val) {
        this.putSite();
      },
      verefity2: function (val) {
        this.putSite();
      },
    },

    beforeMount() {
      this.getSite();

      // this.verifyData();
    },
  };
</script>
