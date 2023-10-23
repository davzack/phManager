package com.phManager.service;

import com.phManager.entity.Usuario;
import com.phManager.entity.UsuarioRol;
import com.phManager.repository.UsuarioCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserSecurityService implements UserDetailsService {
    private final UsuarioCrudRepository usuarioCrudRepository;
    @Autowired
    public UserSecurityService(UsuarioCrudRepository usuarioCrudRepository) {
        this.usuarioCrudRepository = usuarioCrudRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario=this.usuarioCrudRepository.findById(username)
                .orElseThrow(()->new UsernameNotFoundException("User "+ username + " not found"));

        System.out.println(usuario);

        String[] roles= usuario.getRoles().stream().map(UsuarioRol::getRole).toArray(String[]::new);
        return User.builder()
                .username(usuario.getUsername())
                .password(usuario.getPassword())
                .authorities(this.grantedAuthorities(roles))
                .accountLocked(usuario.getLocked())
                .disabled(usuario.getDisabled())
                .build();
    }
    private String[] getAuthorities(String role){
        if("ADMIN".equals(role) || "USUARIO".equals(role)){
            return new String[] {"RANDOM_ORDER"};
        }
        return new String[] {};
    }
    private List<GrantedAuthority> grantedAuthorities(String[] roles){
        List<GrantedAuthority> authorities= new ArrayList<>(roles.length);
        for (String role: roles) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role));

            for (String authority: this.getAuthorities(role)) {
                authorities.add(new SimpleGrantedAuthority(authority));
            }
        }
        return authorities;
    }
}
