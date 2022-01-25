<template>
<div class="container my-3" v-if="ifLogin">
  <p data-aos="fade-right">共有 {{ products.length }} 項商品</p>
  <table class="table table-hover table-striped table-borderless shadow table-dark" data-aos="zoom-in">
    <thead>
      <tr>
          <th>產品名稱</th>
          <th>原價</th>
          <th>售價</th>
          <th>是否啟用</th>
          <th>查看細節</th>
      </tr>
    </thead>
    <tbody>
      <!-- 商品清單 -->
      <tr v-for="item in products" :key="item">
        <td>{{ item.title }}</td>
        <td><del>{{ item.origin_price }}</del></td>
        <td>{{ item.price }}</td>
        <td>
            <span class="rounded-2 bg-success p-1" v-if="item.is_enabled">啟用</span>
            <span class="rounded-2 bg-danger p-1" v-else>未啟用</span>
        </td>
        <td>
            <button type="button" v-on:click="showDetail(item)" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#productDetail">
                查看細節
            </button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- 商品細項 Modal -->
  <div class="modal fade" id="productDetail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content bg-dark">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">{{ temp.title }}</h5>
                  <span class="bg-secondary text-white rounded-2 p-1 ms-2">{{ temp.category }}</span>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <ul class="list-unstyled">
                      <li class="py-1">
                          <!-- 商品照片輪播 -->
                          <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                              <div class="carousel-indicators">
                                  <template v-for="(url,num) in temp.imagesUrl" :key="num">
                                      <button v-if="num == 0" type="button" data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="num" class="active" aria-current="true" :aria-label='num+1'></button>
                                      <button v-else type="button" data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="num" :aria-label='num+1'></button>
                                  </template>
                              </div>
                              <div class="carousel-inner">
                                  <template v-for="(url,num) in temp.imagesUrl" :key="num">
                                      <div v-if="num == 0" class="carousel-item active">
                                          <img class="w-100" :src="url" :alt='num+1'>
                                      </div>
                                      <div v-else class="carousel-item">
                                          <img class="w-100" :src="url" :alt='num+1'>
                                      </div>
                                  </template>
                                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                      <span class="visually-hidden">Previous</span>
                                  </button>
                                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                      <span class="visually-hidden">Next</span>
                                  </button>
                              </div>
                          </div>
                      </li>
                      <li class="py-1">
                          商品描述：{{ temp.description }}
                      </li>
                      <li class="py-1">
                          商品內容：{{ temp.content }}
                      </li>
                      <li class="py-1">
                          <span class="h2 text-danger">{{ temp.price }}</span> <del>{{ temp.origin_price }}</del> / 元
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      ifLogin: true,
      products: [],
      temp: {},
    }
  },
  methods: {
    getProducts() {
      axios.get(`https://vue3-course-api.hexschool.io/v2/api/guitimliu/admin/products`)
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
                console.log(err.response);
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
</script>