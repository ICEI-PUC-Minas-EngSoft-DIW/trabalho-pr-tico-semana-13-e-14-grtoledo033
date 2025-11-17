// chart-data.js
if (window.location.pathname.includes('estatisticas.html')) {
  document.addEventListener('DOMContentLoaded', function() {
    const charles = dados.charles;
    
    // Preparar dados para os gráficos
    const categorias = {
      'Futebol': 0,
      'TV': 0,
      'Frase': 0
    };
    
    const relevancia = [];
    const nomes = [];
    
    charles.momentos.forEach(momento => {
      // Categorizar baseado no nome
      if (momento.nome.toLowerCase().includes('fla-flu') || momento.nome.toLowerCase().includes('futebol')) {
        categorias.Futebol++;
      } else if (momento.nome.toLowerCase().includes('entrevista') || momento.nome.toLowerCase().includes('panico')) {
        categorias.TV++;
      } else if (momento.nome.toLowerCase().includes('frase')) {
        categorias.Frase++;
      }
      
      // Dados para gráfico de barras (usando ID como relevância)
      relevancia.push(momento.id * 10); // Multiplicador para visualização
      nomes.push(momento.nome);
    });

    // Gráfico de Pizza
    const ctxPizza = document.getElementById('graficoPizza').getContext('2d');
    new Chart(ctxPizza, {
      type: 'pie',
      data: {
        labels: Object.keys(categorias),
        datasets: [{
          data: Object.values(categorias),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Tipos de Momentos Icônicos'
          }
        }
      }
    });

    // Gráfico de Barras
    const ctxBarras = document.getElementById('graficoBarras').getContext('2d');
    new Chart(ctxBarras, {
      type: 'bar',
      data: {
        labels: nomes,
        datasets: [{
          label: 'Índice de Relevância',
          data: relevancia,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Relevância'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Momentos'
            }
          }
        }
      }
    });

    // Tabela de dados
    const tabelaHTML = `
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Relevância</th>
          </tr>
        </thead>
        <tbody>
          ${charles.momentos.map(momento => `
            <tr>
              <td>${momento.id}</td>
              <td>${momento.nome}</td>
              <td>${momento.descricao}</td>
              <td>${momento.nome.toLowerCase().includes('fla-flu') ? 'Futebol' : 
                    momento.nome.toLowerCase().includes('entrevista') ? 'TV' : 
                    momento.nome.toLowerCase().includes('frase') ? 'Frase' : 'Outro'}</td>
              <td>${momento.id * 10}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    
    document.getElementById('tabelaDados').innerHTML = tabelaHTML;
  });
}