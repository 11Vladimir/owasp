<template>
  <div class="container">
    <div>
      <Logo />
      <a-layout id="components-layout-demo-side" style="min-height: 75vh" class="radius">
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <h1>Подтверждение прав владения сайтом {{ sate.websiteHost }}</h1>
            <p>
              Прежде, чем получить возможность сканирования сайта на уязвимости, Вам необходимо подтвердить, что вы
              владеете данным сайтом. Мы можем предложить два способа подтверждения.
            </p>
          </a-breadcrumb>
          <div class="row" v-model="verifyOn">
            <div class="column column-5">
              <a-card class="radius">
                <div class="container2">
                  <div>
                    <a-icon type="check-circle" slot="icon" class="icon" :theme="iconsColor1" />
                  </div>
                  <p>Первый способ</p>
                  <br />
                  <p>
                    Добавьте TXT запись в DNS <br />
                    IN TXT "{{ sate._id }}"
                  </p>
                  <br />
                  <div v-if="verefity1">
                    <p class="onVerifity">Права владения сайтом подтверждены!</p>
                  </div>
                  <div v-else>
                    <a-button type="primary">Подтвердить</a-button>
                  </div>
                </div>
              </a-card>
            </div>
            <div class="column column-5">
              <a-card class="radius">
                <div class="container2">
                  <div>
                    <a-icon type="check-circle" slot="icon" class="icon" :theme="iconsColor2" />
                  </div>
                  <p>Второй способ</p>
                  <br />
                  <p>
                    Создайте файл в каталоге веб-сервера <br />
                    /verify/{{ sate._id }}.html
                  </p>
                  <br />
                  <div v-if="verefity2">
                    <p class="onVerifity">Права владения сайтом подтверждены!</p>
                  </div>
                  <div v-else>
                    <a-button type="primary" v-on:click="verifySite()">Подтвердить</a-button>
                  </div>
                </div>
              </a-card>
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
        sate: {
          scanReports: 10,
          status: false,
          websiteTitle: 'ServisePipe',
          websiteUrl: 'https://servicepipe.ru/',
          websiteHost: 'servicepipe.ru',
          _id: 'b4fde4dd05ea65f40ea620507c5b4e33add75a171d1f59d03fde68e5641a4827',
        },
        verefity1: false,
        verefity2: false,
        iconsColor1: '',
        iconsColor2: '',
      };
    },
    methods: {
      validate({ params }) {
        return /^\d+$/.test(params.id);
      },
      async verifySite() {
        try {
          const url = '/api/modules/scanner/exist-url';
          const payload = {
            www: `${this.sate.websiteUrl}/verify/${this.sate._id}.html`, // www: 'https://www.toppenoplast.ru/',
          };

          const answer = await this.$axios({
            url: `${this.$serverAPI}${url}`,
            method: 'POST',
            data: payload,
            validateStatus: false,
          });

          console.log('answer', answer);
          const { data } = answer;

          if (data.statusCode == 200) {
            this.verefity2 = true;
          }

          if (data.statusCode !== 200 && data.statusCode !== 201) throw new Error(data.serverAnswer);

          const result = data.serverAnswer;
          console.log('result', result);

          return result;
        } catch (err) {
          console.error(`❌ [ERROR] ${err}`);
          return err;
        }
      },

      verifyOn() {
        if (this.verefity1 == true) {
          this.iconsColor1 = 'twoTone';
        }
        if (this.verefity2 == true) {
          this.iconsColor2 = 'twoTone';
        }
        return this.iconsColor1, this.iconsColor2;
      },
    },

    async statusPost() {
      console.log(this.sate.status);
      if (this.verefity1 == true || this.verefity2 == true) {
        const payload = {
          status: true,
        };
      }
      try {
        const url = 'http://185.79.117.244:4004/api/modules/scanner/send';
        const id = `${this.sate._id}`;

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
  };
</script>

<style scoped>
  .container2 {
    /* margin: 0 auto; */
    /* min-height: 100vh; */
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  .icon {
    margin: 20px;
    font-size: 30px;
  }

  .onVerifity {
    color: #1890ff;
  }

  @media (max-width: 570.98px) {
    button {
      width: 100%;
    }
  }

  .row:before,
  .row:after {
    content: ' ';
    display: table;
  }
  .row:after {
    clear: both;
  }

  .column {
    position: relative;
    float: left;
    padding: 10px 10px;
    width: 50%;
    justify-content: center;
  }

  .column-1 {
    width: 6.86666666667%;
  }
  .column-2 {
    width: 15.3333333333%;
  }
  .column-3 {
    width: 23.8%;
  }
  .column-4 {
    width: 32.2666666667%;
  }
  .column-5 {
    width: 40.7333333333%;
  }
  .column-6 {
    width: 49.2%;
  }
  .column-7 {
    width: 57.6666666667%;
  }
  .column-8 {
    width: 66.1333333333%;
  }
  .column-9 {
    width: 74.6%;
  }
  .column-10 {
    width: 83.0666666667%;
  }
  .column-11 {
    width: 91.5333333333%;
  }
  .column-12 {
    width: 100%;
  }

  @media only screen and (max-width: 550px) {
    .column-1,
    .column-2,
    .column-3,
    .column-4,
    .column-5,
    .column-6,
    .column-7,
    .column-8,
    .column-9,
    .column-10,
    .column-11,
    .column-12 {
      width: auto;
      float: none;
    }
  }

  .ant-steps {
  }
</style>
