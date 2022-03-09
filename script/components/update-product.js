export default {
    data() {
        return {
            setOriginPrice: false,
        }
    },
    methods: {
        returnData() {
            this.$emit('return-data', this.data);
        },
        uploadImage() {
            const imagesUrl = document.querySelector('#productImages');
            console.log(imagesUrl);
            const imgData = imagesUrl.files;
    
            const formData = new FormData();
            formData.append('file-to-upload', imgData[0])
    
            axios.post(`${this.api.url}api/${this.api.path}/admin/upload/`, formData)
                .then((res) => {
                    this.temp.imageUrl = res.imgData.imageUrl;
                    this.temp.imagesUrl ? '' : this.temp.imagesUrl = [];
                    this.temp.imagesUrl.push(this.temp.imageUrl);
                })
                .catch(() => { /* error */ })
        },
    },
    props: ['data', 'is_edit'],
    template: `
        <div class="modal fade" id="productDetail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                        <h5 v-if="is_edit" class="modal-title" id="exampleModalLabel">編輯商品</h5>
                        <h5 v-else class="modal-title" id="exampleModalLabel">新增商品</h5>
                        <div class="ms-2">
                            <button v-if="data.is_enabled" @click="data.is_enabled = !data.is_enabled" class="btn btn-success">啟用</button>
                            <button v-else @click="data.is_enabled = !data.is_enabled" class="btn btn-danger">未啟用</button>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="list-unstyled">
                            <li class="py-1">
                                <label for="productName" class="form-label">
                                    商品標題
                                </label>
                                <input type="text" class="form-control" id="productName" v-model="data.title">
                            </li>
                            <li class="py-1">
                                <label for="productCategory" class="form-label">
                                    商品分類
                                </label>
                                <input type="text" id="productCategory" class="form-control" v-model="data.category">
                            </li>
                            <li class="py-1">
                                <label for="productDescription" class="form-label">
                                    商品描述
                                </label>
                                <input type="text" class="form-control" id="productDescription" v-model="data.description">
                            </li>
                            <li class="py-1">
                                <label for="productContent" class="form-label">
                                    商品內容
                                </label>
                                <textarea type="text" class="form-control" id="productContent" v-model="data.content" rows="3"></textarea>
                            </li>
                            <li class="py-1">
                                <label for="productPrice" class="form-label">
                                    商品價格
                                </label>
                                <input type="number" min="0" class="form-control" id="productPrice" v-model="data.price">
                            </li>
                            <li class="py-1">
                                <div class="py-1">
                                    {{ setOriginPrice }}
                                    <input type="checkbox" class="form-check-input" id="setOriginPrice" v-model="setOriginPrice">
                                    <label for="setOriginPrice" class="form-check-label ms-1">
                                        此價格為特價，輸入商品原價
                                    </label>
                                </div>
                                <div class="py-1" v-if="setOriginPrice">
                                    <label for="productOriginPrice" class="form-label">
                                        商品原價
                                    </label>
                                    <input type="number" min="0" class="form-control" id="productOriginPrice" v-model="data.origin_price">
                                </div>
                            </li>
                            <li v-if="data.price" class="py-1">
                                <span class="h2 text-danger">{{ data.price }}</span> <del v-if="setOriginPrice">{{ data.origin_price }}</del> / 元
                            </li>
                            <li class="py-1">
                                <label for="productImages">圖片</label>
                                <input type="file" id="productImages" class="productImages" @change="uploadImage">
                                <div class="py-3">
                                    <datalate v-for="(img,key) in data.imagesUrl" :key="key">
                                        <img :src="img" alt="圖片" class="w-100">
                                    </datalate>
                                </div>
                            </li>
                            <li class="text-end py-3">
                                <button v-if="is_edit" @click="returnData" data-bs-dismiss="modal" type="button" class="btn btn-success rounded-2 w-25 ms-2">送出</button>
                                <button v-else @click="returnData" data-bs-dismiss="modal" type="button" class="btn btn-success rounded-2 w-25 ms-2">新增</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `,
}