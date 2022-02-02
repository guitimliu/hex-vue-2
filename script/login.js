import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';

const app = {
    data() {
        return {
            api: {
                url: 'https://vue3-course-api.hexschool.io/v2/',
            },
            user: {
                username: '',
                password: '',
            }
        }
    },
    methods: {
        sendLogin() {
            // console.log(this.user);
            axios.post(`${this.api.url}admin/signin`, this.user)
            .then(res => {
                console.log(res.data);
                const {token, expired} = res.data;
                document.cookie = `vueLogin=${token}; expired=${new Date(expired)}`;

                // 驗證是否登入
                this.checkLogin();
            })
            .catch(err => {
                // console.log(err.response);
                alert('登入失敗，請確認帳號密碼是否正確。');
            })
        },
        checkLogin() {
            const tokenAuthorization = document.cookie.replace(/(?:(?:^|.*;\s*)vueLogin\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = tokenAuthorization;

            axios.post(`${this.api.url}api/user/check`)
            .then(res => {
                // console.log(res.data);
                alert('登入成功');
                location.href = "./";
            })
            .catch(err => {
                alert('登入失敗，請確認帳號密碼是否正確。');
                // console.log(err.response);
            })
        }
    }
}
createApp(app).mount('#app');