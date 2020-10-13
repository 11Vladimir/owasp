<template>
  <section class="add">
    <div>
      <h1>ДОБАВИТЬ САЙТ</h1>
      <div :style="{ padding: '24px', background: '#fff' }" class="radius">
        <div>
          <a-form method="post" @submit.prevent="siteAdded">
            <!-- @submit.prevent="siteAdded" -->
            <a-form-item label="Название сайта">
              <a-input v-model="site.title" allow-clear id="error" placeholder="Мой сайт" />
            </a-form-item>
            <a-form-item label="Адрес сайта">
              <div style="margin-bottom: 16px">
                <a-input v-model="site.host" allow-clear placeholder="mysite">
                  <a-select slot="addonBefore" v-model="protocol" style="width: 90px">
                    <a-select-option value="http://"> http:// </a-select-option>
                    <a-select-option value="https://"> https:// </a-select-option>
                  </a-select>
                  <a-select slot="addonAfter" v-model="domainZone" style="width: 80px">
                    <a-select-option value=".ru"> .ru </a-select-option>
                    <a-select-option value=".com"> .com </a-select-option>
                    <a-select-option value=".jp"> .jp </a-select-option>
                    <a-select-option value=".cn"> .cn </a-select-option>
                    <a-select-option value=".org"> .org </a-select-option>
                  </a-select>
                </a-input>
              </div>
            </a-form-item>
            <a-button type="primary" html-type="submit"> Добавить сайт </a-button>
          </a-form>
        </div>
      </div>
      <nuxt-link to="/">Вернуться назад</nuxt-link>
    </div>
  </section>
</template>

<script>
  import { v4 as uuidv4 } from 'uuid';

  export default {
    data() {
      return {
        site: {
          title: '',
          host: '',
          url: '',
          status: false,
          key: '',
          scanReports: 0,
          scanData: [],
        },
        protocol: 'http://',
        domainZone: '.ru',

        formLayout: 'horizontal',
        form: this.$form.createForm(this, { name: 'coordinated' }),
      };
    },

    methods: {
      siteAdded(site) {
        this.site.key = uuidv4();
        this.site.url = `${this.protocol}www.${this.site.host}${this.domainZone}`;

        this.$store.dispatch('addSite', this.site).then(() => {
          this.$router.push('/add');
        });
      },
      // async siteAdded() {
      //   try {
      //     const url = 'http://185.79.117.244:4004/api/modules/scanner/send';
      //     const payload = {
      //       websiteTitle: this.siteData.title,
      //       websiteUrl: `${this.siteData.protocol}${this.siteData.host}${this.siteData.domainZone}`,
      //       websitHost: this.siteData.host,
      //       scanReports: 0,
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
      //     console.log('result', result);

      //     const id = this.idArray.push(result);
      //     console.log(this.idArray);
      //     console.log(id);

      //     return result;
      //   } catch (err) {
      //     console.error(`❌ [ERROR] ${err}`);
      //     return err;
      //   }
      // },
    },
  };
</script>
