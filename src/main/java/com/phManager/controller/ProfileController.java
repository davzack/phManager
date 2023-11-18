package com.phManager.controller;



import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.phManager.entity.Usuario;
import com.phManager.service.UsuarioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

/**
 * Controller for requests to the {@code /profile} resource. Populates the model with the claims from the
 * {@linkplain OidcUser} for use by the view.
 */
@Controller
public class ProfileController {
    private final UsuarioService usuarioService;

    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final static ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());

    public ProfileController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/profile")
    public String profile(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        model.addAttribute("profileJson", claimsToJson(oidcUser.getClaims()));
        return "profile";
    }

    @GetMapping("/admin")
    public String admin(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        model.addAttribute("profileJson", claimsToJson(oidcUser.getClaims()));
        return "admin";
    }

    @GetMapping("/residente")
    public String residente(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Usuario user = this.usuarioService.getCrearUsuario(oidcUser.getClaims());
        if(user!=null){
            if(user.getRol().equals("RESIDENTE")){
                model.addAttribute("user", user);
            }else{
                return "redirect:/";
            }
        }else{
            return "redirect:/logout";
        }
        return "residente";
    }

    private String claimsToJson(Map<String, Object> claims) {
        try {
            return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(claims);
        } catch (JsonProcessingException jpe) {
            log.error("Error parsing claims to JSON", jpe);
        }
        return "Error parsing claims to JSON.";
    }
}
