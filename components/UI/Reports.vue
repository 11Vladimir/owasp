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

// const columns = [ // { // title: 'High', // dataIndex: 'high', // width: '25%', // scopedSlots: { customRender:
'name' }, // }, // { // title: 'Medium', // dataIndex: 'medium', // width: '15%', // scopedSlots: { customRender: 'age'
}, // }, // { // title: 'Low', // dataIndex: 'low', // width: '40%', // scopedSlots: { customRender: 'address' }, // },
// { // title: 'Info', // dataIndex: 'info', // scopedSlots: { customRender: 'operation' }, // }, // ]; // const data =
[]; // for (let i = 0; i < 25; i++) { // data.push({ // key: i.toString(), // high: `high ${i}`, // medium: 11, // low:
`low ${i}`, // }); // } // export default { // data() { // this.cacheData = data.map(item => ({ ...item })); // return {
// data, // columns, // editingKey: '', // }; // }, // methods: { // handleChange(value, key, column) { // const newData
= [...this.data]; // const target = newData.filter(item => key === item.key)[0]; // if (target) { // target[column] =
value; // this.data = newData; // } // }, // edit(key) { // const newData = [...this.data]; // const target =
newData.filter(item => key === item.key)[0]; // this.editingKey = key; // if (target) { // target.editable = true; //
this.data = newData; // } // }, // save(key) { // const newData = [...this.data]; // const newCacheData =
[...this.cacheData]; // const target = newData.filter(item => key === item.key)[0]; // const targetCache =
newCacheData.filter(item => key === item.key)[0]; // if (target && targetCache) { // delete target.editable; //
this.data = newData; // Object.assign(targetCache, target); // this.cacheData = newCacheData; // } // this.editingKey =
''; // }, // cancel(key) { // const newData = [...this.data]; // const target = newData.filter(item => key ===
item.key)[0]; // this.editingKey = ''; // if (target) { // Object.assign(target, this.cacheData.filter(item => key ===
item.key)[0]); // delete target.editable; // this.data = newData; // } // }, // }, // };
