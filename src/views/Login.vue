<template>
    <div>
        <div class="input-box">
            <el-input v-model="username" placeholder="username" />
        </div>
        <div class="input-box">
            <el-input v-model="password" placeholder="password" show-password />
        </div>
        <div class="button-box">
            <el-button v-on:click="login">登录</el-button>
            <el-button v-on:click="pping">ping</el-button>
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
                .get(
                    'http://3.131.128.209:8080' + '/login',
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
        pping: function() {
            this.$socket.client.emit('ping');
        },
    },
    sockets: {
        connect() {
            console.log('socket connected');
        },
    },
};
</script>

<style scoped>
.input-box {
    margin: 20px;
}
</style>
