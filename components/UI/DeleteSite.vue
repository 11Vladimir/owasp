<template>
  <section class="delete">
    <div>
      <h1>Удаление сайта {{ site.title }}</h1>
      <a-card class="radius content_center">
        <div v-if="statusDelete" class="column">
          <p>Сайт успешно удален!</p>
          <a-button type="primary"> <a href="/">OK</a> </a-button>
        </div>

        <div v-else class="column">
          <p>
            Вы действительно хотите удалить сайт <b>{{ site.host }}</b> из вашего списка сайтов?<br />
            Все данные о сканировании атак будут утеряны!
          </p>
          <a-button type="primary" @click.prevent="deleteSite(site.id)"> Удалить </a-button>
        </div>
      </a-card>
      <nuxt-link to="/">Вернуться назад</nuxt-link>
    </div>
  </section>
</template>

<script>
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
      async getSite() {
        return this.$axios
          .get(`https://owqsp-nuxt.firebaseio.com/sites/${this.$router.history.current.params.idDelete}.json`)
          .then(res => {
            console.log('res', res);

            return (this.site = { ...res.data, id: res.data.id });
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
      async deleteSite() {
        return this.$axios
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
