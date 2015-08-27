package net.sandbox.dividend;

import org.springframework.data.annotation.Id;

import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by kwang on 8/25/2015.
 */
public class TickerInfo {

    @Id
    private String symbol;

    private String companyName;

    private Date startDate;

    private BigDecimal dividendShare;

    private Date exDividendDate;

    private Date dividendPayDate;

    private BigDecimal dividendYield;

    private String dividendFrequency;

    private String currency;

    private BigDecimal yearHigh;

    private BigDecimal yearLow;

    private BigDecimal benchmarkPrice;

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

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
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
