<template>
    <div>
        <PageTitle icon="fa fa-home" main="Dashboard" sub="Articles Database" />
        <div class="stats">
            <Stat title="Categories" :value="stat.categories" icon="fa fa-folder" color="#d54d50" />
            <Stat title="Articles" :value="stat.articles" icon="fa fa-folder" color="#3bc480" />
            <Stat title="Users" :value="stat.users" icon="fa fa-user" color="#3282cd" />
        </div>
    </div>
</template>

<script>
import  PageTitle from '../template/PageTitle'
import Stat from './Stat'
import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
   name: 'Home',
   components: { PageTitle, Stat },
   data: function() {
       return {
           stat: {}
       }
   },
   methods: {
       getStat() {
           axios.get(`${baseApiUrl}/stat`).then(res => this.stat = res.data)
       }
   },
   mounted() {
       this.getStat()
   }
}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>