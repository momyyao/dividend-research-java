package net.sandbox.dividend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import java.util.List;

/**
 * Created by kwang on 8/25/2015.
 */
@Controller
public class DividendResearchController {

    @Autowired
    private TickerRepository repository;

    private RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(value="/home", method= RequestMethod.GET)
    public String home(Model model) {
        List<TickerInfo> tickerInfoList = repository.findByDividendYieldIsNotNull();
        model.addAttribute("tickerList", tickerInfoList);
        return "index";
    }

    @RequestMapping(value="/add", method=RequestMethod.POST)
    public @ResponseBody TickerInfo addticker(@RequestBody TickerInfo tickerInfo) {
        setStartYearAndBenchmarkPrice(tickerInfo);
        repository.save(tickerInfo);
        return tickerInfo;
    }

    private void setStartYearAndBenchmarkPrice(TickerInfo tickerInfo) {
    }
}
