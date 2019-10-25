<template>
    <div class="user-admin">
        <b-form>
            <input id="user-id" type="hidden" v-model="user.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Name:" label-for="user-name">
                        <b-form-input id="user-name" type="text"
                            v-model="user.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Write user name" />
                    </b-form-group>
                </b-col>

                <b-col md="6" sm="12">
                    <b-form-group label="Email:" label-for="user-email">
                        <b-form-input id="user-email" type="text"
                            v-model="user.email" required
                            placeholder="Write user email" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-form-checkbox id="user-admin" v-show="mode === 'save'" v-model="user.admin" class="mt-e mb-3">
                Administrator?
            </b-form-checkbox>

            <b-row v-show="mode === 'save'">
                <b-col md="6" sm="12">
                    <b-form-group label="Password:" label-for="user-password">
                        <b-form-input id="user-password" type="password"
                            v-model="user.password" required
                            placeholder="Write password" />
                    </b-form-group>
                </b-col>

                <b-col md="6" sm="12">
                    <b-form-group label="Password Confirmation:" label-for="user-confirmPassword">
                        <b-form-input id="user-confirmPassword" type="password"
                            v-model="user.confirmPassword" required
                            placeholder="Confirm password" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'" @click="save">Save</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Delete</b-button>
                    <b-button class="ml-2" @click="reset">Cancel</b-button>
                </b-col>
            </b-row>
            

        </b-form>
        <hr>
        <template>
        <b-table hover striped :items="users" :fields="fields" >
            <!-- <template slot="actions" slot-scope="data">  old vue slot use, changed in 2.6 --> 
            <template v-slot:cell(actions)="data">
                <b-button variant="warning" @click="loadUser(user.item)" class="mr-2">
                    <i class="fa fa-pencil"/></b-button>
                <b-button variant="danger" @click="loadUser(data.item, 'remove')">
                    <i class="fa fa-trash"/></b-button>
            </template>
        </b-table>        
        </template>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'



export default {
    name: 'UserAdmin',
    data: function() {
        return {
            mode: 'save',
            user: {},
            users: [],
            fields: [
                { key: 'id', label: 'Code', sortable: true},
                { key: 'name', label: 'Name', sortable: true},
                { key: 'email', label: 'Email', sortable: true},
                { key: 'admin', label: 'Administrator', sortable: true,
                    formatter: value => value ? 'Yes' : 'No'},
                {key: 'actions', label: 'Actions'}

            ]
        }
    },
    methods: {
        loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => this.users = res.data)
        },
        loadUser (user, mode = 'save') {
            this.mode = mode
            this.user = { ...user }

        },
        reset() {
            this.mode = 'save'
            this.user = {}
            this.loadUsers()
        },
        save() {
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''

            axios[method](`${baseApiUrl}/users${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.user.id
            axios.delete(`${baseApiUrl}/users/${id}`)
            .then(()=> {
                this.$toasted.global.defaultSuccess()
                this.reset()
            })
            .catch(showError)
        }
    },
    mounted() {
        this.loadUsers()
    }
}
</script>

<style>

</style>