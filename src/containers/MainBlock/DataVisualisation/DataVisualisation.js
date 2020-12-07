import React, { Component } from "react";

import classes from "./DataVisualisation.module.css";
import TreeMapNivo from "./TreeMapNivo/TreeMapNivo";
import LineGraph from "./LineGraph/LineGraph";
import stock_prices from "./data/stock_price";
import StockCard from "./StockCard/StockCard";
import snp_companies_info from "./data/snp_companies_info";
import snp_companies from "./data/snp_companies";
import snp_by_sector from "./data/snp_by_sector";
import snp_companies_by_sector from "./data/snp_companies_by_sector";
import Choropleth from "./Choropleth/Choropleth";

class DataVisualisation extends Component {
  state = {
    selectedStock: "AAPL",
    zoomInSector: null,
  };

  validStock(stock) {
    if (stock === null || !stock_prices.hasOwnProperty(stock)) {
      return false;
    }
    return true;
  }

  changeSelectedStock(stock) {
    this.setState({ selectedStock: stock });
  }

  getStockData(stock) {
    if (stock === null || !snp_companies_info.hasOwnProperty(stock)) {
      return {};
    }
    return snp_companies_info[stock];
  }

  zoomInSector(sector) {
    this.setState({ zoomInSector: sector });
  }

  zoomOutSector(sector) {
    this.setState({ zoomInSector: null });
  }

  maxSnpSectorCount = Math.max.apply(
    Math,
    snp_by_sector.children.map((item) => item.count)
  );

  maxStockValue(stock_data) {
    return Math.max.apply(
      Math,
      stock_data.children.map((item) => item.market_cap)
    );
  }

  render() {
    return (
      <div className={classes.DataVisualisation}>
        <TreeMapNivo
          motion="slow"
          identity={"symbol"}
          value={"market_cap"}
          maxValue={this.maxStockValue(snp_companies)}
          data={snp_companies}
          onStockClick={(stock) => this.changeSelectedStock(stock)}
        />
        {this.state.selectedStock !== null ? (
          <StockCard
            stock={this.state.selectedStock}
            data={this.getStockData(this.state.selectedStock)}
            no_graph={!this.validStock(this.state.selectedStock)}
          />
        ) : null}

        {this.validStock(this.state.selectedStock) ? (
          <LineGraph stock={this.state.selectedStock} />
        ) : null}

        {this.state.zoomInSector === null ? (
          <TreeMapNivo
            motion="wobbly"
            identity={"name"}
            value={"count"}
            maxValue={this.maxSnpSectorCount}
            data={snp_by_sector}
            onStockClick={(sector) => this.zoomInSector(sector)}
          />
        ) : (
          <TreeMapNivo
            motion="wobbly"
            identity={"symbol"}
            value={"market_cap"}
            maxValue={this.maxStockValue(
              snp_companies_by_sector[this.state.zoomInSector]
            )}
            data={snp_companies_by_sector[this.state.zoomInSector]}
            onStockClick={(stock) => this.zoomOutSector(stock)}
          />
        )}
        <Choropleth />
      </div>
    );
  }
}

export default DataVisualisation;
