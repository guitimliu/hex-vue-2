<template>
    <div class="container">
        <div class="row justify-content-center vh-100">
            <div class="col-md-6 align-self-center">
                <div class="bg-secondary rounded-3 p-3">
                    <h1 class="h3 text-center mb-3">歡迎回來！請先登入～</h1>
                    <hr>
                    <form>
                        <div class="mb-3">
                            <label for="email" class="form-label">E-mail</label>
                            <input type="text" class="form-control" id="email" placeholder="請輸入 E-mail" v-model="user.username">
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">密碼</label>
                            <input type="password" class="form-control" id="password" placeholder="請輸入密碼" v-model="user.password">
                        </div>
                        <hr>
                        <button type="button" class="btn btn-dark w-100" @click="sendLogin">登入</button>
                    </form>
                </div>
            </div>            
        </div>
    </div>
</template>

<script>
export default {
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
    },
    mounted() {
        
    }
}
</script>