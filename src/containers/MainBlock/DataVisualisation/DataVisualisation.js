import React, { Component } from "react";

import classes from "./DataVisualisation.module.css";
import TreeMapNivo from "./TreeMapNivo/TreeMapNivo";
import LineGraph from "./LineGraph/LineGraph";
//import stock_prices from "./data/stock_price";
import stock_prices from "./data/stock_price.json";
import StockCard from "./StockCard/StockCard";
import snp_companies_info from "./data/snp_companies_info";
import snp_companies from "./data/snp_companies";
import snp_by_sector from "./data/snp_by_sector";
import snp_companies_by_sector from "./data/snp_companies_by_sector";
import Choropleth from "./Choropleth/Choropleth";
import snp_companies_trailingPE_bySector from "./data/snp_companies_trailingPE";
import snp_companies_bookValue_bySector from "./data/snp_companies_bookValue";
import snp_companies_averageDailyVolume3Month_bySector from "./data/snp_companies_averageDailyVolume3Month";
import ChoiceBox from "./ChoiceBox/ChoiceBox";
import CandleStick from "./CandleStick/CandleStick";
import iphone_launches from "./data/iphone_launches";
import apple_launch_descriptions from "./data/apple_launch_descriptions";
import tesla_tweet from "./data/tsla_tweet";
import covid_stock_changes from "./data/covid_stock_changes";
import stock_metric_description from "./data/stock_metric_description";

const MAX_COMPANIES_DISPLAYED = 240; // from performance concerns, it should be nice to display less than 500 companies in the treemap
const EVENT_LINE_GRAPH_HEIGHT = 200;

class DataVisualisation extends Component {
  state = {
    selectedStock: null,
    zoomInSector: null,
    typeValue: "market_cap",
    selectedStockColor: "black",
    detailedTicker: "MSFT",
    appleEvent: "iphone5s",
  };

  validStock(stock) {
    if (stock === null || !stock_prices.hasOwnProperty(stock)) {
      return false;
    }
    return true;
  }

  changeSelectedStock(stock, color) {
    this.setState({ selectedStock: stock, selectedStockColor: color });
    // document
    //   .getElementById("stockCardInfo")
    //   .scrollIntoView({ behavior: "smooth" });
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
    this.setState({ zoomInSector: null, selectedStock: null });
  }

  maxSnpSectorCount = Math.max.apply(
    Math,
    snp_by_sector.children.map((item) => item.count)
  );

  maxStockValue(stock_data, key) {
    return Math.max.apply(
      Math,
      stock_data.children.map((item) => item[key])
    );
  }

  getCurrentStateForDataBySector() {
    switch (this.state.typeValue) {
      case "trailingPE":
        return snp_companies_trailingPE_bySector;
      case "bookValue":
        return snp_companies_bookValue_bySector;
      case "averageDailyVolume3Month":
        return snp_companies_averageDailyVolume3Month_bySector;
      default:
        // market_cap as default
        return snp_companies_by_sector;
    }
  }

  adjustCountAccToState() {
    let sampleSector = snp_by_sector;
    sampleSector.children.forEach((data) => (data.count = 0));
    var sectorData = this.getCurrentStateForDataBySector();
    Object.keys(sectorData).forEach((element) => {
      let count = 0;
      for (
        let index = 0;
        index < sectorData[element].children.length;
        index++
      ) {
        let childData = sectorData[element].children[index];
        count += childData[this.state.typeValue];
      }
      sampleSector.children.find((x) => x.name === element).count = count;
    });

    return sampleSector;
  }

  onTypeChange(value) {
    this.setState({ typeValue: value, selectedStock: null });
    this.zoomOutSector(null);
  }

  sortList(list, child, key) {
    list[child].sort(function (a, b) {
      return b[key] - a[key];
    });
    list.children = list.children.slice(0, MAX_COMPANIES_DISPLAYED);
    return list;
  }

  detailedTickerChange(ticker) {
    this.setState({ detailedTicker: ticker });
  }

  changeAppleEvent(event) {
    this.setState({ appleEvent: event });
  }

  render() {
    let covid_stock_lines = [];
    for (let key in covid_stock_changes) {
      covid_stock_lines.push(
        <div style={{ width: 260 }}>
          <LineGraph
            monthly
            noLabel
            enableArea
            removeGridY={true}
            height={160}
            color={"#c8454d"}
            data={covid_stock_changes[key]}
            stock={key}
          />
        </div>
      );
    }

    return (
      <div className={classes.DataVisualisation}>
        {/* <div className={classes.Select}>
          <select onChange={(e) => this.onTypeChange(e.target.value)}>
            <option value="market_cap">Market Cap</option>
            <option value="trailingPE">P/E Ratio</option>
            <option value="bookValue">Book Value</option>
            <option value="averageDailyVolume3Month">
              Average Daily Volume
            </option>
          </select>
        </div> */}
        <div>
          <ChoiceBox
            choices={[
              {
                value: "market_cap",
                display: "Market Cap",
              },
              {
                value: "trailingPE",
                display: "P/E Ratio",
              },
              {
                value: "bookValue",
                display: "Book Value",
              },
              {
                value: "averageDailyVolume3Month",
                display: "Average Daily Volume",
              },
            ]}
            active={this.state.typeValue}
            onClick={(value) => this.onTypeChange(value)}
          />
        </div>
        <div className={classes.GraphDescription}>
          <p>{stock_metric_description[this.state.typeValue]}</p>
        </div>
        {/* <div className="goback">
          <button
            onClick={() => {
              this.zoomOutSector(null);
            }}
          >
            Go back
          </button>
        </div> */}
        <TreeMapNivo
          motion="molasses"
          identity={"symbol"}
          value={this.state.typeValue}
          maxValue={this.maxStockValue(snp_companies, this.state.typeValue)}
          data={this.sortList(snp_companies, "children", this.state.typeValue)}
          onStockClick={(stock, color) =>
            this.changeSelectedStock(stock, color)
          }
        />
        <div id="stockCardInfo">
          {this.state.selectedStock !== null ? (
            <StockCard
              color={this.state.selectedStockColor}
              stock={this.state.selectedStock}
              data={this.getStockData(this.state.selectedStock)}
              no_graph={!this.validStock(this.state.selectedStock)}
            />
          ) : null}
        </div>
        {this.validStock(this.state.selectedStock) ? (
          <LineGraph stock={this.state.selectedStock} />
        ) : null}
        {this.state.zoomInSector === null ? (
          <TreeMapNivo
            motion="gentle"
            identity={"name"}
            value={"count"}
            maxValue={this.maxSnpSectorCount}
            data={this.sortList(snp_by_sector, "children", "count")}
            onStockClick={(sector) => this.zoomInSector(sector)}
          />
        ) : (
          <TreeMapNivo
            motion="gentle"
            identity={"symbol"}
            value={"market_cap"}
            maxValue={this.maxStockValue(
              snp_companies_by_sector[this.state.zoomInSector],
              "market_cap"
            )}
            data={snp_companies_by_sector[this.state.zoomInSector]}
            onStockClick={(stock) => this.zoomOutSector(stock)}
          />
        )}
        <Choropleth />
        <div>
          <ChoiceBox
            choices={[
              {
                value: "MSFT",
                display: "Microsoft",
              },
              {
                value: "TSLA",
                display: "Tesla",
              },
              {
                value: "AAPL",
                display: "Apple",
              },
              {
                value: "FB",
                display: "Facebook",
              },
              {
                value: "GOOG",
                display: "Google",
              },
            ]}
            active={this.state.detailedTicker}
            onClick={(value) => this.detailedTickerChange(value)}
          />
        </div>
        {this.state.detailedTicker === "MSFT" ? (
          <CandleStick ticker="MSFT" />
        ) : null}
        {this.state.detailedTicker === "TSLA" ? (
          <CandleStick ticker="TSLA" />
        ) : null}
        {this.state.detailedTicker === "AAPL" ? (
          <CandleStick ticker="AAPL" />
        ) : null}
        {this.state.detailedTicker === "FB" ? (
          <CandleStick ticker="FB" />
        ) : null}
        {this.state.detailedTicker === "GOOG" ? (
          <CandleStick ticker="GOOG" />
        ) : null}
        <div>
          <ChoiceBox
            choices={[
              {
                value: "iphone5s",
                display: "iPhone 5s",
              },
              {
                value: "iphone6s",
                display: "iPhone 6s",
              },
              {
                value: "iphone7",
                display: "iPhone 7",
              },
              {
                value: "iphonex",
                display: "iPhone X",
              },
              {
                value: "iphonexr",
                display: "iPhone XR",
              },
              {
                value: "iphone11",
                display: "iPhone 11",
              },
              {
                value: "iphone12",
                display: "iPhone 12",
              },
            ]}
            active={this.state.appleEvent}
            onClick={(value) => this.changeAppleEvent(value)}
          />
        </div>
        <div className={classes.GraphDescription}>
          <p>{apple_launch_descriptions[this.state.appleEvent]}</p>
        </div>
        <LineGraph
          monthly
          enableArea
          color={"#484848"}
          removeGridY={true}
          height={EVENT_LINE_GRAPH_HEIGHT}
          data={iphone_launches[this.state.appleEvent]}
          stock={"AAPL"}
        />

        <LineGraph
          weekly
          enableArea
          color={"#484848"}
          removeGridY={true}
          height={EVENT_LINE_GRAPH_HEIGHT}
          data={tesla_tweet}
          stock={"TSLA"}
        />

        <div className={classes.MultipleLineBox}>{covid_stock_lines}</div>
      </div>
    );
  }
}

export default DataVisualisation;
