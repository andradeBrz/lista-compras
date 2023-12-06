<template>
    <div>
      <div v-for="list in lists" :key="list.id" class="list">
        <ItemsList @edit="openEditPriceModal" @checkItem="itemChecked" :title="list.title" :id="list.id" :items="list.items"/>

        <button @click="openAddProductModal(list.id)" class="btn btn-primary add-product">
          + Adicionar Produto
        </button>
      </div>

      <button @click="openAddListModal()" class="btn btn-primary .add-list">
          + Adicionar Lista
        </button>
      <ProductModal ref="AddProductModal" @updateList="getLists"/>
      <EditPriceModal ref="EditPriceModal" @updateList="getLists"/>
      <ListModal ref="AddListModal" @updateList="getLists"/>
    </div>

  </template>
  
<script>

import ProductModal from '../modals/ProductModal.vue'
import EditPriceModal from '../modals/EditPriceModal.vue'
import ListModal from '../modals/ListModal.vue'
import ItemsList from '../components/ItemsList.vue';
import { db } from '../firebaseInit'
import { collection, getDocs, getDoc, doc, updateDoc } from "firebase/firestore"; 
export default {
  components: {
    ProductModal,
    EditPriceModal,
    ListModal,
    ItemsList
  },
  data() {
    return {
      lists: []
    }
  },

  methods: {
    openAddProductModal: function(listId){
      this.$refs.AddProductModal.setListId(listId);
      this.$bvModal.show('productModal')
    },
    openEditPriceModal: function(data){
      this.$refs.EditPriceModal.setProductId(data.productId, data.listId);
      this.$bvModal.show('editPriceModal')
    },
    openAddListModal: function(){
      this.$bvModal.show('listModal')
    },
    itemChecked: function(data){
      const list = doc(db, "Lists", data.listId);

      //Marcar produto
      getDoc(list).then(listDoc => {
          let productsList = listDoc.data().products;
          let productIndex = productsList.findIndex(p => p.id == data.productId);
          let productRef = productsList[productIndex];
          productRef.marked = data.marked;
          updateDoc(list, {products: productsList}).then(() => {
            this.updateAveragePrice(parseFloat(productRef.price), data.productId)
          })
      })
    },

    updateAveragePrice: function(actualPrice, productId){
      //Atualizar preço médio
      const productRef = doc(db, "Products", productId);
      getDoc(productRef).then(productDoc => {
        let oldAveragePrice = productDoc.data().averagePrice;
        let newAveragePrice = 0;

        console.log(oldAveragePrice, actualPrice)
        if(oldAveragePrice)
          newAveragePrice = (oldAveragePrice + actualPrice) / 2
        else 
          newAveragePrice = actualPrice

        updateDoc(productRef, {averagePrice: newAveragePrice})
      })
    },

    getLists: function(){
      this.lists = []
      getDocs(collection(db, "Lists")).then(querySnapshot => {
          querySnapshot.forEach((listDoc) => {

            console.log("AQUDAIDSAD", listDoc.data())
            let list = {
              id: listDoc.id,
              title: listDoc.data().title,
              items: []
            }
            
            listDoc.data().products?.forEach(product => {
              console.log("Product", product.id)
              if(product.id){
                const ref = doc(db, "Products", product.id);
              getDoc(ref).then(productDoc => {
                let item = {
                  ...productDoc.data(),
                  id: productDoc.id,
                  price: product.price
                }
                list.items.push(item)
              }).catch(()=> {
                console.log("AQUI")
              })
              }
              
              
            })
            this.lists.push(list);
          })
      })
    }

  },

  beforeMount(){
    console.log("AQUI")
    //Get Lists
    this.getLists();
  }
}
</script>

<style scoped>
.add-product{
  float: right;
  margin-bottom: 70px;
}
.list{
  margin-top: 50px;
}
.add-list{
  margin-top: 30px;
}

</style>