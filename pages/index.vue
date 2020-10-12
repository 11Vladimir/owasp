<template>
  <div class="container">
    <div>
      <Logo />
      <a-layout id="components-layout-demo-side" style="min-height: 75vh" class="radius">
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <h1>МОИ САЙТЫ</h1>
          </a-breadcrumb>

          <nuxt-link to="/addSite"> Добавить сайт</nuxt-link>

          <div v-for="(site, index) of sites" :key="index">
            <a-card class="radius">
              <form>
                <div class="row">
                  <div class="column column-10">
                    <div class="column column-5">
                      <p>{{ index + 1 }} {{ site.title }}</p>
                    </div>
                    <div class="column column-4">
                      <p>{{ site.host }}</p>
                    </div>
                  </div>
                  <div class="column column-2">
                    <a-button type="link" @click.prevent="openDeleteSite(site.id)"> Удалить сайт </a-button>
                  </div>
                </div>
                <hr />

                <div v-if="site.status">
                  <div class="row">
                    <div class="column column-10">
                      <div class="column column-5">
                        <a-cascader :options="options" placeholder="Запуск проверки" />
                      </div>
                      <div class="column column-5">
                        <a-form-model-item label="Activity time">
                          <a-date-picker v-model="date1" show-time type="date" placeholder="Выбор даты" />
                        </a-form-model-item>
                      </div>
                      <div class="column column-5">
                        <nuxt-link to="/scanReport">Отчетов о сканировании: {{ site.scanReports }}</nuxt-link>
                      </div>
                    </div>
                    <div class="column column-2">
                      <a-button type="primary"> Запустить проверку </a-button>
                    </div>
                  </div>
                </div>

                <div v-else>
                  <div class="row">
                    <div class="column column-10">
                      <p>
                        Прежде, чем получить возможность сканирования сайта на уязвимости, Вам необходимо подтвердить,
                        что вы владеете данным сайтом.
                      </p>
                    </div>
                    <div class="column column-2">
                      <a-button type="primary" @click.prevent="openSiteVerify(site.id)"> Подтверждение прав </a-button>
                    </div>
                  </div>
                </div>
              </form>
            </a-card>
          </div>
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
        // sites: {},

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
        //     //   _id: '"b4fde4dd05ea65f40ea620507c5b4e33add75a171d1f59d03fde68e5641a4827',
        //     // },

        options: [
          {
            value: 'Один раз',
            label: 'Один раз',
          },
          {
            value: 'Каждый день',
            label: 'Каждый день',
          },
          {
            value: 'Раз в неделю',
            label: 'Раз в неделю',
          },
          {
            value: 'Раз в месяц',
            label: 'Раз в месяц',
          },
        ],
        date1: undefined,
      };
    },
    methods: {
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
      openDeleteSite(index) {
        this.$router.push(`/deleteSite/${index}`);
      },
      openSiteVerify(index) {
        this.$router.push(`/verify/${index}`);
      },
    },
    computed: {
      sites() {
        console.log(this.$store.getters.getSitesLoaded);
        return this.$store.getters.getSitesLoaded;
      },
    },
  };
</script>

<style>
  p {
    font-family: 'Quicksand', 'Source Sans Pro', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto',
      'Helvetica Neue', 'Arial', sans-serif;
    font-size: 0.88rem;
    color: #2f2f2f;
    margin: 0;
    word-break: break-word;
  }

  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
  }

  .radius {
    border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
    margin: 15px 0px;
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
    margin: 10px 10px;
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
    width: 40%;
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
    width: 80%;
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
