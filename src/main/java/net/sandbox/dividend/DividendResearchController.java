package net.sandbox.dividend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
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
        List<TickerInfo> tickerInfoList = repository.findAll();
        model.addAttribute("tickerList", tickerInfoList);
        return "index";
    }

    @RequestMapping(value="/upload", method=RequestMethod.POST)
    public @ResponseBody String upload(@RequestParam("file") MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
                for (String line; (line = reader.readLine()) != null;) {
                    addticker(line);
                }
            } catch (IOException e) {
                return "Unable to read file.  Please make sure the file is readable and in correct format!";
            }
        }
        return "success";
    }

    @RequestMapping(value="/add", method=RequestMethod.POST)
    public @ResponseBody String addticker(@RequestParam("symbol") String symbol) {
        return "success";
    }
}
