package com.phManager.controller;



import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.lowagie.text.DocumentException;
import com.phManager.entity.Propietario;
import com.phManager.entity.Residente;
import com.phManager.entity.Usuario;
import com.phManager.service.*;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;

/**
 * Controller for requests to the {@code /profile} resource. Populates the model with the claims from the
 * {@linkplain OidcUser} for use by the view.
 */
@Controller
public class ProfileController {
    private final UsuarioService usuarioService;
    private final ResidenteService residenteService;
    private final PropietarioService propietarioService;
    private final ReservaZonaComunService reservaZonaComunService;
    private final CuotaService cuotaService;
    private final SugerenciaService sugerenciaService;

    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final static ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());
    @Autowired
    public ProfileController(UsuarioService usuarioService, ResidenteService residenteService, PropietarioService propietarioService, ReservaZonaComunService reservaZonaComunService, CuotaService cuotaService, SugerenciaService sugerenciaService) {
        this.usuarioService = usuarioService;
        this.residenteService = residenteService;
        this.propietarioService = propietarioService;
        this.reservaZonaComunService = reservaZonaComunService;
        this.cuotaService = cuotaService;
        this.sugerenciaService = sugerenciaService;
    }


    @GetMapping("/profile")
    public String profile(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        return "profile";
    }

    @GetMapping("/administrador")
    public String admin(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("countR", residenteService.countResidentes());
        model.addAttribute("countRP", reservaZonaComunService.countReservasProgramadas());
        model.addAttribute("countER", reservaZonaComunService.countReservasEnRevision());
        model.addAttribute("countSN", sugerenciaService.countNuevas());
        model.addAttribute("countSER", sugerenciaService.countEnRevision());
        model.addAttribute("countP", propietarioService.countPropietario());
        model.addAttribute("countPEN", cuotaService.countCuotasPendientes());
        model.addAttribute("profile", oidcUser.getClaims());
        return "admin";
    }
    @GetMapping("/residente/informacion")
    public String informacion(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        if (oidcUser!=null){
            model.addAttribute("profile", oidcUser.getClaims());
            Residente residente=residenteService.residenteByCorreo((String) oidcUser.getClaims().get("email"));
            if (residente!=null){
                model.addAttribute("user",residente);
            }else{
                return "redirect:/";
            }
        }else{
            return "redirect:/";
        }
        return "informacion";
    }
    @GetMapping("/residente/sugerencia")
    public String sugerencia(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        if (oidcUser!=null){
            model.addAttribute("profile", oidcUser.getClaims());
            Residente residente=residenteService.residenteByCorreo((String) oidcUser.getClaims().get("email"));
            if (residente!=null){
                model.addAttribute("user",residente);
            }else{
                return "redirect:/";
            }
        }else{
            return "redirect:/";
        }
        return "residentesugerencia";

    }
    @GetMapping("/residente/generar-certificado")
    public String generarCertificado(Model model, HttpServletResponse response, @AuthenticationPrincipal OidcUser oidcUser) {
        try {
            TemplateEngine templateEngine = new TemplateEngine();
            ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
            templateResolver.setTemplateMode(TemplateMode.HTML);
            templateResolver.setPrefix("templates/");
            templateEngine.setTemplateResolver(templateResolver);
            Context thymeleafContext = new Context();
            thymeleafContext.setVariable("fecha", LocalDate.now());
            Residente residente=residenteService.residenteByCorreo((String) oidcUser.getClaims().get("email"));
            thymeleafContext.setVariable("user", residente);
            String processedHtml = templateEngine.process("certificado.html", thymeleafContext);
            System.out.println("HTML procesado: " + processedHtml);
            String html = "certificado_residencia";
            String outputFileName = "certificado.pdf";
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ITextRenderer renderer = new ITextRenderer();
            renderer.setDocumentFromString(processedHtml);
            renderer.layout();
            renderer.createPDF(outputStream);
            response.setHeader("Content-Disposition", "attachment; filename=" + outputFileName);
            response.setContentType("application/pdf");
            response.setContentLength(outputStream.size());
            try (ServletOutputStream servletOutputStream = response.getOutputStream()) {
                outputStream.writeTo(servletOutputStream);
                servletOutputStream.flush();
            }
        } catch (IOException | DocumentException e) {
            e.printStackTrace();
            return "error";
        }
        return "certificado";
    }

    @GetMapping("/residente/cuotas")
    public String cuotas(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        if (oidcUser!=null){
            model.addAttribute("profile", oidcUser.getClaims());
            Residente residente=residenteService.residenteByCorreo((String) oidcUser.getClaims().get("email"));
            if (residente!=null){
                model.addAttribute("user",residente);
            }else{
                return "redirect:/";
            }
        }else{
            return "redirect:/";
        }
        return "cuotasadministracion";
    }


    @GetMapping("/residente/parqueadero")
    public String parqueadero(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        if (oidcUser!=null){
            model.addAttribute("profile", oidcUser.getClaims());
            Residente residente=residenteService.residenteByCorreo((String) oidcUser.getClaims().get("email"));
            if (residente!=null){
                model.addAttribute("user",residente);
            }else{
                return "redirect:/";
            }
        }else{
            return "redirect:/";
        }
        return "parqueadero";
    }

    @GetMapping("/residente/reserva")
    public String reserva(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        if (oidcUser!=null){
            model.addAttribute("profile", oidcUser.getClaims());
            Residente residente=residenteService.residenteByCorreo((String) oidcUser.getClaims().get("email"));
            if (residente!=null){
                model.addAttribute("user",residente);
            }else{
                return "redirect:/";
            }
        }else{
            return "redirect:/";
        }
        return "reserva";
    }

    @GetMapping("/residente")
    public String residente(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        if (oidcUser!=null){
            model.addAttribute("profile", oidcUser.getClaims());
            Residente residente=residenteService.residenteByCorreo((String) oidcUser.getClaims().get("email"));
            if (residente!=null){
                model.addAttribute("user",residente);
            }else{
                return "redirect:/";
            }
        }else{
            return "redirect:/";
        }
        return "residente";
    }

    @GetMapping("/propietario")
    public String propietario(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        if (oidcUser!=null){
            model.addAttribute("profile", oidcUser.getClaims());
            Propietario propietario =propietarioService.propietarioByCorreo((String) oidcUser.getClaims().get("email"));
            if (propietario!=null){
                model.addAttribute("user",propietario);
            }else{
                return "redirect:/";
            }
        }else{
            return "redirect:/";
        }
        return "propietario";
    }

    @GetMapping("/porteria")
    public String porteria(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Usuario user = this.usuarioService.getCrearUsuario(oidcUser.getClaims());
        if(user!=null){
            if(user.getRol().equals("SEGURIDAD")){
                model.addAttribute("user",user);
            }else{
                return "redirect:/";
            }
        }else{
            return "redirect:/";
        }
        return "porteria";
    }
    @GetMapping("/porteria/consulta-residentes")
    public String consultaResidentes(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Usuario user = this.usuarioService.getCrearUsuario(oidcUser.getClaims());
        if(user!=null){
            if(user.getRol().equals("SEGURIDAD")){
                model.addAttribute("user",user);
            }else{
                return "redirect:/";
            }
        }else{
            return "redirect:/";
        }
        return "porteria-consulta-residentes";
    }
    @GetMapping("/porteria/consulta-propietarios")
    public String consultaPropietarios(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Usuario user = this.usuarioService.getCrearUsuario(oidcUser.getClaims());
        if(user!=null){
            if(user.getRol().equals("SEGURIDAD")){
                model.addAttribute("user",user);
            }else{
                return "redirect:/";
            }
        }else{
            return "redirect:/";
        }
        return "porteria-consulta-propietarios";
    }
    @GetMapping("/porteria/registro-visitantes")
    public String registroVisitantes(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        model.addAttribute("profile", oidcUser.getClaims());
        Usuario user = this.usuarioService.getCrearUsuario(oidcUser.getClaims());
        if(user!=null){
            if(user.getRol().equals("SEGURIDAD")){
                model.addAttribute("user",user);
            }else{
                return "redirect:/";
            }
        }else{
            return "redirect:/";
        }
        return "porteria-registro-visitantes";
    }

    @GetMapping("/propietario/cuotas")
    public String propietarioCoutas(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        if (oidcUser!=null){
            model.addAttribute("profile", oidcUser.getClaims());
            Propietario propietario =propietarioService.propietarioByCorreo((String) oidcUser.getClaims().get("email"));
            if (propietario!=null){
                model.addAttribute("user",propietario);
            }else{
                return "redirect:/";
            }
        }else{
            return "redirect:/";
        }
        return "couta-propietario";
    }

    @GetMapping("/propietario/informacion")
    public String propietarioInformacion(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        if (oidcUser!=null){
            model.addAttribute("profile", oidcUser.getClaims());
            Propietario propietario =propietarioService.propietarioByCorreo((String) oidcUser.getClaims().get("email"));
            if (propietario!=null){
                model.addAttribute("user",propietario);
            }else{
                return "redirect:/";
            }
        }else{
            return "redirect:/";
        };
        return "propietario-informacion";
    }
    @GetMapping("/propietario/gestion-residentes")
    public String gestionResidentes(Model model, @AuthenticationPrincipal OidcUser oidcUser) {
        if (oidcUser!=null){
            model.addAttribute("profile", oidcUser.getClaims());
            Propietario propietario =propietarioService.propietarioByCorreo((String) oidcUser.getClaims().get("email"));
            if (propietario!=null){
                model.addAttribute("user",propietario);
            }else{
                return "redirect:/";
            }
        }else{
            return "redirect:/";
        }
        return "gestion-residentes";
    }
}
