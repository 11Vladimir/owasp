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

            <div>
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
            <a slot="name" slot-scope="text">{{ text }}</a>
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
      dataIndex: 'name',
      key: 'name',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: 'Medium',
      dataIndex: 'age',
      key: 'age',
      // width: 80,
    },
    {
      title: 'Low',
      dataIndex: 'address',
      key: 'address 1',
      ellipsis: true,
    },
    {
      title: 'Info',
      dataIndex: 'address',
      key: 'address 2',
      ellipsis: true,
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 2 Lake Park, London No. 2 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
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
