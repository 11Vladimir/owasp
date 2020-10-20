<template>
  <section class="reports">
    <div>
      <h1>Отчет о сканировании сайта {{ site.title }}</h1>

      <div v-for="(report, index) of site.scanDatas.reports" :key="index">
        <a-card class="radius">
          <div class="column-2">
            <div>
              <p><b>Дата запуска:</b> {{ report.date }}</p>
              <p><b>Время запуска:</b> {{ report.time }}</p>
              <p><b>Статус:</b> {{ report.scanStatus }}</p>
            </div>

            <div>
              <a-button type="primary" @click.prevent=""> Удалить отчет </a-button>
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
    // {
    //   key: '2',
    //   name: 'Jim Green',
    //   age: 42,
    //   address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    //   tags: ['loser'],
    // },
    // {
    //   key: '3',
    //   name: 'Joe Black',
    //   age: 32,
    //   address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    //   tags: ['cool', 'teacher'],
    // },
  ];

  export default {
    data() {
      return {
        data,
        columns,
        // статика
        site: {
          host: 'u91212.test-handyhost',
          scanDatas: {
            reports: [
              {
                date: '2020.10.31',
                option: 'Раз в месяц',
                scanStatus: 'Сканируется',
                time: '18:5:49',
              },
              {
                date: '2020.10.31',
                option: 'Раз в месяц',
                scanStatus: 'Сканируется',
                time: '18:5:49',
              },
            ],
          },
          scanReports: 0,
          verify: {
            status: true,
            key: 'c56a549c-aecf-405e-9780-071455defcb9',
          },

          title: 'dddddddddddddddd',
          url: 'http://www.u91212.test-handyhost.ru',
        },
      };
    },
  };
</script>
