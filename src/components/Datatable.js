import React, { Component } from 'react';

class DataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      itemsPerPage: 10,
      searchValue: '',
      sortBy: null,
      sortDirection: 'asc',
    };
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  handleSort = (key) => {
    const { sortBy, sortDirection } = this.state;

    if (sortBy === key) {
      this.setState({
        sortDirection: sortDirection === 'asc' ? 'desc' : 'asc',
      });
    } else {
      this.setState({
        sortBy: key,
        sortDirection: 'asc',
      });
    }
  };

  render() {
    const { currentPage, itemsPerPage, searchValue, sortBy, sortDirection } = this.state;
    const { columns, data } = this.props;

    // Filtrer les données en fonction de la recherche
    const filteredData = data.filter((row) =>
      columns.some((col) =>
        String(row[col.key]).toLowerCase().includes(searchValue.toLowerCase())
      )
    );

    // Trier les données
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortBy) {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    // Pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = sortedData.slice(startIndex, endIndex);

    const totalEntries = sortedData.length;

    return (
      <div className="table-responsive">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchValue}
          onChange={this.handleSearch}
        />
        <table className="display table table-striped table-hover">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => this.handleSort(col.key)}
                  style={{ cursor: 'pointer' }}
                >
                  {col.label}{' '}
                  {sortBy === col.key && (
                    <span>
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tfoot>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </tfoot>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button
            onClick={() => this.handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          <button
            onClick={() => this.handlePageChange(currentPage + 1)}
            disabled={endIndex >= filteredData.length}
          >
            Suivant
          </button>
        </div>
        <div>
          Affichage de {startIndex + 1} à{' '}
          {Math.min(endIndex, totalEntries)} sur {totalEntries} entrées
        </div>
      </div>
    );
  }
}

export default DataTable;
