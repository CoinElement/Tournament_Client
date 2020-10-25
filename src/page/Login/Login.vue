<template>
    <div>
        <div>
            <span>username</span>
            <input type="text" v-model="username" />
        </div>
        <div>
            <span>password</span>
            <input type="text" v-model="password" />
        </div>
        <div>
            <button v-on:click="login">登录</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        login: function() {
            this.axios
                .post(
                    'http://127.0.0.1:8080/login',
                    {
                        user_id: '123',
                        name: '123',
                        username: this.username,
                        password: this.password,
                    },
                    {
                        'Content-Type': 'application/json',
                    }
                )
                .then((response) => {
                    console.log(response);

                    if (response.data.msg == 'success') {
                        localStorage.JWT_TOKEN = response.data.token;
                        this.$router.push('/table');
                    }
                });
        },
    },
};
</script>
