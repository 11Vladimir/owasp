<template>
  <div class="container">
    <div>
      <Logo />
      <a-layout id="components-layout-demo-side" style="min-height: 75vh" class="radius">
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <h1>Удаление сайта {{ site.title }}</h1>
          </a-breadcrumb>

          <div class="column column-12">
            <a-card class="radius">
              <div v-if="statusDelete">
                <div class="column column-12">
                  <p>Сайт успешно удален!</p>
                </div>
                <a href="/">OK</a>
              </div>
              <div v-else>
                <div class="column column-12">
                  <p>
                    Вы действительно хотите удалить сайт {{ site.host }} из вашего списка сайтов? Все данные о
                    сканировании атак будут утеряны!
                  </p>
                </div>
                <a-button type="primary" @click.prevent="deleteSite(site.id)"> Удалить </a-button>
              </div>
            </a-card>
          </div>

          <nuxt-link to="/">Вернуться назад</nuxt-link>
        </a-layout-content>
      </a-layout>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        site: {},
        statusDelete: false,
      };
    },

    //     // {
    //     //   scanReports: 10,
    //     //   status: true,
    //     //   websiteTitle: 'ServisePipe',
    //     //   websiteUrl: 'https://servicepipe.ru/',
    //     //   websiteHost: 'servicepipe.ru',
    //     //   _id: 'asaswcecacaw',
    //     // },
    //     // {
    //     //   scanReports: 5,
    //     //   status: false,
    //     //   websiteTitle: 'TOP-penoplast',
    //     //   websiteUrl: 'https://www.toppenoplast.ru/',
    //     //   websiteHost: 'toppenoplast.ru',
    //     //   _id: 'asaswcedsdcacaw',
    //     // },
    //     // {
    //     //   scanReports: 0,
    //     //   status: false,
    //     //   websiteTitle: 'test',
    //     //   websiteUrl: 'http://www.u91212.test-handyhost.ru/',
    //     //   websiteHost: 'u91212.test-handyhost.ru',

    methods: {
      getSite() {
        return axios
          .get(`https://owqsp-nuxt.firebaseio.com/sites/${this.$router.history.current.params.idDelete}.json`)
          .then(res => {
            console.log('res', res);

            this.site = { ...res.data, id: res.data.id };

            return;
          })
          .catch(e => console.log(e));
      },
      // async getSites() {
      //   try {
      //     const url = 'http://185.79.117.244:4004/api/modules/scanner/info';
      //     const payload = {
      //       target: '5f46a2d7db855f065ccd8dc6', // по юзеру
      //     };
      //     const answer = await this.$axios({
      //       url,
      //       method: 'POST',
      //       data: payload,
      //       validateStatus: false,
      //     });
      //     console.log('answer', answer);
      //     const { data } = answer;
      //     if (data.statusCode !== 200 && data.statusCode !== 201) throw new Error(data.serverAnswer);
      //     const result = data.serverAnswer;
      //     this.sites = result;
      //     console.log('result', result);
      //     return result;
      //   } catch (err) {
      //     console.error(`❌ [ERROR] ${err}`);
      //     return err;
      //   }
      // },
      deleteSite() {
        axios
          .delete(`https://owqsp-nuxt.firebaseio.com/sites/${this.$router.history.current.params.idDelete}.json`)
          .then(res => {
            console.log(res);

            this.statusDelete = true;
          })
          .catch(e => console.log(e));
      },
    },
    beforeMount() {
      this.getSite();
    },
  };
</script>

<style scoped>
  .container {
    /* margin: 0 auto; */
    /* min-height: 100vh; */
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  .icon {
    margin: 20px;
    font-size: 30px;
  }

  .onVerifity {
    color: #1890ff;
  }

  @media (max-width: 570.98px) {
    button {
      width: 100%;
    }
  }

  .row:before,
  .row:after {
    content: ' ';
    display: table;
  }
  .row:after {
    clear: both;
  }

  .column {
    position: relative;
    float: left;
    padding: 10px 10px;
    width: 50%;
    justify-content: center;
  }

  .column-1 {
    width: 6.86666666667%;
  }
  .column-2 {
    width: 15.3333333333%;
  }
  .column-3 {
    width: 23.8%;
  }
  .column-4 {
    width: 32.2666666667%;
  }
  .column-5 {
    width: 40.7333333333%;
  }
  .column-6 {
    width: 49.2%;
  }
  .column-7 {
    width: 57.6666666667%;
  }
  .column-8 {
    width: 66.1333333333%;
  }
  .column-9 {
    width: 74.6%;
  }
  .column-10 {
    width: 83.0666666667%;
  }
  .column-11 {
    width: 91.5333333333%;
  }
  .column-12 {
    width: 100%;
  }

  @media only screen and (max-width: 550px) {
    .column-1,
    .column-2,
    .column-3,
    .column-4,
    .column-5,
    .column-6,
    .column-7,
    .column-8,
    .column-9,
    .column-10,
    .column-11,
    .column-12 {
      width: auto;
      float: none;
    }
  }
</style>
