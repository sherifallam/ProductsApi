package com.productsapi.productsrestinterface.presentation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

    @RequestMapping(value = "/react")
    public String index() {
        return "index";
    }

}
