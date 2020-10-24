<template>
  <section class="add-site">
    <div>
      <h1>ДОБАВИТЬ САЙТ</h1>
      <div>
        <a-card class="radius">
          <a-form method="post" @submit.prevent="siteAdded">
            <div>
              <a-form-item label="Название сайта">
                <a-input v-model="site.title" allow-clear id="error" placeholder="Мой сайт" />
              </a-form-item>
            </div>

            <div>
              <a-form-item label="Адрес сайта">
                <a-input v-model="site.host" allow-clear placeholder="mysite.ru">
                  <a-select slot="addonBefore" v-model="protocol">
                    <a-select-option value="http://"> http:// </a-select-option>
                    <a-select-option value="https://"> https:// </a-select-option>
                  </a-select>
                  <!-- <a-select slot="addonAfter" v-model="domainZone">
                    <a-select-option value=".ru"> .ru </a-select-option>
                    <a-select-option value=".com"> .com </a-select-option>
                    <a-select-option value=".jp"> .jp </a-select-option>
                    <a-select-option value=".cn"> .cn </a-select-option>
                    <a-select-option value=".org"> .org </a-select-option>
                  </a-select> -->
                </a-input>
              </a-form-item>
            </div>

            <div class="column">
              <div class="content_center">
                <a-button type="primary" html-type="submit" :disabled="disabled"> Добавить сайт </a-button>
              </div>
            </div>
          </a-form>
        </a-card>
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
        disabled: false,

        formLayout: 'horizontal',
        form: this.$form.createForm(this, { name: 'coordinated' }),
      };
    },

    methods: {
      siteAdded(site) {
        this.site.key = uuidv4();
        this.site.url = `${this.protocol}www.${this.site.host}`;

        this.$store.dispatch('addSite', this.site).then(() => {
          this.$router.push('/add-site');
          this.$message.success('Сайт добавлен!');
          setTimeout(() => {
            return (this.disabled = false);
          }, 1500);
        });
        return (this.disabled = true);
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
