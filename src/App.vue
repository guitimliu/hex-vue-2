<template>
<div class="container my-3">
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

const products = [
    {
      category: "甜甜圈",
      content: "尺寸：14x14cm",
      description: "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
      id: "-L9tH8jxVb2Ka_DYPwng",
      is_enabled: 1,
      origin_price: 150,
      price: 99,
      title: "草莓莓果夾心圈",
      unit: "個",
      num: 10,
      imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRvbnV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
      imagesUrl: [
        "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80",
        "https://images.unsplash.com/photo-1559656914-a30970c1affd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY0fHxkb251dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
      ]
    },
    {
      category: "蛋糕",
      content: "尺寸：6寸",
      description: "蜜蜂蜜蛋糕，夾層夾上酸酸甜甜的檸檬餡，清爽可口的滋味讓人口水直流！",
      id: "-McJ-VvcwfN1_Ye_NtVA",
      is_enabled: 0,
      origin_price: 1000,
      price: 900,
      title: "蜂蜜檸檬蛋糕",
      unit: "個",
      num: 1,
      imageUrl: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
      imagesUrl: [
        "https://images.unsplash.com/photo-1618888007540-2bdead974bbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
      ]
    },
    {
      category: "蛋糕",
      content: "尺寸：6寸",
      description: "法式煎薄餅加上濃郁可可醬，呈現經典的美味及口感。",
      id: "-McJ-VyqaFlLzUMmpPpm",
      is_enabled: 1,
      origin_price: 700,
      price: 600,
      title: "暗黑千層",
      unit: "個",
      num: 15,
      imageUrl: "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
      imagesUrl: [
        "https://images.unsplash.com/flagged/photo-1557234985-425e10c9d7f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxjYWtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
        "https://images.unsplash.com/photo-1540337706094-da10342c93d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
      ]
    }
]

export default {
  data() {
    return {
      products,
      temp: {},
    }
  },
  methods: {
    showDetail(item) {
      this.temp = item;
    }
  },
  mounted() {
    AOS.init({
      duration: 600,
    });
  }
}
</script>