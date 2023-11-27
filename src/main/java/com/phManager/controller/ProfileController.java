package com.phManager.controller;



import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.phManager.entity.Propietario;
import com.phManager.entity.Residente;
import com.phManager.entity.Usuario;
import com.phManager.service.PropietarioService;
import com.phManager.service.ResidenteService;
import com.phManager.service.UsuarioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final ResidenteService residenteService;
    private final PropietarioService propietarioService;

    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final static ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());
    @Autowired
    public ProfileController(UsuarioService usuarioService, ResidenteService residenteService, PropietarioService propietarioService) {
        this.usuarioService = usuarioService;
        this.residenteService = residenteService;
        this.propietarioService = propietarioService;
    }


    @GetMapping("/profile")
    public String profile(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        model.addAttribute("profileJson", claimsToJson(oidcUser.getClaims()));
        return "profile";
    }

    @GetMapping("/administrador")
    public String admin(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        model.addAttribute("profileJson", claimsToJson(oidcUser.getClaims()));
        return "admin";
    }
    @GetMapping("/residente/informacion")
    public String informacion(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Residente residente=residenteService.residenteByCorreo((String) oidcUser.getClaims().get("email"));
        model.addAttribute("user",residente);
        return "informacion";
    }
    @GetMapping("/residente/sugerencia")
    public String sugerencia(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Residente residente=residenteService.residenteByCorreo((String) oidcUser.getClaims().get("email"));
        model.addAttribute("user",residente);
        return "residentesugerencia";
    }

    @GetMapping("/residente/cuotas")
    public String cuotas(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Residente residente=residenteService.residenteByCorreo((String) oidcUser.getClaims().get("email"));
        model.addAttribute("user",residente);
        return "cuotasadministracion";
    }


    @GetMapping("/residente/parqueadero")
    public String parqueadero(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Residente residente=residenteService.residenteByCorreo((String) oidcUser.getClaims().get("email"));
        model.addAttribute("user",residente);
        return "parqueadero";
    }

    @GetMapping("/residente/reserva")
    public String reserva(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Residente residente=residenteService.residenteByCorreo((String) oidcUser.getClaims().get("email"));
        model.addAttribute("user",residente);
        return "reserva";
    }

    @GetMapping("/residente")
    public String residente(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Usuario user = this.usuarioService.getCrearUsuario(oidcUser.getClaims());
        if(user!=null){
            if(user.getRol().equals("RESIDENTE")){
                Residente residente =residenteService.residenteByCorreo((String) oidcUser.getClaims().get("email"));
                model.addAttribute("user",residente);
            }else{
                return "redirect:/";
            }
        }else{
            return "redirect:/logout";
        }
        return "residente";
    }

    @GetMapping("/propietario")
    public String propietario(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Usuario user = this.usuarioService.getCrearUsuario(oidcUser.getClaims());
        if(user!=null){
            if(user.getRol().equals("PROPIETARIO")){
                Propietario propietario =propietarioService.propietarioByCorreo((String) oidcUser.getClaims().get("email"));
                model.addAttribute("user",propietario);
            }else{
                return "redirect:/";
            }
        }else{
            return "redirect:/logout";
        }
        return "propietario";
    }

    @GetMapping("/porteria")
    public String porteria(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Usuario user = this.usuarioService.getCrearUsuario(oidcUser.getClaims());
        if(user!=null){
            if(user.getRol().equals("SEGURIDAD")){
                Propietario propietario =propietarioService.propietarioByCorreo((String) oidcUser.getClaims().get("email"));
                model.addAttribute("user",propietario);
            }else{
                return "redirect:/";
            }
        }else{
            return "redirect:/logout";
        }
        return "porteria";
    }
    @GetMapping("/porteria/consulta-residentes")
    public String consultaResidentes(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Propietario propietario =propietarioService.propietarioByCorreo((String) oidcUser.getClaims().get("email"));
        model.addAttribute("user",propietario);
        return "porteria-consulta-residentes";
    }
    @GetMapping("/porteria/consulta-propietarios")
    public String consultaPropietarios(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Propietario propietario =propietarioService.propietarioByCorreo((String) oidcUser.getClaims().get("email"));
        model.addAttribute("user",propietario);
        return "porteria-consulta-propietarios";
    }
    @GetMapping("/porteria/registro-visitantes")
    public String registroVisitantes(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Propietario propietario =propietarioService.propietarioByCorreo((String) oidcUser.getClaims().get("email"));
        model.addAttribute("user",propietario);
        return "porteria-registro-visitantes";
    }

    @GetMapping("/propietario/cuotas")
    public String propietarioCoutas(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Propietario propietario =propietarioService.propietarioByCorreo((String) oidcUser.getClaims().get("email"));
        model.addAttribute("user",propietario);
        return "couta-propietario";
    }

    @GetMapping("/propietario/informacion")
    public String propietarioInformacion(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Propietario propietario =propietarioService.propietarioByCorreo((String) oidcUser.getClaims().get("email"));
        model.addAttribute("user",propietario);
        return "propietario-informacion";
    }
    @GetMapping("/propietario/gestion-residentes")
    public String gestionResidentes(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Propietario propietario =propietarioService.propietarioByCorreo((String) oidcUser.getClaims().get("email"));
        model.addAttribute("user",propietario);
        return "gestion-residentes";
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
