package com.phManager.service;

import com.phManager.entity.Propietario;
import com.phManager.entity.Residente;
import com.phManager.entity.Usuario;
import com.phManager.repository.PropietarioCrudRepository;
import com.phManager.repository.ResidenteCrudRepository;
import com.phManager.repository.UsuarioCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class UsuarioService extends OidcUserService {

    private UsuarioCrudRepository usuarioCrudRepository;
    private ResidenteCrudRepository residenteCrudRepository;
    private PropietarioCrudRepository propietarioCrudRepository;
    @Autowired

    public UsuarioService(UsuarioCrudRepository usuarioCrudRepository, ResidenteCrudRepository residenteCrudRepository, PropietarioCrudRepository propietarioCrudRepository) {
        this.usuarioCrudRepository = usuarioCrudRepository;
        this.residenteCrudRepository = residenteCrudRepository;
        this.propietarioCrudRepository = propietarioCrudRepository;
    }

    public Usuario crear(Usuario usuario){
        return usuarioCrudRepository.save(usuario);
    }

    public Usuario buscarEmail(String email){
        if(usuarioCrudRepository.findById(email).isPresent()){
            return  this.usuarioCrudRepository.findById(email).get();
        }else{
            return null;
        }
    }

    public Usuario getCrearUsuario(Map<String, Object> dataUser){
        String email= (String) dataUser.get("email");
        Usuario user=buscarEmail(email);
        if(user==null) {
            String rol="";
            String identificacion="";
            String nombre="";
            String apellido="";
            String auth_id = (String) dataUser.get("sub");
            if(propietarioCrudRepository.existsByCorreo(email)){
                Propietario propietario= propietarioCrudRepository.findByCorreo(email);
                identificacion=propietario.getCedula();
                nombre=propietario.getNombre();
                apellido= propietario.getApellido();
                rol="PROPIETARIO";
            }else if (residenteCrudRepository.existsByCorreo(email)){
                Residente residente= residenteCrudRepository.findByCorreo(email);
                identificacion=residente.getCedula();
                nombre= residente.getNombre();
                apellido= residente.getApellido();
                rol="RESIDENTE";
            }else{
                return null;
            }
            Usuario nuevo = new Usuario(email, auth_id, identificacion, nombre, apellido, rol);
            return this.crear(nuevo);
        }else{
            return user;
        }


    }


}
