export default {
    methods: {
        confirmDelete() {
            this.$emit('confirm-delete', this.data);
        }
    },
    props: ['data'],
    template: `
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">刪除商品</h5>
                    </div>
                    <div class="modal-body">
                        <p>確定刪除 <span class="text-danger">{{ data.title }}</span> 商品？</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">取消</button>
                        <button @click="confirmDelete" data-bs-dismiss="modal" type="button" class="btn btn-danger">刪除</button>
                    </div>
                </div>
            </div>
        </div>
    `,
}