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
                <b>{{ index + 1 }} {{ site.title }}</b> / {{ site.host }}
              </p>
            </div>
            <div class="content_left">
              <a-button type="link" @click="showModal(site.id, site.title)"> Удалить сайт </a-button>
              <a-modal
                title="Удаление сайта"
                :visible="modal.visible"
                :confirm-loading="modal.confirmLoading"
                @ok="handleOk"
                @cancel="handleCancel"
              >
                <p class="content_center">
                  Вы действительно хотите удалить сайт <b>{{ modal.siteTitle }}</b> <br />
                  из вашего списка сайтов? Все данные о сканировании атак будут утеряны!
                </p>
              </a-modal>
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
                  <a-cascader v-model="option" :options="options" placeholder="Запуск проверки" />
                </div>
                <div>
                  <a-date-picker v-model="date1" type="date" placeholder="Выбор даты" style="width: 100%" />
                </div>
                <div>
                  <a-time-picker v-model="time1" type="time" placeholder="Выбор времени" style="width: 100%" />
                </div>

                <div class="content_left">
                  <a-button type="primary" @click="postScan(site.id)" :disabled="disabled">
                    Запустить проверку
                  </a-button>
                </div>
              </div>
            </a-form>
            <div class="column">
              <div class="content_right">
                <a-button type="link" @click.prevent="openReports(site.id)">Отчетов о сканировании: </a-button>
              </div>
            </div>
          </div>

          <div v-else class="column column-2">
            <div>
              <p>
                Прежде, чем получить возможность сканирования сайта на уязвимости, Вам необходимо подтвердить, что вы
                владеете данным сайтом.
              </p>
            </div>
            <div class="content_left">
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
    asyncData() {
      return {};
    },
    data() {
      return {
        scan: {
          date: '',
          scanStatus: 'Сканируется',
          option: '',
          time: '',
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
        option: [],
        date1: undefined,
        time1: undefined,
        disabled: false,
        modal: {
          ModalText: '',
          visible: false,
          confirmLoading: false,
          siteTitle: '',
          siteId: '',
        },
      };
    },
    methods: {
      // Кнопка удаления
      showModal(siteID, siteTitle) {
        this.modal.visible = true;
        this.modal.siteTitle = siteTitle;
        this.modal.siteId = siteID;
      },
      handleOk() {
        this.modal.confirmLoading = true;

        return this.$axios
          .delete(`https://owqsp-nuxt.firebaseio.com/sites/${this.modal.siteId}.json`)
          .then(res => {
            console.log(res);
            this.modal.visible = false;
            this.modal.confirmLoading = false;
            this.$message.success('Сайт удален');
          })
          .catch(e => {
            console.log(e);
            this.$message.error('Произошла ошибка при удалении сайта');
          });
      },
      handleCancel(e) {
        console.log('Нажата кнопка отмены');
        this.modal.visible = false;
      },

      // Отправка данные о сканировании
      postScan(siteID) {
        this.scan.option = this.option.toString();

        // Обработка даты
        const date = this.date1._d;
        const year = date.getFullYear();
        const m = date.getMonth() + 1;
        const month = m < 10 ? '0' + m : m;
        const d = date.getDate();
        const day = d < 10 ? '0' + d : d;
        this.scan.date = `${day}.${month}.${year}`;

        // Обработка времени
        const time = this.time1._d;
        const hh = time.getHours();
        const hours = hh < 10 ? '0' + hh : hh;
        const mm = time.getMinutes();
        const minutes = mm < 10 ? '0' + mm : mm;
        const ss = time.getSeconds();
        const seconds = ss < 10 ? '0' + ss : ss;
        this.scan.time = `${hours}:${minutes}:${seconds}`;

        return this.$axios
          .post(`https://owqsp-nuxt.firebaseio.com/sites/${siteID}/scanDatas.json`, this.scan)
          .then(res => {
            this.disabled = true;
            this.$message.success('Проверка запущена!');
            console.log('res', res.data);
            console.log('scan', this.scan);

            setTimeout(() => {
              return (this.disabled = false);
            }, 1500);
          })
          .catch(e => {
            console.log(e);
            this.$message.error('Произошла ошибка запуска проверки!');
            return (this.disabled = true);
          });
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

      // openDeleteSite(siteID) {
      //   return this.$router.push(`/delete-site/${siteID}`);
      // },
      openSiteVerify(siteID) {
        return this.$router.push(`/verify/${siteID}`);
      },
      openReports(siteID) {
        return this.$router.push(`/reports/${siteID}`);
      },
    },
    computed: {
      sites() {
        return this.$store.getters.getSitesLoaded;
      },
    },
  };
</script>
