<template>
    <div class="container">
        <div style="margin: 50px">
            <select id="tours" v-model="tournament_id">
                <option
                    v-for="tour in tournament_id_list"
                    :key="tour"
                    :value="tour"
                >
                    {{ tour }}
                </option>
            </select>
            <button v-on:click="pull_data">拉取数据</button>
            <button v-on:click="pping">Ping</button>
        </div>
        <div class="tour-container">
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
    </div>
</template>

<script>
import TableBlock from '@/components/Table/TableBlock';

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
            tournament_id: '',
            tournament_id_list: [],
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
                    // console.log(response);
                    this.groups = response.data.data;
                });
        },
        pping: function() {
            console.log('pping');
            this.$socket.emit('ping', JSON.stringify({ data: 'dddd' }));
        },
    },
    mounted: function() {
        this.axios
            .post(
                'http://127.0.0.1:8080/getalltournamentid',
                {
                    token: localStorage.JWT_TOKEN,
                },
                {
                    'Content-Type': 'application/json',
                }
            )
            .then((response) => {
                console.log('getalltournamentid');
                this.tournament_id_list = response.data.data;
            });
        // console.log('JWT_TOKEN:' + localStorage.JWT_TOKEN);
        // this.$socket.emit('connect', 1);
    },
    /*
    sockets: {
        connect: function() {
            console.log('Socket connected');
        },
        reconnect(data) {
            console.log('reconnect', data);
            this.$socket.emit('connect', 1);
        },
        disconnect(data) {
            console.log('disconnect', data);
            this.$socket.emit('reconnect');
        },
    },
    */
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    width: 100%;
    height: 900px;
}
.tour-container {
    height: 900px;
}
.round-container {
    display: table;
    width: 100%;
    height: 70px;
    table-layout: fixed;
}
</style>
