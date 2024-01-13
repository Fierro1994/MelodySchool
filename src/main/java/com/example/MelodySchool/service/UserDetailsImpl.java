package com.example.MelodySchool.service;

import java.sql.Blob;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import com.example.MelodySchool.entity.ItemsMenu;
import com.example.MelodySchool.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;
    private Blob avatar;
    private String firstName;
    private String lastName;

    private String email;

    @JsonIgnore
    private String password;
    private Boolean enabled;

    private Collection<? extends GrantedAuthority> authorities;
    private List<ItemsMenu> itemsMenu;

    public UserDetailsImpl(Long id,Blob avatar,String email, String firstName,  String lastName,  String password,
                           Collection<? extends GrantedAuthority> authorities, Boolean enabled, List<ItemsMenu> itemsMenu) {
        this.id = id;
        this.avatar = avatar;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
        this.itemsMenu = itemsMenu;
        this.enabled = enabled;
    }

    public static UserDetailsImpl build(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());
        List<ItemsMenu> itemsMenus = user.getItemsMenus().stream()
                .toList();

        return new UserDetailsImpl(
                user.getId(),
                user.getAvatar(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPassword(),
                authorities,
                user.getEnabled(),
                itemsMenus);

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Long getId() {
        return id;
    }
    public List<ItemsMenu> getItemsMenu(){
        return itemsMenu;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return null;
    }


    public String getFirstName() {
        return firstName;
    }
    public String getLastName() {
        return lastName;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setAvatar(Blob avatar) {
        this.avatar = avatar;
    }
    public Blob getAvatar() {
        return avatar;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }
}