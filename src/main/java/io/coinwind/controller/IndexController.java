package io.coinwind.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by wenweijie on 2018/8/20.
 */
@Controller
public class IndexController {

    @RequestMapping(value = "404")
    public String redirect() {
        return "redirect:/";
    }

}
