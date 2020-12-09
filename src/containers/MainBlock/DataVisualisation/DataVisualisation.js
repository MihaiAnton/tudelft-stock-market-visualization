import React, { Component } from "react";

import classes from "./DataVisualisation.module.css";
import TreeMapNivo from "./TreeMapNivo/TreeMapNivo";
import LineGraph from "./LineGraph/LineGraph";
import stock_prices from "./data/stock_price";
import StockCard from "./StockCard/StockCard";
import snp_companies_info from "./data/snp_companies_info";
//import snp_companies from "./data/snp_companies";
import snp_by_sector from "./data/snp_by_sector";
import snp_companies_by_sector from "./data/snp_companies_by_sector";
import Choropleth from "./Choropleth/Choropleth";
import snp_companies_trailingPE_bySector from "./data/snp_companies_trailingPE";
import snp_companies_bookValue_bySector from "./data/snp_companies_bookValue";
import snp_companies_averageDailyVolume3Month_bySector from "./data/snp_companies_averageDailyVolume3Month";

class DataVisualisation extends Component {
  state = {
    selectedStock: null,
    zoomInSector: null,
    typeValue:'market_cap'
  };

  validStock(stock) {
    if (stock === null || !stock_prices.hasOwnProperty(stock)) {
      return false;
    }
    return true;
  }

  changeSelectedStock(stock) {
    this.setState({ selectedStock: stock });
    document.getElementById('stockCardInfo').scrollIntoView({ behavior: 'smooth' });
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
    this.setState({ zoomInSector: null,selectedStock:null });
  }

  maxSnpSectorCount = Math.max.apply(
    Math,
    this.adjustCountAccToState().children.map((item) => item.count)//snp_by_sector.children.map((item) => item.count)
  );

  maxStockValue(stock_data) {
    return Math.max.apply(
      Math,
      stock_data.children.map((item) => item[this.state.typeValue])//stock_data.children.map((item) => item.market_cap)
    );
  }

  getCurrentStateForDataBySector(){
    switch (this.state.typeValue) {
      case "trailingPE":
        return snp_companies_trailingPE_bySector;
      case "bookValue":
        return snp_companies_bookValue_bySector;
      case "averageDailyVolume3Month":
        return snp_companies_averageDailyVolume3Month_bySector;
      default: // market_cap as default
        return snp_companies_by_sector;
    }
  }

  adjustCountAccToState(){
    let sampleSector =snp_by_sector;
    sampleSector.children.forEach(data=>data.count=0);
    var sectorData = this.getCurrentStateForDataBySector();
    Object.keys(sectorData).forEach(element => {
      let count=0;
      for (let index = 0; index < sectorData[element].children.length; index++) {
        let childData = sectorData[element].children[index];
        count += childData[this.state.typeValue];
      }
      sampleSector.children.find(x=>x.name === element).count = count;
    });
    console.log(this.state.typeValue);
    return sampleSector;
  }

  onTypeChange(e){
    this.setState({ typeValue:e.target.value, selectedStock:null });
    this.zoomOutSector(null);
  }

  render() {
    return (
      <div className={classes.DataVisualisation}>
        <div className="selectType">
          <select onChange={(e)=>this.onTypeChange(e)}>
            <option value="market_cap">Market Cap</option>
            <option value="trailingPE">P/E Ratio</option>
            <option value="bookValue">Book Value</option> 
            <option value="averageDailyVolume3Month">Average Daily Volume</option>
          </select>
        </div>
        <div className="goback">
          <button onClick={()=>{this.zoomOutSector(null)}}>Go back</button>
        </div>
        {/* <TreeMapNivo
          motion="slow"
          identity={"symbol"}
          value={"market_cap"}
          maxValue={this.maxStockValue(snp_companies)}
          data={snp_companies}
          onStockClick={(stock) => this.changeSelectedStock(stock)}
        /> */}
        {this.state.zoomInSector === null ? (
          <TreeMapNivo
            motion="wobbly"
            identity={"name"}
            value={"count"}
            maxValue={this.maxSnpSectorCount}
            data={this.adjustCountAccToState()}
            onStockClick={(sector) => this.zoomInSector(sector)}
          />
        ) : (
          <TreeMapNivo
            motion="wobbly"
            identity={"symbol"}
            value={this.state.typeValue}
            maxValue={this.maxStockValue(
              this.getCurrentStateForDataBySector()[this.state.zoomInSector]
            )}
            data={this.getCurrentStateForDataBySector()[this.state.zoomInSector]}
            onStockClick={(stock) => this.changeSelectedStock(stock)}
          />
        )}
        <div id="stockCardInfo">
        {this.state.selectedStock !== null ? (
          
          <StockCard
            stock={this.state.selectedStock}
            data={this.getStockData(this.state.selectedStock)}
            no_graph={!this.validStock(this.state.selectedStock)}
          />
        ) : null}
        </div>

        {this.validStock(this.state.selectedStock) ? (
          <LineGraph stock={this.state.selectedStock} />
        ) : null}

        
        <Choropleth />
      </div>
    );
  }
}

export default DataVisualisation;
