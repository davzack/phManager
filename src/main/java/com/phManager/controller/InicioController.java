package com.phManager.controller;

import com.phManager.entity.Usuario;
import com.phManager.service.UsuarioService;
import com.phManager.web.config.SecurityConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Controller
public class InicioController {
    @Value("${okta.oauth2.issuer}")
    private String issuer;
    @Value("${okta.oauth2.client-id}")
    private String clientId;

    private UsuarioService usuarioService;
    private SecurityConfig securityConfig;

    public InicioController(UsuarioService usuarioService, SecurityConfig securityConfig) {
        this.usuarioService = usuarioService;
        this.securityConfig = securityConfig;
    }

    @GetMapping("/") //Ruta Raiz
    public String index(Model model, @AuthenticationPrincipal OidcUser principal) {

        if (principal != null) {
            System.out.println(principal.getClaims());
            //Usuario user = this.userServicio.getCrearUsuario(principal.getClaims().get("email")); //trae el correo de auth0
            Usuario user = this.usuarioService.getCrearUsuario(principal.getClaims());
            if(user!=null){
                model.addAttribute("user",user);
                return "redirect:/admin";
            }else{
               return "redirect:/logout";
            }
        }
        else{
            return "index";
        }
        //System.out.println(principal.getClaims());//Trae informacion del usuario de inicio de sesio

    }


}
