package net.sandbox.dividend;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;

import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by kwang on 8/25/2015.
 */
public class TickerInfo {

    @Id
    private String symbol;

    @JsonProperty("Name")
    private String companyName;

    private String startYear;

    @JsonProperty("DividendShare")
    private BigDecimal dividendShare;

    @JsonProperty("ExDividendDate")
    private Date exDividendDate;

    @JsonProperty("DividendPayDate")
    private Date dividendPayDate;

    @JsonProperty("DividendYield")
    private BigDecimal dividendYield;

    private String dividendFrequency;

    @JsonProperty("Currency")
    private String currency;

    @JsonProperty("YearHigh")
    private BigDecimal yearHigh;

    @JsonProperty("YearLow")
    private BigDecimal yearLow;

    private BigDecimal benchmarkPrice;

    private BigDecimal historicLow;

    public BigDecimal getBenchmarkPrice() {
        return benchmarkPrice;
    }

    public void setBenchmarkPrice(BigDecimal benchmarkPrice) {
        this.benchmarkPrice = benchmarkPrice;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getDividendFrequency() {
        return dividendFrequency;
    }

    public void setDividendFrequency(String dividendFrequency) {
        this.dividendFrequency = dividendFrequency;
    }

    public Date getDividendPayDate() {
        return dividendPayDate;
    }

    public void setDividendPayDate(Date dividendPayDate) {
        this.dividendPayDate = dividendPayDate;
    }

    public BigDecimal getDividendShare() {
        return dividendShare;
    }

    public void setDividendShare(BigDecimal dividendShare) {
        this.dividendShare = dividendShare;
    }

    public BigDecimal getDividendYield() {
        return dividendYield;
    }

    public void setDividendYield(BigDecimal dividendYield) {
        this.dividendYield = dividendYield;
    }

    public Date getExDividendDate() {
        return exDividendDate;
    }

    public void setExDividendDate(Date exDividendDate) {
        this.exDividendDate = exDividendDate;
    }

    public BigDecimal getHistoricLow() {
        return historicLow;
    }

    public void setHistoricLow(BigDecimal historicLow) {
        this.historicLow = historicLow;
    }

    public String getStartYear() {
        return startYear;
    }

    public void setStartYear(String startYear) {
        this.startYear = startYear;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public BigDecimal getYearHigh() {
        return yearHigh;
    }

    public void setYearHigh(BigDecimal yearHigh) {
        this.yearHigh = yearHigh;
    }

    public BigDecimal getYearLow() {
        return yearLow;
    }

    public void setYearLow(BigDecimal yearLow) {
        this.yearLow = yearLow;
    }
}
