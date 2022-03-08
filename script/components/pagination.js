export default {
    methods: {
        changePage(page) {
            this.$emit('return-page', page);
        }
    },
    props: ['data'],
    template: `
        <button class="btn btn-light mx-1" v-if="data.has_pre" @click="changePage(data.current_page-1)" type="button">上一頁</button>
        <template v-for="page in data.total_pages" :key="page">
            <button v-if="page != data.current_page" class="btn btn-light mx-1" @click="changePage(page)" type="button">{{ page }}</button>
            <button v-else class="btn btn-dark mx-1" @click="changePage(page)" type="button">{{ page }}</button>
        </template>
        <button class="btn btn-light mx-1" v-if="data.has_next" @click="changePage(data.current_page+1)" type="button">下一頁</button>
    `,
}