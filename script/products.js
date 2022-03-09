import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';
import pagination from './components/pagination.js';
import updateProduct from './components/update-product.js';
import deleteProduct from './components/delete-project.js';

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
        is_edit: 0,
        pagination: {},
      }
    },
    components: {
      pagination,
      updateProduct,
      deleteProduct,
    },
    methods: {
      checkLogin() {
          const tokenAuthorization = document.cookie.replace(/(?:(?:^|.*;\s*)vueLogin\s*\=\s*([^;]*).*$)|^.*$/, "$1");
          axios.defaults.headers.common['Authorization'] = tokenAuthorization;

          axios.post(`https://vue3-course-api.hexschool.io/v2/api/user/check`)
          .then(res => {
              this.getProducts();
          })
          .catch(err => {
              location.href = "./login.html";
          })
      },
      getProducts(page = 1) {
        axios.get(`${this.api.url}api/${this.api.path}/admin/products?page=${page}`)
          .then(res => {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          })
          .catch(() => { /* error */ })
      },
      showDetail(item) {
        this.temp = {...item};
        Object.keys(this.temp).length ? this.is_edit = 1 : this.is_edit = 0;
        this.isSpecialOffer();
      },
      editProduct(temp) {
        this.setOriginPrice ? '' : this.temp.origin_price = this.temp.price;
        axios.put(`${this.api.url}api/${this.api.path}/admin/product/${temp.id}`, {
          "data": {
            "title": this.temp.title,
            "category": this.temp.category,
            "origin_price": parseFloat(this.temp.origin_price),
            "price": parseFloat(this.temp.price),
            "unit": "個",
            "description": this.temp.description,
            "content": this.temp.content,
            "is_enabled": this.temp.is_enabled,
            "imageUrl": this.temp.imageUrl,
            "imagesUrl": this.temp.imagesUrl,
          }
        })
          .then((res) => {
            alert('已成功編輯商品');
            this.getProducts();
          })
          .catch(() => {
            alert('新增商品失敗，請確認資料是否填妥')
          })
      },
      isSpecialOffer() {
        this.setOriginPrice = this.temp.price !== this.temp.origin_price;
      },
      addProduct() {
        this.setOriginPrice ? '' : this.temp.origin_price = this.temp.price;
        
        axios.post(`${this.api.url}api/${this.api.path}/admin/product`, {
          "data": {
            "title": this.temp.title,
            "category": this.temp.category,
            "origin_price": parseFloat(this.temp.origin_price),
            "price": parseFloat(this.temp.price),
            "unit": "個",
            "description": this.temp.description,
            "content": this.temp.content,
            "is_enabled": this.temp.is_enabled,
            "imageUrl": this.temp.imageUrl,
            "imagesUrl": this.temp.imagesUrl,
          }
        })
          .then(() => {
            alert('已成功新增商品');
            this.getProducts();
          })
          .catch(() => { /* error */ })
      },
      deleteProduct(item) {
        axios.delete(`${this.api.url}api/${this.api.path}/admin/product/${item.id}`)
          .then(() => {
            alert('已成功刪除商品');
            this.getProducts();
          })
          .catch(() => { /* error */ })
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