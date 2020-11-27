<template>
    <div class="container">
        <div style="margin: 50px">
            <el-select id="tours" v-model="tournament_id">
                <el-option
                    v-for="tour in tournament_id_list"
                    :key="tour"
                    :value="tour"
                >
                    {{ tour }}
                </el-option>
            </el-select>
            <el-button v-on:click="pull_data">拉取数据</el-button>
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
                    v-bind:round="index"
                    v-bind:table="tindex"
                    v-bind:groups="groups[0]"
                    v-bind:rates="rates"
                    v-bind:islast="index == groups.length - 1"
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
            groups: [],
            tournament_id: '',
            tournament_id_list: [],
            rates: [],
        };
    },
    watch: {
        tournament_id: function(newVal, oldVal) {
            if (oldVal != '') {
                this.$socket.client.emit('leave', oldVal);
            }
            if (newVal != '') {
                this.$socket.client.emit('join', newVal);
            }
        },
    },
    methods: {
        pull_data: function() {
            this.axios
                .get(
                    'http://3.131.128.209:8080/matchschedule/' +
                        this.tournament_id,
                    {
                        'Content-Type': 'application/json',
                        'token': localStorage.JWT_TOKEN,
                    }
                )
                .then((response) => {
                    // console.log(response);
                    this.groups = response.data.data;
                    // this.tournament_id = response.data.data[0];
                });
            this.axios
                .get(
                    'http://3.131.128.209:8080/getrate/' + this.tournament_id,
                    {
                        'Content-Type': 'application/json',
                        'token': localStorage.JWT_TOKEN,
                    }
                )
                .then((response) => {
                    this.rates = response.data.data;
                });
        },
    },
    mounted: function() {
        this.axios
            .get('http://3.131.128.209:8080/alltournament', {
                'Content-Type': 'application/json',
                'token': localStorage.JWT_TOKEN,
            })
            .then((response) => {
                console.log('getalltournamentid');
                this.tournament_id_list = response.data.data;
                this.tournament_id = response.data.data[0];
                this.pull_data();
            });
    },
    sockets: {
        refresh: function(data) {
            if (data != null) {
                console.log(data);
                var jsonData = JSON.parse(data);
                console.log(jsonData);
                if (jsonData.status === 'success') {
                    console.log('success');
                    this.$set(
                        this.groups[jsonData.round - 1],
                        jsonData.table - 1,
                        jsonData.team_name
                    );
                }
            }
        },
    },
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
    height: 90px;
    table-layout: fixed;
}
</style>
