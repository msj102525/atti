package org.ict.atti_boot.user.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ict.atti_boot.user.jpa.entity.User;
import org.ict.atti_boot.user.model.input.InputUser;
import org.ict.atti_boot.user.model.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserContorller {

    private final UserService userService;

    public UserContorller(UserService userService){
        this.userService = userService;
    }
    @GetMapping("/hello")
        public String hello(){
        return "hello";}

    @PostMapping("/user")
    public ResponseEntity<?> signUpUser(@RequestBody InputUser user) {
        User newUser = userService.signUpUser(user);
        return ResponseEntity.ok(newUser);
    }
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody InputUser user) {
        log.info("user");
        try {
            userService.signUpUser(user);
            return ResponseEntity.ok("회원가입이 완료되었습니다!");
        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.status(500).body("회원가입에 실패했습니다.");
        }
    }

}
