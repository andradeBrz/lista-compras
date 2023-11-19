<template>
    <b-modal @ok="addList" id="listModal" cancel-title="Cancelar" ok-title="Adicionar" title="Adicionar Lista">
        <b-form >
            <b-form-group
                id="list-title"
                label="Nome:"
                label-for="list-title-input"
            >
                <b-form-input
                id="list-title-input"
                v-model="list.title"
                type="text"
                placeholder="Nome"
                ></b-form-input>
            </b-form-group>
        </b-form>
    </b-modal>
</template>

<script>
import { db } from '../firebaseInit'
import { collection, addDoc } from "firebase/firestore"; 

export default {
    data(){
        return {
            list: {
                id: "",
                title: "",
                user: "user_id",
                created_at: new Date(),
                products: []
            },
        }
    },

    methods:{
        addList: async function(){
            let listCollection = collection(db, "Lists")
            addDoc(listCollection, this.list).then(()=> this.$emit('updateList'))
        },
    },
}
</script>