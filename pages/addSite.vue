<template>
  <div class="container">
    <div>
      <Logo />
      <a-layout id="components-layout-demo-side" style="min-height: 75vh" class="radius">
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <h1>ДОБАВИТЬ САЙТ</h1>
          </a-breadcrumb>
          <div :style="{ padding: '24px', background: '#fff' }" class="radius">
            <div>
              <a-form method="post" @submit.prevent="siteAdded">
                <a-form-item label="Название сайта">
                  <a-input v-model="sitePost.title" allow-clear id="error" placeholder="Мой сайт" />
                </a-form-item>
                <a-form-item label="Адрес сайта">
                  <div style="margin-bottom: 16px">
                    <a-input v-model="sitePost.host" allow-clear placeholder="www.mysite">
                      <a-select slot="addonBefore" v-model="sitePost.protocol" style="width: 90px">
                        <a-select-option value="http://"> http:// </a-select-option>
                        <a-select-option value="https://"> https:// </a-select-option>
                      </a-select>
                      <a-select slot="addonAfter" v-model="sitePost.domainZone" style="width: 80px">
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
        </a-layout-content>
      </a-layout>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sitePost: {
          title: '',
          host: '',
          protocol: 'http://',
          domainZone: '.ru',
        },

        formLayout: 'horizontal',
        form: this.$form.createForm(this, { name: 'coordinated' }),
      };
    },

    methods: {
      async siteAdded() {
        try {
          const url = 'http://185.79.117.244:4004/api/modules/scanner/send';
          const payload = {
            websiteTitle: this.sitePost.title,
            websiteUrl: `${this.sitePost.protocol}${this.sitePost.host}${this.sitePost.domainZone}`,
            scanReports: 0,
          };

          const answer = await this.$axios({
            url,
            method: 'POST',
            data: payload,
            validateStatus: false,
          });
          console.log('answer', answer);
          const { data } = answer;
          if (data.statusCode !== 200 && data.statusCode !== 201) throw new Error(data.serverAnswer);

          const result = data.serverAnswer;
          console.log('result', result);

          return result;
        } catch (err) {
          console.error(`❌ [ERROR] ${err}`);
          return err;
        }
      },
    },
  };
</script>

<style scoped>
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

  button {
    width: 200px;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
  }

  @media (max-width: 570.98px) {
    button {
      width: 100%;
    }
  }
</style>
>
