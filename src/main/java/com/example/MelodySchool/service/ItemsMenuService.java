package com.example.MelodySchool.service;

import com.example.MelodySchool.entity.EModulesMenu;
import com.example.MelodySchool.entity.ItemsMenu;
import com.example.MelodySchool.entity.User;
import com.example.MelodySchool.models.request.MenuSettingsAddReq;
import com.example.MelodySchool.models.request.MenuSettingsGetReq;
import com.example.MelodySchool.models.response.MenuSettingsResponse;
import com.example.MelodySchool.models.response.SimpleResponse;
import com.example.MelodySchool.repository.ItemsMenuRepository;
import com.example.MelodySchool.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ItemsMenuService {

    @Autowired
    ItemsMenuRepository itemsMenuRepository;
    @Autowired
    UserRepository userRepository;

   public List<ItemsMenu>  setDefaultStudentItemsMenu(){
       List<ItemsMenu> itemsMenus = new ArrayList<>();
       itemsMenus.add(new ItemsMenu(EModulesMenu.PROFILE_INFO_STUDENT,true, "Мой профиль"));
       itemsMenus.add(new ItemsMenu(EModulesMenu.JOURNAL_STUDENT, true, "Журнал"));
       itemsMenus.add(new ItemsMenu(EModulesMenu.PLAN_PRIVATE, true, "Расписание(личное)"));
       itemsMenus.add(new ItemsMenu(EModulesMenu.PLAN_FOR_ALL, true, "Расписание(общее)"));
       itemsMenus.add(new ItemsMenu(EModulesMenu.MESSAGES, true, "Сообщения"));
       itemsMenus.add(new ItemsMenu(EModulesMenu.FRIENDS, true, "Друзья"));
       itemsMenus.add(new ItemsMenu(EModulesMenu.CONTACT_BOOK, true, "Книга контактов"));

       itemsMenuRepository.saveAll(itemsMenus);
       return itemsMenus;
    }

    public ResponseEntity<?> menuItemsSetting(@RequestBody MenuSettingsGetReq request)  {
        User user = userRepository.findById(request.getUserId()).get();
        return ResponseEntity.ok()
                .body(new MenuSettingsResponse(user.getItemsMenus().stream().toList()));
    }

    public ResponseEntity<?> updateItemsMenu(@RequestBody MenuSettingsAddReq request){
        User user = userRepository.findById(request.getUserId()).get();

        if(user.getEnabled()){
            List<ItemsMenu> itemsMenus = user.getItemsMenus();

            itemsMenus.forEach((itemsMenu -> {
                itemsMenu.setIsEnabled(false);
                Arrays.stream(request.getName()).toList().forEach(elementName -> {
                    if (elementName.equals(itemsMenu.getName().name())) {
                        itemsMenu.setIsEnabled(true);
                    }
                });
            }));
            user.setItemsMenus(itemsMenus);
            userRepository.save(user);
            return ResponseEntity.ok().body(new MenuSettingsResponse(user.getItemsMenus().stream().toList()));
        }
       else return  ResponseEntity.ok(new SimpleResponse("Account_is_not_confirmed"));
    }
}
