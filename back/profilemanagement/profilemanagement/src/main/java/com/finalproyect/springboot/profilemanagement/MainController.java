package com.finalproyect.springboot.profilemanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MainController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserTypeRepository userTypeRepository;

    //USER METHODS
    @PostMapping("/users")
    void addUser(@RequestBody User user){
        userRepository.save(user);
    }
    @GetMapping("/users")
    public @ResponseBody List<User> getAllUsers(){
        return (List<User>) userRepository.findAll();
    }
    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable ("id") Long id){
        userRepository.deleteById(id);
        return "User deleted successfully";
    }

    @PatchMapping("/users/editUser/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();

            existingUser.setName(updatedUser.getName());
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setUserTypeId(updatedUser.getUserTypeId());

            userRepository.save(existingUser);
            return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
    
    //I used these methods to prove that each part worked
    @PatchMapping("/users/editName/{id}")
    public ResponseEntity<String> updateUserName(@PathVariable Long id, @RequestBody String newName) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setName(newName);
            userRepository.save(existingUser);
            return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
    @PatchMapping("/users/editFirstName/{id}")
    public ResponseEntity<String> updateUserFirstName(@PathVariable Long id, @RequestBody String newFirstName) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setFirstName(newFirstName);
            userRepository.save(existingUser);
            return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
    @PatchMapping("/users/editEmail/{id}")
    public ResponseEntity<String> updateUserEmail(@PathVariable Long id, @RequestBody String newEmail) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setEmail(newEmail);
            userRepository.save(existingUser);
            return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
    @PatchMapping("/users/editType/{id}")
    public ResponseEntity<String> updateUserType(@PathVariable Long id, @RequestBody long newType) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setUserTypeId(newType);
            userRepository.save(existingUser);
            return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }




    // USER TYPE METHODS

    @PostMapping("/userTypes")
    public ResponseEntity<String> addUserType(@RequestBody UserType userType) {
        try {
            userTypeRepository.save(userType);
            return new ResponseEntity<>("User type added successfully", HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("User type with the same name already exists", HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/userTypes")
    public @ResponseBody List<UserType> getAllUserTypes(){
        return (List<UserType>) userTypeRepository.findAll();
    }
    @DeleteMapping("/userTypes/{id}")
    public ResponseEntity<String> deleteUserType(@PathVariable("id") Long id) {
        try {
            userTypeRepository.deleteById(id);
            return ResponseEntity.ok("User Type deleted successfully");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Cannot delete the User Type. It is being referenced by other records.");
        }
    }
    @PatchMapping("/userTypes/editTypeName/{id}")
    public ResponseEntity<String> updateUserTypeName(@PathVariable Long id, @RequestBody String newTypeName) {
        Optional<UserType> optionalUserType = userTypeRepository.findById(id);

        if (optionalUserType.isPresent()) {
            try {
                UserType existingUserType = optionalUserType.get();
                existingUserType.setType(newTypeName);
                userTypeRepository.save(existingUserType);
                return new ResponseEntity<>("User type updated successfully", HttpStatus.OK);
            } catch (DataIntegrityViolationException e) {
                return new ResponseEntity<>("User type with the same name already exists", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("User type not found", HttpStatus.NOT_FOUND);
        }
    }

}
