package com.phManager.service;

import com.phManager.entity.Usuario;
import com.phManager.repository.PropietarioCrudRepository;
import com.phManager.repository.ResidenteCrudRepository;
import com.phManager.repository.UsuarioCrudRepository;
import org.springframework.stereotype.Service;

import java.util.Map;
@Service
public class UsuarioService {


    private UsuarioCrudRepository usuarioCrudRepository;
    private ResidenteCrudRepository residenteCrudRepository;
    private PropietarioCrudRepository propietarioCrudRepository;

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
        String rol="";
        if(user==null) {
            String name = (String) dataUser.get("nickname");
            String imag = (String) dataUser.get("picture");
            String auth_id = (String) dataUser.get("sub");
            if(propietarioCrudRepository.findByCorreo(email)!=null){
                rol="PROPIETARIO";
            }else if (residenteCrudRepository.findByCorreo(email)!=null){
                rol="RESIDENTE";
            }else{
                return null;
            }
            Usuario nuevo = new Usuario(email, name, imag, auth_id,rol);
            return this.crear(nuevo);
        }else{
            return user;
        }


    }
}
