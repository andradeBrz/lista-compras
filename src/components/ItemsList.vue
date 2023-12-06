<template>
    <div>
      <h5> {{ title }}</h5>
      <b-table striped hover :items="formatedItems" :fields="fields">
      
        <template #cell(marked)="data">
          <b-form-checkbox
            v-model="data.item.marked"
            @change="$emit('checkItem', {productId: data.item.id, listId: id, marked: data.item.marked})"
          >
          </b-form-checkbox>
        </template>

        <template #cell(price)="data">
          {{ data.item.price }} 

          <b-icon @click="$emit('edit', {productId: data.item.id, listId: id})" icon="pencil-fill" class="edit-icon"></b-icon>
        </template>
      </b-table>

      <span>
        Valor total estimado:
        {{ totalPrice }}
      </span>

    
    </div>
</template>
<script>

export default {
  props:{
    id: {
      type: String,
    },
    title: {
      type: String
    },
    items: {
      type: Array
    }
  },
  data() {
    return {
      types: {
        1: "Carnes",
        2: "Frios",
        3: "Padaria",
        4: "Laticínios",
        5: "Limpeza",
        6: "Outros",
      },
      fields: [
        {
          key: 'name',
          label: "Nome"
        },
        {
          key: 'type',
          label: 'Tipo',
        },
        {
          key: 'price',
          label: 'Preço',
        },
        {
          key: 'averagePrice',
          label: 'Preço médio',
        },
        {
          key: 'marked',
          label: 'Comprei',
        }
      ],
    }
  },
  computed: {
    formatedItems: function(){
      let moneyFormater = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
      });
      return this.items.map(item => {return {
        ...item,
        price: item.price ? moneyFormater.format(item.price) : "--",
        averagePrice: item.averagePrice ? moneyFormater.format(item.averagePrice) : "--",
        type: this.types[item.type],
        _rowVariant: this.getRowVariant(item)
      }})
    },

    totalPrice: function(){
      let totalPrice = this.items.map(item => item.averagePrice).reduce((partialSum, a) => a ?  partialSum + a : partialSum, 0).toFixed(2);
      if(!isNaN(totalPrice))
        return 'R$ ' + totalPrice

      return 'R$0,00'
    }
  },
  methods: {
    getRowVariant: function(item){
      console.log("ITEM", item)
      if(item.price >= item.averagePrice){
        if(item.price > item.averagePrice) return 'danger'
        return ''
      }

      return 'success'
    },

  }
}
</script>
<style scoped>
.edit-icon{
  margin-left: 10px;
  color: rgb(95, 95, 95);
  cursor: pointer;
}

.edit-icon:hover{
  color: black
}
</style>

