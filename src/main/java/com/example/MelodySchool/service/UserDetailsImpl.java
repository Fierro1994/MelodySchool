package com.example.MelodySchool.service;

import java.sql.Blob;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import com.example.MelodySchool.entity.ETheme;
import com.example.MelodySchool.entity.ImagePromo;
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
    private ETheme theme;
    private Collection<? extends GrantedAuthority> authorities;
    private List<ItemsMenu> itemsMenu;
    private LocalDateTime lastTimeOnline;
    private List<ImagePromo> imagePromos;

    public UserDetailsImpl(Long id,Blob avatar,String email, String firstName,  String lastName,  String password,
                           Collection<? extends GrantedAuthority> authorities, Boolean enabled, List<ItemsMenu> itemsMenu, LocalDateTime lastTimeOnline, ETheme theme, List<ImagePromo> imagePromos) {
        this.id = id;
        this.avatar = avatar;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
        this.itemsMenu = itemsMenu;
        this.enabled = enabled;
        this.lastTimeOnline = lastTimeOnline;
        this.theme = theme;
        this.imagePromos = imagePromos;
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
                itemsMenus,
                user.getLastTimeOnline(),
                user.getThemes(),
                user.getImagePromos()

        );

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public ETheme getTheme() {
        return theme;
    }

    public void setTheme(ETheme theme) {
        this.theme = theme;
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

    public LocalDateTime getLastTimeOnline() {
        return lastTimeOnline;
    }

    public void setLastTimeOnline(LocalDateTime lastTimeOnline) {
        this.lastTimeOnline = lastTimeOnline;
    }

    public List<ImagePromo> getImagePromos() {
        return imagePromos;
    }

    public void setImagePromos(List<ImagePromo> imagePromos) {
        this.imagePromos = imagePromos;
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