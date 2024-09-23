<template>
  <div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Abastecimentos</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
        </md-field>
        <div class="md-toolbar-section-end">
          <md-button class="md-fab md-mini md-primary" @click="openModal">
            <md-icon>add</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }" @click="editAbastecimento(item)">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Placa" md-sort-by="placa">{{ item.placa }}</md-table-cell>
        <md-table-cell md-label="Km" md-sort-by="km">{{ item.km }}</md-table-cell>
        <md-table-cell md-label="Hr" md-sort-by="hr">{{ item.hr }}</md-table-cell>
        <md-table-cell md-label="Litros" md-sort-by="litros">{{ item.litros }}</md-table-cell>
        <md-table-cell md-label="Veículo" md-sort-by="veiculo">{{ item.veiculo }}</md-table-cell>
        <md-table-cell>{{ item.data }}</md-table-cell>
      </md-table-row>
    </md-table>

    <md-dialog :md-active.sync="isModalOpen" class="custom-modal">
      <md-dialog-title>Novo Abastecimento</md-dialog-title>
      <md-dialog-content>
        <md-field>
          <label>Placa</label>
          <md-select v-model="newAbastecimento.placa" @input="updateVeiculo">
            <md-option v-for="placa in Object.keys(placaVeiculoMap)" :key="placa" :value="placa">{{ placa }}</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label>Km</label>
          <md-input v-model="newAbastecimento.km" type="number"></md-input>
        </md-field>
        <md-field>
          <label>Hr</label>
          <md-input v-model="newAbastecimento.hr" type="number"></md-input>
        </md-field>
        <md-field>
          <label>Litros</label>
          <md-input v-model="newAbastecimento.litros" type="number"></md-input>
        </md-field>
        <md-field>
          <label>Veículo</label>
          <md-input v-model="newAbastecimento.veiculo"></md-input>
        </md-field>
        <md-field>
          <label>Data</label>
          <md-input v-model="newAbastecimento.data" type="date" required></md-input>
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="saveAbastecimento">
          {{ isEditing ? 'Salvar' : 'Adicionar' }}
        </md-button>
        <md-button class="md-secondary" @click="closeModal">Cancelar</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: 'AbastecimentosView',
  data: () => ({
    search: null,
    searched: [],
    abastecimentos: [],
    isModalOpen: false,
    isEditing: false,
    newAbastecimento: {
      id: null,
      placa: '',
      km: '',
      hr: '',
      litros: '',
      veiculo: '',
      data: ''
    },
    placaVeiculoMap: {
      'ABC-123': 'CAMINHÃO COMPACTADOR',
      'XYZ-789': 'CAMINHÃO BETONEIRA',
      'DEF-456': 'CARRO UTILITÁRIO'
    }
  }),
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.resetForm();
    },
    addAbastecimento() {
      const { placa, km, hr, litros, veiculo, data } = this.newAbastecimento;
      if (!placa || !km || !hr || !litros || !veiculo || !data) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
      const newItem = {
        id: this.abastecimentos.length + 1,
        ...this.newAbastecimento
      };
      this.abastecimentos.push(newItem);
      this.saveToLocalStorage();
      this.searchOnTable();
      this.closeModal();
    },
    editAbastecimento(item) {
      this.newAbastecimento = { ...item };
      this.isEditing = true;
      this.isModalOpen = true;
    },
    saveAbastecimento() {
  const { placa, km, hr, litros, veiculo, data, id } = this.newAbastecimento;
  if (!placa || !km || !hr || !litros || !veiculo || !data) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  if (this.isEditing) {
    const index = this.abastecimentos.findIndex(abastecimento => abastecimento.id === id);
    if (index !== -1) {
      this.abastecimentos.splice(index, 1, { ...this.newAbastecimento });
    }
  } else {
    this.newAbastecimento.id = this.abastecimentos.length > 0 
      ? Math.max(...this.abastecimentos.map(item => item.id)) + 1 
      : 1;
    this.abastecimentos.push({ ...this.newAbastecimento });
  }

  this.saveToLocalStorage();
  this.searchOnTable(); // Atualiza a tabela após salvar
  this.closeModal();
},
    saveToLocalStorage() {
      localStorage.setItem('abastecimentos', JSON.stringify(this.abastecimentos));
      console.log('Dados salvos na Local Storage:', this.abastecimentos);
    },
    resetForm() {
      this.newAbastecimento = {
        placa: '',
        km: '',
        hr: '',
        litros: '',
        veiculo: '',
        data: ''
      };
      this.isEditing = false; // Reseta o estado de edição
    },
    searchOnTable() {
      this.searched = this.abastecimentos.filter(item =>
        item.placa.toLowerCase().includes(this.search ? this.search.toLowerCase() : '')
      );
    },
    updateVeiculo() {
      const selectedPlaca = this.newAbastecimento.placa;
      this.newAbastecimento.veiculo = this.placaVeiculoMap[selectedPlaca] || '';
    },
    loadFromLocalStorage() {
      const savedData = localStorage.getItem('abastecimentos');
      if (savedData) {
        this.abastecimentos = JSON.parse(savedData);
      }
      this.searchOnTable();
    },
    clearLocalStorage() {
      localStorage.clear();
    },
  },
  created() {
    this.loadFromLocalStorage();
  }
};
</script>

<style lang="scss" scoped>
  .md-field {
    max-width: 300px;
  }
  .custom-modal {
    max-width: 1900px; /* Aumente conforme necessário */
  }
</style>
