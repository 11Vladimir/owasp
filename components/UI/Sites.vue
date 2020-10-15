<template>
  <section class="sites">
    <div>
      <h1>Мои сайты</h1>
      <div class="column">
        <div>
          <nuxt-link to="/add-site"> Добавить сайт</nuxt-link>
        </div>
      </div>

      <div v-for="(site, index) of sites" :key="index">
        <a-card class="radius">
          <div class="column column-2">
            <div>
              <p>
                <b>{{ index + 1 }} {{ site.title }}</b>
              </p>
            </div>
            <div>
              <a-button type="link" @click.prevent="openDeleteSite(site.id)"> Удалить сайт </a-button>
            </div>
          </div>
          <hr />

          <div v-if="site.status">
            <a-form>
              <div class="column column-5">
                <div>
                  <a-input :placeholder="site.url" disabled />
                </div>
                <div>
                  <a-cascader :options="options" placeholder="Запуск проверки" />
                </div>
                <div>
                  <a-date-picker v-model="date1" type="date" placeholder="Выбор даты" style="width: 100%" />
                </div>
                <div>
                  <a-time-picker v-model="time" type="time" placeholder="Выбор времени" style="width: 100%" />
                </div>

                <div>
                  <a-button type="primary" @click="postScan()"> Запустить проверку </a-button>
                </div>
              </div>
            </a-form>
            <div class="column">
              <nuxt-link to="/reports">Отчетов о сканировании: {{ site.scanReports }}</nuxt-link>
            </div>
          </div>

          <div v-else class="column column-2">
            <div>
              <p>
                Прежде, чем получить возможность сканирования сайта на уязвимости, Вам необходимо подтвердить, что вы
                владеете данным сайтом.
              </p>
            </div>
            <div>
              <a-button type="primary" @click.prevent="openSiteVerify(site.id)"> Подтверждение прав </a-button>
            </div>
          </div>
        </a-card>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        scan: {
          date: undefined,
          scanStatus: 'Проверка запущена',
          options: 0,
        },
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
      async postScan() {
        this.scan.options = this.options.value;
        console.log(this.scan.options);
        return this.$axios
          .post(`https://owqsp-nuxt.firebaseio.com/sites/scanData.json`, this.scan)
          .then(res => {
            console.log(res);
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

      openDeleteSite(index) {
        return this.$router.push(`/delete-site/${index}`);
      },
      openSiteVerify(index) {
        return this.$router.push(`/verify/${index}`);
      },
    },
    computed: {
      sites() {
        return this.$store.getters.getSitesLoaded;
      },
    },
  };
</script>
