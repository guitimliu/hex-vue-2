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
        temp: 0,
        setOriginPrice: false,
      }
    },
    methods: {
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
      },
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
        this.temp = {...item};
      },
      editProduct(item) {
        
      },
      addProduct() {
        axios.post(`${this.api.url}api/${this.api.path}/admin/product`, {
          "data": {
            "title": 'title',
            "category": "分類",
            "origin_price": '500',
            "price": '200',
            "unit": "個",
            "description": "papaya",
            "content": "這是內容",
            "is_enabled": 1,
            "imageUrl": "https://www.filepicker.io/api/file/hAiaQlWeT3yuLGHENBKS",
            "imagesUrl": [
              "https://www.filepicker.io/api/file/hAiaQlWeT3yuLGHENBKS",
            ]
          }
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
      },
    },
    mounted() {
      this.checkLogin();
      AOS.init({
        duration: 600,
      });
    }
  }
  createApp(app).mount('#app');