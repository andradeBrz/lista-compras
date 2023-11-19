<template>
     <div>
        <b-navbar class="nav-bar" toggleable >
            <h3>Lista de compras</h3>
            <b-button @click="$emit('toggleSideBar')" class="btn btn-primary mb-2">
                <b-icon icon="text-center" aria-hidden="true"></b-icon>
            </b-button>
        </b-navbar>
    </div>
</template>

<style scoped>

.nav-bar{
    background-color: #6b6bbc;
    height: 60px;
}

h3{
    color: white;
}
</style>