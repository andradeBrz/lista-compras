<template>
    <b-modal @ok="addProduct" id="productModal" cancel-title="Cancelar" ok-title="Adicionar" :title="'Adicionar Produto - ' + listId">
        <b-form >
            <b-form-group
                id="new-product-name"
                label="Produto (novo):"
                label-for="product-name-input"
                description="Caso seja a primeira vez adicionando o produto."
            >
                <b-form-input
                id="new-product-name-input"
                v-model="product.newName"
                type="text"
                placeholder="Produto"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="product-name"
                label="Produto:"
                label-for="product-name-input"
                description="Caso seja o produto já tenha sido cadastrado."
            >
            <b-form-select
                id="product-name-input"
                v-model="product.id"
                :options="products"
                @change="selectProduct"
                ></b-form-select>
            </b-form-group>

            <b-form-group id="product-price" label="Preço:" label-for="product-price-input" description="O preço pode ser adicionado posteriormente.">
                <b-form-input
                id="product-price-input"
                v-model="product.price"
                placeholder="Preço"
                type="number"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="product-type" label="Tipo:" label-for="product-type-select">
                <b-form-select
                id="product-type-select"
                v-model="product.type"
                :options="productTypes"
                required
                ></b-form-select>
            </b-form-group>
        </b-form>
    </b-modal>
</template>

<script>
import { db } from '../firebaseInit'
import { collection, addDoc, getDocs, getDoc, doc, updateDoc } from "firebase/firestore"; 

export default {
    data(){
        return {
            product: {
                id: "",
                newName: "",
                name: "",
                type: 0,
                price: 0,
                averagePrice: 0
            },
            products: [],
            types: {
                1: "Carnes",
                2: "Frios",
                3: "Padaria",
                4: "Laticínios",
                5: "Limpeza",
                6: "Outros",
            },
            listId: ""
        }
    },

    computed: {
        productTypes: function(){
            return Object.keys(this.types).map(type => {return {value: type, text: this.types[type]}})
        }
    },

    methods:{
        addProduct: async function(){
            if(this.product.newName != ""){
                let newProduct = {
                    name: this.product.newName,
                    type: this.product.type,
                    price: this.product.price,
                }
                addDoc(collection(db, "Products"), newProduct).then(productDoc => {
                    //Adicionar na lista
                    const listRef = doc(db, "Lists", this.listId);
                    getDoc(listRef).then(listDoc => {
                        let products = listDoc.data().products;
                        products.push(productDoc.id)
                        updateDoc(listRef, {products}).then(()=> this.$emit('updateList'))
                    })
                })
            }
            else{
                delete this.product.newName;
                const listRef = doc(db, "Lists", this.listId);
                getDoc(listRef).then(listDoc => {
                    let products = listDoc.data().products;

                    products.push(this.product.id)
                    updateDoc(listRef, {products}).then(()=> this.$emit('updateList'))
                })
            }
            
        },
        setListId: function(listId){
            this.listId = listId;
        },
        selectProduct: function(){
            const productRef = doc(db, "Products", this.product.id);

            getDoc(productRef).then(productDoc => {
                this.product.name = productDoc.data().name;
                this.product.type = productDoc.data().type;
                this.product.averagePrice = productDoc.data().averagePrice;
            })
        }
    },

    beforeMount(){
        getDocs(collection(db, "Products")).then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                this.products.push({value: doc.id, text: doc.data().name, ...doc.data()})
            })
        })
        
    }

}
</script>