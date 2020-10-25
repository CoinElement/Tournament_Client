<template>
    <div class="container">
        <div>
            <input type="text" v-model="tournament_id" style="width: 500px" />
        </div>
        <div style="margin: 50px">
            <button v-on:click="pull_data">拉取数据</button>
        </div>
        <div
            class="round-container"
            v-for="(table, index) in groups"
            v-bind:key="index"
        >
            <TableBlock
                v-for="(team, tindex) in table"
                v-bind:key="tindex"
                v-bind:groupname="team"
            />
        </div>
    </div>
</template>

<script>
import TableBlock from './TableBlock';

export default {
    name: 'Table',
    components: { TableBlock },
    props: {
        msg: String,
    },
    data() {
        return {
            groups: [
                ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
                ['A', ' ', ' ', ' '],
                [' ', ' '],
                [' '],
            ],
            tournament_id: '0537f9b6-9abf-4890-a980-c3ff8a928273',
        };
    },
    methods: {
        pull_data: function() {
            this.axios
                .post(
                    'http://127.0.0.1:8080/refreshtable',
                    {
                        token: localStorage.JWT_TOKEN,
                        tournament_id: this.tournament_id,
                    },
                    {
                        'Content-Type': 'application/json',
                    }
                )
                .then((response) => {
                    console.log(response);
                    this.groups = response.data.data;
                });
        },
    },
    mounted: function() {
        console.log('JWT_TOKEN:' + localStorage.JWT_TOKEN);
    },
    /*
    sockets: {
        connect(data) {
            console.log(data);
        },
        table_changed(data) {
            console.log('Received Data:' + data);
            this.msg = data;
        },
        disconnect() {
            console.log('Disconnected');
        },
        reconnect() {
            this.$socket.emit('connect');
        },
    },
    */
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    width: 800px;
    height: 900px;
}
.round-container {
    display: table;
    width: 100%;
    height: 70px;
    table-layout: fixed;
}
</style>
