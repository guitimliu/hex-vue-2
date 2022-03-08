import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';
import pagination from './components/pagination.js';
import updateProduct from './components/update-product.js';

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
        is_edit: 0,
        pagination: {},
      }
    },
    components: {
      pagination,
      updateProduct,
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
      getProducts(page = 1) {
        axios.get(`${this.api.url}api/${this.api.path}/admin/products?page=${page}`)
          .then(res => {
            console.log(res);
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          })
          .catch(err => {
            // console.log(err.response);
          })
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
            // "imageUrl": "https://www.filepicker.io/api/file/hAiaQlWeT3yuLGHENBKS",
            "imagesUrl": this.temp.imagesUrl,
          }
        })
          .then((res) => {
            alert('已成功編輯商品');
            this.getProducts();
          })
          .catch((err) => {
            console.log(err.response);
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
            // "imageUrl": "https://www.filepicker.io/api/file/hAiaQlWeT3yuLGHENBKS",
            "imagesUrl": this.temp.imagesUrl,
          }
        })
          .then((res) => {
            alert('已成功新增商品');
            console.log(`${this.api.url}api/${this.api.path}/admin/product`);
            this.getProducts();
          })
          .catch((err) => {
            console.log(err.response);
          })
      },
      uploadImage() {
        const imagesUrl = document.querySelector('#productImages');
        const data = imagesUrl.files;

        const formData = new FormData();
        formData.append('file-to-upload', data[0])

        console.log(formData);

        axios.post(`${this.api.url}api/${this.api.path}/admin/upload/`, formData)
          .then((res) => {
            console.log(res.data.imageUrl);
            this.temp.imageUrl = res.data.imageUrl;
            this.temp.imagesUrl ? '' : this.temp.imagesUrl = [];
            this.temp.imagesUrl.push(this.temp.imageUrl);
          })
          .catch((err) => {
            console.log(err.response);
          })
      },
      deleteProduct(item) {
        // console.log(item.id);
        axios.delete(`${this.api.url}api/${this.api.path}/admin/product/${item.id}`)
          .then((res) => {
            alert('已成功刪除商品');
            this.getProducts();
          })
          .catch((err) => {
            console.log(err.response);
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