<template>
    <b-modal @ok="updatePrice" id="editPriceModal" cancel-title="Cancelar" ok-title="Atualizar" :title="'Editar Preço - ' + productId ">
        <b-form >
            <b-form-group id="product-price" label="Preço:" label-for="product-price-input" description="O preço pode ser adicionado posteriormente.">
                <b-form-input
                id="product-price-input"
                v-model="newPrice"
                placeholder="Preço"
                type="number"
                required
                ></b-form-input>
            </b-form-group>
        </b-form>
    </b-modal>
</template>

<script>
import { db } from '../firebaseInit'
import { doc, getDoc, updateDoc } from "firebase/firestore"; 

export default {
    data(){
        return {
            productId: "",
            listId: "",
            newPrice: 0
        }
    },
    methods:{
        updatePrice: async function(){
            const list = doc(db, "Lists", this.listId);

            getDoc(list).then(listDoc => {
                let productsList = listDoc.data().products;
                let productIndex = productsList.findIndex(p => p.id == this.productId);
                let productRef = productsList[productIndex];
                productRef.price = this.newPrice
                updateDoc(list, {products: productsList})
            })
        },
        setProductId: function(productId, listId){
            this.productId = productId;
            this.listId = listId;
        },
    },
}
</script>