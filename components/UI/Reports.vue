<template>
  <section class="reports">
    <div>
      <h1>Отчет о сканировании сайта {{ site.title }}</h1>

      <div v-for="(report, index) of site.scanDatas" :key="index">
        <a-card class="radius">
          <div class="column-2">
            <div>
              <p>
                Статус: <b>{{ report.scanStatus }}</b>
              </p>
              <p>
                Дата запуска: <b>{{ report.date }}</b>
              </p>
              <p>
                Время запуска: <b>{{ report.time }}</b>
              </p>
            </div>

            <div class="content_left">
              <a-popconfirm
                title="Вы действительно хотите удалить этот отчет?"
                ok-text="Да"
                cancel-text="Нет"
                @confirm="confirm(index)"
                @cancel="cancel"
              >
                <a href="#">Удалить отчет</a>
              </a-popconfirm>
            </div>
          </div>

          <h3>Обнаружено уязвимостей</h3>
          <a-table :columns="columns" :data-source="data">
            <a slot="info" slot-scope="text">{{ text }}</a>
          </a-table>
        </a-card>
      </div>

      <nuxt-link to="/">Вернуться назад</nuxt-link>
    </div>
  </section>
</template>

<script>
  const columns = [
    {
      title: 'High',
      dataIndex: 'high',
      key: 'high',
    },
    {
      title: 'Medium',
      dataIndex: 'medium',
      key: 'medium',
      // width: 80,
    },
    {
      title: 'Low',
      dataIndex: 'low',
      key: 'low',
      ellipsis: true,
    },
    {
      title: 'Info',
      dataIndex: 'info',
      key: 'info',
      scopedSlots: { customRender: 'info' },
      // ellipsis: true,
    },
  ];

  const data = [
    {
      key: '1',
      high: 5,
      low: 32,
      medium: 10,
      info: 'Узнать подробнее...',
    },
    {
      key: '2',
      high: 1,
      low: 12,
      medium: 43,
      info: 'Узнать подробнее...',
    },
    {
      key: '3',
      high: 3,
      low: 43,
      medium: 23,
      info: 'Узнать подробнее...',
    },
  ];

  export default {
    data() {
      return {
        data,
        columns,
        site: {},
      };
    },
    methods: {
      getSite() {
        return this.$axios
          .get(`https://owqsp-nuxt.firebaseio.com/sites/${this.$router.history.current.params.idReports}.json`)
          .then(res => {
            console.log('getSite', res);
            return (this.site = { ...res.data, id: res.data.id });
          })
          .catch(e => console.log(e));
      },
      confirm(scanID) {
        return this.$axios
          .delete(
            `https://owqsp-nuxt.firebaseio.com/sites/${this.$router.history.current.params.idReports}/scanDatas/${scanID}.json`
          )
          .then(res => {
            console.log('confirm', res);
            this.$message.success('Отчет удален!');
            this.getSite();
          })
          .catch(e => {
            console.log('error', e);
            this.$message.error('Произошла ошибка при удалении отчета!');
          });
      },
      cancel(e) {
        console.log(e);
        this.$message.error('Отчет не удален!');
      },
    },
    created() {
      this.getSite();
    },
  };
</script>
