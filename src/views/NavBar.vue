<template>
  <div class="sidebar-container">
    <nav class="sidebar">
      <router-link to="/abastecimentos" class="sidebar-link">
        <i class="fas fa-gas-pump"></i> Abastecimentos
      </router-link>
      <router-link to="/veiculos" class="sidebar-link">
        <i class="fas fa-car"></i> Veículos
      </router-link>
      <router-link to="/estoque" class="sidebar-link">
        <i class="fas fa-boxes"></i> Estoque
      </router-link>
    </nav>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBarView'
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  display: flex;
}

.sidebar {
  width: 200px;
  background-color: #333;
  padding: 1rem;
  height: 100vh;
  position: fixed;
}

.sidebar-link {
  display: flex;
  align-items: center; /* Alinha o texto com o ícone */
  color: white;
  text-decoration: none;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  i {
    margin-right: 0.5rem; /* Espaçamento entre ícone e texto */
  }

  &:hover {
    background-color: #555;
  }
}

.content {
  margin-left: 220px; /* Espaço para a sidebar */
  padding: 1rem;
  width: calc(100% - 220px);
}
</style>
