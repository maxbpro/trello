package maxb.pro.trello.controller;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import maxb.pro.trello.model.AppUser;
import maxb.pro.trello.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.*;

@RestController
public class LoginController {

    static final String SECRET = "secretkey";
    static final String TOKEN_PREFIX = "Bearer";

    @Autowired
    private AppUserRepository appUserRepository;


    /**
     * This method is used for user registration. Note: user registration is not
     * require any authentication.
     *
     * @param appUser
     * @return
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<AppUser> createUser(@RequestBody AppUser appUser) {
        if (appUserRepository.findOneByEmail(appUser.getUsername()) != null) {
            throw new RuntimeException("Username already exist");
        }
        List<String> roles = new ArrayList<>();
        roles.add("USER");
        appUser.setRoles(roles);
        return new ResponseEntity<>(appUserRepository.save(appUser), HttpStatus.CREATED);
    }


    /**
     * This method will return the logged user.
     *
     * @param principal
     * @return Principal java security principal object
     */
    @RequestMapping("/user")
    public AppUser user(Principal principal) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedUsername = auth.getName();
        return appUserRepository.findOneByEmail(loggedUsername);
    }

    /**
     * @param username
     * @param password
     * @param response
     * @return JSON contains token and user after success authentication.
     * @throws IOException
     */
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> login(@RequestParam String username, @RequestParam String password,
                                                     HttpServletResponse response) throws IOException {
        String token = null;
        AppUser appUser = appUserRepository.findOneByEmail(username);
        Map<String, Object> tokenMap = new HashMap<>();
        if (appUser != null && appUser.getPassword().equals(password)) {
            token = Jwts.builder()
                    .setSubject(username)
                    .claim("roles", appUser.getRoles()).setIssuedAt(new Date())
                    .signWith(SignatureAlgorithm.HS256, SECRET)
                    .compact();

            tokenMap.put("token", token);
            tokenMap.put("user", appUser);
            return new ResponseEntity<>(tokenMap, HttpStatus.OK);
        } else {
            tokenMap.put("token", null);
            return new ResponseEntity<>(tokenMap, HttpStatus.UNAUTHORIZED);
        }


    }
}
