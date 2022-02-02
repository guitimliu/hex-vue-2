import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';

const app = {
    data() {
      return {
        api: {
          url: 'https://vue3-course-api.hexschool.io/v2/',
          path: 'guitimliu',
        },
        ifLogin: true,
        products: [],
        temp: {},
      }
    },
    methods: {
      getProducts() {
        axios.get(`${this.api.url}api/${this.api.path}/admin/products`)
          .then(res => {
            this.products = res.data.products;
          })
          .catch(err => {
            // console.log(err.response);
          })
      },
      showDetail(item) {
        this.temp = item;
      },
      checkLogin() {
              const tokenAuthorization = document.cookie.replace(/(?:(?:^|.*;\s*)vueLogin\s*\=\s*([^;]*).*$)|^.*$/, "$1");
              axios.defaults.headers.common['Authorization'] = tokenAuthorization;

              axios.post(`https://vue3-course-api.hexschool.io/v2/api/user/check`)
              .then(res => {
                  // console.log(res.data);
                  this.getProducts();
              })
              .catch(err => {
                  // console.log(err.response);
                  location.href = "./login.html";
              })
          }
    },
    mounted() {
      AOS.init({
        duration: 600,
      });
      this.checkLogin();
    }
  }
  createApp(app).mount('#app');